<script setup lang="ts">
// Kafelek projektu w układzie posta z Instagrama (4:5): technologie, tytuł, opis
// i przechylone okno przeglądarki z makietą (SVG) albo zrzutem ekranu.
// Wymiary w cqw – kafelek skaluje się jak grafika, niezależnie od szerokości kolumny.
// Tekst ma stałe rozmiary z domyślnej skali Tailwinda, przełączane progami szerokości kafelka (@xs, @sm, @lg, @xl – container queries).
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
</script>

<template>
  <!-- Link jest na tytule i rozciąga się na cały kafelek (duży cel do kliknięcia):
       strona projektu (to) albo działająca strona w nowej karcie (href). Bez linku kafelek tylko pokazuje projekt. -->
  <article
    class="ig-tile group @container relative isolate block aspect-[4/5] overflow-hidden rounded-2xl border border-slate-900/10 text-slate-900 shadow-sm transition-shadow duration-300 dark:border-white/10 dark:text-brand-50"
    :class="{ 'hover:shadow-xl hover:shadow-slate-900/10 dark:hover:shadow-black/40': to || href }"
  >
    <!-- Tekst ma min. wysokość 57cqw; gdy opis jest dłuższy (mały kafelek na telefonie), okno zjeżdża niżej zamiast na niego wchodzić.
         Blok tekstu celowo nie ma `relative` – wtedy ::after linku z tytułu rozciąga się na cały kafelek (article),
         także na okno ze zrzutem (wcześniej kończył się na tekście i klik w zrzut nic nie robił). -->
    <div class="min-h-[57cqw] px-[6.7cqw] pt-[6.7cqw] pb-[3cqw]">
      <!-- --ch: wysokość etykiety (rośnie z kafelkiem). Kółko ze strzałką ma stałe 36 px – wygodny cel dotyku. -->
      <div class="flex items-start justify-between gap-[3cqw] [--ch:--spacing(7)] @lg:[--ch:--spacing(8)] @xl:[--ch:--spacing(10)]">
        <ul class="flex flex-wrap gap-[1.4cqw]">
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
        <!-- Kółko 36 px (jak w „Dwóch sposobach”) – tylko znak, link jest na tytule i obejmuje cały kafelek.
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
      <h3 class="mt-[7cqw] text-2xl leading-none @xs:text-3xl @sm:text-4xl @lg:text-5xl @xl:text-6xl font-semibold tracking-tighter">
        <NuxtLink v-if="to" :to="to" class="after:absolute after:inset-0 after:z-2 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-primary-500">{{ title }}</NuxtLink>
        <a
          v-else-if="href"
          :href="href"
          target="_blank"
          rel="noopener noreferrer"
          :aria-label="hrefLabel ?? t('open', { title })"
          class="after:absolute after:inset-0 after:z-2 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-2xl focus-visible:after:outline-2 focus-visible:after:outline-primary-500"
        >{{ title }}</a>
        <template v-else>{{ title }}</template>
      </h3>
      <p class="mt-[2.8cqw] max-w-[92%] text-sm/snug @lg:text-lg/snug @xl:text-xl/snug text-slate-600 dark:text-slate-300">{{ description }}</p>
    </div>

    <!-- Okno przeglądarki wychodzące poza kafelek – pod tekstem (-z-1 w obrębie kafelka, który ma isolate) -->
    <div
      class="relative -z-1 ml-[6.7cqw] w-[100cqw] origin-top-left -rotate-2 overflow-hidden rounded-[2.4cqw] border border-slate-900/16 bg-white shadow-[0_5cqw_10cqw_-4cqw_rgba(8,14,40,.45)] transition-transform duration-500 ease-out dark:border-white/20 dark:bg-[#1c2a52]"
      :class="{ 'motion-safe:group-hover:-translate-y-[1.2cqw] motion-safe:group-hover:-rotate-1': to || href }"
    >
      <div class="flex h-[5.4cqw] items-center gap-[1.1cqw] bg-[#eef1f7] px-[2.4cqw] dark:bg-[#223260]">
        <i v-for="n in 3" :key="n" class="size-[1.5cqw] rounded-full bg-slate-900/16 dark:bg-white/20" />
        <span class="ml-[1.6cqw] hidden text-xs @sm:inline @xl:text-sm text-slate-600 dark:text-slate-400">{{ url }}</span>
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
  </article>
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
