import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Container from '@/components/Container';
import AutoTranslatedBadge from '@/components/AutoTranslatedBadge';
import { Locale, isLocale, pickLocalizedText } from '@/lib/i18n';
import { buildAlternates } from '@/lib/seo';
import { getWorks } from '@/lib/microcms';
import { copyPack } from '@/lib/copy-pack';
import WorksExplorer from '@/components/WorksExplorer';
import FieldNote from '@/components/FieldNote';

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
      ? copyPack.works.listMeta.ja.title
      : copyPack.works.listMeta.en.title;

  return {
    title,
    alternates: buildAlternates(resolvedLocale, `/${resolvedLocale}/works`),
    description:
      resolvedLocale === 'jp'
        ? copyPack.works.listMeta.ja.description
        : copyPack.works.listMeta.en.description
  };
}

export default async function WorksPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;
  const works = await getWorks();
  const hasAuto =
    resolvedLocale === 'en' &&
    works.some((work) => {
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
      return title.isAutoTranslated || summary.isAutoTranslated;
    });

  return (
    <section className="bg-slate-50">
      <Container className="py-16 sm:py-20">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Works
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-ink-900">
            {resolvedLocale === 'jp'
              ? copyPack.works.listMeta.ja.title
              : copyPack.works.listMeta.en.title}
          </h1>
          {hasAuto ? (
            <div className="mt-2">
              <AutoTranslatedBadge />
            </div>
          ) : null}
          <p className="mt-3 max-w-prose text-sm leading-6 text-slate-600">
            {resolvedLocale === 'jp'
              ? copyPack.works.listMeta.ja.description
              : copyPack.works.listMeta.en.description}
          </p>
          <div className="mt-4">
            <FieldNote
              variant="proof"
              body={
                resolvedLocale === 'jp'
                  ? copyPack.home.worksTeaser.micro.ja
                  : copyPack.home.worksTeaser.micro.en
              }
            />
          </div>
        </div>

        <WorksExplorer works={works} locale={resolvedLocale} />
      </Container>
    </section>
  );
}
