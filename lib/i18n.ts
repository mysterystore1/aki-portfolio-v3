export const locales = ['jp', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'jp';

export const localeLabels: Record<Locale, string> = {
  jp: 'JP',
  en: 'EN'
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function otherLocale(locale: Locale): Locale {
  return locale === 'jp' ? 'en' : 'jp';
}

export function withLocale(path: string, locale: Locale): string {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return normalized.replace(/^\/(jp|en)/, `/${locale}`);
}

export function pickByLocale<T>(locale: Locale, value: { ja: T; en: T }): T {
  return locale === 'jp' ? value.ja : value.en;
}

export function pickLocalizedText({
  locale,
  ja,
  en,
  enReviewed = true
}: {
  locale: Locale;
  ja: string;
  en?: string | null;
  enReviewed?: boolean | null;
}) {
  if (locale === 'jp') {
    return {
      text: ja,
      isAutoTranslated: false,
      usedFallback: false
    };
  }

  const trimmedEn = en?.trim() ?? '';
  const hasEn = trimmedEn.length > 0;
  const text = hasEn ? trimmedEn : ja;
  const usedFallback = !hasEn;

  return {
    text,
    isAutoTranslated: !enReviewed || usedFallback,
    usedFallback
  };
}
