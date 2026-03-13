<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui'

withDefaults(defineProps<{
  title: string
  items?: (ButtonProps & { trailingText?: string })[]
}>(), {
  items: () => [],
})
</script>

<template>
  <UCard variant="soft" :ui="{ body: 'p-0 sm:p-0', root: 'rounded-none' }">
    <div class="px-4 py-3.5 text-muted font-medium text-sm" v-text="title"></div>
    <NuxtLink
      v-for="(item, idx) in items"
      :key="idx"
      class="select-none w-full p-3 text-base gap-2 rounded-none font-medium flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors active:bg-elevated"
    >
      <UIcon :name="item.icon" class="shrink-0 size-6"></UIcon>
      <div class="flex-1 truncate" v-text="item.label" />
      <div class="shrink-0 flex items-center text-muted gap-1">
        <div class="text-xs font-normal" v-text="item.trailingText"></div>
        <UIcon name="i-lucide-chevron-right" class="size-6"></UIcon>
      </div>
    </NuxtLink>
  </UCard>
</template>

<style></style>
