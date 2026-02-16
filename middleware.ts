import { NextRequest, NextResponse } from 'next/server';
import { defaultLocale, isLocale, type Locale } from '@/lib/i18n';

const LOCALE_COOKIE = 'preferred_locale';

type WeightedLocale = {
  value: string;
  quality: number;
};

function parseAcceptLanguage(header: string | null): WeightedLocale[] {
  if (!header) return [];

  return header
    .split(',')
    .map((token) => token.trim())
    .filter(Boolean)
    .map((token) => {
      const [value, ...params] = token.split(';').map((part) => part.trim());
      const qPart = params.find((part) => part.startsWith('q='));
      const quality = qPart ? Number(qPart.slice(2)) : 1;
      return {
        value: value.toLowerCase(),
        quality: Number.isFinite(quality) ? quality : 0
      };
    })
    .filter((entry) => entry.quality > 0)
    .sort((a, b) => b.quality - a.quality);
}

function localeFromAcceptLanguage(header: string | null): Locale {
  const weighted = parseAcceptLanguage(header);
  for (const item of weighted) {
    if (item.value === 'en' || item.value.startsWith('en-')) return 'en';
    if (
      item.value === 'ja' ||
      item.value.startsWith('ja-') ||
      item.value === 'jp' ||
      item.value.startsWith('jp-')
    ) {
      return 'jp';
    }
  }
  return defaultLocale;
}

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.next();
  }

  const cookieLocale = request.cookies.get(LOCALE_COOKIE)?.value;
  const resolvedLocale =
    cookieLocale && isLocale(cookieLocale)
      ? cookieLocale
      : localeFromAcceptLanguage(request.headers.get('accept-language'));

  const targetUrl = request.nextUrl.clone();
  targetUrl.pathname = `/${resolvedLocale}`;
  return NextResponse.redirect(targetUrl);
}

export const config = {
  matcher: ['/']
};
