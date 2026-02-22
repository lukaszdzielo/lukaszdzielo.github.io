<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => {
    return queryCollection('portfolio')
        .path(route.path)
        .first()
})
</script>

<template>
    <section class="py-10">

        <ContentRenderer v-if="post" :value="post" />

        <p v-else>Projekt nie został znaleziony.</p>

    </section>
</template>