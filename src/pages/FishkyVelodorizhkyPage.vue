<script setup lang="ts">
import SiteBackLink from '@/components/site/SiteBackLink.vue'
import { fishkyVelodorizhky } from '@/content/fishkyVelodorizhky'
import photoUrl from '@/assets/site/fishky-velodorizhky-photo.png'
</script>

<template>
  <section class="fishky">
    <SiteBackLink tone="violet" />
    <img
      class="fishky__photo"
      :src="photoUrl"
      width="516"
      height="682"
      alt="Мапа Києва — Фішки велодоріжки"
    >
    <div class="fishky__copy">
      <h1 class="fishky__title">{{ fishkyVelodorizhky.title }}</h1>
      <p v-for="(paragraph, index) in fishkyVelodorizhky.paragraphs" :key="index">
        {{ paragraph }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.fishky {
  display: grid;
  grid-template-columns: var(--gs-photo-w) minmax(0, 786px);
  grid-template-rows: max-content 1fr;
  align-content: start;
  column-gap: 133px;
  min-height: 1251px;
  padding: 34px 148px 0 145px;
  background-color: var(--color-violet);
}

.fishky > :deep(.site-back) {
  grid-column: 1;
  grid-row: 1;
  align-self: start;
  justify-self: start;
  margin: 0 0 54px;
}

.fishky__photo {
  grid-column: 1;
  grid-row: 2;
  width: var(--gs-photo-w);
  height: var(--gs-photo-h);
  object-fit: cover;
}

.fishky__copy {
  grid-column: 2;
  grid-row: 2;
  color: var(--color-green);
}

.fishky__title {
  margin: 0 0 72px;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-h1-display);
  font-weight: var(--font-weight-light);
  line-height: 1.05;
  color: var(--color-green);
}

.fishky__copy p {
  margin: 0 0 1em;
  max-width: 786px;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-body);
  font-weight: var(--font-weight-regular);
  line-height: 1.35;
  color: var(--color-green);
}

@media (max-width: 767px) {
  .fishky {
    display: flex;
    flex-direction: column;
    min-height: 0;
    padding: 32px 16px 48px;
    row-gap: 24px;
  }

  .fishky > :deep(.site-back) {
    margin: 0;
  }

  .fishky__photo {
    width: 100%;
    max-width: none;
    height: auto;
  }

  .fishky__copy p {
    max-width: none;
  }

  .fishky__title {
    margin-bottom: 24px;
    font-size: clamp(40px, 12vw, 96px);
  }
}
</style>
