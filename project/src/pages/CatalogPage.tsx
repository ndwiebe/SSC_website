import React from 'react';
import { CardGrid } from '../components/CardGrid';
import { Package, TrendingUp, Clock, Shield } from 'lucide-react';
import { useCards } from '../contexts/CardContext';

export const CatalogPage: React.FC = () => {
  const { cards, availableCards } = useCards();

  const soldCards = cards.filter(card => card.sold);
  const featuredCards = cards.filter(card => card.featured && !card.sold);
  const claimedCards = cards.filter(card => card.claimedBy && !card.sold);

  return (
    <div className="min-h-screen bg-ssc-ivory">
      {/* Header */}
      <div className="bg-ssc-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="font-headline text-4xl md:text-5xl text-ssc-gold tracking-wide mb-6">
              CARD CATALOG
            </h1>
            <p className="font-body text-xl text-ssc-chrome max-w-3xl mx-auto">
              Graded cards from my collection. Every one is authenticated, hand-picked, and ready to ship.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-ssc-surface border border-ssc-border-dark p-6 text-center">
              <Package className="w-7 h-7 text-ssc-chrome mx-auto mb-2" />
              <div className="font-mono text-2xl font-bold text-ssc-gold">{availableCards.length}</div>
              <div className="text-sm text-ssc-chrome font-body">Available</div>
            </div>
            <div className="bg-ssc-surface border border-ssc-border-dark p-6 text-center">
              <TrendingUp className="w-7 h-7 text-ssc-gold mx-auto mb-2" />
              <div className="font-mono text-2xl font-bold text-ssc-gold">{featuredCards.length}</div>
              <div className="text-sm text-ssc-chrome font-body">Featured</div>
            </div>
            <div className="bg-ssc-surface border border-ssc-border-dark p-6 text-center">
              <Clock className="w-7 h-7 text-orange-400 mx-auto mb-2" />
              <div className="font-mono text-2xl font-bold text-ssc-gold">{claimedCards.length}</div>
              <div className="text-sm text-ssc-chrome font-body">Reserved</div>
            </div>
            <div className="bg-ssc-surface border border-ssc-border-dark p-6 text-center">
              <Shield className="w-7 h-7 text-green-400 mx-auto mb-2" />
              <div className="font-mono text-2xl font-bold text-ssc-gold">{soldCards.length}</div>
              <div className="text-sm text-ssc-chrome font-body">Sold</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="bg-ssc-gold/5 border border-ssc-gold/20 p-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-ssc-gold" />
              </div>
              <div>
                <h3 className="font-body font-semibold text-ssc-text mb-2">Every Card is Authenticated</h3>
                <p className="font-body text-ssc-text-secondary text-sm">
                  PSA, BGS, or SGC graded. I stand behind every card I sell. If something's off, we make it right.
                </p>
              </div>
            </div>
          </div>
        </div>

        <CardGrid />
      </div>
    </div>
  );
};