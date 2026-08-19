<script setup lang="ts">
import RentalBike from '@/components/rental/RentalBike.vue'
import { rentalBikes, rentalIntro } from '@/content/rental'
import trekPhoto from '@/assets/site/rental-trek.png'
import cannondalePhoto from '@/assets/site/rental-cannondale.png'
import vanmoofPhoto from '@/assets/site/rental-vanmoof.png'
import cyclepointPhoto from '@/assets/site/rental-cyclepoint-bike.png'
import cudaPhoto from '@/assets/site/rental-cuda-atom.png'

const photos = {
  trek: trekPhoto,
  cannondale: cannondalePhoto,
  vanmoof: vanmoofPhoto,
  cyclepoint: cyclepointPhoto,
  cuda: cudaPhoto,
} as const

const catalog = rentalBikes.map((bike) => ({
  ...bike,
  photo: photos[bike.id as keyof typeof photos],
}))
</script>

<template>
  <div class="rental">
    <section class="rental-intro">
      <h1 class="rental-intro__heading">{{ rentalIntro.heading }}</h1>
      <div class="rental-intro__body">
        <p v-for="(paragraph, index) in rentalIntro.paragraphs" :key="index">{{ paragraph }}</p>
        <p>{{ rentalIntro.termsTitle }}</p>
        <ul>
          <li v-for="term in rentalIntro.terms" :key="term">{{ term }}</li>
        </ul>
        <p>{{ rentalIntro.cta }}</p>
      </div>
    </section>
    <section class="rental-list" aria-label="Каталог прокату">
      <RentalBike
        v-for="bike in catalog"
        :key="bike.id"
        :photo="bike.photo"
        :name="bike.name"
        :specs="bike.specs"
      />
    </section>
  </div>
</template>

<style scoped>
.rental-intro {
  min-height: 858px;
  padding: 142px var(--gutter) 80px;
  background-color: var(--color-tiffany);
}

.rental-intro__heading {
  margin: 0 0 48px;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-section-title);
  font-weight: var(--font-weight-light);
  line-height: 1.2;
  color: var(--color-fg);
}

.rental-intro__body {
  max-width: 914px;
  margin-left: 517px;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-body);
  font-weight: var(--font-weight-regular);
  line-height: 1.3;
  color: var(--color-fg);
}

.rental-intro__body p {
  margin: 0 0 1em;
}

.rental-intro__body ul {
  margin: 0 0 1em;
  padding-left: 1.2em;
}

.rental-list {
  display: flex;
  flex-direction: column;
  gap: var(--rental-row-gap);
  padding: var(--rental-row-gap) 0;
  background-color: var(--color-violet);
}

@media (max-width: 1727px) {
  .rental-intro {
    min-height: 0;
    padding: 32px 16px 48px;
  }

  .rental-intro__body {
    margin-left: 0;
    max-width: none;
  }

  .rental-list {
    gap: 48px;
    padding: 48px 0;
  }
}
</style>
