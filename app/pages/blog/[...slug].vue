<script setup lang="ts">
const route = useRoute();

const { data: post } = await useAsyncData('blog-' + route.path, () =>
    queryCollection('blog')
        .where('draft', '=', false)
        .path(route.path)
        .first()
);

// Project this article was written about (via `project:` in frontmatter).
const { data: relatedProject } = await useAsyncData('blog-project-' + route.path, () => {
    const projectPath = post.value?.project;
    if (!projectPath) return Promise.resolve(null);
    return queryCollection('projects')
        .where('draft', '=', false)
        .path(projectPath)
        .first();
});

useSeoMeta({
    title: post.value?.title ? `${post.value.title} — Łukasz Dzieło` : 'Blog — Łukasz Dzieło',
    description: post.value?.description || undefined,
});
</script>

<template>
    <section v-if="post && hasBody(post)"
        class="w-[calc(100%-40px)] sm:w-4/5 max-w-3xl mx-auto py-15 sm:py-20 md:py-30">
        <header class="flex flex-col gap-4 mb-8 sm:mb-10">
            <h1 class="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-balance">
                {{ post.title }}
            </h1>

            <div class="flex flex-col gap-3 text-sm">
                <div class="flex flex-wrap items-center gap-3">
                    <time v-if="post.date" :datetime="post.date">
                        {{ formatDate(post.date) }}
                    </time>
                    <span v-if="post.kind === 'case-study'"
                        class="rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 px-2.5 py-0.5 text-xs font-medium">
                        Case study
                    </span>
                </div>
                <ul v-if="post.tags?.length" class="flex flex-wrap gap-2">
                    <li v-for="tag in post.tags" :key="tag">
                        <span class="inline-block rounded-full bg-slate-300 dark:bg-slate-600 px-3 py-1">
                            #{{ tag }}
                        </span>
                    </li>
                </ul>
            </div>
        </header>

        <NuxtLink v-if="relatedProject" :to="relatedProject.path"
            class="group flex items-center gap-4 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-8 sm:mb-10 transition-colors hover:border-sky-500">
            <CommonPicture v-if="relatedProject.image" :src="relatedProject.image" :alt="relatedProject.title" sizes="96px"
                class="w-24 shrink-0 rounded-md aspect-video object-cover object-top bg-white" />
            <div class="flex flex-col gap-0.5">
                <small class="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">
                    About this project
                </small>
                <span class="font-semibold group-hover:text-sky-500 transition-colors">
                    {{ relatedProject.title }}
                </span>
            </div>
        </NuxtLink>

        <article class="prose max-w-none text-pretty">
            <ContentRenderer :value="post" />
        </article>
    </section>

    <!-- Nie ma takiego wpisu (albo to szkic) -->
    <CommonNotFound v-else variant="post" />
</template>
