export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE 
    }
  },

  imports: {
    dirs: [
      'composables/**'
    ]
  },

  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n'
  ],

i18n: {
    locales: [
      { code: "en", files: ["en.json"], name: "English", dir: "ltr" },
      { code: "ar", files: ["ar.json"], name: "العربية", dir: "rtl" },
    ],
    defaultLocale: "en",
    strategy: "prefix",
    langDir: "locales",
    detectBrowserLanguage: false,
  },  

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css',
  },

  typescript: {
    strict: true
  },

  ssr: true
})
