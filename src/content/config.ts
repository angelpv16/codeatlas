import { defineCollection, z } from 'astro:content';

const conceptsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleEs: z.string(),
    description: z.string(),
    descriptionEs: z.string(),
    order: z.number(),
    section: z.enum(['fundamentals', 'dsa']).default('fundamentals'),
    level: z.enum(['beginner', 'intermediate', 'advanced']),
    estimatedMinutes: z.number(),
    tags: z.array(z.string()),
    relatedConcepts: z.array(z.string()).optional(),
    hasAnimation: z.boolean().default(false),
    publishedAt: z.date(),
  }),
});

export const collections = {
  concepts: conceptsCollection,
};
