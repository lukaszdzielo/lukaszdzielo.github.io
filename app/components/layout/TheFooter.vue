<script setup lang="ts">
import { footerContent, type FooterLink, type FooterVariant } from '~/data/footer'

const props = withDefaults(defineProps<{ variant?: FooterVariant }>(), {
  variant: 'portfolio',
})

const content = computed(() => footerContent[props.variant])
const { openSettings } = useConsent()
const year = new Date().getFullYear()

function linkAttrs(link: FooterLink) {
  return link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {}
}

const route = useRoute()
const router = useRouter()

// „Do góry” zdejmuje też #kotwicę z adresu (np. #contact po „Opisz swój projekt”) –
// inaczej po odświeżeniu strona wracałaby na dół. Przewija wtedy router (app/router.options.ts).
function scrollToTop() {
  if (route.hash) {
    router.replace({ query: route.query, hash: '' })
    return
  }
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
}

// Wspólne klasy – Tailwind widzi je w całości, bo są pełnymi nazwami w kodzie.
// Ikony z @nuxt/icon mają rozmiar 1em, dlatego wielkość ustawiamy przez text-*.
const reveal = 'transition-[opacity,translate] duration-700 ease-out'
const heading = 'mb-5 text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400'
const link =
  'group inline-flex items-center gap-1 leading-8 text-slate-600 transition-colors hover:text-primary-500 focus-visible:text-primary-500 dark:text-slate-300 dark:hover:text-primary-400 dark:focus-visible:text-primary-400'
const arrow =
  'text-sm transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5'
</script>

<template>
  <footer
    class="border-t border-slate-900/10 bg-brand-50 text-slate-600 dark:border-white/10 dark:bg-brand-950 dark:text-slate-300"
  >
    <div class="container pt-12 pb-8 md:pt-14 lg:pt-16">
      <div
        class="grid grid-cols-2 gap-x-5 gap-y-8 text-sm sm:grid-cols-[2fr_2fr_3fr] md:gap-x-8 md:gap-y-10 md:text-base lg:grid-cols-[1.6fr_0.7fr_0.7fr_1.2fr] lg:gap-10"
      >
        <!-- Logo i krótki opis -->
        <div v-reveal class="col-span-2 sm:col-span-3 lg:col-span-1" :class="reveal">
          <p class="inline-flex items-center gap-3 text-xl font-semibold tracking-tight text-slate-900 dark:text-brand-50">
            <CommonAppLogo class="size-10" />
            <span>Łukasz Dzieło</span>
          </p>
          <p class="mt-5 max-w-[32ch] text-base/relaxed text-slate-500 dark:text-slate-400">
            {{ content.bio }}
          </p>
        </div>

        <!-- Dwie kolumny linków -->
        <nav
          v-for="(column, i) in content.columns"
          :key="column.title"
          v-reveal="(i + 1) * 80"
          :aria-label="column.title"
          :class="reveal"
        >
          <h2 :class="heading">{{ column.title }}</h2>
          <ul>
            <li v-for="item in column.links" :key="item.to">
              <NuxtLink :to="item.to" :external="item.external" v-bind="linkAttrs(item)" :class="link">
                {{ item.label }}
                <Icon v-if="item.external" name="lucide:arrow-up-right" :class="arrow" aria-hidden="true" />
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Aktualny status. Od sm: Strona, Profile i Teraz w jednym rzędzie (proporcje 2 : 2 : 3) -->
        <div v-reveal="240" class="col-span-2 sm:col-span-1" :class="reveal">
          <h2 :class="heading">{{ content.status.title }}</h2>
          <p class="flex items-center gap-2 leading-8 text-slate-900 dark:text-brand-50">
            <span class="relative flex size-2 shrink-0" aria-hidden="true">
              <span class="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
              <span class="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            {{ content.status.now }}
          </p>
          <p v-for="line in content.status.lines" :key="line" class="leading-8">{{ line }}</p>
          <NuxtLink
            v-if="content.status.link"
            :to="content.status.link.to"
            :external="content.status.link.external"
            v-bind="linkAttrs(content.status.link)"
            :class="link"
          >
            {{ content.status.link.label }}
            <Icon name="lucide:arrow-up-right" :class="arrow" aria-hidden="true" />
          </NuxtLink>
        </div>
      </div>

      <div
        class="mt-10 flex items-center justify-between gap-4 border-t border-slate-900/10 pt-6 text-sm text-slate-500 lg:mt-16 dark:border-white/10 dark:text-slate-400"
      >
        <div class="flex flex-wrap items-center gap-x-5 gap-y-1">
          <p>© {{ year }} Łukasz Dzieło</p>
          <NuxtLink to="/polityka-prywatnosci" class="transition-colors hover:text-primary-500 dark:hover:text-primary-400">Polityka prywatności</NuxtLink>
          <button type="button" class="cursor-pointer transition-colors hover:text-primary-500 dark:hover:text-primary-400" @click="openSettings">
            Ustawienia cookies
          </button>
        </div>
        <!-- Na telefonie sama strzałka w kółku, od sm: napis + strzałka -->
        <button
          type="button"
          aria-label="Do góry"
          class="group inline-flex size-10 cursor-pointer items-center justify-center gap-1.5 rounded-full border border-slate-900/10 transition-colors hover:border-primary-500 hover:text-primary-500 sm:size-auto sm:rounded-none sm:border-0 dark:border-white/10 dark:hover:border-primary-400 dark:hover:text-primary-400"
          @click="scrollToTop"
        >
          <span class="sr-only sm:not-sr-only">Do góry</span>
          <Icon
            name="lucide:arrow-up"
            class="text-base transition-transform duration-300 motion-safe:group-hover:-translate-y-0.5 sm:text-sm"
            aria-hidden="true"
          />
        </button>
      </div>
    </div>
  </footer>
</template>
