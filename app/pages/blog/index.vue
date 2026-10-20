<script setup lang="ts">
// Adres w każdym języku – po polsku polskie nazwy części adresu (app/utils/localeRoutes.ts)
definePageMeta({ i18n: { paths: { en: '/blog', pl: '/wpisy' } } })
</script>

<template>
  <BlogList :page="1" />
</template>
