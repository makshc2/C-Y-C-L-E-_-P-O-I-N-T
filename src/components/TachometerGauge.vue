<script setup lang="ts">
import { computed } from 'vue'

type Props = {
  angle1: number
  angle2?: number
  color1?: string
  color2?: string
  angleMin?: number
  angleMax?: number
  maxDistance?: number
  step?: number
  minorPerSegment?: number
}

const props = withDefaults(defineProps<Props>(), {
  color1: '#1e88e5',
  color2: '#e53935',
  angleMin: -120,
  angleMax: 120,
  maxDistance: 200,
  step: 50,
  minorPerSegment: 3
})

const size = 250
const cx = 100, cy = 100
const ringR = 95
const majorTickIn = 20
const majorTickOut = 14
const minorTickIn = 16
const minorTickOut = 14
const labelR = ringR - (majorTickIn + 12)

const clamp = (v:number,a:number,b:number)=>Math.max(a,Math.min(b,v))
const lerp  = (a:number,b:number,t:number)=>a+(b-a)*t
const rad   = (d:number)=>d*Math.PI/180
function tachDegToXY(deg:number, r:number){
  const a = rad(deg - 90)
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) }
}

const displayMax = computed(() => {
  const s = Math.max(1, props.step)
  const base = Math.max(200, props.maxDistance)
  return Math.ceil(base / s) * s
})

const majorValues = computed(() => {
  const vals:number[] = []
  for (let v = 0; v <= displayMax.value; v += Math.max(1, props.step)) vals.push(v)
  return vals
})

const valueToDeg = (v:number) =>
    lerp(props.angleMin, props.angleMax, v / displayMax.value)

const majorTicks = computed(() =>
    majorValues.value.map(v => {
      const deg = valueToDeg(v)
      const p1 = tachDegToXY(deg, ringR - majorTickOut)
      const p2 = tachDegToXY(deg, ringR - majorTickIn)
      const lbl = tachDegToXY(deg, labelR)
      return { v, deg, p1, p2, lbl }
    })
)

const minorTicks = computed(() => {
  const res:{p1:{x:number,y:number}, p2:{x:number,y:number}}[] = []
  const m = Math.max(0, props.minorPerSegment)
  if (!m) return res
  for (let i = 0; i < majorValues.value.length - 1; i++) {
    const vFrom = majorValues.value[i]
    const vTo   = majorValues.value[i + 1]
    for (let k = 1; k <= m; k++) {
      const v = lerp(vFrom, vTo, k / (m + 1))
      const deg = valueToDeg(v)
      const p1 = tachDegToXY(deg, ringR - minorTickOut)
      const p2 = tachDegToXY(deg, ringR - minorTickIn)
      res.push({ p1, p2 })
    }
  }
  return res
})

const n1 = computed(() => `rotate(${clamp(props.angle1, props.angleMin, props.angleMax)} ${cx} ${cy})`)
const n2 = computed(() =>
    props.angle2 === undefined ? undefined :
        `rotate(${clamp(props.angle2, props.angleMin, props.angleMax)} ${cx} ${cy})`
)
</script>

<template>
  <div class="tachometer">
    <svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" aria-label="Tachometer">
      <circle :cx="cx" :cy="cy" :r="ringR" stroke="#cfcfcf" stroke-width="6" fill="none" />

      <g stroke="#000" stroke-width="2">
        <line
            v-for="t in majorTicks" :key="'maj-'+t.v"
            :x1="t.p1.x" :y1="t.p1.y" :x2="t.p2.x" :y2="t.p2.y"
        />
      </g>

      <g stroke="#888" stroke-width="1">
        <line
            v-for="(t, i) in minorTicks" :key="'min-'+i"
            :x1="t.p1.x" :y1="t.p1.y" :x2="t.p2.x" :y2="t.p2.y"
        />
      </g>

      <g font-size="7" text-anchor="middle" fill="#222">
        <text v-for="t in majorTicks" :key="'lbl-'+t.v" :x="t.lbl.x" :y="t.lbl.y">
          {{ t.v }}
        </text>
      </g>

      <line x1="100" y1="100" x2="100" y2="28" :transform="n1" :stroke="color1" stroke-width="4" />
      <line v-if="n2" x1="100" y1="100" x2="100" y2="28" :transform="n2" :stroke="color2" stroke-width="4" />
    </svg>
  </div>
</template>

<style scoped>
.tachometer {
  width: 100%;
  max-width: 350px;
  aspect-ratio: 1/1;
  display: grid;
  place-items: center;
}
svg {
  width: 100%;
  height: auto;
  display: block;
}
</style>
