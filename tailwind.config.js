/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["*.{html,js}", "modules/*.js"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(63,63,70)",
        secondary: "#eeeeee",
        "sel-light": "#e0e0e0",
        "sel-dark": "#313137",
        lighter: "#fafafa",
        darker: "#36363c",
      },
      boxShadow: {
        light: "-30px 30px 60px #cacaca, 30px -30px 60px #ffffff",
        dark: "-30px 30px 60px #36363c, 30px -30px 60px #484851",
      },
    },
  },
  plugins: [],
};
