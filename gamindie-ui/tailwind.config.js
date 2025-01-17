/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class', // false(not applied) or media(uses prefers-color-scheme)
  theme: {
    extend: {
      colors: {
        primary: {
          light: '', // Light mode primary color
          dark: '#121015',  // Dark mode primary color
        },
        secondary: {
          light: '',
          dark: '#C6D300',
        },
        secondary_2:{
          light: '',
          dark: '#EB1010',
        },
        primary_2:{
          light: '',
          dark: '#18171B',
        },
        primary_3:{
          light: '',
          dark: '#1D1C20',
        },
        primary_4:{
          light: '',
          dark: '#2A2731',
        },
        primary_5:{
          light: '',
          dark: '#3B3745',
        },
        primaryText: {
          light: '',
          dark: '#8F8E8C',
        },

      },
      fontFamily: {
        merriweather: ['Merriweather'],
        aahawow: ['a Aha Wow'],
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}

