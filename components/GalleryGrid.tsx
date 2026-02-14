'use client';

import { useMemo } from 'react';
import type { GalleryItem } from '@/lib/microcms';
import type { Locale } from '@/lib/i18n';
import { pickLocalizedText } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';
import ImageWithFallback from '@/components/ImageWithFallback';

export default function GalleryGrid({
  items,
  locale
}: {
  items: GalleryItem[];
  locale: Locale;
}) {
  const galleryItems = useMemo(() => items.slice(0, 12), [items]);

  return (
    <div className="mt-8 grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {galleryItems.map((item, index) => {
        const caption = pickLocalizedText({
          locale,
          ja: item.caption_ja,
          en: item.caption_en
        });
        const tag = item.tag || 'Field';
        const number = `#${String(index + 1).padStart(2, '0')}`;
        const alt = caption.text.trim().length > 0 ? caption.text : `Gallery ${number}`;
        const content = (
          <div className="group relative aspect-square overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
            <ImageWithFallback
              src={item.image?.url}
              alt={alt}
              fallbackLabel={number}
              fallbackSubLabel={tag}
              imageClassName="transition duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-1 text-[10px] font-semibold text-ink-900">
              {number}
            </span>
            <div className="absolute inset-0 bg-ink-900/40 opacity-0 transition group-hover:opacity-100" />
            <div className="absolute bottom-2 left-2 right-2 space-y-1 opacity-0 transition group-hover:opacity-100">
              <span className="inline-flex items-center rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-ink-900">
                {tag}
              </span>
              <p className="text-xs text-white">{caption.text}</p>
            </div>
          </div>
        );

        if (item.href) {
          const href = item.href.replace('/jp', `/${locale}`);
          return (
            <a
              key={`${item.caption_ja}-${index}`}
              href={href}
              onClick={() =>
                trackEvent('gallery_tile_click', {
                  index: index + 1,
                  tag,
                  href,
                  locale
                })
              }
            >
              {content}
            </a>
          );
        }

        return (
          <div key={`${item.caption_ja}-${index}`} className="cursor-default">
            {content}
          </div>
        );
      })}
    </div>
  );
}
