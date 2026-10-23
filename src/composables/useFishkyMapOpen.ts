import { readonly, shallowRef } from 'vue'

const mapOpen = shallowRef(false)

export function useFishkyMapOpen() {
  function toggle() {
    mapOpen.value = !mapOpen.value
  }

  function close() {
    mapOpen.value = false
  }

  return {
    open: readonly(mapOpen),
    toggle,
    close,
  }
}
