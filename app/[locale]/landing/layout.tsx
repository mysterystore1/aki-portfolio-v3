import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { isLocale, Locale } from '@/lib/i18n';
import './landing.css';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return {
    title: 'Aki — Japanese Crypto KOL / MC / Event Coordinator',
    description:
      'コスプレとコメディを交えた独自スタイルで、DeFi・チェーン・ブロックチェーンゲームをわかりやすく解説。日本でも数少ないユニーク性を持つクリプトKOLです。'
  };
}

export default async function LandingLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@300;400;500;700;900&family=Marcellus&family=Sora:wght@300;400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <div className="landing">{children}</div>
    </>
  );
}
