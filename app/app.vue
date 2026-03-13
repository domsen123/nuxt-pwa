<script setup>
const { $pwa } = useNuxtApp()
const toast = useToast()
const colorMode = useColorMode()

const themeColor = computed(() =>
  colorMode.value === 'dark' ? '#10172b' : 'white',
)

useHead({
  meta: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1, viewport-fit=cover, interactive-widget=resizes-visual',
    },
    {
      key: 'theme-color-light',
      name: 'theme-color',
      media: '(prefers-color-scheme: light)',
      content: computed(() =>
        colorMode.preference === 'system' ? 'white' : themeColor.value,
      ),
    },
    {
      key: 'theme-color-dark',
      name: 'theme-color',
      media: '(prefers-color-scheme: dark)',
      content: computed(() =>
        colorMode.preference === 'system' ? '#10172b' : themeColor.value,
      ),
    },
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

watch(
  () => $pwa?.needRefresh,
  (needRefresh) => {
    if (needRefresh) {
      toast.add({
        title: 'Update Available',
        description: 'A new version of the app is available. Please refresh to update.',
        color: 'info',
        duration: 0,
        close: false,
        orientation: 'horizontal',
        actions: [{
          label: 'Refresh',
          size: 'lg',
          variant: 'subtle',

          onClick: () => {
            $pwa?.updateServiceWorker(true)
          },
        }],
      })
    }
  },
)
</script>

<template>
  <NuxtPwaManifest />
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>
