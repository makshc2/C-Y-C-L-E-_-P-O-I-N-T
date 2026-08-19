<script setup lang="ts">
import { shallowRef } from 'vue'
import { INSTAGRAM_URL } from '@/constants/site'
import { homeCapsuleLabels } from '@/content/home'
import photoUrl from '@/assets/site/home-events-photo.png'
import glassesUrl from '@/assets/site/deco-glasses.svg'

const hovered = shallowRef(false)
</script>

<template>
  <a
    class="capsule"
    :class="{ 'is-hovered': hovered }"
    :href="INSTAGRAM_URL"
    target="_blank"
    rel="noopener noreferrer"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <img class="capsule__photo" :src="photoUrl" alt="">
    <img class="capsule__glasses" :src="glassesUrl" alt="" aria-hidden="true">
    <span class="capsule__blur" />
    <span class="capsule__label">{{ homeCapsuleLabels.events }}</span>
  </a>
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

.capsule__glasses {
  position: absolute;
  top: 106px;
  left: 178px;
  width: 38px;
  height: 8px;
  transform: rotate(2.91deg);
  pointer-events: none;
}

.capsule__blur {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: var(--capsule-default-h);
  background-color: rgb(255 255 255 / var(--blur-events-opacity));
  backdrop-filter: blur(var(--blur-events));
  -webkit-backdrop-filter: blur(var(--blur-events));
}

.capsule.is-hovered .capsule__blur {
  left: 50%;
  width: var(--capsule-hover-w);
  height: var(--capsule-events-hover-h);
  transform: translateX(-50%);
  border-radius: var(--radius-capsule);
  border-width: 1.5px;
  border-style: solid;
  border-color: rgb(255 255 255 / 0.2);
  background-color: rgb(255 255 255 / var(--blur-capsule-hover-opacity));
  backdrop-filter: blur(var(--blur-events-hover));
  -webkit-backdrop-filter: blur(var(--blur-events-hover));
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

.capsule.is-hovered .capsule__label {
  left: 0;
  right: 0;
  top: auto;
  bottom: 0;
  height: var(--capsule-events-hover-h);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 40px;
}

@media (prefers-reduced-motion: no-preference) {
  .capsule__blur,
  .capsule__label {
    transition:
      width 0.28s ease,
      height 0.28s ease,
      left 0.28s ease,
      transform 0.28s ease,
      border-radius 0.28s ease,
      background-color 0.28s ease,
      font-size 0.28s ease;
  }
}

.capsule:focus-visible {
  outline: 2px solid var(--color-fg);
  outline-offset: 2px;
}

@media (max-width: 1727px) {
  .capsule {
    width: 100%;
    height: auto;
    aspect-ratio: 698 / 480;
  }

  .capsule__glasses {
    left: 26%;
    top: 22%;
    width: 5%;
    height: auto;
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
