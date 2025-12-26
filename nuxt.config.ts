// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    apiBase: 'https://dummyjson.com',
    public: {
      apiBase: '/api/rest',
    }
  },
  modules: [
    '@nuxt/eslint',
    'vuetify-nuxt-module',
    '@nuxt/test-utils/module',
    'nuxt-auth-utils'
  ],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    }
  }
})