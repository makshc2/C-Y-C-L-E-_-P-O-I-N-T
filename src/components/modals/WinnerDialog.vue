<script setup lang="ts">
import { computed } from 'vue'
import { formatTime } from '../../utils/time'

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
  >
    <q-card class="winner-dialog" style="min-width: 400px; max-width: 500px">
      <q-card-section class="winner-header" :style="{ background: `linear-gradient(135deg, ${badgeColor}, ${badgeColor}dd)` }">
        <div class="row items-center q-gutter-md">
          <div class="trophy-icon-wrapper">
            <q-icon name="emoji_events" size="48px" color="white" />
          </div>
          <div>
            <div class="text-h4 text-white text-weight-bold">{{ title }}</div>
            <div class="text-subtitle2 text-white" style="opacity: 0.9">
              <q-icon name="flag" class="q-mr-xs" />
              Фініш: {{ props.finishMeters }} м
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-section class="winner-content">
        <div v-if="props.winner === 'tie'" class="winner-message tie-message">
          <q-icon name="balance" size="48px" color="orange" />
          <div class="text-h6 q-mt-md">Обидва досягли фінішу майже одночасно! 🎉</div>
        </div>
        <div v-else class="winner-message">
          <q-icon name="emoji_events" size="48px" :color="badgeColor" />
          <div class="text-h6 q-mt-md">
            <span :style="{ color: badgeColor, fontWeight: 'bold' }">
              {{ props.winner === 1 ? props.name1 : props.name2 }}
            </span>
            першим досяг {{ props.finishMeters }} м! 🎉
          </div>
        </div>

        <div class="results-section q-mt-lg">
          <div v-if="props.winner === 'tie'" class="result-item" :style="{ borderLeft: `4px solid ${props.color1}` }">
            <div class="result-header">
              <q-icon name="directions_bike" :color="props.color1" />
              <span class="result-name">{{ props.name1 }}</span>
            </div>
            <div class="result-time">{{ formatTime(props.time1) }}</div>
          </div>
          <div v-if="props.winner === 'tie'" class="result-item" :style="{ borderLeft: `4px solid ${props.color2}` }">
            <div class="result-header">
              <q-icon name="directions_bike" :color="props.color2" />
              <span class="result-name">{{ props.name2 }}</span>
            </div>
            <div class="result-time">{{ formatTime(props.time2) }}</div>
          </div>
          
          <div v-else class="results-container">
            <div class="result-item winner-result" :style="{ borderLeft: `4px solid ${badgeColor}`, background: `${badgeColor}15` }">
              <div class="result-header">
                <q-icon name="emoji_events" :color="badgeColor" size="sm" />
                <span class="result-name text-weight-bold" :style="{ color: badgeColor, fontSize: '1.1em' }">
                  {{ props.winner === 1 ? props.name1 : props.name2 }}
                </span>
                <q-chip size="sm" :style="{ background: badgeColor, color: 'white' }" dense>
                  1-ше місце
                </q-chip>
              </div>
              <div class="result-time" :style="{ color: badgeColor, fontSize: '1.3em', fontWeight: 'bold' }">
                {{ formatTime(props.winner === 1 ? props.time1 : props.time2) }}
              </div>
            </div>
            
            <div v-if="(props.winner === 1 && props.time2) || (props.winner === 2 && props.time1)" 
                 class="result-item second-result" 
                 :style="{ borderLeft: `4px solid ${props.winner === 1 ? props.color2 : props.color1}`, 
                          background: `${props.winner === 1 ? props.color2 : props.color1}10`,
                          opacity: 0.8 }">
              <div class="result-header">
                <q-icon name="directions_bike" :color="props.winner === 1 ? props.color2 : props.color1" size="sm" />
                <span class="result-name" :style="{ color: props.winner === 1 ? props.color2 : props.color1 }">
                  {{ props.winner === 1 ? props.name2 : props.name1 }}
                </span>
                <q-chip size="sm" :style="{ background: props.winner === 1 ? props.color2 : props.color1, color: 'white' }" dense>
                  2-ге місце
                </q-chip>
              </div>
              <div class="result-time" :style="{ color: props.winner === 1 ? props.color2 : props.color1, fontSize: '1.1em' }">
                {{ formatTime(props.winner === 1 ? props.time2 : props.time1) }}
              </div>
            </div>
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right" class="winner-actions">
        <q-btn 
          flat 
          label="OK" 
          color="primary" 
          class="action-btn"
          @click="emit('update:modelValue', false)" 
        />
        <q-btn 
          unelevated 
          color="orange" 
          label="Скинути гонку" 
          icon="refresh"
          class="action-btn reset-action"
          @click="() => { emit('update:modelValue', false); emit('reset'); }" 
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style scoped lang="scss">
.winner-dialog {
  border-radius: 16px;
  overflow: hidden;
}

.winner-header {
  padding: 24px;
  border-radius: 0;
}

.trophy-icon-wrapper {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.winner-content {
  padding: 24px;
}

.winner-message {
  text-align: center;
  padding: 16px 0;
  
  &.tie-message {
    .text-h6 {
      color: #ff9800;
    }
  }
}

.results-section {
  margin-top: 24px;
}

.results-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.result-item {
  padding: 16px;
  border-radius: 12px;
  background: #f5f5f5;
  transition: all 0.3s ease;
  
  &.winner-result {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    transform: scale(1.02);
  }
  
  &.second-result {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
  }
}

.result-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 8px;
  
  .result-name {
    flex: 1;
    font-size: 1em;
  }
}

.result-time {
  font-size: 1.2em;
  font-weight: 600;
  margin-top: 4px;
}

.winner-actions {
  padding: 16px 24px;
  border-top: 1px solid #e0e0e0;
  
  .action-btn {
    margin-left: 8px;
  }
  
  .reset-action {
    font-weight: 600;
  }
}
</style>
