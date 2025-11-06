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
      },
    },
  },
  plugins: [],
}

