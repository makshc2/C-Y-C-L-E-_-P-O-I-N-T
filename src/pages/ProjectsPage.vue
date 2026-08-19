<script setup lang="ts">
import ProjectRow from '@/components/projects/ProjectRow.vue'
import { armySupportList, goldenSprintsList } from '@/content/projects'
import gsThumb from '@/assets/site/gs-thumb.png'
import armyThumb from '@/assets/site/army-thumb.png'
</script>

<template>
  <div class="projects">
    <ProjectRow
      :photo="gsThumb"
      photo-alt="Golden sprints"
      :title="goldenSprintsList.title"
      to="/projects/golden-sprints"
    >
      <ul>
        <li v-for="item in goldenSprintsList.items" :key="item">{{ item }}</li>
      </ul>
    </ProjectRow>
    <div class="projects__rule" />
    <ProjectRow
      class="projects__army"
      :photo="armyThumb"
      photo-alt="Допомога армії"
      :title="armySupportList.title"
      to="/projects/army-support"
    >
      <p>{{ armySupportList.body }}</p>
    </ProjectRow>
    <div class="projects__rule" />
  </div>
</template>

<style scoped>
.projects {
  background-color: var(--color-green);
}

.projects__rule {
  height: 1px;
  margin: 0 36px;
  background-color: rgb(30 30 30 / 0.2);
}

.projects__army :deep(.project-row__photo) {
  width: 175px;
}

@media (max-width: 1279px) {
  .projects__rule {
    margin: 0 16px;
  }
}

@media (max-width: 767px) {
  .projects__army :deep(.project-row__photo) {
    width: 100%;
  }
}
</style>
