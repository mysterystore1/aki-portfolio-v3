import Link from 'next/link';
import type { Locale } from '@/lib/i18n';
import type { Work } from '@/lib/microcms';
import { pickLocalizedText } from '@/lib/i18n';
import TagChip from '@/components/TagChip';
import AutoTranslatedBadge from '@/components/AutoTranslatedBadge';
import ImageWithFallback from '@/components/ImageWithFallback';
import ProofLinks from '@/components/ProofLinks';

export default function WorkCard({
  work,
  locale,
  showProof = false
}: {
  work: Work;
  locale: Locale;
  showProof?: boolean;
}) {
  const title = pickLocalizedText({
    locale,
    ja: work.title_ja,
    en: work.title_en,
    enReviewed: work.en_reviewed
  });

  const summary = pickLocalizedText({
    locale,
    ja: work.summary_ja,
    en: work.summary_en,
    enReviewed: work.en_reviewed
  });
  const showAuto = title.isAutoTranslated || summary.isAutoTranslated;
  const topMetric = work.metrics?.[0];
  const motif = work.role_tags?.[0] || 'default';
  const motifClass =
    motif === 'Community'
      ? 'bg-emerald-200/60'
      : motif === 'BD'
        ? 'bg-amber-200/70'
        : motif === 'Content'
          ? 'bg-indigo-200/70'
          : motif === 'Event'
            ? 'bg-rose-200/70'
            : 'bg-slate-200/70';

  return (
    <Link
      href={`/${locale}/works/${work.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-100">
        <ImageWithFallback
          src={work.cover_image?.url}
          alt={title.text}
          fallbackLabel="Aki"
          imageClassName="transition duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div
          className={`absolute bottom-3 left-3 h-2 w-12 rounded-full ${motifClass}`}
        />
        {topMetric ? (
          <div className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-ink-900 shadow-sm">
            {topMetric.label}: {topMetric.value}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-3 px-5 py-4">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          {work.date_range && <span>{work.date_range}</span>}
          {locale === 'en' && showAuto && <AutoTranslatedBadge />}
        </div>
        <h3 className="text-lg font-semibold text-ink-900">{title.text}</h3>
        <p className="text-sm text-slate-600">{summary.text}</p>
        {showProof && work.proof_links?.length ? (
          <ProofLinks links={work.proof_links.slice(0, 3)} />
        ) : null}
        <div className="mt-auto flex flex-wrap gap-2 pt-2">
          {work.role_tags?.map((tag) => (
            <TagChip key={tag} label={tag} />
          ))}
        </div>
      </div>
    </Link>
  );
}
