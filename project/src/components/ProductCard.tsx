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
  const wrapperClass = `relative border border-ssc-border bg-ssc-surface p-8 hover-lift flex flex-col ${
    span === 'wide' ? 'md:col-span-2' : ''
  }`;

  const content = (
    <>
      {/* Gradient accent bar */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${gradient}`} />

      {/* Icon */}
      <div className="w-12 h-12 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center mb-6">
        {icon}
      </div>

      {/* Title */}
      <h3 className="font-headline text-xl tracking-wide text-ssc-text mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="font-body text-ssc-text-muted mb-8 flex-1">
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
