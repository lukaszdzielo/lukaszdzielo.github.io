<script setup lang="ts">
// O mnie: ilustracja + tekst. Treść (akapity, oś czasu, cytat) jest w content/index.md.
type TimelineItem = { period: string; company: string; role: string; text: string }

defineProps<{
  quote?: string
  timeline?: TimelineItem[]
  education?: string
  hobbiesLabel?: string
  hobbies?: string
}>()
</script>

<template>
  <section id="about-me" class="relative isolate pt-22 md:pt-28 lg:pt-37.5">
    <CommonCodeBackdrop name="about" class="top-6" />
    <div class="container grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
      <figure
        v-reveal
        class="m-0 aspect-[4/5] overflow-hidden rounded-3xl border border-slate-900/10 bg-linear-[165deg] from-white to-slate-50 transition-[opacity,translate] duration-700 ease-out max-lg:max-w-xl dark:border-white/10 dark:from-brand-900 dark:to-[#15213f] [&_img]:size-full [&_img]:object-cover [&_img]:object-bottom"
      >
        <slot name="image" />
      </figure>

      <div v-reveal="80" class="transition-[opacity,translate] duration-700 ease-out">
        <h2 class="mb-5 text-3xl/[1.1] font-medium tracking-tight text-slate-900 lg:text-5xl/[1.1] dark:text-white">
          <slot name="title" mdc-unwrap="p" />
        </h2>

        <div
          class="space-y-4 text-lg/relaxed text-slate-600 dark:text-slate-300 [&_strong]:font-medium [&_strong]:text-slate-900 dark:[&_strong]:text-white"
        >
          <slot />
        </div>

        <blockquote
          v-if="quote"
          class="my-6.5 border-l-2 border-primary-500 pl-5.5 text-xl/normal tracking-tight text-slate-900 dark:border-primary-400 dark:text-white"
        >
          {{ quote }}
        </blockquote>

        <ol v-if="timeline?.length" class="mt-8.5 border-t border-slate-900/10 dark:border-white/10">
          <li
            v-for="item in timeline"
            :key="item.period"
            class="grid gap-1 border-b border-slate-900/10 py-4.5 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-5 dark:border-white/10"
          >
            <time class="pt-0.5 text-sm text-slate-500 tabular-nums dark:text-slate-400">{{ item.period }}</time>
            <div>
              <p class="font-medium text-slate-900 dark:text-white">
                {{ item.company }} <span class="font-normal text-slate-500 dark:text-slate-400">· {{ item.role }}</span>
              </p>
              <p class="mt-1.5 text-sm/normal text-slate-600 dark:text-slate-300">{{ item.text }}</p>
            </div>
          </li>
        </ol>

        <p v-if="education" class="mt-4.5 text-sm/relaxed text-slate-500 dark:text-slate-400">{{ education }}</p>

        <p
          v-if="hobbies"
          class="mt-6 rounded-2xl border border-slate-900/10 bg-white px-5 py-4 text-base/relaxed text-slate-600 dark:border-white/10 dark:bg-brand-900 dark:text-slate-300"
        >
          <b class="font-medium text-slate-900 dark:text-white">{{ hobbiesLabel }}</b> {{ hobbies }}
        </p>
      </div>
    </div>
  </section>
</template>
