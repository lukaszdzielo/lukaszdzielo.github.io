<script setup lang="ts">
// Podpowiedź i strzałki pod paskiem przewijanym w bok (projekty, wpisy).
// Strzałki pokazują się tylko przy myszce (pointer-fine) – bez touchpada nie da się przewinąć w bok.
// Na desktopie (lg) paska już nie ma – jest zwykła siatka, więc całość się chowa.
const props = defineProps<{ target: HTMLElement | null }>()

const { canPrev, canNext, go } = useScrollEdges(() => props.target)

const button =
  'grid size-10 cursor-pointer place-items-center rounded-full border border-slate-900/16 text-slate-900 transition hover:bg-white disabled:cursor-default disabled:opacity-35 disabled:hover:bg-transparent dark:border-white/20 dark:text-brand-50 dark:hover:bg-brand-900'
</script>

<template>
  <div class="mt-3.5 flex items-center justify-between gap-4 lg:hidden">
    <p class="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400" aria-hidden="true">
      <i class="block h-0.5 w-6.5 rounded-full bg-primary-500 dark:bg-primary-400" />
      Przesuń, żeby zobaczyć więcej
    </p>
    <div class="hidden gap-2 pointer-fine:flex">
      <button type="button" :class="button" :disabled="!canPrev" aria-label="Poprzednie" @click="go(-1)">
        <Icon name="lucide:arrow-left" class="text-lg" aria-hidden="true" />
      </button>
      <button type="button" :class="button" :disabled="!canNext" aria-label="Następne" @click="go(1)">
        <Icon name="lucide:arrow-right" class="text-lg" aria-hidden="true" />
      </button>
    </div>
  </div>
</template>
