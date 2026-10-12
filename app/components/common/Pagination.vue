<script setup lang="ts">
// Paginacja z linkami (każda strona ma własny adres, więc działa bez JS i w wyszukiwarkach).
// Desktop: „Poprzednia”, numery z „…”, „Następna”. Telefon: strzałki i „Strona X z Y”.
const props = defineProps<{ page: number; pages: number; pathFor: (page: number) => string }>()

// 1 … 4 5 6 … 12 – zawsze pierwsza, ostatnia i sąsiedzi bieżącej
const items = computed<(number | '…')[]>(() => {
  const { page, pages } = props
  const keep = new Set([1, pages, page - 1, page, page + 1].filter(n => n >= 1 && n <= pages))
  const out: (number | '…')[] = []
  let prev = 0
  for (const n of [...keep].sort((a, b) => a - b)) {
    if (n - prev > 1) out.push('…')
    out.push(n)
    prev = n
  }
  return out
})

const arrow =
  'inline-flex h-11 items-center gap-2 rounded-full border border-slate-900/16 px-4 text-sm font-medium text-slate-900 transition-colors hover:bg-white dark:border-white/20 dark:text-brand-50 dark:hover:bg-brand-900'
const off = 'opacity-35'
const NuxtLink = resolveComponent('NuxtLink')
</script>

<template>
  <nav aria-label="Strony" class="flex items-center justify-between gap-3">
    <!-- Na pierwszej / ostatniej stronie strzałka jest wyszarzonym <span>, nie linkiem -->
    <component
      :is="page > 1 ? NuxtLink : 'span'"
      :to="page > 1 ? pathFor(page - 1) : undefined"
      :class="[arrow, page > 1 ? '' : off]"
      :aria-disabled="page <= 1 || undefined"
    >
      <Icon name="lucide:arrow-left" aria-hidden="true" />
      <span class="max-sm:sr-only">Poprzednia</span>
    </component>

    <p class="text-sm text-slate-600 sm:hidden dark:text-slate-300">
      Strona <b class="font-semibold text-slate-900 dark:text-brand-50">{{ page }}</b> z {{ pages }}
    </p>

    <ol class="hidden items-center gap-1 sm:flex">
      <li v-for="(item, i) in items" :key="`${item}-${i}`">
        <span v-if="item === '…'" class="px-2 text-slate-400">…</span>
        <NuxtLink
          v-else
          :to="pathFor(item)"
          :aria-current="item === page ? 'page' : undefined"
          class="grid size-11 place-items-center rounded-full text-sm transition-colors"
          :class="item === page ? 'bg-primary-500 font-semibold text-white dark:bg-primary-400 dark:text-brand-950' : 'text-slate-600 hover:bg-white dark:text-slate-300 dark:hover:bg-brand-900'"
        >
          {{ item }}
        </NuxtLink>
      </li>
    </ol>

    <component
      :is="page < pages ? NuxtLink : 'span'"
      :to="page < pages ? pathFor(page + 1) : undefined"
      :class="[arrow, page < pages ? '' : off]"
      :aria-disabled="page >= pages || undefined"
    >
      <span class="max-sm:sr-only">Następna</span>
      <Icon name="lucide:arrow-right" aria-hidden="true" />
    </component>
  </nav>
</template>
