import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getSettings } from '@/lib/microcms';
import { isLocale, Locale, locales } from '@/lib/i18n';
import LocaleLayoutClient from '@/components/LocaleLayoutClient';

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;

  return {
    title:
      resolvedLocale === 'jp'
        ? 'Aki Web3 ポートフォリオ'
        : 'Aki Web3 Portfolio',
    description:
      resolvedLocale === 'jp'
        ? 'Web3のKOL/MC/Community/BD/Contents領域で実績を持つAkiの多言語ポートフォリオ。'
        : 'JP/EN portfolio for Web3 hosting, AMA moderation, community growth, and content collaborations.'
  };
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  const settings = await getSettings();

  return (
    <LocaleLayoutClient locale={resolvedLocale} settings={settings}>
      {children}
    </LocaleLayoutClient>
  );
}
