<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  tone: 'violet' | 'lime'
}>()
</script>

<template>
  <RouterLink
    class="site-back"
    :class="`site-back--${tone}`"
    to="/projects"
  >
    {{ '< Назад' }}
  </RouterLink>
</template>

<style scoped>
.site-back {
  display: inline-block;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-read-more);
  font-weight: var(--font-weight-light);
  line-height: 1.2;
  text-decoration: none;
}

.site-back--violet {
  color: rgba(231, 252, 132, 0.5);
}

.site-back--lime {
  color: var(--color-section-title);
}

.site-back--violet:focus-visible {
  outline: 2px solid var(--color-green);
  outline-offset: 2px;
}

.site-back--lime:focus-visible {
  outline: 2px solid var(--color-fg);
  outline-offset: 2px;
}
</style>
