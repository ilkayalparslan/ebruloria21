/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7a93ac", // color-three
          dark: "#617073", // color-two
          light: "#92bcea", // color-four
        },
        accent: {
          DEFAULT: "#afb3f7", // color-five
          light: "#b6baf8", // color-six
        },
        dark: "#171a21", // color-one
      },
      width: {
        15: "3.75rem",
        16: "4rem",
        20: "5rem",
      },
      height: {
        15: "3.75rem",
        16: "4rem",
        20: "5rem",
      },
      animation: {
        ping: "ping 5s cubic-bezier(0, 0, 0.2, 1) infinite",
        pulse: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        ping: {
          "0%": {
            transform: "translate(-50%, -50%) scale(1)",
            opacity: "1",
          },
          "75%, 100%": {
            transform: "translate(-50%, -50%) scale(2)",
            opacity: "0",
          },
        },
        pulse: {
          "0%, 100%": {
            opacity: "1",
            transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
            opacity: "0.5",
            transform: "translate(-50%, -50%) scale(1.1)",
          },
        },
      },
    },
  },
  plugins: [],
};
