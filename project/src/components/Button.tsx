import React from 'react';
import { Link } from 'react-router-dom';

type ButtonVariant = 'primary' | 'secondary' | 'dark';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  href: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-ssc-gold text-white hover:bg-ssc-gold-dark btn-shine',
  secondary: 'border-2 border-white/80 text-white btn-ghost-glow',
  dark: 'bg-ssc-black text-white hover:bg-ssc-surface-dark btn-shine',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm min-h-[44px]',
  md: 'px-6 py-3 text-base min-h-[44px]',
  lg: 'px-8 py-4 text-lg min-h-[44px]',
};

export const Button: React.FC<ButtonProps> = ({
  href,
  variant = 'primary',
  size = 'md',
  children,
  external = false,
  className = '',
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-body font-semibold';
  const styles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`.trim();

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={styles}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={styles}>
      {children}
    </Link>
  );
};
