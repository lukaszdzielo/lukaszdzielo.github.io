<script setup lang="ts">
// O mnie: ilustracja + tekst. Treść (akapity, oś czasu, cytat) jest w content/index.md.
// Na desktopie wykształcenie i „Poza kodem” stoją pod ilustracją (lewa kolumna nie zostaje pusta),
// na telefonie i tablecie – na końcu, pod osią czasu.
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
    <div class="container grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:grid-rows-[auto_1fr] lg:gap-x-12 lg:gap-y-8">
      <figure
        v-reveal
        class="m-0 aspect-[4/5] overflow-hidden lg:col-start-1 lg:row-start-1 rounded-3xl border border-slate-900/10 bg-linear-[165deg] from-white to-slate-50 transition-[opacity,translate] duration-700 ease-out max-lg:max-w-xl dark:border-white/10 dark:from-brand-900 dark:to-[#15213f] [&_img]:size-full [&_img]:object-cover [&_img]:object-bottom"
      >
        <slot name="image" />
      </figure>

      <div v-reveal="80" class="transition-[opacity,translate] duration-700 ease-out lg:col-start-2 lg:row-span-2 lg:row-start-1">
        <h2 class="mb-5 text-3xl/[1.1] font-medium tracking-tight text-slate-900 lg:text-5xl/[1.1] dark:text-brand-50">
          <slot name="title" mdc-unwrap="p" />
        </h2>

        <div
          class="space-y-4 text-lg/relaxed text-slate-600 dark:text-slate-300 [&_strong]:font-medium [&_strong]:text-slate-900 dark:[&_strong]:text-brand-50"
        >
          <slot />
        </div>

        <blockquote
          v-if="quote"
          class="my-6.5 border-l-2 border-primary-500 pl-5.5 text-xl/normal tracking-tight text-slate-900 dark:border-primary-400 dark:text-brand-50"
        >
          {{ quote }}
        </blockquote>

        <ol v-if="timeline?.length" class="mt-8.5 border-t border-slate-900/10 dark:border-white/10">
          <li
            v-for="item in timeline"
            :key="item.period"
            class="grid gap-1 border-b border-slate-900/10 py-4.5 sm:grid-cols-[150px_minmax(0,1fr)] sm:gap-5 lg:grid-cols-1 lg:gap-1 xl:grid-cols-[150px_minmax(0,1fr)] xl:gap-5 dark:border-white/10"
          >
            <time class="pt-0.5 text-sm text-slate-500 tabular-nums dark:text-slate-400">{{ item.period }}</time>
            <div>
              <p class="font-medium text-slate-900 dark:text-brand-50">
                {{ item.company }} <span class="font-normal text-slate-500 dark:text-slate-400">· {{ item.role }}</span>
              </p>
              <p class="mt-1.5 text-sm/normal text-slate-600 dark:text-slate-300">{{ item.text }}</p>
            </div>
          </li>
        </ol>

      </div>

      <!-- Wykształcenie i „Poza kodem”: na desktopie pod ilustracją, wyżej – na końcu sekcji -->
      <div
        v-if="education || hobbies"
        v-reveal="120"
        class="-mt-4 space-y-4 transition-[opacity,translate] duration-700 ease-out max-lg:max-w-xl lg:col-start-1 lg:row-start-2 lg:mt-0"
      >
        <div v-if="education" class="rounded-2xl border border-slate-900/10 bg-white px-5 py-4 dark:border-white/10 dark:bg-brand-900">
          <p class="text-xs font-semibold tracking-widest text-slate-500 uppercase dark:text-slate-400">Wykształcenie</p>
          <!-- W treści szkoły są rozdzielone „ · ” – każda w osobnej linii -->
          <ul class="mt-2 space-y-1 text-sm/relaxed text-slate-600 dark:text-slate-300">
            <li v-for="school in education.split(' · ')" :key="school">{{ school }}</li>
          </ul>
        </div>
        <p
          v-if="hobbies"
          class="rounded-2xl border border-slate-900/10 bg-white px-5 py-4 text-base/relaxed text-slate-600 dark:border-white/10 dark:bg-brand-900 dark:text-slate-300"
        >
          <b class="font-medium text-slate-900 dark:text-brand-50">{{ hobbiesLabel }}</b> {{ hobbies }}
        </p>
      </div>
    </div>
  </section>
</template>
