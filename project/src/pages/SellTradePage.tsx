import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpDown, DollarSign, Shield, CheckCircle, Clock, ArrowRight } from 'lucide-react';

export const SellTradePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-ssc-ivory">
      {/* Header */}
      <div className="bg-ssc-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <span className="inline-flex items-center px-3 py-1 bg-ssc-gold/10 border border-ssc-gold/20 text-ssc-gold text-xs font-mono font-medium mb-6">
              <Clock className="w-3 h-3 mr-1" />
              SUBMISSION FORM COMING SOON
            </span>
            <h1 className="font-headline text-4xl md:text-5xl text-ssc-gold tracking-wide mb-6">
              SELL & TRADE YOUR CARDS
            </h1>
            <p className="font-body text-xl text-ssc-chrome max-w-3xl mx-auto">
              Want to sell cards or consolidate your collection into a grail piece? The online submission form is being built.
              For now, reach out directly.
            </p>
          </div>
        </div>
      </div>

      {/* How it works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl text-ssc-gold tracking-wide mb-4">HOW IT WORKS</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            { icon: DollarSign, title: 'COMPETITIVE OFFERS', desc: 'Fair prices based on real market data, not lowball offers' },
            { icon: Shield, title: 'SECURE PROCESS', desc: 'Insured shipping both ways, professional handling' },
            { icon: CheckCircle, title: 'FAST TURNAROUND', desc: 'Evaluation and payment within 48 hours of receiving your cards' },
            { icon: ArrowUpDown, title: 'TRADE UP', desc: 'Consolidate multiple cards into a single grail piece' },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="bg-ssc-white border border-ssc-border p-6 text-center hover-lift">
                <div className="w-12 h-12 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-ssc-gold" />
                </div>
                <h3 className="font-headline text-lg text-ssc-text tracking-wide mb-2">{item.title}</h3>
                <p className="font-body text-ssc-text-secondary text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="bg-ssc-surface border border-ssc-border-dark p-8 text-center">
          <h3 className="font-headline text-2xl text-ssc-gold tracking-wide mb-4">READY TO SELL OR TRADE?</h3>
          <p className="font-body text-ssc-chrome mb-6 max-w-2xl mx-auto">
            The online submission form is coming soon. In the meantime, send me photos and details through
            the contact page or find me in the Facebook collector groups.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-ssc-gold hover:bg-ssc-gold-dark text-white px-8 py-3 font-body font-semibold transition-colors inline-flex items-center justify-center"
            >
              Contact Me
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};