/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: {
          indigo: "rgb(var(--brand-indigo) / <alpha-value>)",
          purple: "rgb(var(--brand-purple) / <alpha-value>)",
        }
      },
      animation: {
        dots: "dots 1.5s infinite",
      },
      keyframes: {
        dots: {
          "0%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
          "100%": { opacity: "0.3", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};
