import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

function migrateLegacyHash() {
  const hash = window.location.hash
  if (!hash.startsWith('#/')) return
  const rest = hash.slice(2)
  if (rest.startsWith('#')) {
    window.history.replaceState(null, '', `/${rest}`)
    return
  }
  const cut = rest.indexOf('#')
  const path = cut === -1 ? rest : rest.slice(0, cut)
  const fragment = cut === -1 ? '' : rest.slice(cut)
  window.history.replaceState(null, '', `/${path}${fragment}`)
}

migrateLegacyHash()

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
    path: '/projects/fishky-velodorizhky',
    component: () => import('../pages/FishkyVelodorizhkyPage.vue'),
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
    path: '/events',
    component: () => import('../pages/EventsPage.vue'),
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
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      const hash = to.hash.startsWith('#') ? to.hash : `#${to.hash}`
      return { el: hash }
    }
    return { top: 0 }
  },
})
