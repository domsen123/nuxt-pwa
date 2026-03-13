<script setup lang="ts">
async function handleRefresh(done: () => void) {
  await new Promise(resolve => setTimeout(resolve, 2000))
  done()
}
</script>

<template>
  <PullToRefresh @refresh="handleRefresh">
    <div class="space-y-4">
      <PwaLinkCard
        title="Links und Einstellungen"
        :items="[
          { icon: 'i-lucide-bookmark', label: 'Gespeichert', trailingText: 'Öffentlich' },
          { icon: 'i-lucide-clock-check', label: 'Archiv', trailingText: '2' },
          { icon: 'i-lucide-clock-fading', label: 'Deine Aktivitäten' },
          { icon: 'i-lucide-bell', label: 'Benachrichtigungen', to: '/notifications' },
          { icon: 'i-lucide-clock', label: 'Zeitmanagement' },
        ]"
      />
      <PwaCard title="Forms">
        <PwaFormItem name="profile-name" icon="i-lucide-user" label="Name" value="John Doe">
        </PwaFormItem>
      </PwaCard>
    </div>
  </PullToRefresh>
</template>
