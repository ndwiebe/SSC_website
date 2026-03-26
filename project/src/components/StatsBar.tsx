import React from 'react';

const stats = [
  { value: '$4.99', label: 'DMC Pro / month' },
  { value: '30s', label: 'to log a card' },
  { value: '124', label: 'team backgrounds' },
  { value: '100%', label: 'built with AI' },
];

export const StatsBar: React.FC = () => {
  return (
    <section className="bg-ssc-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-mono text-3xl text-ssc-gold mb-2">
                {stat.value}
              </div>
              <div className="font-body text-sm text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
