import Link from 'next/link';
import { notFound } from 'next/navigation';
import LandingScript from '@/components/landing/LandingScript';
import HeroPhoto from '@/components/landing/HeroPhoto';
import ActivityGallery from '@/components/landing/ActivityGallery';
import TweetEmbed, { TwitterWidgetsScript } from '@/components/landing/TweetEmbed';
import LanguageSwitchLink from '@/components/LanguageSwitchLink';
import { isLocale, type Locale } from '@/lib/i18n';
import { landingCopy } from '@/lib/landing-copy';
import {
  getLatestTweets,
  getTweetIdsFromEnv,
  getTweetOEmbeds,
  tweetUrl,
  type XTweet
} from '@/lib/x-api';
import { getYouTubeVideos } from '@/lib/youtube-oembed';

const X_PROFILE_URL = 'https://x.com/aki_playaxie';
const YOUTUBE_CHANNEL_URL = 'https://www.youtube.com/@nft4142';
const STAKESTONE_URL = 'https://x.com/StakeStone_JP';

const XIcon = () => (
  <svg viewBox="0 0 24 24" className="inline-block h-[14px] w-[14px] shrink-0 fill-current">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

function truncateTweetText(text: string, maxLen = 110): string {
  const compact = text.replace(/\s+/g, ' ').trim();
  if (compact.length <= maxLen) return compact;
  return `${compact.slice(0, maxLen)}...`;
}

export default async function LandingPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const resolvedLocale = locale as Locale;
  const copy = landingCopy[resolvedLocale];

  const xTweets = await getLatestTweets(3);
  const tweets: { id: string; text: string; tag: string }[] | null = xTweets
    ? xTweets.map((tweet: XTweet) => ({
        id: tweet.id,
        text: truncateTweetText(tweet.text),
        tag: tweet.tag ?? copy.posts.fallbackTag
      }))
    : null;

  const tweetIds = getTweetIdsFromEnv();
  const oEmbeds = tweets ? [] : await getTweetOEmbeds(tweetIds);
  const useEmbedMode = oEmbeds.length > 0;
  const displayTweets = useEmbedMode ? [] : (tweets ?? copy.fallbackTweets);

  const youtubeVideos = await getYouTubeVideos([
    'https://www.youtube.com/watch?v=6CbgC2CDAck',
    'https://www.youtube.com/watch?v=4_p61Hj6T5Q',
    'https://www.youtube.com/watch?v=2miN2k9jGzY'
  ]);

  const activityGalleryItems = Array.from({ length: 12 }, (_, index) => {
    const visualIndex = String(index + 1).padStart(2, '0');
    return {
      src: `/images/gallery/activity-${visualIndex}.png`,
      title: `${copy.gallery.imageTitlePrefix} ${visualIndex}`,
      note: copy.gallery.imageNote
    };
  });

  return (
    <>
      <LandingScript />

      <nav id="landing-nav">
        <Link href={`/${resolvedLocale}/landing`} className="nav-logo">
          Aki<span>.</span>
        </Link>
        <ul className="nav-links">
          <li>
            <Link href={`/${resolvedLocale}/landing#highlights`}>
              {copy.nav.highlights}
            </Link>
          </li>
          <li>
            <Link href={`/${resolvedLocale}/landing#experience`}>
              {copy.nav.experience}
            </Link>
          </li>
          <li>
            <Link href={`/${resolvedLocale}/landing#past`}>{copy.nav.past}</Link>
          </li>
          <li>
            <Link href={`/${resolvedLocale}/landing#gallery`}>
              {copy.nav.gallery}
            </Link>
          </li>
          <li>
            <Link href={`/${resolvedLocale}/landing#youtube`}>
              {copy.nav.youtube}
            </Link>
          </li>
          <li>
            <Link href={`/${resolvedLocale}/landing#posts`}>{copy.nav.posts}</Link>
          </li>
        </ul>
        <div className="nav-actions">
          <a
            href={X_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="nav-contact"
          >
            {copy.nav.contact}
          </a>
          <LanguageSwitchLink
            locale={resolvedLocale}
            className="nav-contact nav-lang"
            labelMode="short"
            trackContext="landing_nav"
          />
        </div>
      </nav>

      <section className="hero">
        <div className="hero-deco1" aria-hidden>
          <img src="/images/hero-mascot-transparent.png" alt="" className="hero-mascot" />
        </div>
        <div className="hero-deco2" aria-hidden />
        <div className="hero-inner">
          <div className="hero-text">
            <div className="hero-label">
              <span className="dot" /> {copy.hero.label}
            </div>
            <h1 className="hero-name">
              {copy.hero.headingLine1}
              <br />
              {copy.hero.headingLine2Prefix}
              <em>{copy.hero.headingName}</em>
              {copy.hero.headingLine2Suffix}
            </h1>
            <p className="hero-sub">{copy.hero.subtitle}</p>
            <div className="hero-tags">
              {copy.hero.tags.map((tag) => (
                <span key={tag} className="hero-tag">
                  {tag}
                </span>
              ))}
            </div>
            <p className="hero-desc">{copy.hero.description}</p>
            <div className="hero-btns">
              <a
                href={X_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <XIcon /> {copy.hero.xCta}
              </a>
              <a
                href={YOUTUBE_CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                {copy.hero.youtubeCta}
              </a>
            </div>
          </div>
          <div className="hero-visual">
            <div className="photo-frame">
              <HeroPhoto />
            </div>
            {copy.hero.metrics.map((metric, index) => (
              <div key={`${metric.value}-${metric.label}`} className={`fbadge fb${index + 1}`}>
                <div>
                  <div className="num">{metric.value}</div>
                  <div className="lbl">{metric.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="stats-bar">
        <div className="stats-inner">
          {copy.stats.map((stat) => (
            <div className="stat" key={`${stat.value}-${stat.label}`}>
              <div className="stat-num">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="hl-section" id="highlights">
        <div className="hl-inner">
          <div className="sec-label reveal">{copy.highlights.sectionLabel}</div>
          <h2 className="sec-heading reveal">{copy.highlights.heading}</h2>
          <div className="hl-grid">
            {copy.highlights.cards.map((card) => (
              <div className="hl-card reveal" key={`${card.title}-${card.org}`}>
                <div className="hl-emoji">{card.emoji}</div>
                <h3 className="hl-title">{card.title}</h3>
                <div className="hl-org">{card.org}</div>
                <p className="hl-desc">{card.desc}</p>
                <div className="hl-metric">
                  <span className="hl-num">{card.metricValue}</span>
                  <span className="hl-lbl">{card.metricLabel}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="tl-section" id="experience">
        <div className="tl-inner">
          <div className="sec-label reveal">{copy.timeline.sectionLabel}</div>
          <h2 className="sec-heading reveal">{copy.timeline.heading}</h2>
          <div className="timeline">
            {copy.timeline.items.map((item) => (
              <div className="tl-item reveal" key={`${item.date}-${item.title}`}>
                <div className="tl-date">{item.date}</div>
                <h3 className="tl-title">
                  {item.url ? (
                    <a href={item.url} target="_blank" rel="noopener noreferrer">
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </h3>
                <div className="tl-role">{item.role}</div>
                <p className="tl-desc">{item.desc}</p>
                <div className="tl-tags">
                  {item.tags.map((tag) => (
                    <span className="tl-tag" key={`${item.title}-${tag}`}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="past-section" id="past">
        <div className="past-inner">
          <div className="sec-label reveal">{copy.past.sectionLabel}</div>
          <h2 className="sec-heading reveal">{copy.past.heading}</h2>
          <div className="past-grid">
            {copy.past.items.map((item) => (
              <div className="past-card reveal" key={`${item.year}-${item.title}`}>
                <div className="past-yr">{item.year}</div>
                <div>
                  <div className="past-title">{item.title}</div>
                  <p className="past-desc">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="gallery-section" id="gallery">
        <div className="gallery-inner">
          <div className="sec-label reveal">{copy.gallery.sectionLabel}</div>
          <h2 className="sec-heading reveal">{copy.gallery.heading}</h2>
          <p className="gallery-note reveal">{copy.gallery.note}</p>
          <ActivityGallery items={activityGalleryItems} />
        </div>
      </section>

      {youtubeVideos.length > 0 && (
        <section className="youtube-section" id="youtube">
          <div className="youtube-inner">
            <div className="sec-label reveal">{copy.youtube.sectionLabel}</div>
            <h2 className="sec-heading reveal">{copy.youtube.heading}</h2>
            <p className="youtube-note reveal">{copy.youtube.note}</p>
            <div className="youtube-grid reveal">
              {youtubeVideos.map((video) => (
                <a
                  key={video.videoId}
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="youtube-card"
                >
                  <div className="youtube-thumb-wrap">
                    <img src={video.thumbnailUrl} alt="" className="youtube-thumb" />
                  </div>
                  <div className="youtube-cap">
                    <span className="youtube-title">{video.title}</span>
                    <span className="youtube-watch-btn">{copy.youtube.watchLabel}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}

      <div className="posts-section" id="posts">
        <div className="posts-inner">
          <div className="posts-header reveal">
            <div>
              <div className="sec-label">{copy.posts.latestLabel}</div>
              <h2 className="sec-heading">{copy.posts.heading}</h2>
            </div>
            <a
              href={X_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="posts-link"
            >
              <XIcon /> {copy.posts.profileHandle}
            </a>
          </div>
          {useEmbedMode ? (
            <>
              <TwitterWidgetsScript />
              <div className="posts-grid reveal posts-grid-embed">
                {oEmbeds.map(({ id, html }) => (
                  <TweetEmbed key={id} html={html} />
                ))}
              </div>
            </>
          ) : (
            <div className="posts-grid reveal">
              {displayTweets.map((tweet) => (
                <a
                  key={tweet.id}
                  href={tweetUrl(tweet.id)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tweet-card"
                >
                  <div className="tweet-header">
                    <div className="tweet-avatar">A</div>
                    <div>
                      <div className="tweet-name">{copy.posts.displayName}</div>
                      <div className="tweet-handle">{copy.posts.profileHandle}</div>
                    </div>
                  </div>
                  <div className="tweet-body">{tweet.text}</div>
                  <div className="tweet-footer">
                    <span className="tweet-tag">{tweet.tag}</span>
                    <span className="tweet-arrow">→</span>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="marquee-wrap">
        <div className="marquee-label">{copy.marquee.label}</div>
        <div className="marquee-track" aria-hidden>
          {[...copy.marquee.partners, ...copy.marquee.partners].map((name, index) => (
            <span key={`mq-${index}`} className="mq-item">
              {name} <span className="d" />
            </span>
          ))}
        </div>
      </div>

      <div className="cta-section" id="contact">
        <h2 className="cta-heading reveal">{copy.cta.heading}</h2>
        <p className="cta-desc reveal">{copy.cta.description}</p>
        <div className="cta-btns reveal">
          <a
            href={X_PROFILE_URL}
            className="cta-btn fill"
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.cta.x}
          </a>
          <a
            href={YOUTUBE_CHANNEL_URL}
            className="cta-btn line"
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.cta.youtube}
          </a>
          <a
            href={STAKESTONE_URL}
            className="cta-btn line"
            target="_blank"
            rel="noopener noreferrer"
          >
            {copy.cta.stakeStone}
          </a>
        </div>
      </div>

      <footer>
        <p>{copy.footer}</p>
      </footer>
    </>
  );
}
