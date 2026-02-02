export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      bungee: ['Bungee', 'sans-serif'],
      sans: ['Inter',  'system-ui', '-apple-system', 'sans-serif'],
    },
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },

      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        beige: 'rgb(var(--color-beige) / <alpha-value>)',
        kemenagGreen: "#A7D7C5",
        softMint: "#B5E48C",
        softEmerald: "#9FD6AE",
        lightSage: "#CDEAC0",
        pastelMint: "#A8E6CF",
        creamSoft: "#FDF6E3",
        peachSoft: "#FFE5B4",
        lavenderLight: "#D7CFE3",
        coralSoft: "#FFD3B6",
      },
    },
  },
  plugins: [],
}

