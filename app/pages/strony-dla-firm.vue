<script setup lang="ts">
// Strona dla firm: oferta stron na WordPressie. Treści – app/data/business.ts, ceny – app/data/pricing.ts.
// Nagłówek i stopka przełączają się na wersję „dla firm” w app.vue (po adresie).
import { businessFaq, businessOffer } from '~/data/business'
import { prices, promoIsOn, price } from '~/data/pricing'
import { PERSON_ID, SITE_NAME, SITE_URL, pageUrl } from '~/data/site'

const description = 'Strony wizytówki i strony firmowe na WordPressie z edytorem bloków – projekt, wdrożenie i opieka. Treści zmieniasz sam.'
useSiteMeta({
  title: 'Strony WordPress dla firm – Łukasz Dzieło',
  description,
  image: '/og/og-firmy.jpg',
  imageAlt: 'Strony WordPress dla firm – Łukasz Dzieło',
})

// Dane strukturalne: usługa z cenami „od” (netto, ceny z app/data/pricing.ts) i pytania z FAQ
const promoOn = promoIsOn()
const fill = (text: string) => text.replace(/\{(\w+)\}/g, (_, id: keyof typeof prices) => price(id, promoOn).now)
const url = pageUrl('/strony-dla-firm')
useJsonLd('business', {
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: 'Strony WordPress dla firm',
      serviceType: 'Projektowanie, wdrożenie i opieka nad stronami na WordPressie',
      description,
      url,
      inLanguage: 'pl-PL',
      provider: { '@type': 'Person', '@id': PERSON_ID, name: SITE_NAME, url: `${SITE_URL}/` },
      offers: businessOffer.plans.map(plan => {
        const p = prices[plan.price]
        return {
          '@type': 'Offer',
          name: plan.name,
          description: plan.text,
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: promoOn && p.promo ? p.promo : p.regular,
            priceCurrency: 'PLN',
            valueAddedTaxIncluded: false,
          },
        }
      }),
    },
    {
      '@type': 'FAQPage',
      mainEntity: businessFaq.items.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: fill(item.a) },
      })),
    },
  ],
})
</script>

<template>
  <div>
    <BusinessHero />
    <BusinessFeatures />
    <BusinessOffer />
    <BusinessWork />
    <BusinessProcess />
    <BusinessQuotes />
    <BusinessCare />
    <BusinessFaq />
    <SectionsHomeContact variant="business" />
  </div>
</template>
