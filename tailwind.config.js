/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  darkMode: 'class',
  theme: {
    extend: {
      animation:{
        'fast-spin': 'spin 0.5s linear infinite'
      }
    },
    screens:{
      'sm': '450px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1440px',
      '3xl': '1920px'
    }
  },
  plugins: [],
}

