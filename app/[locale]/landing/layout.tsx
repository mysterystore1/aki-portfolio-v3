import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, Locale } from '@/lib/i18n';
import { buildAlternates } from '@/lib/seo';
import { landingCopy } from '@/lib/landing-copy';
import './landing.css';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const resolvedLocale = locale as Locale;
  const copy = landingCopy[resolvedLocale];

  return {
    title: copy.meta.title,
    description: copy.meta.description,
    alternates: buildAlternates(resolvedLocale, `/${resolvedLocale}/landing`),
    openGraph: {
      title: copy.meta.title,
      description: copy.meta.description,
      url: `/${resolvedLocale}/landing`,
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.meta.title,
      description: copy.meta.description
    }
  };
}

export default async function LandingLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&family=Marcellus&family=Sora:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="landing">{children}</div>
    </>
  );
}
