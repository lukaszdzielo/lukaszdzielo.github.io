<script setup lang="ts">
import { businessCare } from '~/data/business'
import { price as priceIn, promoIsOn, type PriceId } from '~/data/pricing'

const { t, locale } = useI18n({ useScope: 'local' })
const care = useLocalized(businessCare)
const promoOn = promoIsOn()
// cena w formacie języka strony („120 zł” / „120 PLN”)
const price = (id: PriceId) => priceIn(id, locale.value === 'pl' ? 'pl' : 'en', promoOn)
</script>

<template>
  <section id="care" class="relative isolate pt-22 md:pt-28 lg:pt-37.5">
    <CommonCodeBackdrop name="bizCare" class="top-6" />
    <div class="container">
      <CommonSectionHead :title="care.title" :lead="care.lead" />
      <div class="mt-8 grid gap-4 lg:mt-10 lg:grid-cols-2 lg:gap-6">
        <div v-reveal class="rounded-3xl border border-slate-900/10 bg-white p-6 shadow-sm transition-[opacity,translate] duration-700 ease-out sm:p-8 dark:border-white/10 dark:bg-brand-900">
          <h3 class="text-xl font-medium tracking-tight text-slate-900 dark:text-brand-50">{{ t('monthly') }}</h3>
          <ul class="mt-5 space-y-3 text-sm/relaxed text-slate-600 dark:text-slate-300">
            <li v-for="[bold, rest] in care.monthly" :key="bold" class="flex gap-2.5">
              <Icon name="lucide:check" class="mt-0.5 shrink-0 text-base text-primary-500 dark:text-primary-400" aria-hidden="true" />
              <span><b class="font-medium text-slate-900 dark:text-brand-50">{{ bold }}</b>{{ rest.startsWith(':') ? '' : ' ' }}{{ rest }}</span>
            </li>
          </ul>
        </div>
        <div v-reveal="80" class="rounded-3xl border border-slate-900/10 bg-white p-6 shadow-sm transition-[opacity,translate] duration-700 ease-out sm:p-8 dark:border-white/10 dark:bg-brand-900">
          <h3 class="text-xl font-medium tracking-tight text-slate-900 dark:text-brand-50">{{ t('rules') }}</h3>
          <dl class="mt-3 text-sm">
            <div v-for="rule in care.rules" :key="rule.label" class="flex items-baseline justify-between gap-4 border-b border-slate-900/8 py-3 last:border-0 dark:border-white/8">
              <dt class="text-slate-500 dark:text-slate-400">{{ rule.label }}</dt>
              <dd class="text-right font-medium text-slate-900 dark:text-brand-50">
                <template v-if="'price' in rule && rule.price">
                  <s v-if="price(rule.price).before" class="mr-1.5 font-normal opacity-55">{{ price(rule.price).before }}</s>
                  {{ price(rule.price).now }} {{ rule.suffix }}
                </template>
                <template v-else>{{ 'value' in rule ? rule.value : '' }}</template>
              </dd>
            </div>
          </dl>
          <p class="mt-4 text-xs/relaxed text-slate-500 dark:text-slate-400">{{ care.note }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<i18n lang="json">
{
  "en": { "monthly": "Every month", "rules": "Terms and prices" },
  "pl": { "monthly": "W każdym miesiącu", "rules": "Zasady i ceny" }
}
</i18n>
