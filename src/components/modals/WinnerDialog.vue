<script setup lang="ts">
import { computed } from 'vue'

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

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <q-dialog :model-value="modelValue" @update:model-value="v => emit('update:modelValue', v)" persistent>
    <q-card style="min-width: 360px">
      <q-card-section class="row items-center q-gutter-sm">
        <q-avatar :style="{ backgroundColor: badgeColor, color: 'white' }" icon="emoji_events" />
        <div class="text-h6">{{ title }}</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <div v-if="winner === 'tie'" class="text-subtitle1">
          Обидва досягли фінішу майже одночасно 🎉
        </div>
        <div v-else class="text-subtitle1">
          {{ winner === 1 ? name1 : name2 }} першим досяг {{ finishMeters }} м 🎉
        </div>

        <div class="text-body2 q-mt-sm">
          {{ name1 }}: <b>{{ time1 ?? '—' }}</b> мс &nbsp;•&nbsp;
          {{ name2 }}: <b>{{ time2 ?? '—' }}</b> мс
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" @click="close" />
        <q-btn unelevated color="warning" label="Скинути гонку" @click="$emit('reset')" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
