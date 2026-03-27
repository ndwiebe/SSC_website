import React from 'react';
import { Link } from 'react-router-dom';

interface MobileStickyCTAProps {
  text: string;
  href: string;
}

export const MobileStickyCTA: React.FC<MobileStickyCTAProps> = ({
  text,
  href,
}) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-ssc-bg/95 backdrop-blur border-t border-ssc-border px-4 py-3">
      <Link
        to={href}
        className="block w-full bg-ssc-gold hover:bg-ssc-gold-dark text-white font-body font-semibold text-center min-h-[44px] py-3 transition-colors"
      >
        {text}
      </Link>
    </div>
  );
};
