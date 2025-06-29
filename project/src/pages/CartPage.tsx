import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart, calculateTotals } = useCart();
  const [selectedProvince, setSelectedProvince] = useState('ON');
  const navigate = useNavigate();

  const provinces = [
    { code: 'ON', name: 'Ontario' },
    { code: 'QC', name: 'Quebec' },
    { code: 'BC', name: 'British Columbia' },
    { code: 'AB', name: 'Alberta' },
    { code: 'SK', name: 'Saskatchewan' },
    { code: 'MB', name: 'Manitoba' },
    { code: 'NB', name: 'New Brunswick' },
    { code: 'NS', name: 'Nova Scotia' },
    { code: 'PE', name: 'Prince Edward Island' },
    { code: 'NL', name: 'Newfoundland and Labrador' },
    { code: 'NT', name: 'Northwest Territories' },
    { code: 'NU', name: 'Nunavut' },
    { code: 'YT', name: 'Yukon' }
  ];

  const totals = calculateTotals(selectedProvince);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-brand-primary-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="w-24 h-24 text-brand-border mx-auto mb-8" />
            <h1 className="text-3xl font-bold text-brand-secondary-text mb-4">Your Cart is Empty</h1>
            <p className="text-brand-secondary-text/70 mb-8 max-w-md mx-auto">
              Looks like you haven't added any cards to your cart yet. Browse our collection to find your next grail!
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center px-6 py-3 bg-brand-accent-gold text-white font-semibold rounded-lg hover:bg-brand-button-hover transition-colors"
            >
              Browse Cards
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-primary-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-secondary-text mb-2">Shopping Cart</h1>
          <p className="text-brand-secondary-text/70">Review your items and proceed to checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.card.id} className="bg-brand-secondary-text rounded-xl shadow-brand p-6 border border-brand-border">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.card.imageUrl}
                    alt={item.card.playerName}
                    className="w-20 h-28 object-cover rounded-lg"
                  />
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-brand-primary-text text-lg">{item.card.playerName}</h3>
                    <p className="text-brand-primary-text/70 mb-2">{item.card.description}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-md text-xs font-medium">
                        {item.card.grade}
                      </span>
                      {item.card.team && (
                        <span className="text-xs text-brand-border">{item.card.team}</span>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-brand-accent-gold">
                      ${(item.card.price || 0).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.card.id, item.quantity - 1)}
                        className="w-8 h-8 bg-brand-secondary-bg hover:bg-brand-border rounded-full flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.card.id, item.quantity + 1)}
                        className="w-8 h-8 bg-brand-secondary-bg hover:bg-brand-border rounded-full flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.card.id)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear Cart */}
            <div className="text-center pt-4">
              <button
                onClick={clearCart}
                className="text-red-600 hover:text-red-800 font-medium transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-brand-secondary-text rounded-xl shadow-brand p-6 border border-brand-border sticky top-8">
              <h2 className="text-xl font-bold text-brand-primary-text mb-6">Order Summary</h2>
              
              {/* Province Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-brand-primary-text mb-2">
                  Province/Territory
                </label>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full px-3 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                >
                  {provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Totals */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-brand-primary-text">Subtotal</span>
                  <span className="font-medium">${totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-primary-text">Shipping</span>
                  <span className="font-medium">${totals.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-brand-primary-text">{totals.taxInfo.taxType}</span>
                  <span className="font-medium">${totals.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-brand-border pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-brand-primary-text">Total</span>
                    <span className="text-brand-accent-gold">${totals.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={() => navigate('/payment', { state: { selectedProvince } })}
                className="w-full bg-brand-accent-gold hover:bg-brand-button-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center">
                <Link
                  to="/catalog"
                  className="text-brand-accent-gold hover:text-brand-button-hover font-medium transition-colors"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};