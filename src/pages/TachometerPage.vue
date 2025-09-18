<script setup lang="ts">
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import useCycplusDevice from '../composables/useCycplusDevice'
import ensureSupport from '../composables/useWebBluetoothSupport'
import TachometerGauge from '../components/TachometerGauge.vue'
import WinnerDialog from '../components/modals/WinnerDialog.vue'
import { WHEEL_OPTIONS, DEFAULT_WHEEL_CIRC } from '../constants/wheels'
import { addRace, type Lap, type RaceRecord } from '../services/localDb'
import { formatTime } from '../utils/time'
import { Notify } from 'quasar'

const DEV1_COLOR = '#e53935'
const DEV2_COLOR = '#1e88e5'

const wheelCircumference1 = ref<number>(DEFAULT_WHEEL_CIRC)
const wheelCircumference2 = ref<number>(DEFAULT_WHEEL_CIRC)

const rawFinish = ref<number>(200)
const finishMeters = computed({
  get: () => {
    const s = 50
    const v = Math.max(200, rawFinish.value)
    return Math.round(v / s) * s
  },
  set: (val: number) => { rawFinish.value = val }
})

const lapStepMeters = ref<number>(50)
const autoRestartEnabled = ref<boolean>(false)
const autoRestartSeconds = ref<number>(5)

const name1 = ref('Гонщик 1')
const name2 = ref('Гонщик 2')

const dev1 = useCycplusDevice({ wheelCircumference: wheelCircumference1, finishDistance: finishMeters })
const dev2 = useCycplusDevice({ wheelCircumference: wheelCircumference2, finishDistance: finishMeters })

const supportHint = computed(() => ensureSupport())

const raceElapsedMs = computed(() => Math.max(dev1.elapsedMs.value, dev2.elapsedMs.value))
const timeText = computed(() => formatTime(raceElapsedMs.value))

// const startSim = () => { dev1.startSim(40); dev2.startSim(35) }
// const stopSim  = () => { dev1.stopSim();    dev2.stopSim() }

async function connectOne(device: ReturnType<typeof useCycplusDevice>, displayName: string) {
  if (supportHint.value) {
    Notify.create({ type: 'negative', message: supportHint.value })
    return
  }
  const r = await device.connect()
  if (r === 'connected') {
    Notify.create({ type: 'positive', message: `${displayName} підключений` })
  } else if (r === 'cancelled') {
    Notify.create({ type: 'warning', message: `Підключення ${displayName} скасовано` })
  } else {
    Notify.create({ type: 'negative', message: `Помилка підключення ${displayName}` })
  }
}

const laps1 = ref<Lap[]>([])
const laps2 = ref<Lap[]>([])
let nextLap1 = 0
let nextLap2 = 0
function resetLaps() {
  laps1.value = []
  laps2.value = []
  nextLap1 = lapStepMeters.value
  nextLap2 = lapStepMeters.value
}
watch(lapStepMeters, resetLaps)

watch(() => dev1.distanceM.value, (dist) => {
  while (dist >= nextLap1) {
    laps1.value.push({ atMeters: nextLap1, atMs: dev1.elapsedMs.value })
    nextLap1 += lapStepMeters.value
  }
})
watch(() => dev2.distanceM.value, (dist) => {
  while (dist >= nextLap2) {
    laps2.value.push({ atMeters: nextLap2, atMs: dev2.elapsedMs.value })
    nextLap2 += lapStepMeters.value
  }
})

watch(finishMeters, () => {
  dev1.recalibrate()
  dev2.recalibrate()
  onFinishComputed()
})

const winner = ref<1 | 2 | 'tie' | null>(null)
const showWinner = ref(false)
const finishTime1 = ref<number | null>(null)
const finishTime2 = ref<number | null>(null)
let autoRestartTimer: number | null = null

function openWinnerDialog() {
  showWinner.value = true
  if (autoRestartEnabled.value) {
    if (autoRestartTimer) clearTimeout(autoRestartTimer)
    autoRestartTimer = window.setTimeout(() => {
      showWinner.value = false
      resetRace()
    }, Math.max(1, autoRestartSeconds.value) * 1000)
  }
}

function persistRace() {
  const record: RaceRecord = {
    id: crypto.randomUUID(),
    dateIso: new Date().toISOString(),
    finishMeters: finishMeters.value,
    runner1: { name: name1.value.trim() || 'Гонщик 1', color: DEV1_COLOR },
    runner2: { name: name2.value.trim() || 'Гонщик 2', color: DEV2_COLOR },
    winner: (winner.value ?? 'tie') as RaceRecord['winner'],
    time1: finishTime1.value,
    time2: finishTime2.value,
    laps1: laps1.value,
    laps2: laps2.value,
  }
  addRace(record)
}

function onFinishComputed() {
  if (winner.value) return
  const finish = finishMeters.value
  const d1 = dev1.distanceM.value
  const d2 = dev2.distanceM.value
  if (finishTime1.value == null && d1 >= finish) finishTime1.value = dev1.elapsedMs.value
  if (finishTime2.value == null && d2 >= finish) finishTime2.value = dev2.elapsedMs.value
  if (finishTime1.value == null || finishTime2.value == null) return
  const t1 = finishTime1.value
  const t2 = finishTime2.value
  const eps = 5
  winner.value = Math.abs(t1 - t2) <= eps ? 'tie' : (t1 < t2 ? 1 : 2)
  dev1.stopClock()
  dev2.stopClock()
  persistRace()
  openWinnerDialog()
}

watchEffect(onFinishComputed)

function resetRace() {
  dev1.reset()
  dev2.reset()
  resetLaps()
  winner.value = null
  finishTime1.value = null
  finishTime2.value = null
  if (autoRestartTimer) { clearTimeout(autoRestartTimer); autoRestartTimer = null }
}

onMounted(() => {
  resetLaps()
})
</script>

<template>
  <q-page class="flex column items-center justify-between q-px-md q-py-md">
    <div class="container col-grow flex column items-center justify-center">
      <q-banner v-if="supportHint" class="bg-negative text-white q-mb-md" dense rounded>
        {{ supportHint }}
      </q-banner>

      <q-card flat bordered class="q-pa-md q-pa-lg-md card">
        <div class="row items-center q-col-gutter-md q-mb-md">
          <div class="col-12 col-md-3">
            <q-input v-model="name1" :bg-color="null" :input-style="{ color: DEV1_COLOR }" dense outlined label="Ім’я суперника 1" />
          </div>
          <div class="col-12 col-md-3">
            <q-input v-model="name2" :bg-color="null" :input-style="{ color: DEV2_COLOR }" dense outlined label="Ім’я суперника 2" />
          </div>

          <div class="col-12 col-sm-6 col-md-3">
            <q-select
                v-model="wheelCircumference1"
                :options="WHEEL_OPTIONS"
                emit-value map-options
                label="Розмір колеса (1)"
                dense outlined standout="bg-grey-2"
                :option-label="o => o.label || `${o} м`"
            />
          </div>
          <div class="col-12 col-sm-6 col-md-3">
            <q-select
                v-model="wheelCircumference2"
                :options="WHEEL_OPTIONS"
                emit-value map-options
                label="Розмір колеса (2)"
                dense outlined standout="bg-grey-2"
                :option-label="o => o.label || `${o} м`"
            />
          </div>

          <div class="col-6 col-md-2">
            <q-input v-model.number="rawFinish" type="number" min="200" step="50" dense outlined label="Фініш" suffix="м" />
          </div>
          <div class="col-6 col-sm-auto">
            <q-btn
                color="primary"
                outline
                class="full-width"
                :label="`Підключити 1`"
                @click="connectOne(dev1, name1 || 'Гонщик 1')"
            />
          </div>
          <div class="col-6 col-sm-auto">
            <q-btn
                color="primary"
                outline
                class="full-width"
                :label="`Підключити 2`"
                @click="connectOne(dev2, name2 || 'Гонщик 2')"
            />
          </div>
        </div>
        <div class="row q-col-gutter-sm q-mб-md justify-center">

<!--          <div class="col-6 col-sm-auto"><q-btn color="positive" class="full-width" label="Старт симуляції" @click="startSim" /></div>-->
<!--          <div class="col-6 col-sm-auto"><q-btn color="negative" outline class="full-width" label="Стоп симуляції" @click="stopSim" /></div>-->
          <div class="col-6 col-sm-auto"><q-btn color="warning" outline class="full-width" label="Скинути гонку" @click="resetRace" /></div>
        </div>

        <q-separator spaced />

        <div class="column items-center q-gutter-md q-pt-sm">
          <div class="row items-center q-gutter-sm legend">
            <q-chip :style="{ backgroundColor: DEV1_COLOR, color: 'white' }" square>{{ name1 || 'Гонщик 1' }}</q-chip>
            <q-chip :style="{ backgroundColor: DEV2_COLOR, color: 'white' }" square>{{ name2 || 'Гонщик 2' }}</q-chip>
            <q-chip outline square>Фініш: {{ finishMeters }} м</q-chip>
          </div>

          <TachometerGauge
              :angle1="dev1.angle.value"
              :angle2="dev2.angle.value"
              :color1="DEV1_COLOR"
              :color2="DEV2_COLOR"
              :max-distance="finishMeters"
              :step="50"
          />

          <div class="row q-col-gutter-md text-center indicators">
            <div class="col-12 col-sm-6">
              <q-card flat bordered class="q-pa-md dev-card" :style="{ '--accent': DEV1_COLOR }">
                <div class="text-subtitle2 text-weight-medium q-mb-xs" :style="{ color: DEV1_COLOR }">{{ name1 || 'Гонщик 1' }}</div>
                <div class="text-body1">Швидкість: <b>{{ dev1.speedKmh.value.toFixed(1) }}</b> км/год</div>
                <div class="text-body1">Відстань: <b>{{ dev1.distanceM.value.toFixed(1) }}</b> м</div>
              </q-card>
            </div>

            <div class="col-12 col-sm-6">
              <q-card flat bordered class="q-pa-md dev-card" :style="{ '--accent': DEV2_COLOR }">
                <div class="text-subtitle2 text-weight-medium q-mб-xs" :style="{ color: DEV2_COLOR }">{{ name2 || 'Гонщик 2' }}</div>
                <div class="text-body1">Швидкість: <b>{{ dev2.speedKmh.value.toFixed(1) }}</b> км/год</div>
                <div class="text-body1">Відстань: <b>{{ dev2.distanceM.value.toFixed(1) }}</b> м</div>
              </q-card>
            </div>
          </div>

          <div class="text-caption text-grey-7">Час: {{ timeText }}</div>

          <div class="row q-col-gutter-sm q-mt-sm status-row">
            <div class="col-12 col-sm-6">
              <q-banner rounded dense class="q-pa-sm bg-grey-2">
                <b :style="{ color: DEV1_COLOR }">{{ name1 || 'Гонщик 1' }}:</b>
                {{ dev1.status.value || 'Очікування…' }}
              </q-banner>
            </div>
            <div class="col-12 col-sm-6">
              <q-banner rounded dense class="q-pa-sm bg-grey-2">
                <b :style="{ color: DEV2_COLOR }">{{ name2 || 'Гонщик 2' }}:</b>
                {{ dev2.status.value || 'Очікування…' }}
              </q-banner>
            </div>
          </div>
        </div>
      </q-card>
    </div>

    <WinnerDialog
        v-model="showWinner"
        :winner="winner"
        :finish-meters="finishMeters"
        :time1="finishTime1"
        :time2="finishTime2"
        :name1="name1 || 'Гонщик 1'"
        :name2="name2 || 'Гонщик 2'"
        :color1="DEV1_COLOR"
        :color2="DEV2_COLOR"
        @reset="resetRace"
    />
  </q-page>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 1100px;
  margin: 0 auto;
}
.card {
  border-radius: 16px;
  box-shadow: 0 4px 18px rgba(0,0,0,0.06);
}
.dev-card {
  border-radius: 12px;
  border: 2px solid var(--accent, #ccc) !important;
}
.legend {
  min-height: 32px;
}
</style>
