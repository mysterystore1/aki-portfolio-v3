import type { Locale } from '@/lib/i18n';

export function getBaseUrl() {
  return process.env.SITE_URL?.replace(/\/$/, '') || 'https://example.com';
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
  if (!url) return undefined;
  return [
    {
      url,
      width: 1200,
      height: 630,
      alt: 'Aki Web3 Portfolio'
    }
  ];
}
