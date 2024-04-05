/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      spacing: {
        30: "7.5rem",
        76: "19rem",
        82: "20.5rem",
        84: "21rem",
        86: "221.5rem",
        88: "22rem",
      },
      boxShadow: {
        tile: "0 2px 6px 0 rgba(0,0,0,.05), 0 0 3px 0 rgba(0,0,0,.1)",
      },
      borderRadius: {
        15: "15px", // You can name this custom key as you wish
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
