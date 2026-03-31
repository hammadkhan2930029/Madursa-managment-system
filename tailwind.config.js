export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        urdu: ['"Noto Nastaliq Urdu"', "serif"],
        arabic: ['"Noto Sans Arabic"', "sans-serif"],
        marhey: ['"Marhey"', 'cursive'],
      },
      darkMode: ['selector', '[data-theme="dark"]'],
      boxShadow: {
        // Ye rahi aapki custom shadows
        'theme': 'var(--shadow-main)',
        'card-theme': 'var(--shadow-card)',
      },
      colors: {
        // Ab aap ye names pure project mein use kar sakte hain
        themeBg: "var(--color-bg)",
        themeSurface: "var(--color-surface)",
        themeText: "var(--color-text-main)",
        themePrimary: "var(--color-primary)",
        themePrimaryHover: "var(--color-primary-hover)",
        themeBorder: "var(--color-border)",
      },
      sidebar: {
          text: "#9ca3af",       // Gray-400
          textHover: "#ffffff",  // White
          activeBg: "#00d094",
          primary: "#00d094",    // Emerald Green (Accent)
          dark: "#002a33",       // Deep Navy (Footer/Card Header)
          gradientStart: "#004d61", 
          gradientEnd: "#002a33",
          surface: "rgba(255, 255, 255, 0.05)",
        }
    },
  },
  plugins: [],
};