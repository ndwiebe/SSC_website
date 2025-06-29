import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Mail, Shield, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, calculateTotals, clearCart } = useCart();
  const selectedProvince = location.state?.selectedProvince || 'ON';
  
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'etransfer'>('paypal');
  const [customerInfo, setCustomerInfo] = useState({
    email: '',
    firstName: '',
    lastName: '',
    phone: '',
    shippingAddress: {
      street: '',
      city: '',
      province: selectedProvince,
      postalCode: '',
      country: 'Canada'
    }
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const totals = calculateTotals(selectedProvince);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setOrderComplete(true);
    setIsProcessing(false);
    clearCart();
  };

  if (items.length === 0 && !orderComplete) {
    navigate('/cart');
    return null;
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-brand-primary-bg flex items-center justify-center">
        <div className="max-w-md w-full bg-brand-secondary-text rounded-xl shadow-brand-lg p-8 text-center border border-brand-border">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-brand-primary-text mb-4">Order Confirmed!</h1>
          <p className="text-brand-primary-text/70 mb-6">
            Thank you for your purchase. You'll receive an email confirmation shortly with tracking information.
          </p>
          {paymentMethod === 'etransfer' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-yellow-800">
                <strong>E-Transfer Instructions:</strong><br />
                Send payment to: payments@slabsavvy.com<br />
                Amount: ${totals.total.toFixed(2)}<br />
                Reference: Your order number will be emailed to you
              </p>
            </div>
          )}
          <button
            onClick={() => navigate('/')}
            className="w-full bg-brand-accent-gold hover:bg-brand-button-hover text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-brand-primary-bg">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center text-brand-secondary-text hover:text-brand-accent-gold transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-brand-secondary-text">Checkout</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Form */}
          <div className="bg-brand-secondary-text rounded-xl shadow-brand p-8 border border-brand-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Customer Information */}
              <div>
                <h2 className="text-xl font-bold text-brand-primary-text mb-4">Customer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-primary-text mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))}
                      className="w-full px-3 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-primary-text mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))}
                      className="w-full px-3 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-primary-text mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full px-3 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-primary-text mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-3 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div>
                <h2 className="text-xl font-bold text-brand-primary-text mb-4">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-primary-text mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerInfo.shippingAddress.street}
                      onChange={(e) => setCustomerInfo(prev => ({
                        ...prev,
                        shippingAddress: { ...prev.shippingAddress, street: e.target.value }
                      }))}
                      className="w-full px-3 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-brand-primary-text mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.shippingAddress.city}
                        onChange={(e) => setCustomerInfo(prev => ({
                          ...prev,
                          shippingAddress: { ...prev.shippingAddress, city: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-primary-text mb-2">
                        Province *
                      </label>
                      <select
                        required
                        value={customerInfo.shippingAddress.province}
                        onChange={(e) => setCustomerInfo(prev => ({
                          ...prev,
                          shippingAddress: { ...prev.shippingAddress, province: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                      >
                        {provinces.map((province) => (
                          <option key={province.code} value={province.code}>
                            {province.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brand-primary-text mb-2">
                        Postal Code *
                      </label>
                      <input
                        type="text"
                        required
                        value={customerInfo.shippingAddress.postalCode}
                        onChange={(e) => setCustomerInfo(prev => ({
                          ...prev,
                          shippingAddress: { ...prev.shippingAddress, postalCode: e.target.value }
                        }))}
                        className="w-full px-3 py-2 border border-brand-border rounded-lg focus:ring-2 focus:ring-brand-accent-gold bg-brand-secondary-bg text-brand-primary-text"
                        placeholder="A1A 1A1"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="text-xl font-bold text-brand-primary-text mb-4">Payment Method</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-brand-border rounded-lg cursor-pointer hover:bg-brand-secondary-bg transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="paypal"
                      checked={paymentMethod === 'paypal'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'paypal')}
                      className="mr-3"
                    />
                    <CreditCard className="w-5 h-5 mr-3 text-blue-600" />
                    <div>
                      <div className="font-medium">PayPal</div>
                      <div className="text-sm text-brand-primary-text/70">Pay securely with PayPal</div>
                    </div>
                  </label>
                  
                  <label className="flex items-center p-4 border border-brand-border rounded-lg cursor-pointer hover:bg-brand-secondary-bg transition-colors">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="etransfer"
                      checked={paymentMethod === 'etransfer'}
                      onChange={(e) => setPaymentMethod(e.target.value as 'etransfer')}
                      className="mr-3"
                    />
                    <Mail className="w-5 h-5 mr-3 text-green-600" />
                    <div>
                      <div className="font-medium">E-Transfer</div>
                      <div className="text-sm text-brand-primary-text/70">Canadian Interac e-Transfer</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-brand-accent-gold hover:bg-brand-button-hover disabled:bg-brand-border text-white px-6 py-3 rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                {isProcessing ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <Shield className="w-5 h-5 mr-2" />
                    Complete Order
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-brand-secondary-text rounded-xl shadow-brand p-8 border border-brand-border h-fit">
            <h2 className="text-xl font-bold text-brand-primary-text mb-6">Order Summary</h2>
            
            {/* Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.card.id} className="flex items-center space-x-4">
                  <img
                    src={item.card.imageUrl}
                    alt={item.card.playerName}
                    className="w-12 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-brand-primary-text">{item.card.playerName}</div>
                    <div className="text-sm text-brand-primary-text/70">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-medium">${((item.card.price || 0) * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="space-y-3 border-t border-brand-border pt-4">
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
          </div>
        </div>
      </div>
    </div>
  );
};