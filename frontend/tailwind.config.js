module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      borderRadius: {
        "rounded-custom": "0.250rem",
      },
      fontSize: {
        "2xs": ["0.5rem", { lineHeight: "1rem" }],
      },
    },
    fontFamily: {
      header: ["Proza Libre"],
      body: ["Open Sans"],
    },
    extend: {},
  },
  variants: {
    extend: {
      fontSize: ["focus"],
      borderColor: ["checked"],
      margin: ["last"],
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
};
