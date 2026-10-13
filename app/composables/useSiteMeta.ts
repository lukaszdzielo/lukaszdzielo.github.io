// Tytuł i opis strony razem z wersjami do podglądu linku (Facebook, LinkedIn, X).
// Bez tego podstrony dziedziczą og:title i og:description strony głównej z nuxt.config.
import { SITE_URL } from '~/data/site'

type SiteMeta = {
  title: string
  description?: string
  image?: string // ścieżka z /public, np. /og/business-pl.jpg; bez niej – obrazek strony głównej w języku strony
  imageAlt?: string
  robots?: string
}

// Podstrona bez własnego obrazka dostaje obrazek strony głównej w swoim języku (home-pl / home-en),
// a nie zawsze angielski z nuxt.config.
export function useSiteMeta(meta: SiteMeta) {
  const { lang } = useContentLocale()
  const image = meta.image ?? `/og/home-${lang.value}.jpg`
  const imageAlt = meta.imageAlt ?? 'Łukasz Dzieło – Front-End Developer'
  useSeoMeta({
    title: meta.title,
    ogTitle: meta.title,
    description: meta.description,
    ogDescription: meta.description,
    ogImage: SITE_URL + image,
    twitterImage: SITE_URL + image,
    ogImageAlt: imageAlt,
    twitterImageAlt: imageAlt,
    ...(meta.robots ? { robots: meta.robots } : {}),
  })
}

// Dane strukturalne (schema.org) w <script type="application/ld+json"> – czytają je Google i wyszukiwarki AI
export function useJsonLd(key: string, data: Record<string, unknown>) {
  useHead({
    script: [{ key: `ld-${key}`, type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...data }) }],
  })
}
