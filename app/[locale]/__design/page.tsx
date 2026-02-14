import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, type Locale } from '@/lib/i18n';
import type { ThemeId } from '@/lib/theme';
import DesignPreview from '@/components/DesignPreview';

const VALID_THEMES: ThemeId[] = ['A', 'B', 'C'];

function parseTheme(value: string | undefined): ThemeId {
  if (value && VALID_THEMES.includes(value as ThemeId)) {
    return value as ThemeId;
  }
  return 'A';
}

export const metadata: Metadata = {
  title: 'Design Preview (A/B/C)',
  robots: { index: false, follow: false }
};

export default async function DesignPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ theme?: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;

  const { theme: themeParam } = await searchParams;
  const theme = parseTheme(themeParam);

  return (
    <DesignPreview theme={theme} locale={resolvedLocale} />
  );
}
