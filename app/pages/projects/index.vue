<script setup lang="ts">
// Projekty: nagłówek z liczbami, wyróżnione kafelki (te same co na głównej) i archiwum z filtrem.
// Link z filtrem: /projects?tech=wordpress#archive (np. z oferty dla firm).
import { projectKind } from '~/utils/projectKind'
import { visibleFeaturedProjects } from '~/data/featuredProjects'

const { data: projects } = await useAsyncData('projects-archive-all', () =>
  queryCollection('projects')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .all(),
)

const { data: linkedProjectPaths } = await useLinkedProjectPaths()
const linkedPaths = computed(() => new Set(linkedProjectPaths.value ?? []))

// Wyróżnione (app/data/featuredProjects.ts) rozpoznajemy po tytule – w archiwum dostają odznakę
const featuredTitles = new Set(visibleFeaturedProjects().map(p => p.title.toLocaleLowerCase('pl')))

const archive = computed(() =>
  (projects.value ?? []).map(p => ({
    path: p.path,
    title: p.title,
    date: p.date,
    tags: p.tags,
    agency: p.agency,
    image: p.image,
    links: p.links,
    hasPage: hasBody(p) || linkedPaths.value.has(p.path),
    featured: featuredTitles.has(p.title.toLocaleLowerCase('pl')),
  })),
)

const total = computed(() => archive.value.length)
const wordpress = computed(() => archive.value.filter(p => projectKind(p.tags) === 'wordpress').length)
const since = computed(() => archive.value.reduce((min, p) => (p.date < min ? p.date : min), '9999').slice(0, 4))

useSeoMeta({
  title: 'Projekty – Łukasz Dzieło',
  description: 'Aplikacje, nad którymi pracuję w zespołach, projekty, na których się uczę, i strony dla firm, które robiłem od 2016 roku.',
})
</script>

<template>
  <div>
    <header class="relative isolate pt-14 sm:pt-22">
      <CommonCodeBackdrop name="hero" class="top-5 max-lg:hidden" />
      <div class="container">
        <nav aria-label="Okruszki" class="text-sm text-slate-500 dark:text-slate-400">
          <NuxtLink to="/" class="text-primary-500 hover:underline dark:text-primary-400">Strona główna</NuxtLink>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Projekty</span>
        </nav>
        <h1 class="mt-3.5 text-5xl leading-none font-semibold tracking-tighter text-slate-900 sm:mt-5 lg:text-7xl dark:text-brand-50">
          Projekty
        </h1>
        <p class="mt-4 max-w-160 text-base/relaxed text-slate-600 sm:mt-6 sm:text-lg/relaxed dark:text-slate-300">
          Aplikacje, nad którymi pracuję w zespołach, projekty, na których się uczę, i strony dla firm, które robiłem od {{ since }} roku.
        </p>
        <dl class="mt-7 flex max-w-180 gap-5 border-t border-slate-900/16 pt-4.5 sm:mt-10 sm:gap-10 sm:pt-6 dark:border-white/20">
          <div>
            <dt class="sr-only">Projekty</dt>
            <dd class="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl dark:text-brand-50">{{ total }}</dd>
            <dd class="mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">projektów</dd>
          </div>
          <div>
            <dt class="sr-only">WordPress</dt>
            <dd class="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl dark:text-brand-50">{{ wordpress }}</dd>
            <dd class="mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">stron na WordPressie</dd>
          </div>
          <div>
            <dt class="sr-only">Od roku</dt>
            <dd class="text-2xl font-medium tracking-tight text-slate-900 sm:text-3xl dark:text-brand-50">od {{ since }}</dd>
            <dd class="mt-1 text-xs text-slate-500 sm:text-sm dark:text-slate-400">w archiwum</dd>
          </div>
        </dl>
      </div>
    </header>

    <SectionsHomePortfolio
      id="featured"
      title="Wyróżnione"
      lead="Projekty, które najlepiej pokazują, jak dziś pracuję."
      :all-link="false"
      :backdrop="false"
    />

    <section id="archive" class="relative isolate scroll-mt-4 pt-20 pb-22 md:pt-28 lg:pt-37.5 lg:pb-27.5">
      <CommonCodeBackdrop name="services" class="top-6" />
      <div class="container">
        <CommonSectionHead
          title="Archiwum"
          lead="Strony i aplikacje z lat 2016–2026 – w agencjach, w zespołach i jako zlecenia własne."
        />
        <div class="mt-8 lg:mt-10">
          <ProjectsArchive :projects="archive" />
        </div>
      </div>
    </section>
  </div>
</template>
