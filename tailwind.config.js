/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      height: {
        "30r": "32rem",
        "xl": "30rem",
        "2xl": "40rem",
        "3xl": "50rem",
        "4xl": "60rem",
      },
      width: {
        "xl": "30rem",
        "2xl": "40rem",
        "3xl": "50rem",
        "4xl": "60rem",
      },
      colors: {
        "primary": "#27415a"
      },
      animation: {
        show_up_container: "show_up_container .1s  forwards",
        show_up_results: "show_up_results .2s  forwards",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        show_up_container: {
          "0%": {
            position: "absolute",
            top: "4rem",
          },
          "100%": {
            position: "absolute",
            top: "1.3rem",
          },
        },
        show_up_results: {
          "0%": {
            position: "absolute",
            top: "4rem",
          },
          "100%": {
            position: "absolute",
            top: "2.5rem",
          },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
};
