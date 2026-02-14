import Link from 'next/link';
import { notFound } from 'next/navigation';
import LandingScript from '@/components/landing/LandingScript';
import HeroPhoto from '@/components/landing/HeroPhoto';
import { isLocale, type Locale } from '@/lib/i18n';

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="inline-block h-[14px] w-[14px] shrink-0 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export default async function LandingPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;

  return (
    <>
      <LandingScript />

      <nav id="landing-nav">
        <Link href={`/${resolvedLocale}/landing`} className="nav-logo">
          Aki<span>.</span>
        </Link>
        <ul className="nav-links">
          <li><Link href={`/${resolvedLocale}/landing#posts`}>Posts</Link></li>
          <li><Link href={`/${resolvedLocale}/landing#highlights`}>Highlights</Link></li>
          <li><Link href={`/${resolvedLocale}/landing#experience`}>Experience</Link></li>
          <li><Link href={`/${resolvedLocale}/landing#past`}>Achievements</Link></li>
        </ul>
        <Link href={`/${resolvedLocale}/landing#contact`} className="nav-contact">Contact</Link>
      </nav>

      <section className="hero">
        <div className="hero-deco1" aria-hidden />
        <div className="hero-deco2" aria-hidden />
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-label"><span className="dot" /> Japanese Crypto KOL</div>
            <h1 className="hero-name">Hello,<br />I&apos;m <em>Aki</em></h1>
            <p className="hero-sub">クリプト KOL ・ MC ・ コンテンツクリエイター</p>
            <div className="hero-tags">
              <span className="hero-tag">KOL</span>
              <span className="hero-tag">MC / Host</span>
              <span className="hero-tag">Event Coordinator</span>
              <span className="hero-tag">Content Creator</span>
            </div>
            <p className="hero-desc">
              <strong>コスプレ</strong>と<strong>コメディ</strong>を交えた独自スタイルで、DeFi・チェーン・ブロックチェーンゲームをわかりやすく解説。日本でも数少ないユニーク性を持つクリプトKOLです。
            </p>
            <div className="hero-btns">
              <a href="https://x.com/aki_playaxie" target="_blank" rel="noopener noreferrer" className="btn-primary">
                <XIcon /> Follow on X
              </a>
              <a href="https://www.youtube.com/@nft4142" target="_blank" rel="noopener noreferrer" className="btn-ghost">YouTube ↗</a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="photo-frame">
              <HeroPhoto />
            </div>
            <div className="fbadge fb1">
              <div><div className="num">9,000+</div><div className="lbl">X Followers</div></div>
            </div>
            <div className="fbadge fb2">
              <div><div className="num">3,000+</div><div className="lbl">YouTube</div></div>
            </div>
            <div className="fbadge fb3">
              <div><div className="num">~36/yr</div><div className="lbl">AMA Sessions</div></div>
            </div>
          </div>
        </div>
      </section>

      <div className="stats-bar">
        <div className="stats-inner">
          <div className="stat"><div className="stat-num">9,000+</div><div className="stat-label">X Followers</div></div>
          <div className="stat"><div className="stat-num">3,000+</div><div className="stat-label">YouTube</div></div>
          <div className="stat"><div className="stat-num">~36</div><div className="stat-label">AMA / Year</div></div>
          <div className="stat"><div className="stat-num">500+</div><div className="stat-label">Avg Listeners</div></div>
          <div className="stat"><div className="stat-num">1,000+</div><div className="stat-label">Avg Comments</div></div>
        </div>
      </div>

      <div className="posts-section" id="posts">
        <div className="posts-inner">
          <div className="posts-header reveal">
            <div>
              <div className="sec-label">Latest Posts</div>
              <h2 className="sec-heading">From X / Twitter</h2>
            </div>
            <a href="https://x.com/aki_playaxie" target="_blank" rel="noopener noreferrer" className="posts-link">
              <XIcon /> @aki_playaxie
            </a>
          </div>
          <div className="posts-grid reveal">
            <a href="https://x.com/ZeusNetworkJP/status/1991436077920567426" target="_blank" rel="noopener noreferrer" className="tweet-card">
              <div className="tweet-header">
                <div className="tweet-avatar">A</div>
                <div><div className="tweet-name">Aki ✨</div><div className="tweet-handle">@aki_playaxie</div></div>
              </div>
              <div className="tweet-body">Zeus Network JPとのコラボ投稿。日本市場向けにZeusのプロダクトを紹介しています。</div>
              <div className="tweet-footer">
                <span className="tweet-tag">Zeus Network</span>
                <span className="tweet-arrow">→</span>
              </div>
            </a>
            <a href="https://x.com/aki_playaxie/status/1976083871675580578" target="_blank" rel="noopener noreferrer" className="tweet-card">
              <div className="tweet-header">
                <div className="tweet-avatar">A</div>
                <div><div className="tweet-name">Aki ✨</div><div className="tweet-handle">@aki_playaxie</div></div>
              </div>
              <div className="tweet-body">Mantle「Max out Szn」クリエイターコンペでトップ表彰。600名以上の応募者から選出されました。</div>
              <div className="tweet-footer">
                <span className="tweet-tag">Mantle</span>
                <span className="tweet-arrow">→</span>
              </div>
            </a>
            <a href="https://x.com/aki_playaxie/status/1888149044922617963" target="_blank" rel="noopener noreferrer" className="tweet-card">
              <div className="tweet-header">
                <div className="tweet-avatar">A</div>
                <div><div className="tweet-name">Aki ✨</div><div className="tweet-handle">@aki_playaxie</div></div>
              </div>
              <div className="tweet-body">SoSoValueイベントのMC・コーディネーターを担当。日本でのWeb3イベント運営の様子をレポート。</div>
              <div className="tweet-footer">
                <span className="tweet-tag">SoSoValue</span>
                <span className="tweet-arrow">→</span>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="hl-section" id="highlights">
        <div className="hl-inner">
          <div className="sec-label reveal">Highlights</div>
          <h2 className="sec-heading reveal">What I Do Best</h2>
          <div className="hl-grid">
            <div className="hl-card reveal">
              <div className="hl-emoji">🎙️</div>
              <h3 className="hl-title">AMA Host / MC</h3>
              <div className="hl-org">boarding bridge</div>
              <p className="hl-desc">日本最大級クリプトDAOでAMAホスト・MCを担当。Uniswap Labs、Monad、0G Labs等と対談。</p>
              <div className="hl-metric"><span className="hl-num">1,000+</span><span className="hl-lbl">avg comments / AMA</span></div>
            </div>
            <div className="hl-card reveal">
              <div className="hl-emoji">🌏</div>
              <h3 className="hl-title">Community & BD</h3>
              <div className="hl-org">StakeStone JP Ambassador</div>
              <p className="hl-desc">公式Xを0→1,200フォロワーに。6カ国中フォロワー数最大を記録。</p>
              <div className="hl-metric"><span className="hl-num">#1</span><span className="hl-lbl">largest community globally</span></div>
            </div>
            <div className="hl-card reveal">
              <div className="hl-emoji">🏆</div>
              <h3 className="hl-title">Content Creator</h3>
              <div className="hl-org">Mantle Top Creator</div>
              <p className="hl-desc">応募600名以上の中からトップ表彰。ポルトガルCCCCへ選出。</p>
              <div className="hl-metric"><span className="hl-num">Top 1</span><span className="hl-lbl">of 600+ applicants</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="marquee-wrap">
        <div className="marquee-label">AMA & Collaboration Partners</div>
        <div className="marquee-track">
          {[
            'Uniswap Labs', 'Monad', '0G Labs', 'Huma Finance', 'Solayer', 'StakeStone',
            'Zeus Network', 'SoSoValue', 'TalusLabs', 'Wallchain', 'UPCX', 'Mantle'
          ].flatMap((name) => [
            <span key={`${name}-1`} className="mq-item">{name} <span className="d" /></span>,
            <span key={`${name}-2`} className="mq-item">{name} <span className="d" /></span>
          ])}
        </div>
      </div>

      <div className="tl-section" id="experience">
        <div className="tl-inner">
          <div className="sec-label reveal">Experience</div>
          <h2 className="sec-heading reveal">Career Timeline</h2>
          <div className="timeline">
            <div className="tl-item reveal">
              <div className="tl-date">2025/10 – Present</div>
              <h3 className="tl-title">InfoFi Community</h3>
              <div className="tl-role">Founder / Core Member</div>
              <p className="tl-desc">日本初のInfoFiコミュニティを立ち上げ、2か月で約600名まで拡大。韓国コミュニティとの共同運営、7回のAMA実施。2026年2月に日本初のInfoFiオフイベントを予定。</p>
              <div className="tl-tags"><span className="tl-tag">InfoFi</span><span className="tl-tag">Community Building</span><span className="tl-tag">JP × KR</span></div>
            </div>
            <div className="tl-item reveal">
              <div className="tl-date">2024/10 – Present</div>
              <h3 className="tl-title">boarding bridge</h3>
              <div className="tl-role">Officer / AMA Host / MC</div>
              <p className="tl-desc">日本最大級クリプトDAOのOfficerとして、日英でAMAホスト・MCを月約3回。平均リスナー約500名、平均コメント数1,000件を記録。</p>
              <div className="tl-tags"><span className="tl-tag">AMA</span><span className="tl-tag">MC</span><span className="tl-tag">Bilingual</span></div>
            </div>
            <div className="tl-item reveal">
              <div className="tl-date">2023/2 – Present</div>
              <h3 className="tl-title">StakeStone JP</h3>
              <div className="tl-role">Ambassador / Community & BD</div>
              <p className="tl-desc">DeFi領域で日本コミュニティを0から構築。公式X (0→1,200)、オフイベント「StakeStone Connect」計5回・累計150名動員。TGE前ステーキング量で日本最大を達成。</p>
              <div className="tl-tags"><span className="tl-tag">DeFi</span><span className="tl-tag">Community</span><span className="tl-tag">BD</span><span className="tl-tag">Events</span></div>
            </div>
            <div className="tl-item reveal">
              <div className="tl-date">2021/11 – Present</div>
              <h3 className="tl-title">YouTuber / X (KOL)</h3>
              <div className="tl-role">Content Creator</div>
              <p className="tl-desc">コスプレ・コメディ要素を交えた独自スタイルでDeFi・チェーン・ブロックチェーンゲームを解説。Mantleクリエイターコンペでトップ表彰、ポルトガルCCCCへ選出。</p>
              <div className="tl-tags"><span className="tl-tag">YouTube</span><span className="tl-tag">X</span><span className="tl-tag">Cosplay</span><span className="tl-tag">Comedy</span></div>
            </div>
          </div>
        </div>
      </div>

      <div className="past-section" id="past">
        <div className="past-inner">
          <div className="sec-label reveal">Past</div>
          <h2 className="sec-heading reveal">Past Achievements</h2>
          <div className="past-grid">
            <div className="past-card reveal">
              <div className="past-yr">&apos;22</div>
              <div><div className="past-title">東京ゲームショウ 登壇</div><p className="past-desc">日本最大級ゲームカンファレンスでWeb3ゲーム（STEPN等）をKOLとして紹介。</p></div>
            </div>
            <div className="past-card reveal">
              <div className="past-yr">&apos;21</div>
              <div><div className="past-title">Axie Scholars 運用</div><p className="past-desc">フィリピン人スカラー100名超を運用。NFTマッチング設計、戦略構築、個別コーチング。</p></div>
            </div>
          </div>
        </div>
      </div>

      <div className="cta-section" id="contact">
        <h2 className="cta-heading reveal">Let&apos;s Connect</h2>
        <p className="cta-desc reveal">イベントMC・コーディネート・AMAホスト・日本コミュニティ立ち上げなど、お気軽にご連絡ください。</p>
        <div className="cta-btns reveal">
          <a href="https://x.com/aki_playaxie" className="cta-btn fill" target="_blank" rel="noopener noreferrer">X (Twitter)</a>
          <a href="https://www.youtube.com/@nft4142" className="cta-btn line" target="_blank" rel="noopener noreferrer">YouTube</a>
          <a href="https://x.com/StakeStone_JP" className="cta-btn line" target="_blank" rel="noopener noreferrer">StakeStone JP</a>
        </div>
      </div>

      <footer>
        <p>© 2026 Aki — Japanese Crypto KOL / MC / Event Coordinator</p>
      </footer>
    </>
  );
}
