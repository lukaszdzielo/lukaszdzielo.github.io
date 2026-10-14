<script setup lang="ts">
// Zrzut strony w ramce okna przeglądarki: pasek z trzema kropkami i adresem, pod nim obrazek.
// Używane w hero strony projektu i w galerii. Same elementy <span>, bo w galerii ramka siedzi w <button>.
withDefaults(defineProps<{
  src: string
  alt: string
  address?: string
  sizes?: string
  loading?: 'lazy' | 'eager'
  fetchpriority?: 'high' | 'low' | 'auto'
  crop?: boolean // wysoki zrzut (cała strona) – w ramce widać tylko górę, proporcje 16:10
  width?: number // wymiary oryginału – przeglądarka rezerwuje miejsce, strona nie skacze (CLS)
  height?: number
}>(), { sizes: 'xs:100vw lg:50vw', loading: 'lazy', fetchpriority: undefined })
</script>

<template>
  <span class="block overflow-hidden rounded-2xl border border-slate-900/10 bg-white shadow-xl shadow-slate-900/10 dark:border-white/10 dark:bg-brand-900 dark:shadow-black/40">
    <span class="flex h-8.5 items-center gap-1.75 border-b border-slate-900/10 bg-slate-100 px-3.5 dark:border-white/10 dark:bg-white/5" aria-hidden="true">
      <i class="size-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
      <i class="size-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
      <i class="size-2.5 rounded-full bg-slate-300 dark:bg-white/20" />
      <span v-if="address" class="ml-2.5 truncate text-xs text-slate-600 dark:text-slate-400">{{ address }}</span>
    </span>
    <span v-if="crop" class="block aspect-16/10 overflow-hidden">
      <CommonPicture :src="src" :alt="alt" :sizes="sizes" :loading="loading" :fetchpriority="fetchpriority" class="block size-full object-cover object-top" />
    </span>
    <CommonPicture v-else :src="src" :alt="alt" :sizes="sizes" :width="width" :height="height" :loading="loading" :fetchpriority="fetchpriority" class="block h-auto w-full" />
  </span>
</template>
