// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxtjs/eslint-module", "@pinia/nuxt", "@nuxtjs/i18n"],
  i18n: {
    vueI18n: "@/locales/i18n.config.js",
  },
});
