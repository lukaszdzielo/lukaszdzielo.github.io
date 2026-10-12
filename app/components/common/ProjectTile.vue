<script setup lang="ts">
// Kafelek projektu w układzie posta z Instagrama (4:5): technologie, tytuł, opis
// i przechylone okno przeglądarki z makietą (SVG) albo zrzutem ekranu.
// Wymiary w cqw – kafelek skaluje się jak grafika, niezależnie od szerokości kolumny.
import { mockups } from '~/data/mockups'

const props = defineProps<{
  title: string
  description: string
  chips?: string[]
  url: string
  mock?: string
  image?: string
  imageDark?: string // zrzut ciemnej wersji strony – podmieniany w ciemnym motywie
  to?: string // podstrona projektu (gdy powstanie)
  href?: string // strona na produkcji – otwiera się w nowej karcie
}>()

const svg = computed(() => (props.mock ? mockups[props.mock] : ''))
const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <component
    :is="to ? NuxtLink : href ? 'a' : 'article'"
    :to="to"
    :href="to ? undefined : href"
    :target="!to && href ? '_blank' : undefined"
    :rel="!to && href ? 'noopener noreferrer' : undefined"
    class="ig-tile group @container relative block aspect-[4/5] overflow-hidden rounded-2xl border border-slate-900/10 text-slate-900 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/10 dark:border-white/10 dark:text-white dark:hover:shadow-black/40"
  >
    <div class="relative z-1 px-[6.7cqw] pt-[6.7cqw]">
      <div class="flex items-start justify-between gap-[3cqw]">
        <ul class="flex flex-wrap gap-[1.4cqw] pt-[1.4cqw]">
          <li
            v-for="(chip, i) in chips"
            :key="chip"
            class="rounded-full border px-[2.4cqw] py-[1cqw] text-[2.9cqw]"
            :class="i === 0 ? 'border-transparent bg-brand-900 text-white dark:bg-slate-100 dark:text-brand-950' : 'border-slate-900/16 text-slate-600 dark:border-white/20 dark:text-slate-300'"
          >
            {{ chip }}
          </li>
        </ul>
        <span
          v-if="to || href"
          class="grid size-[8.5cqw] shrink-0 place-items-center rounded-full bg-primary-500 text-[3.8cqw] text-white transition-transform duration-300 group-hover:rotate-45 dark:bg-primary-400 dark:text-brand-950"
          aria-hidden="true"
        >
          <Icon name="lucide:arrow-up-right" />
        </span>
      </div>
      <h3 class="mt-[7cqw] text-[10cqw] leading-none font-semibold tracking-tighter">{{ title }}</h3>
      <p class="mt-[2.8cqw] max-w-[92%] text-[3.7cqw]/[1.35] text-slate-600 dark:text-slate-300">{{ description }}</p>
    </div>

    <!-- Okno przeglądarki wychodzące poza kafelek -->
    <div
      class="absolute top-[57cqw] left-[6.7cqw] w-[100cqw] origin-top-left -rotate-2 overflow-hidden rounded-[2.4cqw] border border-slate-900/16 bg-white shadow-[0_5cqw_10cqw_-4cqw_rgba(8,14,40,.45)] transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-[1.2cqw] motion-safe:group-hover:-rotate-1 dark:border-white/20 dark:bg-[#1c2a52]"
    >
      <div class="flex h-[5.4cqw] items-center gap-[1.1cqw] bg-[#eef1f7] px-[2.4cqw] dark:bg-[#223260]">
        <i v-for="n in 3" :key="n" class="size-[1.5cqw] rounded-full bg-slate-900/16 dark:bg-white/20" />
        <span class="ml-[1.6cqw] text-[2.2cqw] text-slate-500 dark:text-slate-400">{{ url }}</span>
      </div>
      <div class="aspect-[320/186] overflow-hidden [&_svg]:block [&_svg]:size-full">
        <template v-if="image">
          <CommonPicture
            :src="image"
            :alt="`Strona ${title}`"
            sizes="xs:90vw md:45vw lg:30vw"
            width="960"
            height="558"
            class="block size-full object-cover object-top"
            :class="{ 'dark:hidden': imageDark }"
          />
          <CommonPicture
            v-if="imageDark"
            :src="imageDark"
            :alt="`Strona ${title} – ciemny motyw`"
            sizes="xs:90vw md:45vw lg:30vw"
            width="960"
            height="558"
            class="hidden size-full object-cover object-top dark:block"
          />
        </template>
        <!-- eslint-disable-next-line vue/no-v-html – SVG z naszego pliku danych -->
        <div v-else-if="svg" class="size-full" v-html="svg" />
      </div>
    </div>
  </component>
</template>
