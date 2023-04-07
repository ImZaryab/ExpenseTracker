/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6D67E4',
        secondary: '#46C2CB',
        accent: '#F2F7A1',
        dark: '#453C67',
      },
    },
  },
  plugins: [],
}