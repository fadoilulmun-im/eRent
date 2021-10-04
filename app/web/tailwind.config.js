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
      colors:{amber:{500:"#F5921B"}},
      backgroundColor:colors,
      textColor: colors,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}