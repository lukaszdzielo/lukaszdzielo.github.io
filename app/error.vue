<script setup lang="ts">
// Błędy rzucone przez createError (np. nieistniejąca strona listy wpisów) i błędy aplikacji.
// error.vue renderuje się zamiast app.vue, więc nagłówek i stopkę dodajemy tu jeszcze raz.
import type { NuxtError } from '#app'
import TheFooter from '~/components/layout/TheFooter.vue'
import TheHeader from '~/components/layout/TheHeader.vue'

const props = defineProps<{ error: NuxtError }>()
const is404 = computed(() => props.error?.statusCode === 404)
</script>

<template>
  <TheHeader />
  <main>
    <CommonNotFound :variant="is404 ? undefined : 'error'" />
  </main>
  <TheFooter />
</template>
