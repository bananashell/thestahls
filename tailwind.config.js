/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Raleway"],
      },
      colors: {
        gray: {
          DEFAULT: "#7E7E7E",
          50: "#DADADA",
          100: "#D0D0D0",
          200: "#BBBBBB",
          300: "#A7A7A7",
          400: "#929292",
          500: "#7E7E7E",
          600: "#626262",
          700: "#464646",
          800: "#2A2A2A",
          900: "#0E0E0E",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
