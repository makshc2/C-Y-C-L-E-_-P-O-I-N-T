<script setup lang="ts">
import { VENUE, getVenueEmbedSrc } from '@/constants/site'

const embedSrc = getVenueEmbedSrc()
</script>

<template>
  <div class="home-map">
    <iframe
      class="home-map__frame"
      :src="embedSrc"
      :title="`Мапа ${VENUE.name}, ${VENUE.address}`"
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
      allowfullscreen
    />
  </div>
</template>

<style scoped>
.home-map {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
  min-height: 240px;
  background-color: #e8e4dc;
}

.home-map__frame {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
