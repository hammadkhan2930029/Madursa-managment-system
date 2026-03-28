export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        urdu: ['"Noto Nastaliq Urdu"', "serif"],
        arabic: ['"Noto Sans Arabic"', "sans-serif"],
        marhey: ['"Marhey"', 'cursive'],
      },
    },
  },
  plugins: [],
};