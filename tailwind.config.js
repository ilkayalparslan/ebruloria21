/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7a93ac', // color-three
          dark: '#617073',    // color-two
          light: '#92bcea',   // color-four
        },
        accent: {
          DEFAULT: '#afb3f7', // color-five
          light: '#b6baf8',   // color-six
        },
        dark: '#171a21',      // color-one
      },
    },
  },
  plugins: [],
};
