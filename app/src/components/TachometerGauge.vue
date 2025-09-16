<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  angle1: number
  angle2?: number
  color1?: string
  color2?: string
  angleMin?: number
  angleMax?: number
  labels?: { left: string; midLeft: string; mid: string; midRight: string; right: string }
}

const props = withDefaults(defineProps<Props>(), {
  color1: 'red',
  color2: 'blue',
  angleMin: -120,
  angleMax: 120,
  labels: () => ({
    left: '200',
    midLeft: '50',
    mid: '100',
    midRight: '150',
    right: '0',
  }),
})

const needle1Transform = computed(() => `rotate(${props.angle1} 100 100)`)
const needle2Transform = computed(() =>
    props.angle2 !== undefined ? `rotate(${props.angle2} 100 100)` : undefined
)
</script>

<template>
  <div class="tachometer">
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" aria-label="Tachometer">

      <circle cx="100" cy="100" r="90" stroke="#ccc" stroke-width="4" fill="none" />

      <g stroke="black">
        <line x1="100" y1="10" x2="100" y2="20" :transform="`rotate(${angleMin} 100 100)`" />
        <line x1="100" y1="10" x2="100" y2="20" :transform="`rotate(${(angleMin+angleMax)/2 - 60} 100 100)`" />
        <line x1="100" y1="10" x2="100" y2="20" transform="rotate(0 100 100)" />
        <line x1="100" y1="10" x2="100" y2="20" :transform="`rotate(${60} 100 100)`" />
        <line x1="100" y1="10" x2="100" y2="20" :transform="`rotate(${angleMax} 100 100)`" />
      </g>

      <g font-size="10" text-anchor="middle">
        <text x="40" y="115" :transform="`rotate(${angleMin} 100 100)`">{{ labels.left }}</text>
        <text x="65" y="55" :transform="`rotate(-30 100 100)`">{{ labels.midLeft }}</text>
        <text x="100" y="40" transform="rotate(0 100 100)">{{ labels.mid }}</text>
        <text x="135" y="55" :transform="`rotate(30 100 100)`">{{ labels.midRight }}</text>
        <text x="160" y="115" :transform="`rotate(${angleMax} 100 100)`">{{ labels.right }}</text>
      </g>

      <line x1="100" y1="100" x2="100" y2="20" :transform="needle1Transform" :stroke="color1" stroke-width="4" />
      <line
          v-if="needle2Transform"
          x1="100"
          y1="100"
          x2="100"
          y2="20"
          :transform="needle2Transform"
          :stroke="color2"
          stroke-width="4"
      />
    </svg>
  </div>
</template>

<style scoped>
.tachometer {
  width: 100%;
  max-width: 300px;
  aspect-ratio: 1 / 1;
  display: grid;
  place-items: center;
}
svg {
  width: 100%;
  height: auto;
  display: block;
}
@media (max-width: 360px) {
  .tachometer { max-width: 300px; }
}
</style>
