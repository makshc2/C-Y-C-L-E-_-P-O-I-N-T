<script setup lang="ts">
defineProps<{
  id: string
  photo: string
  text: string
  tone: 'green' | 'tiffany'
}>()
</script>

<template>
  <article
    :id="id"
    class="artifact-row"
    :class="`artifact-row--${tone}`"
    tabindex="-1"
  >
    <img class="artifact-row__photo" :src="photo" alt="">
    <p class="artifact-row__text">{{ text }}</p>
  </article>
</template>

<style scoped>
.artifact-row {
  display: grid;
  grid-template-columns: var(--artifact-photo-w) minmax(0, 840px);
  column-gap: 191px;
  align-items: start;
  min-height: var(--artifact-row-h);
  padding: 116px var(--gutter) 116px;
}

.artifact-row--green {
  background-color: var(--color-green);
}

.artifact-row--tiffany {
  background-color: var(--color-tiffany);
}

.artifact-row__photo {
  width: var(--artifact-photo-w);
  height: var(--artifact-photo-h);
  object-fit: cover;
}

.artifact-row__text {
  margin: 0;
  max-width: 840px;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-body);
  font-weight: var(--font-weight-regular);
  line-height: 1.35;
  color: var(--color-fg);
  white-space: pre-line;
}

@media (max-width: 1727px) {
  .artifact-row {
    grid-template-columns: 1fr;
    min-height: 0;
    padding: 32px 16px 48px;
    row-gap: 24px;
  }

  .artifact-row__photo {
    width: min(var(--artifact-photo-w), 100%);
    height: auto;
  }
}
</style>
