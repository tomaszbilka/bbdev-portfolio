/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        terminal: {
          bg: "#0f172a",
          surface: "#1e293b",
          accent: "#22d3ee",
          "accent-dim": "#0891b2",
          text: "#e2e8f0",
          muted: "#94a3b8",
        },
      },
    },
  },
  plugins: [],
};
