/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    screens: {
      '2xl': { 'min': '1281px' },
      // => @media (max-width: 1535px) { ... }

      'xl': { 'min': '1024px' },
      // => @media (max-width: 1279px) { ... }

      'lg': { 'max': '1023px' },
      // => @media (max-width: 1023px) { ... }

      'md': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }

      'sm': { 'max': '639px' },
      // => @media (max-width: 639px) { ... }

      'ms': { 'max': '550px' },
      // => @media (max-width: 639px) { ... }

      'xs': { 'max': '400px' },
      // => @media (max-width: 336px) { ... }
    },
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', ...require('tailwindcss/defaultTheme').fontFamily.sans],
        serif: [...require('tailwindcss/defaultTheme').fontFamily.serif],
        mono: [...require('tailwindcss/defaultTheme').fontFamily.mono],
      }
    }
  },
  variants: {
    extend: {
      opacity: ['disabled'],
    },
  },
  darkMode: ['class', '[data-theme="dark"]'],

  plugins: [],
}
