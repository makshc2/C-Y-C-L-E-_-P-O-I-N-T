<script setup lang="ts">
import danishLogoUrl from '@/assets/site/logo-danish.png'
import { footerSupportText } from '@/content/home'
</script>

<template>
  <footer class="site-footer">
    <div class="site-footer__inner">
      <img
        class="site-footer__logo"
        :src="danishLogoUrl"
        width="115"
        height="56"
        alt="Danish Ukrainian Youth House"
      >
      <p class="site-footer__copy">{{ footerSupportText }}</p>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: var(--color-tiffany);
}

.site-footer__inner {
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: min(100%, var(--page-w));
  min-height: var(--footer-h);
  margin-inline: auto;
  padding: 16px 16px 0 calc(var(--footer-inset-x) / var(--page-w) * 100%);
}

.site-footer__logo {
  width: var(--danish-logo-w);
  height: var(--danish-logo-h);
  object-fit: contain;
  flex-shrink: 0;
}

.site-footer__copy {
  margin: 7px 0 0;
  max-width: 166px;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-footer);
  font-weight: var(--font-weight-regular);
  line-height: 13.8px;
  color: var(--color-fg-muted);
  text-align: left;
  white-space: pre-line;
}

@media (min-width: 1728px) {
  .site-footer__inner {
    padding-left: var(--footer-inset-x);
  }
}

@media (max-width: 767px) {
  .site-footer__inner {
    padding-left: 16px;
  }
}
</style>
