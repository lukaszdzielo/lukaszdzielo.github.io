<script setup lang="ts">
// Hero strony dla firm. Po prawej zawsze 2 najnowsze realizacje na WordPressie
// (z app/data/featuredProjects.ts – projekty z etykietą „WordPress” i zrzutem ekranu).
import { businessHero } from '~/data/business'
import { visibleFeaturedProjects } from '~/data/featuredProjects'

const { t } = useI18n({ useScope: 'local' })
const { lang } = useContentLocale()
const link = useLocalLink()
const hero = useLocalized(businessHero)
const latest = computed(() =>
  visibleFeaturedProjects(lang.value)
    .filter(p => p.chips?.includes('WordPress') && p.image)
    .slice(0, 2),
)
</script>

<template>
  <header class="relative isolate">
    <div class="hero-glow pointer-events-none absolute inset-x-0 -top-18.25 -z-10 h-375" aria-hidden="true" />

    <div class="container grid items-center gap-12 pt-10 pb-6 lg:min-h-160 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-10 lg:pt-6">
      <div>
        <h1 class="text-4xl leading-none font-semibold tracking-tighter text-slate-900 motion-safe:animate-fade-up sm:text-5xl lg:text-6xl dark:text-brand-50">
          {{ hero.title }} <span class="text-primary-500 dark:text-primary-400">{{ hero.accent }}</span>
        </h1>
        <p class="mt-5.5 max-w-135 text-base/relaxed text-slate-600 motion-safe:animate-fade-up motion-safe:[animation-delay:120ms] dark:text-slate-300">
          {{ hero.lead }}
        </p>
        <div class="mt-8 flex flex-wrap items-center gap-3 motion-safe:animate-fade-up motion-safe:[animation-delay:200ms]">
          <NuxtLink
            :to="link('/strony-dla-firm#contact')"
            class="group inline-flex h-14 items-center gap-3 rounded-full bg-brand-900 pr-2 pl-6 font-medium text-white transition-transform duration-300 motion-safe:hover:-translate-y-0.5 dark:bg-slate-100 dark:text-brand-950"
          >
            {{ t('cta') }}
            <span class="grid size-10 place-items-center rounded-full bg-primary-500 text-white dark:bg-primary-400 dark:text-brand-950">
              <Icon name="lucide:arrow-up-right" class="transition-transform motion-safe:group-hover:translate-x-px motion-safe:group-hover:-translate-y-px" aria-hidden="true" />
            </span>
          </NuxtLink>
          <NuxtLink
            :to="link('/strony-dla-firm#projects')"
            class="inline-flex h-14 items-center rounded-full border border-slate-900/16 px-6 font-medium text-slate-900 transition-colors hover:bg-white dark:border-white/20 dark:text-brand-50 dark:hover:bg-brand-900"
          >
            {{ t('work') }}
          </NuxtLink>
        </div>
        <dl class="mt-10 grid max-w-135 grid-cols-3 gap-4 border-t border-slate-900/10 pt-6 motion-safe:animate-fade-up motion-safe:[animation-delay:280ms] dark:border-white/10">
          <div v-for="fact in hero.facts" :key="fact.value">
            <dt class="text-xl font-medium tracking-tight text-slate-900 sm:text-2xl dark:text-brand-50">{{ fact.value }}</dt>
            <dd class="mt-1 text-xs text-slate-600 sm:text-sm dark:text-slate-400">{{ fact.text }}</dd>
          </div>
        </dl>
      </div>

      <!-- Dwa okna przeglądarki z najnowszymi realizacjami -->
      <div class="relative h-72 motion-safe:animate-fade-up motion-safe:[animation-delay:120ms] sm:h-96 lg:h-120" aria-hidden="true">
        <div
          v-for="(project, i) in latest"
          :key="project.title"
          class="absolute w-3/4 overflow-hidden rounded-xl border border-slate-900/16 bg-white shadow-2xl shadow-brand-950/45 sm:rounded-2xl dark:border-white/20 dark:bg-brand-800"
          :class="i === 0 ? 'top-0 left-0 -rotate-3' : 'right-0 bottom-0 rotate-2'"
        >
          <div class="flex h-6 items-center gap-1.5 bg-brand-50 px-3 sm:h-7 dark:bg-brand-800">
            <i v-for="n in 3" :key="n" class="size-1.5 rounded-full bg-slate-900/16 sm:size-2 dark:bg-white/20" />
            <span class="ml-2 truncate text-xs text-slate-600 dark:text-slate-400">{{ project.url }}</span>
          </div>
          <CommonPicture
            :src="project.image!"
            :alt="''"
            sizes="xs:80vw lg:40vw"
            width="960"
            height="558"
            :modifiers="{ position: 'top' }"
            class="block aspect-[960/558] w-full object-cover object-top"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<i18n lang="json">
{
  "en": { "cta": "Describe your project", "work": "See my work" },
  "pl": { "cta": "Opisz swój projekt", "work": "Zobacz realizacje" }
}
</i18n>
