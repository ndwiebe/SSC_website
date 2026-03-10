import React, { useState, useEffect } from 'react';
import { Star, Clock, Search, Filter, Grid, List } from 'lucide-react';
import { useCards } from '../contexts/CardContext';
import { Card } from '../contexts/CardContext';

interface CardGridProps {
  showFeaturedOnly?: boolean;
  limit?: number;
}

export const CardGrid: React.FC<CardGridProps> = ({ showFeaturedOnly = false, limit }) => {
  const { availableCards } = useCards();
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

    if (searchTerm) {
      cards = cards.filter(card =>
        card.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.team?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterGrade !== 'all') {
      cards = cards.filter(card => card.grade.includes(filterGrade));
    }

    if (filterPriceRange !== 'all') {
      const [min, max] = filterPriceRange.split('-').map(Number);
      cards = cards.filter(card => {
        if (!card.price) return false;
        if (max) return card.price >= min && card.price <= max;
        return card.price >= min;
      });
    }

    cards.sort((a, b) => {
      switch (sortBy) {
        case 'price-low': return (a.price || 0) - (b.price || 0);
        case 'price-high': return (b.price || 0) - (a.price || 0);
        case 'year': return (b.year || 0) - (a.year || 0);
        case 'name':
        default: return a.playerName.localeCompare(b.playerName);
      }
    });

    if (limit) cards = cards.slice(0, limit);
    setFilteredCards(cards);
  }, [availableCards, showFeaturedOnly, searchTerm, sortBy, filterGrade, filterPriceRange, limit]);

  const CardItem: React.FC<{ card: Card }> = ({ card }) => {
    const isGridView = viewMode === 'grid';
    const isPlaceholder = card.imageUrl.includes('placeholder');

    return (
      <div className={`bg-ssc-white border border-ssc-border shadow-card hover:shadow-card-hover transition-all duration-300 overflow-hidden group hover-lift ${
        isGridView ? '' : 'flex gap-4'
      }`}>
        <div className={`relative ${isPlaceholder ? 'bg-ssc-black' : ''} ${isGridView ? 'aspect-[5/7]' : 'w-32 h-40 flex-shrink-0'}`}>
          <img
            src={card.imageUrl}
            alt={card.playerName}
            className={`w-full h-full ${isPlaceholder ? 'object-contain p-2' : 'object-cover group-hover:scale-105'} transition-transform duration-300`}
          />
          {card.featured && (
            <div className="absolute top-2 left-2 bg-ssc-gold text-white px-2 py-1 text-xs font-body font-semibold">
              <Star className="w-3 h-3 inline mr-1" />
              Featured
            </div>
          )}
        </div>

        <div className={`p-4 ${isGridView ? '' : 'flex-1'}`}>
          <div className="space-y-2">
            <h3 className="font-body font-bold text-lg text-ssc-text">{card.playerName}</h3>
            <p className="font-body text-sm text-ssc-text-secondary">{card.description}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 text-xs font-mono font-medium border ${
                  card.grade.includes('PSA 10')
                    ? 'border-green-300 bg-green-50 text-green-700'
                    : card.grade.includes('BGS')
                    ? 'border-ssc-border bg-ssc-ivory text-ssc-text'
                    : 'border-ssc-border bg-ssc-ivory text-ssc-text-secondary'
                }`}>
                  {card.grade}
                </span>
                {card.team && (
                  <span className="text-xs text-ssc-chrome-dark font-body">{card.team}</span>
                )}
              </div>
              {card.year && (
                <span className="text-xs text-ssc-chrome-dark font-mono">{card.year}</span>
              )}
            </div>

            {card.price && (
              <div className="font-mono text-2xl font-bold text-ssc-gold">
                ${card.price.toLocaleString()}
              </div>
            )}

            {card.notes && (
              <p className="font-body text-sm text-ssc-chrome-dark italic">{card.notes}</p>
            )}
          </div>

          <div className="mt-4">
            <div className="w-full bg-ssc-chrome-dark/10 border border-ssc-border text-ssc-chrome-dark px-4 py-2 font-body font-medium text-center flex items-center justify-center">
              <Clock className="w-4 h-4 mr-2" />
              Online Store Coming Soon
            </div>
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
      <div className="bg-ssc-white border border-ssc-border shadow-card p-6">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-ssc-chrome-dark" />
            <input
              type="text"
              placeholder="Search players, teams, or descriptions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-ivory text-ssc-text font-body"
            />
          </div>

          <div className="flex bg-ssc-ivory border border-ssc-border p-1">
            <button onClick={() => setViewMode('grid')} className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-ssc-white shadow-sm text-ssc-gold' : 'text-ssc-chrome-dark hover:text-ssc-text'}`}>
              <Grid className="w-4 h-4" />
            </button>
            <button onClick={() => setViewMode('list')} className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-ssc-white shadow-sm text-ssc-gold' : 'text-ssc-chrome-dark hover:text-ssc-text'}`}>
              <List className="w-4 h-4" />
            </button>
          </div>

          <button onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-2 px-4 py-2 bg-ssc-gold text-white font-body font-medium hover:bg-ssc-gold-dark transition-colors">
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        {showFilters && (
          <div className="mt-4 pt-4 border-t border-ssc-border grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-body font-medium text-ssc-text mb-1">Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="w-full px-3 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold bg-ssc-ivory text-ssc-text font-body">
                <option value="name">Player Name</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="year">Year (Newest First)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-ssc-text mb-1">Grade</label>
              <select value={filterGrade} onChange={(e) => setFilterGrade(e.target.value)} className="w-full px-3 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold bg-ssc-ivory text-ssc-text font-body">
                <option value="all">All Grades</option>
                <option value="PSA 10">PSA 10</option>
                <option value="PSA 9">PSA 9</option>
                <option value="BGS 9.5">BGS 9.5</option>
                <option value="SGC">SGC</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-body font-medium text-ssc-text mb-1">Price Range</label>
              <select value={filterPriceRange} onChange={(e) => setFilterPriceRange(e.target.value)} className="w-full px-3 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold bg-ssc-ivory text-ssc-text font-body">
                <option value="all">All Prices</option>
                <option value="0-100">Under $100</option>
                <option value="100-500">$100 - $500</option>
                <option value="500-1000">$500 - $1,000</option>
                <option value="1000-5000">$1,000 - $5,000</option>
                <option value="5000">$5,000+</option>
              </select>
            </div>
            <div className="flex items-end">
              <button onClick={() => { setSearchTerm(''); setSortBy('name'); setFilterGrade('all'); setFilterPriceRange('all'); }} className="w-full px-4 py-2 bg-ssc-chrome-dark text-white font-body hover:bg-ssc-text transition-colors">
                Clear Filters
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="text-sm text-ssc-text-secondary font-body mb-4">
        Showing {filteredCards.length} of {availableCards.length} cards
      </div>

      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
        {filteredCards.map((card) => (
          <CardItem key={card.id} card={card} />
        ))}
      </div>

      {filteredCards.length === 0 && (
        <div className="text-center py-12">
          <Search className="w-12 h-12 text-ssc-chrome-dark mx-auto mb-4" />
          <h3 className="font-headline text-lg text-ssc-text mb-2">NO CARDS FOUND</h3>
          <p className="font-body text-ssc-text-secondary">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
};