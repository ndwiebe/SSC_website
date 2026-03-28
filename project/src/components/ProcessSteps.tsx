import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { staggerScaleIn } from '../lib/animations';

interface Step {
  number: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: Step[];
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (containerRef.current) {
        staggerScaleIn(containerRef.current, '.process-step', 0.15);
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step, index) => (
        <div key={index} className="process-step text-center group" style={{ opacity: 0 }}>
          <div className="step-number w-14 h-14 bg-ssc-gold text-white flex items-center justify-center font-mono text-xl font-bold mx-auto mb-4">
            {step.number}
          </div>
          {/* Connector line between steps (hidden on mobile and last item) */}
          <h3 className="font-headline text-lg text-ssc-text tracking-wide mb-2 transition-colors duration-300 group-hover:text-ssc-gold">
            {step.title}
          </h3>
          <p className="font-body text-ssc-text-muted">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
};
