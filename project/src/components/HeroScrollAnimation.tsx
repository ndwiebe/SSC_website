import React from "react";
import { Link } from "react-router-dom";
import { useScrollFrames } from "../hooks/useScrollFrames";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { HeroStatic } from "./HeroStatic";

export const HeroScrollAnimation: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const { containerRef, canvasRef, isLoaded } = useScrollFrames({
    frameCount: 121,
    framePath: "/hero-frames/frame-",
    frameExtension: "webp",
    scrollHeight: 1500,
    mobileScrollHeight: 800,
    mobileBreakpoint: 768,
    skipFramesOnMobile: true,
  });

  if (prefersReducedMotion) {
    return <HeroStatic />;
  }

  return (
    <div ref={containerRef} className="relative bg-ssc-black">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas — card animation, centered and contained */}
        <div className="absolute inset-0 flex items-center justify-center">
          <canvas
            ref={canvasRef}
            className="max-w-full max-h-full"
            style={{ objectFit: "contain" }}
          />
        </div>

        {/* Dark overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        {/* Loading indicator */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-ssc-black">
            <div className="w-8 h-8 border-2 border-ssc-gold border-t-transparent animate-spin" />
          </div>
        )}

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-headline text-lg sm:text-xl tracking-[0.3em] text-ssc-gold mb-4">
              SLAB SAVVY
            </p>

            <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-none text-white mb-6">
              RUN YOUR CARD
              <br />
              <span className="text-ssc-gold">BUSINESS</span>
            </h1>

            <p className="font-body text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Inventory tracking. AI photo enhancement. Tax guides. Comps.
              One ecosystem, built by a collector who's also a CPA.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/waitlist"
                className="inline-flex items-center justify-center min-h-[44px] px-8 py-3 bg-ssc-gold text-white font-body font-semibold text-lg hover:bg-ssc-gold-dark transition-colors shadow-gold"
              >
                Join the Waitlist
              </Link>
              <Link
                to="/taxready"
                className="inline-flex items-center justify-center min-h-[44px] px-8 py-3 border-2 border-white text-white font-body font-semibold text-lg hover:border-ssc-gold hover:text-ssc-gold transition-colors"
              >
                Get Tax Ready
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <div className="flex flex-col items-center gap-2">
            <span className="font-body text-xs text-gray-400 tracking-wider uppercase">Scroll</span>
            <svg className="w-5 h-5 text-ssc-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="square" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
