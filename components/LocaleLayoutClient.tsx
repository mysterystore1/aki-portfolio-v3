'use client';

import { usePathname } from 'next/navigation';
import type { Settings } from '@/lib/microcms';
import type { Locale } from '@/lib/i18n';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import FixedCTA from '@/components/FixedCTA';
import ContactPanel from '@/components/ContactPanel';

export default function LocaleLayoutClient({
  children,
  locale,
  settings
}: {
  children: React.ReactNode;
  locale: Locale;
  settings: Settings;
}) {
  const pathname = usePathname() ?? '';
  const isLanding = pathname.includes('/landing');

  if (isLanding) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-white">
      <SiteHeader locale={locale} settings={settings} />
      <main className="pb-28 sm:pb-32">{children}</main>
      <ContactPanel locale={locale} settings={settings} />
      <SiteFooter settings={settings} locale={locale} />
      <FixedCTA settings={settings} locale={locale} />
    </div>
  );
}
