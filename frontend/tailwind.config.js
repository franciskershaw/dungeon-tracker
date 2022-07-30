/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#BD1537",
      },
      fontFamily: {
        body: ['Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
