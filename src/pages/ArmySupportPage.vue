<script setup lang="ts">
import { CHARITY_RESULTS_SHEET_SRC } from '@/constants/site'
import { armySupportCopy } from '@/content/armySupport'
</script>

<template>
  <section class="army">
    <h1 class="army__heading">{{ armySupportCopy.heading }}</h1>
    <div class="army__sheet">
      <iframe
        class="army__sheet-frame"
        :src="CHARITY_RESULTS_SHEET_SRC"
        title="Результати благодійності Cycle Point"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
        allowfullscreen
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
  padding: 142px var(--gutter) 40px;
  background-color: var(--color-green);
  color: var(--color-fg);
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
  margin-top: 16px;
}

.army__sheet-frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}

@media (max-width: 1727px) {
  .army {
    padding: 32px 16px 48px;
  }
}
</style>
