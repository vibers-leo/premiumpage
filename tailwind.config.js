/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3b82f6",
          light: "#60a5fa",
          dark: "#2563eb",
        },
        secondary: "#1e40af",
        bg: "#ffffff",
        surface: "#eff6ff",
        text: {
          DEFAULT: "#0f172a",
          muted: "#64748b",
        },
        border: "#e2e8f0",
        success: "#10b981",
        error: "#ef4444",
      },
    },
  },
  plugins: [],
};
