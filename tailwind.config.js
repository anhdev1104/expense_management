/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#f0908b',
        borderColor: '#dbdbdb',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
