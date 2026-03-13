// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt',
    'nuxt-mcp-dev',
  ],

  devtools: {
    enabled: true,
  },

  css: ['~/assets/css/main.css'],

  experimental: {
    viewTransition: true,
  },

  compatibilityDate: '2025-01-15',
  pwa: {
    registerType: 'prompt',
    manifest: {
      name: 'Sample PWA',
      description: 'A sample Progressive Web App built with Nuxt 3 and the Nuxt PWA module.',
      short_name: 'PWA',
      start_url: '/',
      scope: '/',
      display: 'standalone',
      orientation: 'portrait',
      background_color: '#ffffff',
      theme_color: '#ffffff',
      icons: [
        {
          src: 'icons/icon-48x48.png',
          sizes: '48x48',
          type: 'image/png',
        },
        {
          src: 'icons/icon-72x72.png',
          sizes: '72x72',
          type: 'image/png',
        },
        {
          src: 'icons/icon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: 'icons/icon-128x128.png',
          sizes: '128x128',
          type: 'image/png',
        },
        {
          src: 'icons/icon-144x144.png',
          sizes: '144x144',
          type: 'image/png',
        },
        {
          src: 'icons/icon-152x152.png',
          sizes: '152x152',
          type: 'image/png',
        },
        {
          src: 'icons/icon-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: 'icons/icon-256x256.png',
          sizes: '256x256',
          type: 'image/png',
        },
        {
          src: 'icons/icon-384x384.png',
          sizes: '384x384',
          type: 'image/png',
        },
        {
          src: 'icons/icon-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    devOptions: {
      enabled: true,
    },
  },
})
