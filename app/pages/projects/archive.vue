<script setup lang="ts">
import ProjectCard from '~/components/common/ProjectCard.vue';
import ThePagination from '~/components/common/ThePagination.vue';

const route = useRoute();
const limit = 24;

const { data: total } = await useAsyncData('projects-archive-count', () =>
    queryCollection('projects')
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

const { data: projects } = await useAsyncData(
    () => `projects-archive-list-${currentPage.value}`,
    () => queryCollection('projects')
        .where('draft', '=', false)
        .order('date', 'DESC')
        .limit(limit)
        .skip((currentPage.value - 1) * limit)
        .all(),
    { watch: [currentPage] }
);

const { data: linkedProjectPaths } = await useLinkedProjectPaths();
const linkedPaths = computed(() => new Set(linkedProjectPaths.value ?? []));

const hasPage = (project: { path: string; body?: { value?: unknown[] } | null }): boolean =>
    hasBody(project) || linkedPaths.value.has(project.path);

useSeoMeta({
    title: 'Projects archive — Łukasz Dzieło',
    description: 'Full archive of Front-End projects by Łukasz Dzieło.',
});
</script>

<template>
    <section class="container my-15 sm:my-20 md:my-30 flex flex-col gap-10">

        <header class="flex flex-col gap-5">
            <div
                class="flex items-center gap-2 font-medium after:content-[''] after:block after:w-12 after:h-0.75 after:bg-sky-500 after:rounded-full">
                <span>01</span>
                <span>/</span>
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
                <ProjectCard :project="project" :has-page="hasPage(project)" />
            </li>
        </ul>
        <p v-else>No projects yet.</p>

        <ThePagination :current-page="currentPage" :total-pages="totalPages" base-path="/projects/archive" />
    </section>
</template>
