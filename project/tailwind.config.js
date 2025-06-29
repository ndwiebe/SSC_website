/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          'primary-bg': '#6A8491',
          'secondary-bg': '#ECEFF1',
          'primary-text': '#2B2B2B',
          'secondary-text': '#F5F6F7',
          'accent-gold': '#C69316',
          'button-hover': '#42596A',
          'border': '#C4C4C4',
          'success': '#3FD46F'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};