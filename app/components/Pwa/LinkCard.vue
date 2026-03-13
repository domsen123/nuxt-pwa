<script lang="ts" setup>
defineProps<{
  title: string
}>()
</script>

<template>
  <UCard variant="subtle" :ui="{ body: 'p-0 sm:p-0' }">
    <div class="px-4 py-2 text-muted font-medium text-sm" v-text="title"></div>
    <UButton icon="i-lucide-form" label="Form Elements" block trailing-icon="i-lucide-chevron-right" variant="ghost" color="neutral" size="xl" />
    <UButton icon="i-lucide-form" label="asdf" block trailing-icon="i-lucide-chevron-right" variant="ghost" color="neutral" size="xl" />
  </UCard>
</template>

<style></style>
