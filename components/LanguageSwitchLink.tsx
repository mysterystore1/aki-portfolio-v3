'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { trackEvent } from '@/lib/analytics';
import { Locale, localeLabels, otherLocale } from '@/lib/i18n';

const COOKIE_NAME = 'preferred_locale';
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

function toSwitchPath(pathname: string, targetLocale: Locale): string {
  const normalized = pathname.startsWith('/') ? pathname : `/${pathname}`;
  if (/^\/(jp|en)(\/|$)/.test(normalized)) {
    return normalized.replace(/^\/(jp|en)(?=\/|$)/, `/${targetLocale}`);
  }
  if (normalized === '/') return `/${targetLocale}`;
  return `/${targetLocale}${normalized}`;
}

type LabelMode = 'short' | 'long';

export default function LanguageSwitchLink({
  locale,
  className,
  labelMode = 'short',
  trackContext = 'global'
}: {
  locale: Locale;
  className?: string;
  labelMode?: LabelMode;
  trackContext?: string;
}) {
  const pathname = usePathname() || `/${locale}`;
  const [suffix, setSuffix] = useState('');

  const nextLocale = otherLocale(locale);
  const switchPath = toSwitchPath(pathname, nextLocale);

  useEffect(() => {
    const syncSuffix = () =>
      setSuffix(`${window.location.search || ''}${window.location.hash || ''}`);

    syncSuffix();
    window.addEventListener('hashchange', syncSuffix);
    window.addEventListener('popstate', syncSuffix);

    return () => {
      window.removeEventListener('hashchange', syncSuffix);
      window.removeEventListener('popstate', syncSuffix);
    };
  }, [pathname]);

  const href = `${switchPath}${suffix}`;

  const label =
    labelMode === 'long'
      ? nextLocale === 'jp'
        ? '日本語'
        : 'English'
      : localeLabels[nextLocale];

  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        document.cookie = `${COOKIE_NAME}=${nextLocale}; Max-Age=${ONE_YEAR_SECONDS}; Path=/; SameSite=Lax`;
        trackEvent('lang_switch', { to: nextLocale, context: trackContext });
      }}
    >
      {label}
    </Link>
  );
}