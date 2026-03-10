import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, Facebook } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-ssc-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src="/ssc-logo.png"
                alt="Slab Savvy CPA Logo"
                className="w-11 h-11 rounded-full object-cover border-2 border-ssc-gold shadow-gold"
              />
              <div>
                <span className="font-headline text-lg tracking-wide text-ssc-gold">SLAB SAVVY CPA</span>
                <p className="text-xs text-ssc-chrome">The Hobby's Accountant</p>
              </div>
            </div>
            <p className="text-ssc-chrome-dark text-sm font-body">
              CPA and collector. Tax guidance, graded card sales, and consulting built for the hobby.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-headline text-sm tracking-widest text-ssc-gold mb-4">QUICK LINKS</h3>
            <ul className="space-y-2 font-body text-sm">
              <li><Link to="/" className="text-ssc-chrome hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/catalog" className="text-ssc-chrome hover:text-white transition-colors">Card Catalog</Link></li>
              <li><Link to="/consulting" className="text-ssc-chrome hover:text-white transition-colors">Consulting</Link></li>
              <li><Link to="/contact" className="text-ssc-chrome hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-headline text-sm tracking-widest text-ssc-gold mb-4">SERVICES</h3>
            <ul className="space-y-2 font-body text-sm">
              <li><Link to="/catalog" className="text-ssc-chrome hover:text-white transition-colors">Graded Card Sales</Link></li>
              <li><Link to="/consulting" className="text-ssc-chrome hover:text-white transition-colors">Tax Preparation</Link></li>
              <li><Link to="/consulting" className="text-ssc-chrome hover:text-white transition-colors">Business Consulting</Link></li>
              <li><Link to="/content" className="text-ssc-chrome hover:text-white transition-colors">Tax Playbook</Link></li>
            </ul>
          </div>

          {/* Ecosystem & Social */}
          <div>
            <h3 className="font-headline text-sm tracking-widest text-ssc-gold mb-4">ECOSYSTEM</h3>
            <ul className="space-y-2 font-body text-sm mb-6">
              <li><a href="https://displaymycard.com" target="_blank" rel="noopener noreferrer" className="text-ssc-chrome hover:text-ssc-gold transition-colors">DisplayMyCard</a></li>
              <li><Link to="/content" className="text-ssc-chrome hover:text-ssc-gold transition-colors">Tax Playbook</Link></li>
            </ul>
            <div className="flex space-x-4">
              <a href="#" className="text-ssc-chrome-dark hover:text-ssc-gold transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-ssc-chrome-dark hover:text-ssc-gold transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-ssc-chrome-dark hover:text-ssc-gold transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-ssc-border-dark mt-8 pt-8 text-center text-ssc-chrome-dark text-sm font-body">
          <p>&copy; 2025 Slab Savvy CPA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};