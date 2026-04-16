/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        bg: "#080a0e",
        surface: "#0d1017",
        border: "rgba(255,255,255,0.07)",
        gold: "#d4af37",
        sky: "#38bdf8",
        rose: "#e11d48",
        text: "#f1f5f9",
        muted: "#94a3b8",
        dim: "#64748b",
      },
      fontFamily: {
        display: ["var(--font-sora)", "Sora", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "sans-serif"],
      },
      borderRadius: {
        card: "10px",
        btn: "7px",
      },
    },
  },
  plugins: [],
};
