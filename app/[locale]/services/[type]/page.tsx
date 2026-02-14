import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Container from '@/components/Container';
import AutoTranslatedBadge from '@/components/AutoTranslatedBadge';
import { Locale, isLocale, locales, pickLocalizedText } from '@/lib/i18n';
import { buildAlternates } from '@/lib/seo';
import { getServiceByType, ServiceType } from '@/lib/microcms';
import { sanitizeRichText } from '@/lib/sanitize';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { copyPack } from '@/lib/copy-pack';
import FieldNote from '@/components/FieldNote';

const serviceTypes: ServiceType[] = ['mc', 'community', 'content'];

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    serviceTypes.map((type) => ({ locale, type }))
  );
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string; type: string }>;
}): Promise<Metadata> {
  const { locale, type } = await params;
  if (!isLocale(locale)) notFound();
  if (!serviceTypes.includes(type as ServiceType)) notFound();

  const resolvedLocale = locale as Locale;
  const service = await getServiceByType(type as ServiceType);

  if (!service) return {};

  const pack = copyPack.servicesPages[type as 'mc' | 'community' | 'content'];
  const displayTitle =
    resolvedLocale === 'jp' ? pack.hero.title.ja : pack.hero.title.en;

  const defaultMetaTitleJa = pack.meta.ja.title;
  const defaultMetaDescJa = pack.meta.ja.description;
  const defaultMetaTitleEn = pack.meta.en.title;
  const defaultMetaDescEn = pack.meta.en.description;

  const title = pickLocalizedText({
    locale: resolvedLocale,
    ja: service.meta_title_ja || defaultMetaTitleJa,
    en: service.meta_title_en || defaultMetaTitleEn
  }).text;

  const description = pickLocalizedText({
    locale: resolvedLocale,
    ja: service.meta_desc_ja || defaultMetaDescJa,
    en: service.meta_desc_en || defaultMetaDescEn
  }).text;

  return {
    title,
    description,
    alternates: buildAlternates(
      resolvedLocale,
      `/${resolvedLocale}/services/${service.type}`
    )
  };
}

export default async function ServicePage({
  params
}: {
  params: Promise<{ locale: string; type: string }>;
}) {
  const { locale, type } = await params;
  if (!isLocale(locale)) notFound();
  if (!serviceTypes.includes(type as ServiceType)) notFound();

  const resolvedLocale = locale as Locale;
  const resolvedType = type as ServiceType;
  const service = await getServiceByType(resolvedType);

  if (!service) notFound();

  const mcPack = copyPack.servicesPages.mc;
  const communityPack = copyPack.servicesPages.community;
  const contentPack = copyPack.servicesPages.content;
  const pack =
    resolvedType === 'mc'
      ? mcPack
      : resolvedType === 'community'
        ? communityPack
        : contentPack;
  const title = pickLocalizedText({
    locale: resolvedLocale,
    ja: pack.hero.title.ja,
    en: pack.hero.title.en
  });

  const leadCopy =
    resolvedLocale === 'jp' ? pack.hero.lead.ja : pack.hero.lead.en;

  const noteCopy =
    resolvedLocale === 'jp' ? pack.hero.note.ja : pack.hero.note.en;

  const body = pickLocalizedText({
    locale: resolvedLocale,
    ja: service.body_ja,
    en: service.body_en
  });

  const bodyText = body.text.trim();
  const rawHtml = bodyText.length
    ? bodyText.includes('<')
      ? bodyText
      : bodyText.replace(/\n/g, '<br />')
    : '';
  const bodyHtml = rawHtml.length ? sanitizeRichText(rawHtml) : '';

  const tabs = copyPack.home.services.cards.map((card) => ({
    type: card.type as ServiceType,
    label: resolvedLocale === 'jp' ? card.title.ja : card.title.en
  }));

  return (
    <section className="bg-white">
      <Container className="py-16 sm:py-20">
        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold uppercase tracking-wide text-slate-600">
            {resolvedLocale === 'jp'
              ? pack.hero.kicker.ja
              : pack.hero.kicker.en}
          </span>
          {resolvedLocale === 'en' && body.isAutoTranslated && (
            <AutoTranslatedBadge />
          )}
        </div>
        <h1 className="mt-4 text-3xl font-semibold text-ink-900">{title.text}</h1>
        <p className="mt-3 whitespace-pre-line text-sm text-slate-600">{leadCopy}</p>
        <div className="mt-4">
          <FieldNote body={noteCopy} />
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <Link
              key={tab.type}
              href={`/${resolvedLocale}/services/${tab.type}`}
              className={cn(
                'rounded-full border px-4 py-2 text-xs font-semibold transition',
                tab.type === resolvedType
                  ? 'border-ink-900 bg-ink-900 text-white'
                  : 'border-slate-200 text-slate-600 hover:text-ink-900'
              )}
            >
              {tab.label}
            </Link>
          ))}
        </div>
        {resolvedType === 'mc' ? (
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <div className="rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {resolvedLocale === 'jp'
                  ? mcPack.whatYouGet.title.ja
                  : mcPack.whatYouGet.title.en}
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-600">
                {(resolvedLocale === 'jp'
                  ? mcPack.whatYouGet.items.ja
                  : mcPack.whatYouGet.items.en
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                {resolvedLocale === 'jp'
                  ? mcPack.deliverables.title.ja
                  : mcPack.deliverables.title.en}
              </p>
              <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-600">
                {(resolvedLocale === 'jp'
                  ? mcPack.deliverables.items.ja
                  : mcPack.deliverables.items.en
                ).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-slate-100 bg-white px-4 py-4 shadow-sm">
            <ul className="mt-3 list-disc space-y-2 pl-4 text-sm text-slate-600">
              {(resolvedLocale === 'jp'
                ? resolvedType === 'community'
                  ? communityPack.items.ja
                  : contentPack.items.ja
                : resolvedType === 'community'
                  ? communityPack.items.en
                  : contentPack.items.en
              ).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        )}
        {bodyHtml ? (
          <div
            className="prose mt-8 max-w-none text-slate-700"
            dangerouslySetInnerHTML={{ __html: bodyHtml }}
          />
        ) : null}
          {service.pricing_enabled && service.pricing_items?.length ? (
          <div className="mt-10 rounded-3xl border border-slate-100 bg-slate-50 p-6">
            <h2 className="text-lg font-semibold text-ink-900">
              {resolvedLocale === 'jp'
                ? service.pricing_title_ja || mcPack.pricing.title.ja
                : service.pricing_title_en || mcPack.pricing.title.en}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {service.pricing_items.map((item, index) => (
                <div
                  key={`${item.label_ja}-${index}`}
                  className="rounded-2xl border border-slate-200 bg-white px-4 py-3"
                >
                  <p className="text-sm font-semibold text-ink-900">
                    {resolvedLocale === 'jp'
                      ? item.label_ja
                      : item.label_en || item.label_ja}
                  </p>
                  <p className="mt-1 text-lg font-semibold text-ink-900">
                    {resolvedLocale === 'jp'
                      ? item.value_ja
                      : item.value_en || item.value_ja}
                  </p>
                  {(resolvedLocale === 'jp'
                    ? item.note_ja
                    : item.note_en || item.note_ja) ? (
                    <p className="mt-1 text-xs text-slate-500">
                      {resolvedLocale === 'jp'
                        ? item.note_ja
                        : item.note_en || item.note_ja}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
            {(resolvedLocale === 'jp'
              ? service.pricing_disclaimer_ja || mcPack.pricing.disclaimer.ja
              : service.pricing_disclaimer_en ||
                service.pricing_disclaimer_ja ||
                mcPack.pricing.disclaimer.en) ? (
              <p className="mt-4 text-xs text-slate-500">
                {resolvedLocale === 'jp'
                  ? service.pricing_disclaimer_ja || mcPack.pricing.disclaimer.ja
                  : service.pricing_disclaimer_en ||
                    service.pricing_disclaimer_ja ||
                    mcPack.pricing.disclaimer.en}
              </p>
            ) : null}
          </div>
        ) : null}
        <div className="mt-8">
          <FieldNote
            variant="tip"
            body={
              resolvedLocale === 'jp'
                ? resolvedType === 'mc'
                  ? mcPack.cta.text.ja
                  : resolvedType === 'community'
                    ? communityPack.cta.ja
                    : contentPack.cta.ja
                : resolvedType === 'mc'
                  ? mcPack.cta.text.en
                  : resolvedType === 'community'
                    ? communityPack.cta.en
                    : contentPack.cta.en
            }
          />
        </div>
      </Container>
    </section>
  );
}
