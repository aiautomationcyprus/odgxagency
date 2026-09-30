# Changelog

All notable changes to this theme are recorded here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and the theme follows
[semantic versioning](https://semver.org/): the major number changes when an
update needs you to edit your own files, the minor when features arrive that do
not, and the patch for fixes.

## [1.0.0] — 2026-09-09

First release.

### Pages

Home, About, Solutions (index, detail, category), Sustainability, Investors
(index, detail, category), Stories, Pricing, Blog (index, post, category),
Contact, a style guide, and a 404 — 42 routes in all from the demo content.

### Content

- Markdown and MDX collections as the default source, so a fresh install has a
  full site without any service to sign up for.
- Optional loaders for Contentful, Sanity, Strapi, WordPress, and Shopify. One
  environment variable switches a collection over; nothing else changes.
- Typed schemas for every collection, validated at build time.

### Design and motion

- Tailwind CSS v4, configured in CSS rather than a config file, with the design
  tokens in `src/styles/theme.css`.
- Scroll-driven motion built on GSAP with Lenis for momentum scrolling, and a
  reduced-motion path throughout.
- Both typefaces self-hosted and subset, so no network request leaves the site.

### Technical

- Astro 7 with zero client-side framework code.
- Sitemap, RSS feed, `robots.txt`, canonical URLs, Open Graph and Twitter cards,
  and JSON-LD for the organization, articles, and breadcrumbs.
- Passes axe-core at WCAG 2.1 AA on the home, contact, pricing, and article
  pages, with a skip link and visible focus throughout.

[1.0.0]: https://github.com/ThemeNcode/mnc-astro-theme/releases/tag/v1.0.0
