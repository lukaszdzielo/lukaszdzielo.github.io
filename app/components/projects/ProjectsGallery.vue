<script setup lang="ts">
// Galeria zrzutów na stronie projektu + podgląd na cały ekran (<dialog>).
// Układ od lg, gdy jest zrzut z telefonu: 5 kolumn – pierwszy zrzut z komputera na 4, telefon na 1
// (przez dwa rzędy), kolejne zrzuty po 2. Bez telefonu: pierwszy na całą szerokość, reszta po dwa.
// Duże obrazki są w HTML od początku (dialog jest tylko schowany), bo przy generowaniu strony
// @nuxt/image tworzy pliki /_ipx tylko dla obrazków obecnych w gotowym HTML – z v-if by ich zabrakło.
// Duże obrazki mają loading="lazy" i w-full: przeglądarka pobiera je dopiero przy pokazaniu, a bez
// szerokości (w-auto) niezaładowany obrazek ma 0 × 0 px i Chrome w ogóle by go nie pobrał.
// full – zrzut całej strony: w kafelku widać górę (16:10) z oznaczeniem „Cała strona”, w podglądzie się przewija
type Shot = { src: string; alt: string; caption?: string; device?: 'desktop' | 'phone'; full?: boolean; width?: number; height?: number }

const props = defineProps<{ items: Shot[]; address?: string }>()

const { t } = useI18n({ useScope: 'local' })

const hasPhone = computed(() => props.items.some(shot => shot.device === 'phone'))
const firstDesktop = computed(() => props.items.findIndex(shot => shot.device !== 'phone'))
// Pierwszy zrzut z komputera na całą szerokość – chyba że bez telefonu jest ich parzyście (np. dwa: obok siebie)
const firstBig = computed(() => hasPhone.value || props.items.length % 2 === 1)

const tileClass = (shot: Shot, index: number) => {
  if (shot.device === 'phone') return 'max-w-60 lg:max-w-none lg:row-span-2'
  if (index === firstDesktop.value && firstBig.value) return hasPhone.value ? 'md:col-span-2 lg:col-span-4' : 'md:col-span-2'
  return hasPhone.value ? 'lg:col-span-2' : ''
}

const thumbSizes = (shot: Shot, index: number) => {
  if (shot.device === 'phone') return 'xs:240px'
  return index === firstDesktop.value && firstBig.value ? 'xs:100vw lg:1000px' : 'xs:100vw md:50vw lg:600px'
}

// Podgląd na cały ekran
const dialog = ref<HTMLDialogElement>()
const current = ref(0)
const opener = ref<HTMLElement | null>(null)

const lockScroll = (lock: boolean) => {
  document.documentElement.style.overflow = lock ? 'hidden' : ''
}

const open = (index: number, event: Event) => {
  opener.value = event.currentTarget as HTMLElement
  current.value = index
  dialog.value?.showModal()
  lockScroll(true)
}

const close = () => dialog.value?.close()

// Zamknięcie (przycisk, Esc, klik w tło): odblokowanie przewijania i fokus wraca na kliknięty zrzut
const onClose = () => {
  lockScroll(false)
  opener.value?.focus()
}

const step = (delta: number) => {
  const count = props.items.length
  current.value = (current.value + delta + count) % count
}

const onKey = (event: KeyboardEvent) => {
  if (event.key === 'ArrowRight') step(1)
  if (event.key === 'ArrowLeft') step(-1)
}

onBeforeUnmount(() => lockScroll(false))
</script>

<template>
  <div>
    <ul class="grid gap-x-6 gap-y-8 md:grid-cols-2" :class="hasPhone && 'lg:grid-cols-5'">
      <li v-for="(shot, i) in items" :key="shot.src" :class="tileClass(shot, i)">
        <figure>
          <button
            type="button"
            class="block w-full cursor-zoom-in rounded-2xl text-left transition-transform duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-500 motion-safe:hover:-translate-y-0.5"
            @click="open(i, $event)"
          >
            <!-- Nazwa przycisku = alt zrzutu + „powiększ” (bez aria-label, żeby nazwa zgadzała się z treścią – WCAG 2.5.3) -->
            <span class="sr-only">{{ t('openHint') }}</span>
            <ProjectsPhoneFrame v-if="shot.device === 'phone'" :src="shot.src" :alt="shot.alt" :sizes="thumbSizes(shot, i)" />
            <span v-else class="relative block">
              <ProjectsBrowserFrame :src="shot.src" :alt="shot.alt" :address="address" :sizes="thumbSizes(shot, i)" :crop="shot.full" :width="shot.width" :height="shot.height" />
              <span v-if="shot.full" aria-hidden="true" class="absolute right-3.5 bottom-3.5 rounded-full bg-brand-950/75 px-3 py-1.5 text-xs font-medium text-white">
                {{ t('full') }} ↕
              </span>
            </span>
          </button>
          <figcaption v-if="shot.caption" class="mt-3 text-sm/relaxed text-slate-600 dark:text-slate-400">
            {{ shot.caption }}
          </figcaption>
        </figure>
      </li>
    </ul>

    <!-- Podgląd: zawsze ciemne tło, strzałki i klawisze ← →, Esc lub klik w tło zamyka -->
    <dialog
      ref="dialog"
      :aria-label="t('dialog')"
      class="fixed inset-0 m-0 size-full max-h-none max-w-none bg-brand-950 p-0 text-white backdrop:bg-transparent open:flex open:flex-col"
      @close="onClose"
      @keydown="onKey"
      @click.self="close"
    >
      <div class="flex items-center justify-between gap-4 px-4 pt-4 sm:px-6 sm:pt-5">
        <p class="text-sm text-slate-300" aria-live="polite">{{ current + 1 }} / {{ items.length }}</p>
        <button
          type="button"
          class="grid size-11 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          :aria-label="t('close')"
          @click="close"
        >
          <Icon name="lucide:x" class="size-5" aria-hidden="true" />
        </button>
      </div>

      <div class="relative min-h-0 flex-1">
        <!-- v-show na zwykłym <div>, nie na <CommonPicture> – tam styl trafiał na <img> i obrazek zostawał schowany -->
        <div
          v-for="(shot, i) in items"
          v-show="i === current"
          :key="shot.src"
          class="absolute inset-4 max-sm:bottom-16 sm:inset-x-20"
          :class="shot.device === 'phone' ? 'mx-auto max-w-md overflow-y-auto overscroll-contain rounded-2xl' : shot.full ? 'mx-auto max-w-5xl overflow-y-auto overscroll-contain rounded-lg' : 'flex items-center justify-center'"
          @click.self="close"
        >
          <!-- Wskaźnik ładowania pod zdjęciem: widać go, dopóki duży zrzut się nie wczyta – potem zasłania go samo zdjęcie -->
          <span class="pointer-events-none absolute inset-x-0 top-0 flex flex-col items-center gap-3 pt-24 text-sm text-slate-300" :class="!(shot.device === 'phone' || shot.full) && 'inset-y-0 justify-center pt-0'" aria-hidden="true">
            <span class="size-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            {{ t('loading') }}
          </span>
          <!-- Telefon i cała strona: wysoki zrzut przewija się w podglądzie -->
          <CommonPicture
            v-if="shot.device === 'phone' || shot.full"
            :src="shot.src"
            :alt="shot.alt"
            :sizes="shot.full ? 'xs:100vw lg:1024px' : 'xs:100vw sm:448px'"
            loading="lazy"
            class="relative block h-auto w-full"
          />
          <CommonPicture
            v-else
            :src="shot.src"
            :alt="shot.alt"
            sizes="xs:100vw xl:1440px"
            loading="lazy"
            class="relative block h-auto max-h-full w-full object-contain"
          />
        </div>

        <template v-if="items.length > 1">
          <button
            type="button"
            class="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 max-sm:top-auto max-sm:bottom-2 max-sm:translate-y-0 sm:left-5"
            :aria-label="t('prev')"
            @click="step(-1)"
          >
            <Icon name="lucide:arrow-left" class="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            class="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 transition-colors hover:bg-white/20 max-sm:top-auto max-sm:bottom-2 max-sm:translate-y-0 sm:right-5"
            :aria-label="t('next')"
            @click="step(1)"
          >
            <Icon name="lucide:arrow-right" class="size-5" aria-hidden="true" />
          </button>
        </template>
      </div>

      <p class="min-h-14 px-4 pb-5 text-center text-sm/relaxed text-slate-300 sm:px-20">
        {{ items[current]?.caption }}
      </p>
    </dialog>
  </div>
</template>

<i18n lang="json">
{
  "en": {
    "openHint": "Enlarge:",
    "dialog": "Screenshot preview",
    "close": "Close",
    "prev": "Previous screenshot",
    "next": "Next screenshot",
    "full": "Full page",
    "loading": "Loading the image…"
  },
  "pl": {
    "openHint": "Powiększ:",
    "dialog": "Podgląd zrzutu",
    "close": "Zamknij",
    "prev": "Poprzedni zrzut",
    "next": "Następny zrzut",
    "full": "Cała strona",
    "loading": "Wczytuję zdjęcie…"
  }
}
</i18n>
