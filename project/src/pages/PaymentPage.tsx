import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CreditCard, Mail, Shield, ArrowLeft, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const PaymentPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { items, calculateTotals, clearCart } = useCart();
  const selectedProvince = location.state?.selectedProvince || 'AB';

  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'etransfer'>('paypal');
  const [customerInfo, setCustomerInfo] = useState({
    email: '', firstName: '', lastName: '', phone: '',
    shippingAddress: { street: '', city: '', province: selectedProvince, postalCode: '', country: 'Canada' }
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const totals = calculateTotals(selectedProvince);
  const provinces = [
    { code: 'AB', name: 'Alberta' }, { code: 'BC', name: 'British Columbia' },
    { code: 'MB', name: 'Manitoba' }, { code: 'NB', name: 'New Brunswick' },
    { code: 'NL', name: 'Newfoundland and Labrador' }, { code: 'NS', name: 'Nova Scotia' },
    { code: 'NT', name: 'Northwest Territories' }, { code: 'NU', name: 'Nunavut' },
    { code: 'ON', name: 'Ontario' }, { code: 'PE', name: 'Prince Edward Island' },
    { code: 'QC', name: 'Quebec' }, { code: 'SK', name: 'Saskatchewan' },
    { code: 'YT', name: 'Yukon' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setOrderComplete(true);
    setIsProcessing(false);
    clearCart();
  };

  if (items.length === 0 && !orderComplete) { navigate('/cart'); return null; }

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-ssc-ivory flex items-center justify-center">
        <div className="max-w-md w-full bg-ssc-white border border-ssc-border shadow-card p-8 text-center">
          <div className="w-16 h-16 bg-green-50 border border-green-200 flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="font-headline text-2xl text-ssc-text tracking-wide mb-4">ORDER CONFIRMED</h1>
          <p className="font-body text-ssc-text-secondary mb-6">
            Thanks for your purchase. You'll get an email with tracking info shortly.
          </p>
          {paymentMethod === 'etransfer' && (
            <div className="bg-ssc-gold/5 border border-ssc-gold/20 p-4 mb-6 text-left">
              <p className="font-body text-sm text-ssc-text">
                <strong>E-Transfer Instructions:</strong><br />
                Send to: payments@slabsavvycpa.com<br />
                Amount: <span className="font-mono">${totals.total.toFixed(2)}</span><br />
                Reference: Check your email for the order number
              </p>
            </div>
          )}
          <button onClick={() => navigate('/')} className="w-full bg-ssc-gold hover:bg-ssc-gold-dark text-white px-6 py-3 font-body font-semibold transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const inputClass = "w-full px-3 py-2 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-ivory text-ssc-text font-body";
  const labelClass = "block text-sm font-body font-medium text-ssc-text mb-2";

  return (
    <div className="min-h-screen bg-ssc-ivory">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <button onClick={() => navigate('/cart')} className="flex items-center text-ssc-text-secondary hover:text-ssc-gold transition-colors mb-4 font-body">
            <ArrowLeft className="w-5 h-5 mr-2" /> Back to Cart
          </button>
          <h1 className="font-headline text-3xl text-ssc-text tracking-wide">CHECKOUT</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-ssc-white border border-ssc-border shadow-card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h2 className="font-headline text-xl text-ssc-text tracking-wide mb-4">YOUR INFO</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div><label className={labelClass}>First Name *</label><input type="text" required value={customerInfo.firstName} onChange={(e) => setCustomerInfo(prev => ({ ...prev, firstName: e.target.value }))} className={inputClass} /></div>
                  <div><label className={labelClass}>Last Name *</label><input type="text" required value={customerInfo.lastName} onChange={(e) => setCustomerInfo(prev => ({ ...prev, lastName: e.target.value }))} className={inputClass} /></div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  <div><label className={labelClass}>Email *</label><input type="email" required value={customerInfo.email} onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))} className={inputClass} /></div>
                  <div><label className={labelClass}>Phone</label><input type="tel" value={customerInfo.phone} onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))} className={inputClass} /></div>
                </div>
              </div>

              <div>
                <h2 className="font-headline text-xl text-ssc-text tracking-wide mb-4">SHIPPING</h2>
                <div className="space-y-4">
                  <div><label className={labelClass}>Street *</label><input type="text" required value={customerInfo.shippingAddress.street} onChange={(e) => setCustomerInfo(prev => ({ ...prev, shippingAddress: { ...prev.shippingAddress, street: e.target.value } }))} className={inputClass} /></div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div><label className={labelClass}>City *</label><input type="text" required value={customerInfo.shippingAddress.city} onChange={(e) => setCustomerInfo(prev => ({ ...prev, shippingAddress: { ...prev.shippingAddress, city: e.target.value } }))} className={inputClass} /></div>
                    <div><label className={labelClass}>Province *</label><select required value={customerInfo.shippingAddress.province} onChange={(e) => setCustomerInfo(prev => ({ ...prev, shippingAddress: { ...prev.shippingAddress, province: e.target.value } }))} className={inputClass}>{provinces.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}</select></div>
                    <div><label className={labelClass}>Postal Code *</label><input type="text" required value={customerInfo.shippingAddress.postalCode} onChange={(e) => setCustomerInfo(prev => ({ ...prev, shippingAddress: { ...prev.shippingAddress, postalCode: e.target.value } }))} className={inputClass} placeholder="A1A 1A1" /></div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-headline text-xl text-ssc-text tracking-wide mb-4">PAYMENT</h2>
                <div className="space-y-3">
                  <label className="flex items-center p-4 border border-ssc-border cursor-pointer hover:border-ssc-gold transition-colors">
                    <input type="radio" name="paymentMethod" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="mr-3" />
                    <CreditCard className="w-5 h-5 mr-3 text-ssc-gold" />
                    <div><div className="font-body font-medium text-ssc-text">PayPal</div><div className="font-body text-sm text-ssc-text-secondary">Secure payment via PayPal</div></div>
                  </label>
                  <label className="flex items-center p-4 border border-ssc-border cursor-pointer hover:border-ssc-gold transition-colors">
                    <input type="radio" name="paymentMethod" value="etransfer" checked={paymentMethod === 'etransfer'} onChange={() => setPaymentMethod('etransfer')} className="mr-3" />
                    <Mail className="w-5 h-5 mr-3 text-ssc-gold" />
                    <div><div className="font-body font-medium text-ssc-text">E-Transfer</div><div className="font-body text-sm text-ssc-text-secondary">Canadian Interac e-Transfer</div></div>
                  </label>
                </div>
              </div>

              <button type="submit" disabled={isProcessing} className="w-full bg-ssc-gold hover:bg-ssc-gold-dark disabled:bg-ssc-chrome-dark text-white px-6 py-3 font-body font-semibold transition-colors flex items-center justify-center">
                {isProcessing ? <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <><Shield className="w-5 h-5 mr-2" />Complete Order</>}
              </button>
            </form>
          </div>

          <div className="bg-ssc-white border border-ssc-border shadow-card p-8 h-fit sticky top-20">
            <h2 className="font-headline text-xl text-ssc-text tracking-wide mb-6">ORDER SUMMARY</h2>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.card.id} className="flex items-center space-x-4">
                  <img src={item.card.imageUrl} alt={item.card.playerName} className="w-12 h-16 object-cover" />
                  <div className="flex-1">
                    <div className="font-body font-medium text-ssc-text">{item.card.playerName}</div>
                    <div className="font-body text-sm text-ssc-text-secondary">Qty: {item.quantity}</div>
                  </div>
                  <div className="font-mono font-medium text-ssc-text">${((item.card.price || 0) * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>
            <div className="space-y-3 border-t border-ssc-border pt-4 font-body">
              <div className="flex justify-between"><span className="text-ssc-text-secondary">Subtotal</span><span className="font-mono font-medium">${totals.subtotal.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-ssc-text-secondary">Shipping</span><span className="font-mono font-medium">${totals.shipping.toFixed(2)}</span></div>
              <div className="flex justify-between"><span className="text-ssc-text-secondary">{totals.taxInfo.taxType}</span><span className="font-mono font-medium">${totals.tax.toFixed(2)}</span></div>
              <div className="border-t border-ssc-border pt-3"><div className="flex justify-between text-lg font-bold"><span className="text-ssc-text">Total</span><span className="font-mono text-ssc-gold">${totals.total.toFixed(2)}</span></div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};