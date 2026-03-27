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
  });

  // Fallback for reduced motion users
  if (prefersReducedMotion) {
    return <HeroStatic />;
  }

  return (
    <div ref={containerRef} className="relative bg-ssc-black">
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Canvas — card animation */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-contain"
          style={{
            objectFit: "contain",
            imageRendering: "auto",
          }}
        />

        {/* Dark overlay gradient for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />

        {/* Loading indicator — shown until first frame draws */}
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-ssc-black">
            <div className="w-8 h-8 border-2 border-ssc-gold border-t-transparent animate-spin" />
          </div>
        )}

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Eyebrow */}
            <p className="font-headline text-lg sm:text-xl tracking-[0.3em] text-ssc-gold mb-4">
              SLAB SAVVY
            </p>

            {/* Main headline */}
            <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-none text-white mb-6">
              RUN YOUR CARD
              <br />
              <span className="text-ssc-gold">BUSINESS</span>
            </h1>

            {/* Subtitle */}
            <p className="font-body text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Inventory tracking. AI photo enhancement. Tax guides. Comps.
              One ecosystem, built by a collector who's also a CPA.
            </p>

            {/* CTA buttons */}
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
      </div>
    </div>
  );
};
