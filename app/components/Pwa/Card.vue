<script lang="ts" setup>
defineProps<{
  title?: string
}>()
</script>

<template>
  <UCard variant="soft" :ui="{ body: 'p-0 sm:p-0', root: 'rounded-none' }">
    <div v-if="title" class="px-4 py-3.5 text-muted font-medium text-sm" v-text="title"></div>
    <slot />
  </UCard>
</template>

<style></style>
