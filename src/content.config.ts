/**
 * Content collections.
 *
 * Long-form content lives in Markdown/MDX, structured lists in JSON — both
 * under `src/content`. Every collection is wrapped in `resolveLoader`, which
 * hands over to a CMS when `CONTENT_SOURCE` names one and falls back to these
 * local files otherwise. See `src/loaders/index.ts`.
 */
import { defineCollection } from 'astro:content';
import { file, glob } from 'astro/loaders';

import { resolveLoader } from './loaders';
import {
  awardSchema,
  categorySchema,
  faqSchema,
  impactSchema,
  investorSchema,
  milestoneSchema,
  partnerSchema,
  planSchema,
  postSchema,
  solutionSchema,
  statSchema,
  storySchema,
  teamSchema,
  testimonialSchema,
  valueSchema,
} from './content/schemas';

const markdown = (dir: string) =>
  glob({ pattern: '**/*.{md,mdx}', base: `./src/content/${dir}` });

const json = (name: string) => file(`./src/content/data/${name}.json`);

/* ------------------------------------------------------- editorial content -- */

const posts = defineCollection({
  loader: resolveLoader('posts', markdown('posts')),
  schema: postSchema,
});

const blogCategories = defineCollection({
  loader: resolveLoader('blogCategories', json('blog-categories')),
  schema: categorySchema,
});

const solutions = defineCollection({
  loader: resolveLoader('solutions', markdown('solutions')),
  schema: solutionSchema,
});

const investors = defineCollection({
  loader: resolveLoader('investors', markdown('investors')),
  schema: investorSchema,
});

const investorCategories = defineCollection({
  loader: resolveLoader('investorCategories', json('investor-categories')),
  schema: categorySchema,
});

const stories = defineCollection({
  loader: resolveLoader('stories', markdown('stories')),
  schema: storySchema,
});

/* ---------------------------------------------------------- structured data -- */

const team = defineCollection({
  loader: resolveLoader('team', json('team')),
  schema: teamSchema,
});

const testimonials = defineCollection({
  loader: resolveLoader('testimonials', json('testimonials')),
  schema: testimonialSchema,
});

const plans = defineCollection({
  loader: resolveLoader('plans', json('plans')),
  schema: planSchema,
});

const faqs = defineCollection({
  loader: resolveLoader('faqs', json('faqs')),
  schema: faqSchema,
});

const stats = defineCollection({
  loader: resolveLoader('stats', json('stats')),
  schema: statSchema,
});

const values = defineCollection({
  loader: resolveLoader('values', json('values')),
  schema: valueSchema,
});

const milestones = defineCollection({
  loader: resolveLoader('milestones', json('milestones')),
  schema: milestoneSchema,
});

const awards = defineCollection({
  loader: resolveLoader('awards', json('awards')),
  schema: awardSchema,
});

const company = defineCollection({
  loader: resolveLoader('company', json('company')),
  schema: valueSchema,
});

const strategy = defineCollection({
  loader: resolveLoader('strategy', json('strategy')),
  schema: valueSchema,
});

const impact = defineCollection({
  loader: resolveLoader('impact', json('impact')),
  schema: impactSchema,
});

const partners = defineCollection({
  loader: resolveLoader('partners', json('partners')),
  schema: partnerSchema,
});

export const collections = {
  posts,
  blogCategories,
  solutions,
  investors,
  investorCategories,
  stories,
  team,
  testimonials,
  plans,
  faqs,
  stats,
  values,
  milestones,
  awards,
  company,
  strategy,
  impact,
  partners,
};
