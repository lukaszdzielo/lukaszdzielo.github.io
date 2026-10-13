<script setup lang="ts">
import { PERSON_ID, SITE_NAME, pageUrl } from '~/data/site';

const { t, locale } = useI18n({ useScope: 'local' });
// localLink, bo `link` to już zmienna pętli po linkach zewnętrznych w szablonie
const localLink = useLocalLink();
const route = useRoute();
const { col, clean, withoutLocale } = useContentLocale();
const path = clean(route.path);

const { data: project } = await useAsyncData('project-' + path, () =>
    queryCollection(col('projects'))
        .where('draft', '=', false)
        .path(path)
        .first()
);

// Wpisy o tym projekcie (powiązane polem `project:` we wpisie).
// `project:` we wpisie ma ścieżkę bez języka (/projects/…), więc porównujemy bez przedrostka /pl
const { data: relatedPosts } = await useAsyncData('project-posts-' + path, () =>
    queryCollection(col('blog'))
        .where('draft', '=', false)
        .where('project', '=', withoutLocale(path))
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
    { label: t('links.live'), href: project.value?.links?.live },
    { label: 'Behance', href: project.value?.links?.behance },
    { label: 'GitHub', href: project.value?.links?.github },
].filter((link): link is { label: string; href: string } => Boolean(link.href)));

useSiteMeta({
    title: project.value?.title ? `${project.value.title} – Łukasz Dzieło` : t('meta.fallbackTitle'),
    description: project.value?.description || undefined,
    ...(project.value && !hasOwnPage.value ? { robots: 'noindex, follow' } : {}),
});

// Dane strukturalne – tylko dla projektów z własną podstroną (pozostałe mają noindex)
if (project.value && hasOwnPage.value) {
    useJsonLd('project', {
        '@type': 'CreativeWork',
        name: project.value.title,
        description: project.value.description || undefined,
        dateCreated: project.value.date || undefined,
        keywords: project.value.tags?.join(', ') || undefined,
        url: pageUrl(route.path),
        inLanguage: locale.value === 'pl' ? 'pl-PL' : 'en-US',
        author: { '@type': 'Person', '@id': PERSON_ID, name: SITE_NAME },
        ...(project.value.links?.live ? { sameAs: project.value.links.live } : {}),
    });
}
</script>

<template>
    <!-- Full project page: body content and/or linked articles -->
    <section v-if="project && hasOwnPage"
        class="w-[calc(100%-40px)] sm:w-4/5 max-w-3xl mx-auto py-15 sm:py-20 md:py-30 flex flex-col gap-10">
        <header class="flex flex-col gap-4">
            <h1 class="text-2xl lg:text-3xl xl:text-4xl font-extrabold">
                {{ project.title }}
            </h1>

            <div class="flex flex-col gap-3 text-sm">
                <time v-if="project.date" :datetime="project.date">
                    {{ formatDate(project.date, locale) }}
                </time>
                <p v-if="project.agency" class="text-slate-500 dark:text-slate-400">
                    {{ t('agency', { agency: project.agency }) }}
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

        <article v-if="hasBody(project)" class="prose max-w-none">
            <ContentRenderer :value="project" />
        </article>

        <section v-if="caseStudies.length" class="flex flex-col gap-4">
            <h2 class="text-xl font-bold">{{ t('caseStudy') }}</h2>
            <ul class="grid gap-4">
                <li v-for="post in caseStudies" :key="post.path">
                    <NuxtLink :to="post.path"
                        class="block group border border-slate-200 dark:border-slate-700 rounded-xl p-5 transition-colors hover:border-sky-500">
                        <small>{{ formatDate(post.date, locale) }}</small>
                        <h3 class="mt-1 font-semibold group-hover:text-sky-500">{{ post.title }}</h3>
                        <p class="mt-1 text-sm">{{ post.description }}</p>
                    </NuxtLink>
                </li>
            </ul>
        </section>

        <section v-if="relatedArticles.length" class="flex flex-col gap-4">
            <h2 class="text-xl font-bold">{{ t('relatedPosts') }}</h2>
            <ul class="grid gap-4">
                <li v-for="post in relatedArticles" :key="post.path">
                    <NuxtLink :to="post.path"
                        class="block group border border-slate-200 dark:border-slate-700 rounded-xl p-5 transition-colors hover:border-sky-500">
                        <small>{{ formatDate(post.date, locale) }}</small>
                        <h3 class="mt-1 font-semibold group-hover:text-sky-500">{{ post.title }}</h3>
                        <p class="mt-1 text-sm">{{ post.description }}</p>
                    </NuxtLink>
                </li>
            </ul>
        </section>

        <p>
            <NuxtLink :to="localLink('/projects#archive')" class="text-sky-500 underline underline-offset-4">
                {{ t('allProjects') }}
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
                {{ t('noPage') }}
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
                <NuxtLink :to="localLink('/projects#archive')" class="text-sky-500 underline underline-offset-4">
                    {{ t('allProjects') }}
                </NuxtLink>
            </div>
        </div>
    </section>

    <!-- Unknown path -->
    <CommonNotFound v-else variant="project" />
</template>

<i18n lang="json">
{
    "en": {
        "meta": { "fallbackTitle": "Project – Łukasz Dzieło" },
        "links": { "live": "Website" },
        "agency": "Agency: {agency}",
        "caseStudy": "Case study",
        "relatedPosts": "Posts about this project",
        "allProjects": "← All projects",
        "noPage": "This project has no separate page – you can find it in the project archive."
    },
    "pl": {
        "meta": { "fallbackTitle": "Projekt – Łukasz Dzieło" },
        "links": { "live": "Strona" },
        "agency": "Agencja: {agency}",
        "caseStudy": "Case study",
        "relatedPosts": "Wpisy o tym projekcie",
        "allProjects": "← Wszystkie projekty",
        "noPage": "Ten projekt nie ma osobnej strony – znajdziesz go w archiwum projektów."
    }
}
</i18n>
