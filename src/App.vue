<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SiteLayout from '@/layouts/SiteLayout.vue'
import GsAppLayout from '@/layouts/GsAppLayout.vue'

const route = useRoute()
const chrome = computed(() => route.meta.chrome)
</script>

<template>
  <SiteLayout v-if="chrome === 'site'">
    <router-view />
  </SiteLayout>
  <GsAppLayout v-else-if="chrome === 'app'">
    <router-view />
  </GsAppLayout>
</template>
