<script setup lang="ts">
// Strona dla firm: oferta stron na WordPressie. Treści – app/data/business.ts, ceny – app/data/pricing.ts.
// Nagłówek i stopka przełączają się na wersję „dla firm” w app.vue (po adresie).
useSeoMeta({
  title: 'Strony WordPress dla firm – Łukasz Dzieło',
  description: 'Strony wizytówki i strony firmowe na WordPressie z edytorem bloków – projekt, wdrożenie i opieka. Treści zmieniasz sam.',
  ogTitle: 'Strony WordPress dla firm – Łukasz Dzieło',
})
</script>

<template>
  <div>
    <BusinessHero />
    <BusinessFeatures />
    <BusinessOffer />
    <BusinessWork />
    <BusinessProcess />
    <BusinessQuotes />
    <BusinessCare />
    <BusinessFaq />
    <SectionsHomeContact variant="business" />
  </div>
</template>
