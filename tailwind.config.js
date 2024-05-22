/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "baseBlack": "#101828",
        "basePurple": "#9E77ED",
        "baseGray": "#667085",
        "darkerGray": "#344054",
        "baseGreen": "#32D583",
        'black-80': 'rgba(0, 0, 0, 0.8)',
      },
      screens: {
        'mdsm': '768px', //  breakpoint personalizado
      },
    },

  },
  variants: {
    extend: {
      backdropFilter: ['responsive'], // Enable responsive backdrop-filter
    },
  },
  plugins: [],
}