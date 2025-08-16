/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#FF1584",
      },
      boxShadow: {
        "outer": "0px 0px 10px 0px rgba(0, 0, 0, 0.25)"
      }
    },
  },
  plugins: [],
}