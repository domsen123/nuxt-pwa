<template>
  <div>
    <UPageHero
      title="Profile"
      description="Manage your account settings and preferences."
    />

    <UPageSection>
      <div class="flex flex-col items-center py-8">
        <UAvatar
          size="3xl"
          icon="i-lucide-user"
          class="mb-4"
        />
        <h3 class="text-xl font-semibold text-slate-800 dark:text-slate-200">
          Guest User
        </h3>
        <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Sign in to access your profile
        </p>
        <UButton
          label="Sign In"
          icon="i-lucide-log-in"
          size="lg"
          class="mt-6"
        />
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
