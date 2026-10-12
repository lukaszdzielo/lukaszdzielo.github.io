<script setup lang="ts">
// Archiwum projektów: filtr rodzaju (zapisywany w adresie jako ?tech=…), wyszukiwarka i lata.
// Najnowsze lata są rozwinięte, starsze zwinięte za przyciskiem. Przy filtrze lub wyszukiwaniu
// rozwijamy wszystko, żeby nic nie zostało ukryte.
import { isProjectKind, projectKind, projectKindLabels, projectKindOrder, type ProjectKind } from '~/utils/projectKind'

type ArchiveProject = {
  path: string
  title: string
  date: string
  tags?: string[]
  agency?: string
  image?: string
  links?: { live?: string; behance?: string; github?: string }
  hasPage?: boolean
}

const props = defineProps<{ projects: ArchiveProject[] }>()

const OPEN_YEARS = 3

const route = useRoute()
const router = useRouter()

// Filtr czytamy z adresu dopiero po zamontowaniu – strona jest generowana statycznie bez ?tech,
// więc w HTML zawsze jest pełna lista (bez błędów hydracji).
const kind = ref<ProjectKind | 'all'>('all')
const query = ref('')
const opened = ref(new Set<string>())

onMounted(() => {
  const tech = route.query.tech
  if (isProjectKind(tech)) kind.value = tech
})

function setKind(next: ProjectKind | 'all') {
  kind.value = next
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
  const q = query.value.trim().toLocaleLowerCase('pl')
  return items.value.filter(p =>
    (kind.value === 'all' || p.kind === kind.value)
    && (!q || p.title.toLocaleLowerCase('pl').includes(q) || (p.agency ?? '').toLocaleLowerCase('pl').includes(q)),
  )
})

const years = computed(() => {
  const map = new Map<string, typeof filtered.value>()
  for (const p of filtered.value) map.set(p.year, [...(map.get(p.year) ?? []), p])
  return [...map.entries()]
    .sort(([a], [b]) => b.localeCompare(a))
    .map(([year, list]) => ({ year, list: list.sort((a, b) => b.date.localeCompare(a.date)) }))
})

const narrowed = computed(() => kind.value !== 'all' || query.value.trim() !== '')
const isOpen = (year: string, index: number) => narrowed.value || index < OPEN_YEARS || opened.value.has(year)
function open(year: string) {
  opened.value = new Set([...opened.value, year])
}

function plural(n: number) {
  if (n === 1) return 'projekt'
  const d = n % 10, h = n % 100
  return d >= 2 && d <= 4 && !(h >= 12 && h <= 14) ? 'projekty' : 'projektów'
}

const linkOf = (p: ArchiveProject) => {
  if (p.links?.live) return { href: p.links.live, label: 'Strona' }
  if (p.links?.behance) return { href: p.links.behance, label: 'Behance' }
  if (p.links?.github) return { href: p.links.github, label: 'GitHub' }
  return null
}

const NuxtLink = resolveComponent('NuxtLink')
const chip = 'inline-flex h-10 shrink-0 cursor-pointer items-center gap-1.5 rounded-full px-4 text-sm whitespace-nowrap transition-colors'
</script>

<template>
  <div>
    <!-- Filtr rodzaju + wyszukiwarka -->
    <div class="-mx-pad flex items-center gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-pad pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-between sm:overflow-visible sm:px-0">
      <div class="flex gap-2" role="group" aria-label="Rodzaj projektu">
        <button
          type="button"
          :class="[chip, kind === 'all' ? 'bg-primary-500 text-white dark:bg-primary-400 dark:text-brand-950' : 'bg-white text-slate-600 hover:text-slate-900 dark:bg-brand-900 dark:text-slate-300 dark:hover:text-brand-50']"
          :aria-pressed="kind === 'all'"
          @click="setKind('all')"
        >
          Wszystkie <span class="opacity-60">{{ counts.all }}</span>
        </button>
        <button
          v-for="k in kinds"
          :key="k"
          type="button"
          :class="[chip, kind === k ? 'bg-primary-500 text-white dark:bg-primary-400 dark:text-brand-950' : 'bg-white text-slate-600 hover:text-slate-900 dark:bg-brand-900 dark:text-slate-300 dark:hover:text-brand-50']"
          :aria-pressed="kind === k"
          @click="setKind(k)"
        >
          {{ projectKindLabels[k] }} <span class="opacity-60">{{ counts[k] }}</span>
        </button>
      </div>

      <label class="relative block shrink-0 sm:w-75">
        <span class="sr-only">Szukaj projektu</span>
        <Icon name="lucide:search" class="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-base text-slate-400" aria-hidden="true" />
        <input
          v-model="query"
          type="search"
          placeholder="Szukaj projektu…"
          class="h-11 w-44 rounded-full border border-slate-900/16 bg-white pr-4 pl-10 text-sm text-slate-900 placeholder:text-slate-400 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/30 focus:outline-none sm:w-full dark:border-white/20 dark:bg-brand-900 dark:text-brand-50"
        >
      </label>
    </div>

    <!-- Skok do roku -->
    <nav
      v-if="years.length > 1"
      aria-label="Lata"
      class="-mx-pad mt-5 flex gap-1 overflow-x-auto overflow-y-hidden border-y border-slate-900/10 bg-white px-pad py-1.5 [scrollbar-width:none] sm:mx-0 sm:w-max sm:max-w-full sm:rounded-full sm:border sm:px-1.5 dark:border-white/10 dark:bg-brand-900"
    >
      <a
        v-for="(y, i) in years"
        :key="y.year"
        :href="`#y${y.year}`"
        class="shrink-0 rounded-full px-3.5 py-2 text-sm transition-colors"
        :class="i === 0 ? 'bg-primary-500/10 font-medium text-primary-500 dark:bg-primary-400/14 dark:text-primary-400' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-brand-50'"
        @click="open(y.year)"
      >{{ y.year }}</a>
    </nav>

    <p v-if="!years.length" class="mt-10 rounded-2xl border border-dashed border-slate-900/15 px-6 py-10 text-center text-slate-500 dark:border-white/15 dark:text-slate-400">
      Brak projektów dla tego wyszukiwania.
    </p>

    <!-- Lata -->
    <div
      v-for="(y, i) in years"
      :id="`y${y.year}`"
      :key="y.year"
      class="grid scroll-mt-24 gap-3.5 border-slate-900/10 py-6 first:border-t-0 sm:grid-cols-[12.5rem_minmax(0,1fr)] sm:gap-8 sm:py-8 dark:border-white/10"
      :class="i ? 'border-t' : 'mt-2'"
    >
      <div
        class="flex items-baseline justify-between border-b border-slate-900/10 py-2.5 sm:block sm:border-0 sm:py-0 dark:border-white/10"
        :class="{ 'max-sm:hidden': !isOpen(y.year, i) }"
      >
        <h3 class="text-3xl leading-none font-medium tracking-tight sm:text-5xl" :class="isOpen(y.year, i) ? 'text-slate-900 dark:text-brand-50' : 'text-slate-500 sm:text-3xl dark:text-slate-400'">
          {{ y.year }}
        </h3>
        <small class="text-sm text-slate-500 sm:mt-2 sm:block dark:text-slate-400">{{ y.list.length }} {{ plural(y.list.length) }}</small>
      </div>

      <!-- Zwinięty rok -->
      <button
        v-if="!isOpen(y.year, i)"
        type="button"
        class="flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border border-slate-900/10 bg-white px-4 py-3.5 text-left shadow-sm transition-colors hover:border-primary-500/40 sm:self-center sm:px-6 sm:py-4.5 dark:border-white/10 dark:bg-brand-900"
        :aria-expanded="false"
        @click="open(y.year)"
      >
        <span class="flex min-w-0 flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-3.5">
          <span class="text-2xl/tight font-medium tracking-tight text-slate-900 sm:hidden dark:text-brand-50">{{ y.year }}</span>
          <b class="font-medium whitespace-nowrap text-slate-600 max-sm:text-sm max-sm:font-normal sm:text-slate-900 dark:text-slate-300 sm:dark:text-brand-50">Pokaż {{ y.list.length }} {{ plural(y.list.length) }}</b>
          <em class="truncate text-sm text-slate-500 not-italic dark:text-slate-400">{{ y.list.slice(0, 3).map(p => p.title).join(', ') }}{{ y.list.length > 3 ? ' i inne' : '' }}</em>
        </span>
        <Icon name="lucide:chevron-down" class="shrink-0 text-lg text-primary-500 dark:text-primary-400" aria-hidden="true" />
      </button>

      <!-- Projekty danego roku -->
      <ul v-else class="grid gap-1 sm:grid-cols-2 sm:gap-x-5 sm:gap-y-6 lg:grid-cols-4">
        <li v-for="p in y.list" :key="p.path">
          <component
            :is="p.hasPage ? NuxtLink : linkOf(p) ? 'a' : 'div'"
            :to="p.hasPage ? p.path : undefined"
            :href="!p.hasPage && linkOf(p) ? linkOf(p)!.href : undefined"
            :target="!p.hasPage && linkOf(p) ? '_blank' : undefined"
            :rel="!p.hasPage && linkOf(p) ? 'noopener noreferrer' : undefined"
            class="group grid grid-cols-[6rem_minmax(0,1fr)] items-center gap-3.5 py-2 sm:block sm:py-0"
          >
            <div class="aspect-[400/329] overflow-hidden rounded-xl border border-slate-900/10 bg-white transition duration-300 sm:rounded-2xl sm:shadow-sm motion-safe:group-hover:-translate-y-0.5 sm:group-hover:shadow-lg dark:border-white/10 dark:bg-brand-900">
              <CommonPicture
                v-if="p.image"
                :src="p.image"
                :alt="p.title"
                sizes="xs:100px sm:45vw lg:280px"
                width="400"
                height="329"
                loading="lazy"
                class="size-full object-cover object-top"
              />
            </div>
            <div class="min-w-0">
              <div class="flex items-baseline justify-between gap-2 sm:mt-3">
                <b class="truncate text-[0.9375rem] font-medium text-slate-900 dark:text-brand-50">{{ p.title }}</b>
                <span v-if="p.hasPage" class="shrink-0 text-sm text-primary-500 dark:text-primary-400">Więcej →</span>
                <span v-else-if="linkOf(p)" class="shrink-0 text-sm text-primary-500 dark:text-primary-400">{{ linkOf(p)!.label }} ↗</span>
              </div>
              <p class="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                {{ projectKindLabels[p.kind] }} · {{ p.agency || 'zlecenie własne' }}
              </p>
            </div>
          </component>
        </li>
      </ul>
    </div>
  </div>
</template>
