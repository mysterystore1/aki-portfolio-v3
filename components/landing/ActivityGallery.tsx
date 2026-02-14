'use client';

import { useMemo, useState } from 'react';

type GalleryItem = {
  src: string;
  title: string;
  note?: string;
};

/** 画像読み込み失敗時に使う 4:3 ダミー画像URL（レイアウト崩れ防止） */
const DUMMY_IMAGE_BASE = 'https://picsum.photos/seed';

export default function ActivityGallery({ items }: { items: GalleryItem[] }) {
  const [failed, setFailed] = useState<Record<string, boolean>>({});
  const visibleItems = useMemo(() => items.slice(0, 12), [items]);

  return (
    <div className="gallery-grid reveal">
      {visibleItems.map((item, idx) => {
        const useDummy = failed[item.src];
        const imgSrc = useDummy ? `${DUMMY_IMAGE_BASE}/aki${String(idx + 1).padStart(2, '0')}/400/300` : item.src;
        return (
          <figure className="gallery-card" key={`${item.src}-${idx}`}>
            <div className="gallery-img-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imgSrc}
                alt={item.title}
                className="gallery-img"
                loading="lazy"
                onError={() => setFailed((prev) => ({ ...prev, [item.src]: true }))}
              />
            </div>
          </figure>
        );
      })}
    </div>
  );
}
