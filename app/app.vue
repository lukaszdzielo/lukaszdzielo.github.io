<script setup>
import { pageUrl } from '~/data/site'
import TheFooter from '~/components/layout/TheFooter.vue'
import TheHeader from '~/components/layout/TheHeader.vue';

// Strona dla firm ma własne menu i stopkę (bez GitHuba, z linkami do sekcji oferty)
const route = useRoute()
const business = computed(() => route.path.startsWith('/strony-dla-firm'))

// Adres kanoniczny i og:url każdej podstrony (wcześniej wszystkie wskazywały na stronę główną)
const url = computed(() => pageUrl(route.path))
useHead({ link: [{ key: 'canonical', rel: 'canonical', href: url }] })
useSeoMeta({ ogUrl: url })
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