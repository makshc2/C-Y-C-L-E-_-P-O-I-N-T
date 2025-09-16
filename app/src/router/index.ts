import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
    { path: '/', component: () => import('@/pages/TachometerPage.vue') },
    { path: '/archive', component: () => import('@/pages/ResultsArchivePage.vue') },
]

export default createRouter({
    history: createWebHistory(),
    routes,
})
