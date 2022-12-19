/** @type {import('tailwindcss').Config} */
module.exports = {
  safelist: [
    {pattern: /(bg|text|border)-./}
  ],
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
