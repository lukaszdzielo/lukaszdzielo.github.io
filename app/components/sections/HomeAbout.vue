<script setup lang="ts">
// O mnie: ilustracja + tekst. Treść (akapity, oś czasu, cytat) jest w content/index.md.
// Na desktopie wykształcenie i „Poza kodem” stoją pod ilustracją (lewa kolumna nie zostaje pusta),
// na telefonie i tablecie – na końcu, pod osią czasu, na całą szerokość. Ilustracja jest tam wyśrodkowana.
// projects – projekty z danego miejsca pracy; link prowadzi na stronę projektu w archiwum
// (a nie do kafelków na górze, bo wyróżnione projekty z czasem się zmieniają). Widać najwyżej 3.
// agencies – nazwy z pola `agency` w projektach: reszta projektów z tych firm to jedna etykieta
// „+N” (albo „37 projektów”, gdy żaden nie ma własnej strony), która otwiera archiwum z filtrem firm.
type TimelineItem = {
  period: string
  company: string
  role: string
  text: string
  projects?: { title: string; to: string }[]
  agencies?: string[]
}

defineProps<{
  quote?: string
  timeline?: TimelineItem[]
  education?: string
  hobbiesLabel?: string
  hobbies?: string
}>()

const { t } = useI18n({ useScope: 'local' })
// project.to w treści to adres wersji polskiej bez /pl ('/#projects') – link() daje adres w bieżącym języku
const link = useLocalLink()

const MAX_PROJECTS = 3

// Liczba opublikowanych projektów każdej firmy (pole `agency`) – do etykiety „+N”
const { col, lang } = useContentLocale()
const { data: agencyCounts } = await useAsyncData(`about-agency-counts-${lang.value}`, () =>
  queryCollection(col('projects')).where('draft', '=', false).select('agency').all(),
  {
    transform: (projects) => {
      const counts: Record<string, number> = {}
      for (const p of projects) if (p.agency) counts[p.agency] = (counts[p.agency] ?? 0) + 1
      return counts
    },
  },
)

const shown = (item: TimelineItem) => item.projects?.slice(0, MAX_PROJECTS) ?? []
// Projekty z tych firm, których nie ma wśród etykiet z nazwą
const more = (item: TimelineItem) => {
  const total = (item.agencies ?? []).reduce((sum, a) => sum + (agencyCounts.value?.[a] ?? 0), 0)
  return Math.max(0, total - shown(item).length)
}
const archiveLink = (item: TimelineItem) => link(`/projects?agency=${(item.agencies ?? []).join(',')}#archive`)
// „1 projekt / 3 projekty / 37 projektów” – polska odmiana z i18n.config.ts
const projectsCount = (n: number) => t('count', n)
</script>

<template>
  <section id="about-me" class="relative isolate pt-22 md:pt-28 lg:pt-37.5">
    <CommonCodeBackdrop name="about" class="top-6" />
    <div class="container grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-8">
      <figure
        v-reveal
        class="m-0 aspect-[4/5] overflow-hidden lg:col-start-1 lg:row-start-1 rounded-3xl border border-slate-900/10 bg-linear-[165deg] from-white to-slate-50 transition-[opacity,translate] duration-700 ease-out max-lg:mx-auto max-lg:w-full max-lg:max-w-xl dark:border-white/10 dark:from-brand-900 dark:to-brand-900 [&_img]:size-full [&_img]:object-cover [&_img]:object-bottom"
      >
        <slot name="image" />
      </figure>

      <div v-reveal="80" class="transition-[opacity,translate] duration-700 ease-out lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <h2 class="mb-5 text-3xl font-medium tracking-tight text-slate-900 lg:text-5xl dark:text-brand-50">
          <slot name="title" mdc-unwrap="p" />
        </h2>

        <div
          class="space-y-4 text-lg/relaxed text-slate-600 dark:text-slate-300 [&_strong]:font-medium [&_strong]:text-slate-900 dark:[&_strong]:text-brand-50"
        >
          <slot />
        </div>

        <blockquote
          v-if="quote"
          class="my-6.5 border-l-2 border-primary-500 pl-5.5 text-xl tracking-tight text-slate-900 dark:border-primary-400 dark:text-brand-50"
        >
          {{ quote }}
        </blockquote>

        <ol v-if="timeline?.length" class="mt-8.5 border-t border-slate-900/10 dark:border-white/10">
          <li
            v-for="item in timeline"
            :key="item.period"
            class="grid gap-1 border-b border-slate-900/10 py-4.5 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-5 lg:grid-cols-1 lg:gap-1 xl:grid-cols-[150px_minmax(0,1fr)] xl:gap-5 dark:border-white/10"
          >
            <time class="pt-0.5 text-sm text-slate-600 tabular-nums dark:text-slate-400">{{ item.period }}</time>
            <div>
              <p class="font-medium text-slate-900 dark:text-brand-50">
                {{ item.company }} <span class="font-normal text-slate-600 dark:text-slate-400">· {{ item.role }}</span>
              </p>
              <p class="mt-1.5 text-sm text-slate-600 dark:text-slate-300">{{ item.text }}</p>
              <ul v-if="shown(item).length || more(item)" class="mt-2.5 flex flex-wrap gap-1.5" :aria-label="t('projectsAt', { company: item.company })">
                <li v-for="project in shown(item)" :key="project.title">
                  <NuxtLink
                    :to="link(project.to)"
                    class="inline-flex h-7 items-center gap-1 rounded-full bg-primary-500/10 px-3 text-xs font-medium text-primary-500 transition-colors hover:bg-primary-500/16 dark:bg-primary-400/14 dark:text-primary-400 dark:hover:bg-primary-400/20"
                  >
                    {{ project.title }}
                    <Icon name="lucide:arrow-right" class="text-xs" aria-hidden="true" />
                  </NuxtLink>
                </li>
                <li v-if="more(item)">
                  <NuxtLink
                    :to="archiveLink(item)"
                    class="inline-flex h-7 items-center gap-1 rounded-full border border-primary-500/30 px-3 text-xs font-medium text-primary-500 transition-colors hover:bg-primary-500/10 dark:border-primary-400/30 dark:text-primary-400 dark:hover:bg-primary-400/14"
                  >
                    <!-- widoczne „+3” albo „37 projektów”; czytnik ekranu dostaje resztę zdania -->
                    {{ shown(item).length ? `+${more(item)}` : projectsCount(more(item)) }}
                    <span class="sr-only">{{ t(shown(item).length ? 'srMore' : 'srAll', { company: item.company }) }}</span>
                    <Icon name="lucide:arrow-right" class="text-xs" aria-hidden="true" />
                  </NuxtLink>
                </li>
              </ul>
            </div>
          </li>
        </ol>

      </div>

      <!-- Wykształcenie i „Poza kodem”: na desktopie pod ilustracją, wyżej – na końcu sekcji -->
      <div
        v-if="education || hobbies"
        v-reveal="120"
        class="-mt-4 space-y-4 transition-[opacity,translate] duration-700 ease-out lg:col-start-1 lg:row-start-2 lg:mt-0"
      >
        <div v-if="education" class="rounded-2xl border border-slate-900/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-brand-900">
          <p class="text-xs font-semibold tracking-widest text-slate-600 uppercase dark:text-slate-400">{{ t('education') }}</p>
          <!-- W treści szkoły są rozdzielone „ · ” – każda w osobnej linii -->
          <ul class="mt-2 space-y-1 text-sm/relaxed text-slate-600 dark:text-slate-300">
            <li v-for="school in education.split(' · ')" :key="school">{{ school }}</li>
          </ul>
        </div>
        <p
          v-if="hobbies"
          class="rounded-2xl border border-slate-900/10 bg-white px-5 py-4 text-base/relaxed text-slate-600 dark:border-white/10 dark:bg-brand-900 dark:text-slate-300"
        >
          <b class="font-medium text-slate-900 dark:text-brand-50">{{ hobbiesLabel }}</b> {{ hobbies }}
        </p>
      </div>
    </div>
  </section>
</template>

<i18n lang="json">
{
  "en": {
    "education": "Education",
    "projectsAt": "Projects – {company}",
    "srMore": "– more projects from {company} in the archive",
    "srAll": "from {company} in the archive",
    "count": "{n} project | {n} projects"
  },
  "pl": {
    "education": "Wykształcenie",
    "projectsAt": "Projekty – {company}",
    "srMore": "– kolejne projekty z {company} w archiwum",
    "srAll": "z {company} w archiwum",
    "count": "{n} projekt | {n} projekty | {n} projektów"
  }
}
</i18n>
