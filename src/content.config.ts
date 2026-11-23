import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    tech: z.array(z.string()),
    githubUrl: z.string().url().optional(),
    articleUrl: z.string().url().optional(),
    demoUrl: z.string().url().optional(),
    date: z.coerce.date(),
    featured: z.boolean().default(false),
    order: z.number().default(100),
  }),
});

export const collections = { projects };
