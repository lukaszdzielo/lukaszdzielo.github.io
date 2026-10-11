<script setup lang="ts">
const route = useRoute();

const { data: project } = await useAsyncData('project-' + route.path, () =>
    queryCollection('projects')
        .where('draft', '=', false)
        .path(route.path)
        .first()
);

// Articles written about this project (linked via `project:` in blog frontmatter).
const { data: relatedPosts } = await useAsyncData('project-posts-' + route.path, () =>
    queryCollection('blog')
        .where('draft', '=', false)
        .where('project', '=', route.path)
        .order('date', 'DESC')
        .all()
);

const caseStudies = computed(() => (relatedPosts.value ?? []).filter(post => post.kind === 'case-study'));
const relatedArticles = computed(() => (relatedPosts.value ?? []).filter(post => post.kind !== 'case-study'));

// A project earns a dedicated page with body content or at least one linked
// article; otherwise it only appears as a card in the lists and this route
// renders a noindex fallback.
const hasOwnPage = computed(() => hasBody(project.value) || (relatedPosts.value?.length ?? 0) > 0);

const externalLinks = computed(() => [
    { label: 'Live site', href: project.value?.links?.live },
    { label: 'Behance', href: project.value?.links?.behance },
    { label: 'GitHub', href: project.value?.links?.github },
].filter((link): link is { label: string; href: string } => Boolean(link.href)));

useSeoMeta({
    title: project.value?.title ? `${project.value.title} — Łukasz Dzieło` : 'Project — Łukasz Dzieło',
    description: project.value?.description || undefined,
    ...(project.value && !hasOwnPage.value ? { robots: 'noindex, follow' } : {}),
});
</script>

<template>
    <!-- Full project page: body content and/or linked articles -->
    <section v-if="project && hasOwnPage"
        class="w-[calc(100%-40px)] sm:w-4/5 max-w-3xl mx-auto py-15 sm:py-20 md:py-30 flex flex-col gap-10">
        <header class="flex flex-col gap-4">
            <h1 class="text-2xl lg:text-3xl xl:text-4xl font-extrabold text-balance">
                {{ project.title }}
            </h1>

            <div class="flex flex-col gap-3 text-sm">
                <time v-if="project.date" :datetime="project.date">
                    {{ formatDate(project.date) }}
                </time>
                <p v-if="project.agency" class="text-slate-500 dark:text-slate-400">
                    Agency: {{ project.agency }}
                </p>
                <ul v-if="project.tags?.length" class="flex flex-wrap gap-2">
                    <li v-for="tag in project.tags" :key="tag">
                        <span class="inline-block rounded-full bg-slate-300 dark:bg-slate-600 px-3 py-1">
                            #{{ tag }}
                        </span>
                    </li>
                </ul>
                <ul v-if="externalLinks.length" class="flex flex-wrap gap-x-4 gap-y-1">
                    <li v-for="link in externalLinks" :key="link.label">
                        <a :href="link.href" target="_blank" rel="noopener noreferrer"
                            class="inline-flex items-center gap-1 font-medium text-sky-600 dark:text-sky-400 hover:underline underline-offset-4">
                            {{ link.label }}
                            <Icon name="lucide:arrow-up-right" aria-hidden="true" />
                        </a>
                    </li>
                </ul>
            </div>
        </header>

        <article v-if="hasBody(project)" class="prose max-w-none text-pretty">
            <ContentRenderer :value="project" />
        </article>

        <section v-if="caseStudies.length" class="flex flex-col gap-4">
            <h2 class="text-xl font-bold">Case studies</h2>
            <ul class="grid gap-4">
                <li v-for="post in caseStudies" :key="post.path">
                    <NuxtLink :to="post.path"
                        class="block group border border-slate-200 dark:border-slate-700 rounded-xl p-5 transition-colors hover:border-sky-500">
                        <small>{{ formatDate(post.date) }}</small>
                        <h3 class="mt-1 font-semibold text-balance group-hover:text-sky-500">{{ post.title }}</h3>
                        <p class="mt-1 text-sm text-pretty">{{ post.description }}</p>
                    </NuxtLink>
                </li>
            </ul>
        </section>

        <section v-if="relatedArticles.length" class="flex flex-col gap-4">
            <h2 class="text-xl font-bold">Related posts</h2>
            <ul class="grid gap-4">
                <li v-for="post in relatedArticles" :key="post.path">
                    <NuxtLink :to="post.path"
                        class="block group border border-slate-200 dark:border-slate-700 rounded-xl p-5 transition-colors hover:border-sky-500">
                        <small>{{ formatDate(post.date) }}</small>
                        <h3 class="mt-1 font-semibold text-balance group-hover:text-sky-500">{{ post.title }}</h3>
                        <p class="mt-1 text-sm text-pretty">{{ post.description }}</p>
                    </NuxtLink>
                </li>
            </ul>
        </section>

        <p>
            <NuxtLink to="/projects" class="text-sky-500 underline underline-offset-4">
                ← Back to projects
            </NuxtLink>
        </p>
    </section>

    <!-- Project exists but only has basic info — no dedicated page -->
    <section v-else-if="project" class="w-[calc(100%-40px)] sm:w-4/5 max-w-3xl mx-auto py-15 sm:py-20 md:py-30">
        <div class="flex flex-col gap-5 items-start">
            <h1 class="text-2xl sm:text-3xl md:text-4xl font-extrabold">
                {{ project.title }}
            </h1>
            <p class="text-slate-600 dark:text-slate-400">
                This project doesn't have a dedicated page — you can find it in the projects list.
            </p>
            <ul v-if="externalLinks.length" class="flex flex-wrap gap-x-4 gap-y-1">
                <li v-for="link in externalLinks" :key="link.label">
                    <a :href="link.href" target="_blank" rel="noopener noreferrer"
                        class="inline-flex items-center gap-1 font-medium text-sky-600 dark:text-sky-400 hover:underline underline-offset-4">
                        {{ link.label }}
                        <Icon name="lucide:arrow-up-right" aria-hidden="true" />
                    </a>
                </li>
            </ul>
            <div>
                <NuxtLink to="/projects" class="text-sky-500 underline underline-offset-4">
                    ← Back to projects
                </NuxtLink>
            </div>
        </div>
    </section>

    <!-- Unknown path -->
    <section v-else class="w-[calc(100%-40px)] sm:w-4/5 max-w-3xl mx-auto py-15 sm:py-20 md:py-30">
        <div class="flex flex-col gap-5 items-start">
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
