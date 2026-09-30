import { ROUTES } from './site';

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

export interface NavItem extends NavLink {
  columns?: NavLink[][];
  menu?: 'solutions' | 'pages' | 'wide';
}

const ODG = 'https://www.online-digitalx.de';

export const primaryNav: NavItem[] = [
  { label: 'Usecases', href: `${ODG}/usecases/`, external: true },
  {
    label: 'Leistungen',
    href: ROUTES.home,
    menu: 'pages',
    columns: [
      [
        { label: 'SEO / GEO', href: `${ODG}/suchmaschinenoptimierung/`, external: true },
        { label: 'SEA + ChatGPT Ads', href: `${ODG}/suchmaschinenmarketing/`, external: true },
        { label: 'Display Ads', href: `${ODG}/display-advertising/`, external: true },
      ],
      [
        { label: 'Social Media', href: `${ODG}/social-media-influencer-marketing/`, external: true },
        { label: 'Podcasts', href: '/' },
        { label: 'Content Creation', href: `${ODG}/conversion-optimierung-agentur/video-produktion/`, external: true },
      ],
    ],
  },
  {
    label: 'Lösungen',
    href: ROUTES.home,
    menu: 'wide',
    columns: [
      [
        { label: 'Premium/CPC Netzwerke', href: `${ODG}/suchmaschinenmarketing/premium-netzwerke/`, external: true },
        { label: 'Social Media Starthilfe', href: `${ODG}/social-media-influencer-marketing/social-media-starthilfe/`, external: true },
        { label: 'Werbung für Online Shops', href: `${ODG}/werbung-fuer-online-shops/`, external: true },
        { label: 'Kundengewinnung B2B', href: `${ODG}/kundengewinnung-b2b/`, external: true },
        { label: 'Connected TV', href: `${ODG}/programmatic-adressable-tv/`, external: true },
      ],
      [
        { label: 'Performance Marketing', href: `${ODG}/performance-marketing-frankfurt/`, external: true },
        { label: 'Marketing Anwälte / StB', href: `${ODG}/marketing-fuer-rechtsanwaelte/`, external: true },
        { label: 'Content SEO', href: `${ODG}/suchmaschinenoptimierung/content/`, external: true },
        { label: 'Lead Generierung', href: `${ODG}/lead-generierung/`, external: true },
        { label: 'E-Commerce Lösungen', href: `${ODG}/e-commerce/`, external: true },
        { label: 'SEO SEA Marketing', href: `${ODG}/seo-sea-marketing/`, external: true },
        { label: 'HTML5 Banner Design', href: `${ODG}/display-advertising/html5-banner-design/`, external: true },
      ],
      [
        { label: 'Server Side Tagging', href: `${ODG}/conversion-optimierung-agentur/`, external: true },
        { label: 'Programmierung', href: `${ODG}/conversion-optimierung-agentur/programmierung/`, external: true },
        { label: 'Webdesign', href: `${ODG}/conversion-optimierung-agentur/webdesign/`, external: true },
        { label: 'Künstliche Intelligenz', href: `${ODG}/ki-ai/`, external: true },
        { label: 'KI Suche', href: `${ODG}/ki-suchergebnisse/`, external: true },
        { label: 'Barrierefreiheit', href: `${ODG}/barrierefreiheit-webseiten/`, external: true },
      ],
    ],
  },
  {
    label: 'Über die Agentur',
    href: ROUTES.about,
    menu: 'pages',
    columns: [
      [
        { label: 'Team', href: `${ODG}/team/`, external: true },
        { label: 'Erfahrungen & Branchen', href: `${ODG}/erfahrungen/`, external: true },
        { label: 'FAQs', href: `${ODG}/faq/`, external: true },
        { label: 'Investor Relations', href: `${ODG}/investor-relations/`, external: true },
      ],
      [
        { label: 'Sponsoring', href: `${ODG}/foerderung/`, external: true },
        { label: 'Academy', href: `${ODG}/veranstaltungen/`, external: true },
        { label: 'Partner', href: `${ODG}/partner/`, external: true },
        { label: 'Nachhaltigkeit', href: `${ODG}/nachhaltigkeit/`, external: true },
      ],
    ],
  },
];

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: 'Leistungen',
    links: [
      { label: 'SEO / GEO', href: `${ODG}/suchmaschinenoptimierung/`, external: true },
      { label: 'SEA + ChatGPT Ads', href: `${ODG}/suchmaschinenmarketing/`, external: true },
      { label: 'Display Ads', href: `${ODG}/display-advertising/`, external: true },
      { label: 'Social Media', href: `${ODG}/social-media-influencer-marketing/`, external: true },
      { label: 'Podcasts', href: '/' },
      { label: 'Content Creation', href: `${ODG}/conversion-optimierung-agentur/video-produktion/`, external: true },
    ],
  },
  {
    title: 'Unternehmen',
    links: [
      { label: 'Startseite', href: ROUTES.home },
      { label: 'Über die Agentur', href: `${ODG}/erfahrungen/`, external: true },
      { label: 'Team', href: `${ODG}/team/`, external: true },
      { label: 'FAQ', href: `${ODG}/faq/`, external: true },
      { label: 'Kontakt', href: `${ODG}/kontakt/`, external: true },
    ],
  },
  {
    title: 'Rechtliches',
    links: [
      { label: 'Impressum', href: '/impressum/' },
      { label: 'AGB', href: '/agb/' },
      { label: 'Datenschutzerklärung', href: '/privacy-policy/' },
    ],
  },
];
