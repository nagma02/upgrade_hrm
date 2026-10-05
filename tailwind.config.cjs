/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#F8FAFC',
        surface: '#FFFFFF',
        border: '#E2E8F0',
        foreground: '#0F172A',
        muted: '#64748B',
        brand: '#10B981',
        primary: '#064E3B',
      },
    },
  },
  plugins: [],
}
