<script setup lang="ts">
// Rzeczy, które zbudowałem – 6 wyróżnionych projektów jako kafelki w stylu posta z Instagrama.
// Lista projektów jest w content/index.md. Kafelek bez `to` nie jest linkiem (podstron projektów jeszcze nie ma).
type Project = {
  title: string
  description: string
  chips?: string[]
  url: string
  mock?: string
  image?: string
  imageDark?: string
  to?: string
  href?: string
  date?: string // RRRR-MM – kafelki układają się od najnowszego
  hidden?: boolean
}

const props = defineProps<{ projects?: Project[] }>()
// `hidden: true` w content/index.md chowa projekt ze strony głównej (dane zostają)
const visible = computed(() =>
  (props.projects ?? [])
    .filter(p => !p.hidden)
    .sort((a, b) => String(b.date ?? '').localeCompare(String(a.date ?? ''))),
)
const scroller = useTemplateRef<HTMLElement>('scroller')
</script>

<template>
  <section id="projects" class="relative isolate pt-22 md:pt-28 lg:pt-37.5">
    <CommonCodeBackdrop name="projects" side="right" class="top-6" />
    <div class="container">
      <CommonSectionHead title="Rzeczy, które zbudowałem" lead="Aplikacje, strony komercyjne i projekty, na których się uczę.">
        <template #aside>
          <!-- Strona /projects w nowym wyglądzie powstanie później – link na razie nieaktywny. -->
          <span
            aria-disabled="true"
            title="Wkrótce"
            class="inline-flex cursor-not-allowed items-center gap-2 border-b border-slate-900/10 pb-1 text-sm whitespace-nowrap text-slate-400 dark:border-white/10 dark:text-slate-500"
          >
            Wszystkie projekty
            <Icon name="lucide:arrow-right" class="text-sm" aria-hidden="true" />
          </span>
        </template>
      </CommonSectionHead>

      <!-- Desktop: 3 kolumny. Tablet i telefon: pasek przewijany w bok. -->
      <ul
        ref="scroller"
        class="-mx-pad mt-8 grid snap-x snap-mandatory auto-cols-[84%] grid-flow-col gap-3.5 overflow-x-auto scroll-px-pad px-pad pb-2 [scrollbar-width:none] sm:auto-cols-[56%] md:auto-cols-[40%] lg:mx-0 lg:mt-10 lg:grid-flow-row lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        <li
          v-for="(project, i) in visible"
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
