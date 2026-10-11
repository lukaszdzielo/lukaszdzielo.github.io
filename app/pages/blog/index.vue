<script setup lang="ts">
import ThePagination from '~/components/common/ThePagination.vue';

const route = useRoute();
const limit = 12;

const { data: total } = await useAsyncData('blog-count', () =>
    queryCollection('blog')
        .where('draft', '=', false)
        .count()
);

const totalPages = computed(() => Math.max(1, Math.ceil((total.value ?? 0) / limit)));

const currentPage = computed(() => {
    const pageParam = route.params.page as string | undefined;
    if (!pageParam) return 1;
    const parsed = Number(pageParam);
    if (!Number.isInteger(parsed) || parsed < 1 || parsed > totalPages.value) {
        throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true });
    }
    return parsed;
});

const { data: posts } = await useAsyncData(
    () => `blog-list-${currentPage.value}`,
    () => queryCollection('blog')
        .where('draft', '=', false)
        .order('date', 'DESC')
        .limit(limit)
        .skip((currentPage.value - 1) * limit)
        .all(),
    { watch: [currentPage] }
);

useSeoMeta({
    title: 'Blog — Łukasz Dzieło',
    description: 'Articles and case studies by Łukasz Dzieło.',
});
</script>

<template>
    <section class="container my-15 sm:my-20 md:my-30 flex flex-col gap-10">

        <header class="flex flex-col gap-5">
            <div
                class="flex items-center gap-2 font-medium after:content-[''] after:block after:w-12 after:h-0.75 after:bg-sky-500 after:rounded-full">
                <span class="">01</span>
                <span class="">/</span>
                <span class="font-semibold uppercase">Blog</span>
            </div>
            <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-pretty">
                Latest <em class="text-sky-500">articles</em>
            </h1>
        </header>

        <ul v-if="posts?.length" class="grid sm:grid-cols-2 gap-5">
            <li v-for="post in posts" :key="post.path" class="flex flex-col">
                <NuxtLink :to="post.path"
                    class="block group border border-slate-200 dark:border-slate-700 rounded-xl p-5 h-full transition-colors hover:border-sky-500">
                    <div class="flex flex-wrap items-center gap-2">
                        <small class="">{{ formatDate(post.date) }}</small>
                        <span v-if="post.kind === 'case-study'"
                            class="rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 px-2.5 py-0.5 text-xs font-medium">
                            Case study
                        </span>
                    </div>
                    <h2 class="mt-2 text-lg font-semibold text-balance group-hover:text-sky-500">{{ post.title }}</h2>
                    <p class="mt-2 text-sm  text-pretty">{{ post.description }}</p>
                    <ul v-if="post.tags?.length" class="mt-3 flex flex-wrap gap-2">
                        <li v-for="tag in post.tags" :key="tag">
                            <span class="inline-block rounded-full bg-slate-200 dark:bg-slate-700 px-3 py-1 text-xs">
                                #{{ tag }}
                            </span>
                        </li>
                    </ul>
                </NuxtLink>
            </li>
        </ul>
        <p v-else class="">No published posts yet.</p>

        <ThePagination :current-page="currentPage" :total-pages="totalPages" base-path="/blog" />
    </section>
</template>
