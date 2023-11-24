/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,js}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        'primary-active': 'var(--color-primary-active)',
        'accent': 'var(--color-accent)',
        'border-color': 'var(--color-border)',
      },
      fontFamily: {
        sans: 'var(--font-family-sans)',
        serif: 'var(--font-family-serif)',
      },
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, var(--color-primary), var(--color-accent))',
        'gradient-to-b': 'linear-gradient(to bottom, var(--color-primary), var(--color-accent))',
      },
      backgroundColor: {
        'page': 'var(--color-page)',
        'div': 'var(--color-div)',
        'button': 'var(--color-button)',
        'button-hover': 'var(--color-button-hover)',
        'button-active': 'var(--color-button-active)',
        'default': 'var(--color-default)'
      },
    },
  },
  plugins: [],
}
