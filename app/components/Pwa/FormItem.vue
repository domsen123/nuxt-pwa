<script lang="ts" setup>
const props = withDefaults(defineProps<{
  name: string
  icon: string
  label: string
  description?: string
  value?: string
  cancelLabel?: string
  saveLabel?: string
  haptic?: boolean
}>(), {
  cancelLabel: 'Abbrechen',
  saveLabel: 'Speichern',
  haptic: true,
})

const emit = defineEmits<{
  save: []
  cancel: []
}>()

const router = useRouter()
const modalParam = useRouteQuery<string | null>('modal', null)

const isOpen = computed({
  get: () => modalParam.value === props.name,
  set: (val: boolean) => {
    if (val) {
      // push creates a history entry so the back button closes the modal
      router.push({ query: { ...router.currentRoute.value.query, modal: props.name } })
    }
    else {
      // useRouteQuery defaults to replace -- no extra history entry on close
      modalParam.value = null
    }
  },
})

const triggerRef = ref<HTMLButtonElement>()
const modalLabelId = useId()

// Suppress the open animation if modal is already open on mount (hard refresh / deep link).
// Re-enable after the first close so subsequent opens animate normally.
const suppressOpenAnimation = ref(false)
onMounted(() => {
  if (isOpen.value) {
    suppressOpenAnimation.value = true
  }
})
watch(isOpen, (val) => {
  if (!val) suppressOpenAnimation.value = false
})

const prefersReducedMotion = ref(false)
if (import.meta.client) {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

function openModal() {
  if (props.haptic && !prefersReducedMotion.value) {
    navigator.vibrate?.(5)
  }
  isOpen.value = true
}

function onCancel() {
  isOpen.value = false
  emit('cancel')
  nextTick(() => triggerRef.value?.focus())
}

function onSave() {
  isOpen.value = false
  emit('save')
  nextTick(() => triggerRef.value?.focus())
}
</script>

<template>
  <div>
    <button
      ref="triggerRef"
      type="button"
      class="pwa-form-item-trigger select-none w-full p-3 text-base gap-2 rounded-none font-medium flex items-center disabled:cursor-not-allowed aria-disabled:cursor-not-allowed disabled:opacity-75 aria-disabled:opacity-75 transition-colors active:bg-elevated"
      aria-haspopup="dialog"
      :aria-expanded="isOpen"
      @click="openModal"
    >
      <UIcon :name="icon" class="shrink-0 size-6" />
      <div class="flex-1 truncate" v-text="label" />
      <div class="shrink-0 flex items-center gap-1">
        <div v-if="value" class="font-normal text-muted" v-text="value" />
        <UIcon name="i-lucide-chevron-right" class="size-6 text-muted" />
      </div>
    </button>

    <UModal
      v-model:open="isOpen"
      fullscreen
      :close="false"
      :dismissible="false"
      :ui="{
        content: suppressOpenAnimation
          ? 'data-[state=closed]:animate-[slide-out-to-right_300ms_cubic-bezier(0.32,0.72,0,1)]'
          : 'data-[state=open]:animate-[slide-in-from-right_300ms_cubic-bezier(0.32,0.72,0,1)] data-[state=closed]:animate-[slide-out-to-right_300ms_cubic-bezier(0.32,0.72,0,1)]',
      }"
    >
      <template #header>
        <UButton :label="cancelLabel" color="neutral" variant="ghost" @click="onCancel" />
        <span class="flex-1" />
        <UButton :label="saveLabel" color="primary" variant="ghost" @click="onSave" />
      </template>

      <template #body>
        <h3 :id="modalLabelId" class="text-2xl font-medium mb-4" v-text="label" />
        <p v-if="description" class="text-muted" v-text="description" />
        <slot />
      </template>
    </UModal>
  </div>
</template>

<style scoped>
.pwa-form-item-trigger {
  -webkit-appearance: none;
  appearance: none;
  border: none;
  background: none;
  text-align: left;
  -webkit-tap-highlight-color: transparent;
}

.pwa-form-item-trigger:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: -2px;
  border-radius: 4px;
}
</style>
