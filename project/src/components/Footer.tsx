import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ssc-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/ssc-logo.png"
                alt="Slab Savvy Logo"
                className="w-10 h-10 object-cover"
              />
              <span className="font-headline text-lg tracking-wide text-ssc-gold">
                SLAB SAVVY
              </span>
            </div>
            <p className="text-ssc-text-muted text-sm font-body">
              AI-powered tools for sports card collectors. Track inventory, stay tax-ready, and make smarter decisions.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-headline text-sm tracking-widest text-ssc-gold mb-4">
              PRODUCTS
            </h3>
            <ul className="space-y-1 font-body text-sm">
              <li>
                <Link
                  to="/waitlist"
                  className="min-h-[44px] inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  Slab Savvy Tracker
                </Link>
              </li>
              <li>
                <a
                  href="https://displaymycard.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  DisplayMyCard
                </a>
              </li>
              <li>
                <Link
                  to="/spreadsheet"
                  className="min-h-[44px] inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  Tax Playbook
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-headline text-sm tracking-widest text-ssc-gold mb-4">
              SERVICES
            </h3>
            <ul className="space-y-1 font-body text-sm">
              <li>
                <Link
                  to="/taxready"
                  className="min-h-[44px] inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  Tax Ready
                </Link>
              </li>
              <li>
                <a
                  href="mailto:slabsavvycpa@gmail.com?subject=AI%20Consulting%20Inquiry"
                  className="min-h-[44px] inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  AI Consulting
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="font-headline text-sm tracking-widest text-ssc-gold mb-4">
              CONNECT
            </h3>
            <ul className="space-y-1 font-body text-sm">
              <li>
                <a
                  href="mailto:slabsavvycpa@gmail.com"
                  className="min-h-[44px] inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  slabsavvycpa@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com/slabsavvy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="min-h-[44px] inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  Facebook
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-ssc-border-dark mt-8 pt-8 text-center text-ssc-text-muted text-sm font-body">
          <p>&copy; 2026 Slab Savvy. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
