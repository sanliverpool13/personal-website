/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      spacing: {
        30: "7.5rem",
        82: "20.5rem",
        84: "21rem",
        86: "221.5rem",
        88: "22rem",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
