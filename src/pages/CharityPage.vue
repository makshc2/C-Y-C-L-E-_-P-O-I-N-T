<script setup lang="ts">
import qrUrl from '@/assets/site/charity-qr.png'
</script>

<template>
  <div class="charity">
    <section class="charity__green">
      <img
        class="charity__qr"
        :src="qrUrl"
        width="566"
        height="528"
        alt="QR-код для допомоги Велоточці"
      >
    </section>
    <section class="charity__violet" aria-hidden="true" />
  </div>
</template>

<style scoped>
.charity__green {
  display: flex;
  align-items: center;
  justify-content: center;
  height: var(--charity-green-h);
  background-color: var(--color-green);
}

.charity__qr {
  width: var(--charity-qr-w);
  height: var(--charity-qr-h);
  object-fit: contain;
}

.charity__violet {
  height: var(--section-h-home);
  background-color: var(--color-violet);
}

@media (max-width: 1727px) {
  .charity__green {
    height: auto;
    min-height: 70vh;
    padding: 48px 16px;
  }

  .charity__qr {
    width: min(var(--charity-qr-w), 100%);
    height: auto;
  }
}
</style>
