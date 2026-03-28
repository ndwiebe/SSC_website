import React, { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gsap } from 'gsap';
import { FullPageScrollBackground } from '../components/FullPageScrollBackground';
import { ProductCard } from '../components/ProductCard';
import { MobileStickyCTA } from '../components/MobileStickyCTA';
import { staggerScaleIn, blurFadeIn, slideInLeft, slideInRight } from '../lib/animations';

/* ── Inline SVG icons ── */
const ClipboardIcon = (
  <svg className="w-6 h-6 text-ssc-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="square" strokeLinejoin="miter" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
  </svg>
);

const CameraIcon = (
  <svg className="w-6 h-6 text-ssc-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="square" strokeLinejoin="miter" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
    <path strokeLinecap="square" strokeLinejoin="miter" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const BookIcon = (
  <svg className="w-6 h-6 text-ssc-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="square" strokeLinejoin="miter" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const CalculatorIcon = (
  <svg className="w-6 h-6 text-ssc-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="square" strokeLinejoin="miter" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
  </svg>
);

export const HomePage: React.FC = () => {
  const ecosystemRef = useRef<HTMLDivElement>(null);
  const trustLeftRef = useRef<HTMLDivElement>(null);
  const trustRightRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (ecosystemRef.current) {
        staggerScaleIn(ecosystemRef.current, '.product-card', 0.15);
      }
      if (trustLeftRef.current) {
        slideInLeft(trustLeftRef.current);
      }
      if (trustRightRef.current) {
        slideInRight(trustRightRef.current);
      }
      if (ctaRef.current) {
        blurFadeIn(ctaRef.current);
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="pb-16 md:pb-0">
      <Helmet>
        <title>Slab Savvy — Run Your Card Business</title>
        <meta name="description" content="The collector's business platform. Inventory tracking, AI photo enhancement, tax guides, and consulting — built by a CPA who collects." />
        <link rel="canonical" href="https://slabsavvycpa.com/" />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Slab Savvy",
          "url": "https://slabsavvycpa.com",
          "logo": "https://slabsavvycpa.com/ssc-logo.png",
          "description": "AI-powered tools for sports card collectors. Inventory tracking, tax guides, photo enhancement, and consulting.",
          "email": "slabsavvycpa@gmail.com",
          "sameAs": ["https://facebook.com/slabsavvy"]
        })}</script>
      </Helmet>

      {/* Fixed background animation — plays through entire page scroll */}
      <FullPageScrollBackground />

      {/* All content scrolls OVER the animation with z-10 */}
      <div className="relative z-10">

        {/* 1. Hero — full viewport, transparent so animation shows through */}
        <section className="min-h-screen flex items-center justify-center relative">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.6), 0 0px 20px rgba(0,0,0,0.3)' }}>
            <p className="font-headline text-lg sm:text-xl tracking-[0.3em] text-ssc-gold mb-4">
              SLAB SAVVY
            </p>

            <h1 className="font-headline text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide leading-none text-white mb-6">
              RUN YOUR CARD
              <br />
              <span className="text-shimmer" style={{ textShadow: 'none' }}>BUSINESS</span>
            </h1>

            <p className="font-body text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Inventory tracking. AI photo enhancement. Tax guides. Comps.
              One ecosystem, built by a collector who's also a CPA.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/waitlist"
                className="btn-shine inline-flex items-center justify-center min-h-[44px] px-8 py-3 bg-ssc-gold text-white font-body font-semibold text-lg hover:bg-ssc-gold-dark"
              >
                Join the Waitlist
              </Link>
              <Link
                to="/taxready"
                className="btn-ghost-glow inline-flex items-center justify-center min-h-[44px] px-8 py-3 border-2 border-white/80 text-white font-body font-semibold text-lg transition-all duration-300"
              >
                Get Tax Ready
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <div className="flex flex-col items-center gap-2">
              <span className="font-body text-xs text-gray-400 tracking-wider uppercase">Scroll</span>
              <svg className="w-5 h-5 text-ssc-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="square" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </section>

        {/* 2. Ecosystem — compact glass cards */}
        <section className="py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass p-4 md:p-6 mb-4 text-center">
              <h2 className="font-headline text-2xl md:text-3xl tracking-wide text-ssc-text">THE ECOSYSTEM</h2>
            </div>
            <div ref={ecosystemRef} className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="product-card" style={{ opacity: 0 }}>
                <ProductCard
                  title="SLAB SAVVY TRACKER"
                  description="Stop using a Notes app to track your $50K inventory. Send a photo. Confirm the details. Get a row in your spreadsheet with comps."
                  icon={ClipboardIcon}
                  href="/waitlist"
                  cta="Join the Waitlist"
                  gradient="bg-gradient-to-r from-ssc-gold to-ssc-gold-light"
                />
              </div>
              <div className="product-card" style={{ opacity: 0 }}>
                <ProductCard
                  title="DISPLAYMYCARD"
                  description="AI-powered photo enhancement that makes your cards look like they belong in a Beckett ad. Team backgrounds, auto-crop, the works."
                  icon={CameraIcon}
                  href="https://displaymycard.com"
                  cta="Try DisplayMyCard"
                  gradient="bg-gradient-to-r from-amber-500 to-amber-300"
                  external
                />
              </div>
              <div className="product-card" style={{ opacity: 0 }}>
                <ProductCard
                  title="THE TAX PLAYBOOK"
                  description="Everything Canadian collectors need to know about taxes when you sell cards. Written by a CPA who actually rips packs."
                  icon={BookIcon}
                  href="/spreadsheet"
                  cta="Get the Playbook"
                  gradient="bg-gradient-to-r from-ssc-gold-dark to-ssc-gold"
                />
              </div>
              <div className="product-card" style={{ opacity: 0 }}>
                <ProductCard
                  title="TAX READY"
                  description="A dead-simple checklist and walkthrough so you're not scrambling in April. Know what you owe before CRA comes knocking."
                  icon={CalculatorIcon}
                  href="/taxready"
                  cta="Get Tax Ready"
                  gradient="bg-gradient-to-r from-ssc-gold to-ssc-gold-light"
                />
              </div>
            </div>
          </div>
        </section>

        {/* 3. Trust Section — glass panel with slide-in halves */}
        <section className="py-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="glass p-6 md:p-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Left: Copy */}
                <div ref={trustLeftRef} style={{ opacity: 0 }}>
                  <h2 className="font-headline text-2xl md:text-3xl text-ssc-gold tracking-wide mb-4">
                    BUILT BY A COLLECTOR WHO'S ALSO A CPA
                  </h2>
                  <p className="font-body text-sm text-ssc-text-muted mb-3">
                    Most CPAs don't know what a YG is. Most card dealers don't know what an adjusted cost base is.
                    I'm both. Active in 15+ Facebook collector groups daily.
                  </p>
                  <p className="font-body text-sm text-ssc-text-muted mb-4">
                    Every tool in the ecosystem exists because I needed it myself.
                  </p>
                  <Link
                    to="/taxready"
                    className="btn-shine inline-flex items-center min-h-[44px] px-8 py-3 bg-ssc-gold text-white font-body font-semibold hover:bg-ssc-gold-dark"
                  >
                    Get Tax Ready
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>

                {/* Right: Credential box */}
                <div ref={trustRightRef} className="bg-ssc-black/90 p-6" style={{ opacity: 0 }}>
                  <h3 className="font-headline text-lg text-ssc-gold tracking-wide mb-4">
                    THE CREDENTIALS
                  </h3>
                  <ul className="space-y-3">
                    {[
                      { label: 'CPA', detail: 'Chartered Professional Accountant' },
                      { label: 'Active Collector', detail: 'hockey cards, mostly' },
                      { label: '15+ Groups', detail: 'active in Facebook collector communities' },
                      { label: 'AI-Enhanced', detail: 'every tool built to multiply output, not replace it' },
                    ].map((item) => (
                      <li key={item.label} className="flex items-start gap-4 group/cred">
                        <div className="w-2 h-2 bg-ssc-gold mt-2 flex-shrink-0 transition-shadow duration-300 group-hover/cred:shadow-[0_0_8px_rgba(201,162,39,0.5)]" />
                        <div>
                          <span className="font-mono text-lg text-ssc-gold">{item.label}</span>
                          <p className="font-body text-sm text-gray-400 mt-1">{item.detail}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CTA Band — semi-transparent dark */}
        <section className="bg-ssc-black/80 backdrop-blur-md">
          <div ref={ctaRef} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center" style={{ opacity: 0 }}>
            <h2 className="font-headline text-3xl md:text-5xl text-ssc-gold tracking-wide mb-6">
              STOP WINGING IT
            </h2>
            <p className="font-body text-lg text-gray-400 max-w-2xl mx-auto mb-10">
              Your inventory deserves more than a Notes app. Your taxes deserve more than guesswork.
              Get on the list and be first in line when the full ecosystem drops.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/waitlist"
                className="btn-shine inline-flex items-center justify-center min-h-[44px] px-10 py-4 bg-ssc-gold text-white font-body font-semibold text-lg hover:bg-ssc-gold-dark"
              >
                Join the Waitlist
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/taxready"
                className="btn-ghost-glow inline-flex items-center justify-center min-h-[44px] px-10 py-4 border-2 border-white/80 text-white font-body font-semibold text-lg transition-all duration-300"
              >
                Get Tax Ready
              </Link>
            </div>
          </div>
        </section>

      </div>

      {/* 5. Mobile Sticky CTA */}
      <MobileStickyCTA text="Join the Waitlist" href="/waitlist" />
    </div>
  );
};
