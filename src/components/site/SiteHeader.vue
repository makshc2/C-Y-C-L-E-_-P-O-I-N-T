<script setup lang="ts">
import SiteLogo from './SiteLogo.vue'
import SiteNav from './SiteNav.vue'
import SiteCharityButton from './SiteCharityButton.vue'
import SiteLangToggle from './SiteLangToggle.vue'
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <SiteLogo />
      <div class="site-header__right">
        <SiteNav />
        <SiteCharityButton class="site-header__charity" />
        <SiteLangToggle />
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header {
  height: var(--header-h);
  background-color: var(--color-bg);
  position: relative;
  z-index: 2;
}

.site-header__inner {
  display: flex;
  align-items: flex-start;
  width: min(100%, var(--page-w));
  height: var(--header-h);
  margin: 0 auto;
  padding: 12px 45px 0 var(--logo-x);
}

.site-header__right {
  display: flex;
  align-items: center;
  margin-left: auto;
  height: 40px;
  margin-top: 9px;
}

.site-header__charity {
  margin-left: 35px;
  margin-right: 45px;
}

@media (max-width: 1279px) {
  .site-header {
    height: auto;
  }

  .site-header__inner {
    height: auto;
    min-height: var(--header-h);
    flex-wrap: wrap;
    row-gap: 12px;
    padding: 12px 16px;
  }

  .site-header__right {
    flex-basis: 100%;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 16px 24px;
    height: auto;
    margin: 0;
  }

  .site-header__charity {
    margin: 0;
  }
}
</style>
