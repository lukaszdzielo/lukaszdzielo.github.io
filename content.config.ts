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
// Każdy język ma własne kolekcje (content_en, blog_pl itd.) – zapytania wybierają je przez useLocaleCollection().
const blogSchema = z.object({
  date: z.union([z.string(), z.date()]).transform((v) =>
    typeof v === 'string' ? v : v.toISOString().slice(0, 10)
  ),
  slug: z.string().optional(),
  description: z.string(),
  tags: z.array(z.string()),
  image: z.string().optional(),
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
  source: { include: `${lang}/blog/**`, prefix: lang === 'en' ? '/blog' : '/pl/blog' },
  schema: blogSchema,
})
const projects = (lang: 'en' | 'pl') => defineCollection({
  type: 'page',
  source: { include: `${lang}/projects/**`, prefix: lang === 'en' ? '/projects' : '/pl/projects' },
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
