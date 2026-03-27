import React, { useRef, useEffect, useState, useCallback } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Full-page scroll animation background.
 * The canvas is fixed behind all content, and the animation plays
 * from frame 0 to 120 as the user scrolls through the entire page.
 */
export const FullPageScrollBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(-1);
  const rafRef = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const FRAME_COUNT = 121;
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const frameStep = isMobile ? 2 : 1;

  const getFrameSrc = useCallback((originalIndex: number) => {
    const padded = String(originalIndex + 1).padStart(4, "0");
    return `/hero-frames/frame-${padded}.webp`;
  }, []);

  const drawFrame = useCallback((loadedIndex: number) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const img = framesRef.current[loadedIndex];
    if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0) return;

    if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, 0, 0);
  }, []);

  // Preload frames
  useEffect(() => {
    if (prefersReducedMotion) return;

    const frames: HTMLImageElement[] = [];
    const frameMap: number[] = [];
    let loadedCount = 0;
    let cancelled = false;

    for (let i = 0; i < FRAME_COUNT; i += frameStep) {
      frameMap.push(i);
    }

    const totalToLoad = frameMap.length;
    const BATCH_SIZE = isMobile ? 5 : 10;

    const loadBatch = (batchStart: number) => {
      if (cancelled) return;
      const end = Math.min(batchStart + BATCH_SIZE, totalToLoad);

      for (let loadIdx = batchStart; loadIdx < end; loadIdx++) {
        const originalIdx = frameMap[loadIdx];
        const img = new Image();
        img.src = getFrameSrc(originalIdx);
        img.onload = () => {
          if (cancelled) return;
          loadedCount++;
          if (loadIdx === 0) {
            drawFrame(0);
            currentFrameRef.current = 0;
          }
          if (loadedCount === totalToLoad) setIsLoaded(true);
        };
        frames[loadIdx] = img;
      }

      if (end < totalToLoad) {
        requestAnimationFrame(() => loadBatch(end));
      }
    };

    framesRef.current = frames;
    loadBatch(0);

    return () => { cancelled = true; };
  }, [prefersReducedMotion, frameStep, isMobile, getFrameSrc, drawFrame]);

  // Scroll handler — maps entire page scroll to frame index
  useEffect(() => {
    if (prefersReducedMotion) return;

    const totalFrames = Math.ceil(FRAME_COUNT / frameStep);

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;

        const scrollTop = window.scrollY;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) return;

        const progress = Math.min(Math.max(scrollTop / maxScroll, 0), 1);
        const frameIndex = Math.min(
          Math.floor(progress * (totalFrames - 1)),
          totalFrames - 1
        );

        if (frameIndex !== currentFrameRef.current && framesRef.current[frameIndex]?.complete) {
          drawFrame(frameIndex);
          currentFrameRef.current = frameIndex;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Draw first frame on mount
    onScroll();

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReducedMotion, frameStep, drawFrame]);

  if (prefersReducedMotion) return null;

  return (
    <>
      {/* Fixed canvas behind everything */}
      <div className="fixed inset-0 z-0 bg-ssc-black">
        <div className="w-full h-full flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-full"
            style={{ objectFit: "contain" }}
          />
        </div>
        {/* Lighter overlay — let more of the card show through */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Loading spinner */}
      {!isLoaded && (
        <div className="fixed inset-0 z-0 flex items-center justify-center bg-ssc-black">
          <div className="w-8 h-8 border-2 border-ssc-gold border-t-transparent animate-spin" />
        </div>
      )}
    </>
  );
};
