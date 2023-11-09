/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '976px',
      lg: '1440px',
      xl: '1886px',
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
        {
          seashells: {
            "primary": "#1E4962",
            "secondary": "#DEB88D",
            "accent": "#027C9B",
            "neutral": "#17384C",
            "base-100": "#09141B",
            "base-content": "#FEE4CE",
            "info": "#68D4F1",
            "success": "#36d399",
            "warning": "#FCA02F",
            "error": "#D15123",
          },
        },
        "autumn"
      ],
  }
}

