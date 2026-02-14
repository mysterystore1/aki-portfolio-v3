import type { Settings } from '@/lib/microcms';
import { pickByLocale, type Locale } from '@/lib/i18n';
import { copyPack } from '@/lib/copy-pack';

export default function SiteFooter({
  settings,
  locale
}: {
  settings: Settings;
  locale: Locale;
}) {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          {pickByLocale(locale, copyPack.global.footer)}
        </p>
        <a
          href={settings.youtube_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 font-semibold text-ink-900 hover:text-ink-700"
        >
          YouTube
          <span aria-hidden="true">↗</span>
        </a>
      </div>
    </footer>
  );
}
