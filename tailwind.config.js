import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      zIndex: {
        "max": "9999"
      },
      padding: {
        "0.25": "1px",
        "0.75": "3px",
      }
    },
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
