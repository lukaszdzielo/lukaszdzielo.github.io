<script setup lang="ts">
// Nagłówek sekcji: tytuł h2, opcjonalny lead i miejsce po prawej (np. link „Wszystkie…”).
defineProps<{ title: string; lead?: string }>()
</script>

<template>
  <div v-reveal class="flex flex-wrap items-end justify-between gap-6 transition-[opacity,translate] duration-700 ease-out">
    <div>
      <h2 class="text-3xl/[1.1] font-medium tracking-tight text-slate-900 lg:text-5xl/[1.1] dark:text-brand-50">
        {{ title }}
      </h2>
      <p v-if="lead" class="mt-2.5 max-w-135 text-base/relaxed text-slate-600 dark:text-slate-300">{{ lead }}</p>
    </div>
    <slot name="aside" />
  </div>
</template>
