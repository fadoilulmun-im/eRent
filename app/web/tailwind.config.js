const colors = require('tailwindcss/colors')
delete colors.lightBlue

module.exports = {
  purge: {  
    enabled: true,
    content: ['./**/*.tsx', './**/*.html'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'sans':['Poppins']
      },
      colors,
      backgroundColor:colors,
      textColor: colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}