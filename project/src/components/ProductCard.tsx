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
  const wrapperClass = `group relative border border-ssc-border/80 bg-white/90 backdrop-blur-sm p-5 card-hover flex flex-col ${
    span === 'wide' ? 'md:col-span-2' : ''
  }`;

  const content = (
    <>
      {/* Gradient accent bar — animated on hover */}
      <div className={`absolute top-0 left-0 right-0 h-1 ${gradient} accent-bar-animated`} />

      {/* Icon + Title inline */}
      <div className="flex items-center gap-3 mb-3">
        <div className="w-10 h-10 bg-ssc-gold/10 border border-ssc-gold/20 flex items-center justify-center flex-shrink-0 transition-all duration-300 group-hover:bg-ssc-gold/20 group-hover:border-ssc-gold/40 group-hover:shadow-[0_0_12px_rgba(201,162,39,0.2)]">
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

      {/* CTA with arrow slide */}
      <span className="inline-flex items-center min-h-[44px] text-ssc-gold font-body font-semibold transition-all duration-300 group-hover:text-ssc-gold-dark">
        {cta}
        <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
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
