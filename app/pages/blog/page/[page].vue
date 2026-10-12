<script setup lang="ts">
// /blog/page/2, /blog/page/3… – strona 1 to /blog
const route = useRoute()
const page = Number(route.params.page)
if (!Number.isInteger(page) || page < 1) {
  throw createError({ statusCode: 404, statusMessage: 'Nie ma takiej strony wpisów', fatal: true })
}
if (page === 1) await navigateTo('/blog', { redirectCode: 301, replace: true })
</script>

<template>
  <BlogList :page="page" />
</template>
