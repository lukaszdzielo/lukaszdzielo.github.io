<script setup lang="ts">
// Projekty: nagłówek z liczbami, wyróżnione kafelki (te same co na głównej) i archiwum z filtrem.
// Link z filtrem: /projects?tech=wordpress#archive (np. z oferty dla firm).
import { projectKind } from '~/utils/projectKind'
import { visibleFeaturedProjects } from '~/data/featuredProjects'

const { t } = useI18n({ useScope: 'local' })
const link = useLocalLink()

const { col, lang, withoutLocale } = useContentLocale()
const { data: projects } = await useAsyncData(`projects-archive-all-${lang.value}`, () =>
  queryCollection(col('projects'))
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all(),
)

const { data: linkedProjectPaths } = await useLinkedProjectPaths()
const linkedPaths = computed(() => new Set(linkedProjectPaths.value ?? []))

// Wyróżnione (app/data/featuredProjects.ts) rozpoznajemy po tytule – w archiwum dostają odznakę
const featuredTitles = new Set(visibleFeaturedProjects(lang.value).map(p => p.title.toLocaleLowerCase(lang.value)))

const archive = computed(() =>
  (projects.value ?? []).map(p => ({
    path: p.path,
    title: p.title,
    date: p.date,
    tags: p.tags,
    agency: p.agency,
    image: p.image,
    links: p.links,
    hasPage: hasBody(p) || linkedPaths.value.has(withoutLocale(p.path)),
    featured: featuredTitles.has(p.title.toLocaleLowerCase(lang.value)),
  })),
)

const total = computed(() => archive.value.length)
const wordpress = computed(() => archive.value.filter(p => projectKind(p.tags) === 'wordpress').length)
const since = computed(() => archive.value.reduce((min, p) => (p.date < min ? p.date : min), '9999').slice(0, 4))

useSiteMeta({
  title: t('meta.title'),
  description: t('meta.description'),
  image: `/og/projects-${lang.value}.jpg`,
  imageAlt: t('meta.title'),
})
</script>

<template>
  <div>
    <header class="relative isolate pt-14 sm:pt-22">
      <CommonCodeBackdrop name="hero" class="top-5 max-lg:hidden" />
      <div class="container">
        <nav :aria-label="t('breadcrumb.label')" class="text-sm text-slate-600 dark:text-slate-400">
          <NuxtLink :to="link('/')" class="text-primary-500 underline underline-offset-4 dark:text-primary-400">{{ t('breadcrumb.home') }}</NuxtLink>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">{{ t('title') }}</span>
        </nav>
        <h1 class="mt-3.5 text-5xl leading-none font-semibold tracking-tighter text-slate-900 sm:mt-5 lg:text-7xl dark:text-brand-50">
          {{ t('title') }}
        </h1>
        <p class="mt-4 max-w-160 text-base/relaxed text-slate-600 sm:mt-6 sm:text-lg/relaxed dark:text-slate-300">
          {{ t('lead', { year: since }) }}
        </p>
        <!-- Podpisy pod liczbami odmieniają się: t('…', n) – 1 projekt, 2 projekty, 5 projektów -->
        <dl class="mt-7 flex max-w-180 gap-5 border-t border-slate-900/16 pt-4.5 sm:mt-10 sm:gap-10 sm:pt-6 dark:border-white/20">
          <div>
            <dt class="sr-only">{{ t('stats.projectsTerm') }}</dt>
            <dd class="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl dark:text-brand-50">{{ total }}</dd>
            <dd class="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-400">{{ t('stats.projects', total) }}</dd>
          </div>
          <div>
            <dt class="sr-only">WordPress</dt>
            <dd class="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl dark:text-brand-50">{{ wordpress }}</dd>
            <dd class="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-400">{{ t('stats.wordpress', wordpress) }}</dd>
          </div>
          <div>
            <dt class="sr-only">{{ t('stats.sinceTerm') }}</dt>
            <dd class="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl dark:text-brand-50">{{ t('stats.since', { year: since }) }}</dd>
            <dd class="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-400">{{ t('stats.inArchive') }}</dd>
          </div>
        </dl>
      </div>
    </header>

    <SectionsHomePortfolio
      id="featured"
      :title="t('featured.title')"
      :lead="t('featured.lead')"
      :all-link="false"
      :backdrop="false"
    />

    <section id="archive" class="relative isolate scroll-mt-4 pt-20 pb-22 md:pt-28 lg:pt-37.5 lg:pb-27.5">
      <CommonCodeBackdrop name="services" class="top-6" />
      <div class="container">
        <CommonSectionHead
          :title="t('archive.title')"
          :lead="t('archive.lead')"
        />
        <div class="mt-8 lg:mt-10">
          <ProjectsArchive :projects="archive" />
        </div>
      </div>
    </section>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "meta": {
      "title": "Projects – Łukasz Dzieło",
      "description": "Apps I work on in teams, projects I learn from, and business websites I've built since 2016."
    },
    "breadcrumb": { "label": "Breadcrumb", "home": "Home" },
    "title": "Projects",
    "lead": "Apps I work on in teams, projects I learn from, and business websites I've built since {year}.",
    "stats": {
      "projectsTerm": "Projects",
      "projects": "project | projects",
      "wordpress": "WordPress site | WordPress sites",
      "sinceTerm": "Since",
      "since": "since {year}",
      "inArchive": "in the archive"
    },
    "featured": {
      "title": "Featured",
      "lead": "Projects that best show how I work today."
    },
    "archive": {
      "title": "Archive",
      "lead": "Websites and apps from 2016–2026 – at agencies, in teams and as my own freelance work."
    }
  },
  "pl": {
    "meta": {
      "title": "Projekty – Łukasz Dzieło",
      "description": "Aplikacje, nad którymi pracuję w zespołach, projekty, na których się uczę, i strony dla firm, które robiłem od 2016 roku."
    },
    "breadcrumb": { "label": "Okruszki", "home": "Strona główna" },
    "title": "Projekty",
    "lead": "Aplikacje, nad którymi pracuję w zespołach, projekty, na których się uczę, i strony dla firm, które robiłem od {year} roku.",
    "stats": {
      "projectsTerm": "Projekty",
      "projects": "projekt | projekty | projektów",
      "wordpress": "strona na WordPressie | strony na WordPressie | stron na WordPressie",
      "sinceTerm": "Od roku",
      "since": "od {year}",
      "inArchive": "w archiwum"
    },
    "featured": {
      "title": "Wyróżnione",
      "lead": "Projekty, które najlepiej pokazują, jak dziś pracuję."
    },
    "archive": {
      "title": "Archiwum",
      "lead": "Strony i aplikacje z lat 2016–2026 – w agencjach, w zespołach i jako zlecenia własne."
    }
  }
}
</i18n>
