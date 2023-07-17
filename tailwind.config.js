/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        hero1: "url('/src/components/assets/bg-1.jpg')",
        hero2: "url('/src/components/assets/bg-2.jpg')",
      },
    },
    fontSize: {
      "2xl": [
        "3.815rem",
        {
          lineHeight: "4.578rem",
          letterSpacing: "-1.3%",
          fontWeight: "900",
          color: "#082f49",
        },
      ],
      "1xl": [
        "3.052rem",
        {
          lineHeight: "3.6624rem",
          letterSpacing: "-1.3%",
          fontWeight: "900",
          color: "#082f49",
        },
      ],
      xl: [
        "2.441rem",
        {
          lineHeight: "2.9292rem",
          letterSpacing: "-1.3%",
          fontWeight: "900",
          color: "#082f49",
        },
      ],
      lg: [
        "1.953rem",
        {
          lineHeight: "2.3436rem",
          letterSpacing: "-1.3%",
          fontWeight: "900",
          color: "#082f49",
        },
      ],
      mid: [
        "1.563rem",
        {
          lineHeight: "1.8756rem",
          letterSpacing: "-1.3%",
          fontWeight: "900",
          color: "#082f49",
        },
      ],
      sm: [
        "1.25rem",
        {
          lineHeight: "1.5rem",
          letterSpacing: "-1.3%",
          fontWeight: "900",
          color: "#082f49",
        },
      ],
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [],
  },
};
