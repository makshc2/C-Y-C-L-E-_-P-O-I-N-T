<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SiteBackLink from '@/components/site/SiteBackLink.vue'
import { goldenSprintsDetail, readMoreLabel } from '@/content/projects'
import photoUrl from '@/assets/site/gs-detail-photo.png'
</script>

<template>
  <section class="gs">
    <SiteBackLink tone="violet" />
    <img
      class="gs__photo"
      :src="photoUrl"
      width="516"
      height="682"
      alt="Golden sprints"
    >
    <div class="gs__copy">
      <h1 class="gs__title">{{ goldenSprintsDetail.title }}</h1>
      <p v-for="(paragraph, index) in goldenSprintsDetail.paragraphs" :key="index">
        {{ paragraph }}
      </p>
      <RouterLink class="gs__more" to="/projects/golden-sprints/app">
        {{ readMoreLabel }}
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.gs {
  display: grid;
  grid-template-columns: var(--gs-photo-w) minmax(0, 786px);
  grid-template-rows: max-content 1fr;
  align-content: start;
  column-gap: 133px;
  min-height: 1251px;
  padding: 34px 148px 0 145px;
  background-color: var(--color-violet);
}

.gs > :deep(.site-back) {
  grid-column: 1;
  grid-row: 1;
  align-self: start;
  justify-self: start;
  margin: 0 0 54px;
}

.gs__photo {
  grid-column: 1;
  grid-row: 2;
  width: var(--gs-photo-w);
  height: var(--gs-photo-h);
  object-fit: cover;
}

.gs__copy {
  grid-column: 2;
  grid-row: 2;
  color: var(--color-green);
}

.gs__title {
  margin: 0 0 72px;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-h1-display);
  font-weight: var(--font-weight-light);
  line-height: 1.05;
  color: var(--color-green);
}

.gs__copy p {
  margin: 0 0 1em;
  max-width: 786px;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-project-body);
  font-weight: var(--font-weight-regular);
  line-height: 1.35;
  color: var(--color-green);
}

.gs__more {
  display: inline-block;
  margin-top: 8px;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-read-more);
  font-weight: var(--font-weight-light);
  line-height: 1.2;
  color: var(--color-green);
}

.gs__more:focus-visible {
  outline: 2px solid var(--color-green);
  outline-offset: 2px;
}

@media (max-width: 767px) {
  .gs {
    display: flex;
    flex-direction: column;
    min-height: 0;
    padding: 32px 16px 48px;
    row-gap: 24px;
  }

  .gs > :deep(.site-back) {
    margin: 0;
  }

  .gs__photo {
    width: 100%;
    max-width: none;
    height: auto;
  }

  .gs__copy p {
    max-width: none;
  }

  .gs__title {
    margin-bottom: 24px;
    font-size: clamp(40px, 12vw, 96px);
  }
}
</style>
