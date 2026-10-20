<script setup lang="ts">
import { PERSON_ID, SITE_NAME, SITE_URL, pageUrl } from '~/data/site';

// Adres w każdym języku – po polsku polskie nazwy części adresu (app/utils/localeRoutes.ts)
definePageMeta({ i18n: { paths: { en: '/blog/[...slug]', pl: '/wpisy/[...slug]' } } })

const { t, locale } = useI18n({ useScope: 'local' });
const localLink = useLocalLink();
const route = useRoute();
const { col, clean, withLocale } = useContentLocale();
const path = clean(route.path);

const { data: post } = await useAsyncData('blog-' + path, () =>
    queryCollection(col('blog'))
        .where('draft', '=', false)
        .path(path)
        .first()
);

// Ten sam wpis w drugim języku (to samo `translationKey`) – adres może być inny, bo powstaje z tytułu.
// Przełącznik języka i hreflang (switchLocalePath) dostają z setI18nParams właściwy adres drugiej wersji.
const otherLang = locale.value === 'pl' ? 'en' : 'pl';
const { data: translation } = await useAsyncData('blog-translation-' + path, () => {
    const key = post.value?.translationKey;
    if (!key) return Promise.resolve(null);
    return queryCollection(otherLang === 'pl' ? 'blog_pl' : 'blog_en')
        .where('draft', '=', false)
        .where('translationKey', '=', key)
        .select('path')
        .first();
});
// części adresu po /blog albo /pl/wpisy, np. ['2026', 'tabela-jak-arkusz']
const slugOf = (p: string) => p.replace(/^(\/pl)?\/(blog|wpisy)\//, '').split('/');
const setI18nParams = useSetI18nParams();
if (post.value && translation.value) {
    setI18nParams({
        [locale.value]: { slug: slugOf(post.value.path) },
        [otherLang]: { slug: slugOf(translation.value.path) },
    });
}

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
        // edycja po publikacji (pole `updated` we frontmatterze); bez niej data publikacji
        dateModified: post.value.updated || post.value.date || undefined,
        // tematy z tagów (np. „tailwind”, „wordpress-blocks” → „wordpress blocks”)
        keywords: post.value.tags?.map((tag) => tag.replace(/-/g, ' ')).join(', ') || undefined,
        inLanguage: locale.value === 'pl' ? 'pl-PL' : 'en-US',
        mainEntityOfPage: pageUrl(route.path),
        // projekt, o którym jest wpis – to samo @id co w danych strony projektu
        ...(relatedProject.value ? {
            about: { '@type': 'CreativeWork', '@id': `${pageUrl(relatedProject.value.path)}#project`, name: relatedProject.value.title, url: pageUrl(relatedProject.value.path) },
        } : {}),
        image: post.value.ogImage ? `${SITE_URL}${post.value.ogImage}` : undefined,
        author: { '@type': 'Person', '@id': PERSON_ID, name: SITE_NAME, url: `${SITE_URL}/` },
        publisher: { '@type': 'Person', '@id': PERSON_ID, name: SITE_NAME, url: `${SITE_URL}/` },
    });
    // Okruszki jak w widocznej nawigacji: Strona główna → Wpisy → tytuł (ostatni element bez adresu)
    useJsonLd('breadcrumb', {
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('breadcrumb.home'), item: pageUrl(localLink('/')) },
            { '@type': 'ListItem', position: 2, name: t('breadcrumb.blog'), item: pageUrl(localLink('/blog')) },
            { '@type': 'ListItem', position: 3, name: post.value.title },
        ],
    });
}

// Temat wpisu do nadtytułu w banerze (pierwszy tag), przy case study z dopiskiem „Case study”
const kicker = computed(() =>
    [post.value?.kind === 'case-study' ? t('caseStudy') : '', post.value?.tags?.[0]?.replace(/-/g, ' ')]
        .filter(Boolean)
        .join(' · ')
);

// Spis treści od 3 śródtytułów (h2) – przy 1–2 nie ma czego spisywać
const tocLinks = computed(() => (post.value?.body?.toc?.links ?? []).filter((link: { depth: number }) => link.depth === 2));
const showToc = computed(() => tocLinks.value.length >= 3);
// Pełny adres wpisu do udostępniania
const shareUrl = computed(() => pageUrl(route.path));
</script>

<template>
    <!-- Wpis: granatowy baner z tytułem i rysunkiem (zasady: archiwum zasady/wpisy-banery.md), pod nim treść,
         a w dłuższych wpisach spis treści po prawej -->
    <div v-if="post && hasBody(post)">
        <header class="relative isolate pt-14 sm:pt-22">
            <div class="hero-glow pointer-events-none absolute inset-x-0 -top-18.25 -z-10 h-375" aria-hidden="true" />
            <div class="container">
                <nav :aria-label="t('breadcrumb.label')" class="text-sm text-slate-600 dark:text-slate-400">
                    <NuxtLink :to="localLink('/')" class="text-primary-500 underline underline-offset-4 dark:text-primary-400">{{ t('breadcrumb.home') }}</NuxtLink>
                    <span aria-hidden="true"> / </span>
                    <NuxtLink :to="localLink('/blog')" class="text-primary-500 underline underline-offset-4 dark:text-primary-400">{{ t('breadcrumb.blog') }}</NuxtLink>
                </nav>

                <div class="relative isolate mt-6 overflow-hidden rounded-3xl bg-linear-[150deg] from-brand-700 to-brand-950 px-6 py-8 text-white sm:px-10 sm:py-10 lg:px-14 lg:py-14 dark:ring-1 dark:ring-white/10">
                    <div class="pointer-events-none absolute -top-1/3 -right-1/12 aspect-square w-3/5 rounded-full bg-radial from-primary-400/45 to-transparent to-65%" aria-hidden="true" />
                    <div class="relative grid items-center gap-2 lg:grid-cols-12 lg:gap-10">
                        <!-- Rysunek: do lg nad tekstem – wchodzi z prawego górnego rogu, przycięty krawędzią banera (jak na kartach wpisów).
                             Od lg w prawej kolumnie (kolumny 8–12), zawsze od jej lewej krawędzi: szerokość kolumny, ale co najmniej 440 px –
                             na węższych ekranach wychodzi tylko w prawo, za krawędź banera -->
                        <img v-if="post.art" :src="post.art" alt="" width="480" height="300"
                            class="pointer-events-none -mt-15 -mr-9 -mb-5 w-64 max-w-none justify-self-end opacity-60 sm:-mt-24 sm:-mr-16 sm:w-80 lg:order-last lg:col-span-5 lg:m-0 lg:w-full lg:min-w-110 lg:justify-self-start lg:opacity-100" />
                        <div :class="post.art ? 'lg:col-span-7' : 'lg:col-span-10'">
                            <p v-if="kicker" class="text-xs font-semibold tracking-widest text-primary-300 uppercase">{{ kicker }}</p>
                            <h1 class="mt-4 text-3xl leading-tight font-semibold tracking-tight sm:text-4xl lg:text-5xl">{{ post.title }}</h1>
                            <p v-if="post.description" class="mt-5 max-w-160 text-base/relaxed text-slate-300 sm:text-lg/relaxed">{{ post.description }}</p>
                            <div class="mt-6 flex flex-wrap items-center gap-2 text-sm text-slate-300">
                                <time v-if="post.date" :datetime="post.date" class="mr-2">{{ formatDate(post.date, locale) }}</time>
                                <span v-for="tag in post.tags" :key="tag" class="rounded-full bg-white/10 px-3 py-1 text-xs text-slate-200">#{{ tag }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>

        <div class="container py-12 sm:py-16 lg:py-20">
            <div class="grid gap-12 lg:grid-cols-[minmax(0,48rem)_18rem] lg:justify-between">
                <div class="min-w-0 max-w-3xl">
                    <NuxtLink v-if="relatedProject" :to="relatedProject.path"
                        class="group mb-10 flex items-center gap-4 rounded-2xl border border-slate-900/10 bg-white p-4 shadow-sm transition-colors hover:border-primary-500 dark:border-white/10 dark:bg-brand-900 dark:hover:border-primary-400">
                        <CommonPicture v-if="relatedProject.image" :src="relatedProject.image" :alt="relatedProject.title" sizes="96px" width="192" height="108" :modifiers="{ position: 'top' }" loading="lazy"
                            class="aspect-video w-24 shrink-0 rounded-md bg-white object-cover object-top" />
                        <div class="flex flex-col gap-0.5">
                            <small class="text-xs tracking-wide text-slate-600 uppercase dark:text-slate-400">{{ t('aboutProject') }}</small>
                            <span class="font-semibold text-slate-900 transition-colors group-hover:text-primary-500 dark:text-brand-50 dark:group-hover:text-primary-400">{{ relatedProject.title }}</span>
                        </div>
                    </NuxtLink>

                    <article class="prose max-w-none sm:prose-lg prose-headings:scroll-mt-24 prose-code:rounded-md prose-code:bg-primary-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-medium prose-code:before:content-none prose-code:after:content-none dark:prose-code:bg-primary-400/15">
                        <ContentRenderer :value="post" />
                    </article>

                    <!-- Dopisek o pisaniu wpisów z pomocą AI – na końcu każdego wpisu (PL i EN) -->
                    <p id="ai-note" class="mt-12 flex gap-3 border-t border-slate-900/10 pt-6 text-sm/relaxed text-slate-600 dark:border-white/10 dark:text-slate-400">
                        <Icon name="lucide:sparkles" class="mt-1 size-4 shrink-0 text-primary-500 dark:text-primary-400" aria-hidden="true" />
                        <span>{{ t('aiNote') }}</span>
                    </p>

                    <!-- Udostępnianie pod treścią – na telefonie i tablecie (od lg jest w kolumnie obok) -->
                    <BlogShare :url="shareUrl" :title="post.title" class="mt-12 border-t border-slate-900/10 pt-8 lg:hidden dark:border-white/10" />
                </div>

                <!-- Kolumna obok treści (od lg): spis treści i udostępnianie, przyklejone przy przewijaniu -->
                <aside class="hidden lg:block">
                  <div class="sticky top-24 grid gap-4">
                    <nav v-if="showToc" :aria-label="t('toc')" class="rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-brand-900">
                        <h2 class="text-xs font-semibold tracking-widest text-slate-600 uppercase dark:text-slate-400">{{ t('toc') }}</h2>
                        <ol class="mt-4 grid gap-2.5 text-sm text-slate-600 dark:text-slate-300">
                            <li v-for="(link, i) in tocLinks" :key="link.id" class="flex items-baseline gap-2.5">
                                <span class="text-xs font-semibold text-primary-500 tabular-nums dark:text-primary-400">{{ String(i + 1).padStart(2, '0') }}</span>
                                <a :href="`#${link.id}`" class="hover:text-primary-500 dark:hover:text-primary-400">{{ link.text }}</a>
                            </li>
                        </ol>
                    </nav>
                    <BlogShare :url="shareUrl" :title="post.title" class="rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-brand-900" />
                  </div>
                </aside>
            </div>
        </div>

        <!-- Formularz na końcu wpisu – bez przechodzenia na stronę główną -->
        <SectionsHomeContact />
    </div>

    <!-- Nie ma takiego wpisu (albo to szkic) -->
    <CommonNotFound v-else variant="post" />
</template>

<i18n lang="json">
{
    "en": {
        "meta": { "fallbackTitle": "Post – Łukasz Dzieło" },
        "breadcrumb": { "label": "Breadcrumb", "home": "Home", "blog": "Posts" },
        "caseStudy": "Case study",
        "aboutProject": "Project",
        "toc": "In this post",
        "aiNote": "AI helps me edit my posts: I explain what I did and why, and AI puts my thoughts in order, turns them into clear text and translates it into English. The projects, decisions and experience are mine."
    },
    "pl": {
        "meta": { "fallbackTitle": "Wpis – Łukasz Dzieło" },
        "breadcrumb": { "label": "Okruszki", "home": "Strona główna", "blog": "Wpisy" },
        "caseStudy": "Case study",
        "aboutProject": "Projekt",
        "toc": "W tym wpisie",
        "aiNote": "W obróbce tekstu pomaga mi AI: opowiadam, co zrobiłem i dlaczego, a AI porządkuje moje myśli, układa je w spójny tekst i tłumaczy na angielski. Projekty, decyzje i doświadczenia są moje."
    }
}
</i18n>
