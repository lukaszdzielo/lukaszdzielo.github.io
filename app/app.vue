<script setup>
import TheFooter from '~/components/layout/TheFooter.vue'
import TheHeader from '~/components/layout/TheHeader.vue';
</script>

<template>
  <TheHeader />

  <main>
    <!-- <div class="container"> -->
    <NuxtPage />
    <!-- </div> -->
  </main>

  <TheFooter />

  <!-- Zgoda na statystyki – tylko w przeglądarce (decyzja jest w localStorage) -->
  <ClientOnly>
    <CommonCookieConsent />
  </ClientOnly>
</template>