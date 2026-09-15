/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        command: {
          bg: '#0a0e17',
          surface: '#111827',
          panel: '#152033',
          card: '#1a2740',
          border: '#223554',
          borderLight: '#2e456d',
          accent: '#06b6d4',
          warning: '#f59e0b',
          danger: '#ef4444',
          critical: '#dc2626',
          success: '#10b981',
          water: '#38bdf8'
        }
      }
    },
  },
  plugins: [],
}
