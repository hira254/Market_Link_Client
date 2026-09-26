/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        marketlink: {
          "olive-deep": "#615F20",
          "olive-dark": "#37390B",
          "gold-harvest": "#DCA049",
          "gold-brown": "#C28838",
          "sage": "#B9BD72",
          "olive-sec": "#A0A258",
          "earth-deep": "#642D07",
          "soil": "#864B14",
          "harvest-brown": "#A16510",
          "olive-warm": "#8B7935",
          "khaki-muted": "#938D59",
          "beige-warm": "#ACA280",
          "cream-bg": "#FAFAF5",
        },
      },
    },
  },

  plugins: [],
}