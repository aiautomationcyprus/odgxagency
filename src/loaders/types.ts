import type { Loader } from 'astro/loaders';

/** The collections this theme knows how to source from a CMS. */
export type CollectionName =
  | 'posts'
  | 'blogCategories'
  | 'solutions'
  | 'investors'
  | 'investorCategories'
  | 'stories'
  | 'team'
  | 'testimonials'
  | 'plans'
  | 'faqs'
  | 'stats'
  | 'values'
  | 'milestones'
  | 'awards'
  | 'company'
  | 'strategy'
  | 'impact'
  | 'partners';

/** Every remote source implements this one function. */
export interface ContentSource {
  name: string;
  /** True when the environment holds the credentials this source needs. */
  isConfigured(): boolean;
  /** Returns a loader for one collection, or null if it doesn't provide it. */
  loader(collection: CollectionName): Loader | null;
}
