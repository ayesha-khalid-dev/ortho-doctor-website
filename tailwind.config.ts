import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: "#C8102E",       // primary medical red
          "red-dark": "#8E0B20",
          "red-light": "#FFE5E9",
          white: "#FFFFFF",
          off: "#FAFAFA",       // off-white background
          ink: "#1A1A1A",       // primary text
          muted: "#6B6B6B",     // secondary text
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-in-out",
        marquee: "marquee 22s linear infinite",
        "icon-idle": "iconIdle 2.2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        iconIdle: {
          "0%, 100%": { transform: "scale(1) rotate(0deg)" },
          "50%": { transform: "scale(1.08) rotate(-3deg)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;