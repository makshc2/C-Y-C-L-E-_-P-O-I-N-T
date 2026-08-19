<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <nav class="site-nav" aria-label="Основна навігація">
    <RouterLink class="site-nav__link" :to="{ path: '/', hash: '#contacts' }">
      Контакти
    </RouterLink>
    <RouterLink class="site-nav__link" to="/projects">
      Проєкти
    </RouterLink>
    <RouterLink class="site-nav__link" to="/workshop">
      Майстерня
    </RouterLink>
    <RouterLink class="site-nav__link" to="/rental">
      Прокат
    </RouterLink>
    <RouterLink class="site-nav__link" to="/artifacts">
      Артефакти
    </RouterLink>
    <RouterLink class="site-nav__link" to="/events">
      Події
    </RouterLink>
  </nav>
</template>

<style scoped>
.site-nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 32px;
}

.site-nav__link {
  font-family: var(--font-sans);
  font-size: var(--text-nav);
  font-weight: var(--font-weight-medium);
  line-height: 20px;
  color: var(--color-fg);
  white-space: nowrap;
}

.site-nav__link:focus-visible {
  outline: 2px solid var(--color-fg);
  outline-offset: 2px;
}

@media (max-width: 1727px) {
  .site-nav {
    flex-wrap: wrap;
    gap: 12px 24px;
  }
}
</style>
