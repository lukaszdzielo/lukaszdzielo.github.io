<script setup lang="ts">
import { PERSON_ID, SITE_NAME, SITE_URL, pageUrl } from '~/data/site';

// Adres w każdym języku – po polsku polskie nazwy części adresu (app/utils/localeRoutes.ts)
definePageMeta({ i18n: { paths: { en: '/projects/[...slug]', pl: '/projekty/[...slug]' } } })

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

// Case study najpierw, potem pozostałe wpisy od najnowszego
const orderedPosts = computed(() => [
    ...(relatedPosts.value ?? []).filter(post => post.kind === 'case-study'),
    ...(relatedPosts.value ?? []).filter(post => post.kind !== 'case-study'),
]);

// Pasek wpisów przewijany w bok (tablet i telefon) – strzałki pod nim
const postsScroller = useTemplateRef<HTMLElement>('postsScroller');

// Technologie pod opisem: pole `stack`, a gdy go nie ma – tagi
const stack = computed(() => project.value?.stack ?? project.value?.tags ?? []);

// A project earns a dedicated page with body content or at least one linked
// article; otherwise it only appears as a card in the lists and this route
// renders a noindex fallback.
const hasOwnPage = computed(() => hasBody(project.value) || (relatedPosts.value?.length ?? 0) > 0);

const externalLinks = computed(() => [
    { label: t('links.live'), href: project.value?.links?.live },
    { label: 'Behance', href: project.value?.links?.behance },
    { label: 'GitHub', href: project.value?.links?.github },
].filter((link): link is { label: string; href: string } => Boolean(link.href)));

// Adres w pasku okna przeglądarki nad zrzutem: strona na żywo bez https:// i końcowego „/”
const address = computed(() => project.value?.links?.live?.replace(/^https?:\/\//, '').replace(/\/$/, ''));

// Przyciski obok „Zobacz na żywo” (obrysowane): kod na GitHubie, Behance
const secondaryLinks = computed(() => [
    { label: t('links.github'), href: project.value?.links?.github },
    { label: 'Behance', href: project.value?.links?.behance },
].filter((link): link is { label: string; href: string } => Boolean(link.href)));

useSiteMeta({
    title: project.value?.title ? `${project.value.title} – Łukasz Dzieło` : t('meta.fallbackTitle'),
    description: project.value?.description || undefined,
    // własny obrazek podglądu (pole ogImage), inaczej obrazek strony głównej w języku strony
    image: project.value?.ogImage || undefined,
    imageAlt: project.value?.ogImage ? project.value.title : undefined,
    ...(project.value && !hasOwnPage.value ? { robots: 'noindex, follow' } : {}),
});

// Słowa kluczowe: pełna lista technologii (stack), potem tagi. Tag pomijamy, gdy ta technologia jest już w stacku
// (wielkość liter i wersja bez znaczenia: „vue” przy „Vue 3”, „tailwind” przy „Tailwind CSS v4”).
function projectKeywords(stack: string[] = [], tags: string[] = []) {
    // bez polskich i innych znaków diakrytycznych: „PokéAPI” = „pokeapi”
    const plain = (word: string) => word.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase();
    const inStack = new Set(stack.map((item) => plain(item).split(/\s+/)[0]));
    const extraTags = tags.map((tag) => tag.replace(/-/g, ' ')).filter((tag) => !inStack.has(plain(tag)));
    return [...stack, ...extraTags].join(', ');
}

// Dane strukturalne – tylko dla projektów z własną podstroną (pozostałe mają noindex)
if (project.value && hasOwnPage.value) {
    useJsonLd('project', {
        '@type': 'CreativeWork',
        // @id – wpisy o projekcie wskazują na niego w polu about
        '@id': `${pageUrl(route.path)}#project`,
        name: project.value.title,
        description: project.value.description || undefined,
        dateCreated: project.value.date || undefined,
        keywords: projectKeywords(project.value.stack, project.value.tags) || undefined,
        url: pageUrl(route.path),
        inLanguage: locale.value === 'pl' ? 'pl-PL' : 'en-US',
        author: { '@type': 'Person', '@id': PERSON_ID, name: SITE_NAME, url: `${SITE_URL}/` },
        ...(project.value.links?.live ? { sameAs: project.value.links.live } : {}),
        ...(project.value.ogImage ? { image: SITE_URL + project.value.ogImage } : {}),
    });
    // Okruszki jak w widocznej nawigacji: Strona główna → Projekty → tytuł (ostatni element bez adresu)
    useJsonLd('breadcrumb', {
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: t('breadcrumb.home'), item: pageUrl(localLink('/')) },
            { '@type': 'ListItem', position: 2, name: t('breadcrumb.projects'), item: pageUrl(localLink('/projects')) },
            { '@type': 'ListItem', position: 3, name: project.value.title },
        ],
    });
}
</script>

<template>
    <!-- Strona projektu: hero ze zrzutem, pasek faktów, „Co zbudowałem” (treść pliku md), „Przed i po”, galeria, case study i wpisy -->
    <div v-if="project && hasOwnPage">
        <header class="relative isolate pt-14 sm:pt-22">
            <div class="hero-glow pointer-events-none absolute inset-x-0 -top-18.25 -z-10 h-375" aria-hidden="true" />
            <div class="container">
                <nav :aria-label="t('breadcrumb.label')" class="text-sm text-slate-600 dark:text-slate-400">
                    <NuxtLink :to="localLink('/')" class="text-primary-500 underline underline-offset-4 dark:text-primary-400">{{ t('breadcrumb.home') }}</NuxtLink>
                    <span aria-hidden="true"> / </span>
                    <NuxtLink :to="localLink('/projects')" class="text-primary-500 underline underline-offset-4 dark:text-primary-400">{{ t('breadcrumb.projects') }}</NuxtLink>
                    <span aria-hidden="true"> / </span>
                    <span aria-current="page">{{ project.title }}</span>
                </nav>

                <div class="grid items-center gap-10 pt-6 pb-10 sm:pt-9 sm:pb-14 lg:grid-cols-5 lg:gap-14">
                    <div class="lg:col-span-2">
                        <h1 class="text-5xl leading-none font-semibold tracking-tighter text-slate-900 lg:text-7xl dark:text-brand-50">
                            {{ project.title }}
                        </h1>
                        <p v-if="project.description" class="mt-5.5 max-w-135 text-base/relaxed text-slate-600 sm:text-lg/relaxed dark:text-slate-300">
                            {{ project.description }}
                        </p>
                        <ul v-if="stack.length" class="mt-6 flex flex-wrap gap-2">
                            <li v-for="item in stack" :key="item"
                                class="rounded-full border border-slate-900/10 bg-white px-2.75 py-1.5 text-xs text-slate-600 dark:border-white/10 dark:bg-brand-900 dark:text-slate-300">
                                {{ item }}
                            </li>
                        </ul>
                        <p v-if="project.note" class="mt-5 text-sm/relaxed text-slate-600 dark:text-slate-400">{{ project.note }}</p>
                        <div v-if="project.links?.live || project.links?.github || project.links?.behance" class="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                            <a v-if="project.links?.live" :href="project.links.live" target="_blank" rel="noopener noreferrer"
                                class="group inline-flex h-14 items-center justify-between gap-3 rounded-full bg-brand-900 pr-2 pl-6 font-medium text-white transition-transform duration-300 motion-safe:hover:-translate-y-0.5 dark:bg-slate-100 dark:text-brand-950">
                                {{ t('links.liveButton') }}
                                <span class="grid size-10 place-items-center rounded-full bg-primary-500 text-white dark:bg-primary-400 dark:text-brand-950">
                                    <Icon name="lucide:arrow-up-right" class="transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
                                </span>
                            </a>
                            <a v-for="link in secondaryLinks" :key="link.label" :href="link.href" target="_blank" rel="noopener noreferrer"
                                class="inline-flex h-14 items-center justify-center gap-2 rounded-full border border-slate-900/16 px-6 font-medium text-slate-900 transition-colors hover:border-primary-500 hover:text-primary-500 dark:border-white/20 dark:text-brand-50 dark:hover:border-primary-400 dark:hover:text-primary-400">
                                {{ link.label }}
                                <Icon name="lucide:arrow-up-right" aria-hidden="true" />
                            </a>
                        </div>
                    </div>

                    <!-- Zrzut w oknie przeglądarki, telefon na pierwszym planie w prawym dolnym rogu.
                         Telefon ma 1/4 szerokości tego pola (maks. 190 px) – przy stałej szerokości był wyższy
                         niż okno przeglądarki i na węższych ekranach (np. 650 px) wchodził na przyciski. -->
                    <div v-if="project.cover" class="relative lg:col-span-3" :class="project.cover.phone && 'pr-10 pb-9 sm:pr-16 sm:pb-12'">
                        <ProjectsBrowserFrame :src="project.cover.desktop" :alt="project.cover.alt || project.title" :address="address"
                            :width="project.cover.width" :height="project.cover.height"
                            sizes="xs:100vw lg:60vw" loading="eager" fetchpriority="high" />
                        <ProjectsPhoneFrame v-if="project.cover.phone" :src="project.cover.phone" alt=""
                            sizes="xs:110px sm:190px" loading="eager"
                            class="absolute right-0 bottom-0 w-1/4 max-w-47.5" />
                    </div>
                </div>
            </div>
        </header>

        <SectionsHomeProof v-if="project.facts?.length" :items="project.facts" />

        <section v-if="hasBody(project)" class="pt-20 md:pt-28 lg:pt-32">
            <div class="container">
                <!-- Od lg: nagłówek po lewej, opis po prawej, a podtytuł z pliku md („Co się zmieniło”) i lista
                     pod spodem na całą szerokość, lista w dwóch kolumnach (style: .project-body w main.css) -->
                <article class="project-body prose max-w-none lg:prose-lg prose-code:rounded-md prose-code:bg-primary-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:font-medium prose-code:before:content-none prose-code:after:content-none dark:prose-code:bg-primary-400/15">
                    <h2 class="project-title not-prose text-3xl font-medium tracking-tight text-slate-900 lg:text-5xl dark:text-brand-50">{{ t('about.title') }}</h2>
                    <ContentRenderer :value="project" />
                </article>
            </div>
        </section>

        <section v-if="project.compare" class="pt-20 md:pt-28 lg:pt-32">
            <div class="container">
                <CommonSectionHead :title="t('compare.title')" :lead="t('compare.lead')" />
                <ProjectsCompare v-bind="project.compare" :address="address" class="mt-8 lg:mt-10" />
            </div>
        </section>

        <section v-if="project.gallery?.length" class="pt-20 md:pt-28 lg:pt-32">
            <div class="container">
                <CommonSectionHead :title="t('gallery.title')" :lead="project.galleryLead || t('gallery.lead')" />
                <ProjectsGallery :items="project.gallery" :address="address" class="mt-8 lg:mt-10" />
            </div>
        </section>

        <!-- Rozwiązania w szczegółach: karty z polem highlights (tytuł + krótki opis); przy nieparzystej liczbie ostatnia karta na całą szerokość -->
        <section v-if="project.highlights?.length" class="pt-20 md:pt-28 lg:pt-32">
            <div class="container">
                <CommonSectionHead :title="t('highlights.title')" :lead="t('highlights.lead')" />
                <ul class="mt-8 grid gap-6 sm:grid-cols-2 lg:mt-10">
                    <li v-for="item in project.highlights" :key="item.title"
                        class="sm:odd:last:col-span-2 rounded-3xl border border-slate-900/10 bg-white p-6 shadow-sm sm:p-8 dark:border-white/10 dark:bg-brand-900">
                        <h3 class="text-lg font-semibold tracking-tight text-slate-900 dark:text-brand-50">{{ item.title }}</h3>
                        <p class="mt-2.5 text-base/relaxed text-slate-600 dark:text-slate-300">{{ item.text }}</p>
                    </li>
                </ul>
            </div>
        </section>

        <section v-if="relatedPosts?.length" class="pt-20 md:pt-28 lg:pt-32">
            <div class="container">
                <CommonSectionHead :title="t('posts.title')" :lead="t('posts.lead')" />
                <!-- Jeden wpis – duża karta na całą szerokość (okładka obok tekstu, jak pierwszy wpis na /blog).
                     Więcej wpisów – jak na głównej: na komputerze po 1/3 szerokości (także przy dwóch), na tablecie i telefonie pasek przewijany w bok;
                     dwa wpisy mieszczą się na tablecie obok siebie, więc tam bez paska -->
                <div v-if="orderedPosts.length === 1" class="mt-8 lg:mt-10">
                    <CommonPostCard :post="orderedPosts[0]!" featured />
                </div>
                <template v-else>
                    <ul
                        ref="postsScroller"
                        class="-mx-pad mt-8 grid snap-x snap-mandatory auto-cols-[84%] grid-flow-col gap-3.5 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-px-pad px-pad pb-2 [scrollbar-width:none] sm:auto-cols-[56%] md:auto-cols-[40%] lg:mx-0 lg:mt-10 lg:grid-flow-row lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
                        :class="orderedPosts.length === 2 && 'md:mx-0 md:grid-flow-row md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0'"
                    >
                        <li v-for="post in orderedPosts" :key="post.path" class="snap-start">
                            <CommonPostCard :post="post" />
                        </li>
                    </ul>
                    <!-- Przy dwóch wpisach pasek i podpowiedź „Przesuń” tylko na telefonie -->
                    <CommonScrollControls :target="postsScroller" :class="orderedPosts.length === 2 && 'md:hidden'" />
                </template>
            </div>
        </section>

        <p class="container pt-14">
            <NuxtLink :to="localLink('/projects#archive')" class="inline-flex items-center gap-2 font-medium text-primary-500 hover:underline underline-offset-4 dark:text-primary-400">
                {{ t('allProjects') }}
            </NuxtLink>
        </p>

        <!-- Formularz na końcu strony projektu – kto chce podobną stronę, pisze od razu, bez przechodzenia na główną -->
        <SectionsHomeContact />
    </div>

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
                        class="inline-flex items-center gap-1 font-medium text-primary-600 dark:text-primary-400 hover:underline underline-offset-4">
                        {{ link.label }}
                        <Icon name="lucide:arrow-up-right" aria-hidden="true" />
                    </a>
                </li>
            </ul>
            <div>
                <NuxtLink :to="localLink('/projects#archive')" class="text-primary-500 underline underline-offset-4">
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
        "links": { "live": "Website", "liveButton": "See it live", "github": "Code on GitHub" },
        "agency": "Agency: {agency}",
        "breadcrumb": { "label": "Breadcrumb", "home": "Home", "projects": "Projects" },
        "about": { "title": "What I built" },
        "gallery": { "title": "How it looks", "lead": "Screenshots of the live project – click one to see it bigger." },
        "compare": { "title": "Before and after", "lead": "Drag the slider – the old site is on the left, the new one on the right." },
        "highlights": { "title": "Solutions in detail", "lead": "Things from the code that show best how I work." },
        "posts": { "title": "Case study and posts", "lead": "How it was made, what went wrong and what I learned." },
        "allProjects": "← All projects",
        "noPage": "This project doesn't have its own page – you'll find it in the project archive."
    },
    "pl": {
        "meta": { "fallbackTitle": "Projekt – Łukasz Dzieło" },
        "links": { "live": "Strona", "liveButton": "Zobacz na żywo", "github": "Kod na GitHubie" },
        "agency": "Agencja: {agency}",
        "breadcrumb": { "label": "Okruszki", "home": "Strona główna", "projects": "Projekty" },
        "about": { "title": "Co zbudowałem" },
        "gallery": { "title": "Jak to wygląda", "lead": "Zrzuty z działającego projektu – kliknij zrzut, żeby go powiększyć." },
        "compare": { "title": "Przed i po", "lead": "Przeciągnij suwak – po lewej stara strona, po prawej nowa." },
        "highlights": { "title": "Rozwiązania w szczegółach", "lead": "Rzeczy z kodu, które najlepiej pokazują, jak pracuję." },
        "posts": { "title": "Case study i wpisy", "lead": "Jak to powstało, co poszło nie tak i czego się nauczyłem." },
        "allProjects": "← Wszystkie projekty",
        "noPage": "Ten projekt nie ma osobnej strony – znajdziesz go w archiwum projektów."
    }
}
</i18n>
