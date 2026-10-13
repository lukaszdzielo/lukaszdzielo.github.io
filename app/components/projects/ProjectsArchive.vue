<script setup lang="ts">
// Archiwum projektów: filtr rodzaju (zapisywany w adresie jako ?tech=…), wyszukiwarka i lata.
// Rozwinięte są 3 najnowsze lata, w których są projekty (liczy się lista projektów, nie kalendarz –
// gdy dojdzie pierwszy projekt z 2027, 2024 sam się zwinie). Każdy rok można rozwinąć i zwinąć.
// Filtr rodzaju działa tak samo (3 najnowsze lata z pasującymi projektami rozwinięte) – długa lista
// nie rozwija się cała naraz. Przy wyszukiwaniu rozwijamy wszystko, żeby żaden wynik nie był ukryty.
// Projekty z sekcji „Wyróżnione” mają na miniaturze odznakę.
import { isProjectKind, projectKind, projectKindLabel, projectKindOrder, type ProjectKind } from '~/utils/projectKind'

type ArchiveProject = {
  path: string
  title: string
  date: string
  tags?: string[]
  agency?: string
  image?: string
  links?: { live?: string; behance?: string; github?: string }
  hasPage?: boolean
  featured?: boolean
}

const props = defineProps<{ projects: ArchiveProject[] }>()

const OPEN_YEARS = 3

const { t, locale } = useI18n({ useScope: 'local' })

const route = useRoute()
const router = useRouter()

// Filtr czytamy z adresu dopiero po zamontowaniu – strona jest generowana statycznie bez ?tech,
// więc w HTML zawsze jest pełna lista (bez błędów hydracji).
const kind = ref<ProjectKind | 'all'>('all')
const query = ref('')
// Lata, których stan użytkownik zmienił względem domyślnego (rozwinął starszy albo zwinął nowszy)
const toggled = ref(new Set<string>())

// Paski przewijane w bok (na telefonie i w zwężonym oknie): filtry i lata
const filtersEl = useTemplateRef<HTMLElement>('filtersEl')
const yearsEl = useTemplateRef<HTMLElement>('yearsEl')
const filtersEdges = useScrollEdges(filtersEl)
const yearsEdges = useScrollEdges(yearsEl)
const stripStep = (el: HTMLElement | null) => (el ? el.clientWidth * 0.6 : 200)

onMounted(() => {
  const tech = route.query.tech
  if (isProjectKind(tech)) kind.value = tech
})

function setKind(next: ProjectKind | 'all') {
  kind.value = next
  toggled.value = new Set() // nowy filtr – lata wracają do stanu domyślnego
  const q = { ...route.query }
  if (next === 'all') delete q.tech
  else q.tech = next
  router.replace({ query: q, hash: route.hash })
}

const items = computed(() =>
  props.projects.map(p => ({
    ...p,
    kind: projectKind(p.tags),
    year: p.date.slice(0, 4),
  })),
)

const counts = computed(() => {
  const c: Record<string, number> = { all: items.value.length }
  for (const k of projectKindOrder) c[k] = items.value.filter(p => p.kind === k).length
  return c
})
const kinds = computed(() => projectKindOrder.filter(k => counts.value[k]))

const filtered = computed(() => {
  const lc = (text: string) => text.toLocaleLowerCase(locale.value)
  const q = lc(query.value.trim())
  return items.value.filter(p =>
    (kind.value === 'all' || p.kind === kind.value)
    && (!q || lc(p.title).includes(q) || lc(p.agency ?? '').includes(q)),
  )
})

const years = computed(() => {
  const map = new Map<string, typeof filtered.value>()
  for (const p of filtered.value) map.set(p.year, [...(map.get(p.year) ?? []), p])
  return [...map.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([year, list]) => ({ year, list: list.sort((a, b) => b.date.localeCompare(a.date)) }))
})

const narrowed = computed(() => query.value.trim() !== '')
const isOpen = (year: string, index: number) => narrowed.value || (index < OPEN_YEARS) !== toggled.value.has(year)

async function toggle(year: string, index: number) {
  const wasOpen = isOpen(year, index)
  const next = new Set(toggled.value)
  if (next.has(year)) next.delete(year)
  else next.add(year)
  toggled.value = next
  // Zwinięcie długiego roku podciąga stronę – jeśli początek roku uciekł nad ekran, wracamy do niego
  if (wasOpen) {
    await nextTick()
    const row = document.getElementById(`y${year}`)
    if (row && row.getBoundingClientRect().top < 0) row.scrollIntoView({ block: 'start' })
  }
}
function open(year: string, index: number) {
  if (!isOpen(year, index)) toggle(year, index)
}

// Podpis pod tytułem: rodzaj i agencja / pracodawca. Przy włączonym filtrze rodzaj jest już
// w filtrze, więc go nie powtarzamy. Projekty własne i zlecenia bez agencji – sam rodzaj.
const metaOf = (p: ArchiveProject & { kind: ProjectKind }) =>
  [kind.value === 'all' ? projectKindLabel(p.kind, locale.value) : '', p.agency ?? ''].filter(Boolean).join(' · ')

const linkOf = (p: ArchiveProject) => {
  if (p.links?.live) return { href: p.links.live, label: t('link.live') }
  if (p.links?.behance) return { href: p.links.behance, label: 'Behance' }
  if (p.links?.github) return { href: p.links.github, label: 'GitHub' }
  return null
}

const NuxtLink = resolveComponent('NuxtLink')
const arrow = 'absolute top-1/2 hidden size-8 -translate-y-1/2 cursor-pointer place-items-center rounded-full border border-slate-900/16 bg-white text-slate-900 shadow-sm transition-colors pointer-fine:grid hover:border-primary-500 hover:text-primary-500 dark:border-white/20 dark:bg-brand-900 dark:text-brand-50 dark:hover:border-primary-400 dark:hover:text-primary-400'
const chip = 'inline-flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-4 text-sm whitespace-nowrap transition-colors'
</script>

<template>
  <div>
    <!-- Filtr rodzaju + wyszukiwarka. Na telefonie pasek przewijany w bok: brzegi się wygaszają,
         a przy myszce (bez touchpada) pojawiają się strzałki. Od sm wszystko się mieści (zawija). -->
    <div class="relative -mx-pad sm:mx-0">
      <div
        ref="filtersEl"
        class="flex items-center gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-pad pb-1 [scrollbar-width:none] data-more-l:mask-l-from-85% data-more-r:mask-r-from-85% sm:flex-wrap sm:justify-between sm:overflow-visible sm:px-0"
      >
        <div class="flex gap-2 sm:flex-wrap" role="group" :aria-label="t('filters.label')">
          <button
            type="button"
            :class="[chip, kind === 'all' ? 'bg-primary-500 text-white dark:bg-primary-400 dark:text-brand-950' : 'bg-white text-slate-600 hover:text-slate-900 dark:bg-brand-900 dark:text-slate-300 dark:hover:text-brand-50']"
            :aria-pressed="kind === 'all'"
            @click="setKind('all')"
          >
            {{ t('filters.all') }} <span class="opacity-60">{{ counts.all }}</span>
          </button>
          <button
            v-for="k in kinds"
            :key="k"
            type="button"
            :class="[chip, kind === k ? 'bg-primary-500 text-white dark:bg-primary-400 dark:text-brand-950' : 'bg-white text-slate-600 hover:text-slate-900 dark:bg-brand-900 dark:text-slate-300 dark:hover:text-brand-50']"
            :aria-pressed="kind === k"
            @click="setKind(k)"
          >
            {{ projectKindLabel(k, locale) }} <span class="opacity-60">{{ counts[k] }}</span>
          </button>
        </div>

        <label class="relative block shrink-0 sm:w-75">
          <span class="sr-only">{{ t('search.label') }}</span>
          <Icon name="lucide:search" class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-base text-slate-400" aria-hidden="true" />
          <input
            v-model="query"
            type="search"
            :placeholder="t('search.placeholder')"
            class="h-11 w-44 rounded-full border border-slate-900/16 bg-white pr-4 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none sm:w-full dark:border-white/20 dark:bg-brand-900 dark:text-brand-50"
          >
        </label>
      </div>
      <button v-if="filtersEdges.canPrev.value" type="button" tabindex="-1" :class="[arrow, 'left-2']" :aria-label="t('filters.scrollLeft')" @click="filtersEdges.go(-1, stripStep(filtersEl))">
        <Icon name="lucide:chevron-left" class="text-base" aria-hidden="true" />
      </button>
      <button v-if="filtersEdges.canNext.value" type="button" tabindex="-1" :class="[arrow, 'right-2']" :aria-label="t('filters.scrollRight')" @click="filtersEdges.go(1, stripStep(filtersEl))">
        <Icon name="lucide:chevron-right" class="text-base" aria-hidden="true" />
      </button>
    </div>

    <!-- Skok do roku -->
    <nav
      v-if="years.length > 1"
      :aria-label="t('years.label')"
      class="relative -mx-pad mt-5 border-y border-slate-900/10 bg-white sm:mx-0 sm:w-max sm:max-w-full sm:rounded-full sm:border dark:border-white/10 dark:bg-brand-900"
    >
      <div
        ref="yearsEl"
        class="flex gap-1 overflow-x-auto overflow-y-hidden overscroll-x-contain px-pad py-1.5 [scrollbar-width:none] data-more-l:mask-l-from-85% data-more-r:mask-r-from-85% sm:rounded-full sm:px-1.5"
      >
        <a
          v-for="(y, i) in years"
          :key="y.year"
          :href="`#y${y.year}`"
          class="shrink-0 rounded-full px-3.5 py-2 text-sm transition-colors"
          :class="i === 0 ? 'bg-primary-500/10 font-medium text-primary-500 dark:bg-primary-400/14 dark:text-primary-400' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-brand-50'"
          @click="open(y.year, i)"
        >{{ y.year }}</a>
      </div>
      <button v-if="yearsEdges.canPrev.value" type="button" tabindex="-1" :class="[arrow, 'left-2 sm:left-1.5']" :aria-label="t('years.scrollLeft')" @click="yearsEdges.go(-1, stripStep(yearsEl))">
        <Icon name="lucide:chevron-left" class="text-base" aria-hidden="true" />
      </button>
      <button v-if="yearsEdges.canNext.value" type="button" tabindex="-1" :class="[arrow, 'right-2 sm:right-1.5']" :aria-label="t('years.scrollRight')" @click="yearsEdges.go(1, stripStep(yearsEl))">
        <Icon name="lucide:chevron-right" class="text-base" aria-hidden="true" />
      </button>
    </nav>

    <p v-if="!years.length" class="mt-10 rounded-2xl border border-dashed border-slate-900/15 px-6 py-10 text-center text-slate-500 dark:border-white/15 dark:text-slate-400">
      {{ t('noResults') }}
    </p>

    <!-- Lata -->
    <div
      v-for="(y, i) in years"
      :id="`y${y.year}`"
      :key="y.year"
      class="grid scroll-mt-24 gap-3.5 border-slate-900/10 py-6 first:border-t-0 sm:grid-cols-[12.5rem_minmax(0,1fr)] sm:gap-8 sm:py-8 dark:border-white/10"
      :class="i ? 'border-t' : 'mt-2'"
    >
      <!-- Rok: na telefonie wiersz nad listą, od sm kolumna po lewej (przyklejona, żeby „Zwiń” był pod ręką) -->
      <div
        class="flex items-baseline justify-between border-b border-slate-900/10 py-2.5 sm:sticky sm:top-24 sm:block sm:self-start sm:border-0 sm:py-0 dark:border-white/10"
        :class="{ 'max-sm:hidden': !isOpen(y.year, i) }"
      >
        <h3 class="text-3xl leading-none font-medium tracking-tight sm:text-5xl" :class="isOpen(y.year, i) ? 'text-slate-900 dark:text-brand-50' : 'text-slate-500 sm:text-3xl dark:text-slate-400'">
          {{ y.year }}
        </h3>
        <div class="flex items-baseline gap-4 sm:mt-2 sm:flex-col sm:gap-3">
          <small class="text-sm text-slate-500 dark:text-slate-400">{{ t('count', y.list.length) }}</small>
          <button
            v-if="!narrowed && isOpen(y.year, i)"
            type="button"
            class="inline-flex cursor-pointer items-center gap-1 text-sm text-primary-500 hover:underline dark:text-primary-400"
            aria-expanded="true"
            :aria-controls="`y${y.year}-list`"
            @click="toggle(y.year, i)"
          >
            {{ t('collapse') }} <span class="sr-only">{{ t('yearSr', { year: y.year }) }}</span>
            <Icon name="lucide:chevron-up" class="text-base" aria-hidden="true" />
          </button>
        </div>
      </div>

      <!-- Zwinięty rok -->
      <button
        v-if="!isOpen(y.year, i)"
        type="button"
        class="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-900/10 bg-white px-4 py-3.5 text-left shadow-sm transition-colors hover:border-primary-500/40 sm:self-center sm:px-6 sm:py-4.5 dark:border-white/10 dark:bg-brand-900"
        :aria-expanded="false"
        :aria-controls="`y${y.year}-list`"
        @click="toggle(y.year, i)"
      >
        <span class="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3.5">
          <span class="text-2xl font-medium tracking-tight text-slate-900 sm:hidden dark:text-brand-50">{{ y.year }}</span>
          <b class="font-medium whitespace-nowrap text-slate-600 max-sm:text-sm max-sm:font-normal sm:text-slate-900 dark:text-slate-300 sm:dark:text-brand-50">{{ t('expand', y.list.length) }}</b>
          <em class="truncate text-sm text-slate-500 not-italic dark:text-slate-400">{{ y.list.slice(0, 3).map(p => p.title).join(', ') }}{{ y.list.length > 3 ? ` ${t('andMore')}` : '' }}</em>
        </span>
        <Icon name="lucide:chevron-down" class="shrink-0 text-lg text-primary-500 dark:text-primary-400" aria-hidden="true" />
      </button>

      <!-- Projekty danego roku. v-show, a nie v-else: lista zwiniętego roku też musi być w HTML-u
           przy `nuxt generate` – @nuxt/image tworzy pliki /_ipx tylko dla obrazków, które widzi
           w wygenerowanej stronie. Z v-else miniatury zwiniętych lat nie powstawały (404 po rozwinięciu).
           Ukryte obrazki mają loading="lazy", więc przeglądarka pobiera je dopiero po rozwinięciu. -->
      <ul v-show="isOpen(y.year, i)" :id="`y${y.year}-list`" class="grid gap-1 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-6 lg:grid-cols-3 xl:grid-cols-4">
        <li v-for="p in y.list" :key="p.path">
          <component
            :is="p.hasPage ? NuxtLink : linkOf(p) ? 'a' : 'div'"
            :to="p.hasPage ? p.path : undefined"
            :href="!p.hasPage && linkOf(p) ? linkOf(p)!.href : undefined"
            :target="!p.hasPage && linkOf(p) ? '_blank' : undefined"
            :rel="!p.hasPage && linkOf(p) ? 'noopener noreferrer' : undefined"
            class="group grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-3.5 py-2 sm:block sm:py-0"
          >
            <div
              class="relative aspect-[400/329] overflow-hidden rounded-xl border bg-white transition duration-300 sm:rounded-2xl sm:shadow-sm motion-safe:group-hover:-translate-y-0.5 sm:group-hover:shadow-lg dark:bg-brand-900"
              :class="p.featured ? 'border-primary-500/50 dark:border-primary-400/50' : 'border-slate-900/10 dark:border-white/10'"
            >
              <CommonPicture
                v-if="p.image"
                :src="p.image"
                :alt="p.title"
                sizes="xs:100px sm:45vw lg:300px"
                width="400"
                height="329"
                loading="lazy"
                class="size-full object-cover object-top"
              />
              <!-- Projekt z sekcji „Wyróżnione” – na telefonie sama gwiazdka (miniatura ma 6rem) -->
              <span
                v-if="p.featured"
                class="absolute top-1.5 left-1.5 inline-flex items-center gap-1 rounded-full bg-primary-500 p-1 text-xs font-medium text-white shadow-sm sm:top-2.5 sm:left-2.5 sm:px-2.5 sm:py-1 dark:bg-primary-400 dark:text-brand-950"
              >
                <Icon name="lucide:star" class="text-xs" aria-hidden="true" />
                <span class="max-sm:sr-only">{{ t('featured') }}</span>
              </span>
            </div>
            <div class="min-w-0">
              <div class="flex items-baseline justify-between gap-2 sm:mt-3">
                <b class="truncate text-base font-medium text-slate-900 dark:text-brand-50">{{ p.title }}</b>
                <span v-if="p.hasPage" class="shrink-0 text-sm text-primary-500 dark:text-primary-400">{{ t('more') }}</span>
                <span v-else-if="linkOf(p)" class="shrink-0 text-sm text-primary-500 dark:text-primary-400">{{ linkOf(p)!.label }} ↗</span>
              </div>
              <p v-if="metaOf(p)" class="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{{ metaOf(p) }}</p>
            </div>
          </component>
        </li>
      </ul>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "filters": {
      "label": "Project type",
      "all": "All",
      "scrollLeft": "Scroll filters left",
      "scrollRight": "Scroll filters right"
    },
    "search": {
      "label": "Search projects",
      "placeholder": "Search projects…"
    },
    "years": {
      "label": "Years",
      "scrollLeft": "Scroll years left",
      "scrollRight": "Scroll years right"
    },
    "noResults": "No projects match your search.",
    "count": "{n} project | {n} projects",
    "collapse": "Collapse",
    "yearSr": "year {year}",
    "expand": "Show {n} project | Show {n} projects",
    "andMore": "and more",
    "featured": "Featured",
    "more": "More →",
    "link": { "live": "Website" }
  },
  "pl": {
    "filters": {
      "label": "Rodzaj projektu",
      "all": "Wszystkie",
      "scrollLeft": "Przewiń filtry w lewo",
      "scrollRight": "Przewiń filtry w prawo"
    },
    "search": {
      "label": "Szukaj projektu",
      "placeholder": "Szukaj projektu…"
    },
    "years": {
      "label": "Lata",
      "scrollLeft": "Przewiń lata w lewo",
      "scrollRight": "Przewiń lata w prawo"
    },
    "noResults": "Brak projektów dla tego wyszukiwania.",
    "count": "{n} projekt | {n} projekty | {n} projektów",
    "collapse": "Zwiń",
    "yearSr": "rok {year}",
    "expand": "Pokaż {n} projekt | Pokaż {n} projekty | Pokaż {n} projektów",
    "andMore": "i inne",
    "featured": "Wyróżniony",
    "more": "Więcej →",
    "link": { "live": "Strona" }
  }
}
</i18n>
