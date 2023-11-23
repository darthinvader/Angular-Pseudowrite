/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts,js}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--color-primary)', // Dark gray with less intensity
        'secondary': 'var(--color-secondary)', // Dark slate with a hint of blue
        'accent': 'var(--color-accent)', // Softer red
        'text-primary': 'var(--color-text-primary)', // Off-white for primary text
        'text-secondary': 'var(--color-text-secondary)', // Light gray for secondary text
        'border-color': 'var(--color-border)', // Dark gray for borders
      },
      fontFamily: {
        sans: 'var(--font-family-sans)',
        serif: 'var(--font-family-serif)',
        
      },
      boxShadow: {
        'default': '0 1px 3px 0 rgba(0, 0, 0, 0.2)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.2)',
      },
      backgroundImage: {
        'gradient-to-r': 'linear-gradient(to right, #2d2d2d, #3a3f44)',
        'gradient-to-b': 'linear-gradient(to bottom, #2d2d2d, #4a4e52)',
      },
      backgroundColor: {
        'page': 'var(--color-page)',
        'div': 'var(--color-div)',
        'button': 'var(--color-button)',
      },
    },
  },
  plugins: [],
}