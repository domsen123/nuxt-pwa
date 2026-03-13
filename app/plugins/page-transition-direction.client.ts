export default defineNuxtPlugin(() => {
  const router = useRouter()

  let isPopstate = false
  let lastPosition = history.state?.position ?? 0

  window.addEventListener('popstate', () => {
    isPopstate = true
  })

  router.beforeEach((to, from) => {
    const fromIsTab = from.path.startsWith('/tabs/')
    const toIsTab = to.path.startsWith('/tabs/')

    // Disable transitions for tab-to-tab navigation
    if (fromIsTab && toIsTab) {
      to.meta.viewTransition = false
      isPopstate = false
      return
    }

    const currentPosition = history.state?.position ?? 0

    if (isPopstate) {
      const direction = currentPosition < lastPosition ? 'slide-back' : 'slide-forward'
      to.meta.viewTransition = { types: [direction] }
      isPopstate = false
    } else {
      to.meta.viewTransition = { types: ['slide-forward'] }
    }

    lastPosition = currentPosition
  })

  router.afterEach(() => {
    lastPosition = history.state?.position ?? lastPosition
  })
})
