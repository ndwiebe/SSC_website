import React, { useState, useEffect } from 'react';
import { Star, Heart, ShoppingCart, Clock, Check, Search, Filter, Grid, List } from 'lucide-react';
import { useCards } from '../contexts/CardContext';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { Card } from '../contexts/CardContext';

interface CardGridProps {
  showFeaturedOnly?: boolean;
  limit?: number;
}

export const CardGrid: React.FC<CardGridProps> = ({ showFeaturedOnly = false, limit }) => {
  const { availableCards, claimCard, addToWishlist } = useCards();
  const { user } = useAuth();
  const { addToCart } = useCart();
  const [filteredCards, setFilteredCards] = useState<Card[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterGrade, setFilterGrade] = useState('all');
  const [filterPriceRange, setFilterPriceRange] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    let cards = showFeaturedOnly 
      ? availableCards.filter(card => card.featured)
      : availableCards;

    // Apply search filter
    if (searchTerm) {
      cards = cards.filter(card => 
        card.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.team?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply grade filter
    if (filterGrade !== 'all') {
      cards = cards.filter(card => card.grade.includes(filterGrade));
    }

    // Apply price range filter
    if (filterPriceRange !== 'all') {
      const [min, max] = filterPriceRange.split('-').map(Number);
      cards = cards.filter(card => {
        if (!card.price) return false;
        if (max) return card.price >= min && card.price <= max;
        return card.price >= min;
      });
    }

    // Apply sorting
    cards.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return (a.price || 0) - (b.price || 0);
        case 'price-high':
          return (b.price || 0) - (a.price || 0);
        case 'year':
          return (b.year || 0) - (a.year || 0);
        case 'name':
        default:
          return a.playerName.localeCompare(b.playerName);
      }
    });

    // Apply limit if specified
    if (limit) {
      cards = cards.slice(0, limit);
    }

    setFilteredCards(cards);
  }, [availableCards, showFeaturedOnly, searchTerm, sortBy, filterGrade, filterPriceRange, limit]);

  const handleClaimCard = (cardId: string) => {
    if (user) {
      claimCard(cardId, user.id);
    }
  };

  const handleAddToCart = (card: Card) => {
    addToCart(card);
  };

  const CardItem: React.FC<{ card: Card }> = ({ card }) => {
    const isGridView = viewMode === 'grid';
    
    return (
      <div className={`bg-brand-secondary-text rounded-xl shadow-brand hover:shadow-brand-lg transition-all duration-300 overflow-hidden group border border-brand-border hover-lift ${
        isGridView ? '' : 'flex gap-4'
      }`}>
        <div className={`relative ${isGridView ? 'aspect-[3/4]' : 'w-32 h-40 flex-shrink-0'}`}>
          <img
            src={card.imageUrl}
            alt={card.playerName}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {card.featured && (
            <div className="absolute top-2 left-2 bg-brand-accent-gold text-white px-2 py-1 rounded-full text-xs font-semibold">
              <Star className="w-3 h-3 inline mr-1" />
              Featured
            </div>
          )}
          {card.claimedBy && (
            <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              <Clock className="w-3 h-3 inline mr-1" />
              Reserved
            </div>
          )}
        </div>
        
        <div className={`p-4 ${isGridView ? '' : 'flex-1'}`}>
          <div className="space-y-2">
            <h3 className="font-bold text-lg text-brand-primary-text">{card.playerName}</h3>
            <p className="text-sm text-brand-primary-text/70">{card.description}</p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                  card.grade.includes('PSA 10') 
                    ? 'bg-green-100 text-brand-success' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {card.grade}
                </span>
                {card.team && (
                  <span className="text-xs text-brand-border">{card.team}</span>
                )}
              </div>
              {card.year && (
                <span className="text-xs text-brand-border">{card.year}</span>
              )}
            </div>

            {card.price && (
              <div className="text-2xl font-bold text-brand-accent-gold">
                ${card.price.toLocaleString()}
              </div>
            )}

            {card.notes && (
              <p className="text-sm text-brand-border italic">{card.notes}</p>
            )}
          </div>

          <div className="mt-4 flex space-x-2">
            {!card.claimedBy && (
              <button
                onClick={() => handleAddToCart(card)}
                className="flex-1 bg-brand-accent-gold hover:bg-brand-button-hover text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </button>
            )}
            
            {user && (
              <button
                onClick={() => addToWishlist(card.id)}
                className="px-3 py-2 border border-brand-border hover:border-red-400 hover:text-red-500 rounded-lg transition-colors"
              >
                <Heart className="w-4 h-4" />
              </button>
            )}

            {card.claimedBy && (
              <div className="flex-1 bg-orange-100 text-orange-800 px-4 py-2 rounded-lg font-medium text-center">
                <Check className="w-4 h-4 inline mr-2" />
                Reserved
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  if (showFeaturedOnly) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-brand-secondary-text rounded-lg shadow-brand p-6 border border-brand-border">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-brand-border" />
            <input
              type="text"
              placeholder="Search players, teams, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold focus:border-transparent bg-brand-secondary-bg text-brand-primary-text"
            />
          </div>

          {/* View Toggle */}
          <div className="flex bg-brand-secondary-bg rounded-lg p-1 border border-brand-border">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'grid' ? 'bg-brand-secondary-text shadow-sm' : 'hover:bg-brand-border/20'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${
                viewMode === 'list' ? 'bg-brand-secondary-text shadow-sm' : 'hover:bg-brand-border/20'
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          {/* Filter Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center space-x-2 px-4 py-2 bg-brand-accent-gold text-white rounded-lg hover:bg-brand-button-hover transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="mt-4 pt-4 border-t border-brand-border grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-brand-primary-text mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
              >
                <option value="name">Player Name</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="year">Year (Newest First)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-primary-text mb-1">Grade</label>
              <select
                value={filterGrade}
                onChange={(e) => setFilterGrade(e.target.value)}
                className="w-full px-3 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
              >
                <option value="all">All Grades</option>
                <option value="PSA 10">PSA 10</option>
                <option value="PSA 9">PSA 9</option>
                <option value="BGS 9.5">BGS 9.5</option>
                <option value="SGC">SGC</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-brand-primary-text mb-1">Price Range</label>
              <select
                value={filterPriceRange}
                onChange={(e) => setFilterPriceRange(e.target.value)}
                className="w-full px-3 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
              >
                <option value="all">All Prices</option>
                <option value="0-100">Under $100</option>
                <option value="100-500">$100 - $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-5000">$1,000 - $5,000</option>
                <option value="5000">$5,000+</option>
              </select>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSortBy('name');
                  setFilterGrade('all');
                  setFilterPriceRange('all');
                }}
                className="w-full px-4 py-2 bg-brand-border text-brand-secondary-text rounded-lg hover:bg-brand-primary-text transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="text-sm text-brand-secondary-text mb-4">
        Showing {filteredCards.length} of {availableCards.length} cards
      </div>

      {/* Cards Grid/List */}
      <div className={
        viewMode === 'grid' 
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
          : 'space-y-4'
      }>
        {filteredCards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>

      {filteredCards.length === 0 && (
        <div className="text-center py-12">
          <div className="text-brand-border mb-4">
            <Search className="w-12 h-12 mx-auto" />
          </div>
          <h3 className="text-lg font-semibold text-brand-secondary-text mb-2">No cards found</h3>
          <p className="text-brand-secondary-text/70">Try adjusting your search terms or filters</p>
        </div>
      )}
    </div>
  );
};