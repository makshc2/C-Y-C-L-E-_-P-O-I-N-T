<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { VENUE } from '@/constants/site'

const route = useRoute()
const router = useRouter()

async function goToMap() {
  if (route.path !== '/' || route.hash !== '#contacts') {
    await router.push({ path: '/', hash: '#contacts' })
  }
  document.getElementById('contacts')?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<template>
  <button
    type="button"
    class="site-map-pin"
    :aria-label="`Мапа ${VENUE.name}, ${VENUE.address}`"
    @click="goToMap"
  >
    <svg
      class="site-map-pin__icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"
      />
    </svg>
  </button>
</template>

<style scoped>
.site-map-pin {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  margin-top: 8px;
  margin-left: 12px;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-fg);
  cursor: pointer;
}

.site-map-pin__icon {
  display: block;
  width: 28px;
  height: 28px;
}

.site-map-pin:hover {
  color: var(--color-fg-muted);
}

.site-map-pin:focus-visible {
  outline: 2px solid var(--color-fg);
  outline-offset: 2px;
}

@media (max-width: 1727px) {
  .site-map-pin {
    margin-top: 4px;
    margin-left: 8px;
  }
}
</style>
