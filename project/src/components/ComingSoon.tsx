import React from 'react';
import { Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ComingSoonProps {
  title?: string;
  message?: string;
  showHomeLink?: boolean;
}

export const ComingSoon: React.FC<ComingSoonProps> = ({
  title = 'COMING SOON',
  message = 'This feature is being built. Check back soon.',
  showHomeLink = true
}) => {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="w-16 h-16 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center mx-auto mb-6">
          <Clock className="w-8 h-8 text-ssc-gold" />
        </div>
        <h1 className="font-headline text-3xl text-ssc-gold tracking-wide mb-4">{title}</h1>
        <p className="font-body text-ssc-text-secondary mb-8">{message}</p>
        {showHomeLink && (
          <Link
            to="/"
            className="bg-ssc-gold hover:bg-ssc-gold-dark text-white px-8 py-3 font-body font-semibold transition-colors inline-block"
          >
            Back to Home
          </Link>
        )}
      </div>
    </div>
  );
};

export const ComingSoonBadge: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <span className={`inline-flex items-center px-2 py-1 bg-ssc-gold/10 border border-ssc-gold/20 text-ssc-gold text-xs font-mono font-medium ${className}`}>
      <Clock className="w-3 h-3 mr-1" />
      COMING SOON
    </span>
  );
};