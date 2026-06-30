/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './js/**/*.js'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0E2A5A',
          50: '#E8EDF5',
          100: '#C5D0E3',
          200: '#9AADCE',
          300: '#6F8AB8',
          400: '#4A6DA3',
          500: '#0E2A5A',
          600: '#0C2450',
          700: '#091D42',
          800: '#071633',
          900: '#040E24',
        },
        gold: {
          DEFAULT: '#C8A04D',
          50: '#FBF6EC',
          100: '#F5EACC',
          200: '#EBD599',
          300: '#DFBF66',
          400: '#C8A04D',
          500: '#B08A3A',
          600: '#8F7030',
          700: '#6E5625',
          800: '#4D3C1A',
          900: '#2C220F',
        },
        'gray-light': '#F7F8FA',
      },
      fontFamily: {
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'slide-in-right': 'slideInRight 0.6s ease forwards',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        marquee: 'marquee 30s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(24px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        premium: '0 4px 24px rgba(14, 42, 90, 0.08)',
        'premium-lg': '0 8px 40px rgba(14, 42, 90, 0.12)',
        'premium-hover': '0 12px 48px rgba(14, 42, 90, 0.16)',
        gold: '0 4px 20px rgba(200, 160, 77, 0.25)',
      },
    },
  },
  plugins: [],
};
