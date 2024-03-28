/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    colors: {
      white: '#FFF',
      black: '#1E1E1E',
      darkGrey: '#6B6B6B',
      lightGrey: '#f5f5f5',
      primary: '#01A4FF',
      secondary: '#7FD0FD',
      transparent: '#FFFFFF00',

      red: '#D87676'
    },

    spacing: {
      0: '0px',
      xs: '4px',
      sm: '8px',
      md: '12px',
      lg: '24px',
      xl: '32px',
    },

    borderRadius: {
      DEFAULT: '4px',
      md: '14px',
      full: '999px'
    },

    fontFamily: {
      sans: ['AppFont', 'sans-serif']
    },

    boxShadow: {
      /*sm: '0 0 20px 2px rgba(0,0,0,.15)',*/
      sm: '0 0 30px 0px rgba(0,0,50, .075)',
      md: '0 0 20px 2px rgba(0,0,0, .2)'
    },

    extend: {},
  },
  plugins: [],
}