<script setup lang="ts">
// Kafelek projektu w układzie posta z Instagrama (4:5): technologie, tytuł, opis
// i przechylone okno przeglądarki z makietą (SVG) albo zrzutem ekranu.
// Odstępy, okno przeglądarki i tekst mają stałe wartości z domyślnej skali Tailwinda, przełączane progami szerokości
// kafelka (container queries: @xs 320, @sm 384, @lg 512, @xl 576 px) – kafelek rośnie schodkami zamiast płynnie (bez cqw).
import { mockups } from '~/data/mockups'

const props = defineProps<{
  title: string
  description: string
  chips?: string[]
  url: string
  mock?: string
  image?: string
  imageDark?: string // zrzut ciemnej wersji strony – podmieniany w ciemnym motywie
  to?: string // strona projektu (gdy jest) – wtedy klikalny jest cały kafelek, strzałka →
  href?: string // strona na produkcji – cały kafelek otwiera ją w nowej karcie, ikona ↗
  hrefLabel?: string // opis linku dla czytników ekranu, gdy nie prowadzi do strony (np. Behance); zaczyna się od tytułu
  eager?: boolean // zrzut ładowany od razu (kafelek widoczny w hero); domyślnie leniwie
}>()

const { t } = useI18n({ useScope: 'local' })
const svg = computed(() => (props.mock ? mockups[props.mock] : ''))

// Cały kafelek jest jednym linkiem (jak karta wpisu): strona projektu (to) albo działająca strona w nowej karcie (href).
// Bez linku zostaje <article>. aria-label – krótka nazwa linku zamiast całej treści kafelka.
const NuxtLink = resolveComponent('NuxtLink')
const linkAttrs = computed(() => {
  if (props.to) return { is: NuxtLink, to: props.to, 'aria-label': props.title }
  if (props.href)
    return { is: 'a', href: props.href, target: '_blank', rel: 'noopener noreferrer', 'aria-label': props.hrefLabel ?? t('open', { title: props.title }) }
  return { is: 'article' }
})
</script>

<template>
  <!-- Cały kafelek to link (component :is): strona projektu albo działająca strona; bez linku – <article> -->
  <component
    :is="linkAttrs.is"
    v-bind="{ ...linkAttrs, is: undefined }"
    class="ig-tile group @container relative isolate block aspect-[4/5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 overflow-hidden rounded-2xl border border-slate-900/10 text-slate-900 shadow-sm transition-shadow duration-300 dark:border-white/10 dark:text-brand-50"
    :class="{ 'hover:shadow-xl hover:shadow-slate-900/10 dark:hover:shadow-black/40': to || href }"
  >
    <!-- Tekst ma min. wysokość (ok. 57% szerokości kafelka); gdy opis jest dłuższy (mały kafelek na telefonie), okno zjeżdża niżej zamiast na niego wchodzić.
         Okno ze zrzutem leży pod tekstem (-z-1 w obrębie kafelka z isolate). -->
    <div class="min-h-40 px-4.5 pt-4.5 pb-2 @xs:min-h-44 @xs:px-5 @xs:pt-5 @sm:min-h-56 @sm:px-6.5 @sm:pt-6.5 @sm:pb-3 @lg:min-h-72 @lg:px-8 @lg:pt-8 @xl:min-h-84 @xl:px-10 @xl:pt-10 @xl:pb-4.5">
      <!-- --ch: wysokość etykiety (rośnie z kafelkiem). Kółko ze strzałką ma stałe 36 px – wygodny cel dotyku. -->
      <div class="flex items-start justify-between gap-2 @sm:gap-3 @xl:gap-4 [--ch:--spacing(7)] @lg:[--ch:--spacing(8)] @xl:[--ch:--spacing(10)]">
        <ul class="flex flex-wrap gap-1 @sm:gap-1.5 @xl:gap-2">
          <li
            v-for="(chip, i) in chips"
            :key="chip"
            class="flex h-(--ch) items-center rounded-full border px-2.5 text-xs @xl:px-3.5 @xl:text-base"
            :class="i === 0 ? 'border-transparent bg-brand-900 text-white dark:bg-slate-100 dark:text-brand-950' : 'border-slate-900/16 text-slate-600 dark:border-white/20 dark:text-slate-300'"
          >
            {{ chip }}
          </li>
        </ul>
        <!-- Projekt z własną stroną: strzałka → (zostajemy na stronie, klikalny cały kafelek).
             Bez strony: ↗ do działającej strony w nowej karcie. Gdy są oba, wygrywa strona projektu –
             link do wersji na żywo jest na niej (przycisk „Zobacz na żywo”). -->
        <!-- Kółko 36 px (jak w „Dwóch sposobach”) – tylko znak, linkiem jest cały kafelek.
             → strona projektu (ta sama karta), ↗ działająca strona albo Behance (nowa karta). -->
        <span
          v-if="to || href"
          class="grid size-9 shrink-0 place-items-center rounded-full bg-primary-500 text-white dark:bg-primary-400 dark:text-brand-950"
          aria-hidden="true"
        >
          <Icon
            :name="to ? 'lucide:arrow-right' : 'lucide:arrow-up-right'"
            class="size-4.5 transition-transform duration-300"
            :class="to ? 'motion-safe:group-hover:translate-x-0.5' : 'motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5'"
          />
        </span>
      </div>
      <h3 class="mt-4 text-2xl @xs:mt-5 @sm:mt-7 @lg:mt-9 @xl:mt-10 leading-none @xs:text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-semibold tracking-tighter">
        {{ title }}
      </h3>
      <p class="mt-2 max-w-11/12 @sm:mt-3 @xl:mt-4 text-sm/snug @lg:text-lg/snug @xl:text-xl/snug text-slate-600 dark:text-slate-300">{{ description }}</p>
    </div>

    <!-- Okno przeglądarki wychodzące poza kafelek – pod tekstem (-z-1 w obrębie kafelka, który ma isolate) -->
    <div
      class="relative -z-1 ml-4.5 w-full origin-top-left -rotate-2 overflow-hidden rounded-md border border-slate-900/16 bg-white shadow-2xl shadow-brand-950/40 @xs:ml-5 @sm:ml-6.5 @sm:rounded-lg @lg:ml-8 @xl:ml-10 @xl:rounded-xl transition-transform duration-500 ease-out dark:border-white/20 dark:bg-[#1c2a52]"
      :class="{ 'motion-safe:group-hover:-translate-y-1.5 motion-safe:group-hover:-rotate-1': to || href }"
    >
      <div class="flex h-3.5 items-center gap-1 bg-[#eef1f7] px-2 @xs:h-4 @sm:h-5 @sm:gap-1.5 @sm:px-2.5 @lg:h-6 @xl:h-8 @xl:gap-2 @xl:px-3.5 dark:bg-[#223260]">
        <i v-for="n in 3" :key="n" class="size-1 rounded-full @sm:size-1.5 @xl:size-2 bg-slate-900/16 dark:bg-white/20" />
        <span class="ml-1 hidden text-xs @sm:ml-1.5 @xl:ml-2 @sm:inline @xl:text-sm text-slate-600 dark:text-slate-400">{{ url }}</span>
      </div>
      <div class="aspect-[320/186] overflow-hidden [&_svg]:block [&_svg]:size-full">
        <template v-if="image">
          <CommonPicture
            :src="image"
            :alt="t('alt', { title })"
            sizes="xs:90vw md:45vw lg:30vw"
            width="960"
            height="558"
            :modifiers="{ position: 'top' }"
            :loading="eager ? 'eager' : 'lazy'"
            class="block size-full object-cover object-top"
            :class="{ 'dark:hidden': imageDark }"
          />
          <CommonPicture
            v-if="imageDark"
            :src="imageDark"
            :alt="t('altDark', { title })"
            sizes="xs:90vw md:45vw lg:30vw"
            width="960"
            height="558"
            :modifiers="{ position: 'top' }"
            loading="lazy"
            class="hidden size-full object-cover object-top dark:block"
          />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html – SVG z naszego pliku danych -->
        <div v-else-if="svg" class="size-full" v-html="svg" />
      </div>
    </div>
  </component>
</template>

<i18n lang="json">
{
  "en": {
    "open": "{title} – open the site in a new tab",
    "alt": "{title} website",
    "altDark": "{title} website – dark theme"
  },
  "pl": {
    "open": "{title} – otwórz stronę w nowej karcie",
    "alt": "Strona {title}",
    "altDark": "Strona {title} – ciemny motyw"
  }
}
</i18n>
