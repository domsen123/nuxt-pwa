<script setup lang="ts">
import FormItem from '~/components/Pwa/FormItem.vue'

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
        <FormItem v-bind="{ icon: 'i-lucide-user', label: 'Name', value: 'John Doe', to: '/profile' }">
          <div class="p-4">
            <p>Hier könnte ein Formular oder weitere Informationen stehen.</p>
          </div>
        </FormItem>
      </PwaCard>
    </div>
  </PullToRefresh>
</template>
