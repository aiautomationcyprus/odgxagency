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
  { label: 'Über die Agentur', href: ODG, external: true },
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
      { label: 'Impressum', href: `${ODG}/impressum/`, external: true },
      { label: 'AGB', href: `${ODG}/agb/`, external: true },
      { label: 'Datenschutzerklärung', href: `${ODG}/datenschutzerklaerung/`, external: true },
    ],
  },
];
