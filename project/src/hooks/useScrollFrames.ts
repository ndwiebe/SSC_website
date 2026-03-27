import { useRef, useEffect, useState, useCallback } from "react";

interface UseScrollFramesOptions {
  frameCount: number;
  framePath: string;
  frameExtension: string;
  scrollHeight: number;
  mobileScrollHeight?: number;
  mobileBreakpoint?: number;
  skipFramesOnMobile?: boolean;
}

interface UseScrollFramesReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isLoaded: boolean;
}

function isMobile(breakpoint: number): boolean {
  return typeof window !== "undefined" && window.innerWidth < breakpoint;
}

export function useScrollFrames({
  frameCount,
  framePath,
  frameExtension,
  scrollHeight,
  mobileScrollHeight = 800,
  mobileBreakpoint = 768,
  skipFramesOnMobile = true,
}: UseScrollFramesOptions): UseScrollFramesReturn {
  const containerRef = useRef<HTMLDivElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const frameMapRef = useRef<number[]>([]);
  const currentFrameRef = useRef<number>(-1);
  const rafRef = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const mobile = isMobile(mobileBreakpoint);
  const effectiveScrollHeight = mobile ? mobileScrollHeight : scrollHeight;
  const frameStep = mobile && skipFramesOnMobile ? 2 : 1;
  const effectiveFrameCount = Math.ceil(frameCount / frameStep);

  const getFrameSrc = useCallback(
    (originalIndex: number) => {
      const padded = String(originalIndex + 1).padStart(4, "0");
      return `${framePath}${padded}.${frameExtension}`;
    },
    [framePath, frameExtension]
  );

  const drawFrame = useCallback(
    (loadedIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = framesRef.current[loadedIndex];
      if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0)
        return;

      if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    },
    []
  );

  // Preload frames (skipping every other on mobile)
  useEffect(() => {
    const frames: HTMLImageElement[] = [];
    const frameMap: number[] = [];
    framesRef.current = frames;
    frameMapRef.current = frameMap;
    let loadedCount = 0;
    let cancelled = false;

    // Build the list of original frame indices to load
    for (let i = 0; i < frameCount; i += frameStep) {
      frameMap.push(i);
    }

    const totalToLoad = frameMap.length;
    const BATCH_SIZE = mobile ? 5 : 10;

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

          if (loadIdx === 0 && canvasRef.current) {
            drawFrame(0);
            currentFrameRef.current = 0;
          }

          if (loadedCount === totalToLoad) {
            setIsLoaded(true);
          }
        };
        frames[loadIdx] = img;
      }

      if (end < totalToLoad) {
        requestAnimationFrame(() => loadBatch(end));
      }
    };

    loadBatch(0);

    return () => {
      cancelled = true;
    };
  }, [frameCount, frameStep, mobile, getFrameSrc, drawFrame]);

  // Scroll handler
  useEffect(() => {
    const totalFrames = frameMapRef.current.length || effectiveFrameCount;

    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = 0;
        const container = containerRef.current;
        if (!container) return;

        const rect = container.getBoundingClientRect();
        const containerTop = -rect.top;
        const maxScroll = container.scrollHeight - window.innerHeight;
        const progress = Math.min(Math.max(containerTop / maxScroll, 0), 1);
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
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [effectiveFrameCount, drawFrame]);

  // Container height — shorter on mobile so users reach content faster
  useEffect(() => {
    const container = containerRef.current;
    const setHeight = () => {
      if (container) {
        const h = isMobile(mobileBreakpoint) ? mobileScrollHeight : scrollHeight;
        container.style.height = `${h + window.innerHeight}px`;
      }
    };

    setHeight();
    window.addEventListener("resize", setHeight);
    return () => window.removeEventListener("resize", setHeight);
  }, [scrollHeight, mobileScrollHeight, mobileBreakpoint]);

  return { containerRef, canvasRef, isLoaded };
}
