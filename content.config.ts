import { defineContentConfig, defineCollection, z } from '@nuxt/content'

const createBaseSchema = () => z.object({
  title: z.string(),
  description: z.string()
})

const createImageSchema = () => z.object({
  src: z.string().editor({ input: 'media' }),
  alt: z.string()
})

const createAuthorSchema = () => z.object({
  name: z.string(),
  description: z.string().optional(),
  username: z.string().optional(),
  to: z.string().optional(),
  avatar: createImageSchema().optional()
})

const createTestimonialSchema = () => z.object({
  quote: z.string(),
  author: createAuthorSchema(),
  image: z.string(),
})

// Treści w dwóch językach: content/en/… (domyślny, adresy bez przedrostka) i content/pl/… (adresy /pl/…).
// Polskie wpisy i projekty mają polskie adresy: /pl/wpisy/… i /pl/projekty/… (pliki zostają w pl/blog i pl/projects).
// Każdy język ma własne kolekcje (content_en, blog_pl itd.) – zapytania wybierają je przez useLocaleCollection().
const blogSchema = z.object({
  date: z.union([z.string(), z.date()]).transform((v) =>
    typeof v === 'string' ? v : v.toISOString().slice(0, 10)
  ),
  // data ostatniej edycji po publikacji – dateModified w JSON-LD i <lastmod> w sitemap; bez niej liczy się date
  updated: z.union([z.string(), z.date()]).transform((v) =>
    typeof v === 'string' ? v : v.toISOString().slice(0, 10)
  ).optional(),
  slug: z.string().optional(),
  description: z.string(),
  tags: z.array(z.string()),
  image: z.string().optional(),
  art: z.string().optional(), // rysunek SVG z /public/art/blog – baner wpisu, karta i obrazek OG (zasady: archiwum zasady/wpisy-banery.md)
  ogImage: z.string().optional(), // obrazek podglądu linku 1200×630 z /public (np. /og/blog/<slug>-pl.jpg)
  draft: z.boolean().default(false),
  kind: z.enum(['post', 'case-study']).default('post'),
  project: z.string().optional(),
})

const projectSchema = z.object({
  // Accept both quoted strings ('2024-01-28') and unquoted YAML dates
  // (2024-01-28, parsed as Date), normalizing to a 'YYYY-MM-DD' string.
  date: z.union([z.string(), z.date()]).transform((v) =>
    typeof v === 'string' ? v : v.toISOString().slice(0, 10)
  ),
  description: z.string().optional(),
  tags: z.array(z.string()),
  image: z.string().optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false),
  agency: z.string().optional(),
  // Pola strony projektu (tylko projekty z własną stroną):
  // stack – technologie pod opisem, facts – pasek z liczbami pod hero,
  // cover – zrzut w ramce przeglądarki (+ telefon) obok tytułu, gallery – sekcja „Jak to wygląda”,
  // ogImage – obrazek podglądu linku 1200×630 z /public (np. /og/projects/pokedex-pl.jpg);
  // bez niego strona projektu dostaje obrazek strony głównej
  stack: z.array(z.string()).optional(),
  facts: z.array(z.object({
    value: z.string(),
    suffix: z.string().optional(),
    text: z.string(),
  })).optional(),
  cover: z.object({
    desktop: z.string(),
    phone: z.string().optional(),
    alt: z.string().optional(),
    width: z.number().optional(), // wymiary zrzutu desktop – rezerwują miejsce (bez skakania strony)
    height: z.number().optional(),
  }).optional(),
  ogImage: z.string().optional(),
  gallery: z.array(z.object({
    src: z.string(),
    alt: z.string(),
    caption: z.string().optional(),
    device: z.enum(['desktop', 'phone']).default('desktop'),
    full: z.boolean().optional(), // zrzut całej strony – w kafelku tylko góra, w podglądzie przewijany
    width: z.number().optional(), // wymiary zrzutu (bez full i telefonu) – rezerwują miejsce
    height: z.number().optional(),
  })).optional(),
  // „Przed i po”: pierwsze ekrany starej i nowej wersji (suwak) + tabela pomiarów
  compare: z.object({
    before: z.object({ src: z.string(), label: z.string(), alt: z.string(), width: z.number().optional(), height: z.number().optional() }),
    after: z.object({ src: z.string(), label: z.string(), alt: z.string(), width: z.number().optional(), height: z.number().optional() }),
    rows: z.array(z.object({ label: z.string(), before: z.string(), after: z.string() })).optional(),
    note: z.string().optional(),
  }).optional(),
  // note – krótki dopisek pod technologiami (np. aplikacja bez publicznego dostępu),
  // galleryLead – własny opis nad galerią, highlights – sekcja „Rozwiązania w szczegółach” (karty)
  note: z.string().optional(),
  galleryLead: z.string().optional(),
  highlights: z.array(z.object({ title: z.string(), text: z.string() })).optional(),
  links: z.object({
    behance: z.string().optional(),
    github: z.string().optional(),
    live: z.string().optional(),
  }).optional(),
})

const pages = (lang: 'en' | 'pl') => defineCollection({
  type: 'page',
  source: { include: `${lang}/**`, exclude: [`${lang}/blog/**`, `${lang}/projects/**`], prefix: lang === 'en' ? '/' : '/pl' },
})
const blog = (lang: 'en' | 'pl') => defineCollection({
  type: 'page',
  source: { include: `${lang}/blog/**`, prefix: lang === 'en' ? '/blog' : '/pl/wpisy' },
  schema: blogSchema,
})
const projects = (lang: 'en' | 'pl') => defineCollection({
  type: 'page',
  source: { include: `${lang}/projects/**`, prefix: lang === 'en' ? '/projects' : '/pl/projekty' },
  schema: projectSchema,
})

export default defineContentConfig({
  collections: {
    content_en: pages('en'),
    content_pl: pages('pl'),
    blog_en: blog('en'),
    blog_pl: blog('pl'),
    projects_en: projects('en'),
    projects_pl: projects('pl'),
  },
})
