<script setup lang="ts">
// Z czym pracuję: trzy karty – codzienny stack, znane narzędzia, nauka.
defineProps<{
  daily?: string[]
  known?: string[]
  learning?: { name: string; status: string }[]
  learningNote?: string
}>()

const card =
  'flex flex-col gap-4 rounded-3xl border border-slate-900/10 bg-white p-7 shadow-sm transition-[opacity,translate] duration-700 ease-out dark:border-white/10 dark:bg-brand-900'
const cardTitle = 'text-sm font-semibold text-slate-500 dark:text-slate-400'
const chip = 'rounded-lg border px-3 py-2 text-sm'
</script>

<template>
  <section id="stack" class="relative isolate pt-22 md:pt-28 lg:pt-37.5">
    <CommonCodeBackdrop name="stack" side="right" class="top-6" />
    <div class="container">
      <CommonSectionHead title="Z czym pracuję" />

      <div class="mt-7 grid gap-6 md:grid-cols-2 lg:mt-10 lg:grid-cols-[1.25fr_1fr_0.9fr]">
        <div v-reveal :class="card">
          <h3 :class="cardTitle">Na co dzień, na produkcji</h3>
          <ul class="flex flex-wrap gap-2">
            <li
              v-for="item in daily"
              :key="item"
              :class="chip"
              class="border-transparent bg-primary-500/10 text-slate-900 dark:bg-primary-400/14 dark:text-brand-50"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <div v-reveal="80" :class="card">
          <h3 :class="cardTitle">Znam i używam</h3>
          <ul class="flex flex-wrap gap-2">
            <li
              v-for="item in known"
              :key="item"
              :class="chip"
              class="border-slate-900/10 bg-slate-50 text-slate-900 dark:border-white/10 dark:bg-[#15213f] dark:text-brand-50"
            >
              {{ item }}
            </li>
          </ul>
        </div>

        <div
          v-reveal="160"
          :class="card"
          class="border-dashed border-slate-900/16 bg-linear-[165deg] from-white to-slate-50 md:col-span-2 lg:col-span-1 dark:border-white/20 dark:from-brand-900 dark:to-[#15213f]"
        >
          <h3 :class="cardTitle">Uczę się teraz</h3>
          <ul class="flex flex-col gap-3">
            <li
              v-for="(item, i) in learning"
              :key="item.name"
              class="flex items-center justify-between gap-3 rounded-xl border border-slate-900/10 bg-white px-4 py-3.5 dark:border-white/10 dark:bg-brand-900"
            >
              <span class="text-lg font-medium text-slate-900 dark:text-brand-50">{{ item.name }}</span>
              <span
                class="rounded-full px-2 py-1 text-xs"
                :class="i === 0 ? 'bg-primary-500 text-white dark:bg-primary-400 dark:text-brand-950' : 'border border-slate-900/16 text-slate-600 dark:border-white/20 dark:text-slate-300'"
              >
                {{ item.status }}
              </span>
            </li>
          </ul>
          <p v-if="learningNote" class="text-sm/normal text-slate-500 dark:text-slate-400">{{ learningNote }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
