'use client';

import type { Settings } from '@/lib/microcms';
import { pickByLocale, type Locale } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';
import { copyPack } from '@/lib/copy-pack';

export default function FixedCTA({
  settings,
  locale
}: {
  settings: Settings;
  locale: Locale;
}) {
  const labels = {
    x: pickByLocale(locale, copyPack.global.cta.x.label),
    telegram: pickByLocale(locale, copyPack.global.cta.telegram.label)
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      <a
        href={settings.x_profile_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full bg-ink-900 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-ink-700"
        onClick={() => trackEvent('cta_x_click', { locale })}
      >
        {labels.x}
      </a>
      <a
        href={settings.telegram_url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center rounded-full bg-accent-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-lg transition hover:bg-accent-500"
        onClick={() => trackEvent('cta_telegram_click', { locale })}
      >
        {labels.telegram}
      </a>
    </div>
  );
}
