<script setup lang="ts">
</script>

<template>
  <button class="site-lang" type="button" aria-label="Мова: UA">
    <span class="site-lang__ua">UA</span><span class="site-lang__eng">|ENG</span>
  </button>
</template>

<style scoped>
.site-lang {
  display: inline-flex;
  align-items: baseline;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-fg);
  cursor: default;
  flex-shrink: 0;
}

.site-lang:focus-visible {
  outline: 2px solid var(--color-fg);
  outline-offset: 2px;
}

.site-lang__ua {
  font-family: var(--font-sans);
  font-size: var(--text-lang-ua);
  font-weight: var(--font-weight-regular);
  line-height: 19px;
}

.site-lang__eng {
  font-family: var(--font-sans);
  font-size: var(--text-lang-eng);
  font-weight: var(--font-weight-thin);
  line-height: 19px;
}
</style>
