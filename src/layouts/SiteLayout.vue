<script setup lang="ts">
import SiteHeader from '@/components/site/SiteHeader.vue'
import SiteFooter from '@/components/site/SiteFooter.vue'
</script>

<template>
  <div class="site-layout">
    <SiteHeader />
    <main class="site-layout__main">
      <slot />
    </main>
    <SiteFooter />
  </div>
</template>

<style scoped>
.site-layout {
  min-height: 100%;
  background-color: var(--color-bg);
}

.site-layout__main {
  width: 100%;
}

@media (max-width: 767px) {
  .site-layout__main {
    overflow-x: hidden;
  }
}
</style>
