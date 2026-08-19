import { onMounted, onUnmounted, readonly, shallowRef, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

const LOAD_TIMEOUT_MS = 15_000
const MIN_VISIBLE_MS = 800

export function useEmbedReady(src: MaybeRefOrGetter<string>, timeoutMs = LOAD_TIMEOUT_MS) {
  const ready = shallowRef(false)
  const embedSrc = shallowRef('')
  let timeoutId = 0
  let hideId = 0
  let shownAt = 0

  function markReady() {
    if (ready.value || hideId || !embedSrc.value) {
      return
    }
    window.clearTimeout(timeoutId)
    const remaining = Math.max(0, MIN_VISIBLE_MS - (performance.now() - shownAt))
    hideId = window.setTimeout(() => {
      ready.value = true
    }, remaining)
  }

  onMounted(() => {
    shownAt = performance.now()
    embedSrc.value = toValue(src)
    timeoutId = window.setTimeout(markReady, timeoutMs)
  })

  onUnmounted(() => {
    window.clearTimeout(timeoutId)
    window.clearTimeout(hideId)
  })

  return {
    ready: readonly(ready),
    embedSrc: readonly(embedSrc),
    markReady,
  }
}
