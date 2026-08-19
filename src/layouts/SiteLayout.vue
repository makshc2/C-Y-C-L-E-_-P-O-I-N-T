<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteHeader from '@/components/site/SiteHeader.vue'
import SiteFooter from '@/components/site/SiteFooter.vue'
import { COPYRIGHT_PATHS } from '@/constants/site'

const route = useRoute()

const showCopyrightSymbol = computed(() =>
  (COPYRIGHT_PATHS as readonly string[]).includes(route.path),
)
</script>

<template>
  <div class="site-layout">
    <SiteHeader />
    <main class="site-layout__main">
      <slot />
    </main>
    <SiteFooter :show-copyright-symbol="showCopyrightSymbol" />
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
