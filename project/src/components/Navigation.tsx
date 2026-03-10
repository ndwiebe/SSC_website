import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Catalog', href: '/catalog' },
    { name: 'Sell/Trade', href: '/sell-trade' },
    { name: 'Content', href: '/content' },
    { name: 'Consulting', href: '/consulting' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-ssc-surface sticky top-0 z-50 border-b border-ssc-border-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/ssc-logo.png"
              alt="Slab Savvy CPA Logo"
              className="w-11 h-11 rounded-full object-cover border-2 border-ssc-gold shadow-gold"
            />
            <div className="flex flex-col">
              <span className="font-headline text-lg tracking-wide text-white">SLAB SAVVY CPA</span>
              <span className="text-xs text-ssc-chrome">The Hobby's Accountant</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 text-sm font-body font-medium transition-colors duration-200 border-b-2 ${
                  isActive(item.href)
                    ? 'text-ssc-gold border-ssc-gold'
                    : 'text-white/80 border-transparent hover:text-ssc-gold hover:border-ssc-gold/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Placeholder for future login */}
          <div className="hidden md:flex items-center">
            {/* Login/cart will go here when auth is ready */}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white/80 hover:text-ssc-gold focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 text-base font-body font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-ssc-gold border-l-2 border-ssc-gold'
                      : 'text-white/80 hover:text-ssc-gold'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};