<script setup lang="ts">
import { shallowRef } from 'vue'
import { RouterLink } from 'vue-router'
import { homeCapsuleLabels } from '@/content/home'
import photoUrl from '@/assets/site/home-projects-photo.png'

const hovered = shallowRef(false)
const left = shallowRef(false)

function onEnter() {
  hovered.value = true
}

function onLeave() {
  hovered.value = false
  left.value = true
}
</script>

<template>
  <RouterLink
    class="capsule"
    :class="{ 'is-hovered': hovered, 'is-left': left && !hovered }"
    to="/projects"
    @mouseenter="onEnter"
    @mouseleave="onLeave"
  >
    <img class="capsule__photo" :src="photoUrl" alt="">
    <span class="capsule__blur" />
    <span class="capsule__label">{{ homeCapsuleLabels.projects }}</span>
  </RouterLink>
</template>

<style scoped>
.capsule {
  position: relative;
  display: block;
  width: var(--capsule-projects-w);
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
  left: 0;
  bottom: 0;
  width: 100%;
  height: var(--capsule-default-h);
  background-color: rgb(255 255 255 / var(--blur-projects-opacity));
  backdrop-filter: blur(var(--blur-projects));
  -webkit-backdrop-filter: blur(var(--blur-projects));
}

.capsule.is-hovered .capsule__blur {
  left: 50%;
  width: var(--capsule-hover-w);
  height: var(--capsule-projects-hover-h);
  transform: translateX(-50%);
  border-radius: var(--radius-capsule);
  border-width: 1.5px;
  border-style: solid;
  border-color: rgb(255 255 255 / 0.2);
  background-color: rgb(255 255 255 / var(--blur-capsule-hover-opacity));
  backdrop-filter: blur(var(--blur-projects));
  -webkit-backdrop-filter: blur(var(--blur-projects));
}

.capsule.is-left .capsule__blur {
  opacity: 0;
  visibility: hidden;
}

.capsule__label {
  position: absolute;
  left: 273px;
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
  height: var(--capsule-projects-hover-h);
  display: flex;
  align-items: center;
  justify-content: center;
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
      opacity 0.28s ease;
  }
}

@media (prefers-reduced-motion: reduce) {
  .capsule__blur,
  .capsule__label {
    transition: none;
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
    aspect-ratio: 699 / 480;
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
