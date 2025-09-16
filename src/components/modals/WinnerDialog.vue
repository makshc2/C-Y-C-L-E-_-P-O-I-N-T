<script setup lang="ts">
import { computed } from 'vue'
import { formatTime } from '@/utils/time'

type Props = {
  modelValue: boolean
  winner: 1 | 2 | 'tie' | null
  finishMeters: number
  time1: number | null
  time2: number | null
  name1: string
  name2: string
  color1?: string
  color2?: string
}
const props = withDefaults(defineProps<Props>(), {
  color1: '#e53935',
  color2: '#1e88e5'
})

const emit = defineEmits<{
  (e: 'update:modelValue', v: boolean): void
  (e: 'reset'): void
}>()

const title = computed(() => props.winner === 'tie' ? 'Нічия!' : 'Переможець!')
const badgeColor = computed(() =>
    props.winner === 1 ? props.color1 :
        props.winner === 2 ? props.color2 : '#9e9e9e'
)
</script>

<template>
  <q-dialog
      :model-value="props.modelValue"
      @update:model-value="val => emit('update:modelValue', val)"
      persistent
  >
    <q-card style="min-width: 360px">
      <q-card-section class="row items-center q-gutter-sm">
        <q-avatar :style="{ backgroundColor: badgeColor, color: 'white' }" icon="emoji_events" />
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div v-if="props.winner === 'tie'" class="text-subtitle1">
          Обидва досягли фінішу майже одночасно 🎉
        </div>
        <div v-else class="text-subtitle1">
          {{ props.winner === 1 ? props.name1 : props.name2 }}
          першим досяг {{ props.finishMeters }} м 🎉
        </div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div class="text-body2">
          {{ props.name1 }}: <b>{{ formatTime(props.time1) }}</b>
          &nbsp;•&nbsp;
          {{ props.name2 }}: <b>{{ formatTime(props.time2) }}</b>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" @click="emit('update:modelValue', false)" />
        <q-btn unelevated color="warning" label="Скинути гонку" @click="emit('reset')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
