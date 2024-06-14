/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Sora"],
      },
      colors: {
        primary: "#FEBD2E",
        secondare: "#4E80EE",
        light: "#E5E7EB",
        "very-dark": "#0E1325",
        "semi-dark": "#394150",
      },
      backgroundImage: {
        "hero-img": "url('../public/images/hero-imagehc.jpg')",
      },
    },
  },
  plugins: [],
};
