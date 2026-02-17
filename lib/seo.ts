import type { Locale } from '@/lib/i18n';

const DEFAULT_SITE_URL = 'https://akiweb3.com';
const DEFAULT_OG_IMAGE = '/images/twitter-card-large.png';
const DEFAULT_TWITTER_IMAGE_SMALL = '/images/twitter-card-small.png';
const DEFAULT_TWITTER_IMAGE_LARGE = '/images/twitter-card-large.png';

function normalizeBaseUrl(url?: string) {
  if (!url) return null;
  const trimmed = url.trim();
  if (!trimmed) return null;
  const withProtocol = /^https?:\/\//i.test(trimmed)
    ? trimmed
    : `https://${trimmed}`;
  return withProtocol.replace(/\/$/, '');
}

export function getBaseUrl() {
  const candidates = [
    process.env.SITE_URL,
    process.env.NEXT_PUBLIC_SITE_URL,
    process.env.VERCEL_PROJECT_PRODUCTION_URL,
    process.env.VERCEL_URL
  ];

  for (const candidate of candidates) {
    const normalized = normalizeBaseUrl(candidate);
    if (normalized) return normalized;
  }

  return DEFAULT_SITE_URL;
}

export function buildAlternates(locale: Locale, path: string) {
  const baseUrl = getBaseUrl();
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const jpPath = normalized.replace(/^\/(jp|en)/, '/jp');
  const enPath = normalized.replace(/^\/(jp|en)/, '/en');

  return {
    canonical: `${baseUrl}${normalized}`,
    languages: {
      ja: `${baseUrl}${jpPath}`,
      en: `${baseUrl}${enPath}`
    }
  };
}

export function buildOgImage(url?: string) {
  const imageUrl = url || DEFAULT_OG_IMAGE;
  return [
    {
      url: imageUrl,
      alt: 'Aki Web3 Portfolio'
    }
  ];
}

export function buildTwitterImages() {
  return [
    {
      url: DEFAULT_TWITTER_IMAGE_SMALL,
      width: 1200,
      height: 1200,
      alt: 'Aki Web3 Profile Card'
    },
    {
      url: DEFAULT_TWITTER_IMAGE_LARGE,
      width: 1200,
      height: 630,
      alt: 'Aki Web3 Profile Card'
    }
  ];
}
