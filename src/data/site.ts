/**
 * Global shell copy and links.
 * Strings come from docs/REDESIGN_PLAN.md sections 3.3, 4.2 and 4.3, or from
 * existing content.ts values. Product facts stay in src/data/content.ts.
 * Internal notes belong in docs/, never in this bundled data.
 */

import type { SocialIconKey } from '../components/icons';
import { labels } from './rangePages';

export interface SiteLink {
  label: string;
  href: string;
}

export interface FooterGroup {
  title: string;
  links: SiteLink[];
}

export interface SocialLink extends SiteLink {
  icon: SocialIconKey;
}

export const brand = {
  /** Plan D1: the wordmark spelling is unchanged. */
  name: 'CleanMyFace',
  sub: 'by Peerpharm',
  /** promise.statement (plan 4.2). */
  statement: 'Clean with Purpose',
};

export const navItems: SiteLink[] = [
  { label: 'Expertise', href: '/#expertise' },
  { label: 'Plump It Up', href: '/ranges/plump-it-up' },
  { label: 'Stay Clear', href: '/ranges/stay-clear' },
  { label: 'Contact', href: '/#contact' },
];

export const headerCta: SiteLink = {
  label: labels.exploreNow,
  href: '/#solutions',
};

export const footerGroups: FooterGroup[] = [
  {
    title: 'Ranges',
    links: [
      { label: 'Plump It Up', href: '/ranges/plump-it-up' },
      { label: 'Stay Clear', href: '/ranges/stay-clear' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Expertise', href: '/#expertise' },
      { label: 'Contact', href: '/#contact' },
    ],
  },
];

export const legalLinks: SiteLink[] = [
  { label: 'Privacy Policy', href: '/privacy-policy' },
  { label: 'Terms and Conditions', href: '/terms-and-conditions' },
];

/** Prototype contact details and social profiles for the redesigned contact band. */
export const contactInfo = {
  email: 'hello@cleanmyface.com',
  phone: '+63 917 123 4567',
  address: 'Peerpharm, Manila, Philippines',
  hours: 'Monday to Friday, 9am to 6pm PHT',
};

/** Prototype social profile URLs. Replace with the client's real profiles before launch. */
export const socialLinks: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/cleanmyface', icon: 'instagram' },
  { label: 'Facebook', href: 'https://facebook.com/cleanmyface', icon: 'facebook' },
  { label: 'Email', href: 'mailto:hello@cleanmyface.com', icon: 'email' },
];
