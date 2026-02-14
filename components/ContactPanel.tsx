import type { Settings } from '@/lib/microcms';
import { pickByLocale, type Locale } from '@/lib/i18n';
import { copyPack } from '@/lib/copy-pack';
import DmTemplateBox from '@/components/DmTemplateBox';

export default function ContactPanel({
  locale,
  settings
}: {
  locale: Locale;
  settings: Settings;
}) {
  const labels = {
    x: pickByLocale(locale, copyPack.global.cta.x.label),
    telegram: pickByLocale(locale, copyPack.global.cta.telegram.label)
  };
  const template = pickByLocale(locale, {
    ja: settings.dm_template_ja || copyPack.global.dmTemplate.ja,
    en: settings.dm_template_en || copyPack.global.dmTemplate.en
  });
  const ctaTitle = pickByLocale(locale, copyPack.servicesPages.mc.cta.title);
  const ctaText = pickByLocale(locale, copyPack.servicesPages.mc.cta.text);

  return (
    <section className="border-t border-slate-100 bg-slate-50">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 lg:px-8">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {ctaTitle}
          </p>
          <p className="mt-2 max-w-prose text-sm leading-6 text-slate-600">
            {ctaText}
          </p>
        </div>

        <DmTemplateBox template={template} locale={locale} context="contact_panel" />

        <div className="flex flex-wrap gap-3">
          <a
            href={settings.x_profile_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full bg-ink-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-ink-700"
          >
            {labels.x}
          </a>
          <a
            href={settings.telegram_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-full border border-slate-200 px-6 py-3 text-sm font-semibold text-ink-900 transition hover:border-ink-900"
          >
            {labels.telegram}
          </a>
        </div>
      </div>
    </section>
  );
}
