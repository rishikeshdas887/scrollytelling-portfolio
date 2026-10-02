import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#05080e",
        surface: {
          50: "rgba(255, 255, 255, 0.03)",
          100: "rgba(255, 255, 255, 0.06)",
          200: "rgba(255, 255, 255, 0.09)",
          glass: "rgba(10, 14, 23, 0.72)",
        },
        accent: {
          orange: "#ff6b2b",
          amber: "#f59e0b",
          cyan: "#00d4ff",
          blue: "#3b82f6",
          purple: "#8b5cf6",
        },
        border: {
          subtle: "rgba(255, 255, 255, 0.08)",
          highlight: "rgba(255, 255, 255, 0.18)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "-apple-system", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "radial-studio": "radial-gradient(circle at 75% 60%, rgba(255, 107, 43, 0.12) 0%, rgba(5, 8, 14, 0) 65%), radial-gradient(circle at 20% 35%, rgba(0, 212, 255, 0.08) 0%, rgba(5, 8, 14, 0) 60%)",
      },
      boxShadow: {
        glass: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
        glow: "0 0 25px -5px rgba(255, 107, 43, 0.25)",
        "glow-cyan": "0 0 25px -5px rgba(0, 212, 255, 0.25)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
