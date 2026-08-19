<script setup lang="ts">
import { INSTAGRAM_URL, WORKSHOP_PRICE_SHEET_SRC } from '@/constants/site'
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
      {{ workshopCopy.instagramLabel }}
    </a>
    <p class="workshop__intro">{{ workshopCopy.servicesIntro }}</p>
    <div class="workshop__sheet">
      <iframe
        class="workshop__sheet-frame"
        :src="WORKSHOP_PRICE_SHEET_SRC"
        title="Прейскурант послуг майстерні Cycle Point"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
      />
    </div>
  </section>
</template>

<style scoped>
.workshop {
  display: flex;
  flex-direction: column;
  height: auto;
  min-height: var(--section-h-home);
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
  color: inherit;
  word-break: break-all;
}

.workshop__url:focus-visible {
  outline: 2px solid var(--color-fg);
  outline-offset: 2px;
}

.workshop__note {
  margin-top: 16px;
}

.workshop__sheet {
  position: relative;
  display: block;
  width: 100%;
  min-height: 70vh;
  margin-top: 16px;
}

.workshop__sheet-frame {
  position: absolute;
  inset: 0;
  width: 60%;
  height: 100%;
  border: 0;
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
