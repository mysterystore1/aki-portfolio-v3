import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import AutoTranslatedBadge from '@/components/AutoTranslatedBadge';
import WorkCard from '@/components/WorkCard';
import JsonLd from '@/components/JsonLd';
import { buildAlternates, getBaseUrl } from '@/lib/seo';
import { Locale, isLocale, pickLocalizedText } from '@/lib/i18n';
import { getSettings, getWorks } from '@/lib/microcms';
import { copyPack } from '@/lib/copy-pack';
import FieldNote from '@/components/FieldNote';
import GalleryGrid from '@/components/GalleryGrid';
import ImageWithFallback from '@/components/ImageWithFallback';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;
  const settings = await getSettings();
  const title =
    resolvedLocale === 'jp'
      ? settings.home_meta_title_ja || copyPack.home.meta.ja.title
      : settings.home_meta_title_en || copyPack.home.meta.en.title;
  const description =
    resolvedLocale === 'jp'
      ? settings.home_meta_desc_ja || copyPack.home.meta.ja.description
      : settings.home_meta_desc_en || copyPack.home.meta.en.description;

  return {
    title,
    alternates: buildAlternates(resolvedLocale, `/${resolvedLocale}`),
    openGraph: {
      title,
      description,
      url: `/${resolvedLocale}`,
      type: 'profile'
    },
    twitter: {
      card: 'summary_large_image',
      title
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

  const [settings, works] = await Promise.all([getSettings(), getWorks()]);

  const heroCopy = pickLocalizedText({
    locale: resolvedLocale,
    ja:
      settings.hero_copy_ja ||
      settings.hero_sub_ja ||
      copyPack.home.hero.sub.ja,
    en:
      settings.hero_copy_en ||
      settings.hero_sub_en ||
      copyPack.home.hero.sub.en
  });
  const heroHeading = pickLocalizedText({
    locale: resolvedLocale,
    ja: settings.hero_heading_ja || copyPack.home.hero.heading.ja,
    en: settings.hero_heading_en || copyPack.home.hero.heading.en
  });
  const heroSub = pickLocalizedText({
    locale: resolvedLocale,
    ja: settings.hero_sub_ja || heroCopy.text,
    en: settings.hero_sub_en || heroCopy.text
  });
  const heroAuto = heroHeading.isAutoTranslated || heroSub.isAutoTranslated;
  const highlights =
    resolvedLocale === 'jp' ? settings.highlights_ja : settings.highlights_en;
  const galleryItems = settings.gallery_items || [];
  const localGalleryImages = Array.from({ length: 12 }, (_, index) => ({
    url: `/images/gallery/${String(index + 1).padStart(2, '0')}.png`,
    width: 1000,
    height: 1000
  }));
  const fallbackGalleryItems = copyPack.gallery.items.map((item, index) => ({
    ...item,
    image: localGalleryImages[index]
  }));
  const cmsGalleryItems = galleryItems.map((item, index) => ({
    ...item,
    image: item.image ?? localGalleryImages[index % localGalleryImages.length]
  }));
  const useCmsGallery = settings.gallery_enabled && galleryItems.length > 0;
  const resolvedGalleryItems = useCmsGallery ? cmsGalleryItems : fallbackGalleryItems;
  const galleryTitle = pickLocalizedText({
    locale: resolvedLocale,
    ja: settings.gallery_title_ja || copyPack.gallery.title.ja,
    en: settings.gallery_title_en || copyPack.gallery.title.en
  });
  const galleryNote = pickLocalizedText({
    locale: resolvedLocale,
    ja: settings.gallery_note_ja || copyPack.gallery.note.ja,
    en: settings.gallery_note_en || copyPack.gallery.note.en
  });
  const galleryAuto =
    resolvedLocale === 'en' &&
    resolvedGalleryItems.some((item) =>
      pickLocalizedText({
        locale: resolvedLocale,
        ja: item.caption_ja,
        en: item.caption_en
      }).isAutoTranslated
    );

  const serviceCards = copyPack.home.services.cards;
  const youtubeVideos = [
    {
      id: '6CbgC2CDAck',
      url: 'https://youtu.be/6CbgC2CDAck?si=ieZOV8Katbql-wRF'
    },
    {
      id: '4_p61Hj6T5Q',
      url: 'https://youtu.be/4_p61Hj6T5Q?si=OVfmlGPI1h4gesN7'
    },
    {
      id: '2miN2k9jGzY',
      url: 'https://youtu.be/2miN2k9jGzY?si=E6_4Vcs_H9ExR0ea'
    }
  ];

  const baseUrl = getBaseUrl();
  const profileSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        name: 'Aki',
        url: `${baseUrl}/${resolvedLocale}`,
        sameAs: [
          settings.x_profile_url,
          settings.telegram_url,
          settings.youtube_url
        ],
        jobTitle: 'Web3 KOL / MC / Community / BD / Contents',
        knowsAbout: [
          'Web3',
          'KOL',
          'AMA',
          'Community',
          'DeFi',
          'NFT'
        ]
      },
      {
        '@type': 'ProfilePage',
        name:
          resolvedLocale === 'jp'
            ? 'Aki Web3 ポートフォリオ'
            : 'Aki Web3 Portfolio',
        mainEntity: {
          '@type': 'Person',
          name: 'Aki'
        },
        inLanguage: resolvedLocale === 'jp' ? 'ja' : 'en'
      }
    ]
  };

  return (
    <>
      <JsonLd id="profile-jsonld" data={profileSchema} />
      <section className="relative overflow-hidden bg-grid">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-85 blur-[0.25px] saturate-110"
            style={{ backgroundImage: "url('/images/hero-bg.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/10 via-transparent to-transparent" />
        </div>
        <Container className="relative z-10 py-16 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="flex flex-col gap-6">
              <div className="rounded-3xl border border-white/30 bg-white/40 px-6 py-6 shadow-[0_16px_40px_rgba(15,23,42,0.16)] backdrop-blur-sm sm:px-8 sm:py-8">
                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="rounded-full bg-ink-900 px-3 py-1 font-semibold uppercase tracking-wide text-white">
                    {resolvedLocale === 'jp'
                      ? copyPack.home.hero.badge.ja
                      : copyPack.home.hero.badge.en}
                  </span>
                  {resolvedLocale === 'en' && heroAuto && <AutoTranslatedBadge />}
                </div>
                <h1 className="mt-4 whitespace-pre-line text-3xl font-semibold leading-tight text-ink-900 sm:text-4xl">
                  {heroHeading.text}
                </h1>
                <p className="mt-4 whitespace-pre-line text-base leading-7 text-slate-700 sm:text-lg">
                  {heroSub.text}
                </p>
                <p className="mt-3 text-xs text-slate-500">
                  {resolvedLocale === 'jp'
                    ? copyPack.home.hero.micro.ja
                    : copyPack.home.hero.micro.en}
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link
                    href={`/${resolvedLocale}/works`}
                    className="rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink-700"
                  >
                    {resolvedLocale === 'jp'
                      ? copyPack.home.hero.primaryCta.ja
                      : copyPack.home.hero.primaryCta.en}
                  </Link>
                  <Link
                    href={`/${resolvedLocale}/services/mc`}
                    className="rounded-full border border-slate-200 bg-white/80 px-6 py-3 text-sm font-semibold text-ink-900 transition hover:border-ink-900"
                  >
                    {resolvedLocale === 'jp'
                      ? copyPack.home.hero.secondaryCta.ja
                      : copyPack.home.hero.secondaryCta.en}
                  </Link>
                </div>
              </div>
            </div>
            <div className="relative mx-auto aspect-[4/5] w-full max-w-[280px] overflow-hidden rounded-3xl shadow-[0_20px_60px_rgba(15,23,42,0.2)] motion-safe:transition motion-safe:hover:-translate-y-1 sm:max-w-[320px] lg:max-w-[340px]">
              <ImageWithFallback
                src="/images/hero-v2.png"
                alt={copyPack.home.hero.rightCard.name}
                fallbackLabel={copyPack.home.hero.rightCard.name}
                imageClassName="object-[center_top]"
                priority
                sizes="(max-width: 1024px) 90vw, 420px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-ink-900/10 to-transparent" />
              <div className="absolute bottom-5 left-5 text-white">
                <p className="text-xs uppercase tracking-[0.4em] text-white/70">
                  {resolvedLocale === 'jp'
                    ? copyPack.home.hero.rightCard.title.ja
                    : copyPack.home.hero.rightCard.title.en}
                </p>
                <p className="mt-2 text-3xl font-semibold">
                  {copyPack.home.hero.rightCard.name}
                </p>
                <p className="mt-2 text-xs text-white/80">
                  {resolvedLocale === 'jp'
                    ? copyPack.home.hero.rightCard.subtitle.ja
                    : copyPack.home.hero.rightCard.subtitle.en}
                </p>
              </div>
            </div>
          </div>
          {highlights?.length ? (
            <div className="mt-10 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {highlights.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm font-semibold text-slate-600 shadow-sm"
                  >
                    {item}
                  </div>
                ))}
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
          ) : null}
        </Container>
      </section>

      <section id="services" className="bg-white">
        <Container className="py-14 sm:py-20">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-ink-900">
                {resolvedLocale === 'jp'
                  ? copyPack.home.services.sectionTitle.ja
                  : copyPack.home.services.sectionTitle.en}
              </h2>
            </div>
            <Link
              href={`/${resolvedLocale}/services/mc`}
              className="text-xs font-semibold text-ink-900 underline-offset-4 hover:underline"
            >
              {resolvedLocale === 'jp'
                ? copyPack.home.hero.secondaryCta.ja
                : copyPack.home.hero.secondaryCta.en}
            </Link>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {serviceCards.map((card) => (
              <Link
                key={card.type}
                href={`/${resolvedLocale}/services/${card.type}`}
                className="group rounded-3xl border border-slate-100 bg-white p-6 shadow-card transition hover:-translate-y-1 hover:shadow-lg"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {resolvedLocale === 'jp' ? card.kicker.ja : card.kicker.en}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-ink-900">
                  {resolvedLocale === 'jp' ? card.title.ja : card.title.en}
                </h3>
                <p className="mt-3 whitespace-pre-line text-sm text-slate-600">
                  {resolvedLocale === 'jp' ? card.desc.ja : card.desc.en}
                </p>
                <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-500">
                  {resolvedLocale === 'jp' ? card.note.ja : card.note.en}
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-14 sm:py-20">
          <div className="rounded-3xl border border-slate-100 bg-slate-50/80 px-6 py-10 shadow-[0_20px_50px_rgba(15,23,42,0.08)] sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-ink-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    {resolvedLocale === 'jp' ? 'PROOF' : 'PROOF'}
                  </span>
                  <span className="text-xs text-slate-500">
                    {resolvedLocale === 'jp' ? '証拠付きケース' : 'Evidence-led cases'}
                  </span>
                </div>
                <h2 className="mt-3 text-3xl font-semibold text-ink-900">
                  {resolvedLocale === 'jp'
                    ? copyPack.home.worksTeaser.title.ja
                    : copyPack.home.worksTeaser.title.en}
                </h2>
                <p className="mt-2 max-w-prose text-sm text-slate-600">
                  {resolvedLocale === 'jp'
                    ? copyPack.home.worksTeaser.micro.ja
                    : copyPack.home.worksTeaser.micro.en}
                </p>
              </div>
              <Link
                href={`/${resolvedLocale}/works`}
                className="rounded-full bg-ink-900 px-5 py-2 text-xs font-semibold text-white transition hover:bg-ink-700"
              >
                {resolvedLocale === 'jp'
                  ? copyPack.home.hero.primaryCta.ja
                  : copyPack.home.hero.primaryCta.en}
              </Link>
            </div>

            <div className="mt-6">
              <FieldNote
                variant="proof"
                body={
                  resolvedLocale === 'jp'
                    ? copyPack.home.worksTeaser.micro.ja
                    : copyPack.home.worksTeaser.micro.en
                }
              />
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {works.slice(0, 3).map((work) => (
                <WorkCard key={work.id} work={work} locale={resolvedLocale} />
              ))}
            </div>
          </div>
        </Container>
      </section>

      {resolvedGalleryItems.length ? (
        <section className="bg-white">
          <Container className="py-14 sm:py-20">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-ink-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    Gallery
                  </span>
                  {galleryAuto ? <AutoTranslatedBadge /> : null}
                </div>
                <h2 className="mt-3 text-2xl font-semibold text-ink-900">
                  {galleryTitle.text}
                </h2>
              </div>
            </div>
            <div className="mt-4">
              <FieldNote variant="proof" body={galleryNote.text} />
            </div>
            <GalleryGrid items={resolvedGalleryItems} locale={resolvedLocale} />
          </Container>
        </section>
      ) : null}

      <section className="bg-white">
        <Container className="py-14 sm:py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-ink-900 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                  YouTube
                </span>
              </div>
              <h2 className="mt-3 text-2xl font-semibold text-ink-900">
                {resolvedLocale === 'jp'
                  ? copyPack.home.youtube.title.ja
                  : copyPack.home.youtube.title.en}
              </h2>
              <p className="mt-2 text-sm text-slate-600">
                {resolvedLocale === 'jp'
                  ? copyPack.home.youtube.lead.ja
                  : copyPack.home.youtube.lead.en}
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {youtubeVideos.map((video, index) => (
              <a
                key={video.id}
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-3xl border border-slate-100 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
                  <ImageWithFallback
                    src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
                    alt={`YouTube video ${index + 1}`}
                    fallbackLabel="YouTube"
                    imageClassName="object-cover transition duration-300 motion-safe:group-hover:scale-[1.03]"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
                  <span>
                    {resolvedLocale === 'jp' ? `動画 ${index + 1}` : `Video ${index + 1}`}
                  </span>
                  <span className="font-semibold text-ink-900">
                    {resolvedLocale === 'jp' ? '視聴する' : 'Watch'}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-14 sm:py-20">
          <div>
            <h2 className="text-2xl font-semibold text-ink-900">
              {resolvedLocale === 'jp'
                ? copyPack.home.process.title.ja
                : copyPack.home.process.title.en}
            </h2>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(resolvedLocale === 'jp'
              ? copyPack.home.process.steps.ja
              : copyPack.home.process.steps.en
            ).map((step, index) => (
              <div
                key={`${step}-${index}`}
                className="rounded-2xl border border-slate-100 bg-white px-4 py-3 text-sm text-slate-600 shadow-sm"
              >
                {step}
              </div>
            ))}
          </div>
          <div className="mt-6">
            <FieldNote
              body={
                resolvedLocale === 'jp'
                  ? copyPack.home.process.note.ja
                  : copyPack.home.process.note.en
              }
            />
          </div>
        </Container>
      </section>

      <section className="bg-slate-50">
        <Container className="py-14 sm:py-20">
          <div>
            <h2 className="text-2xl font-semibold text-ink-900">
              {resolvedLocale === 'jp'
                ? copyPack.home.faq.title.ja
                : copyPack.home.faq.title.en}
            </h2>
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {(resolvedLocale === 'jp'
              ? copyPack.home.faq.items.ja
              : copyPack.home.faq.items.en
            ).map((item) => (
              <div
                key={item.q}
                className="rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm"
              >
                <p className="text-sm font-semibold text-ink-900">{item.q}</p>
                <p className="mt-2 text-sm text-slate-600">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-14 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {resolvedLocale === 'jp'
                  ? copyPack.mediaKit.hero.kicker.ja
                  : copyPack.mediaKit.hero.kicker.en}
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-ink-900">
                {resolvedLocale === 'jp'
                  ? copyPack.mediaKit.hero.title.ja
                  : copyPack.mediaKit.hero.title.en}
              </h2>
              <p className="mt-3 max-w-prose whitespace-pre-line text-sm leading-6 text-slate-600">
                {resolvedLocale === 'jp'
                  ? copyPack.mediaKit.hero.lead.ja
                  : copyPack.mediaKit.hero.lead.en}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/${resolvedLocale}/media-kit`}
                  className="inline-flex items-center rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink-700"
                >
                  {resolvedLocale === 'jp'
                    ? copyPack.mediaKit.buttons.pdf.ja
                    : copyPack.mediaKit.buttons.pdf.en}
                </Link>
                <Link
                  href={`/${resolvedLocale}/media-kit`}
                  className="inline-flex items-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-ink-900 transition hover:border-ink-900"
                >
                  {resolvedLocale === 'jp'
                    ? copyPack.navigation.items.find((item) => item.key === 'mediaKit')
                        ?.label.ja
                    : copyPack.navigation.items.find((item) => item.key === 'mediaKit')
                        ?.label.en}
                </Link>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 shadow-sm">
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-slate-100">
                <ImageWithFallback
                  src="/images/media-kit.png"
                  alt="Media kit preview"
                  fallbackLabel="Media kit"
                  imageClassName="object-cover"
                />
              </div>
              <div className="mt-4">
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
          </div>
        </Container>
      </section>
    </>
  );
}
