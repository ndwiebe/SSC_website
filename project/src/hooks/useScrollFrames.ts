import { useRef, useEffect, useState, useCallback } from "react";

interface UseScrollFramesOptions {
  frameCount: number;
  framePath: string;
  frameExtension: string;
  scrollHeight: number;
}

interface UseScrollFramesReturn {
  containerRef: React.RefObject<HTMLDivElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isLoaded: boolean;
}

export function useScrollFrames({
  frameCount,
  framePath,
  frameExtension,
  scrollHeight,
}: UseScrollFramesOptions): UseScrollFramesReturn {
  const containerRef = useRef<HTMLDivElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(-1);
  const rafRef = useRef<number>(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Pad frame number to 4 digits: 1 -> "0001"
  const getFrameSrc = useCallback(
    (index: number) => {
      const padded = String(index + 1).padStart(4, "0");
      return `${framePath}${padded}.${frameExtension}`;
    },
    [framePath, frameExtension]
  );

  // Draw a specific frame onto the canvas
  const drawFrame = useCallback(
    (frameIndex: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      const img = framesRef.current[frameIndex];
      if (!canvas || !ctx || !img || !img.complete || img.naturalWidth === 0)
        return;

      // Set canvas internal resolution to match frame
      if (canvas.width !== img.naturalWidth || canvas.height !== img.naturalHeight) {
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
    },
    []
  );

  // Preload frames in batches
  useEffect(() => {
    const frames: HTMLImageElement[] = new Array(frameCount);
    framesRef.current = frames;
    let loadedCount = 0;
    let cancelled = false;

    const BATCH_SIZE = 10;

    const loadBatch = (startIndex: number) => {
      if (cancelled) return;
      const end = Math.min(startIndex + BATCH_SIZE, frameCount);

      for (let i = startIndex; i < end; i++) {
        const img = new Image();
        img.src = getFrameSrc(i);
        img.onload = () => {
          if (cancelled) return;
          loadedCount++;

          // Draw first frame as soon as it loads
          if (i === 0 && canvasRef.current) {
            drawFrame(0);
            currentFrameRef.current = 0;
          }

          // All frames loaded
          if (loadedCount === frameCount) {
            setIsLoaded(true);
          }
        };
        frames[i] = img;
      }

      // Schedule next batch
      if (end < frameCount) {
        requestAnimationFrame(() => loadBatch(end));
      }
    };

    loadBatch(0);

    return () => {
      cancelled = true;
    };
  }, [frameCount, getFrameSrc, drawFrame]);

  // Scroll handler with rAF
  useEffect(() => {
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
          Math.floor(progress * (frameCount - 1)),
          frameCount - 1
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
  }, [frameCount, drawFrame]);

  // Set container height for scroll room
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.height = `${scrollHeight + window.innerHeight}px`;
    }

    const handleResize = () => {
      if (container) {
        container.style.height = `${scrollHeight + window.innerHeight}px`;
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [scrollHeight]);

  return { containerRef, canvasRef, isLoaded };
}
