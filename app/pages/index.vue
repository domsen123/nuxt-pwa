<script setup lang="ts">
async function handleRefresh(done: () => void) {
  await new Promise(resolve => setTimeout(resolve, 2000))
  done()
}
</script>

<template>
  <PullToRefresh @refresh="handleRefresh">
    <div class="space-y-4">
      <UContainer></UContainer>
      <PwaLinkCard
        title="Wie du Intagram nutzt"
        :items="[
          { icon: 'i-lucide-bookmark', label: 'Gespeichert', trailingText: 'Öffentlich' },
          { icon: 'i-lucide-clock-check', label: 'Archiv', trailingText: '2' },
          { icon: 'i-lucide-clock-fading', label: 'Deine Aktivitäten' },
          { icon: 'i-lucide-bell', label: 'Benachrichtigungen' },
          { icon: 'i-lucide-bell', label: 'Benachrichtigungen' },
          { icon: 'i-lucide-clock', label: 'Zeitmanagement' },
        ]"
      />
    </div>
  </PullToRefresh>
</template>
