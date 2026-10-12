<script setup lang="ts">
// Przyklejona nawigacja. Po przewinięciu pojawia się dolna linia.
// Od 900 px: sygnet, menu, przełącznik motywu i „Kontakt”.
// Poniżej: sygnet, przełącznik motywu, „Kontakt” i przycisk menu, które otwiera panel z linkami.
const menu = [
  { label: 'Projekty', to: '/#projects' },
  { label: 'Współpraca', to: '/#services' },
  { label: 'O mnie', to: '/#about-me' },
  { label: 'Wpisy', to: '/#posts' },
]

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
  desktop = window.matchMedia('(min-width: 900px)')
  desktop.addEventListener('change', onDesktop)
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  window.removeEventListener('keydown', onKeydown)
  desktop?.removeEventListener('change', onDesktop)
  lockPage(false)
})

const navLink = 'transition-colors hover:text-slate-900 dark:hover:text-white'
</script>

<template>
  <header
    class="sticky top-0 z-50 border-b py-3.5 backdrop-blur-md transition-colors duration-300"
    :class="[
      stuck || open ? 'border-slate-900/10 dark:border-white/10' : 'border-transparent',
      open ? 'bg-brand-50 dark:bg-brand-950' : 'bg-brand-50/76 dark:bg-brand-950/76',
    ]"
  >
    <div class="container flex items-center gap-6">
      <NuxtLink to="/" class="inline-flex size-10 items-center text-slate-900 dark:text-white" aria-label="Łukasz Dzieło – strona główna" @click="close()">
        <CommonAppLogo class="size-9 shrink-0" :stroke-width="13" />
      </NuxtLink>

      <nav class="mx-auto hidden gap-4.5 text-[0.84375rem] whitespace-nowrap text-slate-600 min-[900px]:flex lg:gap-7 lg:text-sm dark:text-slate-300" aria-label="Główna nawigacja">
        <NuxtLink v-for="item in menu" :key="item.to" :to="item.to" :class="navLink">
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div class="ml-auto flex items-center gap-2 min-[900px]:ml-0">
        <CommonColorModeToggle />
        <NuxtLink
          to="/#contact"
          class="group inline-flex h-11 items-center gap-2.5 rounded-full bg-brand-900 py-1.75 pr-1.75 pl-4.5 text-sm font-medium text-white dark:bg-slate-100 dark:text-brand-950"
          @click="close()"
        >
          Kontakt
          <span class="grid size-7.5 place-items-center rounded-full bg-primary-500 text-white dark:bg-primary-400 dark:text-brand-950">
            <Icon name="lucide:arrow-up-right" class="transition-transform motion-safe:group-hover:translate-x-px motion-safe:group-hover:-translate-y-px" aria-hidden="true" />
          </span>
        </NuxtLink>

        <!-- Przycisk menu mobilnego: trzy kreski zamieniają się w X -->
        <button
          ref="toggleBtn"
          type="button"
          class="relative grid size-11 cursor-pointer place-items-center rounded-xl border border-slate-900/16 text-slate-900 transition-colors hover:bg-white min-[900px]:hidden dark:border-white/20 dark:text-white dark:hover:bg-brand-900"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          :aria-label="open ? 'Zamknij menu' : 'Otwórz menu'"
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
        class="absolute inset-x-0 top-full h-[calc(100dvh-100%)] overflow-y-auto overscroll-contain border-t border-slate-900/10 bg-brand-50 min-[900px]:hidden dark:border-white/10 dark:bg-brand-950"
        aria-label="Menu"
      >
        <ul class="container flex flex-col py-6">
          <li v-for="item in menu" :key="item.to" class="border-b border-slate-900/10 dark:border-white/10">
            <NuxtLink
              :to="item.to"
              class="group flex items-center justify-between py-4 text-3xl font-medium tracking-tight text-slate-900 dark:text-white"
              @click="close()"
            >
              {{ item.label }}
              <Icon name="lucide:arrow-right" class="text-xl text-primary-500 transition-transform motion-safe:group-hover:translate-x-1 dark:text-primary-400" aria-hidden="true" />
            </NuxtLink>
          </li>
        </ul>
        <div class="container flex flex-wrap gap-3 pb-8">
          <NuxtLink
            to="/#contact"
            class="inline-flex h-12 items-center rounded-full bg-brand-900 px-6 font-medium text-white dark:bg-slate-100 dark:text-brand-950"
            @click="close()"
          >
            Napisz do mnie
          </NuxtLink>
        </div>
      </nav>
    </Transition>
  </header>
</template>
