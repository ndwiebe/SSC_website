import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Tracker', href: '/waitlist' },
    { name: 'Tax Ready', href: '/taxready' },
    { name: 'Playbook', href: '/spreadsheet' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-ssc-bg/90 backdrop-blur-md sticky top-0 z-50 border-b border-ssc-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="/ssc-logo.png"
              alt="Slab Savvy Logo"
              className="w-10 h-10 object-cover"
            />
            <span className="font-headline text-xl tracking-wide text-ssc-text">
              SLAB SAVVY
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-4 py-2 text-sm font-body font-medium transition-colors border-b-2 ${
                  isActive(item.href)
                    ? 'text-ssc-gold border-ssc-gold'
                    : 'text-ssc-text border-transparent hover:text-ssc-gold hover:border-ssc-gold/50'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Link
              to="/waitlist"
              className="btn-shine bg-ssc-gold hover:bg-ssc-gold-dark text-white px-6 py-2 font-body font-semibold text-sm min-h-[44px] inline-flex items-center"
            >
              Join Waitlist
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-ssc-text hover:text-ssc-gold focus:outline-none min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                  <line x1="6" y1="6" x2="18" y2="18" />
                  <line x1="18" y1="6" x2="6" y2="18" />
                </svg>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                  <line x1="4" y1="6" x2="20" y2="6" />
                  <line x1="4" y1="12" x2="20" y2="12" />
                  <line x1="4" y1="18" x2="20" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 border-t border-ssc-border mt-2 pt-4">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-3 text-base font-body font-medium transition-colors min-h-[44px] ${
                    isActive(item.href)
                      ? 'text-ssc-gold border-l-2 border-ssc-gold'
                      : 'text-ssc-text hover:text-ssc-gold'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/waitlist"
                className="block btn-shine bg-ssc-gold hover:bg-ssc-gold-dark text-white px-3 py-3 font-body font-semibold text-base min-h-[44px] mt-2 text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                Join Waitlist
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
