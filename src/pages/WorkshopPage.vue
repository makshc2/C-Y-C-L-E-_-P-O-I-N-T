<script setup lang="ts">
import { INSTAGRAM_URL, WORKSHOP_PRICE_SHEET_SRC } from '@/constants/site'
import { workshopCopy } from '@/content/workshop'
import SitePagePreloader from '@/components/site/SitePagePreloader.vue'
import { useEmbedReady } from '@/composables/useEmbedReady'
import instagramIcon from '@/assets/site/icon-instagram.svg'

const { ready, embedSrc, markReady } = useEmbedReady(WORKSHOP_PRICE_SHEET_SRC)
</script>

<template>
  <section class="workshop">
    <SitePagePreloader :show="!ready" />
    <h1 class="workshop__heading">{{ workshopCopy.heading }}</h1>
    <a
      class="workshop__contact"
      :href="INSTAGRAM_URL"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        class="workshop__ig"
        :src="instagramIcon"
        width="50"
        height="50"
        alt=""
      >
      <span>{{ workshopCopy.instagramContact }}</span>
    </a>
    <div class="workshop__sheet">
      <iframe
        v-if="embedSrc"
        class="workshop__sheet-frame"
        :src="embedSrc"
        title="Прейскурант послуг майстерні Cycle Point"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
        @load="markReady"
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

.workshop__heading {
  margin: 0;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-section-title);
  font-weight: var(--font-weight-light);
  line-height: 1.2;
}

.workshop__contact {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0;
  color: inherit;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-contact-title);
  font-weight: var(--font-weight-light);
  line-height: 1.2;
}

.workshop__ig {
  width: var(--ig-icon);
  height: var(--ig-icon);
  flex-shrink: 0;
}

.workshop__contact:focus-visible {
  outline: 2px solid var(--color-fg);
  outline-offset: 2px;
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

@media (max-width: 1279px) {
  .workshop {
    height: auto;
    padding: 32px 16px 48px;
  }

  .workshop__contact {
    margin-top: 32px;
  }
}

@media (max-width: 767px) {
  .workshop {
    padding-inline: 0;
  }

  .workshop__heading,
  .workshop__contact {
    padding-inline: 16px;
  }

  .workshop__sheet {
    width: 100%;
    margin-top: 16px;
  }

  .workshop__sheet-frame {
    width: 100%;
  }
}
</style>
