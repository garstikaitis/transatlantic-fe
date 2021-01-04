module.exports = {
  purge: { content: ["./public/**/*.html", "./src/**/*.vue"] },
  darkMode: false, // or 'media' or 'class'
  plugins: [require("@tailwindcss/forms")],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter var"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
