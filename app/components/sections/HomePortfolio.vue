<script setup lang="ts">
import ProjectCard from '~/components/common/ProjectCard.vue';

const { data: projects } = await useAsyncData('projects-home-list', () =>
    queryCollection('projects')
        .where('draft', '=', false)
        .where('featured', '=', true)
        .order('date', 'DESC')
        .limit(8)
        .all(),
);

const homeProjects = computed(() => projects.value ?? []);

const { data: linkedProjectPaths } = await useLinkedProjectPaths();
const linkedPaths = computed(() => new Set(linkedProjectPaths.value ?? []));

const hasPage = (project: { path: string; body?: { value?: unknown[] } | null }): boolean =>
    hasBody(project) || linkedPaths.value.has(project.path);

// Alternative: hand-pick specific projects by slug.
// Replace `homeProjects` above with this when you want manual curation.
// const manualSlugs: string[] = ['rund', 'key-drummond'];
// const homeProjects = computed(() =>
//     manualSlugs
//         .map(slug => (projects.value ?? []).find(p => p.path?.endsWith('/' + slug)))
//         .filter((p): p is NonNullable<typeof p> => Boolean(p))
// );
</script>

<template>
    <section class="py-20 md:py-30 flex flex-col gap-10 bg-slate-200 dark:bg-slate-700">

        <div class="container flex flex-col gap-5">
            <div
                class="flex items-center gap-2 font-medium after:content-[''] after:block after:w-12 after:h-0.75 after:bg-sky-500 after:rounded-full">
                <span class="text-slate-400 dark:text-slate-500">01</span>
                <span class="text-slate-400 dark:text-slate-500">/</span>
                <span class="font-semibold uppercase">Projects</span>
            </div>
            <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-pretty">
                Bringing <span class="text-sky-500">pixels</span> to life
            </h2>
        </div>

        <div class="container flex flex-col gap-8">
            <ul v-if="homeProjects.length" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <li v-for="project in homeProjects" :key="project.path" class="flex flex-col">
                    <ProjectCard :project="project" :has-page="hasPage(project)" title-tag="h3" />
                </li>
            </ul>
            <p v-else class="">No featured projects yet.</p>

            <div v-if="homeProjects.length" class="flex justify-center">
                <NuxtLink to="/projects"
                    class="group inline-flex items-center gap-1.5 rounded-full border border-sky-500 px-4 py-1.5 text-sm font-medium text-sky-600 dark:text-sky-400 transition-colors hover:bg-sky-500 hover:text-white dark:hover:text-white">
                    See more projects
                    <Icon name="lucide:arrow-right"
                        class="transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
