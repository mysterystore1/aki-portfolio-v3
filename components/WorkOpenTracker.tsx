'use client';

import { useEffect } from 'react';
import { trackEvent } from '@/lib/analytics';
import type { Locale } from '@/lib/i18n';

export default function WorkOpenTracker({
  slug,
  locale
}: {
  slug: string;
  locale: Locale;
}) {
  useEffect(() => {
    trackEvent('work_open', { slug, locale });
  }, [slug, locale]);

  return null;
}
