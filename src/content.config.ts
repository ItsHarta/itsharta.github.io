import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "src/blog" }),
    schema: ({ image }: { image: () => z.ZodType<any> }) =>
        z.object({
            title: z.string().max(80).min(10),
            hero: image(),
            heroAlt: z.string(),
            description: z.string().max(220),
            pubDate: z.date(),
            updatedDate: z.date().optional(),
            tags: z.array(z.string()),
        }),
});

export const collections = { blog };
