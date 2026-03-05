<script setup lang="ts">
const route = useRoute()

const { data: page } = await useAsyncData('page-' + route.path, () => {
	return queryCollection('content').path(route.path).first()
})
</script>

<template>
	<ContentRenderer v-if="page" :value="page" />

	<p v-else>Strona nie został znaleziony.</p>
</template>
