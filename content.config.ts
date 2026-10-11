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

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: [
          'blog/**',
          'projects/**'
        ]
      }
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**',
      schema: z.object({
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
    }),
    projects: defineCollection({
      type: 'page',
      source: 'projects/**',
      schema: z.object({
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
    }),
  },
})
