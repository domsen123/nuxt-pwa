<script lang="ts" setup>

</script>

<template>
  <PwaTabs
    :items="[
      { key: 'home', label: 'Home', icon: 'i-lucide-home', to: '/tabs/home' },
      { key: 'explore', label: 'Explore', icon: 'i-lucide-search', to: '/tabs/explore' },
      { key: 'notifications', label: 'Notifications', icon: 'i-lucide-bell', to: '/tabs/notifications' },
      { key: 'profile', label: 'Profile', icon: 'i-lucide-user', to: '/tabs/profile' },
    ]"
  >
    <NuxtPage />
  </PwaTabs>
</template>

<style></style>
