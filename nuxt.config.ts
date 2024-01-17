// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  app:{
    head:{
      title: 'Wisata App',
      meta:[
        { name: 'description', content: 'Find amazing hotel deals that blend luxury with affordability for your perfect holiday' }
      ],
    },
  },
  runtimeConfig: {
    public: {
      APP_NAME: process.env.APP_NAME,
      API_BASE_URL: process.env.API_BASE_URL,
    },
  },
  routeRules: {
    '/stay/**': { swr: 600, static: true },
    '/': { static: true },
  }
    
})
