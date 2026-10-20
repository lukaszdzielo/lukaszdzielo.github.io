<script setup lang="ts">
// Trzy pakiety. Ceny z app/data/pricing.ts – w czasie promocji: przekreślona cena regularna,
// cena promocyjna, najniższa cena z 30 dni i etykieta z datą (liczone przy budowaniu strony).
import { businessOffer } from '~/data/business'
import { price as priceIn, promoLabel, type Lang, type PriceId } from '~/data/pricing'

const { t, locale } = useI18n({ useScope: 'local' })
const link = useLocalLink()
const offer = useLocalized(businessOffer)
const lang = computed(() => (locale.value === 'pl' ? 'pl' : 'en') as Lang)
const day = usePricingDay()
// cena w formacie języka strony („2 500 zł” / „€590 · £690”)
const price = (id: PriceId) => priceIn(id, lang.value, day.value)
// etykieta promocji, np. „Black WEB do 30.11” / „Black WEB until Nov 30”
const promoBadge = computed(() => {
  const p = promoLabel(lang.value, day.value)
  return p ? t('promo', p) : ''
})
const anchor = useAnchor()
</script>

<template>
  <section class="relative isolate pt-22 md:pt-28 lg:pt-37.5">
    <CommonCodeBackdrop name="bizOffer" side="right" class="top-6" />
    <div class="container">
      <CommonSectionHead :title="offer.title" :lead="offer.lead" />

      <ul class="mt-8 grid gap-4 lg:mt-10 lg:grid-cols-3 lg:gap-6">
        <li
          v-for="(plan, i) in offer.plans"
          :key="plan.name"
          v-reveal="i * 80"
          class="relative flex flex-col rounded-3xl border p-6 transition-[opacity,translate] duration-700 ease-out sm:p-8"
          :class="plan.highlight
            ? 'border-transparent bg-brand-900 text-white dark:bg-slate-100 dark:text-brand-950'
            : 'border-slate-900/10 bg-white text-slate-900 shadow-sm dark:border-white/10 dark:bg-brand-900 dark:text-brand-50'"
        >
          <!-- Nazwa pakietu i etykieta promocji w jednym wierszu; gdy się nie mieszczą (np. 320 px), etykieta schodzi pod nazwę -->
          <div class="flex flex-wrap items-center justify-between gap-x-3 gap-y-2">
            <p class="text-xs font-semibold tracking-widest uppercase" :class="plan.highlight ? 'text-primary-400 dark:text-primary-500' : 'text-primary-500 dark:text-primary-400'">
              {{ plan.name }}
            </p>
            <span v-if="promoBadge" class="rounded-full bg-amber-200 px-2.5 py-1 text-xs font-semibold text-amber-900">{{ promoBadge }}</span>
          </div>
          <h3 class="mt-3 text-2xl font-medium tracking-tight">{{ plan.title }}</h3>
          <p class="mt-3 text-sm/relaxed opacity-75">{{ plan.text }}</p>
          <ul class="mt-6 space-y-3 text-sm/relaxed">
            <li v-for="item in plan.items" :key="item" class="flex gap-2.5">
              <Icon name="lucide:check" class="mt-0.5 shrink-0 text-base text-primary-500 dark:text-primary-400" aria-hidden="true" />
              <span>{{ item }}</span>
            </li>
          </ul>
          <p class="mt-auto flex flex-wrap items-baseline gap-x-2.5 border-t pt-5 border-current/14 max-lg:mt-8 lg:mt-10">
            <s v-if="price(plan.price).before" class="text-base opacity-55">{{ price(plan.price).before }}</s>
            <b class="text-2xl font-semibold tracking-tight">{{ t('from', { price: price(plan.price).now }) }}</b>
            <span class="text-sm opacity-70">{{ plan.suffix }}</span>
            <NuxtLink v-if="plan.more" :to="`#${anchor(plan.more.slice(1))}`" class="text-sm underline underline-offset-2 opacity-70 hover:opacity-100">{{ t('details') }}</NuxtLink>
            <small v-if="price(plan.price).lowest" class="w-full text-xs opacity-70">{{ t('lowest', { price: price(plan.price).lowest }) }}</small>
          </p>
        </li>
      </ul>

      <div class="mt-4 flex flex-col gap-2 rounded-2xl border border-slate-900/10 bg-white/60 px-5 py-4 text-sm sm:flex-row sm:items-center sm:gap-4 lg:mt-6 dark:border-white/10 dark:bg-brand-900/60">
        <b class="shrink-0 font-medium text-slate-900 dark:text-brand-50">{{ offer.other.title }}</b>
        <span class="text-slate-600 dark:text-slate-300">{{ offer.other.text }}</span>
        <NuxtLink :to="link('/strony-dla-firm#contact')" class="shrink-0 font-medium text-primary-500 sm:ml-auto dark:text-primary-400">{{ t('ask') }}</NuxtLink>
      </div>
      <p class="mt-3 text-xs/relaxed text-slate-600 dark:text-slate-400">{{ t('note') }}</p>
    </div>
  </section>
</template>

<i18n lang="json">
{
  "en": { "promo": "{label} until {date}", "from": "from {price}", "details": "details below", "ask": "Ask →", "lowest": "Lowest price in the 30 days before the sale: {price}", "note": "Prices in € and £ are fixed – I review them every quarter. You get the final price in your quote." },
  "pl": { "promo": "{label} do {date}", "from": "od {price}", "details": "szczegóły niżej", "ask": "Zapytaj →", "lowest": "Najniższa cena z 30 dni przed obniżką: {price}", "note": "Dokładną kwotę dostajesz w wycenie." }
}
</i18n>
