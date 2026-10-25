<script setup lang="ts">
import { PERSON_ID, SITE_NAME, SITE_URL, pageUrl } from '~/data/site'
// Lista wpisów (/blog i /blog/page/N). Strona 1: wyróżniony wpis na całą szerokość + 4 rzędy po 3,
// kolejne strony: po 12 (app/utils/blogPaging.ts). Strona spoza zakresu → 404.
const props = defineProps<{ page: number }>()

const { t } = useI18n({ useScope: 'local' })
const link = useLocalLink()
// Adres strony listy w języku strony: /blog/page/2 albo /pl/wpisy/strona/2
const pagePath = (n: number) => link(blogPagePath(n))

const { col, lang } = useContentLocale()
const { data: total } = await useAsyncData(`blog-count-${lang.value}`, () =>
  queryCollection(col('blog')).where('draft', '=', false).count(),
)
const pages = computed(() => blogPageCount(total.value ?? 0))

if (props.page < 1 || props.page > pages.value) {
  throw createError({ statusCode: 404, statusMessage: t('notFound'), fatal: true })
}

// transform: do payloadu strony trafiają tylko pola używane przez karty wpisów i JSON-LD, nie pełne treści
const { data: posts } = await useAsyncData(`blog-page-${lang.value}-${props.page}`, () =>
  queryCollection(col('blog'))
    .where('draft', '=', false)
    .order('date', 'DESC')
    .skip(blogSkip(props.page))
    .limit(blogLimit(props.page))
    .all(),
  {
    transform: (posts) => posts.map(p => ({
      path: p.path,
      title: p.title,
      description: p.description,
      date: p.date,
      tags: p.tags,
      kind: p.kind,
      image: p.image,
      art: p.art,
    })),
  },
)

const featured = computed(() => (props.page === 1 ? posts.value?.[0] : undefined))
const rest = computed(() => (props.page === 1 ? posts.value?.slice(1) : posts.value) ?? [])

const from = computed(() => blogSkip(props.page) + 1)
const to = computed(() => blogSkip(props.page) + (posts.value?.length ?? 0))

useSiteMeta({
  title: props.page === 1 ? t('meta.title') : t('meta.titlePaged', { page: props.page, pages: pages.value }),
  description: t('meta.description'),
})

// Dane strukturalne: wpisy z tej strony listy (dla Google i wyszukiwarek AI).
// Autor z name i url, nie samo @id – Google czyta JSON-LD osobno na każdej stronie
const route = useRoute()
useJsonLd('blog', {
  '@type': 'CollectionPage',
  name: t('meta.title'),
  description: t('meta.description'),
  url: pageUrl(route.path),
  inLanguage: lang.value === 'pl' ? 'pl-PL' : 'en-US',
  author: { '@type': 'Person', '@id': PERSON_ID, name: SITE_NAME, url: `${SITE_URL}/` },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: (posts.value ?? []).map((post, i) => ({
      '@type': 'ListItem',
      position: blogSkip(props.page) + i + 1,
      name: post.title,
      url: pageUrl(post.path),
    })),
  },
})

// Okruszki jak w widocznej nawigacji: Strona główna → Wpisy, a na dalszych stronach jeszcze „Strona N”
// (ostatni element bez adresu)
useJsonLd('breadcrumb', {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: t('breadcrumb.home'), item: pageUrl(link('/')) },
    ...(props.page === 1
      ? [{ '@type': 'ListItem', position: 2, name: t('title') }]
      : [
          { '@type': 'ListItem', position: 2, name: t('title'), item: pageUrl(link('/blog')) },
          { '@type': 'ListItem', position: 3, name: t('breadcrumb.page', { page: props.page }) },
        ]),
  ],
})
</script>

<template>
  <div>
    <section class="relative isolate">
      <div class="hero-glow pointer-events-none absolute inset-x-0 -top-18.25 -z-10 h-250" aria-hidden="true" />
      <CommonCodeBackdrop name="posts" side="right" class="top-6 max-lg:hidden" />

      <div class="container pt-12 sm:pt-16">
        <p class="text-sm text-slate-600 dark:text-slate-400">
          <NuxtLink :to="link('/')" class="text-primary-500 underline underline-offset-4 dark:text-primary-400">{{ t('breadcrumb.home') }}</NuxtLink>
          <template v-if="page === 1"> / {{ t('title') }}</template>
          <template v-else> / <NuxtLink :to="link('/blog')" class="text-primary-500 dark:text-primary-400">{{ t('title') }}</NuxtLink> / {{ t('breadcrumb.page', { page }) }}</template>
        </p>
        <h1 class="mt-5 text-4xl leading-none font-semibold tracking-tighter text-slate-900 sm:text-5xl lg:text-6xl dark:text-brand-50">
          {{ t('title') }}<template v-if="page > 1"> – {{ t('pageOf', { page, pages }) }}</template>
        </h1>
        <p v-if="page === 1" class="mt-5 max-w-135 text-base/relaxed text-slate-600 dark:text-slate-300">
          {{ t('lead') }}
        </p>
      </div>
    </section>

    <section class="container pt-10 md:pt-14">
      <template v-if="posts?.length">
        <ul class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          <li v-if="featured" class="sm:col-span-2 lg:col-span-3">
            <CommonPostCard :post="featured" featured />
          </li>
          <li v-for="post in rest" :key="post.path">
            <CommonPostCard :post="post" />
          </li>
        </ul>

        <div v-if="pages > 1" class="mt-10 flex flex-col gap-4 border-t border-slate-900/10 pt-6 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <i18n-t keypath="range" tag="p" class="text-sm text-slate-600 max-sm:hidden dark:text-slate-400">
            <template #range><b class="font-medium text-slate-900 dark:text-brand-50">{{ from }}–{{ to }}</b></template>
            <template #total>{{ total }}</template>
          </i18n-t>
          <CommonPagination :page="page" :pages="pages" :path-for="pagePath" class="sm:min-w-0" />
        </div>
      </template>

      <!-- Stan pusty (wszystkie wpisy to jeszcze szkice) -->
      <div
        v-else
        class="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-slate-900/15 px-6 py-14 text-center dark:border-white/15"
      >
        <span class="grid size-12 place-items-center rounded-full bg-primary-500/10 text-primary-500 dark:bg-primary-400/10 dark:text-primary-400">
          <Icon name="lucide:pen-line" class="size-5" aria-hidden="true" />
        </span>
        <p class="text-lg font-semibold text-slate-900 dark:text-brand-50">{{ t('empty.title') }}</p>
        <p class="max-w-md text-base/relaxed text-slate-600 dark:text-slate-400">
          {{ t('empty.text') }}
        </p>
        <NuxtLink :to="link('/projects')" class="mt-2 font-medium text-primary-500 dark:text-primary-400">{{ t('empty.cta') }}</NuxtLink>
      </div>
    </section>

    <SectionsHomeContact />
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "notFound": "This page of posts doesn't exist",
    "meta": {
      "title": "Posts – Łukasz Dzieło",
      "titlePaged": "Posts – page {page} of {pages} – Łukasz Dzieło",
      "description": "Case studies and shorter posts – about what I've built, improved and learned."
    },
    "breadcrumb": { "home": "Home", "page": "Page {page}" },
    "title": "Posts",
    "pageOf": "page {page} of {pages}",
    "lead": "Case studies from my projects and shorter posts about what I've built, improved and learned along the way.",
    "range": "Posts {range} of {total}",
    "empty": {
      "title": "No posts yet",
      "text": "The first case studies and posts about what I'm working on will show up here soon.",
      "cta": "See projects →"
    }
  },
  "pl": {
    "notFound": "Nie ma takiej strony wpisów",
    "meta": {
      "title": "Wpisy – Łukasz Dzieło",
      "titlePaged": "Wpisy – strona {page} z {pages} – Łukasz Dzieło",
      "description": "Case study i krótsze wpisy – o tym, co zbudowałem, poprawiłem i czego się nauczyłem."
    },
    "breadcrumb": { "home": "Strona główna", "page": "Strona {page}" },
    "title": "Wpisy",
    "pageOf": "strona {page} z {pages}",
    "lead": "Case study z moich projektów i krótsze wpisy o tym, co zbudowałem, poprawiłem i czego się przy tym nauczyłem.",
    "range": "Wpisy {range} z {total}",
    "empty": {
      "title": "Aktualnie brak wpisów",
      "text": "Pierwsze case study i wpisy o tym, nad czym pracuję, pojawią się tutaj wkrótce.",
      "cta": "Zobacz projekty →"
    }
  }
}
</i18n>
