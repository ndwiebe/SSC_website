import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ProductCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  cta: string;
  gradient: string;
  external?: boolean;
  span?: 'normal' | 'wide';
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  icon,
  href,
  cta,
  gradient,
  external = false,
  span = 'normal',
}) => {
  const wrapperClass = `relative border border-ssc-border/80 bg-white/90 backdrop-blur-sm p-5 hover-lift flex flex-col ${
    span === 'wide' ? 'md:col-span-2' : ''
  }`;

  const content = (
    <>
      {/* Gradient accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${gradient}`} />

      {/* Icon + Title inline */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center flex-shrink-0">
          {icon}
        </div>
        <h3 className="font-headline text-lg tracking-wide text-ssc-text">
          {title}
        </h3>
      </div>

      {/* Description */}
      <p className="font-body text-sm text-ssc-text-muted mb-4 flex-1">
        {description}
      </p>

      {/* CTA */}
      <span className="inline-flex items-center min-h-[44px] text-ssc-gold font-body font-semibold hover:text-ssc-gold-dark transition-colors">
        {cta}
        <ArrowRight className="ml-2 w-4 h-4" />
      </span>
    </>
  );

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={wrapperClass}
      >
        {content}
      </a>
    );
  }

  return (
    <Link to={href} className={wrapperClass}>
      {content}
    </Link>
  );
};
