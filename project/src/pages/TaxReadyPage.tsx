import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ProcessSteps } from '../components/ProcessSteps';
import { ContactForm } from '../components/ContactForm';

const CheckIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="square"
    strokeLinejoin="miter"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const processSteps = [
  {
    number: '01',
    title: 'SEND YOUR EXPORTS',
    description:
      'Export your data from eBay, COMC, 130point, MySlabs, or wherever you sell. CSV, PDF, screenshots — whatever you have digitally.',
  },
  {
    number: '02',
    title: 'I RECONCILE IT',
    description:
      'I match purchases to sales, flag trades, allocate grading fees, and identify gaps in your records.',
  },
  {
    number: '03',
    title: 'QUALITY CHECK',
    description:
      'Every file gets reviewed. Cost basis, currency conversions, platform fees — all checked and verified.',
  },
  {
    number: '04',
    title: 'ACCOUNTANT-READY',
    description:
      'You get a clean package your accountant can use directly. No back-and-forth. No shoebox of receipts.',
  },
];

const deliverables = [
  'Purchase and sale reconciliation across all platforms',
  'Grading fee allocation to individual cards',
  'Trade logging with fair market value estimates',
  'GST/HST tracking and threshold monitoring',
  'Year-end summary with totals by category',
  'Two tax-ready views: capital gains and business income',
];


export const TaxReadyPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-ssc-bg">
      <Helmet>
        <title>Tax Ready — Slab Savvy</title>
        <meta name="description" content="Behind on your records? I turn your digital exports into a clean, structured package your accountant can work with." />
      </Helmet>

      {/* Hero */}
      <div className="bg-ssc-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <h1 className="font-headline text-4xl md:text-6xl text-ssc-gold tracking-wide mb-6">
              YOUR RECORDS. TAX READY.
            </h1>
            <p className="font-body text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto">
              Send me your digital exports. I turn them into a clean, structured
              package your accountant can actually work with.
            </p>
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl md:text-4xl text-ssc-gold tracking-wide mb-4">
            HOW IT WORKS
          </h2>
          <p className="font-body text-lg text-ssc-text-muted max-w-2xl mx-auto">
            Four steps from messy exports to clean records.
          </p>
        </div>
        <ProcessSteps steps={processSteps} />
      </section>

      {/* What You Get */}
      <section className="bg-ssc-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl text-ssc-gold tracking-wide mb-4">
              WHAT YOU GET
            </h2>
            <p className="font-body text-lg text-gray-400 max-w-2xl mx-auto">
              A complete reconciliation package your accountant can use on day one.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="space-y-4">
              {deliverables.map((item, i) => (
                <div key={i} className="flex items-start space-x-4 p-4 border border-ssc-border-dark">
                  <CheckIcon className="w-5 h-5 text-ssc-gold flex-shrink-0 mt-0.5" />
                  <span className="font-body text-gray-400">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-headline text-3xl md:text-4xl text-ssc-gold tracking-wide mb-6">
              GET A QUOTE
            </h2>
            <p className="font-body text-lg text-ssc-text-muted mb-6">
              Pricing depends on your volume and how far behind you are. Send me
              your details and I'll give you a firm quote before any work starts.
            </p>
            <div className="bg-ssc-surface-dark border border-ssc-border-dark p-6">
              <p className="font-body text-gray-400 text-sm leading-relaxed">
                Not tax prep. Not tax advice. Organized records your accountant
                will thank you for.
              </p>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>
    </div>
  );
};
