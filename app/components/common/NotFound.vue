<script setup lang="ts">
// Strona błędu 404 w trzech odmianach – zależnie od adresu:
//   /blog/…     → „Tego wpisu tu nie ma” + powrót do listy wpisów,
//   /projects/… → „Tego projektu tu nie ma” + powrót do projektów,
//   reszta      → „Tej strony tu nie ma” + powrót na stronę główną.
// Na GitHub Pages każdy nieistniejący adres dostaje 404.html, a aplikacja po starcie
// sama rozpoznaje adres – dlatego odmianę wybieramy po ścieżce, a nie po kodzie z serwera.
// Ścieżkę porównujemy bez przedrostka /pl (withoutLocale), a linki prowadzą do wersji w aktualnym języku (link()).
type Variant = 'page' | 'post' | 'project' | 'error'

const props = defineProps<{ variant?: Variant; path?: string }>()

// Lista wpisów
const POSTS_LIST = '/blog'

const { t } = useI18n({ useScope: 'local' })
const link = useLocalLink()
const { col, lang, withoutLocale } = useContentLocale()

const route = useRoute()
const currentPath = computed(() => props.path ?? route.path)

const variant = computed<Variant>(() => {
  if (props.variant) return props.variant
  const path = withoutLocale(currentPath.value)
  if (path.startsWith('/blog')) return 'post'
  if (path.startsWith('/projects')) return 'project'
  return 'page'
})

const copy = computed(() => ({
  page: {
    title: t('page.title'),
    lead: t('page.lead'),
    primary: { to: link('/'), label: t('links.home'), icon: 'lucide:arrow-left' },
    secondary: { to: link('/projects'), label: t('links.projects') },
  },
  post: {
    title: t('post.title'),
    lead: t('post.lead'),
    primary: { to: link(POSTS_LIST), label: t('links.posts'), icon: 'lucide:arrow-left' },
    secondary: { to: link('/'), label: t('links.home') },
  },
  project: {
    title: t('project.title'),
    lead: t('project.lead'),
    primary: { to: link('/projects#archive'), label: t('links.archive'), icon: 'lucide:arrow-left' },
    secondary: { to: link('/'), label: t('links.home') },
  },
  error: {
    title: t('error.title'),
    lead: t('error.lead'),
    primary: { to: link('/'), label: t('links.home'), icon: 'lucide:arrow-left' },
    secondary: { to: link('/#contact'), label: t('links.contact') },
  },
})[variant.value])

const accent = computed(() => (variant.value === 'error' ? t('accent.error') : t('accent.missing')))
const code = computed(() => (variant.value === 'error' ? '500' : '404'))

// Przy wpisie podpowiadamy najnowsze (gdy jakieś są opublikowane)
const { data: latest } = await useAsyncData(`not-found-posts-${lang.value}`, () =>
  queryCollection(col('blog')).where('draft', '=', false).order('date', 'DESC').limit(3).all(),
)
const suggestions = computed(() => (variant.value === 'post' ? latest.value ?? [] : []))

useSiteMeta({
  title: variant.value === 'error' ? t('meta.error') : t('meta.notFound'),
  robots: 'noindex, follow',
})
</script>

<template>
  <section class="relative isolate">
    <div class="hero-glow pointer-events-none absolute inset-x-0 -top-18.25 -z-10 h-250" aria-hidden="true" />
    <CommonCodeBackdrop name="notFound" side="right" class="bottom-8 max-lg:hidden" />

    <div class="container grid grid-cols-1 items-center gap-8 py-12 sm:py-16 lg:min-h-160 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:gap-12 lg:py-20">
      <!-- Duże „404” – SVG, więc skaluje się szerokością (na telefonie nad tekstem) -->
      <svg
        viewBox="0 0 600 260"
        class="w-60 text-primary-500 sm:w-80 lg:order-last lg:w-full dark:text-primary-400"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="nf-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="currentColor" stop-opacity="0.95" />
            <stop offset="1" stop-color="currentColor" stop-opacity="0.12" />
          </linearGradient>
        </defs>
        <text
          x="300"
          y="222"
          text-anchor="middle"
          fill="url(#nf-fill)"
          font-size="262"
          font-weight="600"
          letter-spacing="-14"
          font-family="inherit"
        >{{ code }}</text>
      </svg>

      <div class="max-w-140 min-w-0">
        <p class="text-sm font-semibold tracking-widest text-primary-500 uppercase dark:text-primary-400">
          {{ t('label', { code }) }}
        </p>
        <h1 class="mt-4 text-4xl leading-none font-semibold tracking-tighter text-slate-900 sm:text-5xl lg:text-6xl dark:text-brand-50">
          <span class="block">{{ copy.title }}</span>
          <span class="block pt-[0.08em] text-primary-500 dark:text-primary-400">{{ accent }}</span>
        </h1>
        <p class="mt-5.5 max-w-112.5 text-base/relaxed text-slate-600 dark:text-slate-300">{{ copy.lead }}</p>

        <!-- Adres, pod który ktoś trafił – jak w pasku przeglądarki -->
        <p
          v-if="variant !== 'error'"
          class="mt-6 flex max-w-full items-center gap-2.5 overflow-hidden rounded-full border border-slate-900/10 bg-white py-2 pr-4 pl-2 text-sm text-slate-600 dark:border-white/10 dark:bg-brand-900 dark:text-slate-400"
        >
          <span class="shrink-0 rounded-full bg-red-500/10 px-2.5 py-0.5 text-xs font-semibold text-red-600 dark:bg-red-400/14 dark:text-red-300">404</span>
          <code class="truncate font-mono text-xs sm:text-sm">lukaszdzielo.github.io{{ currentPath }}</code>
        </p>

        <div class="mt-8 flex flex-wrap items-center gap-3">
          <NuxtLink
            :to="copy.primary.to"
            class="group inline-flex h-14 items-center gap-3 rounded-full bg-brand-900 pr-6 pl-2 font-medium text-white transition-transform duration-300 motion-safe:hover:-translate-y-0.5 dark:bg-slate-100 dark:text-brand-950"
          >
            <span class="grid size-10 place-items-center rounded-full bg-primary-500 text-white dark:bg-primary-400 dark:text-brand-950">
              <Icon :name="copy.primary.icon" class="size-4 transition-transform motion-safe:group-hover:-translate-x-0.5" aria-hidden="true" />
            </span>
            {{ copy.primary.label }}
          </NuxtLink>
          <NuxtLink
            :to="copy.secondary.to"
            class="inline-flex h-14 items-center rounded-full border border-slate-900/16 px-6 font-medium text-slate-900 transition-colors hover:bg-white dark:border-white/20 dark:text-brand-50 dark:hover:bg-brand-900"
          >
            {{ copy.secondary.label }}
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Wpis: najnowsze wpisy pod spodem -->
    <div v-if="suggestions.length" class="container pb-22 md:pb-28">
      <h2 class="text-2xl font-medium tracking-tight text-slate-900 dark:text-brand-50">{{ t('latest') }}</h2>
      <ul class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <li v-for="post in suggestions" :key="post.path">
          <CommonPostCard :post="post" />
        </li>
      </ul>
    </div>
  </section>
</template>

<i18n lang="json">
{
  "en": {
    "label": "Error {code}",
    "page": {
      "title": "This page",
      "lead": "The address may have changed or the page was removed. Check it for typos, or start from the home page."
    },
    "post": {
      "title": "This post",
      "lead": "The post may have been removed or moved to a new address. You'll find the other posts in the list."
    },
    "project": {
      "title": "This project",
      "lead": "The project may have moved to a new address. All projects – with a filter and search – are in the archive."
    },
    "error": {
      "title": "Something went",
      "lead": "The page didn't load correctly. Refresh it or go back to the home page."
    },
    "accent": { "missing": "isn't here.", "error": "wrong." },
    "links": {
      "home": "Home page",
      "projects": "See projects",
      "posts": "Back to posts",
      "archive": "All projects",
      "contact": "Let me know"
    },
    "latest": "Latest posts",
    "meta": { "notFound": "Page not found – Łukasz Dzieło", "error": "Error – Łukasz Dzieło" }
  },
  "pl": {
    "label": "Błąd {code}",
    "page": {
      "title": "Tej strony",
      "lead": "Adres mógł się zmienić albo strona została usunięta. Sprawdź, czy nie ma w nim literówki, albo zacznij od strony głównej."
    },
    "post": {
      "title": "Tego wpisu",
      "lead": "Wpis mógł zostać usunięty albo zmienił adres. Pozostałe wpisy znajdziesz na liście."
    },
    "project": {
      "title": "Tego projektu",
      "lead": "Projekt mógł zmienić adres. Wszystkie projekty – z filtrem i wyszukiwarką – są w archiwum."
    },
    "error": {
      "title": "Coś poszło",
      "lead": "Strona nie załadowała się poprawnie. Odśwież ją albo wróć na stronę główną."
    },
    "accent": { "missing": "tu nie ma.", "error": "nie tak." },
    "links": {
      "home": "Strona główna",
      "projects": "Zobacz projekty",
      "posts": "Wróć do wpisów",
      "archive": "Wszystkie projekty",
      "contact": "Daj mi znać"
    },
    "latest": "Najnowsze wpisy",
    "meta": { "notFound": "Nie znaleziono strony – Łukasz Dzieło", "error": "Błąd – Łukasz Dzieło" }
  }
}
</i18n>
