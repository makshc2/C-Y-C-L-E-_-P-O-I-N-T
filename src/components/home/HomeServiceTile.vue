<script setup lang="ts">
import { RouterLink } from 'vue-router'

defineProps<{
  to: string
  icon: string
  label: string
}>()
</script>

<template>
  <RouterLink class="tile" :to="to">
    <img class="tile__icon" :src="icon" :alt="label">
    <span class="tile__label">{{ label }}</span>
  </RouterLink>
</template>

<style scoped>
.tile {
  position: relative;
  display: block;
}

.tile__icon {
  position: absolute;
  object-fit: contain;
}

.tile__label {
  position: absolute;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-icon-label);
  font-weight: var(--font-weight-bold);
  line-height: 41px;
  color: var(--color-fg);
  white-space: nowrap;
}

.tile:focus-visible {
  outline: 2px solid var(--color-fg);
  outline-offset: 2px;
}

@media (min-width: 1728px) {
  .tile {
    position: absolute;
  }
}

@media (max-width: 767px) {
  .tile {
    position: relative;
    left: auto;
    top: auto;
    width: 100%;
    height: auto;
    min-height: 0;
    padding: 32px 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .tile__icon {
    position: static;
    width: min(var(--icon-glyph), 40vw);
    height: auto;
  }

  .tile__label {
    position: static;
    margin-top: 24px;
    white-space: normal;
    text-align: center;
  }
}
</style>
