/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ssc: {
          // Reverse DMC palette — warm white base
          'bg': '#FAFAF8',
          'surface': '#FFFFFF',
          'text': '#0A0A0A',
          'text-muted': '#6B6B78',

          // Gold accent system
          'gold': '#C9A227',
          'gold-dark': '#8B7318',
          'gold-light': '#E5C84C',

          // Dark sections
          'black': '#0A0A0A',
          'surface-dark': '#141417',

          // Borders
          'border': '#E8E5DF',
          'border-dark': '#2A2A35',
        },
      },
      fontFamily: {
        headline: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body: ['"DM Sans"', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        none: '0px',
        DEFAULT: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '0px',
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(201, 162, 39, 0.15)',
        'gold-lg': '0 8px 40px rgba(201, 162, 39, 0.2)',
        'gold-hover': '0 12px 24px rgba(201, 162, 39, 0.12)',
        'gold-glow': '0 0 20px rgba(201, 162, 39, 0.3), 0 0 40px rgba(201, 162, 39, 0.1)',
        'gold-glow-lg': '0 0 30px rgba(201, 162, 39, 0.4), 0 0 60px rgba(201, 162, 39, 0.15)',
        'card': '0 2px 12px rgba(26, 26, 30, 0.08)',
        'card-hover': '0 8px 30px rgba(26, 26, 30, 0.12)',
      },
    },
  },
  plugins: [],
};