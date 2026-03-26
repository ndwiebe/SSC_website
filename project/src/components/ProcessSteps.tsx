import React from 'react';

interface Step {
  number: string;
  title: string;
  description: string;
}

interface ProcessStepsProps {
  steps: Step[];
}

export const ProcessSteps: React.FC<ProcessStepsProps> = ({ steps }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {steps.map((step, index) => (
        <div key={index} className="text-center">
          <div className="w-14 h-14 bg-ssc-gold text-white flex items-center justify-center font-mono text-xl font-bold mx-auto mb-4">
            {step.number}
          </div>
          <h3 className="font-headline text-lg text-ssc-text tracking-wide mb-2">
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
