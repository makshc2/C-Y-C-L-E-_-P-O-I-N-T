/// <reference types="vite/client" />

export {}

declare module 'vue-router' {
  interface RouteMeta {
    chrome?: 'site' | 'app'
  }
}
