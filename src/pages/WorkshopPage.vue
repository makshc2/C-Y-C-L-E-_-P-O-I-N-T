<script setup lang="ts">
import { INSTAGRAM_URL } from '@/constants/site'
import { workshopCopy } from '@/content/workshop'
</script>

<template>
  <section class="workshop">
    <h1 class="workshop__heading">{{ workshopCopy.heading }}</h1>
    <a
      class="workshop__url"
      :href="INSTAGRAM_URL"
      target="_blank"
      rel="noopener noreferrer"
    >
      {{ workshopCopy.instagramUrl }}
    </a>
    <p class="workshop__intro">{{ workshopCopy.servicesIntro }}</p>
    <p class="workshop__note">{{ workshopCopy.bookingNote }}</p>
    <p class="workshop__note">{{ workshopCopy.excelNote }}</p>
  </section>
</template>

<style scoped>
.workshop {
  display: flex;
  flex-direction: column;
  height: var(--section-h-home);
  padding: 142px var(--gutter) 40px;
  background-color: var(--color-green);
  color: var(--color-fg);
}

.workshop__heading,
.workshop__url,
.workshop__intro,
.workshop__note {
  margin: 0;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-section-title);
  font-weight: var(--font-weight-light);
  line-height: 1.2;
}

.workshop__url {
  margin-top: 95px;
  color: inherit;
  word-break: break-all;
}

.workshop__url:focus-visible {
  outline: 2px solid var(--color-fg);
  outline-offset: 2px;
}

.workshop__intro {
  margin-top: 26px;
}

.workshop__note {
  margin-top: 16px;
}

@media (max-width: 1727px) {
  .workshop {
    height: auto;
    padding: 32px 16px 48px;
  }

  .workshop__url {
    margin-top: 32px;
  }
}
</style>
