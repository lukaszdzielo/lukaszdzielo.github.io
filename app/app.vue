<script setup>
import TheFooter from '~/components/layout/TheFooter.vue'
import TheHeader from '~/components/layout/TheHeader.vue';

// Strona dla firm ma własne menu i stopkę (bez GitHuba, z linkami do sekcji oferty)
const route = useRoute()
const business = computed(() => route.path.startsWith('/strony-dla-firm'))
</script>

<template>
  <TheHeader :variant="business ? 'business' : 'portfolio'" />

  <main>
    <!-- <div class="container"> -->
    <NuxtPage />
    <!-- </div> -->
  </main>

  <TheFooter :variant="business ? 'business' : 'portfolio'" />

  <!-- Zgoda na statystyki – tylko w przeglądarce (decyzja jest w localStorage) -->
  <ClientOnly>
    <CommonCookieConsent />
  </ClientOnly>
</template>