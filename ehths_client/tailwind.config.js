/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html.,js}"],
  theme: {
    extend: {},
    screens: {
      'sm': '450px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/colors/themes")["[data-theme=light]"],
          primary: "#2985FD",
          secondary: "#f6d860",
          accent: "#0F172A",
          neutral: "#ffffff",
          "base-100": "#ffffff",
          "--bs-indigo":"#3CD458",
          color:"#0F172A"
          
          
        },
        black:{
          "backgroundColor":"#000000",
          "background-color":"000000",
          currentColor:"#000000",
          body:"#000000",
          "base-100": "#000000",
          "base-200": "#000000",
          "base-300": "#000000",
          accent:"#000000",
          primary:"#000000"

        }
      },
      "night",
      "synthwave",
      "valentine"
    ],
  },
}
