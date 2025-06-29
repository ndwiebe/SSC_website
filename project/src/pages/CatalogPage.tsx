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
    <div className="min-h-screen bg-brand-primary-bg">
      {/* Header */}
      <div className="bg-gradient-to-br from-brand-primary-text via-brand-button-hover to-brand-primary-bg text-brand-secondary-text">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-brand-accent-gold">
              Premium Card Catalog
            </h1>
            <p className="text-xl text-brand-secondary-bg max-w-3xl mx-auto">
              Discover our curated collection of authenticated and graded sports cards. 
              Each card is hand-selected for quality and investment potential.
            </p>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-brand-secondary-text/10 backdrop-blur-sm rounded-lg p-6 text-center border border-brand-border/30">
              <Package className="w-8 h-8 text-brand-secondary-bg mx-auto mb-2" />
              <div className="text-2xl font-bold text-brand-accent-gold">{availableCards.length}</div>
              <div className="text-sm text-brand-secondary-bg">Available Cards</div>
            </div>
            <div className="bg-brand-secondary-text/10 backdrop-blur-sm rounded-lg p-6 text-center border border-brand-border/30">
              <TrendingUp className="w-8 h-8 text-brand-accent-gold mx-auto mb-2" />
              <div className="text-2xl font-bold text-brand-accent-gold">{featuredCards.length}</div>
              <div className="text-sm text-brand-secondary-bg">Featured</div>
            </div>
            <div className="bg-brand-secondary-text/10 backdrop-blur-sm rounded-lg p-6 text-center border border-brand-border/30">
              <Clock className="w-8 h-8 text-orange-200 mx-auto mb-2" />
              <div className="text-2xl font-bold text-brand-accent-gold">{claimedCards.length}</div>
              <div className="text-sm text-brand-secondary-bg">Reserved</div>
            </div>
            <div className="bg-brand-secondary-text/10 backdrop-blur-sm rounded-lg p-6 text-center border border-brand-border/30">
              <Shield className="w-8 h-8 text-brand-success mx-auto mb-2" />
              <div className="text-2xl font-bold text-brand-accent-gold">{soldCards.length}</div>
              <div className="text-sm text-brand-secondary-bg">Sold</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start space-x-4">
              <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-900 mb-2">Authentication Guarantee</h3>
                <p className="text-blue-800 text-sm">
                  Every card in our catalog has been professionally authenticated and graded by reputable services including PSA, BGS, and SGC. 
                  We stand behind the quality and authenticity of every card we sell.
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