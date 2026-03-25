export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL
    }
  },

  imports: {
    dirs: [
      'views/*/api',
      'views/*/stores'
    ]
  },

  modules: ['@pinia/nuxt', '@nuxtjs/i18n', '@nuxt/eslint'],

  css: ['~/assets/styles/main.scss', 'vue-final-modal/style.css'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "~/assets/styles/_variables.scss" as *; @use "~/assets/styles/_mixins.scss" as *;',
        },
      },
    },
  },

  i18n: {
    locales: [
      { code: "en", files: ["en.json"], name: "English", dir: "ltr" },
      { code: "uk", files: ["uk.json"], name: "Українська", dir: "rtl" },
    ],
    defaultLocale: "uk",
    strategy: "prefix",
    langDir: "locales",
    detectBrowserLanguage: false,
  },

  typescript: {
    strict: true
  },

  ssr: true
})