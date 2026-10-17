<script setup lang="ts">
// Adres w każdym języku (link() z useLocalLink zamienia '/strony-dla-firm' na właściwy)
definePageMeta({ i18n: { paths: { en: '/business-websites', pl: '/strony-dla-firm' } } })

// Strona dla firm: oferta stron na WordPressie. Treści – app/data/business.ts, ceny – app/data/pricing.ts.
// Nagłówek i stopka przełączają się na wersję „dla firm” w app.vue (po adresie).
import { businessFaq, businessOffer } from '~/data/business'
import { price, priceValue, type PriceId } from '~/data/pricing'
import { PERSON_ID, SITE_NAME, SITE_URL, pageUrl } from '~/data/site'

const { t, locale } = useI18n({ useScope: 'local' })
const link = useLocalLink()
// Wartości liczone raz: przy zmianie języka zmienia się adres, więc strona montuje się od nowa
const lang = locale.value === 'pl' ? 'pl' : 'en'
const faq = useLocalized(businessFaq)
const offer = useLocalized(businessOffer)

const description = t('meta.description')
useSiteMeta({
  title: t('meta.title'),
  description,
  image: `/og/business-${lang}.jpg`,
  imageAlt: t('meta.title'),
})

// Dane strukturalne: usługa z cenami „od” (netto, ceny z app/data/pricing.ts) i pytania z FAQ – w języku strony
const day = usePricingDay()
const fill = (text: string) => text.replace(/\{(\w+)\}/g, (_, id: PriceId) => price(id, lang, day.value).now)
// adres strony w bieżącym języku (/business-websites albo /pl/strony-dla-firm)
const url = pageUrl(link('/strony-dla-firm'))
useJsonLd('business', {
  '@graph': [
    {
      '@type': 'Service',
      '@id': `${url}#service`,
      name: t('ld.name'),
      serviceType: t('ld.serviceType'),
      description,
      url,
      inLanguage: lang === 'pl' ? 'pl-PL' : 'en-US',
      provider: { '@type': 'Person', '@id': PERSON_ID, name: SITE_NAME, url: `${SITE_URL}/` },
      offers: offer.value.plans.map(plan => {
        const p = priceValue(plan.price, lang, day.value)
        return {
          '@type': 'Offer',
          name: plan.name,
          description: plan.text,
          priceSpecification: {
            '@type': 'PriceSpecification',
            minPrice: p.value,
            priceCurrency: p.currency,
            valueAddedTaxIncluded: false,
          },
        }
      }),
    },
    {
      '@type': 'FAQPage',
      mainEntity: faq.value.items.map(item => ({
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

<i18n lang="json">
{
  "en": {
    "meta": {
      "title": "WordPress websites for small businesses – Łukasz Dzieło",
      "description": "One-page and business websites on WordPress with the block editor – design, build and care. You edit the content yourself."
    },
    "ld": {
      "name": "WordPress websites for small businesses",
      "serviceType": "Design, development and care of WordPress websites"
    }
  },
  "pl": {
    "meta": {
      "title": "Strony WordPress dla firm – Łukasz Dzieło",
      "description": "Strony wizytówki i strony firmowe na WordPressie z edytorem bloków – projekt, wdrożenie i opieka. Treści zmieniasz sam."
    },
    "ld": {
      "name": "Strony WordPress dla firm",
      "serviceType": "Projektowanie, wdrożenie i opieka nad stronami na WordPressie"
    }
  }
}
</i18n>
