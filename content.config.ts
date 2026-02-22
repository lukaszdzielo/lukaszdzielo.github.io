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
  author: createAuthorSchema()
})

export default defineContentConfig({
  collections: {
    content: defineCollection({
      type: 'page',
      source: {
        include: '**',
        exclude: [
          'blog/**',
          'portfolio/**'
        ]
      }
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/**',
      schema: z.object({
        date: z.string(),
        slug: z.string(),
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        image: z.string(),
      })
    }),
    portfolio: defineCollection({
      type: 'page',
      source: 'portfolio/**',
      schema: z.object({
        date: z.string(),
        title: z.string(),
        description: z.string(),
        tags: z.array(z.string()),
        image: z.string(),
        hasPage: z.boolean().default(true)
      })
    }),
  },
})
