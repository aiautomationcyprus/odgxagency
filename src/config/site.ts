/**
 * Site-wide configuration.
 * Edit this file first when setting the theme up for a new project.
 */
export const SITE = {
  url: 'https://digital-x.agency',
  name: 'ODGX',
  title: 'ODGX — Digital Marketing Agency Frankfurt',
  titleTemplate: '%s — ODGX',
  description:
    'Digital agency from Frankfurt specialising in SEO, Google Ads, web development and podcast production.',
  ogImage: '/og-image.jpg',
  logo: '/webclip.jpg',
  locale: 'en',
  themeColor: '#201d1d',
  credit: null,
  contact: {
    phone: '069 1753 611 90',
    phoneHref: 'tel:+496917536119',
    email: 'info@online-digitalx.de',
    address: 'Frankfurt am Main, Germany',
  },
  social: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/company/6435982', icon: 'linkedin' },
    { label: 'Facebook', href: 'https://www.facebook.com/onlinedigitalx', icon: 'facebook' },
    { label: 'Instagram', href: 'https://www.instagram.com/onlinedigitalx/', icon: 'instagram' },
  ],
} as const;

/**
 * Every route the theme renders. Keeping them in one place means a rename is a
 * one-line change rather than a search across templates.
 */
export const ROUTES = {
  home: '/',
  about: '/about/',
  solutions: '/solutions/',
  solution: (slug: string) => `/solutions/${slug}/`,
  sustainability: '/sustainability/',
  story: (slug: string) => `/stories/${slug}/`,
  investors: '/investors/',
  investor: (slug: string) => `/investors/${slug}/`,
  investorCategory: (slug: string) => `/investors/category/${slug}/`,
  pricing: '/pricing/',
  blog: '/blog/',
  post: (slug: string) => `/blog/${slug}/`,
  blogCategory: (slug: string) => `/blog/category/${slug}/`,
  contact: '/contact/',
  styleGuide: '/style-guide/',
  notFound: '/404',
} as const;
