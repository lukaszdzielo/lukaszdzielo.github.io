<script setup lang="ts">
// Lista wpisów (/blog i /blog/page/N). Strona 1: wyróżniony wpis na całą szerokość + 4 rzędy po 3,
// kolejne strony: po 12 (app/utils/blogPaging.ts). Strona spoza zakresu → 404.
const props = defineProps<{ page: number }>()

const { data: total } = await useAsyncData('blog-count', () =>
  queryCollection('blog').where('draft', '=', false).count(),
)
const pages = computed(() => blogPageCount(total.value ?? 0))

if (props.page < 1 || props.page > pages.value) {
  throw createError({ statusCode: 404, statusMessage: 'Nie ma takiej strony wpisów', fatal: true })
}

const { data: posts } = await useAsyncData(`blog-page-${props.page}`, () =>
  queryCollection('blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .skip(blogSkip(props.page))
    .limit(blogLimit(props.page))
    .all(),
)

const featured = computed(() => (props.page === 1 ? posts.value?.[0] : undefined))
const rest = computed(() => (props.page === 1 ? posts.value?.slice(1) : posts.value) ?? [])

const from = computed(() => blogSkip(props.page) + 1)
const to = computed(() => blogSkip(props.page) + (posts.value?.length ?? 0))

useSiteMeta({
  title: props.page === 1 ? 'Wpisy – Łukasz Dzieło' : `Wpisy – strona ${props.page} z ${pages.value} – Łukasz Dzieło`,
  description: 'Case study i krótsze wpisy – o tym, co zbudowałem, poprawiłem i czego się nauczyłem.',
})
</script>

<template>
  <div>
    <section class="relative isolate">
      <div class="hero-glow pointer-events-none absolute inset-x-0 -top-18.25 -z-10 h-250" aria-hidden="true" />
      <CommonCodeBackdrop name="posts" side="right" class="top-6 max-lg:hidden" />

      <div class="container pt-12 sm:pt-16">
        <p class="text-sm text-slate-500 dark:text-slate-400">
          <NuxtLink to="/" class="text-primary-500 dark:text-primary-400">Strona główna</NuxtLink>
          <template v-if="page === 1"> / Wpisy</template>
          <template v-else> / <NuxtLink to="/blog" class="text-primary-500 dark:text-primary-400">Wpisy</NuxtLink> / Strona {{ page }}</template>
        </p>
        <h1 class="mt-5 text-4xl leading-none font-semibold tracking-tighter text-slate-900 sm:text-5xl lg:text-6xl dark:text-brand-50">
          Wpisy<template v-if="page > 1"> – strona {{ page }} z {{ pages }}</template>
        </h1>
        <p v-if="page === 1" class="mt-5 max-w-135 text-base/relaxed text-slate-600 dark:text-slate-300">
          Case study z moich projektów i krótsze wpisy o tym, co zbudowałem, poprawiłem i czego się przy tym nauczyłem.
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
          <p class="text-sm text-slate-500 max-sm:hidden dark:text-slate-400">
            Wpisy <b class="font-medium text-slate-900 dark:text-brand-50">{{ from }}–{{ to }}</b> z {{ total }}
          </p>
          <CommonPagination :page="page" :pages="pages" :path-for="blogPagePath" class="sm:min-w-0" />
        </div>
      </template>

      <!-- Stan pusty (wszystkie wpisy to jeszcze szkice) -->
      <div
        v-else
        class="flex flex-col items-center gap-3 rounded-3xl border border-dashed border-slate-900/15 px-6 py-14 text-center dark:border-white/15"
      >
        <span class="grid size-12 place-items-center rounded-full bg-primary-500/10 text-primary-500 dark:bg-primary-400/10 dark:text-primary-400">
          <Icon name="lucide:pen-line" class="text-xl" aria-hidden="true" />
        </span>
        <p class="text-lg font-semibold text-slate-900 dark:text-brand-50">Aktualnie brak wpisów</p>
        <p class="max-w-md text-base/relaxed text-slate-500 dark:text-slate-400">
          Pierwsze case study i wpisy o tym, nad czym pracuję, pojawią się tutaj wkrótce.
        </p>
        <NuxtLink to="/projects" class="mt-2 font-medium text-primary-500 dark:text-primary-400">Zobacz projekty →</NuxtLink>
      </div>
    </section>

    <SectionsHomeContact />
  </div>
</template>
