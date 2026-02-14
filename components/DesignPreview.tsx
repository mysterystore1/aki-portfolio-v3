'use client';

import Link from 'next/link';
import type { ThemeId } from '@/lib/theme';
import { themeTokens } from '@/lib/theme';
import { copyPack } from '@/lib/copy-pack';
import type { Locale } from '@/lib/i18n';
import Container from '@/components/Container';

const themes: ThemeId[] = ['A', 'B', 'C'];

export default function DesignPreview({
  theme,
  locale
}: {
  theme: ThemeId;
  locale: Locale;
}) {
  const isJp = locale === 'jp';
  const t = (ja: string, en: string) => (isJp ? ja : en);

  return (
    <div data-theme={theme} className="design-preview min-h-screen">
      {/* テーマ切替（本番導線に出さない開発用） */}
      <div className="sticky top-0 z-50 border-b design-border bg-[var(--theme-card-bg)] px-4 py-3">
        <Container>
          <div className="flex flex-wrap items-center gap-2">
            <span className="design-muted text-xs font-semibold uppercase">
              {t('テーマ', 'Theme')}:
            </span>
            {themes.map((id) => (
              <Link
                key={id}
                href={`/${locale}/__design?theme=${id}`}
                className={`design-btn px-4 py-2 text-sm font-semibold transition ${
                  theme === id
                    ? 'design-accent-bg text-white'
                    : 'border design-border hover:opacity-90'
                }`}
              >
                {id} — {themeTokens[id].nameJa}
              </Link>
            ))}
            <Link
              href={`/${locale}`}
              className="design-muted ml-4 text-xs underline"
            >
              {t('本番Homeへ', 'Back to Home')}
            </Link>
          </div>
        </Container>
      </div>

      {/* Hero */}
      <section className="design-section design-bg-muted">
        <Container className="flex flex-col gap-6 lg:flex-row lg:items-center">
          <div className="flex-1">
            <div className="design-card border p-6 sm:p-8">
              <span className="rounded-full design-accent-bg px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                {copyPack.home.hero.badge.ja}
              </span>
              <h1 className="mt-4 whitespace-pre-line text-3xl font-semibold leading-tight sm:text-4xl">
                {copyPack.home.hero.heading.ja}
              </h1>
              <p className="mt-4 whitespace-pre-line text-base leading-7 design-muted sm:text-lg">
                {copyPack.home.hero.sub.ja}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/works`}
                  className="design-btn design-accent-bg px-6 py-3 text-sm font-semibold text-white"
                >
                  {copyPack.home.hero.primaryCta.ja}
                </Link>
                <Link
                  href={`/${locale}/services/mc`}
                  className="design-btn border design-border bg-[var(--theme-card-bg)] px-6 py-3 text-sm font-semibold"
                >
                  {copyPack.home.hero.secondaryCta.ja}
                </Link>
              </div>
            </div>
          </div>
          <div className="design-placeholder aspect-[4/5] w-full max-w-[280px] rounded-[var(--theme-radius-card)] lg:max-w-[320px]" />
        </Container>
      </section>

      {/* Highlights */}
      <section className="design-section">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            {copyPack.home.highlights.ja.slice(0, 4).map((item, i) => (
              <div key={i} className="design-card border px-4 py-3 text-sm font-semibold design-muted">
                {item}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Services */}
      <section id="services" className="design-section design-bg-muted">
        <Container>
          <h2 className="text-2xl font-semibold">
            {copyPack.home.services.sectionTitle.ja}
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {copyPack.home.services.cards.map((card) => (
              <Link
                key={card.type}
                href={`/${locale}/services/${card.type}`}
                className="design-card border p-6 transition hover:opacity-95"
              >
                <p className="text-xs font-semibold uppercase tracking-wide design-muted">
                  {isJp ? card.kicker.ja : card.kicker.en}
                </p>
                <h3 className="mt-3 text-lg font-semibold">
                  {isJp ? card.title.ja : card.title.en}
                </h3>
                <p className="mt-3 whitespace-pre-line text-sm design-muted">
                  {isJp ? card.desc.ja : card.desc.en}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Works */}
      <section className="design-section">
        <Container>
          <h2 className="text-2xl font-semibold">
            {copyPack.home.worksTeaser.title.ja}
          </h2>
          <p className="mt-2 text-sm design-muted">
            {copyPack.home.worksTeaser.micro.ja}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="design-card border p-4 design-placeholder aspect-[4/3] rounded-lg"
              />
            ))}
          </div>
          <Link
            href={`/${locale}/works`}
            className="design-btn design-accent-bg mt-4 inline-block px-5 py-2 text-sm font-semibold text-white"
          >
            {copyPack.home.hero.primaryCta.ja}
          </Link>
        </Container>
      </section>

      {/* Gallery */}
      <section className="design-section design-bg-muted">
        <Container>
          <h2 className="text-2xl font-semibold">
            {copyPack.gallery.title.ja}
          </h2>
          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="design-placeholder aspect-square rounded-lg"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* YouTube */}
      <section className="design-section">
        <Container>
          <h2 className="text-2xl font-semibold">
            {copyPack.home.youtube.title.ja}
          </h2>
          <p className="mt-2 text-sm design-muted">
            {copyPack.home.youtube.lead.ja}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="design-card border p-3 design-placeholder aspect-video rounded-xl"
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section className="design-section design-bg-muted">
        <Container>
          <h2 className="text-2xl font-semibold">
            {copyPack.home.process.title.ja}
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {copyPack.home.process.steps.ja.map((step, i) => (
              <div key={i} className="design-card border px-4 py-3 text-sm design-muted">
                {step}
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* FAQ */}
      <section className="design-section">
        <Container>
          <h2 className="text-2xl font-semibold">
            {copyPack.home.faq.title.ja}
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {copyPack.home.faq.items.ja.map((item, i) => (
              <div key={i} className="design-card border px-4 py-4">
                <p className="text-sm font-semibold">{item.q}</p>
                <p className="mt-2 text-sm design-muted">{item.a}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Media Kit CTA */}
      <section className="design-section design-bg-muted">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide design-muted">
                {copyPack.mediaKit.hero.kicker.ja}
              </p>
              <h2 className="mt-2 text-2xl font-semibold">
                {copyPack.mediaKit.hero.title.ja}
              </h2>
              <p className="mt-3 max-w-prose whitespace-pre-line text-sm leading-6 design-muted">
                {copyPack.mediaKit.hero.lead.ja}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  href={`/${locale}/media-kit`}
                  className="design-btn design-accent-bg inline-flex px-6 py-3 text-sm font-semibold text-white"
                >
                  {copyPack.mediaKit.buttons.pdf.ja}
                </Link>
                <Link
                  href={`/${locale}/media-kit`}
                  className="design-btn inline-flex border design-border px-6 py-3 text-sm font-semibold"
                >
                  {copyPack.navigation.items.find((n) => n.key === 'mediaKit')?.label.ja}
                </Link>
              </div>
            </div>
            <div className="design-placeholder aspect-[3/4] rounded-[var(--theme-radius-card)]" />
          </div>
        </Container>
      </section>
    </div>
  );
}
