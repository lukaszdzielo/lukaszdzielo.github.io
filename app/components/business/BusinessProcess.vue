<script setup lang="ts">
import { businessProcess } from '~/data/business'
</script>

<template>
  <section id="process" class="relative isolate pt-22 md:pt-28 lg:pt-37.5">
    <CommonCodeBackdrop name="bizProcess" side="right" class="top-6" />
    <div class="container">
      <CommonSectionHead :title="businessProcess.title" :lead="businessProcess.lead" />
      <ol class="mt-8 grid gap-8 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-6">
        <li
          v-for="(step, i) in businessProcess.steps"
          :key="step.title"
          v-reveal="i * 80"
          class="border-t-2 border-slate-900/10 pt-5 transition-[opacity,translate] duration-700 ease-out dark:border-white/10"
        >
          <span class="-mt-5.5 block h-0.5 w-10 bg-primary-500 dark:bg-primary-400" aria-hidden="true" />
          <p class="mt-5 text-sm font-semibold text-primary-500 tabular-nums dark:text-primary-400">0{{ i + 1 }}</p>
          <h3 class="mt-2 text-xl font-medium tracking-tight text-slate-900 dark:text-brand-50">{{ step.title }}</h3>
          <p class="mt-2.5 text-sm/relaxed text-slate-600 dark:text-slate-300">{{ step.text }}</p>
          <span class="mt-4 inline-block rounded-full border border-slate-900/16 px-2.5 py-1 text-xs text-slate-500 dark:border-white/20 dark:text-slate-400">{{ step.time }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>
