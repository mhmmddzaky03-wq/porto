/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#07090E',
          surface: '#0D111A',
          card: '#111622',
          border: 'rgba(255, 255, 255, 0.08)',
          hover: 'rgba(255, 255, 255, 0.04)',
        },
        accent: {
          DEFAULT: '#FF2A3B',
          glow: 'rgba(255, 42, 59, 0.15)',
          muted: '#C0222F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['"Space Grotesk"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
