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
      title: 'Wisata App Reps',
      meta:[
        { name: 'description', content: 'Wisata App - Nibros Ari Wibowo' }
      ],
    },
  },
  runtimeConfig: {
    public: {
      APP_NAME: process.env.APP_NAME,
      BASE_URL: process.env.NUXT_PUBLIC_BASE_URL,
    },
  },
})
