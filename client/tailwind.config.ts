/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        roboto: ["Roboto", "serif"],
        montserrat: ["Montserrat", "serif"],
      },
      colors: {
        "primary-dark": "#121212",
        "primary-light": "#FFFFFF",
        "primary-gray": "#738290",
        "secondary-dark": "#AF1B3F",
        "secondary-light": "#D81E5B",
      },
    },
  },
  plugins: [],
};
