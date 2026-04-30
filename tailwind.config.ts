import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./hooks/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#1f0f0d",
        surface: "#1f0f0d",
        "surface-dim": "#1f0f0d",
        "surface-container-lowest": "#190a08",
        "surface-container-low": "#281715",
        "surface-container": "#2d1b19",
        "surface-container-high": "#382523",
        "surface-container-highest": "#44302e",
        "surface-bright": "#493432",
        "surface-variant": "#44302e",
        "on-background": "#fbdbd7",
        "on-surface": "#fbdbd7",
        "on-surface-variant": "#e6bdb8",
        "primary-container": "#dc2626",
        "on-primary-container": "#fff6f5",
        primary: "#ffb4ab",
        "primary-fixed": "#ffdad6",
        "inverse-primary": "#bf0715",
        secondary: "#c8c6c5",
        "secondary-container": "#474746",
        tertiary: "#c9c6c5",
        "tertiary-container": "#737171",
        outline: "#ac8884",
        "outline-variant": "#5c403c",
        error: "#ffb4ab",
        "error-container": "#93000a",
        dex: {
          black: "#0a0a0a",
          panel: "#1a1a1a",
          red: "#dc2626",
          redSoft: "#ffb4ab",
          muted: "#a99693"
        }
      },
      fontFamily: {
        display: ["var(--font-space-grotesk)", "Space Grotesk", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "sans-serif"]
      },
      boxShadow: {
        glow: "0 0 24px rgba(220, 38, 38, 0.22)",
        panel: "inset 0 1px 0 rgba(255, 255, 255, 0.06), 0 18px 40px rgba(0, 0, 0, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;
