import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdoc,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    summary: z.string().optional(),
    pubDate: z.coerce.date(),
    coverImage: z.string().optional(),
    categories: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { blog };
