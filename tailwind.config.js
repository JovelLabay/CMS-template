/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: () => ({
        // FONTS
        h1Font: '#171622',

        paragraphFont: '#808080',

        // THEME COLORS
        primary: '#C01F0E',
        secondary: '#FB0100',
      }),
    },
  },
  plugins: [],
};
