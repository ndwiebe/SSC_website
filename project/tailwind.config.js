/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ssc: {
          // Light mode backgrounds
          'ivory': '#F5F2ED',
          'white': '#FFFFFF',

          // Dark mode sections (shared with DMC)
          'black': '#0A0A0A',
          'surface': '#141417',

          // Gold system (exact DMC match)
          'gold': '#C9A227',
          'gold-dark': '#8B7318',
          'gold-light': '#E5C84C',

          // Chrome system (exact DMC match)
          'chrome': '#A8A8B3',
          'chrome-bright': '#E8E8E8',
          'chrome-dark': '#737380',

          // Text
          'text': '#1A1A1E',
          'text-secondary': '#6B6B78',

          // Borders
          'border': '#D4D4DB',
          'border-dark': '#2A2A35',
        },
        // Keep old brand colors temporarily for gradual migration
        brand: {
          'primary-bg': '#F5F2ED',
          'secondary-bg': '#F5F2ED',
          'primary-text': '#1A1A1E',
          'secondary-text': '#FFFFFF',
          'accent-gold': '#C9A227',
          'button-hover': '#8B7318',
          'border': '#D4D4DB',
          'success': '#3FD46F'
        }
      },
      fontFamily: {
        headline: ['"Bebas Neue"', 'Impact', 'sans-serif'],
        body: ['"DM Sans"', '-apple-system', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: {
        'none': '0px',
        'full': '9999px',
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(201, 162, 39, 0.15)',
        'gold-lg': '0 8px 40px rgba(201, 162, 39, 0.2)',
        'card': '0 2px 12px rgba(26, 26, 30, 0.08)',
        'card-hover': '0 8px 30px rgba(26, 26, 30, 0.12)',
      }
    },
  },
  plugins: [],
};