// Tytuł i opis strony razem z wersjami do podglądu linku (Facebook, LinkedIn, X).
// Bez tego podstrony dziedziczą og:title i og:description strony głównej z nuxt.config.
import { SITE_URL } from '~/data/site'

type SiteMeta = {
  title: string
  description?: string
  image?: string // ścieżka z /public, np. /og/business-pl.jpg
  imageAlt?: string
  robots?: string
}

export function useSiteMeta(meta: SiteMeta) {
  useSeoMeta({
    title: meta.title,
    ogTitle: meta.title,
    description: meta.description,
    ogDescription: meta.description,
    ...(meta.image
      ? { ogImage: SITE_URL + meta.image, twitterImage: SITE_URL + meta.image, ogImageAlt: meta.imageAlt, twitterImageAlt: meta.imageAlt }
      : {}),
    ...(meta.robots ? { robots: meta.robots } : {}),
  })
}

// Dane strukturalne (schema.org) w <script type="application/ld+json"> – czytają je Google i wyszukiwarki AI
export function useJsonLd(key: string, data: Record<string, unknown>) {
  useHead({
    script: [{ key: `ld-${key}`, type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', ...data }) }],
  })
}
