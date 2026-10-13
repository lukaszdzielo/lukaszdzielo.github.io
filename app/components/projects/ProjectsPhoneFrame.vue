<script setup lang="ts">
// Zrzut strony w ramce telefonu – widać górę strony (zrzut może być całą, długą stroną).
withDefaults(defineProps<{
  src: string
  alt: string
  sizes?: string
  loading?: 'lazy' | 'eager'
}>(), { sizes: 'xs:200px', loading: 'lazy' })
</script>

<template>
  <span class="block aspect-9/19 overflow-hidden rounded-3xl bg-slate-900 p-1.25 shadow-xl shadow-slate-900/20 sm:rounded-4xl sm:p-2 dark:bg-black dark:shadow-black/50">
    <CommonPicture :src="src" :alt="alt" :sizes="sizes" :loading="loading" class="block size-full rounded-2xl object-cover object-top sm:rounded-3xl" />
  </span>
</template>
