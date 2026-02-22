<script setup lang="ts">
const route = useRoute()

const today = new Date().toISOString().split('T')[0] || ''

const slugParam = Array.isArray(route.params.slug)
    ? route.params.slug[0]
    : route.params.slug

const { data: post } = await useAsyncData(`blog-${slugParam}`, () => {
    return queryCollection('blog')
        .where('slug', '=', slugParam)
        .first()
})

const isPublished = computed(() => {
    if (!post.value?.date) return false;
    const postDate = post.value.date.split('T')[0];
    if (!postDate) return false;
    return postDate <= today
})
</script>

<template>
    <section class="py-10">

        <article v-if="post && isPublished">
            <h1>{{ post.title }}</h1>
            <p class="text-gray-500">Published: {{ post.date }}</p>
            <hr class="my-4" />
            <ContentRenderer :value="post" />
        </article>

        <div v-else class="text-center py-20">
            <h2 class="text-2xl font-bold">Sorry, post removed or invalid link</h2>
            <p class="mt-2 text-gray-600">This content is no longer available.</p>
            <NuxtLink to="/blog" class="mt-4 inline-block text-blue-600 underline">
                Back to Blog
            </NuxtLink>
        </div>

    </section>
</template>