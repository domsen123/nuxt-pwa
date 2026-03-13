<script lang="ts" setup>
import type { PwaTabItem } from '~/types/pwa'

const props = withDefaults(defineProps<{
  items: PwaTabItem[]
  modelValue?: string
  haptic?: boolean
}>(), {
  haptic: true,
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'tabClick': [item: PwaTabItem]
}>()

const route = useRoute()
const NuxtLinkComponent = resolveComponent('NuxtLink')

const prefersReducedMotion = ref(false)
if (import.meta.client) {
  prefersReducedMotion.value = window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

const activeTab = computed(() => {
  if (props.modelValue !== undefined) return props.modelValue

  const current = route.path
  const exact = props.items.find(item => item.to === current)
  if (exact) return exact.key

  const prefix = props.items
    .filter(item => item.to && current.startsWith(item.to) && item.to !== '/')
    .sort((a, b) => (b.to?.length ?? 0) - (a.to?.length ?? 0))
  return prefix[0]?.key ?? props.items.find(item => item.to === '/')?.key ?? props.items[0]?.key
})

const activeIndex = computed(() =>
  props.items.findIndex(item => item.key === activeTab.value),
)

const indicatorStyle = computed(() => {
  const count = props.items.length
  if (activeIndex.value < 0 || count === 0) return { opacity: '0' }
  return {
    width: `${100 / count}%`,
    transform: `translateX(${activeIndex.value * 100}%)`,
    opacity: '1',
  }
})

function resolveIcon(item: PwaTabItem) {
  return activeTab.value === item.key && item.activeIcon ? item.activeIcon : item.icon
}

function tabComponent(item: PwaTabItem) {
  return item.to && !item.disabled ? NuxtLinkComponent : 'button'
}

function tabAttrs(item: PwaTabItem) {
  if (item.to && !item.disabled) {
    return {
      to: item.to,
      ...(activeTab.value === item.key ? { 'aria-current': 'page' as const } : {}),
    }
  }
  return {
    disabled: item.disabled || undefined,
    'aria-disabled': item.disabled || undefined,
  }
}

function onTabClick(item: PwaTabItem) {
  if (item.disabled) return
  if (props.haptic && !prefersReducedMotion.value) {
    navigator.vibrate?.(5)
  }
  emit('update:modelValue', item.key)
  emit('tabClick', item)
}
</script>

<template>
  <nav
    v-if="items.length"
    class="pwa-tabs bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800"
    aria-label="Main navigation"
  >
    <div class="pwa-tabs-indicator" :style="indicatorStyle">
      <div class="pwa-tabs-indicator-bar" />
    </div>

    <component
      :is="tabComponent(item)"
      v-for="item in items"
      :key="item.key"
      v-bind="tabAttrs(item)"
      class="pwa-tab-item"
      :class="[
        activeTab === item.key
          ? 'text-primary-500 dark:text-primary-400'
          : 'text-slate-500 dark:text-slate-400',
        { 'pwa-tab-disabled': item.disabled },
      ]"
      @click="onTabClick(item)"
    >
      <div class="pwa-tab-icon-wrap">
        <UChip
          v-if="item.badge !== undefined || item.badgeDot"
          :text="item.badgeDot ? undefined : item.badge"
          :size="item.badgeDot ? 'xs' : 'sm'"
          color="error"
          inset
        >
          <UIcon :name="resolveIcon(item)" class="pwa-tab-icon" />
        </UChip>
        <UIcon v-else :name="resolveIcon(item)" class="pwa-tab-icon" />
      </div>
      <span class="pwa-tab-label">{{ item.label }}</span>
    </component>
  </nav>
</template>

<style scoped>
.pwa-tabs {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 50;
  display: flex;
  align-items: stretch;
  justify-content: space-around;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  height: calc(56px + env(safe-area-inset-bottom, 0px));
}

.pwa-tabs-indicator {
  position: absolute;
  top: 0;
  left: 0;
  height: 3px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              opacity 0.2s ease;
  pointer-events: none;
}

.pwa-tabs-indicator-bar {
  width: 24px;
  height: 100%;
  margin: 0 auto;
  border-radius: 0 0 3px 3px;
  background: var(--color-primary-500);
}

.pwa-tab-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2px;
  padding: 6px 0;
  min-height: 56px;
  min-width: 44px;
  text-decoration: none;
  -webkit-tap-highlight-color: transparent;
  user-select: none;
  cursor: pointer;
  border: none;
  background: none;
  transition: color 0.2s ease, transform 0.1s ease;
}

.pwa-tab-item:active:not(.pwa-tab-disabled) {
  transform: scale(0.92);
}

.pwa-tab-item:focus-visible {
  outline: 2px solid var(--color-primary-500);
  outline-offset: -2px;
  border-radius: 4px;
}

.pwa-tab-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.pwa-tab-icon-wrap {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.pwa-tab-icon {
  width: 24px;
  height: 24px;
}

.pwa-tab-label {
  font-size: 10px;
  font-weight: 500;
  line-height: 1.2;
  letter-spacing: 0.02em;
}
</style>
