import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileSpreadsheet, Lock, CheckCircle, ArrowRight, BookOpen, Clock, Download, Table2, Calculator, BarChart3 } from 'lucide-react';

export const SpreadsheetPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sheetUrl, setSheetUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const res = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/validate-spreadsheet-code`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
            'apikey': import.meta.env.VITE_SUPABASE_ANON_KEY,
          },
          body: JSON.stringify({ email, code }),
        }
      );

      const data = await res.json();

      if (data.success) {
        setSheetUrl(data.sheet_url);
        setIsUnlocked(true);
      } else {
        setError(data.error || 'Invalid code.');
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Unlocked state — show the spreadsheet link
  if (isUnlocked) {
    return (
      <div className="min-h-screen bg-ssc-ivory">
        <div className="bg-ssc-black text-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
            <div className="w-16 h-16 bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
            <h1 className="font-headline text-3xl md:text-4xl text-ssc-gold tracking-wide mb-4">
              YOU'RE IN
            </h1>
            <p className="font-body text-ssc-chrome max-w-xl mx-auto">
              Your tracking spreadsheet is ready. Make a copy to your own Google Drive and start tracking.
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Main CTA */}
          <div className="bg-ssc-white border border-ssc-border shadow-card p-8 text-center mb-8">
            <FileSpreadsheet className="w-12 h-12 text-ssc-gold mx-auto mb-4" />
            <h2 className="font-headline text-2xl text-ssc-text tracking-wide mb-3">CARD COLLECTOR'S TAX TRACKER</h2>
            <p className="font-body text-ssc-text-secondary mb-6">
              Google Sheets template with 8 tabs covering purchases, sales, trades, box allocations,
              grading submissions, fees, GST/HST tracking, and year-end summaries.
            </p>
            <a
              href={sheetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-ssc-gold hover:bg-ssc-gold-dark text-white px-8 py-3 font-body font-semibold transition-colors inline-flex items-center justify-center"
            >
              <Download className="w-5 h-5 mr-2" />
              Open Google Sheet (Make a Copy)
            </a>
            <p className="font-body text-xs text-ssc-chrome-dark mt-4">
              Click "File" then "Make a copy" to save it to your own Google Drive.
            </p>
          </div>

          {/* What's Inside */}
          <div className="bg-ssc-white border border-ssc-border shadow-card p-8 mb-8">
            <h3 className="font-headline text-xl text-ssc-text tracking-wide mb-6">WHAT'S IN THE SPREADSHEET</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: Table2, title: 'Purchases', desc: 'Track every card you buy with cost basis' },
                { icon: BarChart3, title: 'Sales', desc: 'Platform, fees, shipping, net cash' },
                { icon: ArrowRight, title: 'Trades', desc: 'FMV tracking with comp source' },
                { icon: FileSpreadsheet, title: 'Box & Break Allocations', desc: 'Split box costs to individual cards' },
                { icon: CheckCircle, title: 'Grading Submissions', desc: 'Fees, turnaround, outcomes' },
                { icon: Calculator, title: 'GST/HST Tracker', desc: 'Rolling 4-quarter threshold alert' },
                { icon: BookOpen, title: 'Year-End Summary', desc: 'Capital gains and business views' },
                { icon: Download, title: 'Tax-Ready Exports', desc: 'Hand it straight to your accountant' },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-start space-x-3 p-3 border border-ssc-border">
                    <Icon className="w-5 h-5 text-ssc-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-body font-semibold text-ssc-text text-sm">{item.title}</div>
                      <div className="font-body text-ssc-text-secondary text-xs">{item.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Back links */}
          <div className="text-center space-y-4">
            <p className="font-body text-ssc-text-secondary text-sm">
              Questions about the spreadsheet? Check Chapter 4 of the Tax Playbook for the full walkthrough.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/"
                className="font-body text-ssc-gold hover:text-ssc-gold-dark font-medium transition-colors"
              >
                Back to Home
              </Link>
              <Link
                to="/contact"
                className="font-body text-ssc-gold hover:text-ssc-gold-dark font-medium transition-colors"
              >
                Need Help? Contact Me
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Locked state — email + code gate
  return (
    <div className="min-h-screen bg-ssc-ivory">
      {/* Header */}
      <div className="bg-ssc-black text-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <div className="w-16 h-16 bg-ssc-gold/10 border border-ssc-gold/30 flex items-center justify-center mx-auto mb-6">
            <FileSpreadsheet className="w-8 h-8 text-ssc-gold" />
          </div>
          <h1 className="font-headline text-3xl md:text-4xl text-ssc-gold tracking-wide mb-4">
            TAX TRACKING SPREADSHEET
          </h1>
          <p className="font-body text-xl text-ssc-chrome max-w-xl mx-auto">
            The tracking spreadsheet included with The Card Collector's Tax Playbook.
            Enter your email and access code below.
          </p>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Access Form */}
        <div className="bg-ssc-white border border-ssc-border shadow-card p-8">
          <div className="flex items-center space-x-3 mb-6">
            <Lock className="w-5 h-5 text-ssc-gold" />
            <h2 className="font-headline text-xl text-ssc-text tracking-wide">ENTER YOUR ACCESS CODE</h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-body font-medium text-ssc-text mb-2">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-ivory text-ssc-text font-body"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-body font-medium text-ssc-text mb-2">
                Access Code *
              </label>
              <input
                type="text"
                required
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                className="w-full px-4 py-3 border border-ssc-border focus:ring-2 focus:ring-ssc-gold focus:border-transparent bg-ssc-ivory text-ssc-text font-mono tracking-wider"
                placeholder="PLAYBOOK2025"
              />
              <p className="font-body text-xs text-ssc-chrome-dark mt-2">
                Your access code is on the last page of the Tax Playbook.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 p-3">
                <p className="font-body text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-ssc-gold hover:bg-ssc-gold-dark disabled:bg-ssc-chrome-dark text-white px-6 py-3 font-body font-semibold transition-colors flex items-center justify-center"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <>
                  <Lock className="w-4 h-4 mr-2" />
                  Unlock Spreadsheet
                </>
              )}
            </button>
          </form>
        </div>

        {/* Don't have the code? */}
        <div className="bg-ssc-surface border border-ssc-border-dark p-6 mt-8 text-center">
          <h3 className="font-headline text-lg text-ssc-gold tracking-wide mb-3">DON'T HAVE A CODE?</h3>
          <p className="font-body text-ssc-chrome text-sm mb-4">
            The access code comes with The Card Collector's Tax Playbook.
            It's a $29 digital guide covering everything Canadian collectors need to know
            about taxes on card sales.
          </p>
          <div className="flex items-center justify-center space-x-3">
            <span className="font-mono text-xl font-bold text-ssc-gold">$29</span>
            <span className="inline-flex items-center px-3 py-1 bg-ssc-gold/10 border border-ssc-gold/20 text-ssc-gold text-xs font-mono font-medium">
              <Clock className="w-3 h-3 mr-1" />
              LAUNCHING SOON
            </span>
          </div>
        </div>

        {/* What you get */}
        <div className="bg-ssc-white border border-ssc-border shadow-card p-6 mt-8">
          <h3 className="font-headline text-lg text-ssc-text tracking-wide mb-4">WHAT'S IN THE SPREADSHEET</h3>
          <div className="space-y-3">
            {[
              'Purchase and sale tracking with cost basis',
              'Box and break cost allocation (link individual cards to a box purchase)',
              'Trade logging with FMV and comp sources',
              'Grading submission tracker with fee roll-up',
              'GST/HST rolling threshold alert (warns you before you hit $30K)',
              'Year-end summary ready to hand to your accountant',
              'Two tax-ready export views (capital gains and business income)',
            ].map((item, i) => (
              <div key={i} className="flex items-start space-x-3">
                <CheckCircle className="w-4 h-4 text-ssc-gold flex-shrink-0 mt-0.5" />
                <span className="font-body text-ssc-text-secondary text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};