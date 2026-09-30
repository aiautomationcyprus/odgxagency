/**
 * Field mapping.
 *
 * CMS field names rarely match a theme's schema exactly. Each entry below says
 * "this schema field comes from one of these CMS fields", so adapting the theme
 * to an existing content model usually means editing this file only.
 *
 * Add your own field name to the front of a list and it wins.
 */
import type { CollectionName } from './types';

type Aliases = Record<string, string[]>;

/** Applied to every collection before the collection-specific aliases. */
const COMMON: Aliases = {
  title: ['title', 'name', 'heading'],
  excerpt: ['excerpt', 'summary', 'description', 'subtitle', 'intro'],
  image: ['image', 'cover', 'coverImage', 'featuredImage', 'thumbnail', 'photo'],
  publishedAt: ['publishedAt', 'publishDate', 'date', 'publishedDate'],
  updatedAt: ['updatedAt', 'updatedDate', 'modified'],
  order: ['order', 'sortOrder', 'position', 'rank'],
  featured: ['featured', 'isFeatured', 'highlight'],
  draft: ['draft', 'isDraft'],
  category: ['category', 'categorySlug', 'topic'],
};

const BY_COLLECTION: Partial<Record<CollectionName, Aliases>> = {
  posts: {
    readingTime: ['readingTime', 'readTime', 'minutes'],
  },
  team: {
    name: ['name', 'fullName', 'title'],
    role: ['role', 'jobTitle', 'position'],
    social: ['social', 'socialLinks', 'links'],
  },
  testimonials: {
    quote: ['quote', 'testimonial', 'body', 'content'],
    author: ['author', 'name', 'authorName'],
    role: ['role', 'jobTitle', 'company'],
    avatar: ['avatar', 'image', 'photo'],
    logo: ['logo', 'companyLogo'],
    rating: ['rating', 'stars', 'score'],
  },
  plans: {
    name: ['name', 'title', 'planName'],
    price: ['price', 'amount', 'monthlyPrice'],
    features: ['features', 'includes', 'benefits'],
    cta: ['cta', 'callToAction', 'button'],
  },
  faqs: {
    question: ['question', 'title'],
    answer: ['answer', 'body', 'content'],
    page: ['page', 'group', 'section'],
  },
  stats: {
    value: ['value', 'number', 'count'],
    suffix: ['suffix', 'unit'],
    label: ['label', 'title', 'caption'],
  },
  values: {
    title: ['title', 'name'],
    description: ['description', 'body', 'excerpt'],
    icon: ['icon', 'iconName'],
  },
  milestones: {
    year: ['year', 'date', 'when'],
  },
  awards: {
    issuer: ['issuer', 'awardedBy', 'organization', 'organization'],
    year: ['year', 'date'],
  },
  partners: {
    name: ['name', 'title', 'company'],
    logo: ['logo', 'image', 'mark'],
    group: ['group', 'type', 'kind'],
  },
  solutions: {
    icon: ['icon', 'iconName'],
    thumbnail: ['thumbnail', 'image', 'preview'],
    highlights: ['highlights', 'bullets', 'features'],
  },
  investors: {
    document: ['document', 'file', 'report', 'attachment'],
  },
};

/**
 * Rewrites a CMS entry's fields into this theme's schema shape.
 * Fields the theme does not know about are passed through untouched, so a
 * custom schema extension keeps working.
 */
export function mapEntry(collection: CollectionName, fields: Record<string, unknown>): Record<string, unknown> {
  const aliases: Aliases = { ...COMMON, ...(BY_COLLECTION[collection] ?? {}) };
  const out: Record<string, unknown> = { ...fields };

  for (const [target, candidates] of Object.entries(aliases)) {
    if (out[target] !== undefined && out[target] !== null) continue;
    const hit = candidates.find((key) => fields[key] !== undefined && fields[key] !== null);
    if (hit) out[target] = fields[hit];
  }

  return out;
}
