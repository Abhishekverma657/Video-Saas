import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fbfcfd",
        surface: {
          DEFAULT: "#ffffff",
          secondary: "#f8fafc",
          tertiary: "#f1f5f9",
          card: "#ffffff",
        },
        border: {
          subtle: "#e2e8f0",
          hover: "#cbd5e1",
          active: "#10b981",
        },
        accent: {
          green: "#059669",
          emerald: "#10b981",
          mint: "#34d399",
          teal: "#0d9488",
          darkTeal: "#0f766e",
        },
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(15, 23, 42, 0.06)",
        medium: "0 10px 30px -4px rgba(15, 23, 42, 0.08)",
        floating: "0 20px 40px -6px rgba(15, 23, 42, 0.12)",
        greenGlow: "0 10px 25px -3px rgba(16, 185, 129, 0.25)",
      },
      fontFamily: {
        sans: ["-apple-system", "BlinkMacSystemFont", "Inter", "Segoe UI", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        rise: "rise 4s ease-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        rise: {
          "0%": { transform: "translateY(10px) scale(0.8)", opacity: "0" },
          "20%": { opacity: "1" },
          "80%": { opacity: "0.9" },
          "100%": { transform: "translateY(-60px) scale(1.1)", opacity: "0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
