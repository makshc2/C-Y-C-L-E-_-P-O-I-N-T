<script setup lang="ts">
import { useRoute } from 'vue-router'
import logoUrl from '@/assets/site/logo-cyclepoint-header.png'

const route = useRoute()
const isActive = (path: string) => route.path === path
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-grey-2 text-dark">
      <q-toolbar>
        <img class="logo" :src="logoUrl" alt="Cycle Point">
        <q-toolbar-title>Cycle Point App</q-toolbar-title>

        <q-space />
        <q-btn
          :flat="!isActive('/projects/golden-sprints/app')"
          :unelevated="isActive('/projects/golden-sprints/app')"
          color="positive"
          label="Тахометр"
          :to="{ path: '/projects/golden-sprints/app' }"
          class="q-mr-sm"
        />
        <q-btn
          :flat="!isActive('/projects/golden-sprints/archive')"
          :unelevated="isActive('/projects/golden-sprints/archive')"
          color="accent"
          label="Архів"
          :to="{ path: '/projects/golden-sprints/archive' }"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
}
</style>
