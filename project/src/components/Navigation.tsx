import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut, Shield, ShoppingCart, BookOpen, DollarSign } from 'lucide-react';
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
    { name: 'Content Hub', href: '/content' },
    { name: 'Consulting', href: '/consulting' },
    { name: 'Contact', href: '/contact' },
  ];

  const isActive = (path: string) => location.pathname === path;
  const cartCount = getCartCount();

  return (
    <nav className="bg-brand-secondary-text shadow-brand-lg sticky top-0 z-50 border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/ChatGPT Image Jun 28, 2025, 09_11_57 PM.png" 
              alt="Slab Savvy CPA Logo" 
              className="w-12 h-12 rounded-full object-cover border-2 border-brand-accent-gold shadow-md"
            />
            <div className="flex flex-col">
              <span className="font-bold text-lg text-brand-primary-text">Slab Savvy CPA</span>
              <span className="text-xs text-brand-primary-text/70">The Hobby's Accountant</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                  isActive(item.href)
                    ? 'text-brand-accent-gold bg-brand-secondary-bg'
                    : 'text-brand-primary-text hover:text-brand-accent-gold hover:bg-brand-secondary-bg'
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
              className="relative text-brand-primary-text hover:text-brand-accent-gold transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-accent-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/account"
                  className="flex items-center space-x-2 text-brand-primary-text hover:text-brand-accent-gold transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </Link>
                {user.isAdmin && (
                  <Link
                    to="/admin"
                    className="flex items-center space-x-1 text-brand-accent-gold hover:text-brand-button-hover transition-colors"
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin</span>
                  </Link>
                )}
                <button
                  onClick={logout}
                  className="flex items-center space-x-1 text-brand-primary-text hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-brand-accent-gold text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-brand-button-hover transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Mobile Cart */}
            <Link
              to="/cart"
              className="relative text-brand-primary-text hover:text-brand-accent-gold transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-accent-gold text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-brand-primary-text hover:text-brand-accent-gold focus:outline-none"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive(item.href)
                      ? 'text-brand-accent-gold bg-brand-secondary-bg'
                      : 'text-brand-primary-text hover:text-brand-accent-gold hover:bg-brand-secondary-bg'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-brand-border pt-2 mt-2">
                {user ? (
                  <div className="space-y-2">
                    <Link
                      to="/account"
                      className="flex items-center space-x-2 px-3 py-2 text-brand-primary-text hover:text-brand-accent-gold transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="w-4 h-4" />
                      <span>{user.name}</span>
                    </Link>
                    {user.isAdmin && (
                      <Link
                        to="/admin"
                        className="flex items-center space-x-2 px-3 py-2 text-brand-accent-gold hover:text-brand-button-hover transition-colors"
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
                      className="flex items-center space-x-2 px-3 py-2 text-brand-primary-text hover:text-red-600 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-center bg-brand-accent-gold text-white rounded-md font-medium hover:bg-brand-button-hover transition-colors"
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