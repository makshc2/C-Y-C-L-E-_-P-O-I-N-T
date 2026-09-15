<script setup lang="ts">
import { CHARITY_RESULTS_SHEET_SRC } from '@/constants/site'
import { armySupportCopy } from '@/content/armySupport'
import SiteBackLink from '@/components/site/SiteBackLink.vue'
import SitePagePreloader from '@/components/site/SitePagePreloader.vue'
import { useEmbedReady } from '@/composables/useEmbedReady'

const { ready, embedSrc, markReady } = useEmbedReady(CHARITY_RESULTS_SHEET_SRC)
</script>

<template>
  <section class="army">
    <SitePagePreloader :show="!ready" />
    <SiteBackLink tone="lime" />
    <h1 class="army__heading">{{ armySupportCopy.heading }}</h1>
    <div class="army__sheet">
      <iframe
        v-if="embedSrc"
        class="army__sheet-frame"
        :src="embedSrc"
        :title="armySupportCopy.heading"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
        @load="markReady"
      />
    </div>
  </section>
</template>

<style scoped>
.army {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  min-height: var(--army-stripe-h);
  padding: 34px var(--gutter) var(--section-pad-y);
  background-color: var(--color-green);
  color: var(--color-fg);
}

.army :deep(.site-back) {
  margin: 0 0 54px;
}

.army__heading {
  margin: 0;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-section-title);
  font-weight: var(--font-weight-light);
  line-height: 1.2;
}

.army__sheet {
  position: relative;
  display: block;
  width: 100%;
  min-height: 70vh;
  margin-top: var(--section-pad-y);
  margin-left: var(--content-indent);
}

.army__sheet-frame {
  position: absolute;
  inset: 0;
  width: var(--sheet-w);
  height: 100%;
  border: 0;
}

@media (max-width: 1279px) {
  .army {
    padding: 32px 16px 48px;
  }

  .army__sheet {
    margin-left: 0;
  }
}
</style>
