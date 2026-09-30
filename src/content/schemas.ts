/**
 * Content schemas.
 *
 * Every source — local files, Contentful, Sanity, Strapi — is validated against
 * the same shapes, so pages never need to know where their data came from.
 * A CMS loader's job is only to map its own field names onto these.
 */
import type { SchemaContext } from 'astro:content';
import { z } from 'astro/zod';

/** Images may be a bundled asset (local) or an absolute URL (a CMS). */
const imageField = ({ image }: SchemaContext) => z.union([image(), z.url()]);

export const seo = z.object({
  /** Overrides the page title in search results and social cards. */
  title: z.string().optional(),
  description: z.string().optional(),
  image: z.string().optional(),
  noindex: z.boolean().default(false),
});

/** An author or spokesperson credited on a piece of content. */
export const person = (ctx: SchemaContext) =>
  z.object({
    name: z.string(),
    role: z.string().optional(),
    avatar: imageField(ctx).optional(),
  });

/* --------------------------------------------------------------- taxonomy -- */

export const categorySchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  /** Lower numbers list first. */
  order: z.number().default(0),
});

/* -------------------------------------------------------------- solutions -- */

export const solutionSchema = (ctx: SchemaContext) =>
  z.object({
    title: z.string(),
    excerpt: z.string(),
    /** Icon file name from `src/icons`. */
    icon: z.string().default('arrow-up-right-sm'),
    thumbnail: imageField(ctx).optional(),
    cover: imageField(ctx).optional(),
    /** Selling points listed over the card image on the home page. */
    highlights: z
      .array(z.object({ title: z.string(), description: z.string() }))
      .default([]),
    order: z.number().default(0),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    seo: seo.optional(),
  });

/* ------------------------------------------------------------------- blog -- */

export const postSchema = (ctx: SchemaContext) =>
  z.object({
    title: z.string(),
    excerpt: z.string(),
    /** Matches an entry id in the `blogCategories` collection. */
    category: z.string(),
    author: person(ctx),
    publishedAt: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    image: imageField(ctx),
    readingTime: z.number().optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    seo: seo.optional(),
  });

/* -------------------------------------------------------------- investors -- */

export const investorSchema = (ctx: SchemaContext) =>
  z.object({
    title: z.string(),
    excerpt: z.string(),
    /** Matches an entry id in the `investorCategories` collection. */
    category: z.string(),
    publishedAt: z.coerce.date(),
    image: imageField(ctx),
    /** Capital raised so far, pre-formatted for display (e.g. "$2.5M"). */
    raised: z.string(),
    /** Number of participating investors. */
    investors: z.number(),
    /** Progress toward the round's target, 0–100. */
    funded: z.number().min(0).max(100),
    /** Smallest ticket accepted, pre-formatted for display. */
    minimumInvestment: z.string().optional(),
    /** Remaining allocations in the round. */
    slotsLeft: z.number().optional(),
    /** Optional report or filing to download. */
    document: z.object({ label: z.string(), href: z.string() }).optional(),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    seo: seo.optional(),
  });

/* ----------------------------------------------------------------- stories -- */

export const storySchema = (ctx: SchemaContext) =>
  z.object({
    title: z.string(),
    excerpt: z.string(),
    image: imageField(ctx),
    publishedAt: z.coerce.date(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
    seo: seo.optional(),
  });

/* -------------------------------------------------------------------- team -- */

export const teamSchema = (ctx: SchemaContext) =>
  z.object({
    name: z.string(),
    role: z.string(),
    image: imageField(ctx),
    order: z.number().default(0),
    social: z
      .array(z.object({ label: z.string(), href: z.url(), icon: z.string() }))
      .default([]),
  });

/* ------------------------------------------------------------ testimonials -- */

export const testimonialSchema = (ctx: SchemaContext) =>
  z.object({
    quote: z.string(),
    author: z.string(),
    role: z.string(),
    avatar: imageField(ctx),
    /** Icon file name for the client's wordmark. */
    logo: z.string(),
    rating: z.number().min(0).max(5).default(5),
    /** Figures shown beside the quote, e.g. funding raised. */
    stats: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
    order: z.number().default(0),
  });

/* ----------------------------------------------------------------- pricing -- */

export const planSchema = z.object({
  name: z.string(),
  tagline: z.string().optional(),
  excerpt: z.string().optional(),
  price: z.number(),
  currency: z.string().default('$'),
  period: z.string().default('per month'),
  icon: z.string().default('pricing-01'),
  features: z.array(z.string()),
  cta: z.object({ label: z.string(), href: z.string() }),
  /** Renders the plan in the inverted, emphasised style. */
  featured: z.boolean().default(false),
  order: z.number().default(0),
});

/* --------------------------------------------------------------------- faq -- */

export const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
  /** Groups questions onto the page that asks them. */
  page: z.string().default('pricing'),
  order: z.number().default(0),
});

/* -------------------------------------------------------- page-level data -- */

export const statSchema = z.object({
  /** The number the odometer counts to, e.g. 40. */
  value: z.number(),
  suffix: z.string().default('+'),
  label: z.string(),
  order: z.number().default(0),
});

export const valueSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
  order: z.number().default(0),
});

export const milestoneSchema = (ctx: SchemaContext) =>
  z.object({
    year: z.string(),
    title: z.string(),
    description: z.string(),
    image: imageField(ctx),
    order: z.number().default(0),
  });

export const awardSchema = (ctx: SchemaContext) =>
  z.object({
    title: z.string(),
    issuer: z.string(),
    year: z.string(),
    image: imageField(ctx),
    order: z.number().default(0),
  });

/** A headline figure on the sustainability page. */
export const impactSchema = z.object({
  value: z.string(),
  title: z.string(),
  description: z.string(),
  order: z.number().default(0),
});

export const partnerSchema = (ctx: SchemaContext) =>
  z.object({
    name: z.string(),
    logo: imageField(ctx),
    href: z.url().optional(),
    /** `partners` runs in the home marquee, `trusted` on the about page. */
    group: z.enum(['partners', 'trusted']).default('partners'),
    order: z.number().default(0),
  });
