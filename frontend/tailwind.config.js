/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <-- This is the magic line that connects to your Moon/Sun button!
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}