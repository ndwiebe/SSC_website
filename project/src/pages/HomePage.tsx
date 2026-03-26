import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { HeroStatic } from '../components/HeroStatic';
import { ProductCard } from '../components/ProductCard';
import { StatsBar } from '../components/StatsBar';
import { SectionHeading } from '../components/SectionHeading';
import { MobileStickyCTA } from '../components/MobileStickyCTA';
import { fadeInUp, staggerFadeInUp } from '../lib/animations';

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
  const trustRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ecosystemRef.current) {
      staggerFadeInUp(ecosystemRef.current, '.product-card', 0.15);
    }
    if (trustRef.current) {
      fadeInUp(trustRef.current);
    }
  }, []);

  return (
    <div className="pb-16 md:pb-0">
      {/* 1. Hero */}
      <HeroStatic />

      {/* 2. Ecosystem */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <SectionHeading>THE ECOSYSTEM</SectionHeading>
        <div ref={ecosystemRef} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="product-card md:col-span-2" style={{ opacity: 0 }}>
            <ProductCard
              title="SLAB SAVVY TRACKER"
              description="Stop using a Notes app to track your $50K inventory. Send a photo. Confirm the details. Get a row in your spreadsheet with comps. That's it."
              icon={ClipboardIcon}
              href="/waitlist"
              cta="Join the Waitlist"
              gradient="bg-gradient-to-r from-ssc-gold to-ssc-gold-light"
              span="wide"
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
              gradient="bg-gradient-to-r from-emerald-500 to-emerald-300"
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
      </section>

      {/* 3. Stats Bar */}
      <StatsBar />

      {/* 4. Trust Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div ref={trustRef} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start" style={{ opacity: 0 }}>
          {/* Left: Copy */}
          <div>
            <h2 className="font-headline text-3xl md:text-4xl text-ssc-gold tracking-wide mb-6">
              BUILT BY A COLLECTOR WHO'S ALSO A CPA
            </h2>
            <p className="font-body text-lg text-ssc-text-secondary mb-6">
              Most CPAs don't know what a YG is. Most card dealers don't know what an adjusted cost base is.
              I'm both. I'm active in 15+ Facebook collector groups daily, mostly hockey. You've probably
              seen me around.
            </p>
            <p className="font-body text-lg text-ssc-text-secondary mb-8">
              Every tool in the ecosystem exists because I needed it myself. I built them with AI,
              tested them on my own inventory, and now I'm opening the doors.
            </p>
            <Link
              to="/waitlist"
              className="inline-flex items-center min-h-[44px] px-8 py-3 bg-ssc-gold text-white font-body font-semibold hover:bg-ssc-gold-dark transition-colors shadow-gold"
            >
              Join the Waitlist
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>

          {/* Right: Credential box */}
          <div className="bg-ssc-black p-8 lg:p-10">
            <h3 className="font-headline text-xl text-ssc-gold tracking-wide mb-8">
              THE CREDENTIALS
            </h3>
            <ul className="space-y-6">
              {[
                { label: 'CPA', detail: 'Chartered Professional Accountant' },
                { label: '15+ years', detail: 'collecting sports cards' },
                { label: '15+ groups', detail: 'active in Facebook collector communities' },
                { label: '100% AI', detail: 'every tool built with artificial intelligence' },
              ].map((item) => (
                <li key={item.label} className="flex items-start gap-4">
                  <div className="w-2 h-2 bg-ssc-gold mt-2 flex-shrink-0" />
                  <div>
                    <span className="font-mono text-lg text-ssc-gold">{item.label}</span>
                    <p className="font-body text-sm text-gray-400 mt-1">{item.detail}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 5. CTA Band */}
      <section className="bg-ssc-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="font-headline text-3xl md:text-5xl text-ssc-gold tracking-wide mb-6">
            STOP WINGING IT
          </h2>
          <p className="font-body text-lg text-ssc-chrome max-w-2xl mx-auto mb-10">
            Your inventory deserves more than a Notes app. Your taxes deserve more than guesswork.
            Get on the list and be first in line when the full ecosystem drops.
          </p>
          <Link
            to="/waitlist"
            className="inline-flex items-center min-h-[44px] px-10 py-4 bg-ssc-gold text-white font-body font-semibold text-lg hover:bg-ssc-gold-dark transition-colors shadow-gold-lg"
          >
            Join the Waitlist
            <ArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>

      {/* 6. Mobile Sticky CTA */}
      <MobileStickyCTA />
    </div>
  );
};
