import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    { path: '/', component: () => import('@/pages/TachometerPage.vue') },
    { path: '/archive', component: () => import('@/pages/ResultsArchivePage.vue') },
]

export default createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes,
})
