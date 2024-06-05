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
      maxHeight: {
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
        "new-blue-1": '#88c5ee',
        "new-blue-2": '#c2ddf0',
        "new-blue-3": '#87c4ed',
        "blue-toggle": '#1597dd',
        "blue-button": '#1597dd',
        "blue-button-hover": '#49a9dd',
        "blue-button-secundary": '#cbe8fa',
        "blue-button-secundary-hover": '#afe0ff',
        "new-blue-background": '#1796df',
        "primary": "#0069af",
        "primary-2": "#10a9f0",
        "primary-dark": "#27415a",
      },
      animation: {
        show_up_container: "show_up_container .1s  forwards",
        show_up_results: "show_up_results .2s  forwards",
        show_up_error: "show_up_error .3s  forwards",
        wiggle: "wiggle 1s ease-in-out infinite",
      },
      keyframes: {
        show_up_error: {
          '0%': {
            margin: '3rem 0 0 0'
          },
          '100%': {
            margin: '0rem 0 0 0',
          }
        },
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
            'z-index': '39'
          },
          "100%": {
            position: "absolute",
            top: "2.5rem",
            'z-index': '39',
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
