// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0F4C81", 
        secondary: "#F7A400", 
        accent: "#E1E9F1",   
        neutral: "#FFFFFF",
      },
      fontFamily: {
        sans: ["Urbanist", "sans-serif"], 
      },
    },
  },
  plugins: [],
}
