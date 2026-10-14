<script setup lang="ts">
// Przełącznik języka. „button” – kwadratowy przycisk obok przełącznika motywu (od lg),
// z kodem języka, na który przełącza. „segmented” – w otwartym menu na telefonie i tablecie: PL | EN.
// Wybór zapisuje się w ciasteczku `lang` (rok), więc skrypt wykrywający język przeglądarki
// (LANG_REDIRECT w nuxt.config.ts) już nie przekierowuje.
const props = withDefaults(defineProps<{ variant?: 'button' | 'segmented' }>(), { variant: 'button' })
const emit = defineEmits<{ switched: [] }>()

const { locale, t } = useI18n({ useScope: 'local' })
const switchLocalePath = useSwitchLocalePath()
const other = computed(() => (locale.value === 'pl' ? 'en' : 'pl'))
const codes = ['pl', 'en'] as const

function remember(code: string) {
  document.cookie = `lang=${code}; path=/; max-age=31536000; SameSite=Lax`
  emit('switched')
}
</script>

<template>
  <NuxtLink
    v-if="props.variant === 'button'"
    :to="switchLocalePath(other)"
    :lang="other"
    :hreflang="other"
    :aria-label="t('switchTo')"
    class="inline-flex size-11 items-center justify-center rounded-xl border border-slate-900/16 text-sm font-semibold tracking-wide text-slate-900 uppercase transition-colors hover:bg-white dark:border-white/20 dark:text-brand-50 dark:hover:bg-brand-900"
    @click="remember(other)"
  >
    {{ other }}
  </NuxtLink>

  <div v-else class="flex items-center justify-between gap-4 text-base text-slate-600 dark:text-slate-300">
    <span>{{ t('language') }}</span>
    <div class="flex gap-1 rounded-full border border-slate-900/16 p-1 dark:border-white/20">
      <NuxtLink
        v-for="code in codes"
        :key="code"
        :to="switchLocalePath(code)"
        :lang="code"
        :hreflang="code"
        :aria-current="code === locale ? 'true' : undefined"
        class="rounded-full px-3.5 py-1.5 text-sm font-semibold uppercase"
        :class="code === locale ? 'bg-primary-500/10 text-primary-500 dark:bg-primary-400/12 dark:text-primary-400' : 'text-slate-600 dark:text-slate-300'"
        @click="remember(code)"
      >
        {{ code }}
      </NuxtLink>
    </div>
  </div>
</template>

<i18n lang="json">
{
  "en": { "switchTo": "PL – wersja polska", "language": "Language" },
  "pl": { "switchTo": "EN – English version", "language": "Język" }
}
</i18n>
