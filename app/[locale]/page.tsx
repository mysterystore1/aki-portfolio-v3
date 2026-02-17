import { notFound, redirect } from 'next/navigation';
import type { Metadata } from 'next';
import { buildAlternates, buildOgImage, buildTwitterImages } from '@/lib/seo';
import { isLocale, type Locale } from '@/lib/i18n';
import { landingCopy } from '@/lib/landing-copy';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  const copy = landingCopy[resolvedLocale].meta;

  return {
    title: copy.title,
    description: copy.description,
    alternates: buildAlternates(resolvedLocale, `/${resolvedLocale}`),
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: `/${resolvedLocale}`,
      type: 'website',
      images: buildOgImage()
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.title,
      description: copy.description,
      images: buildTwitterImages()
    }
  };
}

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  redirect(`/${resolvedLocale}/landing`);
}
