/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts}",
  ],
  theme: {
    screens: {
      sm: '640px',
      md: '976px',
      lg: '1440px',
      xl: '1886px',
    },
    fontFamily: {
      'julius-sans-one': ['Julius Sans One', 'sans-serif'],
      'la-belle-aurore': ['La Belle Aurore', 'sans-serif'],
      'libre-baskerville': ['Libre Baskerville', 'sans-serif'],
      'yellowtail': ['Yellowtail', 'sans-serif'],
      'lora': ['Lora Variable', 'sans-serif'],
      'montserrat': ['Montserrat Variable', 'sans-serif'],
      'merriweather-sans': ['Merriweather Sans Variable', 'sans-serif'],
      'open-sans': ['Open Sans Variable', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
        {
          seawaves: {
            "primary": "#1E4962",
            "secondary": "#DEB88D",
            "accent": "#027C9B",
            "neutral": "#f1f5f9",
            "base-100": "#F2F2F2",
            "base-content": "#1E4950",
            "info": "#68D4F1",
            "success": "#36d399",
            "warning": "#FCA02F",
            "error": "#D15123",
          },
        },
        {
          seashells: {
            "primary": "#1E4962",
            "secondary": "#DEB88D",
            "accent": "#027C9B",
            "neutral": "#17384C",
            "base-100": "#09141B",
            "base-content": "#FEEBDB",
            "info": "#68D4F1",
            "success": "#36d399",
            "warning": "#FCA02F",
            "error": "#D15123",
          },
        }
      ],
  }
}

