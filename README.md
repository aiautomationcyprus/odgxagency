# MNC — Corporate Astro Theme

A multi-sector corporate website theme for [Astro](https://astro.build): 16 page
templates building 42 routes, 18 content collections, a scroll-driven motion
layer, and a design token system you can retheme from a single file.

Content comes from local Markdown, MDX and JSON out of the box, and can be
switched to Contentful, Sanity, Strapi, WordPress or Shopify with one
environment variable.

---

## Quick start

```sh
npm install
npm run dev
```

The site runs at `http://localhost:4321` with the full demo content already in
place — no CMS, no API keys, nothing to configure.

| Command | Does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Build to `./dist` |
| `npm run preview` | Preview the production build |
| `npm run check` | Type-check `.astro` and `.ts` files |
| `npm run format` | Format with Prettier |

**Requirements:** Node 22.12 or newer. The first build downloads the two
webfonts, so it needs network access once.

---

## What's included

**Pages**

| Route | Template |
| --- | --- |
| `/` | Home |
| `/about` | About |
| `/solutions`, `/solutions/[slug]` | Solutions index and detail |
| `/sustainability` | Sustainability report |
| `/stories/[slug]` | Success story detail |
| `/investors`, `/investors/[slug]` | Investor index and detail |
| `/investors/category/[slug]` | Investor category |
| `/blog`, `/blog/[slug]` | Blog index and post |
| `/blog/category/[slug]` | Blog category |
| `/pricing` | Pricing |
| `/contact` | Contact |
| `/style-guide` | Live component and token reference |
| `/404` | Not found |
| `/rss.xml` | Blog feed |
| `/robots.txt`, `/sitemap-index.xml` | Generated from `SITE.url` |

**Also in the box:** canonical URLs, Open Graph and Twitter cards, JSON-LD for
the organization, articles and breadcrumbs, self-hosted fonts, responsive
images, a keyboard-accessible nav, tabs, accordion and carousel, and a motion
layer that honors `prefers-reduced-motion`.

Search-engine files are built from `SITE.url`, so setting that one value in
`src/config/site.ts` points the sitemap, the feed and every canonical URL at
your domain.

---

## Making it yours

### 1. Site details

`src/config/site.ts` holds the site name, URL, description, contact details and
social links, plus every route in one `ROUTES` object.

`src/config/navigation.ts` holds the header and footer menus. The Solutions mega
menu builds itself from the solutions collection, so adding a solution adds it to
the nav.

### 2. Look and feel

`src/styles/theme.css` is the whole design system: colors, type scale, spacing
rhythm, radii. Change a value there and it propagates everywhere, including the
style guide page.

The type scale and section rhythm are responsive by design — `--size-h1` and
`--section-gap` step down on smaller screens on their own, so components never
carry breakpoint classes for them.

```
src/styles/
  theme.css        design tokens — start here
  global.css       Tailwind bindings and base elements
  components.css   component classes generated from the design
  behavior.css    interactive states: nav, dropdowns, tabs, hovers
  prose.css        rich text (Markdown/MDX bodies)
  additions.css    the few elements this theme adds beyond the design
```

`components.css` is generated. Prefer overriding a class in `additions.css`
rather than editing it, so you can regenerate cleanly.

### 3. Content

Everything lives in `src/content`:

```
src/content/
  posts/         blog posts (Markdown/MDX)
  solutions/     service pages
  investors/     funding rounds
  stories/       sustainability case studies
  data/          JSON: team, testimonials, plans, faqs, stats, awards…
```

Schemas are in `src/content/schemas.ts`. Add a field there and it is typed
everywhere it is used.

---

## Using a CMS

Copy `.env.example` to `.env`, set `CONTENT_SOURCE`, and add that source's
credentials:

```sh
CONTENT_SOURCE=wordpress
WORDPRESS_URL=https://blog.example.com
```

Five sources ship with the theme — **Contentful**, **Sanity**, **Strapi**,
**WordPress** and **Shopify** — and any other platform is a file away. See
[content sources](./docs/content-sources.md) for each one's fields and for the
process of adding your own.

That's the whole change — pages, components and schemas stay exactly the same.

**How it resolves.** Each collection asks the configured source for a loader. If
the source doesn't provide that collection, or its credentials are missing, the
collection quietly falls back to the local files. A half-migrated site still
builds, and you can move one collection at a time.

**Matching your content model.** CMS field names rarely match a theme's schema.
`src/loaders/mapping.ts` maps them: each schema field lists the CMS field names
it will accept. Put your own field name at the front of a list and it wins.

Content type IDs live at the top of each loader (`src/loaders/contentful.ts`,
`sanity.ts`, `strapi.ts`) — rename them to match your space.

**Adding another source.** Implement the `ContentSource` interface in
`src/loaders/types.ts` and add it to the list in `src/loaders/index.ts`. The
existing three are about 100 lines each and are meant to be copied.

---

## Motion

`src/scripts/motion.ts` holds every scroll and load animation, driven by
`data-anim` attributes in the markup:

```astro
<h2 data-anim="title">Section heading</h2>
<div data-anim="fade-up" data-anim-delay="0.25">…</div>
```

Available effects: `fade-up`, `fade-left`, `fade-right`, `grow`, `zoom-out`,
`title`, `hero-title`, `words`, `counter`, `marquee`, `converge`, `stack`,
`timeline`, `line`, `hero-image`, `blink`.

Retime or disable the lot from the `EFFECTS` map at the top of that file. Hover
states are deliberately CSS rather than JavaScript — they live in
`behavior.css`, cost nothing, and work before the page hydrates.

Readers with `prefers-reduced-motion: reduce` get the content revealed
immediately and no animation at all.

---

## Deploying

The theme is fully static, so it runs anywhere:

```sh
npm run build      # → ./dist
```

Set `SITE.url` in `src/config/site.ts` before building — canonical URLs, the
sitemap and social tags all derive from it.

For a host with server rendering, add the matching adapter with
`npx astro add netlify` (or `vercel`, `node`, `cloudflare`).

---

## Third-party licenses

The theme's design and code are covered by your purchase. Two dependencies carry
their own terms, both of which permit commercial use:

- **GSAP** — free under the [standard GSAP license](https://gsap.com/community/standard-license/), including the SplitText and ScrollTrigger plugins used here.
- **Fonts** — General Sans (Fontshare) and Inter Tight (Google Fonts) are downloaded and self-hosted at build time by Astro's fonts API; neither is redistributed in this repository.

Demo photography is placeholder content. Replace it before going live.
