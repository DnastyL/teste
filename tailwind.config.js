/** @type {import('tailwindcss').Config} */

const plugin = require('tailwindcss/plugin')

module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      backgroundImage: {
        blur: "url(/src/assets/blur-background.png)",
      },
      fontFamily: {
        sans: "Roboto, sans-serif",
      },
      borderColor: ["autofill"],
      shadowFill: ["autofill"],
      textFill: ["autofill"],
      colors: {
        green: {
          300: "#00B373E",
          500: "#00875F",
          700: "#015f43",
        },
        blue: {
          500: "#81D8F7",
        },
        orange: {
          500: "#FBA94C",
        },
        red: {
          500: "#f75a68",
        },
        gray: {
          100: "#e1e1e6",
          200: "#c4c4cc",
          300: "#8d8d99",
          500: "#323238",
          600: "#29292e",
          700: "#121214",
          900: "#09090a",
        },
      },
    },
    screens: {
      sml: { max: "350px" },
      smll: { max: "440px" },
      smd: { max: "500px" },
      sm: { max: "640px" },
      md: { max: "768px" },
      mdx: { max: "900px" },
      lg: { max: "1024px" },
      lgx: { max: "1130px" },
      xl: { max: "1280px" },
    },
  },
  plugins: [
    plugin(function ({ addVariant }) {
      addVariant("not-focus", "&:not(:focus)");
      addVariant("not-placeholder-shown", "&:not(:placeholder-shown)");
      addVariant("peer-not-focus", ":merge(.peer):&:not(:focus) ~ &");
      addVariant("peer-not-placeholder-shown", ":merge(.peer):&:not(:placeholder-shown) ~ &");
    }),
  ],
};
