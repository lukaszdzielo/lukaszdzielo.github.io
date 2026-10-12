<script setup lang="ts">
// Najnowsze wpisy na stronie głównej. Gdy nie ma żadnego opublikowanego wpisu
// (wszystkie mają `draft: true`), sekcja zostaje, a w miejscu kart jest informacja o braku wpisów.
const { data: posts } = await useAsyncData('home-posts', () =>
  queryCollection('blog')
    .where('draft', '=', false)
    .order('date', 'DESC')
    .limit(6)
    .all(),
)
const scroller = useTemplateRef<HTMLElement>('scroller')
</script>

<template>
  <section id="posts" class="relative isolate pt-22 md:pt-28 lg:pt-37.5">
    <CommonCodeBackdrop name="posts" side="right" class="top-6" />
    <div class="container">
      <CommonSectionHead
        title="Wpisy"
        lead="Case study i krótsze wpisy – o tym, co zbudowałem, poprawiłem i czego się nauczyłem."
      >
        <template #aside>
          <!-- Link do /blog jest aktywny, gdy jest co najmniej jeden opublikowany wpis -->
          <NuxtLink
            v-if="posts?.length"
            to="/blog"
            class="group inline-flex items-center gap-2 border-b border-slate-900/16 pb-1 text-sm whitespace-nowrap text-slate-900 transition-colors hover:border-primary-500 hover:text-primary-500 dark:border-white/20 dark:text-brand-50 dark:hover:border-primary-400 dark:hover:text-primary-400"
          >
            Wszystkie wpisy
            <Icon name="lucide:arrow-right" class="text-sm transition-transform motion-safe:group-hover:translate-x-0.5" aria-hidden="true" />
          </NuxtLink>
          <span
            v-else
            aria-disabled="true"
            title="Wkrótce"
            class="inline-flex cursor-not-allowed items-center gap-2 border-b border-slate-900/10 pb-1 text-sm whitespace-nowrap text-slate-400 dark:border-white/10 dark:text-slate-500"
          >
            Wszystkie wpisy
            <Icon name="lucide:arrow-right" class="text-sm" aria-hidden="true" />
          </span>
        </template>
      </CommonSectionHead>

      <!-- Desktop: siatka 3 kolumny. Tablet i telefon: pasek przewijany w bok. -->
      <ul
        v-if="posts?.length"
        ref="scroller"
        class="-mx-pad mt-8 grid snap-x snap-mandatory auto-cols-[84%] grid-flow-col gap-3.5 overflow-x-auto overflow-y-hidden overscroll-x-contain scroll-px-pad px-pad pb-2 [scrollbar-width:none] sm:auto-cols-[56%] md:auto-cols-[40%] lg:mx-0 lg:mt-10 lg:grid-flow-row lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        <li
          v-for="(post, i) in posts"
          :key="post.path"
          v-reveal="(i % 3) * 80"
          class="snap-start transition-[opacity,translate] duration-700 ease-out"
        >
          <CommonPostCard :post="post" />
        </li>
      </ul>
      <CommonScrollControls v-if="posts?.length" :target="scroller" />

      <!-- Stan pusty -->
      <div
        v-else
        v-reveal
        class="mt-8 flex flex-col items-center gap-3 rounded-3xl border border-dashed border-slate-900/15 px-6 py-14 text-center transition-[opacity,translate] duration-700 ease-out lg:mt-10 dark:border-white/15"
      >
        <span class="grid size-12 place-items-center rounded-full bg-primary-500/10 text-primary-500 dark:bg-primary-400/10 dark:text-primary-400">
          <Icon name="lucide:pen-line" class="text-xl" aria-hidden="true" />
        </span>
        <p class="text-lg font-semibold text-slate-900 dark:text-brand-50">Aktualnie brak wpisów</p>
        <p class="max-w-md text-[0.9375rem]/relaxed text-slate-500 dark:text-slate-400">
          Pierwsze case study i wpisy o tym, nad czym pracuję, pojawią się tutaj wkrótce.
        </p>
      </div>
    </div>
  </section>
</template>
