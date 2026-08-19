<script setup lang="ts">
defineProps<{
  show: boolean
}>()
</script>

<template>
  <Teleport to="body">
    <div
      v-if="show"
      class="site-page-preloader"
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <span class="site-page-preloader__spinner" aria-hidden="true" />
      <span class="site-page-preloader__label">Завантаження</span>
    </div>
  </Teleport>
</template>

<style scoped>
.site-page-preloader {
  position: fixed;
  inset: 0;
  z-index: 4000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  background-color: var(--color-green);
}

.site-page-preloader__spinner {
  width: 56px;
  height: 56px;
  border: 4px solid rgba(30, 30, 30, 0.2);
  border-top-color: var(--color-fg);
  border-radius: 50%;
  animation: site-page-preloader-spin 0.8s linear infinite;
}

.site-page-preloader__label {
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-body);
  font-weight: var(--font-weight-light);
  color: var(--color-fg);
}

@keyframes site-page-preloader-spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .site-page-preloader__spinner {
    animation: none;
    border-top-color: var(--color-fg);
  }
}
</style>
