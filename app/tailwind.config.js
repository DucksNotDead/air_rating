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
      lightGrey: '#eee',
      primary: '#01A4FF',
      secondary: '#7FD0FD',
      transparent: '#FFFFFF00'
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
      DEFAULT: '12px',
      md: '24px',
      full: '999px'
    },

    fontFamily: {
      sans: ['AppFont', 'sans-serif']
    },

    extend: {},
  },
  plugins: [],
}