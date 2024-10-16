module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'caveat': ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}