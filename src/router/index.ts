import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('../pages/HomePage.vue'),
    meta: { chrome: 'site' },
  },
  {
    path: '/projects',
    component: () => import('../pages/ProjectsPage.vue'),
    meta: { chrome: 'site' },
  },
  {
    path: '/projects/golden-sprints',
    component: () => import('../pages/GoldenSprintsPage.vue'),
    meta: { chrome: 'site' },
  },
  {
    path: '/projects/golden-sprints/app',
    component: () => import('../pages/TachometerPage.vue'),
    meta: { chrome: 'app' },
  },
  {
    path: '/projects/golden-sprints/archive',
    component: () => import('../pages/ResultsArchivePage.vue'),
    meta: { chrome: 'app' },
  },
  {
    path: '/projects/army-support',
    component: () => import('../pages/ArmySupportPage.vue'),
    meta: { chrome: 'site' },
  },
  {
    path: '/workshop',
    component: () => import('../pages/WorkshopPage.vue'),
    meta: { chrome: 'site' },
  },
  {
    path: '/rental',
    component: () => import('../pages/RentalPage.vue'),
    meta: { chrome: 'site' },
  },
  {
    path: '/artifacts',
    component: () => import('../pages/ArtifactsPage.vue'),
    meta: { chrome: 'site' },
  },
  {
    path: '/charity',
    component: () => import('../pages/CharityPage.vue'),
    meta: { chrome: 'site' },
  },
  {
    path: '/archive',
    redirect: '/projects/golden-sprints/archive',
  },
]

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash === '#contacts' || to.hash === 'contacts') {
      return { el: '#contacts' }
    }
    return { top: 0 }
  },
})
