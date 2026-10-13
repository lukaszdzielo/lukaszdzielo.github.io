<script setup lang="ts">
// Baner zgody na statystyki. Pokazuje się, dopóki ktoś nie zdecyduje, i po kliknięciu
// „Ustawienia cookies” w stopce. Oba przyciski są równorzędne – odmowa jest tak samo łatwa jak zgoda.
const { consent, panelOpen, loaded, decide } = useConsent()
const { t } = useI18n({ useScope: 'local' })
const link = useLocalLink()
const visible = computed(() => loaded.value && (consent.value === null || panelOpen.value))

const button =
  'inline-flex h-11 flex-1 cursor-pointer items-center justify-center rounded-full px-5 text-sm font-medium transition-colors sm:flex-none'
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
      aria-labelledby="consent-title"
      class="fixed inset-x-4 bottom-4 z-60 rounded-2xl border border-slate-900/10 bg-white p-5 text-slate-600 shadow-2xl shadow-slate-900/15 sm:right-auto sm:max-w-md dark:border-white/10 dark:bg-brand-900 dark:text-slate-300 dark:shadow-black/40"
    >
      <h2 id="consent-title" class="font-medium text-slate-900 dark:text-brand-50">{{ t('title') }}</h2>
      <p class="mt-2 text-sm/relaxed">
        {{ t('text') }}
        <NuxtLink :to="link('/polityka-prywatnosci')" class="text-primary-500 underline underline-offset-2 dark:text-primary-400">{{ t('privacy') }}</NuxtLink>
      </p>
      <p v-if="consent" class="mt-2 text-xs text-slate-500 dark:text-slate-400">
        {{ t('now', { state: consent === 'granted' ? t('on') : t('off') }) }}.
      </p>
      <div class="mt-4 flex gap-2">
        <button
          type="button"
          :class="button"
          class="bg-brand-900 text-white hover:bg-brand-700 dark:bg-slate-100 dark:text-brand-950 dark:hover:bg-white"
          @click="decide('granted')"
        >
          {{ t('accept') }}
        </button>
        <button
          type="button"
          :class="button"
          class="border border-slate-900/16 text-slate-900 hover:bg-brand-50 dark:border-white/20 dark:text-brand-50 dark:hover:bg-brand-950"
          @click="decide('denied')"
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
    "text": "I want to know how many people visit the site and which pages they read. For this I use Google Analytics and its cookies. Do you agree? You can change your choice at any time in the footer.",
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
