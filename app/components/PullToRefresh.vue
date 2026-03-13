<script setup lang="ts">
const props = withDefaults(defineProps<{
  disabled?: boolean
  threshold?: number
  maxTimeout?: number
}>(), {
  disabled: false,
  threshold: 80,
  maxTimeout: 10000,
})

const emit = defineEmits<{
  refresh: []
}>()

type State = 'idle' | 'pulling' | 'threshold' | 'refreshing' | 'done'

const state = ref<State>('idle')
const pullDistance = ref(0)
const startY = ref(0)
const isTracking = ref(false)
const containerRef = ref<HTMLElement>()
const maxPull = 160

let timeoutId: ReturnType<typeof setTimeout> | null = null
let thresholdCrossed = false

const progress = computed(() => Math.min(pullDistance.value / props.threshold, 1))

const indicatorStyle = computed(() => ({
  height: state.value === 'refreshing' ? `${props.threshold}px` : `${Math.max(pullDistance.value, 0)}px`,
  transition: state.value === 'idle' || state.value === 'done'
    ? 'height 0.4s cubic-bezier(0.2, 0.9, 0.3, 1.2)'
    : state.value === 'refreshing'
      ? 'height 0.3s ease-out'
      : 'none',
}))

const contentStyle = computed(() => ({
  transform: state.value === 'refreshing'
    ? `translateY(${props.threshold}px)`
    : `translateY(${pullDistance.value}px)`,
  transition: state.value === 'idle' || state.value === 'done'
    ? 'transform 0.4s cubic-bezier(0.2, 0.9, 0.3, 1.2)'
    : state.value === 'refreshing'
      ? 'transform 0.3s ease-out'
      : 'none',
}))

const dashOffset = computed(() => {
  const circumference = 2 * Math.PI * 14
  return circumference * (1 - progress.value)
})

const circumference = 2 * Math.PI * 14

function dampen(raw: number): number {
  return raw * 0.5 * (1 - Math.min(raw / (maxPull * 3), 0.6))
}

function canPull(): boolean {
  return !props.disabled && window.scrollY <= 0
}

function onStart(clientY: number) {
  if (!canPull() || state.value === 'refreshing') return
  startY.value = clientY
  isTracking.value = true
  thresholdCrossed = false
}

function onMove(clientY: number, event?: Event) {
  if (!isTracking.value || state.value === 'refreshing') return

  const rawDelta = clientY - startY.value
  if (rawDelta <= 0) {
    pullDistance.value = 0
    state.value = 'idle'
    return
  }

  if (!canPull()) {
    isTracking.value = false
    return
  }

  event?.preventDefault()

  const dampened = dampen(rawDelta)
  pullDistance.value = Math.min(dampened, maxPull)

  if (pullDistance.value >= props.threshold) {
    if (!thresholdCrossed) {
      thresholdCrossed = true
      navigator.vibrate?.(10)
    }
    state.value = 'threshold'
  } else {
    state.value = 'pulling'
    thresholdCrossed = false
  }
}

function onEnd() {
  if (!isTracking.value) return
  isTracking.value = false

  if (state.value === 'threshold') {
    state.value = 'refreshing'
    pullDistance.value = 0
    emit('refresh')
    timeoutId = setTimeout(done, props.maxTimeout)
  } else {
    reset()
  }
}

function reset() {
  state.value = 'idle'
  pullDistance.value = 0
}

function done() {
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = null
  }
  state.value = 'done'
  pullDistance.value = 0
  setTimeout(() => {
    state.value = 'idle'
  }, 300)
}

function onTouchStart(e: TouchEvent) {
  const touch = e.touches[0]
  if (touch) onStart(touch.clientY)
}

function onTouchMove(e: TouchEvent) {
  const touch = e.touches[0]
  if (touch) onMove(touch.clientY, e)
}

function onTouchEnd() {
  onEnd()
}

function onMouseDown(e: MouseEvent) {
  onStart(e.clientY)
}

function onMouseMove(e: MouseEvent) {
  if (!isTracking.value) return
  onMove(e.clientY, e)
}

function onMouseUp() {
  onEnd()
}

onMounted(() => {
  const el = containerRef.value
  if (!el) return
  el.addEventListener('touchmove', onTouchMove as EventListener, { passive: false })
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('mouseup', onMouseUp)
})

onBeforeUnmount(() => {
  const el = containerRef.value
  if (el) {
    el.removeEventListener('touchmove', onTouchMove as EventListener)
  }
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('mouseup', onMouseUp)
  if (timeoutId) clearTimeout(timeoutId)
})

defineExpose({ done })
</script>

<template>
  <div
    ref="containerRef"
    class="ptr-container"
    @touchstart.passive="onTouchStart"
    @touchend="onTouchEnd"
    @mousedown="onMouseDown"
  >
    <div class="ptr-indicator" :style="indicatorStyle">
      <div class="ptr-spinner-wrap">
        <svg
          class="ptr-svg"
          :class="{
            'ptr-spinning': state === 'refreshing',
            'ptr-shrink': state === 'done',
            'ptr-pulse': state === 'threshold',
          }"
          viewBox="0 0 36 36"
        >
          <!-- Background track -->
          <circle
            class="ptr-track"
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke-width="3"
          />
          <!-- Progress arc -->
          <circle
            class="ptr-arc"
            cx="18"
            cy="18"
            r="14"
            fill="none"
            stroke-width="3"
            stroke-linecap="round"
            :stroke-dasharray="circumference"
            :stroke-dashoffset="state === 'refreshing' || state === 'done' ? 0 : dashOffset"
            transform="rotate(-90 18 18)"
          />
          <!-- Center dot -->
          <circle
            v-if="state === 'pulling' || state === 'threshold'"
            class="ptr-dot"
            cx="18"
            cy="18"
            :r="1 + progress * 2"
          />
        </svg>
      </div>
    </div>

    <div class="ptr-content" :style="contentStyle">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ptr-container {
  touch-action: pan-y;
  position: relative;
  overflow: hidden;
}

.ptr-indicator {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  z-index: 10;
}

.ptr-spinner-wrap {
  width: 36px;
  height: 36px;
  flex-shrink: 0;
}

.ptr-svg {
  width: 36px;
  height: 36px;
}

.ptr-track {
  stroke: var(--color-green-200);
  opacity: 0.4;
}

:root.dark .ptr-track {
  stroke: var(--color-green-900);
}

.ptr-arc {
  stroke: var(--color-green-500);
  transition: stroke-dashoffset 0.05s linear;
}

.ptr-dot {
  fill: var(--color-green-500);
}

.ptr-spinning {
  animation: ptr-rotate 1.4s linear infinite;
}

.ptr-spinning .ptr-arc {
  animation: ptr-dash 1.4s ease-in-out infinite;
  stroke-dasharray: 87.96;
  stroke-dashoffset: 0;
}

.ptr-pulse {
  animation: ptr-pulse 0.6s ease-in-out infinite;
}

.ptr-shrink {
  animation: ptr-shrink 0.3s ease-out forwards;
}

.ptr-content {
  will-change: transform;
}

@keyframes ptr-rotate {
  100% {
    transform: rotate(360deg);
  }
}

@keyframes ptr-dash {
  0% {
    stroke-dashoffset: 87.96;
  }
  50% {
    stroke-dashoffset: 22;
  }
  100% {
    stroke-dashoffset: 87.96;
  }
}

@keyframes ptr-pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15);
  }
}

@keyframes ptr-shrink {
  to {
    transform: scale(0);
    opacity: 0;
  }
}
</style>
