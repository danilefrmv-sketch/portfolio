import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      order: z.number().default(0),
      direction: z.enum(['b2b-saas', 'production', 'entertainment-sport', 'events', 'consumer']),
      platforms: z.array(z.enum(['web', 'mobile', 'tablet', 'pos', 'kiosk'])),
      company: z.string(),
      period: z.string(),
      summary: z.string(),
      cover: image(),
      gallery: z.array(image()).default([]),
      draft: z.boolean().default(false)
    })
});

export const collections = { projects };
