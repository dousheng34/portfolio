/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bone: "#f0efe9",
        ink: "#080808",
        blue: {
          accent: "#1a5cff",
          light: "#e8eeff",
        },
        gray: {
          subtle: "#e8e7e1",
          mid: "#a0a0a0",
          dark: "#404040",
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        display: ["'Space Grotesk'", "sans-serif"],
        mono: ["'Space Mono'", "monospace"],
      },
      animation: {
        "grain": "grain 0.5s steps(2) infinite",
        "blink": "blink 1s step-end infinite",
        "float-up": "floatUp 20s linear infinite",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(-2px, 2px)" },
          "50%": { transform: "translate(2px, -2px)" },
          "75%": { transform: "translate(-1px, 1px)" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        floatUp: {
          "0%": { transform: "translateY(100vh)", opacity: 0 },
          "10%": { opacity: 1 },
          "90%": { opacity: 0.6 },
          "100%": { transform: "translateY(-100px)", opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
