<script setup lang="ts">
// Realizacje: wybrane projekty WordPress z content/projects (tytuł, zrzut, linki) + opis z app/data/business.ts.
// Kafelki jak „Rzeczy, które zbudowałem” na głównej (CommonProjectTile, układ posta z Instagrama).
// Desktop: 3 kolumny. Tablet i telefon: pasek przewijany w bok.
import { businessWork } from '~/data/business'

type WorkItem = (typeof businessWork.pl.items)[number] & { title?: string; image?: string; imageDark?: string }

const { t } = useI18n({ useScope: 'local' })
const link = useLocalLink()
const work = useLocalized(businessWork)
const { col, lang, withLocale } = useContentLocale()
const paths = work.value.items.map(i => withLocale(i.path))
const { data: projects } = await useAsyncData(`business-work-${lang.value}`, () =>
  queryCollection(col('projects')).where('path', 'IN', paths).all(),
)

// Adres w pasku okna: domena strony na produkcji (bez www), a gdy strona już nie działa – nazwa projektu
const host = (url?: string) => (url ? new URL(url).hostname.replace(/^www\./, '') : '')

const tiles = computed(() =>
  (work.value.items as WorkItem[])
    .map((item) => {
      const p = projects.value?.find(x => x.path === withLocale(item.path))
      if (!p) return null
      const title = item.title ?? p.title
      const live = p.links?.live
      return {
        key: item.path,
        title,
        description: item.text,
        chips: item.tags,
        url: host(live) || title.toLowerCase().replace(/\s+/g, '-'),
        image: item.image ?? p.image,
        imageDark: item.imageDark,
        // strzałka: strona na produkcji, a gdy jej już nie ma – projekt na Behance
        href: live ?? p.links?.behance,
        hrefLabel: live ? undefined : t('behance', { title }),
      }
    })
    .filter(<T,>(x: T | null): x is T => x !== null),
)
const scroller = useTemplateRef<HTMLElement>('scroller')
const anchor = useAnchor()
</script>

<template>
  <section :id="anchor('projects')" class="relative isolate pt-22 md:pt-28 lg:pt-37.5">
    <CommonCodeBackdrop name="bizWork" class="top-6" />
    <div class="container">
      <CommonSectionHead :title="work.title" :lead="work.lead" />

      <ul
        ref="scroller"
        class="-mx-pad mt-8 grid snap-x snap-mandatory auto-cols-[84%] grid-flow-col gap-3.5 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-px-pad px-pad pb-2 [scrollbar-width:none] sm:auto-cols-[56%] md:auto-cols-[40%] lg:mx-0 lg:mt-10 lg:grid-flow-row lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        <li v-for="(tile, i) in tiles" :key="tile.key" v-reveal="(i % 3) * 80" class="snap-start transition-[opacity,translate] duration-700 ease-out">
          <CommonProjectTile v-bind="tile" />
        </li>
      </ul>
      <CommonScrollControls :target="scroller" />

      <!-- Wszystkie strony WordPress: archiwum projektów z włączonym filtrem -->
      <p class="mt-8 flex justify-center lg:mt-10">
        <NuxtLink
          :to="link(work.allTo)"
          class="group inline-flex items-center gap-2 border-b border-slate-900/16 pb-1 font-medium whitespace-nowrap text-slate-900 transition-colors hover:border-primary-500 hover:text-primary-500 dark:border-white/20 dark:text-brand-50 dark:hover:border-primary-400 dark:hover:text-primary-400"
        >
          {{ work.allLabel }}
          <Icon name="lucide:arrow-right" class="transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
        </NuxtLink>
      </p>
    </div>
  </section>
</template>

<i18n lang="json">
{
  "en": { "behance": "{title} – project on Behance (opens in a new tab)" },
  "pl": { "behance": "{title} – projekt na Behance (nowa karta)" }
}
</i18n>
