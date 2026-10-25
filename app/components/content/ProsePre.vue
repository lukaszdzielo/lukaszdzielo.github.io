<script setup lang="ts">
// Blok kodu we wpisie (```). Jak domyślny ProsePre z @nuxtjs/mdc, a do tego tabindex="0", gdy kod jest szerszy
// niż blok: wtedy da się go zaznaczyć Tabem i przewinąć strzałkami – także w Safari, który sam tego nie robi.
// Bloki, które się mieszczą, nie dostają fokusu, żeby Tab nie zatrzymywał się na każdym kawałku kodu.
defineProps({
  code: { type: String, default: '' },
  language: { type: String, default: null },
  filename: { type: String, default: null },
  highlights: { type: Array, default: () => [] },
  meta: { type: String, default: null },
  class: { type: String, default: null },
})

const pre = ref<HTMLPreElement | null>(null)
const scrollable = ref(false)
let observer: ResizeObserver | undefined

onMounted(() => {
  const check = () => {
    scrollable.value = !!pre.value && pre.value.scrollWidth > pre.value.clientWidth
  }
  check()
  observer = new ResizeObserver(check)
  if (pre.value) observer.observe(pre.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<template>
  <pre ref="pre" :class="$props.class" :tabindex="scrollable ? 0 : undefined"><slot /></pre>
</template>

<style>
pre code .line{display:block}
</style>
