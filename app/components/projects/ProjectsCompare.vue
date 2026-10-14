<script setup lang="ts">
// „Przed i po”: suwak po pierwszym ekranie starej i nowej wersji strony + tabela pomiarów.
// Suwak to zwykły <input type="range"> na całym obrazku (niewidoczny) – działa myszą, palcem
// i klawiaturą (strzałki). Stara wersja leży na wierzchu i jest przycinana clip-path do pozycji suwaka.
type Side = { src: string; label: string; alt: string; width?: number; height?: number }
type Row = { label: string; before: string; after: string }

defineProps<{
  before: Side
  after: Side
  rows?: Row[]
  note?: string
  address?: string
}>()

const { t } = useI18n({ useScope: 'local' })
const pos = ref(50)
</script>

<template>
  <div class="grid items-start gap-8 lg:grid-cols-5">
    <!-- Bez tabeli pomiarów suwak zajmuje całą szerokość, a opis ląduje pod nim -->
    <div :class="rows?.length ? 'lg:col-span-3' : 'lg:col-span-5'">
      <div class="overflow-hidden rounded-2xl border border-slate-900/10 bg-white shadow-xl shadow-slate-900/10 dark:border-white/10 dark:bg-brand-900 dark:shadow-black/40">
        <div class="flex h-8.5 items-center gap-1.75 border-b border-slate-900/10 bg-slate-100 px-3.5 dark:border-white/10 dark:bg-white/5" aria-hidden="true">
          <i class="size-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
          <i class="size-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
          <i class="size-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
          <span v-if="address" class="ml-2.5 truncate text-xs text-slate-600 dark:text-slate-400">{{ address }}</span>
        </div>
        <div class="relative select-none">
          <CommonPicture :src="after.src" :alt="after.alt" :width="after.width" :height="after.height" :sizes="rows?.length ? 'xs:100vw lg:860px' : 'xs:100vw lg:1280px'" loading="lazy" class="block h-auto w-full" />
          <div class="absolute inset-0" :style="{ clipPath: `inset(0 ${100 - pos}% 0 0)` }">
            <CommonPicture :src="before.src" :alt="before.alt" :width="before.width" :height="before.height" :sizes="rows?.length ? 'xs:100vw lg:860px' : 'xs:100vw lg:1280px'" loading="lazy" class="block h-auto w-full" />
          </div>
          <!-- linia i uchwyt suwaka -->
          <div class="pointer-events-none absolute inset-y-0 w-0.5 -translate-x-1/2 bg-white shadow-sm" :style="{ left: `${pos}%` }" aria-hidden="true">
            <span class="absolute top-1/2 left-1/2 grid size-9 -translate-1/2 place-items-center rounded-full bg-white text-brand-950 shadow-lg sm:size-11">
              <Icon name="lucide:move-horizontal" class="size-4 sm:size-5" />
            </span>
          </div>
          <span class="pointer-events-none absolute bottom-2 left-2 rounded-full bg-brand-950/75 px-2.5 py-1 text-xs font-medium text-white sm:bottom-3.5 sm:left-3.5 sm:px-3 sm:py-1.5">{{ before.label }}</span>
          <span class="pointer-events-none absolute right-2 bottom-2 rounded-full bg-brand-950/75 px-2.5 py-1 text-xs font-medium text-white sm:right-3.5 sm:bottom-3.5 sm:px-3 sm:py-1.5">{{ after.label }}</span>
          <input
            v-model.number="pos"
            type="range"
            min="0"
            max="100"
            :aria-label="t('slider')"
            class="absolute inset-0 size-full cursor-ew-resize opacity-0"
          >
        </div>
      </div>
      <p v-if="note && !rows?.length" class="mt-3.5 text-sm/relaxed text-slate-600 dark:text-slate-400">{{ note }}</p>
    </div>

    <div v-if="rows?.length" class="rounded-3xl border border-slate-900/10 bg-white px-4 pt-1 pb-4 shadow-sm sm:px-6 sm:pb-5 lg:col-span-2 dark:border-white/10 dark:bg-brand-900">
      <table class="w-full text-sm sm:text-base">
        <thead>
          <tr class="border-b border-slate-900/10 dark:border-white/10">
            <th class="py-3 text-left font-normal"><span class="sr-only">{{ t('metric') }}</span></th>
            <th class="w-18 py-3 text-right text-xs font-normal tracking-widest text-slate-600 uppercase dark:text-slate-400">{{ t('before') }}</th>
            <th class="w-18 py-3 text-right text-xs font-normal tracking-widest text-slate-600 uppercase dark:text-slate-400">{{ t('after') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="row in rows" :key="row.label" class="border-b border-slate-900/10 dark:border-white/10">
            <th class="py-3 pr-3 text-left font-normal text-slate-900 dark:text-brand-50">{{ row.label }}</th>
            <td class="py-3 text-right text-slate-600 dark:text-slate-300">{{ row.before }}</td>
            <td class="py-3 text-right font-semibold text-primary-500 dark:text-primary-400">{{ row.after }}</td>
          </tr>
        </tbody>
      </table>
      <p v-if="note" class="mt-3.5 text-xs/relaxed text-slate-600 sm:text-sm/relaxed dark:text-slate-400">{{ note }}</p>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": { "slider": "Compare: move to see the old or the new version", "metric": "Measurement", "before": "Before", "after": "After" },
  "pl": { "slider": "Porównanie: przesuń, żeby zobaczyć starą albo nową wersję", "metric": "Pomiar", "before": "Przed", "after": "Po" }
}
</i18n>
