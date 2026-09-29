<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { homeCapsuleLabels } from '@/content/home'
import photoUrl from '@/assets/site/home-events-photo.png'
import blurPhotoUrl from '@/assets/site/home-events-blur.jpg'
</script>

<template>
  <RouterLink class="capsule" to="/events">
    <img class="capsule__photo" :src="photoUrl" alt="">
    <span class="capsule__blur" aria-hidden="true">
      <span class="capsule__blur-layer">
        <img class="capsule__blur-photo" :src="blurPhotoUrl" alt="">
      </span>
    </span>
    <span class="capsule__label">{{ homeCapsuleLabels.events }}</span>
  </RouterLink>
</template>

<style scoped>
.capsule {
  position: relative;
  display: block;
  width: var(--capsule-events-w);
  height: var(--section-h-home);
  overflow: hidden;
  flex-shrink: 0;
}

.capsule__photo {
  width: 100%;
  height: 100%;
  max-width: none;
  object-fit: cover;
}

.capsule__blur {
  position: absolute;
  left: 50%;
  bottom: 6px;
  width: var(--capsule-hover-w);
  height: var(--capsule-projects-hover-h);
  transform: translateX(-50%);
  overflow: hidden;
  border-radius: var(--radius-capsule);
  border: 0.5px solid rgb(255 255 255 / 0.2);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
}

.capsule__blur-layer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: inherit;
  opacity: var(--blur-capsule-hover-opacity);
  backdrop-filter: blur(var(--blur-projects));
  -webkit-backdrop-filter: blur(var(--blur-projects));
  pointer-events: none;
}

.capsule__blur-photo {
  position: absolute;
  left: -29.23%;
  top: -378.83%;
  width: 197.1%;
  height: 491.82%;
  max-width: none;
}

.capsule__label {
  position: absolute;
  left: 208px;
  top: 395px;
  z-index: 1;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-capsule);
  font-weight: var(--font-weight-bold);
  line-height: 41px;
  color: var(--color-accent-lime);
  text-shadow: var(--shadow-capsule-label);
  pointer-events: none;
  white-space: nowrap;
}

@media (hover: hover) {
  .capsule:hover .capsule__blur {
    opacity: 1;
    visibility: visible;
  }
}

.capsule:focus-visible .capsule__blur {
  opacity: 1;
  visibility: visible;
}

@media (prefers-reduced-motion: no-preference) {
  .capsule__blur {
    transition: opacity 0.28s ease, visibility 0.28s ease;
  }
}

@media (prefers-reduced-motion: reduce) {
  .capsule__blur {
    transition: none;
  }
}

.capsule:focus-visible {
  outline: 2px solid var(--color-fg);
  outline-offset: 2px;
}

@media (max-width: 767px) {
  .capsule {
    width: 100%;
    max-width: 100%;
    height: auto;
    flex-shrink: 1;
    aspect-ratio: 698 / 480;
  }

  .capsule__blur {
    width: min(var(--capsule-hover-w), 86%);
  }

  .capsule__label {
    left: 0;
    right: 0;
    top: auto;
    bottom: 0;
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: normal;
    text-align: center;
  }
}
</style>
