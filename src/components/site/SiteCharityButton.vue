<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <RouterLink class="site-charity" to="/charity">
    Благодійність
  </RouterLink>
</template>

<style scoped>
.site-charity {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--charity-btn-w);
  height: var(--charity-btn-h);
  border-radius: var(--radius-pill);
  background-color: var(--color-charity-bg);
  color: var(--color-green);
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-charity);
  font-weight: var(--font-weight-bold);
  line-height: 1;
  flex-shrink: 0;
}

.site-charity:focus-visible {
  outline: 2px solid var(--color-fg);
  outline-offset: 2px;
}
</style>
