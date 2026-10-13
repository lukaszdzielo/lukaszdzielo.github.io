<script setup lang="ts">
// Pasek z czterema liczbami pod hero: na telefonie jedna pod drugą, od sm po dwie, od lg cztery w rzędzie.
// Linie między polami to tło listy prześwitujące przez 1-pikselowy odstęp (gap-px) – działa przy każdym układzie.
defineProps<{ items?: { value: string; suffix?: string; text: string }[] }>()
</script>

<template>
  <section class="pt-7 lg:pt-2.5 lg:pb-5">
    <div class="container">
      <ul
        v-reveal
        class="grid gap-px overflow-hidden rounded-3xl border border-slate-900/10 bg-slate-900/10 shadow-sm transition-[opacity,translate] duration-700 ease-out sm:grid-cols-2 lg:grid-cols-4 dark:border-white/10 dark:bg-white/10"
      >
        <li
          v-for="item in items"
          :key="item.value"
          class="flex flex-col gap-1.5 bg-white px-6.5 py-6 dark:bg-brand-900"
        >
          <b class="text-3xl font-medium tracking-tight text-slate-900 dark:text-brand-50">
            {{ item.value }}<small v-if="item.suffix" class="text-lg text-primary-500 dark:text-primary-400">{{ item.suffix }}</small>
          </b>
          <span class="text-sm text-slate-600 dark:text-slate-300">{{ item.text }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
