import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Plus, Minus, Trash2, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const CartPage: React.FC = () => {
  const { items, updateQuantity, removeFromCart, clearCart, calculateTotals } = useCart();
  const [selectedProvince, setSelectedProvince] = useState('AB');
  const navigate = useNavigate();

  const provinces = [
    { code: 'AB', name: 'Alberta' },
    { code: 'BC', name: 'British Columbia' },
    { code: 'MB', name: 'Manitoba' },
    { code: 'NB', name: 'New Brunswick' },
    { code: 'NL', name: 'Newfoundland and Labrador' },
    { code: 'NS', name: 'Nova Scotia' },
    { code: 'NT', name: 'Northwest Territories' },
    { code: 'NU', name: 'Nunavut' },
    { code: 'ON', name: 'Ontario' },
    { code: 'PE', name: 'Prince Edward Island' },
    { code: 'QC', name: 'Quebec' },
    { code: 'SK', name: 'Saskatchewan' },
    { code: 'YT', name: 'Yukon' }
  ];

  const totals = calculateTotals(selectedProvince);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-ssc-ivory">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="w-20 h-20 text-ssc-chrome-dark mx-auto mb-8" />
            <h1 className="font-headline text-3xl text-ssc-text tracking-wide mb-4">CART IS EMPTY</h1>
            <p className="font-body text-ssc-text-secondary mb-8 max-w-md mx-auto">
              No cards in your cart yet. Browse the catalog to find something good.
            </p>
            <Link
              to="/catalog"
              className="inline-flex items-center px-6 py-3 bg-ssc-gold text-white font-body font-semibold hover:bg-ssc-gold-dark transition-colors"
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
    <div className="min-h-screen bg-ssc-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-headline text-3xl text-ssc-text tracking-wide mb-2">YOUR CART</h1>
          <p className="font-body text-ssc-text-secondary">Review your cards before checkout</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.card.id} className="bg-ssc-white border border-ssc-border shadow-card p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={item.card.imageUrl}
                    alt={item.card.playerName}
                    className="w-20 h-28 object-cover"
                  />

                  <div className="flex-1">
                    <h3 className="font-body font-bold text-ssc-text text-lg">{item.card.playerName}</h3>
                    <p className="font-body text-ssc-text-secondary text-sm mb-2">{item.card.description}</p>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-mono text-xs border border-ssc-border bg-ssc-ivory text-ssc-text px-2 py-1">
                        {item.card.grade}
                      </span>
                      {item.card.team && (
                        <span className="text-xs text-ssc-chrome-dark font-body">{item.card.team}</span>
                      )}
                    </div>
                    <div className="font-mono text-2xl font-bold text-ssc-gold">
                      ${(item.card.price || 0).toLocaleString()}
                    </div>
                  </div>

                  <div className="flex flex-col items-end space-y-4">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.card.id, item.quantity - 1)}
                        className="w-8 h-8 bg-ssc-ivory border border-ssc-border hover:border-ssc-gold flex items-center justify-center transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-8 text-center font-mono font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.card.id, item.quantity + 1)}
                        className="w-8 h-8 bg-ssc-ivory border border-ssc-border hover:border-ssc-gold flex items-center justify-center transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.card.id)}
                      className="text-red-500 hover:text-red-700 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}

            <div className="text-center pt-4">
              <button
                onClick={clearCart}
                className="text-red-500 hover:text-red-700 font-body font-medium transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-ssc-white border border-ssc-border shadow-card p-6 sticky top-20">
              <h2 className="font-headline text-xl text-ssc-text tracking-wide mb-6">ORDER SUMMARY</h2>

              <div className="mb-6">
                <label className="block text-sm font-body font-medium text-ssc-text mb-2">Province</label>
                <select
                  value={selectedProvince}
                  onChange={(e) => setSelectedProvince(e.target.value)}
                  className="w-full px-3 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold bg-ssc-ivory text-ssc-text font-body"
                >
                  {provinces.map((province) => (
                    <option key={province.code} value={province.code}>
                      {province.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-3 mb-6 font-body">
                <div className="flex justify-between">
                  <span className="text-ssc-text-secondary">Subtotal</span>
                  <span className="font-mono font-medium text-ssc-text">${totals.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ssc-text-secondary">Shipping</span>
                  <span className="font-mono font-medium text-ssc-text">${totals.shipping.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ssc-text-secondary">{totals.taxInfo.taxType}</span>
                  <span className="font-mono font-medium text-ssc-text">${totals.tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-ssc-border pt-3">
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-ssc-text">Total</span>
                    <span className="font-mono text-ssc-gold">${totals.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => navigate('/payment', { state: { selectedProvince } })}
                className="w-full bg-ssc-gold hover:bg-ssc-gold-dark text-white px-6 py-3 font-body font-semibold transition-colors flex items-center justify-center"
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Proceed to Checkout
              </button>

              <div className="mt-4 text-center">
                <Link
                  to="/catalog"
                  className="text-ssc-gold hover:text-ssc-gold-dark font-body font-medium transition-colors"
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