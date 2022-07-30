/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    screens: {
      sm: {'max': '480px'},
      md: {'max': '768px'},
      lg: {'max': '976px'},
      xl: {'max': '1440px'}
    },
    extend: {
      colors: {
        primary: "#BD1537",
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        ibarra: ['Ibarra Real Nova', 'serif']
      }
    },
  },
  plugins: [],
}
