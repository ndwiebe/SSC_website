import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight, Clock } from 'lucide-react';

export const CartPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-ssc-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-16 h-16 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center mx-auto mb-6">
            <ShoppingBag className="w-8 h-8 text-ssc-gold" />
          </div>
          <span className="inline-flex items-center px-3 py-1 bg-ssc-gold/10 border border-ssc-gold/20 text-ssc-gold text-xs font-mono font-medium mb-6">
            <Clock className="w-3 h-3 mr-1" />
            COMING SOON
          </span>
          <h1 className="font-headline text-3xl text-ssc-text tracking-wide mb-4">ONLINE STORE</h1>
          <p className="font-body text-ssc-text-secondary mb-8 max-w-md mx-auto">
            The online store with cart and checkout is being built. In the meantime, DM me on Facebook or use the contact page to buy a card.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/catalog"
              className="inline-flex items-center px-6 py-3 bg-ssc-gold text-white font-body font-semibold hover:bg-ssc-gold-dark transition-colors"
            >
              Browse Cards
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border-2 border-ssc-gold text-ssc-gold font-body font-semibold hover:bg-ssc-gold hover:text-white transition-colors"
            >
              Contact Me to Buy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};