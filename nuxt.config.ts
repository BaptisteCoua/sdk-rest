// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: 'https://api.escuelajs.co/api/v1'
    }
  },
  modules: ['@nuxt/eslint', 'vuetify-nuxt-module', '@nuxt/test-utils/module', 'nuxt-auth-utils'],
  vuetify: {
    moduleOptions: {
      /* module specific options */
    },
    vuetifyOptions: {
      /* vuetify options */
    }
  }
})