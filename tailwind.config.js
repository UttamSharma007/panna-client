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
      "pxty-grey": "#2A2A27",
      "pxty-border-color": "rgba(59,59,59,.8)",
      "pxty-text-color": "rgb(143 143 143)",
      "pxty-chat-bg": "#20201D",
      "pxty-hover": "#333331",
      "pxty-hover-cyan": "#20B8CD",
    },
    textColor: {
      white: "#FFF",
      cardWhite: "#EAEBED",
      black: "#000",
      "pxty-text-color": "rgb(143 143 143)",
      "pxty-hg": "#E8E8E6",
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
