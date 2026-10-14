<script setup lang="ts">
// Blady fragment kodu w tle sekcji (motyw „kod w tle” z projektu).
// Na telefonie i tablecie kod jest ledwo widoczny (5%), żeby nie przeszkadzał w czytaniu – pełna widoczność od lg.
// Sekcja-rodzic potrzebuje klas `relative isolate`, a pozycję w pionie podajesz klasą, np. class="top-10".
// Od lg odległość od krawędzi liczona od środkowego pasa 1920 px (max(…, 50% − 960 px + …)) – na bardzo szerokim ekranie kod zostaje przy treści.
import { codeFragments, type CodeFragment } from '~/data/codeFragments'

defineProps<{ name: CodeFragment; side?: 'left' | 'right' }>()
</script>

<template>
  <pre
    aria-hidden="true"
    class="pointer-events-none absolute -z-10 m-0 font-mono text-xs/relaxed font-medium whitespace-pre text-slate-900/5 select-none lg:text-sm/relaxed lg:text-slate-900/11 dark:text-indigo-100/5 lg:dark:text-indigo-100/12"
    :class="
      side === 'right'
        ? 'right-1.5 mask-[linear-gradient(270deg,transparent,#000_14%,#000_72%,transparent)] md:right-3 lg:right-[max(--spacing(7.5),calc(50%-60rem+--spacing(7.5)))]'
        : 'left-2 mask-[linear-gradient(90deg,transparent,#000_14%,#000_72%,transparent)] md:left-4 lg:left-[max(--spacing(10),calc(50%-60rem+--spacing(10)))]'
    "
  >{{ codeFragments[name] }}</pre>
</template>
