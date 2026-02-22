<script setup lang="ts">
const { data: posts } = await useAsyncData('blog-list', () => {
    return queryCollection('blog')
        .where('date', '<>', undefined) // Filter: Must have a date
        .where('slug', '<>', undefined) // Filter: Must have a slug
        .order('date', 'DESC')
        .all()
})
</script>

<template>
    <div>
        <ul v-if="posts?.length" class="grid md:grid-cols-2 gap-5 py-10">
            <li v-for="post in posts" :key="post.path">
                <strong>Path:</strong> {{ post.path }}<br>
                <strong>Stem:</strong> {{ post.stem }}
                <NuxtLink :to="'/blog/' + post.slug" class="block">
                    <small>{{ post.date }}</small>
                    <h2>{{ post.title }}</h2>
                    <p><small>{{ post.description }}</small></p>
                </NuxtLink>
            </li>
        </ul>
        <p v-else>No published posts yet.</p>
    </div>
</template>