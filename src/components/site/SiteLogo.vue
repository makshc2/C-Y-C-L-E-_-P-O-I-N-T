<script setup lang="ts">
import { RouterLink } from 'vue-router'
import logoUrl from '@/assets/site/logo-cyclepoint-header.png'
</script>

<template>
  <RouterLink class="site-logo" to="/" aria-label="Cycle Point">
    <img
      class="site-logo__img"
      :src="logoUrl"
      width="385"
      height="56"
      alt="cyclepoint"
    >
  </RouterLink>
</template>

<style scoped>
.site-logo {
  display: block;
  flex-shrink: 0;
  width: var(--logo-w);
  height: var(--logo-h);
}

.site-logo__img {
  width: var(--logo-w);
  height: var(--logo-h);
  max-width: none;
  object-fit: contain;
}

@media (max-width: 1727px) {
  .site-logo,
  .site-logo__img {
    width: min(var(--logo-w), 70vw);
    height: auto;
  }
}
</style>
