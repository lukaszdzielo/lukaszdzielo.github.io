<script setup lang="ts">
// Przyklejona nawigacja. Na samej górze strony jest przezroczysta (poświata hero przechodzi pod nią
// bez odcięcia), po przewinięciu dostaje półprzezroczyste tło z rozmyciem i dolną linię.
// Od lg (1024 px): sygnet, menu, przełącznik motywu i „Kontakt”.
// Poniżej: sygnet, przełącznik motywu, „Kontakt” i przycisk menu, które otwiera panel z linkami.
// Wariant „business” (strona dla firm): menu z sekcjami oferty i przycisk „Wyceń stronę”.
// Sygnet zawsze prowadzi do portfolio (strona główna), a napis „Strony dla firm” – na górę strony dla firm.
// Przełącznik języka: od lg obok przełącznika motywu, poniżej – w otwartym menu.
import { businessMenu } from '~/data/business'

const props = withDefaults(defineProps<{ variant?: 'portfolio' | 'business' }>(), { variant: 'portfolio' })

const { t } = useI18n({ useScope: 'local' })
const link = useLocalLink()
const bizMenu = useLocalized(businessMenu)
const portfolioMenu = computed(() => [
  { label: t('menu.projects'), to: '/#projects' },
  { label: t('menu.services'), to: '/#services' },
  { label: t('menu.about'), to: '/#about-me' },
  { label: t('menu.posts'), to: '/#posts' },
])
const business = computed(() => props.variant === 'business')
const menu = computed(() => (business.value ? bizMenu.value : portfolioMenu.value))
const cta = computed(() =>
  business.value
    ? { label: t('cta.business'), to: '/strony-dla-firm#contact', mobile: t('cta.businessMobile') }
    : { label: t('cta.contact'), to: '/#contact', mobile: t('cta.contactMobile') },
)

const stuck = ref(false)
const open = ref(false)
const toggleBtn = useTemplateRef<HTMLButtonElement>('toggleBtn')

function onScroll() {
  stuck.value = window.scrollY > 20
}

// Blokada przewijania strony pod otwartym menu. Szerokość paska przewijania oddajemy jako padding,
// żeby treść nie przeskakiwała w bok (na zwężonym oknie desktopu). Reszta strony dostaje `inert`,
// więc Tab chodzi tylko po menu, a czytnik ekranu nie czyta tła.
function lockPage(lock: boolean) {
  const root = document.documentElement
  const gap = window.innerWidth - root.clientWidth
  root.style.overflow = lock ? 'hidden' : ''
  root.style.paddingRight = lock && gap > 0 ? `${gap}px` : ''
  document.querySelectorAll('main, footer').forEach(el => el.toggleAttribute('inert', lock))
}

function close({ returnFocus = false } = {}) {
  if (!open.value) return
  open.value = false
  if (returnFocus) toggleBtn.value?.focus()
}

// Fokus zostaje na przycisku menu (wzorzec „disclosure”) – kolejny Tab wchodzi w linki panelu
watch(open, isOpen => lockPage(isOpen), { flush: 'sync' })

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close({ returnFocus: true })
}

// Po poszerzeniu okna do wersji desktopowej menu mobilne się zamyka
let desktop: MediaQueryList | undefined
function onDesktop(e: MediaQueryListEvent) {
  if (e.matches) close()
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('keydown', onKeydown)
  desktop = window.matchMedia('(min-width: 64rem)')
  desktop.addEventListener('change', onDesktop)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  desktop?.removeEventListener('change', onDesktop)
  lockPage(false)
})

const navLink = 'transition-colors hover:text-slate-900 dark:hover:text-brand-50'
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b py-3.5 transition duration-300"
    :class="[
      stuck || open ? 'border-slate-900/10 dark:border-white/10' : 'border-transparent',
      open ? 'bg-brand-50 dark:bg-brand-950' : stuck ? 'bg-brand-50/76 backdrop-blur-md dark:bg-brand-950/76' : 'bg-transparent',
    ]"
  >
    <div class="container flex items-center gap-6">
      <div class="flex shrink-0 items-center gap-3">
        <NuxtLink
          :to="link('/')"
          class="inline-flex h-10 items-center text-slate-900 dark:text-brand-50"
          :aria-label="t('home')"
          @click="close()"
        >
          <CommonAppLogo class="size-9 shrink-0" :stroke-width="13" />
        </NuxtLink>
        <NuxtLink
          v-if="business"
          :to="link('/strony-dla-firm')"
          class="hidden border-l border-slate-900/16 pl-3 text-sm text-slate-500 transition-colors hover:text-slate-900 sm:inline dark:border-white/20 dark:text-slate-400 dark:hover:text-brand-50"
          @click="close()"
        >
          {{ t('business') }}
        </NuxtLink>
      </div>

      <nav class="mx-auto hidden gap-7 text-sm whitespace-nowrap text-slate-600 lg:flex dark:text-slate-300" :aria-label="t('mainNav')">
        <NuxtLink v-for="item in menu" :key="item.to" :to="link(item.to)" :class="navLink">
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="ml-auto flex items-center gap-2 lg:ml-0">
        <CommonLanguageSwitch class="max-lg:hidden" />
        <!-- Przełącznik motywu wyłączony – strona jest tylko w ciemnym motywie (próba) -->
        <NuxtLink
          :to="link(cta.to)"
          class="group inline-flex h-11 items-center gap-2.5 rounded-full bg-brand-900 py-1.75 pr-1.75 pl-4.5 text-sm font-medium whitespace-nowrap text-white dark:bg-slate-100 dark:text-brand-950"
          @click="close()"
        >
          {{ cta.label }}
          <span class="grid size-7.5 place-items-center rounded-full bg-primary-500 text-white dark:bg-primary-400 dark:text-brand-950">
            <Icon name="lucide:arrow-up-right" class="transition-transform motion-safe:group-hover:translate-x-px motion-safe:group-hover:-translate-y-px" aria-hidden="true" />
          </span>
        </NuxtLink>

        <!-- Przycisk menu mobilnego: trzy kreski zamieniają się w X -->
        <button
          ref="toggleBtn"
          type="button"
          class="relative grid size-11 cursor-pointer place-items-center rounded-xl border border-slate-900/16 text-slate-900 transition-colors hover:bg-white lg:hidden dark:border-white/20 dark:text-brand-50 dark:hover:bg-brand-900"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          :aria-label="open ? t('closeMenu') : t('openMenu')"
          @click="open = !open"
        >
          <span class="relative block h-3 w-4.5" aria-hidden="true">
            <i
              class="absolute left-0 block h-0.5 w-full rounded-full bg-current transition duration-300"
              :class="open ? 'top-1.25 rotate-45' : 'top-0'"
            />
            <i
              class="absolute top-1.25 left-0 block h-0.5 w-full rounded-full bg-current transition duration-300"
              :class="open ? 'opacity-0' : ''"
            />
            <i
              class="absolute left-0 block h-0.5 w-full rounded-full bg-current transition duration-300"
              :class="open ? 'top-1.25 -rotate-45' : 'top-2.5'"
            />
          </span>
        </button>
      </div>
    </div>

    <!-- Panel menu mobilnego – pod paskiem, na całą wysokość ekranu, przewija się sam -->
    <Transition
      enter-active-class="motion-safe:transition motion-safe:duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      leave-active-class="motion-safe:transition motion-safe:duration-200 ease-in"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <nav
        v-if="open"
        id="mobile-menu"
        class="absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto overscroll-contain border-t border-slate-900/10 bg-brand-50 lg:hidden dark:border-white/10 dark:bg-brand-950"
        :aria-label="t('menuLabel')"
      >
        <ul class="container flex flex-col py-6">
          <li v-for="item in menu" :key="item.to" class="border-b border-slate-900/10 dark:border-white/10">
            <NuxtLink
              :to="link(item.to)"
              class="group flex items-center justify-between py-4 text-3xl font-medium tracking-tight text-slate-900 dark:text-brand-50"
              @click="close()"
            >
              {{ item.label }}
              <Icon name="lucide:arrow-right" class="text-xl text-primary-500 transition-transform motion-safe:group-hover:translate-x-1 dark:text-primary-400" aria-hidden="true" />
            </NuxtLink>
          </li>
        </ul>
        <div class="container pb-6">
          <CommonLanguageSwitch variant="segmented" @switched="close()" />
        </div>
        <div class="container flex flex-wrap gap-3 pb-8">
          <NuxtLink
            :to="link(cta.to)"
            class="inline-flex h-12 items-center rounded-full bg-brand-900 px-6 font-medium text-white dark:bg-slate-100 dark:text-brand-950"
            @click="close()"
          >
            {{ cta.mobile }}
          </NuxtLink>
          <NuxtLink
            v-if="business"
            :to="link('/')"
            class="inline-flex h-12 items-center rounded-full border border-slate-900/16 px-6 font-medium text-slate-900 dark:border-white/20 dark:text-brand-50"
            @click="close()"
          >
            {{ t('portfolio') }}
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>

<i18n lang="json">
{
  "en": {
    "menu": { "projects": "Projects", "services": "Work with me", "about": "About", "posts": "Posts" },
    "cta": { "business": "Get a quote", "businessMobile": "Describe your project", "contact": "Contact", "contactMobile": "Get in touch" },
    "home": "Łukasz Dzieło – home page",
    "business": "Business websites",
    "mainNav": "Main navigation",
    "openMenu": "Open menu",
    "closeMenu": "Close menu",
    "menuLabel": "Menu",
    "portfolio": "Developer portfolio"
  },
  "pl": {
    "menu": { "projects": "Projekty", "services": "Współpraca", "about": "O mnie", "posts": "Wpisy" },
    "cta": { "business": "Wyceń stronę", "businessMobile": "Opisz swój projekt", "contact": "Kontakt", "contactMobile": "Napisz do mnie" },
    "home": "Łukasz Dzieło – strona główna",
    "business": "Strony dla firm",
    "mainNav": "Główna nawigacja",
    "openMenu": "Otwórz menu",
    "closeMenu": "Zamknij menu",
    "menuLabel": "Menu",
    "portfolio": "Portfolio programisty"
  }
}
</i18n>
