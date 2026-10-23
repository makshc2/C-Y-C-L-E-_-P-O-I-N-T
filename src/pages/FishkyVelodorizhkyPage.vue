<script setup lang="ts">
import { computed, onUnmounted } from 'vue'
import SiteBackLink from '@/components/site/SiteBackLink.vue'
import { useFishkyMapOpen } from '@/composables/useFishkyMapOpen'
import { fishkyVelodorizhky } from '@/content/fishkyVelodorizhky'
import photoUrl from '@/assets/site/fishky-map.png'

const { open, toggle, close } = useFishkyMapOpen()
const lead = computed(() => fishkyVelodorizhky.paragraphs[0])
const body = computed(() => fishkyVelodorizhky.paragraphs.slice(1))
const mapLabel = computed(() => (
  open.value ? 'Згорнути мапу' : 'Відкрити мапу на всю сторінку'
))

onUnmounted(close)
</script>

<template>
  <section
    class="fishky"
    :class="{ 'fishky--open': open }"
  >
    <SiteBackLink tone="violet" />
    <h1
      v-if="!open"
      class="fishky__title"
    >
      {{ fishkyVelodorizhky.title }}
    </h1>
    <p
      v-if="!open"
      class="fishky__lead"
    >
      {{ lead }}
    </p>
    <button
      type="button"
      class="fishky__photo-btn"
      :aria-expanded="open"
      :aria-label="mapLabel"
      @click="toggle"
    >
      <img
        class="fishky__photo"
        :src="photoUrl"
        width="1430"
        height="1233"
        alt="Мапа Києва — Фішки велодоріжки"
      >
    </button>
    <div
      v-if="!open"
      class="fishky__body"
    >
      <p
        v-for="(paragraph, index) in body"
        :key="index"
      >
        {{ paragraph }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.fishky {
  display: grid;
  grid-template-columns: var(--fishky-photo-w) minmax(0, 786px);
  column-gap: 138px;
  align-content: start;
  min-height: 975px;
  padding: 34px 149px 64px;
  background-color: var(--color-violet);
}

.fishky--open {
  grid-template-columns: minmax(0, var(--fishky-map-w));
  column-gap: 0;
  min-height: 1481px;
}

.fishky > :deep(.site-back) {
  grid-column: 1 / -1;
  justify-self: start;
  margin: 0 0 54px;
}

.fishky--open > :deep(.site-back) {
  margin-bottom: 42px;
}

.fishky__title,
.fishky__lead,
.fishky__body {
  font-family: Helvetica, var(--font-sans);
  color: var(--color-green);
}

.fishky__title {
  grid-column: 1 / -1;
  margin: 0 0 61px;
  font-size: var(--text-h1-display);
  font-weight: var(--font-weight-light);
  line-height: 1.15;
  text-align: center;
}

.fishky__lead {
  grid-column: 1 / -1;
  margin: 0 0 61px;
  font-size: var(--text-fishky-lead);
  font-weight: var(--font-weight-regular);
  line-height: 1.15;
  text-align: center;
}

.fishky__photo-btn {
  grid-column: 1;
  align-self: start;
  justify-self: start;
  width: var(--fishky-photo-w);
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  cursor: pointer;
}

.fishky__photo-btn:focus-visible {
  outline: 2px solid var(--color-green);
  outline-offset: 4px;
}

.fishky--open .fishky__photo-btn {
  width: min(100%, var(--fishky-map-w));
}

.fishky__photo {
  display: block;
  width: 100%;
  height: auto;
  aspect-ratio: 507 / 437;
  object-fit: cover;
}

.fishky--open .fishky__photo {
  aspect-ratio: 1430 / 1233;
}

.fishky__body {
  grid-column: 2;
  align-self: start;
}

.fishky__body p {
  margin: 0 0 1em;
  font-family: Helvetica, var(--font-sans);
  font-size: var(--text-body);
  font-weight: var(--font-weight-regular);
  line-height: 1.15;
  color: var(--color-green);
}

@media (max-width: 767px) {
  .fishky,
  .fishky--open {
    display: flex;
    flex-direction: column;
    min-height: 0;
    padding: 32px 16px 48px;
    row-gap: 24px;
  }

  .fishky > :deep(.site-back),
  .fishky--open > :deep(.site-back) {
    margin: 0;
  }

  .fishky__title,
  .fishky__lead {
    margin-bottom: 0;
  }

  .fishky__title {
    font-size: clamp(40px, 12vw, 96px);
  }

  .fishky__lead {
    font-size: 20px;
  }

  .fishky__photo-btn,
  .fishky--open .fishky__photo-btn {
    width: 100%;
  }
}

@media (min-width: 768px) and (max-width: 1376px) {
  .fishky {
    grid-template-columns: minmax(180px, 36%) minmax(0, 1fr);
    column-gap: 32px;
    min-height: 0;
    padding: 32px 40px 64px;
  }

  .fishky--open {
    grid-template-columns: minmax(0, 1fr);
    min-height: 0;
  }

  .fishky > :deep(.site-back) {
    margin-bottom: 28px;
  }

  .fishky__title {
    margin-bottom: 28px;
    font-size: clamp(40px, 5vw, 72px);
  }

  .fishky__lead {
    margin-bottom: 28px;
    font-size: 24px;
  }

  .fishky__photo-btn,
  .fishky--open .fishky__photo-btn {
    width: 100%;
  }
}
</style>
