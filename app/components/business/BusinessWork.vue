<script setup lang="ts">
// Realizacje: wybrane projekty WordPress z content/projects (tytuł, miniatura, linki) + opis z app/data/business.ts.
// Desktop: 3 kolumny. Tablet i telefon: pasek przewijany w bok (jak projekty na głównej).
import { businessWork } from '~/data/business'

const paths = businessWork.items.map(i => i.path)
const { data: projects } = await useAsyncData('business-work', () =>
  queryCollection('projects').where('path', 'IN', paths).all(),
)

const items = computed(() =>
  businessWork.items
    .map((item) => {
      const p = projects.value?.find(x => x.path === item.path)
      if (!p) return null
      const link = p.links?.live
        ? { href: p.links.live, label: 'Strona' }
        : p.links?.behance
          ? { href: p.links.behance, label: 'Behance' }
          : null
      return { ...item, title: (item as { title?: string }).title ?? p.title, image: p.image, link }
    })
    .filter(Boolean) as { path: string; text: string; tags: string[]; title: string; image?: string; link: { href: string; label: string } | null }[],
)
const scroller = useTemplateRef<HTMLElement>('scroller')
</script>

<template>
  <section id="projects" class="relative isolate pt-22 md:pt-28 lg:pt-37.5">
    <CommonCodeBackdrop name="bizWork" class="top-6" />
    <div class="container">
      <CommonSectionHead :title="businessWork.title" :lead="businessWork.lead" />

      <ul
        ref="scroller"
        class="-mx-pad mt-8 grid snap-x snap-mandatory auto-cols-[84%] grid-flow-col gap-3.5 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-px-pad px-pad pb-2 [scrollbar-width:none] sm:auto-cols-[56%] md:auto-cols-[40%] lg:mx-0 lg:mt-10 lg:grid-flow-row lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        <li v-for="(item, i) in items" :key="item.path" v-reveal="(i % 3) * 80" class="snap-start transition-[opacity,translate] duration-700 ease-out">
          <component
            :is="item.link ? 'a' : 'article'"
            :href="item.link?.href"
            :target="item.link ? '_blank' : undefined"
            :rel="item.link ? 'noopener noreferrer' : undefined"
            class="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-900/10 bg-white shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-slate-900/10 dark:border-white/10 dark:bg-brand-900 dark:hover:shadow-black/40"
          >
            <div class="aspect-[400/329] overflow-hidden bg-slate-100 dark:bg-brand-950">
              <CommonPicture
                v-if="item.image"
                :src="item.image"
                :alt="`Strona ${item.title}`"
                sizes="xs:84vw md:40vw lg:400px"
                width="400"
                height="329"
                loading="lazy"
                class="size-full object-cover object-top transition-transform duration-500 motion-safe:group-hover:scale-[1.03]"
              />
            </div>
            <div class="flex flex-1 flex-col p-5">
              <div class="flex items-baseline justify-between gap-3">
                <h3 class="font-medium text-slate-900 dark:text-brand-50">{{ item.title }}</h3>
                <span v-if="item.link" class="shrink-0 text-sm text-primary-500 dark:text-primary-400">{{ item.link.label }} ↗</span>
              </div>
              <p class="mt-1.5 text-sm/relaxed text-slate-600 dark:text-slate-300">{{ item.text }}</p>
              <ul class="mt-auto flex flex-wrap gap-1.5 pt-4">
                <li v-for="tag in item.tags" :key="tag" class="rounded-full border border-slate-900/16 px-2.5 py-0.5 text-xs text-slate-600 dark:border-white/20 dark:text-slate-300">{{ tag }}</li>
              </ul>
            </div>
          </component>
        </li>
      </ul>
      <CommonScrollControls :target="scroller" />

      <!-- Wszystkie strony WordPress: archiwum projektów z włączonym filtrem -->
      <p class="mt-8 flex justify-center lg:mt-10">
        <NuxtLink
          :to="businessWork.allTo"
          class="group inline-flex items-center gap-2 border-b border-slate-900/16 pb-1 font-medium whitespace-nowrap text-slate-900 transition-colors hover:border-primary-500 hover:text-primary-500 dark:border-white/20 dark:text-brand-50 dark:hover:border-primary-400 dark:hover:text-primary-400"
        >
          {{ businessWork.allLabel }}
          <Icon name="lucide:arrow-right" class="transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
        </NuxtLink>
      </p>
    </div>
  </section>
</template>
