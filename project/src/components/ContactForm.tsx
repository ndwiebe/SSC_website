import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    volume: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const subject = encodeURIComponent(
      `Tax Ready Inquiry — ${formData.name} (${formData.volume})`
    );
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nVolume: ${formData.volume}\n\n${formData.message}`
    );

    window.location.href = `mailto:slabsavvycpa@gmail.com?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="bg-ssc-surface border border-ssc-border shadow-card p-8 text-center">
        <div className="w-16 h-16 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-ssc-gold" />
        </div>
        <h3 className="font-headline text-2xl text-ssc-text tracking-wide mb-3">
          GOT IT
        </h3>
        <p className="font-body text-ssc-text-muted mb-4">
          Your email app should have opened with the details pre-filled.
          Hit send and I will get back to you within 24 hours.
        </p>
        <p className="font-body text-sm text-ssc-text-muted">
          If your email app did not open, send your details directly to{' '}
          <a
            href="mailto:hello@slabsavvycpa.com"
            className="text-ssc-gold hover:text-ssc-gold-dark font-medium transition-colors"
          >
            hello@slabsavvycpa.com
          </a>
        </p>
        <button
          onClick={() => {
            setIsSubmitted(false);
            setFormData({ name: '', email: '', volume: '', message: '' });
          }}
          className="mt-6 font-body text-ssc-gold hover:text-ssc-gold-dark font-medium transition-colors"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-ssc-surface border border-ssc-border shadow-card p-8">
      <h3 className="font-headline text-2xl text-ssc-text tracking-wide mb-6">
        GET A QUOTE
      </h3>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-sm font-body font-medium text-ssc-text mb-2">
            Name *
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full px-4 py-3 min-h-[44px] border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-bg text-ssc-text font-body"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-body font-medium text-ssc-text mb-2">
            Email *
          </label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, email: e.target.value }))
            }
            className="w-full px-4 py-3 min-h-[44px] border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-bg text-ssc-text font-body"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-body font-medium text-ssc-text mb-2">
            Transaction Volume *
          </label>
          <select
            required
            value={formData.volume}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, volume: e.target.value }))
            }
            className="w-full px-4 py-3 min-h-[44px] border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-bg text-ssc-text font-body"
          >
            <option value="">Select your volume</option>
            <option value="Under 100">Under 100 transactions</option>
            <option value="100-500">100-500 transactions</option>
            <option value="500+">500+ transactions</option>
            <option value="No idea">Honestly, no idea</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-body font-medium text-ssc-text mb-2">
            Message
          </label>
          <textarea
            rows={4}
            value={formData.message}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, message: e.target.value }))
            }
            placeholder="Tell me about your collection, platforms you sell on, and what you need organized."
            className="w-full px-4 py-3 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-bg text-ssc-text font-body"
          />
        </div>

        <button
          type="submit"
          className="w-full min-h-[44px] bg-ssc-gold hover:bg-ssc-gold-dark text-white px-6 py-3 font-body font-semibold transition-colors flex items-center justify-center"
        >
          <Send className="w-5 h-5 mr-2" />
          Send Inquiry
        </button>
      </form>
    </div>
  );
};
