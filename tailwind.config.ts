import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50:  "#f0f4f9",
          100: "#dce6f1",
          200: "#b9cde3",
          300: "#8aaece",
          400: "#5b8ab5",
          500: "#3a6a9a",
          600: "#2a5280",
          700: "#1d3d62",
          800: "#142c49",
          900: "#0e1f33",
          950: "#07111e",
        },
        cream: "#fafaf8",
      },
      fontFamily: {
        // Syne: tipografía de display — títulos, etiquetas, navegación
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        // DM Sans: cuerpo de texto — párrafos, formularios, UI
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tighter: "-0.04em",
        tight: "-0.02em",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
