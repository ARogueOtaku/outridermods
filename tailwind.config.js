import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".overflow-anchor-auto": {
          overflowAnchor: "auto",
        },
        ".overflow-anchor-none": {
          overflowAnchor: "none",
        },
      });
    }),
  ],
};
