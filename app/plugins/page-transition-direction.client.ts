export default defineNuxtPlugin(() => {
  const router = useRouter()

  // Track the current page's history position (updated after each navigation completes)
  let currentPosition = history.state?.position ?? 0

  router.afterEach(() => {
    currentPosition = history.state?.position ?? currentPosition
  })

  router.beforeEach((to, from) => {
    const fromIsTab = from.path.startsWith('/tabs/')
    const toIsTab = to.path.startsWith('/tabs/')

    // Disable transitions for tab-to-tab navigation
    if (fromIsTab && toIsTab) {
      to.meta.viewTransition = false
      return
    }

    // For push/replace: browser hasn't updated history.state yet, so position === currentPosition
    // For pop (back/forward): browser has already updated history.state to the destination
    const statePosition = history.state?.position ?? 0

    if (statePosition === currentPosition) {
      // Programmatic navigation (push/replace) — always forward
      to.meta.viewTransition = { types: ['slide-forward'] }
    } else {
      // Pop navigation (back/forward button)
      const direction = statePosition < currentPosition ? 'slide-back' : 'slide-forward'
      to.meta.viewTransition = { types: [direction] }
    }
  })
})
