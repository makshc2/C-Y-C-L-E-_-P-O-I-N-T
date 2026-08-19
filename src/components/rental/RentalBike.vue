<script setup lang="ts">
defineProps<{
  photo: string
  name: string
  specs: readonly string[]
}>()
</script>

<template>
  <article class="rental-bike">
    <img class="rental-bike__photo" :src="photo" :alt="name">
    <div class="rental-bike__copy">
      <h2 class="rental-bike__name">{{ name }}</h2>
      <p v-for="spec in specs" :key="spec" class="rental-bike__spec">{{ spec }}</p>
    </div>
  </article>
</template>

<style scoped>
.rental-bike {
  display: grid;
  grid-template-columns: var(--rental-photo-w) minmax(0, 1fr);
  column-gap: 79px;
  align-items: start;
  padding: 0 var(--gutter);
}

.rental-bike__photo {
  width: var(--rental-photo-w);
  height: var(--rental-photo-h);
  object-fit: cover;
}

.rental-bike__name {
  margin: 0 0 16px;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-rental-name);
  font-weight: var(--font-weight-light);
  line-height: 1.1;
  color: var(--color-green);
}

.rental-bike__spec {
  margin: 0 0 4px;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-rental-spec);
  font-weight: var(--font-weight-light);
  line-height: 1.2;
  color: var(--color-green);
}

@media (max-width: 767px) {
  .rental-bike {
    grid-template-columns: 1fr;
    row-gap: 16px;
    padding: 0 16px;
  }

  .rental-bike__photo {
    width: 100%;
    height: auto;
  }
}
</style>
