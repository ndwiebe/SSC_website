import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

interface HeroCinemagraphProps {
  /** Path to frame directory */
  framePath?: string;
  /** First frame index (1-based) */
  startFrame?: number;
  /** Last frame index (1-based) */
  endFrame?: number;
  /** Milliseconds per frame */
  frameDelay?: number;
  /** Overlay darkness (0-1) */
  overlayOpacity?: number;
}

/**
 * Lightweight auto-looping cinemagraph background.
 * Plays a subset of hero frames in a ping-pong loop (forward then reverse)
 * for a seamless breathing/shimmer effect.
 */
export const HeroCinemagraph: React.FC<HeroCinemagraphProps> = ({
  framePath = '/hero-frames',
  startFrame = 1,
  endFrame = 50,
  frameDelay = 100,
  overlayOpacity = 0.55,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const containerRef = useRef<HTMLDivElement>(null!);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const loadingStartedRef = useRef(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const totalFrames = endFrame - startFrame + 1;

  const getFrameSrc = useCallback(
    (index: number) => {
      const padded = String(startFrame + index).padStart(4, '0');
      return `${framePath}/frame-${padded}.webp`;
    },
    [framePath, startFrame]
  );

  /** Draw frame on canvas, covering the container like object-fit: cover
   *  but aligned to top so the card top is visible */
  const drawFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas?.getContext('2d');
    const img = framesRef.current[index];
    if (!canvas || !container || !ctx || !img?.complete || img.naturalWidth === 0) return;

    const cw = container.clientWidth;
    const ch = container.clientHeight;

    if (canvas.width !== cw || canvas.height !== ch) {
      canvas.width = cw;
      canvas.height = ch;
    }

    // Cover-fit, aligned to top (show card top, crop bottom)
    const imgRatio = img.naturalWidth / img.naturalHeight;
    const containerRatio = cw / ch;

    let drawW: number, drawH: number, drawX: number, drawY: number;

    if (containerRatio > imgRatio) {
      // Container is wider — fit to width, crop bottom
      drawW = cw;
      drawH = cw / imgRatio;
      drawX = 0;
      drawY = 0; // top-aligned
    } else {
      // Container is taller — fit to height, center horizontally
      drawH = ch;
      drawW = ch * imgRatio;
      drawX = (cw - drawW) / 2;
      drawY = 0; // top-aligned
    }

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
  }, []);

  // Preload frames — ref guard (StrictMode) + cancelled flag (unmount safety)
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (loadingStartedRef.current) return;
    loadingStartedRef.current = true;

    let cancelled = false;
    const frames: HTMLImageElement[] = [];
    let loadedCount = 0;

    for (let i = 0; i < totalFrames; i++) {
      const img = new Image();
      img.src = getFrameSrc(i);
      img.onload = () => {
        if (cancelled) return;
        loadedCount++;
        if (loadedCount === totalFrames) setIsLoaded(true);
        if (i === 0) drawFrame(0);
      };
      frames[i] = img;
    }

    framesRef.current = frames;

    return () => { cancelled = true; };
  }, [prefersReducedMotion, totalFrames, getFrameSrc, drawFrame]);

  // Auto-play ping-pong loop
  useEffect(() => {
    if (!isLoaded || prefersReducedMotion) return;

    let currentFrame = 0;
    let direction = 1;
    let timeoutId: number;
    let running = true;

    const tick = () => {
      if (!running) return;
      drawFrame(currentFrame);
      currentFrame += direction;

      if (currentFrame >= totalFrames - 1) {
        currentFrame = totalFrames - 1;
        direction = -1;
      } else if (currentFrame <= 0) {
        currentFrame = 0;
        direction = 1;
      }

      timeoutId = window.setTimeout(() => {
        requestAnimationFrame(tick);
      }, frameDelay);
    };

    requestAnimationFrame(tick);

    return () => {
      running = false;
      clearTimeout(timeoutId);
    };
  }, [isLoaded, prefersReducedMotion, totalFrames, frameDelay, drawFrame]);

  // Redraw on resize
  useEffect(() => {
    if (!isLoaded) return;
    const onResize = () => drawFrame(0);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [isLoaded, drawFrame]);

  if (prefersReducedMotion) {
    return (
      <div className="absolute inset-0 z-0 bg-ssc-black">
        <img
          src={getFrameSrc(0)}
          alt=""
          className="w-full h-full object-cover object-top opacity-40"
        />
      </div>
    );
  }

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 bg-ssc-black overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0" />
      {/* Dark overlay for text readability */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 40%, rgba(0,0,0,${overlayOpacity}) 0%, rgba(0,0,0,${overlayOpacity * 0.35}) 100%)`,
        }}
      />
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-ssc-black">
          <div className="w-6 h-6 border-2 border-ssc-gold border-t-transparent animate-spin" />
        </div>
      )}
    </div>
  );
};
