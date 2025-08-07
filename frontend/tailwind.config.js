/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3b82f6',
          foreground: '#ffffff',
        },
        secondary: {
          DEFAULT: '#64748b',
          foreground: '#ffffff',
        },
        background: '#f8fafc',
        border: '#e2e8f0',
        accent: '#22c55e',
        neutral: '#64748b',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        h1: ['2rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        h2: ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        body: ['1rem', { lineHeight: '1.5rem' }],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
      },
      boxShadow: {
        card: '0 1px 2px 0 rgba(0,0,0,0.05)',
      },
      spacing: {
        xs: '0.25rem',
        sm: '0.5rem',
        md: '1rem',
        lg: '1.5rem',
        xl: '2rem',
      },
      zIndex: {
        modal: '1000',
      },
    },
  },
  plugins: [],
};
