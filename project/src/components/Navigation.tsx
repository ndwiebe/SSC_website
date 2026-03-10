import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Shield, ShoppingCart } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

export const Navigation: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();
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
  const cartCount = getCartCount();

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

          {/* User Menu & Cart */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Cart */}
            <Link
              to="/cart"
              className="relative text-white/80 hover:text-ssc-gold transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-ssc-gold text-white text-xs w-5 h-5 flex items-center justify-center font-mono font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/account"
                  className="flex items-center space-x-2 text-white/80 hover:text-ssc-gold transition-colors text-sm"
                >
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </Link>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 text-ssc-gold hover:text-ssc-gold-light transition-colors text-sm"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-white/60 hover:text-red-400 transition-colors text-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-ssc-gold text-white px-5 py-2 text-sm font-body font-semibold hover:bg-ssc-gold-dark transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative text-white/80 hover:text-ssc-gold transition-colors"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-ssc-gold text-white text-xs w-5 h-5 flex items-center justify-center font-mono font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

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
              <div className="border-t border-ssc-border-dark pt-2 mt-2">
                {user ? (
                  <div className="space-y-1">
                    <Link
                      to="/account"
                      className="flex items-center space-x-2 px-3 py-2 text-white/80 hover:text-ssc-gold transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>{user.name}</span>
                    </Link>
                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center space-x-2 px-3 py-2 text-ssc-gold"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <Shield className="w-4 h-4" />
                        <span>Admin</span>
                      </Link>
                    )}
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center space-x-2 px-3 py-2 text-white/60 hover:text-red-400 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-center bg-ssc-gold text-white font-body font-medium hover:bg-ssc-gold-dark transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};