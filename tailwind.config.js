/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        titillium: ['"Titillium Web"', "sans-serif"],
      },
      colors: {
        background: "#171717",
        text: "#FFFFFF",
      },
    },
  },
  plugins: [],
};
