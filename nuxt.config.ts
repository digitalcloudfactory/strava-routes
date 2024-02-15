// https://nuxt.com/docs/api/configuration/nuxt-config

export default defineNuxtConfig({
  devtools: { enabled: true },
  imports: {
    dirs: ["types/*.ts", "types/**/*.ts", "services/*.ts", "services/**/*.ts"]
  },
  modules: ['@nuxt/ui'],
  css: ["~/assets/css/default.scss"],
  runtimeConfig: {
    apiClientSecret: process.env.API_CLIENT_SECRET,
    public: {
      apiClientID: process.env.API_CLIENT_ID,
      apiRedirectURI: process.env.API_REDIRECT_URI,
      apiMapboxToken: process.env.MAPBOX_PUBLIC_TOKEN
    }
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/sass/utils/_mixins.scss" as *;'
        }
      }
    }
  }
})
