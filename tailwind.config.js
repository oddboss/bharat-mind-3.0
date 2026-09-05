/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF6B2B',
          'orange-hover': '#FF5722',
          'orange-light': '#FFF5EE',
          'orange-dark': '#C84B12',
          navy: '#0B0F17',
          sidebar: '#0C1018',
          card: '#121722',
          border: '#1E2638',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card-subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
        'card-hover': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
        'orange-glow': '0 0 25px -5px rgba(255, 107, 43, 0.35)',
      }
    },
  },
  plugins: [],
}
