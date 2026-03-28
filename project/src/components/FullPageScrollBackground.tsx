import React, { useRef, useEffect, useState, useCallback } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Full-page scroll animation background.
 * The canvas is fixed behind all content, and the animation plays
 * from frame 0 to 120 as the user scrolls through the entire page.
 *
 * StrictMode-safe: uses a loading guard ref to prevent double-loading
 * when React 18 double-mounts in dev mode.
 */
export const FullPageScrollBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(-1);
  const rafRef = useRef<number>(0);
  const loadingStartedRef = useRef(false);
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

  // Preload frames — load frame 1 eagerly, defer rest until after paint
  useEffect(() => {
    if (prefersReducedMotion) return;
    if (loadingStartedRef.current) return;
    loadingStartedRef.current = true;

    let cancelled = false;
    const frameMap: number[] = [];

    for (let i = 0; i < FRAME_COUNT; i += frameStep) {
      frameMap.push(i);
    }

    const totalToLoad = frameMap.length;
    const frames: HTMLImageElement[] = new Array(totalToLoad);
    let loadedCount = 0;

    const onFrameLoad = (loadIdx: number) => {
      if (cancelled) return;
      loadedCount++;
      if (loadIdx === 0) {
        drawFrame(0);
        currentFrameRef.current = 0;
      }
      if (loadedCount === totalToLoad) setIsLoaded(true);
    };

    // Step 1: Load first frame immediately for fast hero render
    const firstImg = new Image();
    firstImg.src = getFrameSrc(frameMap[0]);
    firstImg.onload = () => onFrameLoad(0);
    frames[0] = firstImg;

    // Step 2: Defer remaining frames until after page paint
    const BATCH_SIZE = isMobile ? 5 : 8;
    const BATCH_DELAY = 50; // ms between batches — avoids saturating connections

    const loadBatch = (batchStart: number) => {
      if (cancelled) return;
      const end = Math.min(batchStart + BATCH_SIZE, totalToLoad);

      for (let loadIdx = batchStart; loadIdx < end; loadIdx++) {
        const originalIdx = frameMap[loadIdx];
        const img = new Image();
        img.src = getFrameSrc(originalIdx);
        img.onload = () => onFrameLoad(loadIdx);
        frames[loadIdx] = img;
      }

      if (end < totalToLoad) {
        setTimeout(() => loadBatch(end), BATCH_DELAY);
      }
    };

    framesRef.current = frames;

    // Wait for initial paint before loading remaining frames
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (!cancelled) loadBatch(1);
      }, 100);
    });

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
        {/* Radial overlay — darker in center for text readability, transparent at edges for card visibility */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 45%, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 100%)',
          }}
        />
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
