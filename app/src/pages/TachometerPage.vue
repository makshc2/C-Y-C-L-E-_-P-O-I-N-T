<script setup lang="ts">
import { ref, computed, watch, watchEffect, onMounted } from 'vue'
import useCycplusDevice from '@/composables/useCycplusDevice'
import ensureSupport from '@/composables/useWebBluetoothSupport'
import TachometerGauge from '@/components/TachometerGauge.vue'
import WinnerDialog from '@/components/modals/WinnerDialog.vue'
import { WHEEL_OPTIONS, DEFAULT_WHEEL_CIRC } from '@/constants/wheels'
import { addRace, type Lap, type RaceRecord } from '@/services/localDb'

const DEV1_COLOR = '#e53935'
const DEV2_COLOR = '#1e88e5'

const wheelCircumference = ref<number>(DEFAULT_WHEEL_CIRC)
const finishMeters = ref<number>(200)
const lapStepMeters = ref<number>(50)
const autoRestartEnabled = ref<boolean>(false)
const autoRestartSeconds = ref<number>(5)

const name1 = ref('Гонщик 1')
const name2 = ref('Гонщик 2')

const dev1 = useCycplusDevice({ wheelCircumference })
const dev2 = useCycplusDevice({ wheelCircumference })

const supportHint = computed(() => ensureSupport())

const timeText = computed(() => {
  const ms = Math.floor(dev1.elapsedMs.value)
  const m = Math.floor(ms / 60000)
  const s = Math.floor((ms % 60000) / 1000)
  return `${m} хв ${s} сек`
})

const startSim = () => { dev1.startSim(40); dev2.startSim(35) }
const stopSim  = () => { dev1.stopSim();    dev2.stopSim() }
const connectBoth = async () => { await Promise.allSettled([dev1.connect(), dev2.connect()]) }

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

  const d1 = dev1.distanceM.value
  const d2 = dev2.distanceM.value
  const justFinished1 = d1 >= finishMeters.value && finishTime1.value == null
  const justFinished2 = d2 >= finishMeters.value && finishTime2.value == null

  if (!justFinished1 && !justFinished2) return

  if (justFinished1) finishTime1.value = dev1.elapsedMs.value
  if (justFinished2) finishTime2.value = dev2.elapsedMs.value

  if (justFinished1 && justFinished2) {
    const t1 = finishTime1.value ?? 0
    const t2 = finishTime2.value ?? 0
    const eps = 5 // мс
    winner.value = Math.abs(t1 - t2) <= eps ? 'tie' : (t1 < t2 ? 1 : 2)
  } else {
    winner.value = justFinished1 ? 1 : 2
  }

  stopSim()
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
    <div class="container col-grow flex column items-center justify-center" >
      <div class="text-center q-mb-md">
        <div class="text-h5 text-weight-medium">Gold Race: Тахометр</div>
        <div class="text-subtitle2 text-grey-7">Підключення до CYCPLUS S3</div>
      </div>

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

          <div class="col-12 col-md-3">
            <q-select
                v-model="wheelCircumference"
                :options="WHEEL_OPTIONS"
                emit-value map-options
                label="Довжина кола (м)"
                dense outlined standout="bg-grey-2"
            />
          </div>

          <div class="col-6 col-md-2">
            <q-input v-model.number="finishMeters" type="number" min="50" step="10" dense outlined label="Фініш" suffix="м" />
          </div>
        </div>

        <div class="row q-col-gutter-sm q-mb-md justify-end">
          <div class="col-6 col-sm-auto"><q-btn color="primary" class="full-width" label="Підключити обидва" @click="connectBoth" /></div>
          <div class="col-6 col-sm-auto"><q-btn color="primary" outline class="full-width" label="Підключити 1" @click="dev1.connect" /></div>
          <div class="col-6 col-sm-auto"><q-btn color="primary" outline class="full-width" label="Підключити 2" @click="dev2.connect" /></div>
          <div class="col-6 col-sm-auto"><q-btn color="positive" class="full-width" label="Старт симуляції" @click="startSim" /></div>
          <div class="col-6 col-sm-auto"><q-btn color="negative" outline class="full-width" label="Стоп симуляції" @click="stopSim" /></div>
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
                <div class="text-subtitle2 text-weight-medium q-mb-xs" :style="{ color: DEV2_COLOR }">{{ name2 || 'Гонщик 2' }}</div>
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
