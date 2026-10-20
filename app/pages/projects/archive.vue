<script setup lang="ts">
// Stary adres archiwum – teraz archiwum jest sekcją na /projects (w języku strony: /projects albo /pl/projekty).
const link = useLocalLink()
await navigateTo(link('/projects#archive'), { redirectCode: 301, replace: true })
</script>

<template>
  <div />
</template>
