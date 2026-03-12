import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0D0A09",
        surface: "#1A1412",
        "surface-2": "#221C1A",
        "accent-red": "#C0392B",
        "accent-red-bright": "#E74C3C",
        "accent-brown": "#8B7355",
        "accent-grey": "#6B6560",
        "text-primary": "#F0EDE8",
        "text-muted": "#6B6560",
        border: "#2A2320",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        mono: ["var(--font-mono)", "monospace"],
        ui: ["var(--font-ui)", "sans-serif"],
      },
      animation: {
        "cursor-blink": "blink 1s step-end infinite",
        "pulse-red": "pulseRed 2s ease-in-out infinite",
        "float": "float 6s ease-in-out infinite",
        "scan": "scan 3s linear infinite",
        "glitch": "glitch 0.3s ease-in-out",
        "spark": "spark 0.6s ease-out forwards",
      },
      keyframes: {
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        pulseRed: {
          "0%, 100%": { boxShadow: "0 0 5px #C0392B, 0 0 20px #C0392B33" },
          "50%": { boxShadow: "0 0 20px #C0392B, 0 0 60px #C0392B55" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        glitch: {
          "0%": { transform: "translate(0)" },
          "20%": { transform: "translate(-3px, 3px)" },
          "40%": { transform: "translate(3px, -3px)" },
          "60%": { transform: "translate(-3px, -3px)" },
          "80%": { transform: "translate(3px, 3px)" },
          "100%": { transform: "translate(0)" },
        },
        spark: {
          "0%": { transform: "scale(0) rotate(0deg)", opacity: "1" },
          "100%": { transform: "scale(1.5) rotate(180deg)", opacity: "0" },
        },
      },
      backgroundImage: {
        "circuit-pattern": "url('/images/circuit-pattern.svg')",
        "noise": "url('/images/noise.png')",
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
