<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { readMoreLabel } from '@/content/projects'

defineProps<{
  photo: string
  photoAlt: string
  title: string
  to: string
}>()
</script>

<template>
  <article class="project-row">
    <img class="project-row__photo" :src="photo" :alt="photoAlt">
    <div class="project-row__body">
      <h2 class="project-row__title">{{ title }}</h2>
      <div class="project-row__content">
        <slot />
      </div>
      <RouterLink class="project-row__more" :to="to">{{ readMoreLabel }}</RouterLink>
    </div>
  </article>
</template>

<style scoped>
.project-row {
  display: grid;
  grid-template-columns: 178px minmax(0, 1fr);
  column-gap: 48px;
  align-items: start;
  padding: 77px var(--gutter) 40px;
  background-color: var(--color-green);
}

.project-row__photo {
  width: 178px;
  height: 235px;
  object-fit: cover;
}

.project-row__title {
  margin: 0 0 16px;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-project-title);
  font-weight: var(--font-weight-light);
  line-height: 1.15;
  color: var(--color-fg);
}

.project-row__content {
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-project-body);
  font-weight: var(--font-weight-regular);
  line-height: 1.3;
  color: var(--color-body-on-green);
}

.project-row__content :deep(ul) {
  margin: 0 0 16px;
  padding-left: 1.2em;
}

.project-row__content :deep(p) {
  margin: 0 0 16px;
}

.project-row__more {
  display: inline-block;
  margin-top: 8px;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-read-more);
  font-weight: var(--font-weight-light);
  line-height: 1.2;
  color: var(--color-fg);
}

.project-row__more:focus-visible {
  outline: 2px solid var(--color-fg);
  outline-offset: 2px;
}

@media (max-width: 767px) {
  .project-row {
    grid-template-columns: 1fr;
    padding: 32px 16px 40px;
    row-gap: 24px;
  }

  .project-row__photo {
    width: 100%;
    max-width: none;
    height: auto;
  }
}
</style>
