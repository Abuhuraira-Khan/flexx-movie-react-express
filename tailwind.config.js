/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'main-bg': '#121212',
        'primary': '#c71414',
        'secondary': '#ff4da6',
      },
      spacing: {
        '0.5': '2px',
        '1.5': '6px',
        '5': '20px',
        '15': '60px',
        '30': '120px',
        '50': '200px',
        '60': '240px',
      },
    },
  },
  variants: {},
  plugins: [],
}