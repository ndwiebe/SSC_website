import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Shield, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCards } from '../contexts/CardContext';
import { Card } from '../contexts/CardContext';

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

  const nextCard = () => {
    setCurrentCard((prev) => (prev + 1) % featuredCards.length);
  };

  const prevCard = () => {
    setCurrentCard((prev) => (prev - 1 + featuredCards.length) % featuredCards.length);
  };

  if (featuredCards.length === 0) {
    return (
      <div className="bg-gradient-to-br from-brand-primary-bg via-brand-button-hover to-brand-primary-text text-brand-secondary-text py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center mb-6">
            <img 
              src="/ChatGPT Image Jun 28, 2025, 09_11_57 PM.png" 
              alt="Slab Savvy CPA Logo" 
              className="w-24 h-24 rounded-full object-cover mr-6 shadow-brand-lg border-4 border-brand-accent-gold/20"
            />
            <div className="text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-brand-accent-gold">
                Slab Savvy CPA
              </h1>
              <p className="text-xl md:text-2xl text-brand-secondary-bg">
                The Hobby's Accountant
              </p>
            </div>
          </div>
          <p className="text-xl md:text-2xl mb-8 text-brand-secondary-bg">
            Where premium sports cards meet professional financial expertise
          </p>
        </div>
      </div>
    );
  }

  const card = featuredCards[currentCard];

  return (
    <div className="bg-gradient-to-br from-brand-primary-bg via-brand-button-hover to-brand-primary-text text-brand-secondary-text overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex items-center mb-6">
                <img 
                  src="/ChatGPT Image Jun 28, 2025, 09_11_57 PM.png" 
                  alt="Slab Savvy CPA Logo" 
                  className="w-24 h-24 rounded-full object-cover mr-6 shadow-brand-lg border-4 border-brand-accent-gold/20"
                />
                <div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-brand-accent-gold">
                    Slab Savvy CPA
                  </h1>
                  <p className="text-xl md:text-2xl text-brand-secondary-bg">
                    The Hobby's Accountant
                  </p>
                </div>
              </div>
              <p className="text-xl md:text-2xl text-brand-secondary-bg leading-relaxed">
                Where premium sports cards meet professional financial expertise
              </p>
            </div>

            {/* Featured Card Info */}
            <div className="bg-brand-secondary-text/10 backdrop-blur-sm rounded-lg p-6 space-y-4 border border-brand-border/30">
              <div className="flex items-center space-x-2 text-brand-secondary-bg mb-2">
                <Star className="w-5 h-5 text-brand-accent-gold" />
                <span className="text-sm font-medium">Featured Card</span>
              </div>
              <h3 className="text-2xl font-bold text-brand-accent-gold">{card.playerName}</h3>
              <p className="text-brand-secondary-bg">{card.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-brand-success" />
                  <span className="font-semibold">{card.grade}</span>
                </div>
                <div className="text-2xl font-bold text-brand-accent-gold">
                  ${card.price?.toLocaleString()}
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/catalog"
                className="bg-brand-accent-gold hover:bg-brand-button-hover text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                <TrendingUp className="w-5 h-5 mr-2" />
                Explore Cards
              </Link>
              <Link
                to="/consulting"
                className="bg-transparent border-2 border-brand-secondary-text hover:bg-brand-secondary-text hover:text-brand-primary-text px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center justify-center"
              >
                Get Consulting Help
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 pt-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-accent-gold">500+</div>
                <div className="text-sm text-brand-secondary-bg">Cards Traded</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-accent-gold">50+</div>
                <div className="text-sm text-brand-secondary-bg">Happy Clients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-brand-accent-gold">5★</div>
                <div className="text-sm text-brand-secondary-bg">Rating</div>
              </div>
            </div>
          </div>

          {/* Right Content - Card Carousel */}
          <div className="relative">
            <div className="relative aspect-[3/4] max-w-md mx-auto bg-gradient-to-br from-brand-secondary-bg to-brand-border rounded-2xl shadow-brand-xl overflow-hidden">
              <img
                src={card.imageUrl}
                alt={card.playerName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="bg-black/30 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-sm font-medium">{card.playerName}</div>
                  <div className="text-xs text-gray-300">{card.grade}</div>
                </div>
              </div>
            </div>

            {/* Carousel Controls */}
            {featuredCards.length > 1 && (
              <>
                <button
                  onClick={prevCard}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-2 rounded-full transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={nextCard}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 backdrop-blur-sm text-white p-2 rounded-full transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Dots */}
                <div className="flex justify-center space-x-2 mt-6">
                  {featuredCards.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentCard(index)}
                      className={`w-2 h-2 rounded-full transition-colors ${
                        index === currentCard ? 'bg-brand-accent-gold' : 'bg-brand-secondary-text/50'
                      }`}
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