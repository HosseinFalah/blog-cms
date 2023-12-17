const defaultTheme = require('tailwindcss/defaultTheme')
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/Components/**/*.{js,ts,jsx,tsx}",
    "./src/Container/**/*.{js,ts,jsx,tsx}",
    "./src/Pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['"YekanBakh"', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}