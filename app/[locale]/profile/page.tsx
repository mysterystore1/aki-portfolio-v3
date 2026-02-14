import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import TagChip from '@/components/TagChip';
import AutoTranslatedBadge from '@/components/AutoTranslatedBadge';
import ImageWithFallback from '@/components/ImageWithFallback';
import FieldNote from '@/components/FieldNote';
import { Locale, isLocale, pickLocalizedText } from '@/lib/i18n';
import { buildAlternates } from '@/lib/seo';
import { getProfile } from '@/lib/microcms';
import { copyPack } from '@/lib/copy-pack';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;
  const profile = await getProfile();
  const defaultMetaTitleJa = copyPack.profile.meta.ja.title;
  const defaultMetaDescJa = copyPack.profile.meta.ja.description;
  const defaultMetaTitleEn = copyPack.profile.meta.en.title;
  const defaultMetaDescEn = copyPack.profile.meta.en.description;

  const title = pickLocalizedText({
    locale: resolvedLocale,
    ja: profile.meta_title_ja || defaultMetaTitleJa,
    en: profile.meta_title_en || profile.title_en || defaultMetaTitleEn
  }).text;

  const description = pickLocalizedText({
    locale: resolvedLocale,
    ja: profile.meta_desc_ja || defaultMetaDescJa,
    en: profile.meta_desc_en || profile.bio_en || defaultMetaDescEn
  }).text;

  return {
    title,
    description,
    alternates: buildAlternates(resolvedLocale, `/${resolvedLocale}/profile`)
  };
}

export default async function ProfilePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;
  const profile = await getProfile();

  const title = pickLocalizedText({
    locale: resolvedLocale,
    ja: profile.title_ja,
    en: profile.title_en
  });

  const bio = pickLocalizedText({
    locale: resolvedLocale,
    ja: profile.bio_ja,
    en: profile.bio_en
  });

  const strengths =
    resolvedLocale === 'jp'
      ? profile.strengths_ja
      : profile.strengths_en?.length
        ? profile.strengths_en
        : profile.strengths_ja;

  const activities =
    resolvedLocale === 'jp'
      ? profile.activities_ja
      : profile.activities_en?.length
        ? profile.activities_en
        : profile.activities_ja;

  const hasAuto =
    resolvedLocale === 'en' &&
    (title.isAutoTranslated ||
      bio.isAutoTranslated ||
      !profile.strengths_en?.length ||
      !profile.activities_en?.length);

  return (
    <section className="bg-white">
      <Container className="py-16 sm:py-20">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold uppercase tracking-wide text-slate-600">
            {resolvedLocale === 'jp'
              ? copyPack.navigation.items.find((item) => item.key === 'profile')
                  ?.label.ja
              : copyPack.navigation.items.find((item) => item.key === 'profile')
                  ?.label.en}
          </span>
          {hasAuto && <AutoTranslatedBadge />}
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-ink-900">{title.text}</h1>
        <p className="mt-3 max-w-prose whitespace-pre-line text-base leading-7 text-slate-700">
          {bio.text}
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <div className="space-y-8">
            {strengths?.length ? (
              <div>
                <h2 className="text-lg font-semibold text-ink-900">
                  {resolvedLocale === 'jp' ? '強み' : 'Strengths'}
                </h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {strengths.map((item, index) => (
                    <TagChip key={`${item}-${index}`} label={item} />
                  ))}
                </div>
              </div>
            ) : null}

            {activities?.length ? (
              <div>
                <h2 className="text-lg font-semibold text-ink-900">
                  {resolvedLocale === 'jp' ? '主な活動' : 'Key Activities'}
                </h2>
                <div className="mt-4 space-y-3 text-sm text-slate-600">
                  {activities.map((item, index) => (
                    <div
                      key={`${item}-${index}`}
                      className="rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {(profile.photos || []).length ? (
                (profile.photos || []).map((photo, index) => (
                  <div
                    key={`${photo.url}-${index}`}
                    className="relative mx-auto aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-3xl bg-slate-100 sm:max-w-[300px]"
                  >
                    <ImageWithFallback
                      src={photo.url}
                      alt={`${title.text} ${index + 1}`}
                      fallbackLabel="Aki"
                      sizes="(max-width: 768px) 70vw, 320px"
                    />
                  </div>
                ))
              ) : (
                <div className="relative mx-auto aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-3xl bg-slate-100 sm:max-w-[300px]">
                  <ImageWithFallback
                    alt="Aki"
                    fallbackLabel="Aki"
                    sizes="(max-width: 768px) 70vw, 320px"
                  />
                </div>
              )}
            </div>

            <div className="rounded-2xl border border-slate-100 bg-white p-4 text-sm text-slate-600 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {resolvedLocale === 'jp' ? 'Quick Facts' : 'Quick Facts'}
              </p>
              <div className="mt-3 grid gap-2">
                {(resolvedLocale === 'jp'
                  ? copyPack.profile.quickFacts.ja
                  : copyPack.profile.quickFacts.en
                ).map((fact) => (
                  <div key={fact.k} className="flex items-center justify-between">
                    <span>{fact.k}</span>
                    <span className="font-semibold text-ink-900">{fact.v}</span>
                  </div>
                ))}
              </div>
            </div>
            <FieldNote
              variant="tip"
              body={
                resolvedLocale === 'jp'
                  ? copyPack.home.highlights.note.ja
                  : copyPack.home.highlights.note.en
              }
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
