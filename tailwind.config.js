/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        wine: {
          50: '#FDECEF',
          100: '#F9D4DA',
          200: '#F3A7B5',
          300: '#E8768F',
          400: '#D84A68',
          500: '#B92B4E',
          600: '#8A1D3B',
          700: '#6B152E',
          800: '#4C0D21',
          900: '#2F0715'
        },
        olive: {
          100: '#E5F3E6',
          300: '#9ED39E',
          500: '#5BAE5B',
          600: '#3D9140',
          700: '#2F7133'
        },
        cream: '#F9F7F4'
      },
      borderRadius: {
        card: '20px',
        sheet: '28px',
        pill: '999px'
      },
      boxShadow: {
        soft: '0 8px 20px -12px rgba(15, 15, 15, 0.25)',
        card: '0 8px 24px -16px rgba(28, 28, 30, 0.3)',
        nav: '0 -8px 24px -20px rgba(0, 0, 0, 0.35)'
      },
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1.1rem' }],
        sm: ['0.875rem', { lineHeight: '1.3rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.7rem' }],
        xl: ['1.25rem', { lineHeight: '1.8rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }]
      }
    }
  },
  plugins: []
}
