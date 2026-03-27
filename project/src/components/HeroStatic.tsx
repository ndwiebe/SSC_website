import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';

export const HeroStatic: React.FC = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    if (headlineRef.current) {
      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 30, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.9 }
      );
    }

    if (subtitleRef.current) {
      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 },
        '-=0.4'
      );
    }

    if (ctaRef.current) {
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 30, filter: 'blur(4px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.7 },
        '-=0.3'
      );
    }
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-ssc-bg to-ssc-border/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1
          ref={headlineRef}
          className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-none mb-8"
          style={{ opacity: 0 }}
        >
          RUN YOUR CARD
          <br />
          <span className="text-ssc-gold">BUSINESS</span>
        </h1>

        <p
          ref={subtitleRef}
          className="font-body text-lg md:text-xl text-ssc-text-muted max-w-2xl mx-auto mb-10"
          style={{ opacity: 0 }}
        >
          Inventory tracking. AI photo enhancement. Tax guides. Comps.
          One ecosystem, built by a collector who's also a CPA.
        </p>

        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{ opacity: 0 }}
        >
          <Link
            to="/waitlist"
            className="inline-flex items-center justify-center min-h-[44px] px-8 py-3 bg-ssc-gold text-white font-body font-semibold text-lg hover:bg-ssc-gold-dark transition-colors shadow-gold"
          >
            Join the Waitlist
          </Link>
          <Link
            to="/taxready"
            className="inline-flex items-center justify-center min-h-[44px] px-8 py-3 border-2 border-ssc-text text-ssc-text font-body font-semibold text-lg hover:border-ssc-gold hover:text-ssc-gold transition-colors"
          >
            Get Tax Ready
          </Link>
        </div>
      </div>
    </section>
  );
};
