/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'Island-Moments': ['Island Moments', 'cursive'],
      'Lavishly-Yours': ['Lavishly Yours', 'cursive'],
      'Reddit-Mono': ['Reddit Mono', 'monospace'],
    }
  },
  plugins: [],
}