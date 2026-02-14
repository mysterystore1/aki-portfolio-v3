import './globals.css';
import type { Metadata } from 'next';
import { Noto_Sans_JP } from 'next/font/google';
import { getBaseUrl } from '@/lib/seo';
import Analytics from '@/components/Analytics';

const notoSans = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap'
});

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: 'Aki Web3 Portfolio',
    template: '%s | Aki Web3 Portfolio'
  },
  description:
    'Web3のKOL/MC/Community/BD/Contents領域で実績を持つAkiの多言語ポートフォリオ。'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={notoSans.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
