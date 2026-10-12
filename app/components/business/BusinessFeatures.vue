<script setup lang="ts">
import { businessFeatures } from '~/data/business'

// Klucze ikon z app/data/business.ts → ikony lucide (pełne nazwy tutaj, żeby trafiły do paczki)
const icons: Record<string, string> = {
  pen: 'lucide:pen-tool',
  blocks: 'lucide:blocks',
  phone: 'lucide:smartphone',
  search: 'lucide:search',
  server: 'lucide:server',
  chat: 'lucide:message-circle',
}
</script>

<template>
  <section id="offer" class="relative isolate pt-22 md:pt-28 lg:pt-37.5">
    <div class="container">
      <CommonSectionHead :title="businessFeatures.title" :lead="businessFeatures.lead" />
      <ul class="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-6">
        <li
          v-for="(item, i) in businessFeatures.items"
          :key="item.title"
          v-reveal="(i % 3) * 80"
          class="grid grid-cols-[3rem_minmax(0,1fr)] gap-x-4 gap-y-1 rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm transition-[opacity,translate] duration-700 ease-out sm:block sm:p-7 dark:border-white/10 dark:bg-brand-900"
        >
          <span class="row-span-2 grid size-12 place-items-center rounded-xl bg-primary-500/10 text-xl text-primary-500 dark:bg-primary-400/14 dark:text-primary-400">
            <Icon :name="icons[item.icon] ?? 'lucide:check'" aria-hidden="true" />
          </span>
          <h3 class="font-medium text-slate-900 sm:mt-6 sm:text-lg dark:text-brand-50">{{ item.title }}</h3>
          <p class="text-sm/relaxed text-slate-600 sm:mt-2 dark:text-slate-300">{{ item.text }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
