<script setup lang="ts">
// Opinie klientów – tylko zaakceptowane przez klienta (approved: true w app/data/business.ts).
// Dopóki żadnej nie ma, sekcja się nie wyświetla.
import { businessQuotes } from '~/data/business'

const { t } = useI18n({ useScope: 'local' })
const data = useLocalized(businessQuotes)
const quotes = computed(() => data.value.items.filter(q => q.approved))
</script>

<template>
  <section v-if="quotes.length" class="relative isolate pt-22 md:pt-28 lg:pt-37.5">
    <div class="container">
      <CommonSectionHead :title="data.title" :lead="data.lead" />
      <ul class="mt-8 grid gap-4 md:grid-cols-2 lg:mt-10 lg:grid-cols-3 lg:gap-6">
        <li
          v-for="(quote, i) in quotes"
          :key="quote.company"
          v-reveal="i * 80"
          class="flex flex-col rounded-2xl border border-slate-900/10 bg-white p-6 shadow-sm transition-[opacity,translate] duration-700 ease-out sm:p-7 dark:border-white/10 dark:bg-brand-900"
        >
          <span class="text-4xl leading-none text-primary-500 dark:text-primary-400" aria-hidden="true">{{ t('quoteMark') }}</span>
          <blockquote class="mt-2 text-base/relaxed text-slate-700 dark:text-slate-200">{{ quote.text }}</blockquote>
          <p class="mt-auto flex items-center gap-3 pt-6">
            <span class="grid size-9 place-items-center rounded-full bg-primary-500/10 text-sm font-semibold text-primary-500 dark:bg-primary-400/14 dark:text-primary-400" aria-hidden="true">{{ quote.name[0] }}</span>
            <span class="text-sm">
              <b class="block font-medium text-slate-900 dark:text-brand-50">{{ quote.name }}</b>
              <span class="text-slate-500 dark:text-slate-400">{{ quote.company }}</span>
            </span>
          </p>
        </li>
      </ul>
    </div>
  </section>
</template>

<i18n lang="json">
{
  "en": { "quoteMark": "“" },
  "pl": { "quoteMark": "„" }
}
</i18n>
