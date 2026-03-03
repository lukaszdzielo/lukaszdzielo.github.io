<script setup lang="ts">
import Pagination from '~/components/common/Pagination.vue';

const route = useRoute();
const router = useRouter();
const limit = 12;

const { data: total } = await useAsyncData('blog-count', () =>
    queryCollection('blog').where('draft', '=', false).count()
);

const totalPages = computed(() => Math.ceil((total.value ?? 0) / limit));

const currentPage = computed(() => {
    const page = parseInt(route.query.page as string);
    if (isNaN(page) || page < 1) return 1;
    return Math.min(page, totalPages.value);
});

watch(() => route.query.page, () => {
    const raw = parseInt(route.query.page as string);
    if (isNaN(raw) || raw < 1 || raw > totalPages.value) {
        router.replace({ query: { page: currentPage.value } });
    }
}, { immediate: true });

const { data: posts } = await useAsyncData('blog-list', () =>
    queryCollection('blog')
        .where('draft', '=', false)
        .order('date', 'DESC')
        .limit(limit)
        .skip((currentPage.value - 1) * limit)
        .all(),
    { watch: [currentPage] }
);
</script>

<template>
    <section class="py-10">
        <ul v-if="posts?.length" class="grid grid-cols-2 gap-5">
            <li v-for="post in posts" :key="post.path" class="border p-5">
                <NuxtLink :to="post.path" class="block">
                    <div>{{ post.slug }}</div>
                    <small>{{ post.date }}</small>
                    <h2>{{ post.title }}</h2>
                    <p><small>{{ post.description }}</small></p>
                </NuxtLink>
            </li>
        </ul>
        <p v-else>No published posts yet.</p>

        <Pagination :current-page="currentPage" :total-pages="totalPages" />
    </section>
</template>