import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import TagChip from '@/components/TagChip';
import MetricBadge from '@/components/MetricBadge';
import AutoTranslatedBadge from '@/components/AutoTranslatedBadge';
import WorkOpenTracker from '@/components/WorkOpenTracker';
import ImageWithFallback from '@/components/ImageWithFallback';
import FieldNote from '@/components/FieldNote';
import ProofLinks from '@/components/ProofLinks';
import { Locale, isLocale, locales, pickLocalizedText } from '@/lib/i18n';
import { buildAlternates, buildOgImage } from '@/lib/seo';
import { getWorkBySlug, getWorks } from '@/lib/microcms';

export async function generateStaticParams() {
  const works = await getWorks();
  return locales.flatMap((locale) =>
    works.map((work) => ({ locale, slug: work.slug }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;
  if (!slug) notFound();
  const work = await getWorkBySlug(slug);
  if (!work) return {};

  const title = pickLocalizedText({
    locale: resolvedLocale,
    ja: work.title_ja,
    en: work.title_en,
    enReviewed: work.en_reviewed
  }).text;

  const description = pickLocalizedText({
    locale: resolvedLocale,
    ja: work.summary_ja,
    en: work.summary_en,
    enReviewed: work.en_reviewed
  }).text;

  return {
    title,
    description,
    alternates: buildAlternates(
      resolvedLocale,
      `/${resolvedLocale}/works/${work.slug}`
    ),
    openGraph: {
      title,
      description,
      images: buildOgImage(work.cover_image?.url)
    }
  };
}

export default async function WorkDetailPage({
  params
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  if (!slug) notFound();
  const resolvedLocale = locale as Locale;
  const work = await getWorkBySlug(slug);
  if (!work) notFound();

  const title = pickLocalizedText({
    locale: resolvedLocale,
    ja: work.title_ja,
    en: work.title_en,
    enReviewed: work.en_reviewed
  });

  const summary = pickLocalizedText({
    locale: resolvedLocale,
    ja: work.summary_ja,
    en: work.summary_en,
    enReviewed: work.en_reviewed
  });
  const showAuto = title.isAutoTranslated || summary.isAutoTranslated;
  const detailSections =
    resolvedLocale === 'jp' ? work.detail_sections_ja : work.detail_sections_en;
  const mainSections = detailSections?.filter((section) => section.tone !== 'note');
  const noteSections = detailSections?.filter((section) => section.tone === 'note');

  return (
    <section className="bg-white">
      <Container className="py-16 sm:py-20">
        <WorkOpenTracker slug={work.slug} locale={resolvedLocale} />
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3 text-xs text-slate-500">
              {work.date_range && <span>{work.date_range}</span>}
              {resolvedLocale === 'en' && showAuto && <AutoTranslatedBadge />}
            </div>
            <h1 className="text-3xl font-semibold text-ink-900">{title.text}</h1>
            <p className="text-base text-slate-700">{summary.text}</p>
            {work.proof_links?.length ? (
              <div className="rounded-2xl border border-sky-100 bg-sky-50/60 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-sky-900/70">
                  Proof
                </p>
                <div className="mt-2">
                  <ProofLinks links={work.proof_links} variant="full" />
                </div>
              </div>
            ) : null}
            {mainSections?.length ? (
              <div className="space-y-4">
                {mainSections.map((section, index) => (
                  <div
                    key={`${section.heading}-${index}`}
                    className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      {section.heading}
                    </p>
                    {section.body ? (
                      <p className="mt-2 whitespace-pre-line">{section.body}</p>
                    ) : null}
                    {section.list?.length ? (
                      <ul className="mt-2 list-disc space-y-1 pl-4">
                        {section.list.map((item, itemIndex) => (
                          <li key={`${item}-${itemIndex}`}>{item}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                ))}
              </div>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {work.role_tags?.map((tag) => (
                <TagChip key={tag} label={tag} />
              ))}
            </div>
            {work.metrics?.length ? (
              <div className="grid gap-3 sm:grid-cols-2">
                {work.metrics.map((metric, index) => (
                  <MetricBadge
                    key={`${metric.label}-${index}`}
                    label={metric.label}
                    value={metric.value}
                  />
                ))}
              </div>
            ) : null}
            {work.proof_links?.length ? (
              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {resolvedLocale === 'jp' ? '証拠リンク' : 'Proof links'}
                </p>
                <div className="flex flex-wrap gap-3">
                  {work.proof_links.map((link, index) => (
                    <a
                      key={`${link.label}-${index}`}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 hover:text-ink-900"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            ) : null}
            {noteSections?.length ? (
              <div className="space-y-3">
                {noteSections.map((section, index) => (
                  <FieldNote
                    key={`${section.heading}-${index}`}
                    body={section.body}
                    items={section.list}
                  />
                ))}
              </div>
            ) : null}
          </div>

          <div className="flex flex-col gap-6">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl bg-slate-100">
              <ImageWithFallback
                src={work.cover_image?.url}
                alt={title.text}
                fallbackLabel="Aki"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            {work.gallery_images?.length ? (
              <div className="grid gap-4 sm:grid-cols-2">
                {work.gallery_images.map((image, index) => (
                  <div
                    key={`${image.url}-${index}`}
                    className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-slate-100"
                  >
                    <ImageWithFallback
                      src={image.url}
                      alt={`${title.text} ${index + 1}`}
                      fallbackLabel="Aki"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
