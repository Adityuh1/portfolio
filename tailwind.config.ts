import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--color-paper)",
        "paper-sunk": "var(--color-paper-sunk)",
        "paper-raised": "var(--color-paper-raised)",
        ink: "var(--color-ink)",
        "ink-2": "var(--color-ink-2)",
        "ink-3": "var(--color-ink-3)",
        rule: "var(--color-rule)",
        "rule-solid": "var(--color-rule-solid)",
        "rule-dash": "var(--color-rule-dash)",
        live: "var(--color-live)",
        danger: "var(--color-danger)",
        "logo-ground": "var(--color-logo-ground)",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
        deva: ["var(--font-deva)", "serif"],
      },
      borderRadius: {
        chip: "9999px",
        media: "0.5rem",
      },
      transitionTimingFunction: {
        board: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
export default config;
