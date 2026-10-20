<script setup lang="ts">
// /blog/page/2, /blog/page/3… – strona 1 to /blog (po polsku /pl/wpisy/strona/2… i /pl/wpisy)
definePageMeta({ i18n: { paths: { en: '/blog/page/[page]', pl: '/wpisy/strona/[page]' } } })

const { t } = useI18n({ useScope: 'local' })
const link = useLocalLink()
const route = useRoute()
const page = Number(route.params.page)
if (!Number.isInteger(page) || page < 1) {
  throw createError({ statusCode: 404, statusMessage: t('notFound'), fatal: true })
}
if (page === 1) await navigateTo(link('/blog'), { redirectCode: 301, replace: true })
</script>

<template>
  <BlogList :page="page" />
</template>

<i18n lang="json">
{
  "en": { "notFound": "This page of posts doesn't exist" },
  "pl": { "notFound": "Nie ma takiej strony wpisów" }
}
</i18n>
