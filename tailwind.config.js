/* eslint-disable import/no-anonymous-default-export */
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      "pxty-dark-mid": "#083831",
      "pxty-light": "#1d503d", // light green
      "pxty-mid": "#2C645B", // mid green
      "pxty-dark": "#082A22", // dark green
      "pxty-hover": "#333331",
      "pxty-hover-cyan": "#20B8CD",
    },
    textColor: {
      white: "#FFF",
      cardWhite: "#EAEBED",
      black: "#000",
      "pxty-light-text": "#1fa363",
      "pxty-mid": "#2C645B",
      "pxty-dark": "#082A22",
      "pxty-hg": "#E8E8E6",
      "pxty-hover-cyan": "#20B8CD",
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
