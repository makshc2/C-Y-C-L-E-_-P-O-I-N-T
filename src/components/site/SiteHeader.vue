<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteLogo from './SiteLogo.vue'
import SiteNav from './SiteNav.vue'
import SiteCharityButton from './SiteCharityButton.vue'
import SiteLangToggle from './SiteLangToggle.vue'

const route = useRoute()

const sectionTitles: Record<string, string> = {
  '/': 'Велоточка',
  '/events': 'Події та новини',
  '/workshop': 'Майстерня',
  '/rental': 'Прокат',
  '/artifacts': 'Артефакти Велоточки',
  '/charity': 'Допомогти Велоточці',
}

const sectionTitle = computed(() => {
  if (route.path.startsWith('/projects')) return 'Проєкти'
  return sectionTitles[route.path] ?? ''
})
</script>

<template>
  <header class="site-header">
    <div class="site-header__inner">
      <SiteLogo />
      <p v-if="sectionTitle" class="site-header__title">{{ sectionTitle }}</p>
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
  position: sticky;
  top: 0;
  z-index: 20;
}

.site-header__inner {
  display: flex;
  align-items: flex-start;
  width: min(100%, var(--page-w));
  height: var(--header-h);
  margin: 0 auto;
  padding: 10px 45px 0 var(--logo-x);
}

.site-header__title {
  flex: 1 1 auto;
  min-width: 0;
  margin: 6px 12px 0;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-section-title);
  font-weight: var(--font-weight-light);
  line-height: 41px;
  color: var(--color-section-title);
  text-align: center;
  white-space: nowrap;
}

.site-header__inner:has(.site-header__title) .site-header__right {
  margin-left: 0;
}

.site-header__right {
  display: flex;
  align-items: center;
  margin-left: auto;
  height: 40px;
  margin-top: 11px;
}

.site-header__charity {
  margin-left: 35px;
  margin-right: 45px;
}

@media (max-width: 1599px) {
  .site-header,
  .site-header__inner {
    height: auto;
  }

  .site-header__inner {
    min-height: var(--header-h);
    flex-wrap: wrap;
  }

  .site-header__title {
    flex: 1 1 100%;
    order: 2;
    margin: 0 0 4px;
    font-size: var(--text-section-title);
    line-height: 41px;
    text-align: left;
  }
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

  .site-header__title {
    flex: 1 1 100%;
    order: 2;
    margin: 0;
    font-size: 28px;
    line-height: 34px;
    text-align: left;
  }

  .site-header__right {
    flex-basis: 100%;
    order: 3;
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

@media (min-width: 768px) and (max-width: 1376px) {
  .site-header__inner {
    padding: 16px 32px 12px;
    row-gap: 8px;
  }

  .site-header__title {
    margin: 0;
    font-size: 32px;
    line-height: 38px;
    text-align: center;
  }

  .site-header__inner:has(.site-header__title) .site-header__right {
    margin-left: auto;
  }

  .site-header__right {
    gap: 12px 20px;
  }

  .site-header__charity {
    margin-left: 12px;
    margin-right: 12px;
  }
}
</style>
