<template>
  <div>
    <UPageHero
      title="Notifications"
      description="Stay up to date with your latest activity and updates."
    />

    <UPageSection>
      <div class="flex flex-col items-center justify-center py-16 text-center">
        <UIcon name="i-lucide-bell-off" class="w-16 h-16 text-slate-300 dark:text-slate-600 mb-4" />
        <h3 class="text-lg font-semibold text-slate-700 dark:text-slate-300">
          No notifications yet
        </h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
          When you get notifications, they will show up here. Stay tuned!
        </p>
      </div>
    </UPageSection>

    <PwaTabs
      :items="[
        { key: 'home', label: 'Home', icon: 'i-lucide-home', to: '/' },
        { key: 'explore', label: 'Explore', icon: 'i-lucide-search', to: '/explore' },
        { key: 'notifications', label: 'Notifications', icon: 'i-lucide-bell', to: '/notifications' },
        { key: 'profile', label: 'Profile', icon: 'i-lucide-user', to: '/profile' },
      ]"
    />
  </div>
</template>
