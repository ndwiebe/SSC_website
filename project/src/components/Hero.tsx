import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCards } from '../contexts/CardContext';

export const Hero: React.FC = () => {
  const { featuredCards } = useCards();
  const [currentCard, setCurrentCard] = useState(0);

  useEffect(() => {
    if (featuredCards.length > 0) {
      const timer = setInterval(() => {
        setCurrentCard((prev) => (prev + 1) % featuredCards.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [featuredCards.length]);

  const nextCard = () => setCurrentCard((prev) => (prev + 1) % featuredCards.length);
  const prevCard = () => setCurrentCard((prev) => (prev - 1 + featuredCards.length) % featuredCards.length);

  // Empty state
  if (featuredCards.length === 0) {
    return (
      <div className="bg-ssc-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <div className="flex items-center space-x-4 mb-2">
                <img src="/ssc-logo.png" alt="Slab Savvy CPA Logo" className="w-16 h-16 rounded-full object-cover border-2 border-ssc-gold shadow-gold" />
                <div className="h-8 w-px bg-ssc-border-dark"></div>
                <span className="text-ssc-chrome text-sm font-body">CPA &bull; Collector &bull; The Hobby's Accountant</span>
              </div>
              <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl tracking-wide text-ssc-gold leading-none">
                YOUR CARDS.<br />YOUR TAXES.<br />HANDLED.
              </h1>
              <p className="text-lg md:text-xl text-ssc-chrome font-body max-w-lg">
                The only CPA in the hobby. Tax guidance, graded card sales, and consulting built for Canadian collectors.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <Link to="/catalog" className="bg-ssc-gold hover:bg-ssc-gold-dark text-white px-8 py-3 font-body font-semibold transition-colors inline-flex items-center justify-center">Browse Cards</Link>
                <Link to="/consulting" className="border-2 border-ssc-chrome/40 hover:border-ssc-gold hover:text-ssc-gold text-white px-8 py-3 font-body font-semibold transition-colors inline-flex items-center justify-center">Book a Consultation</Link>
              </div>
            </div>
            <div className="flex-1 max-w-md w-full">
              <div className="aspect-[5/7] bg-ssc-surface border border-ssc-border-dark">
                <img src="/card-placeholder.svg" alt="Card catalog coming soon" className="w-full h-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const card = featuredCards[currentCard];
  const isPlaceholder = card.imageUrl.includes('placeholder');

  return (
    <div className="bg-ssc-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-4 mb-2">
                <img src="/ssc-logo.png" alt="Slab Savvy CPA Logo" className="w-16 h-16 rounded-full object-cover border-2 border-ssc-gold shadow-gold" />
                <div className="h-8 w-px bg-ssc-border-dark"></div>
                <span className="text-ssc-chrome text-sm font-body">CPA &bull; Collector &bull; The Hobby's Accountant</span>
              </div>
              <h1 className="font-headline text-5xl md:text-6xl lg:text-7xl tracking-wide text-ssc-gold leading-none">
                YOUR CARDS.<br />YOUR TAXES.<br />HANDLED.
              </h1>
              <p className="text-lg md:text-xl text-ssc-chrome font-body max-w-lg">
                The only CPA in the hobby. Tax guidance, graded card sales, and consulting built for Canadian collectors.
              </p>
            </div>

            {/* Featured Card Info */}
            <div className="bg-ssc-surface border border-ssc-border-dark p-6 space-y-4">
              <div className="flex items-center space-x-2 text-ssc-chrome mb-2">
                <Star className="w-4 h-4 text-ssc-gold" />
                <span className="text-xs font-body font-medium uppercase tracking-wider">Featured Card</span>
              </div>
              <h3 className="font-headline text-2xl text-ssc-gold tracking-wide">{card.playerName.toUpperCase()}</h3>
              <p className="text-ssc-chrome font-body text-sm">{card.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-400" />
                  <span className="font-body font-semibold text-white">{card.grade}</span>
                </div>
                <div className="font-mono text-2xl font-bold text-ssc-gold">${card.price?.toLocaleString()}</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/catalog" className="bg-ssc-gold hover:bg-ssc-gold-dark text-white px-8 py-3 font-body font-semibold transition-colors inline-flex items-center justify-center">Browse Cards</Link>
              <Link to="/consulting" className="border-2 border-ssc-chrome/40 hover:border-ssc-gold hover:text-ssc-gold text-white px-8 py-3 font-body font-semibold transition-colors inline-flex items-center justify-center">Book a Consultation</Link>
            </div>
          </div>

          {/* Right Content - Card Display */}
          <div className="relative">
            <div className="relative aspect-[5/7] max-w-md mx-auto bg-ssc-surface border border-ssc-border-dark shadow-gold-lg overflow-hidden">
              <img
                src={card.imageUrl}
                alt={card.playerName}
                className={`w-full h-full ${isPlaceholder ? 'object-contain' : 'object-cover'}`}
              />
              {!isPlaceholder && (
                <>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="bg-ssc-black/60 backdrop-blur-sm p-3">
                      <div className="text-sm font-body font-medium">{card.playerName}</div>
                      <div className="text-xs text-ssc-chrome">{card.grade}</div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Carousel Controls */}
            {featuredCards.length > 1 && (
              <>
                <button onClick={prevCard} className="absolute left-2 top-1/2 -translate-y-1/2 bg-ssc-black/60 hover:bg-ssc-gold text-white p-2 transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button onClick={nextCard} className="absolute right-2 top-1/2 -translate-y-1/2 bg-ssc-black/60 hover:bg-ssc-gold text-white p-2 transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="flex justify-center space-x-2 mt-6">
                  {featuredCards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCard(index)}
                      className={`w-2 h-2 transition-colors ${index === currentCard ? 'bg-ssc-gold' : 'bg-ssc-chrome-dark'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};