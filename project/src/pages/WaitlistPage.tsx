import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Camera, BarChart3, Table2, MessageCircle, DollarSign, FileText } from 'lucide-react';
import { WaitlistForm } from '../components/WaitlistForm';

const FEATURES = [
  {
    icon: Camera,
    title: 'PHOTO-FIRST LOGGING',
    description: 'Send a photo of your card. AI identifies it, you confirm, done.',
  },
  {
    icon: BarChart3,
    title: 'REAL-TIME COMPS',
    description: '130point comp search built in. Know what your cards are worth.',
  },
  {
    icon: Table2,
    title: 'YOUR GOOGLE SHEET',
    description: 'Data goes straight to your own spreadsheet. Your data, your way.',
  },
  {
    icon: MessageCircle,
    title: 'TELEGRAM & WHATSAPP',
    description: 'Works where you already are. No new app to download.',
  },
  {
    icon: DollarSign,
    title: 'COST BASIS TRACKING',
    description: 'Track what you paid, what you sold for, and your actual profit.',
  },
  {
    icon: FileText,
    title: 'TAX-READY RECORDS',
    description: 'Good records now means less pain at tax time. Built by a CPA.',
  },
];


export const WaitlistPage: React.FC = () => {
  return (
    <div>
      <Helmet>
        <title>Slab Savvy Tracker — Join the Beta</title>
        <meta name="description" content="AI-powered inventory tracking for sports card dealers. Send a photo, get a row in your spreadsheet with real-time comps." />
      </Helmet>

      {/* Hero */}
      <section className="bg-ssc-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28 text-center">
          <span className="inline-block bg-ssc-gold/10 border border-ssc-gold/30 text-ssc-gold font-mono text-xs tracking-widest px-4 py-1.5 mb-8">
            BETA COMING SOON
          </span>
          <h1 className="font-headline text-4xl md:text-6xl lg:text-7xl text-white tracking-wide leading-none mb-6">
            TRACK YOUR CARDS.
            <br />
            <span className="text-ssc-gold">KNOW YOUR NUMBERS.</span>
          </h1>
          <p className="font-body text-gray-400 text-lg md:text-xl max-w-2xl mx-auto">
            AI-powered inventory tracking for sports card dealers. Send a photo, confirm the details,
            and your spreadsheet updates itself — with real-time comp prices.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-ssc-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="font-headline text-3xl md:text-4xl text-ssc-gold tracking-wide">
              HOW IT WORKS
            </h2>
            <p className="font-body text-ssc-text-muted mt-3 max-w-2xl mx-auto">
              Built for dealers who move cards, not developers who build apps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="bg-white border border-ssc-border p-8 hover:shadow-card-hover transition-shadow hover-lift"
              >
                <div className="w-12 h-12 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center mb-6">
                  <feature.icon className="w-6 h-6 text-ssc-gold" />
                </div>
                <h3 className="font-headline text-lg text-ssc-text tracking-wide mb-3">
                  {feature.title}
                </h3>
                <p className="font-body text-ssc-text-muted">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Waitlist Form */}
      <section className="bg-ssc-bg">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 text-center">
          <h2 className="font-headline text-3xl md:text-4xl text-ssc-gold tracking-wide mb-3">
            GET EARLY ACCESS
          </h2>
          <p className="font-body text-ssc-text-muted mb-8 max-w-lg mx-auto">
            Join the waitlist for Slab Savvy Tracker. Beta spots are limited — first in, first tracked.
          </p>
          <WaitlistForm />
        </div>
      </section>
    </div>
  );
};
