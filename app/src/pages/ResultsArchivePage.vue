<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getRaces, deleteRace, clearRaces, type RaceRecord } from '@/services/localDb'

const rows = ref<RaceRecord[]>([])
const expanded = ref<string[]>([])

function load() { rows.value = getRaces() }
function fmtDate(iso: string) { return new Date(iso).toLocaleString() }
function fmtWinner(r: RaceRecord) {
  if (r.winner === 'tie') return 'Нічия'
  return r.winner === 1 ? r.runner1.name : r.runner2.name
}

function removeOne(id: string) {
  deleteRace(id)
  load()
}
function clearAll() {
  clearRaces()
  load()
}

onMounted(load)
</script>

<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div class="text-h5">Архів заїздів</div>
      <div class="row q-col-gutter-sm">
        <div class="col-auto">
          <q-btn color="negative" outline label="Очистити архів" @click="clearAll" />
        </div>
      </div>
    </div>

    <q-table
        flat bordered
        :rows="rows"
        row-key="id"
        :columns="[
        { name:'date',   label:'Дата',     field: r => fmtDate(r.dateIso), align:'left', sortable:true },
        { name:'names',  label:'Суперники', field: r => r.runner1.name + ' vs ' + r.runner2.name, align:'left' },
        { name:'finish', label:'Фініш, м', field: 'finishMeters', align:'right', sortable:true },
        { name:'times',  label:'Часи (мс)', field: r => `${r.time1 ?? '—'} / ${r.time2 ?? '—'}`, align:'left' },
        { name:'winner', label:'Переможець', field: r => fmtWinner(r), align:'left' },
        { name:'actions', label:'', field:'id', align:'right' }
      ]"
        :pagination="{ rowsPerPage: 10 }"
        :expanded="expanded"
        @update:expanded="val => expanded = val"
    >
      <template #body-cell-actions="props">
        <q-td :props="props">
          <q-btn dense flat icon="unfold_more" @click="props.expand = !props.expand">
            <q-tooltip>Показати лапи</q-tooltip>
          </q-btn>
          <q-btn dense flat icon="delete" color="negative" @click="removeOne(props.row.id)">
            <q-tooltip>Видалити</q-tooltip>
          </q-btn>
        </q-td>
      </template>

      <template #body-row-expand="props">
        <q-tr :props="props">
          <q-td :colspan="props.cols.length">
            <div class="row q-col-gutter-md">
              <div class="col-12 col-md-6">
                <q-card flat bordered class="q-pa-sm">
                  <div class="text-subtitle2" :style="{ color: props.row.runner1.color }">
                    Лапи — {{ props.row.runner1.name }}
                  </div>
                  <q-table
                      flat bordered dense
                      :rows="props.row.laps1"
                      :columns="[
                      { name:'m',  label:'Дистанція, м', field:'atMeters', align:'left' },
                      { name:'ms', label:'Час, мс',      field:'atMs',     align:'left' }
                    ]"
                      row-key="atMeters"
                      :pagination="{ rowsPerPage: 10 }"
                  />
                </q-card>
              </div>
              <div class="col-12 col-md-6">
                <q-card flat bordered class="q-pa-sm">
                  <div class="text-subtitle2" :style="{ color: props.row.runner2.color }">
                    Лапи — {{ props.row.runner2.name }}
                  </div>
                  <q-table
                      flat bordered dense
                      :rows="props.row.laps2"
                      :columns="[
                      { name:'m',  label:'Дистанція, м', field:'atMeters', align:'left' },
                      { name:'ms', label:'Час, мс',      field:'atMs',     align:'left' }
                    ]"
                      row-key="atMeters"
                      :pagination="{ rowsPerPage: 10 }"
                  />
                </q-card>
              </div>
            </div>
          </q-td>
        </q-tr>
      </template>
    </q-table>
  </q-page>
</template>
