const plugin = require('tailwindcss/plugin')

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    plugin(function( {addUtilities }) {
      addUtilities({
        /* Hide scrollbar for Chrome, Safari and Opera */
        '.no-scrollbar::-webkit-scrollbar' : {
          'display': 'none'
        },

        /* Hide scrollbar for IE, Edge and Firefox */
        '.no-scrollbar' : {
          '-ms-overflow-style': 'none', /* IE and Edge */
          'scrollbar-width': 'none'  /* Firefox */
        }
      })
    })
  ],
}
