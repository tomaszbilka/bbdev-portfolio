import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  important: "#app",
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;
