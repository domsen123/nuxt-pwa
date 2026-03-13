<script lang="ts" setup>
defineProps<{
  icon: string
  label: string
  value?: string
  to: string
}>()

const showModal = ref(false)
</script>

<template>
  <div>
    <div
      class="select-none w-full p-3 text-base gap-2 rounded-none font-medium flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors active:bg-elevated"
      @click="showModal = true"
    >
      <UIcon :name="icon" class="shrink-0 size-6"></UIcon>
      <div class="flex-1 truncate" v-text="label" />
      <div class="shrink-0 flex items-center  gap-1">
        <div class="font-normal" v-text="value"></div>
        <UIcon name="i-lucide-chevron-right" class="size-6 text-muted"></UIcon>
      </div>
    </div>

    <UModal
      v-model:open="showModal"
      fullscreen
      :ui="{
        content: 'data-[state=open]:animate-[slide-in-from-right_300ms_cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:animate-[slide-out-to-right_300ms_cubic-bezier(0.32,0.72,0,1)]',
      }"
    >
      <template #content>
        <UHeader :toggle="false">
          <template #left>
            <UButton label="Abbrechen" color="neutral" variant="ghost" @click="showModal = false" />
          </template>
          <template #right>
            <UButton label="Speichern" color="primary" variant="ghost" @click="showModal = false" />
          </template>
        </UHeader>
        <UMain>
          <slot />
        </UMain>
      </template>
    </UModal>
  </div>
</template>

<style></style>
