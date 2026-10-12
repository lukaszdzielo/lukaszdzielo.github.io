<script setup lang="ts">
// Wyróżnione projekty – kafelki w stylu posta z Instagrama.
// Używane na stronie głównej (z linkiem „Wszystkie projekty”) i na /projects (bez linku).
// Lista projektów: app/data/featuredProjects.ts.
import { visibleFeaturedProjects } from '~/data/featuredProjects'

const props = withDefaults(
  defineProps<{
    id?: string
    title?: string
    lead?: string
    allLink?: boolean // link do /projects w nagłówku sekcji
    backdrop?: boolean // blady fragment kodu w tle
  }>(),
  {
    id: 'projects',
    title: 'Rzeczy, które zbudowałem',
    lead: 'Aplikacje, strony komercyjne i projekty, na których się uczę.',
    allLink: true,
    backdrop: true,
  },
)

// date/hidden służą tylko do sortowania i filtrowania – nie przekazujemy ich do kafelka
const projects = visibleFeaturedProjects().map(({ date: _date, hidden: _hidden, ...tile }) => tile)
const scroller = useTemplateRef<HTMLElement>('scroller')
</script>

<template>
  <section :id="props.id" class="relative isolate pt-22 md:pt-28 lg:pt-37.5">
    <CommonCodeBackdrop v-if="backdrop" name="projects" side="right" class="top-6" />
    <div class="container">
      <CommonSectionHead :title="title" :lead="lead">
        <template v-if="allLink" #aside>
          <NuxtLink
            to="/projects"
            class="group inline-flex items-center gap-2 border-b border-slate-900/16 pb-1 text-sm whitespace-nowrap text-slate-900 transition-colors hover:border-primary-500 hover:text-primary-500 dark:border-white/20 dark:text-white dark:hover:border-primary-400 dark:hover:text-primary-400"
          >
            Wszystkie projekty
            <Icon name="lucide:arrow-right" class="text-sm transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
          </NuxtLink>
        </template>
      </CommonSectionHead>

      <!-- Desktop: 3 kolumny. Tablet i telefon: pasek przewijany w bok.
           overflow-y-hidden – pasek nie może przesuwać się w pionie (overflow-x-auto włącza też oś Y);
           overscroll-x-contain – gest w bok nie przewija strony ani nie cofa historii. -->
      <ul
        ref="scroller"
        class="-mx-pad mt-8 grid snap-x snap-mandatory auto-cols-[84%] grid-flow-col gap-3.5 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-px-pad px-pad pb-2 [scrollbar-width:none] sm:auto-cols-[56%] md:auto-cols-[40%] lg:mx-0 lg:mt-10 lg:grid-flow-row lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        <li
          v-for="(project, i) in projects"
          :key="project.title"
          v-reveal="(i % 3) * 80"
          class="snap-start transition-[opacity,translate] duration-700 ease-out"
        >
          <CommonProjectTile v-bind="project" />
        </li>
      </ul>
      <CommonScrollControls :target="scroller" />
    </div>
  </section>
</template>
