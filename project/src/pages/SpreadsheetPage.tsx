import React from 'react';
import { FileSpreadsheet, Clock, CheckCircle } from 'lucide-react';
import { SpreadsheetForm } from '../components/SpreadsheetForm';

export const SpreadsheetPage: React.FC = () => {
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

      {/* Form */}
      <SpreadsheetForm />

      {/* Don't have the code? */}
      <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-ssc-surface border border-ssc-border-dark p-6 text-center">
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
                <svg className="w-4 h-4 text-ssc-gold flex-shrink-0 mt-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="font-body text-ssc-text-secondary text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
