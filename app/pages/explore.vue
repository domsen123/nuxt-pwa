<template>
  <div>
    <UPageHero
      title="Explore"
      description="Discover new content, trending topics, and popular projects."
    />

    <UPageSection
      title="Trending"
      :features="[{
        icon: 'i-lucide-trending-up',
        title: 'Most Popular',
        description: 'See what the community is building and sharing right now.',
      }, {
        icon: 'i-lucide-star',
        title: 'Featured Projects',
        description: 'Hand-picked projects that showcase the best of the ecosystem.',
      }, {
        icon: 'i-lucide-flame',
        title: 'Hot Topics',
        description: 'Join the conversation on the most discussed topics this week.',
      }]"
    />

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
