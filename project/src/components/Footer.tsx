import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Youtube, MessageCircle, Users } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-primary-text text-brand-secondary-text">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/ChatGPT Image Jun 28, 2025, 09_11_57 PM.png" 
                alt="Slab Savvy CPA Logo" 
                className="w-12 h-12 rounded-full object-cover border-2 border-brand-accent-gold shadow-md"
              />
              <div>
                <span className="font-bold text-lg text-brand-accent-gold">Slab Savvy CPA</span>
                <p className="text-sm text-brand-border">The Hobby's Accountant</p>
              </div>
            </div>
            <p className="text-brand-border text-sm">
              Professional sports card trading and expert accounting services for collectors and businesses.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4 text-brand-accent-gold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-brand-border hover:text-brand-secondary-text transition-colors">Home</Link></li>
              <li><Link to="/catalog" className="text-brand-border hover:text-brand-secondary-text transition-colors">Card Catalog</Link></li>
              <li><Link to="/consulting" className="text-brand-border hover:text-brand-secondary-text transition-colors">Consulting</Link></li>
              <li><Link to="/contact" className="text-brand-border hover:text-brand-secondary-text transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4 text-brand-accent-gold">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/catalog" className="text-brand-border hover:text-brand-secondary-text transition-colors">Sports Card Trading</Link></li>
              <li><Link to="/consulting" className="text-brand-border hover:text-brand-secondary-text transition-colors">Tax Preparation</Link></li>
              <li><Link to="/consulting" className="text-brand-border hover:text-brand-secondary-text transition-colors">Business Consulting</Link></li>
              <li><Link to="/consulting" className="text-brand-border hover:text-brand-secondary-text transition-colors">AI Automation</Link></li>
            </ul>
          </div>

          {/* Social & Community */}
          <div>
            <h3 className="font-semibold mb-4 text-brand-accent-gold">Connect</h3>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-brand-border hover:text-brand-secondary-text transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-brand-border hover:text-brand-secondary-text transition-colors">
                <Youtube className="w-5 h-5" />
              </a>
              <a href="#" className="text-brand-border hover:text-brand-secondary-text transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href="#" className="text-brand-border hover:text-brand-secondary-text transition-colors">
                <Users className="w-5 h-5" />
              </a>
            </div>
            <div className="text-sm text-brand-border">
              <p>Join our community:</p>
              <a href="#" className="text-brand-accent-gold hover:text-brand-button-hover block">Discord Community</a>
              <a href="#" className="text-green-400 hover:text-green-300 block">WhatsApp Group</a>
            </div>
          </div>
        </div>

        <div className="border-t border-brand-border mt-8 pt-8 text-center text-brand-border">
          <p>&copy; 2025 Slab Savvy CPA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};