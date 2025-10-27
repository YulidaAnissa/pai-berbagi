export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  fontFamily: {
    bungee: ['Bungee', 'sans-serif'],
  },
  theme: {
    extend: {
      colors: {
        primary: 'rgb(var(--color-primary) / <alpha-value>)',
        beige: 'rgb(var(--color-beige) / <alpha-value>)',
      },
      fontFamily: {
        bungee: ['Bungee', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

