import React, { useState } from 'react';
import { CheckCircle, Loader2, Mail } from 'lucide-react';
import { captureEvent } from '../lib/posthog';

export const PlaybookForm: React.FC = () => {
  const [email, setEmail] = useState('');
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
      const supabaseKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
      const res = await fetch(`${supabaseUrl}/functions/v1/submit-waitlist`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${supabaseKey}`,
          'apikey': supabaseKey,
        },
        body: JSON.stringify({ email: email.trim(), source: 'playbook' }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        setError(data.error || 'Something went wrong. Try again.');
        return;
      }
      captureEvent('playbook_signup', {});
      setIsSuccess(true);
    } catch (_err) {
      setError('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-ssc-gold/10 border border-ssc-gold/30 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-ssc-gold" />
        </div>
        <h3 className="font-headline text-3xl text-ssc-gold tracking-wide mb-3">CHECK YOUR INBOX</h3>
        <p className="font-body text-ssc-text-muted max-w-md mx-auto">
          Your download link is on its way. If it's not there in two minutes, check spam — then rescue it.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
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
      {error && <p className="text-red-500 font-body text-sm">{error}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 btn-shine bg-ssc-gold text-ssc-black font-body font-bold hover:bg-ssc-gold-dark disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center min-h-[44px]"
      >
        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'SEND ME THE FREE PLAYBOOK'}
      </button>
    </form>
  );
};
