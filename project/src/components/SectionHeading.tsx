import React from 'react';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  dark?: boolean;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  title,
  subtitle,
  align = 'center',
  dark = false,
}) => {
  const alignClass = align === 'center' ? 'text-center' : 'text-left';
  const titleColor = dark ? 'text-ssc-gold' : 'text-ssc-text';
  const subtitleColor = dark ? 'text-gray-400' : 'text-ssc-text-muted';

  return (
    <div className={`${alignClass} space-y-3`}>
      <h2
        className={`font-headline text-3xl md:text-5xl tracking-wide ${titleColor}`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className={`font-body text-lg md:text-xl ${subtitleColor} max-w-2xl ${align === 'center' ? 'mx-auto' : ''}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};
