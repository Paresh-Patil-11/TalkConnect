/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#60a5fa',
        secondary: '#a78bfa',
        dark: '#0f172a',
        darker: '#1e293b',
      },
    },
  },
  plugins: [],
}