<script setup lang="ts">
// Pytania i odpowiedzi. Ceny w odpowiedziach ({card}, {company}) biorą się z app/data/pricing.ts
// (w formacie języka strony: „2 500 zł” albo „€590 · £690”).
import { businessFaq } from '~/data/business'
import { price, type PriceId } from '~/data/pricing'

const { lang } = useContentLocale()
const faq = useLocalized(businessFaq)
const day = usePricingDay()
const fill = (text: string) => text.replace(/\{(\w+)\}/g, (_, id: PriceId) => price(id, lang.value, day.value).now)
const anchor = useAnchor()
</script>

<template>
  <section :id="anchor('faq')" class="relative isolate pt-22 md:pt-28 lg:pt-37.5">
    <CommonCodeBackdrop name="bizFaq" side="right" class="top-6" />
    <div class="container">
      <CommonSectionHead :title="faq.title" />
      <dl class="mt-8 grid gap-x-12 border-t border-slate-900/10 md:grid-cols-2 lg:mt-10 dark:border-white/10">
        <div v-for="item in faq.items" :key="item.q" class="border-b border-slate-900/10 py-6 dark:border-white/10">
          <dt class="font-medium text-slate-900 dark:text-brand-50">{{ item.q }}</dt>
          <dd class="mt-2 text-sm/relaxed text-slate-600 dark:text-slate-300">{{ fill(item.a) }}</dd>
        </div>
      </dl>
    </div>
  </section>
</template>
