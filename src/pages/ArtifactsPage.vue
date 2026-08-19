<script setup lang="ts">
import { nextTick, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import ArtifactRow from '@/components/artifacts/ArtifactRow.vue'
import { artifacts } from '@/content/artifacts'
import crestPhoto from '@/assets/site/artifact-01-crest.png'
import colossiPhoto from '@/assets/site/artifact-02-colossi.png'
import colnagoPhoto from '@/assets/site/artifact-03-colnago.png'
import harryHallPhoto from '@/assets/site/artifact-04-harry-hall.png'
import danyloPhoto from '@/assets/site/artifact-05-danylo.png'
import kokkedalPhoto from '@/assets/site/artifact-06-kokkedal.png'
import bagPhoto from '@/assets/site/artifact-07-bag.png'
import gemuPhoto from '@/assets/site/artifact-08-gemu.png'
import helmetsPhoto from '@/assets/site/artifact-09-helmets.png'
import lucasPhoto from '@/assets/site/artifact-10-lucas.png'

const photos = {
  crest: crestPhoto,
  colossi: colossiPhoto,
  colnago: colnagoPhoto,
  'harry-hall': harryHallPhoto,
  danylo: danyloPhoto,
  kokkedal: kokkedalPhoto,
  bag: bagPhoto,
  gemu: gemuPhoto,
  helmets: helmetsPhoto,
  lucas: lucasPhoto,
} as const

const rows = artifacts.map((item) => ({
  ...item,
  photo: photos[item.id as keyof typeof photos],
}))

const route = useRoute()
const artifactIds = new Set(artifacts.map((item) => item.id))

function scrollToArtifact() {
  const id = route.hash.replace(/^#/, '')
  if (!artifactIds.has(id)) {
    return
  }
  document.getElementById(id)?.scrollIntoView({ block: 'start' })
}

onMounted(() => {
  void nextTick(() => {
    scrollToArtifact()
    const images = document.querySelectorAll<HTMLImageElement>('.artifacts img')
    for (const image of images) {
      if (!image.complete) {
        image.addEventListener('load', scrollToArtifact, { once: true })
      }
    }
  })
})

watch(
  () => route.hash,
  () => {
    void nextTick(scrollToArtifact)
  },
)
</script>

<template>
  <div class="artifacts">
    <ArtifactRow
      v-for="item in rows"
      :key="item.id"
      :id="item.id"
      :photo="item.photo"
      :text="item.text"
      :tone="item.tone"
    />
  </div>
</template>
