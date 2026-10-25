<script setup lang="ts">
// Baner zgody na statystyki. Pokazuje się, dopóki ktoś nie zdecyduje, i po kliknięciu
// „Ustawienia cookies” w stopce. Oba przyciski są równorzędne – odmowa jest tak samo łatwa jak zgoda.
// Na telefonie mniejsze odstępy, żeby zakrywał mniej pierwszego ekranu – tekst i przyciski jak w reszcie strony.
// Przyciski bez stałej wysokości i bez łamania tekstu: gdy oba się nie mieszczą, drugi przechodzi do nowej linii.
const { consent, panelOpen, loaded, decide } = useConsent()
const { t } = useI18n({ useScope: 'local' })
const link = useLocalLink()
const visible = computed(() => loaded.value && (consent.value === null || panelOpen.value))

// Otwarty z „Ustawień cookies” w stopce: fokus przechodzi na baner, a po decyzji wraca na przycisk w stopce
const panel = ref<HTMLElement | null>(null)
let opener: HTMLElement | null = null
watch(panelOpen, (open) => {
  if (!open) return
  opener = document.activeElement instanceof HTMLElement ? document.activeElement : null
  panel.value?.focus()
}, { flush: 'post' })

function choose(value: 'granted' | 'denied') {
  decide(value)
  opener?.focus()
  opener = null
}

const button =
  'inline-flex min-h-11 flex-auto cursor-pointer items-center justify-center rounded-full px-4 py-2.5 text-sm font-medium whitespace-nowrap transition-colors sm:flex-none sm:px-5'
</script>

<template>
  <Transition
    enter-active-class="motion-safe:transition motion-safe:duration-300 ease-out"
    enter-from-class="opacity-0 translate-y-3"
    leave-active-class="motion-safe:transition motion-safe:duration-200 ease-in"
    leave-to-class="opacity-0 translate-y-3"
  >
    <section
      v-if="visible"
      ref="panel"
      tabindex="-1"
      aria-labelledby="consent-title"
      class="fixed inset-x-2 bottom-2 z-60 rounded-2xl border border-slate-900/10 bg-white p-4 text-slate-600 shadow-2xl shadow-slate-900/15 focus:outline-none sm:inset-x-4 sm:right-auto sm:bottom-4 sm:max-w-md sm:p-5 dark:border-white/10 dark:bg-brand-900 dark:text-slate-300 dark:shadow-black/40"
    >
      <h2 id="consent-title" class="font-medium text-slate-900 dark:text-brand-50">{{ t('title') }}</h2>
      <p class="mt-1.5 text-sm/relaxed sm:mt-2">
        {{ t('text') }}
        <NuxtLink :to="link('/polityka-prywatnosci')" class="text-primary-500 underline underline-offset-2 dark:text-primary-400">{{ t('privacy') }}</NuxtLink>
      </p>
      <p v-if="consent" class="mt-2 text-xs text-slate-600 dark:text-slate-400">
        {{ t('now', { state: consent === 'granted' ? t('on') : t('off') }) }}.
      </p>
      <div class="mt-3 flex flex-wrap gap-2 sm:mt-4">
        <button
          type="button"
          :class="button"
          class="bg-brand-900 text-white hover:bg-brand-700 dark:bg-slate-100 dark:text-brand-950 dark:hover:bg-white"
          @click="choose('granted')"
        >
          {{ t('accept') }}
        </button>
        <button
          type="button"
          :class="button"
          class="border border-slate-900/16 text-slate-900 hover:bg-brand-50 dark:border-white/20 dark:text-brand-50 dark:hover:bg-brand-950"
          @click="choose('denied')"
        >
          {{ t('decline') }}
        </button>
      </div>
    </section>
  </Transition>
</template>

<i18n lang="json">
{
  "en": {
    "title": "Visitor statistics",
    "text": "I'd like to know how many people visit the site and which pages they read – for that I use Google Analytics and its cookies. Do you agree? You can change this anytime in the footer.",
    "privacy": "Privacy policy",
    "now": "Now: {state}",
    "on": "statistics on",
    "off": "statistics off",
    "accept": "I agree",
    "decline": "I don't agree"
  },
  "pl": {
    "title": "Statystyki odwiedzin",
    "text": "Chcę wiedzieć, ile osób odwiedza stronę i które podstrony czytają – do tego używam Google Analytics i jego plików cookies. Zgodzisz się? Zmienisz to w każdej chwili w stopce.",
    "privacy": "Polityka prywatności",
    "now": "Teraz: {state}",
    "on": "statystyki włączone",
    "off": "statystyki wyłączone",
    "accept": "Zgadzam się",
    "decline": "Nie zgadzam się"
  }
}
</i18n>
