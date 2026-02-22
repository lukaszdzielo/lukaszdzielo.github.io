<script setup lang="ts">
const route = useRoute();
const limit = 12;

const now = new Date().toISOString();

const currentPage = computed(() => parseInt(route.query.page as string) || 1);

const { data: posts } = await useAsyncData('blog-list', () => {
    return queryCollection('blog')
        .where('date', '<>', undefined) // Filter: Must have a date
        .where('slug', '<>', undefined) // Filter: Must have a slug
        .where('date', '<=', now)
        .order('date', 'DESC')
        .limit(limit)
        .skip((currentPage.value - 1) * limit)
        .all()
}, {
    watch: [currentPage]
});

const { data: totalPosts } = await useAsyncData('blog-count', () => {
    return queryCollection('blog')
        .where('date', '<>', undefined)
        .where('slug', '<>', undefined)
        .count() // Returns just the number
});

const totalPages = computed(() => Math.ceil((totalPosts.value || 0) / limit));
</script>

<template>
    <div>
        <ul v-if="posts?.length" class="grid md:grid-cols-2 gap-5 py-10">
            <li v-for="post in posts" :key="post.path" class="border p-5">
                <NuxtLink :to="'/blog/' + post.slug" class="block">
                    <small>{{ post.date }}</small>
                    <h2>{{ post.title }}</h2>
                    <p><small>{{ post.description }}</small></p>
                </NuxtLink>
            </li>
        </ul>
        <p v-else>No published posts yet.</p>

        <div v-if="totalPages > 1" class="flex justify-center gap-4 mt-10">
            <NuxtLink v-if="currentPage > 1" :to="{ query: { page: currentPage - 1 } }"
                class="px-4 py-2 bg-gray-200 rounded">
                Previous
            </NuxtLink>

            <span class="py-2">Page {{ currentPage }} of {{ totalPages }}</span>

            <NuxtLink v-if="currentPage < totalPages" :to="{ query: { page: currentPage + 1 } }"
                class="px-4 py-2 bg-gray-200 rounded">
                Next
            </NuxtLink>
        </div>
    </div>
</template>