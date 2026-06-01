// frontend/tailwind.config.js
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        iitgn: {
          blue: '#1a56db',
          orange: '#f59e0b',
          green: '#10b981',
          red: '#ef4444',
          dark: '#1f2937'
        }
      }
    },
  },
  plugins: [],
}
