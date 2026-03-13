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
      <PwaLinkCard title="Konto" />
    </div>
  </PullToRefresh>
</template>
