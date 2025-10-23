<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
const isActive = (path: string) => route.path === path
</script>

<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-grey-2 text-dark">
      <q-toolbar>
        <img class="logo" src="@/assets/img/cycle_point.jpg" alt="logo">
        <q-toolbar-title>Cycle Point App</q-toolbar-title>

        <q-space />
        <q-btn
            :flat="!isActive('/')"
            :unelevated="isActive('/')"
            color="positive"
            label="Тахометр"
            :to="{ path: '/' }"
            class="q-mr-sm"
        />
        <q-btn
            :flat="!isActive('/archive')"
            :unelevated="isActive('/archive')"
            color="accent"
            label="Архів"
            :to="{ path: '/archive' }"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<style scoped lang="scss">
.logo{
  width: 40px;
  height: 40px;
}


</style>