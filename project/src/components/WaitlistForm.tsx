import React, { useState } from 'react';
import { CheckCircle, Loader2, Mail } from 'lucide-react';
import { captureEvent } from '../lib/posthog';

const VOLUME_OPTIONS = [
  { value: '', label: 'How many cards do you move per month?' },
  { value: 'Under 50', label: 'Under 50' },
  { value: '50-200', label: '50 - 200' },
  { value: '200-500', label: '200 - 500' },
  { value: '500+', label: '500+' },
];

export const WaitlistForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [monthlyVolume, setMonthlyVolume] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
      const res = await fetch(`${supabaseUrl}/functions/v1/submit-waitlist`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          monthly_volume: monthlyVolume || null,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        setError(data.error || 'Something went wrong. Try again.');
        return;
      }

      captureEvent('waitlist_signup', {
        monthly_volume: monthlyVolume || 'not_specified',
      });
      setIsSuccess(true);
    } catch (_err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-ssc-gold/10 border border-ssc-gold/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-ssc-gold" />
        </div>
        <h3 className="font-headline text-3xl md:text-4xl text-ssc-gold tracking-wide mb-3">
          YOU'RE ON THE LIST
        </h3>
        <p className="font-body text-ssc-text-muted max-w-md mx-auto">
          We'll reach out when beta spots open up. Keep an eye on your inbox.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
      {/* Email */}
      <div className="relative">
        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-ssc-text-muted" />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="w-full pl-11 pr-4 py-3 min-h-[44px] bg-white border border-ssc-border text-ssc-text font-body placeholder:text-ssc-text-muted/60 focus:outline-none focus:border-ssc-gold focus:ring-1 focus:ring-ssc-gold transition-colors"
        />
      </div>

      {/* Monthly Volume */}
      <div className="relative">
        <select
          value={monthlyVolume}
          onChange={(e) => setMonthlyVolume(e.target.value)}
          className="w-full px-4 pr-10 py-3 min-h-[44px] bg-white border border-ssc-border text-ssc-text font-body focus:outline-none focus:border-ssc-gold focus:ring-1 focus:ring-ssc-gold transition-colors appearance-none cursor-pointer"
        >
          {VOLUME_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ssc-text-muted pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="square" d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Error */}
      {error && (
        <p className="text-red-500 font-body text-sm">{error}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 btn-shine bg-ssc-gold text-white font-body font-semibold hover:bg-ssc-gold-dark disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center min-h-[44px]"
      >
        {isSubmitting ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          'JOIN THE BETA'
        )}
      </button>
    </form>
  );
};
