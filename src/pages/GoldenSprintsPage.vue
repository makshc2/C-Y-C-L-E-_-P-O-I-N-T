<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SiteBackLink from '@/components/site/SiteBackLink.vue'
import { goldenSprintsDetail } from '@/content/projects'
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
      <p
        v-for="(paragraph, index) in goldenSprintsDetail.body1"
        :key="index"
        class="gs__body1"
      >
        {{ paragraph }}
      </p>
    </div>
    <div class="gs__setup" style="grid-column: 1">
      <p class="gs__setup-heading">{{ goldenSprintsDetail.setup.heading }}</p>
      <ol class="gs__setup-steps">
        <li v-for="(step, index) in goldenSprintsDetail.setup.steps" :key="index">
          {{ step }}
        </li>
      </ol>
      <p>{{ goldenSprintsDetail.setup.note }}</p>
      <p class="gs__setup-heading">{{ goldenSprintsDetail.setup.whereHeading }}</p>
      <ul class="gs__setup-where">
        <li v-for="(item, index) in goldenSprintsDetail.setup.whereItems" :key="index">
          {{ item }}
        </li>
      </ul>
      <RouterLink class="gs__cta" to="/projects/golden-sprints/app">
        {{ goldenSprintsDetail.setup.cta }}
      </RouterLink>
    </div>
    <div class="gs__how" style="grid-column: 2">
      <p class="gs__how-heading">{{ goldenSprintsDetail.howItWorks.heading }}</p>
      <ul class="gs__how-steps">
        <li v-for="step in goldenSprintsDetail.howItWorks.steps" :key="step.title">
          <span class="gs__how-step-title">{{ step.title }}</span>
          <span class="gs__how-step-text">{{ step.text }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<style scoped>
.gs {
  display: grid;
  grid-template-columns: 645px minmax(0, 786px);
  grid-template-rows: max-content 1fr;
  align-content: start;
  column-gap: 0;
  padding: 34px 148px var(--section-pad-y) 145px;
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
  justify-self: start;
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
  margin: 0 0 63px;
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

.gs__copy .gs__body1 {
  margin-bottom: 2em;
}

.gs__setup,
.gs__how {
  margin-top: var(--section-pad-y);
  color: var(--color-green);
}

.gs__setup p,
.gs__how p,
.gs__setup li,
.gs__how li {
  margin: 0 0 1em;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-project-body);
  font-weight: var(--font-weight-regular);
  line-height: 1.35;
  color: var(--color-green);
}

.gs__setup ol,
.gs__setup ul,
.gs__how ul {
  margin: 0 0 1em;
  padding-left: 1.5em;
}

.gs__how-step-title,
.gs__how-step-text {
  display: block;
}

.gs__cta {
  display: inline-block;
  margin-top: 8px;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-body);
  font-weight: var(--font-weight-regular);
  line-height: 1.2;
  color: var(--color-green);
}

.gs__cta:focus-visible {
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

  .gs__copy p,
  .gs__setup p,
  .gs__how p,
  .gs__setup li,
  .gs__how li {
    max-width: none;
  }

  .gs__title {
    margin-bottom: 24px;
    font-size: clamp(40px, 12vw, 96px);
  }
}
</style>
