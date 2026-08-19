<script setup lang="ts">
import danishLogoUrl from '@/assets/site/logo-danish.png'
import { footerSupportText } from '@/content/home'

defineProps<{
  showCopyrightSymbol: boolean
}>()
</script>

<template>
  <footer class="site-footer">
    <img
      class="site-footer__logo"
      :src="danishLogoUrl"
      width="175"
      height="85"
      alt="Danish Ukrainian Youth House"
    >
    <p class="site-footer__copy">
      {{ footerSupportText }}<span v-if="showCopyrightSymbol"> ©</span>
    </p>
  </footer>
</template>

<style scoped>
.site-footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: var(--footer-h);
  background-color: var(--color-tiffany);
  padding: 20px 24px 0;
}

.site-footer__logo {
  width: var(--danish-logo-w);
  height: var(--danish-logo-h);
  object-fit: contain;
  flex-shrink: 0;
}

.site-footer__copy {
  margin: 20px 0 0;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-footer);
  font-weight: var(--font-weight-regular);
  line-height: 18px;
  color: var(--color-fg-muted);
  text-align: center;
}
</style>
