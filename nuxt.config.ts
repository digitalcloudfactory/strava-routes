// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  imports: {
    dirs: ["types/*.ts", "types/**/*.ts"]
  },
  runtimeConfig: {
    apiClientSecret: process.env.API_CLIENT_SECRET,
    public: {
      apiClientID: process.env.API_CLIENT_ID,
      apiRedirectURI: process.env.API_REDIRECT_URI,
    }
  }
})
