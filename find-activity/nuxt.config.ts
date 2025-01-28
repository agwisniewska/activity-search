// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  modules: ['@pinia/nuxt', '@nuxt/eslint'],
  runtimeConfig: {
    public: {
      isProduction: process.env.NODE_ENV === 'production',
      serverUrl: process.env.SERVER_URL || 'http://0.0.0.0:4000',
      clientUrl: process.env.CLIENT_URL || 'http://0.0.0.0:4000',
      redisHost: process.env.REDIS_HOST || 'localhost',
      redisPassword: process.env.REDIS_PASSWORD || '',
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});