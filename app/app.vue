<script setup>
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#10172b' : 'white')

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-visual' },
    { key: 'theme-color', name: 'theme-color', content: color },
    { name: 'apple-mobile-web-app-capable', content: 'yes' },
  ],
  link: [
    { rel: 'icon', href: '/favicon.svg', type: 'image/svg+xml' },
  ],
  htmlAttrs: {
    lang: 'en',
  },
})

const title = 'Sample PWA'
const description = 'A sample Progressive Web App built with Nuxt 3 and the Nuxt PWA module.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
})
</script>

<template>
  <NuxtPwaManifest />
  <UApp>
    <UHeader>
    </UHeader>

    <UMain>
      <NuxtPage />
    </UMain>
  </UApp>
</template>
