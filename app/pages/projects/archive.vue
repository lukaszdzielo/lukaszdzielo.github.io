<script setup lang="ts">
import ThePagination from '~/components/common/ThePagination.vue';

const route = useRoute();
const router = useRouter();
const limit = 24;

const { data: total } = await useAsyncData('projects-archive-count', () =>
    queryCollection('projects')
        .where('draft', '=', false)
        .count()
);

const totalPages = computed(() => Math.max(1, Math.ceil((total.value ?? 0) / limit)));

const currentPage = computed(() => {
    const page = parseInt(route.query.page as string);
    if (isNaN(page) || page < 1) return 1;
    return Math.min(page, totalPages.value);
});

watch(() => route.query.page, () => {
    const raw = parseInt(route.query.page as string);
    if (!isNaN(raw) && (raw < 1 || raw > totalPages.value)) {
        router.replace({ query: { page: currentPage.value } });
    }
}, { immediate: true });

const { data: projects } = await useAsyncData('projects-archive-list', () =>
    queryCollection('projects')
        .where('draft', '=', false)
        .order('date', 'DESC')
        .limit(limit)
        .skip((currentPage.value - 1) * limit)
        .all(),
    { watch: [currentPage] }
);

useSeoMeta({
    title: 'Projects archive — Łukasz Dzieło',
    description: 'Full archive of Front-End projects by Łukasz Dzieło.',
});

const hasContent = (project: any): boolean => {
    const body = project?.body as { value?: unknown[] } | undefined;
    return Array.isArray(body?.value) && body!.value!.length > 0;
};
</script>

<template>
    <section class="container my-15 sm:my-20 md:my-30 flex flex-col gap-10">

        <header class="flex flex-col gap-5">
            <div
                class="flex items-center gap-2.5 font-medium after:content-[''] after:block after:w-12 after:h-0.75 after:bg-sky-500 after:rounded-full">
                <span class="opacity-40">01</span>
                <span class="opacity-40">/</span>
                <span class="font-semibold uppercase">Archive</span>
            </div>
            <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-pretty">
                All <em class="text-sky-500">projects</em>
            </h1>
            <p>
                <NuxtLink to="/projects" class="text-sky-500 underline underline-offset-4">
                    ← Back to featured
                </NuxtLink>
            </p>
        </header>

        <ul v-if="projects?.length" class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <li v-for="project in projects" :key="project.path" class="flex flex-col">
                <NuxtLink v-if="hasContent(project)" :to="project.path" class="block group">
                    <NuxtImg :src="project.image" :alt="project.title" sizes="320px md:400px lg:480px" loading="lazy"
                        class="rounded-md md:rounded-xl lg:rounded-2xl bg-white aspect-video object-cover object-top w-full transition-transform group-hover:scale-[1.02]" />
                    <h2 class="mt-3 font-semibold">{{ project.title }}</h2>
                    <small class="opacity-60">{{ project.date }}</small>
                </NuxtLink>
                <div v-else class="block cursor-default">
                    <NuxtImg :src="project.image" :alt="project.title" sizes="320px md:400px lg:480px" loading="lazy"
                        class="rounded-md md:rounded-xl lg:rounded-2xl bg-white aspect-video object-cover object-top w-full" />
                    <h2 class="mt-3 font-semibold">{{ project.title }}</h2>
                    <small class="opacity-60">{{ project.date }}</small>
                </div>
            </li>
        </ul>
        <p v-else class="opacity-60">No projects yet.</p>

        <ThePagination :current-page="currentPage" :total-pages="totalPages" />
    </section>
</template>
