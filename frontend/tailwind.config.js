/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '600px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      ibarra: ['Ibarra Real Nova', 'serif'],
    },
    extend: {
      colors: {
        primary: '#BD1537',
        background: '#cec2ae'
      },
    },
  },
  plugins: [],
};
