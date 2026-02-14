'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Settings } from '@/lib/microcms';
import { Locale, localeLabels, otherLocale, pickByLocale, withLocale } from '@/lib/i18n';
import { trackEvent } from '@/lib/analytics';
import { copyPack } from '@/lib/copy-pack';

export default function SiteHeader({
  locale,
  settings
}: {
  locale: Locale;
  settings: Settings;
}) {
  const pathname = usePathname() || `/${locale}`;
  const nextLocale = otherLocale(locale);
  const switchPath = withLocale(pathname, nextLocale);

  const nav = copyPack.navigation.items.map((item) => ({
    href: withLocale(item.href, locale),
    label: pickByLocale(locale, item.label)
  }));

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="text-sm font-semibold text-ink-900">
          {pickByLocale(locale, copyPack.navigation.siteName)}
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-slate-600 md:flex">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink-900">
              {item.label}
            </Link>
          ))}
          <a
            href={settings.youtube_url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600 hover:text-ink-900"
          >
            {pickByLocale(locale, copyPack.navigation.youtubeCta.label)}
          </a>
        </nav>

        <Link
          href={switchPath}
          className="rounded-full border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-700 hover:text-ink-900"
          onClick={() => trackEvent('lang_switch', { to: nextLocale })}
        >
          {localeLabels[nextLocale]}
        </Link>
      </div>
    </header>
  );
}
