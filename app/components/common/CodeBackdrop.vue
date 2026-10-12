<script setup lang="ts">
// Blady fragment kodu w tle sekcji (motyw „kod w tle” z projektu).
// Sekcja-rodzic potrzebuje klas `relative isolate`, a pozycję w pionie podajesz klasą, np. class="top-10".
import { codeFragments, type CodeFragment } from '~/data/codeFragments'

defineProps<{ name: CodeFragment; side?: 'left' | 'right' }>()
</script>

<template>
  <pre
    aria-hidden="true"
    class="pointer-events-none absolute -z-10 m-0 font-mono text-xs/relaxed font-medium whitespace-pre text-slate-900/11 select-none lg:text-sm/[1.8] dark:text-indigo-100/12"
    :class="
      side === 'right'
        ? 'right-1.5 mask-[linear-gradient(270deg,transparent,#000_14%,#000_72%,transparent)] md:right-3 lg:right-7.5'
        : 'left-2 mask-[linear-gradient(90deg,transparent,#000_14%,#000_72%,transparent)] md:left-4 lg:left-10'
    "
  >{{ codeFragments[name] }}</pre>
</template>
