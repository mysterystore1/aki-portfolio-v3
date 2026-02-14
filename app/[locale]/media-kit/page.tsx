import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import { Locale, isLocale } from '@/lib/i18n';
import { buildAlternates } from '@/lib/seo';
import { getSettings } from '@/lib/microcms';
import { copyPack } from '@/lib/copy-pack';
import FieldNote from '@/components/FieldNote';
import ImageWithFallback from '@/components/ImageWithFallback';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;
  const title =
    resolvedLocale === 'jp'
      ? copyPack.mediaKit.meta.ja.title
      : copyPack.mediaKit.meta.en.title;

  return {
    title,
    alternates: buildAlternates(resolvedLocale, `/${resolvedLocale}/media-kit`),
    description:
      resolvedLocale === 'jp'
        ? copyPack.mediaKit.meta.ja.description
        : copyPack.mediaKit.meta.en.description
  };
}

export default async function MediaKitPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;
  const settings = await getSettings();
  const mediaKitPdfUrl = settings.media_kit_pdf_url || '/media-kit.pdf';
  const includes =
    resolvedLocale === 'jp'
      ? copyPack.mediaKit.includes.ja
      : copyPack.mediaKit.includes.en;
  const useCases =
    resolvedLocale === 'jp'
      ? copyPack.mediaKit.useCases.ja
      : copyPack.mediaKit.useCases.en;

  return (
    <section className="bg-white">
      <Container className="py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              {resolvedLocale === 'jp'
                ? copyPack.mediaKit.hero.kicker.ja
                : copyPack.mediaKit.hero.kicker.en}
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-ink-900">
              {resolvedLocale === 'jp'
                ? copyPack.mediaKit.hero.title.ja
                : copyPack.mediaKit.hero.title.en}
            </h1>
            <p className="mt-3 max-w-prose whitespace-pre-line text-sm leading-6 text-slate-600">
              {resolvedLocale === 'jp'
                ? copyPack.mediaKit.hero.lead.ja
                : copyPack.mediaKit.hero.lead.en}
            </p>

            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <ul className="space-y-2 text-sm text-slate-600">
                  {includes.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-ink-900" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
                <ul className="space-y-2 text-sm text-slate-600">
                  {useCases.map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 rounded-full bg-ink-900" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={mediaKitPdfUrl}
                download
                className="inline-flex items-center rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink-700"
              >
                {resolvedLocale === 'jp'
                  ? copyPack.mediaKit.buttons.pdf.ja
                  : copyPack.mediaKit.buttons.pdf.en}
              </a>
              <a
                href={settings.x_profile_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-ink-900 transition hover:border-ink-900"
              >
                {resolvedLocale === 'jp'
                  ? copyPack.mediaKit.buttons.x.ja
                  : copyPack.mediaKit.buttons.x.en}
              </a>
              <a
                href={settings.telegram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-ink-900 transition hover:border-ink-900"
              >
                {resolvedLocale === 'jp'
                  ? copyPack.mediaKit.buttons.telegram.ja
                  : copyPack.mediaKit.buttons.telegram.en}
              </a>
            </div>
            <div className="mt-6">
              <FieldNote
                variant="proof"
                body={
                  resolvedLocale === 'jp'
                    ? copyPack.mediaKit.note.ja
                    : copyPack.mediaKit.note.en
                }
              />
            </div>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
            <a
              href={mediaKitPdfUrl}
              download
              className="relative block aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <ImageWithFallback
                src="/images/media-kit.png"
                alt="Media kit preview"
                fallbackLabel="Media kit"
                imageClassName="object-cover"
                sizes="(max-width: 1024px) 100vw, 360px"
              />
            </a>
            <div className="mt-4 text-xs text-slate-500">
              {resolvedLocale === 'jp'
                ? 'PDFプレビュー（プレースホルダー）'
                : 'PDF preview (placeholder)'}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
