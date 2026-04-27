import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#000000",
        paper: "#FFFFFF",
        ash: "#F4F4F4",
        smoke: "#E5E5E5",
        iron: "#8A8A8A",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-serif", "Georgia", "serif"],
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.045em",
        wider2: "0.18em",
      },
      fontSize: {
        "8xl": ["6.5rem", { lineHeight: "0.95" }],
        "9xl": ["9rem", { lineHeight: "0.9" }],
        "10xl": ["12rem", { lineHeight: "0.85" }],
      },
      transitionTimingFunction: {
        "out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
