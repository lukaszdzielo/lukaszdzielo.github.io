<script setup lang="ts">
const { data: projects } = await useAsyncData('projects-home-list', () =>
    queryCollection('projects')
        .where('draft', '=', false)
        .where('featured', '=', true)
        .order('date', 'DESC')
        .limit(8)
        .all(),
);

const homeProjects = computed(() => projects.value ?? []);

const hasContent = (project: any): boolean => {
    const body = project?.body as { value?: unknown[] } | undefined;
    return Array.isArray(body?.value) && body!.value!.length > 0;
};

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
    <section class="my-15 sm:my-20 md:my-30 flex flex-col gap-10">

        <div class="container flex flex-col gap-5">
            <div
                class="flex items-center gap-2 font-medium after:content-[''] after:block after:w-12 after:h-0.75 after:bg-sky-500 after:rounded-full">
                <span class="opacity-40">01</span>
                <span class="opacity-40">/</span>
                <span class="font-semibold uppercase">Projects</span>
            </div>
            <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-pretty">
                Bringing <em class="text-sky-500">pixels</em> to life
            </h2>
        </div>

        <div class="container flex flex-col gap-8">
            <ul v-if="homeProjects.length" class="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <li v-for="project in homeProjects" :key="project.path" class="flex flex-col">
                    <NuxtLink v-if="hasContent(project)" :to="project.path" class="block group">
                        <NuxtImg :src="project.image" :alt="project.title" sizes="320px md:400px lg:480px"
                            loading="lazy"
                            class="rounded-md md:rounded-xl lg:rounded-2xl bg-white aspect-video object-cover object-top w-full transition-transform group-hover:scale-[1.02]" />
                        <h3 class="mt-3 font-semibold">{{ project.title }}</h3>
                        <small class="opacity-60">{{ formatDate(project.date) }}</small>
                    </NuxtLink>
                    <div v-else class="block cursor-default">
                        <NuxtImg :src="project.image" :alt="project.title" sizes="320px md:400px lg:480px"
                            loading="lazy"
                            class="rounded-md md:rounded-xl lg:rounded-2xl bg-white aspect-video object-cover object-top w-full" />
                        <h3 class="mt-3 font-semibold">{{ project.title }}</h3>
                        <!-- <small class="opacity-60">{{ formatDate(project.date) }}</small> -->
                    </div>
                </li>
            </ul>
            <p v-else class="opacity-60">No featured projects yet.</p>

            <!-- <p>
                <NuxtLink to="/projects" class="text-sky-500 underline underline-offset-4">
                    See all projects →
                </NuxtLink>
            </p> -->
        </div>
    </section>
</template>
