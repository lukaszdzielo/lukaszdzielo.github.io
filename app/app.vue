<script setup>
import { pageUrl } from '~/data/site'
import TheFooter from '~/components/layout/TheFooter.vue'
import TheHeader from '~/components/layout/TheHeader.vue';

// Strona dla firm ma własne menu i stopkę (bez GitHuba, z linkami do sekcji oferty).
// Nazwa trasy bez języka – w obu wersjach ta sama (adresy: /business-websites i /pl/strony-dla-firm).
const route = useRoute()
const routeBaseName = useRouteBaseName()
const business = computed(() => routeBaseName(route) === 'strony-dla-firm')

// Adres kanoniczny i og:url każdej podstrony + wersje językowe (hreflang).
// Adresy z ukośnikiem na końcu – tak serwuje je GitHub Pages (bez przekierowania).
const locale = useNuxtApp().$i18n.locale
const switchLocalePath = useSwitchLocalePath()
const bare = (path) => path.split(/[?#]/)[0] || '/'
const url = computed(() => pageUrl(bare(route.path)))
const alt = (code) => pageUrl(bare(switchLocalePath(code) || (code === 'en' ? '/' : '/pl')))
useHead(() => ({
  htmlAttrs: { lang: locale.value },
  link: [
    { key: 'canonical', rel: 'canonical', href: url.value },
    { key: 'alt-en', rel: 'alternate', hreflang: 'en', href: alt('en') },
    { key: 'alt-pl', rel: 'alternate', hreflang: 'pl', href: alt('pl') },
    { key: 'alt-x', rel: 'alternate', hreflang: 'x-default', href: alt('en') },
  ],
}))
useSeoMeta({
  ogUrl: url,
  ogLocale: () => (locale.value === 'pl' ? 'pl_PL' : 'en_US'),
  ogLocaleAlternate: () => (locale.value === 'pl' ? 'en_US' : 'pl_PL'),
})
</script>

<template>
  <TheHeader :variant="business ? 'business' : 'portfolio'" />

  <main>
    <NuxtPage />
  </main>

  <TheFooter :variant="business ? 'business' : 'portfolio'" />

  <!-- Zgoda na statystyki – tylko w przeglądarce (decyzja jest w localStorage) -->
  <ClientOnly>
    <CommonCookieConsent />
  </ClientOnly>
</template>
