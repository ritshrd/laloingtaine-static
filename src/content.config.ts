import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// ============================================
// Concert Collection
// Concerts past and upcoming, bilingual (en/fr)
// ============================================
const concerts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/concerts' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    musicians: z.string().optional(),
    program: z.string().optional(),
  }),
});

// ============================================
// Artist Collection
// Musician profiles, bilingual (en/fr)
// ============================================
const artists = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/artists' }),
  schema: z.object({
    name: z.string(),
    instrument: z.string(),
    country: z.string().optional(),
    photo: z.string().optional(),
    website: z.string().url().optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

// ============================================
// Pages Collection
// Static pages content, bilingual (en/fr)
// ============================================
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    section: z.enum(['home', 'delight', 'learning', 'discovery', 'sharing', 'about']),
    image: z.string().optional(),
    order: z.number().default(0),
  }),
});

// ============================================
// Gallery Collection
// Photo galleries organized by year/event
// ============================================
const gallery = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/gallery' }),
  schema: z.object({
    title: z.string(),
    year: z.coerce.number(),
    category: z.enum(['concerts', 'academies', 'events', 'general']),
    photos: z.array(z.object({
      image: z.string(),
      caption: z.string().optional(),
      photographer: z.string().optional(),
    })),
  }),
});

export const collections = {
  concerts,
  artists,
  pages,
  gallery,
};
