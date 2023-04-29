/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        endeavour: {
          50: "#f0f7ff",
          100: "#dfeeff",
          200: "#b9defe",
          300: "#7bc5fe",
          400: "#34a7fc",
          500: "#0a8ded",
          600: "#006ecb",
          700: "#0055a0",
          800: "#054b87",
          900: "#0a3e70",
          950: "#07274a",
        },
      },
    },
  },
  plugins: [],
};
