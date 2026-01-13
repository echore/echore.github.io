import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";
import { SITE } from "@/config";

export const BLOG_PATH = "src/data/blog";

const blog = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.md",
    base: `./${BLOG_PATH}`,
  }),
  schema: ({ image }) =>
    z.object({
      // basic meta
      title: z.string(),
      description: z.string(),
      author: z.string().default(SITE.author),

      // dates
      pubDatetime: z.date(),
      modDatetime: z.date().optional().nullable(),
      timezone: z.string().optional(),

      // flags
      featured: z.boolean().optional(),
      featuredOrder: z.number().optional(),
      draft: z.boolean().optional(),
      hideEditPost: z.boolean().optional(),


      // taxonomy
      tags: z.array(z.string()).default(["others"]),

      // ✅ cover image for cards & posts
      image: z.string().optional(),


      // social / SEO image
      ogImage: image().or(z.string()).optional(),

      // misc
      canonicalURL: z.string().optional(),
    }),
});

export const collections = {
  blog,
};
