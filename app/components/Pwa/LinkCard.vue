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
    <div class="p-4 text-muted font-medium text-sm" v-text="title"></div>
    <UButton
      v-for="(item, idx) in items"
      :key="idx"
      block
      trailing-icon="i-lucide-chevron-right"
      variant="ghost"
      color="neutral"
      v-bind="item"
      :ui="{
        base: 'p-3 text-base gap-2',
        leadingIcon: 'size-6',
        leadingAvatarSize: 'xs',
        trailingIcon: 'size-6 text-muted',
      }"
    />
  </UCard>
</template>

<style></style>
