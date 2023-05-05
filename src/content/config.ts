import { z, defineCollection } from "astro:content";

const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      pubDate: z.date(),
      modDate: z.date().optional(),
      draft: z.boolean().optional(),
      summary: z.string().optional(),
      tags: z.array(z.string()).default([]),
      image: image().optional(),
    }),
});

export const collections = {
  blog: blogCollection,
};
