<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui'

withDefaults(defineProps<{
  title: string
  items?: ButtonProps[]
}>(), {
  items: () => [],
})
</script>

<template>
  <UCard variant="soft" :ui="{ body: 'p-0 sm:p-0', root: 'rounded-none' }">
    <div class="px-4 py-2 text-muted font-medium text-sm" v-text="title"></div>
    <UButton v-for="(item, idx) in items" :key="idx" block trailing-icon="i-lucide-chevron-right" variant="ghost" color="neutral" size="xl" v-bind="item" />
  </UCard>
</template>

<style></style>
