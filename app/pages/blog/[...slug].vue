<script setup lang="ts">
import { PERSON_ID, SITE_NAME, SITE_URL, pageUrl } from '~/data/site';

const { t, locale } = useI18n({ useScope: 'local' });
const route = useRoute();
const { col, clean, withLocale } = useContentLocale();
const path = clean(route.path);

const { data: post } = await useAsyncData('blog-' + path, () =>
    queryCollection(col('blog'))
        .where('draft', '=', false)
        .path(path)
        .first()
);

// Project this article was written about (via `project:` in frontmatter).
const { data: relatedProject } = await useAsyncData('blog-project-' + path, () => {
    const projectPath = post.value?.project ? withLocale(post.value.project) : undefined;
    if (!projectPath) return Promise.resolve(null);
    return queryCollection(col('projects'))
        .where('draft', '=', false)
        .path(projectPath)
        .first();
});

useSiteMeta({
    title: post.value?.title ? `${post.value.title} – Łukasz Dzieło` : t('meta.fallbackTitle'),
    description: post.value?.description || undefined,
    image: post.value?.ogImage,
});

if (post.value) {
    useJsonLd('post', {
        '@type': 'BlogPosting',
        headline: post.value.title,
        description: post.value.description || undefined,
        datePublished: post.value.date || undefined,
        inLanguage: locale.value === 'pl' ? 'pl-PL' : 'en-US',
        mainEntityOfPage: pageUrl(route.path),
        image: post.value.ogImage ? `${SITE_URL}${post.value.ogImage}` : undefined,
        author: { '@type': 'Person', '@id': PERSON_ID, name: SITE_NAME, url: `${SITE_URL}/` },
    });
}
</script>

<template>
    <section v-if="post && hasBody(post)"
        class="w-[calc(100%-40px)] sm:w-4/5 max-w-3xl mx-auto py-15 sm:py-20 md:py-30">
        <header class="flex flex-col gap-4 mb-8 sm:mb-10">
            <h1 class="text-2xl lg:text-3xl xl:text-4xl font-extrabold">
                {{ post.title }}
            </h1>

            <div class="flex flex-col gap-3 text-sm">
                <div class="flex flex-wrap items-center gap-3">
                    <time v-if="post.date" :datetime="post.date">
                        {{ formatDate(post.date, locale) }}
                    </time>
                    <span v-if="post.kind === 'case-study'"
                        class="rounded-full bg-sky-500/10 text-sky-600 dark:text-sky-400 px-2.5 py-0.5 text-xs font-medium">
                        {{ t('caseStudy') }}
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
            <CommonPicture v-if="relatedProject.image" :src="relatedProject.image" :alt="relatedProject.title" sizes="96px" width="192" height="108" :modifiers="{ position: 'top' }" loading="lazy"
                class="w-24 shrink-0 rounded-md aspect-video object-cover object-top bg-white" />
            <div class="flex flex-col gap-0.5">
                <small class="text-xs uppercase tracking-wide text-slate-600 dark:text-slate-400">
                    {{ t('aboutProject') }}
                </small>
                <span class="font-semibold group-hover:text-sky-500 transition-colors">
                    {{ relatedProject.title }}
                </span>
            </div>
        </NuxtLink>

        <article class="prose max-w-none prose-code:rounded-md prose-code:bg-primary-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-medium prose-code:before:content-none prose-code:after:content-none dark:prose-code:bg-primary-400/15">
            <ContentRenderer :value="post" />
        </article>
    </section>

    <!-- Nie ma takiego wpisu (albo to szkic) -->
    <CommonNotFound v-else variant="post" />
</template>

<i18n lang="json">
{
    "en": {
        "meta": { "fallbackTitle": "Post – Łukasz Dzieło" },
        "caseStudy": "Case study",
        "aboutProject": "About the project"
    },
    "pl": {
        "meta": { "fallbackTitle": "Wpis – Łukasz Dzieło" },
        "caseStudy": "Case study",
        "aboutProject": "O projekcie"
    }
}
</i18n>
