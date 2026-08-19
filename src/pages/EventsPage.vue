<script setup lang="ts">
import { EVENTS_INSTAGRAM_EMBED_SRC, EVENTS_INSTAGRAM_URL } from '@/constants/site'
import { eventsCopy } from '@/content/events'
import SitePagePreloader from '@/components/site/SitePagePreloader.vue'
import { useEmbedReady } from '@/composables/useEmbedReady'

const { ready, embedSrc, markReady } = useEmbedReady(EVENTS_INSTAGRAM_EMBED_SRC)
</script>

<template>
  <section class="events">
    <SitePagePreloader :show="!ready" />
    <h1 class="events__heading">
      <a
        class="events__heading-link"
        :href="EVENTS_INSTAGRAM_URL"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ eventsCopy.heading }}
      </a>
    </h1>
    <div class="events__embed">
      <iframe
        v-if="embedSrc"
        class="events__frame"
        :src="embedSrc"
        title="Instagram Cycle Point Kyiv"
        referrerpolicy="no-referrer-when-downgrade"
        @load="markReady"
      />
    </div>
  </section>
</template>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100dvh - var(--header-h));
  padding: 40px var(--gutter) 40px;
  background-color: var(--color-green);
  color: var(--color-fg);
}

.events__heading {
  margin: 0 0 16px;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-section-title);
  font-weight: var(--font-weight-light);
  line-height: 1.2;
}

.events__heading-link {
  color: inherit;
}

.events__heading-link:focus-visible {
  outline: 2px solid var(--color-fg);
  outline-offset: 2px;
}

.events__embed {
  position: relative;
  display: block;
  flex: 1 1 auto;
  width: 100%;
  min-height: 70vh;
}

.events__frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

@media (max-width: 1279px) {
  .events {
    padding: 32px 16px 48px;
  }
}
</style>
