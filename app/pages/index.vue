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
      <UPageCard title="Test" variant="subtle">
        <UButton icon="i-lucide-form" label="Form Elements" block trailing-icon="i-lucide-chevron-right" variant="ghost" color="neutral" size="lg" />
        <UButton icon="i-lucide-form" label="asdf" block trailing-icon="i-lucide-chevron-right" variant="ghost" color="neutral" size="lg" />
      </UPageCard>
      <UPageCard description="Test" variant="subtle">
        <UButton icon="i-lucide-form" label="Form Elements" block trailing-icon="i-lucide-chevron-right" variant="ghost" color="neutral" size="lg" />
        <UButton icon="i-lucide-form" label="asdf" block trailing-icon="i-lucide-chevron-right" variant="ghost" color="neutral" size="lg" />
      </UPageCard>
      <UCard variant="subtle">
        <UButton icon="i-lucide-form" label="Form Elements" block trailing-icon="i-lucide-chevron-right" variant="ghost" color="neutral" size="lg" />
        <UButton icon="i-lucide-form" label="asdf" block trailing-icon="i-lucide-chevron-right" variant="ghost" color="neutral" size="lg" />
      </UCard>
      <UContainer>
        <UCard variant="subtle" :ui="{ body: 'px-0 py-4 sm:px-0 sm:py-6' }">
          <UButton icon="i-lucide-form" label="Form Elements" block trailing-icon="i-lucide-chevron-right" variant="ghost" color="neutral" size="xl" />
          <UButton icon="i-lucide-form" label="asdf" block trailing-icon="i-lucide-chevron-right" variant="ghost" color="neutral" size="xl" />
        </UCard>
      </UContainer>
      <UContainer>
        <UCard variant="subtle" :ui="{ body: 'px-0 py-4 sm:px-0 sm:py-6' }">
          <UButton icon="i-lucide-form" label="Form Elements" block trailing-icon="i-lucide-chevron-right" variant="ghost" color="neutral" size="lg" />
          <UButton icon="i-lucide-form" label="asdf" block trailing-icon="i-lucide-chevron-right" variant="ghost" color="neutral" size="lg" />
        </UCard>
      </UContainer>
    </div>
  </PullToRefresh>
</template>
