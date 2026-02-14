'use client';

import { useMemo, useState } from 'react';
import type { Locale } from '@/lib/i18n';
import type { Work } from '@/lib/microcms';
import { pickLocalizedText } from '@/lib/i18n';
import WorkCard from '@/components/WorkCard';
import TagChip from '@/components/TagChip';

const tagOrder = [
  'AMA/MC',
  'Community',
  'BD',
  'Content',
  'Event',
  'Interpretation'
];

export default function WorksExplorer({
  works,
  locale
}: {
  works: Work[];
  locale: Locale;
}) {
  const [activeTag, setActiveTag] = useState<string>('All');
  const [query, setQuery] = useState('');

  const tags = useMemo(() => {
    const set = new Set<string>();
    works.forEach((work) => work.role_tags?.forEach((tag) => set.add(tag)));
    const ordered = tagOrder.filter((tag) => set.has(tag));
    return ['All', ...ordered];
  }, [works]);

  const filtered = useMemo(() => {
    const lower = query.trim().toLowerCase();
    return works.filter((work) => {
      const title = pickLocalizedText({
        locale,
        ja: work.title_ja,
        en: work.title_en,
        enReviewed: work.en_reviewed
      }).text;
      const summary = pickLocalizedText({
        locale,
        ja: work.summary_ja,
        en: work.summary_en,
        enReviewed: work.en_reviewed
      }).text;
      const textMatch =
        lower.length === 0 ||
        title.toLowerCase().includes(lower) ||
        summary.toLowerCase().includes(lower);
      const tagMatch =
        activeTag === 'All' || work.role_tags?.includes(activeTag);
      return textMatch && tagMatch;
    });
  }, [works, locale, query, activeTag]);

  return (
    <div className="mt-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setActiveTag(tag)}
              className={
                tag === activeTag
                  ? 'rounded-full border border-ink-900 bg-ink-900 px-3 py-1 text-xs font-semibold text-white'
                  : 'rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 hover:text-ink-900'
              }
            >
              {tag}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 text-sm text-slate-600">
          <span className="text-xs uppercase tracking-wide text-slate-400">
            Search
          </span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={locale === 'jp' ? 'タイトル/概要で検索' : 'Search title/summary'}
            className="w-52 bg-transparent text-sm text-ink-900 outline-none placeholder:text-slate-400"
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-500">
        <span>
          {locale === 'jp' ? '表示件数' : 'Results'}: {filtered.length}
        </span>
        {activeTag !== 'All' ? <TagChip label={activeTag} /> : null}
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((work) => (
          <WorkCard key={work.id} work={work} locale={locale} showProof />
        ))}
      </div>
    </div>
  );
}
