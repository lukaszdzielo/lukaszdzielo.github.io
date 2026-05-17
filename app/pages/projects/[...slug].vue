<script setup lang="ts">
const route = useRoute();

const { data: project } = await useAsyncData('project-' + route.path, () =>
    queryCollection('projects')
        .where('draft', '=', false)
        .path(route.path)
        .first()
);

const hasRenderableContent = computed(() => {
    const body = project.value?.body as { value?: unknown[] } | undefined;
    return Array.isArray(body?.value) && body!.value!.length > 0;
});

useSeoMeta({
    title: project.value?.title ? `${project.value.title} — Łukasz Dzieło` : 'Project — Łukasz Dzieło',
    description: project.value?.description || undefined,
});
</script>

<template>
    <section class="container my-15 sm:my-20 md:my-30">
        <template v-if="project && hasRenderableContent">
            <ContentRenderer :value="project" />
        </template>

        <div v-else class="flex flex-col gap-5 items-start">
            <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                Page not found
            </h1>
            <div>
                <NuxtLink to="/projects" class="text-sky-500 underline underline-offset-4">
                    ← Back to projects
                </NuxtLink>
            </div>
        </div>
    </section>
</template>
