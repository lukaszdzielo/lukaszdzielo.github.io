<script setup lang="ts">
const route = useRoute()

const { data: post } = await useAsyncData(route.path, () => {
    return queryCollection('portfolio')
        .where('draft', '=', false)
        .where('body', '<>', '')
        .path(route.path)
        .first()
})

const hasRenderableContent = computed(() => {
    if (!post.value || !post.value.body) return false
    const bodyData = post.value.body as any
    return bodyData.value && bodyData.value.length > 0
})
</script>

<template>
    <section class="py-10">

        <template v-if="hasRenderableContent">
            <ContentRenderer :value="post!" />
        </template>

        <p v-else>Projekt nie został znaleziony.</p>

    </section>
</template>