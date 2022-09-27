/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", "./index.html"],
  theme: {
    screens: {
      "2xl": { max: "1343px" },
      xl: { max: "1200px" },
      lg: { max: "1024px" },
      md: { max: "768px" },
      sm: { max: "460px" },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        galaxy: 'url("/background_nlw_sports.svg")',
        "duo-gradient": "linear-gradient(90deg, #9572FC 10%, #43E7AD 60%, #E1D55D 100%)",
        "game-gradient": "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.9) 67.08%)",
      },
    },
  },
  plugins: [],
};
