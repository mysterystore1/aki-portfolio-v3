import type { Locale } from '@/lib/i18n';

type LandingMeta = {
  title: string;
  description: string;
};

type LandingNav = {
  highlights: string;
  experience: string;
  past: string;
  gallery: string;
  youtube: string;
  posts: string;
  contact: string;
};

type HeroMetric = {
  value: string;
  label: string;
};

type LandingHero = {
  label: string;
  headingLine1: string;
  headingLine2Prefix: string;
  headingName: string;
  headingLine2Suffix: string;
  subtitle: string;
  tags: string[];
  description: string;
  xCta: string;
  youtubeCta: string;
  metrics: HeroMetric[];
};

type HighlightCard = {
  emoji: string;
  title: string;
  org: string;
  desc: string;
  metricValue: string;
  metricLabel: string;
};

type LandingHighlights = {
  sectionLabel: string;
  heading: string;
  cards: HighlightCard[];
};

type TimelineItem = {
  date: string;
  title: string;
  url?: string;
  role: string;
  desc: string;
  tags: string[];
};

type LandingTimeline = {
  sectionLabel: string;
  heading: string;
  items: TimelineItem[];
};

type PastItem = {
  year: string;
  title: string;
  desc: string;
};

type LandingPast = {
  sectionLabel: string;
  heading: string;
  items: PastItem[];
};

type LandingGallery = {
  sectionLabel: string;
  heading: string;
  note: string;
  imageTitlePrefix: string;
  imageNote: string;
};

type LandingYouTube = {
  sectionLabel: string;
  heading: string;
  note: string;
  watchLabel: string;
};

type LandingPosts = {
  sectionLabel: string;
  heading: string;
  latestLabel: string;
  profileHandle: string;
  fallbackTag: string;
  displayName: string;
};

type LandingCta = {
  heading: string;
  description: string;
  x: string;
  youtube: string;
  stakeStone: string;
};

type LandingTweet = {
  id: string;
  text: string;
  tag: string;
};

type LandingMarquee = {
  label: string;
  partners: string[];
};

export type LandingContent = {
  meta: LandingMeta;
  nav: LandingNav;
  hero: LandingHero;
  stats: HeroMetric[];
  highlights: LandingHighlights;
  timeline: LandingTimeline;
  past: LandingPast;
  gallery: LandingGallery;
  youtube: LandingYouTube;
  posts: LandingPosts;
  fallbackTweets: LandingTweet[];
  marquee: LandingMarquee;
  cta: LandingCta;
  footer: string;
};

const sharedPartners = [
  'Uniswap Labs',
  'Monad',
  '0G Labs',
  'Huma Finance',
  'Solayer',
  'StakeStone',
  'Zeus Network',
  'SoSoValue',
  'TalusLabs',
  'Wallchain',
  'UPCX',
  'Mantle'
];

export const landingCopy: Record<Locale, LandingContent> = {
  jp: {
    meta: {
      title: 'Aki | Web3司会・AMAホスト（日英）',
      description:
        '日英対応のWeb3イベント司会・AMAホスト。進行設計から当日運営まで、伝わる場づくりを支援します。'
    },
    nav: {
      highlights: 'Highlights',
      experience: 'Experience',
      past: 'Achievements',
      gallery: 'Gallery',
      youtube: 'YouTube',
      posts: 'Posts',
      contact: 'Contact'
    },
    hero: {
      label: 'Japanese Crypto KOL',
      headingLine1: 'Hello,',
      headingLine2Prefix: "I'm ",
      headingName: 'Aki',
      headingLine2Suffix: '',
      subtitle: 'クリプトKOL・MC・コミュニティ運営',
      tags: ['KOL', 'MC / ホスト', 'イベント進行', 'コンテンツ制作'],
      description:
        '2021年より、DeFi・チェーン・ブロックチェーンゲームを楽しくわかりやすく解説しています。',
      xCta: 'Xをフォロー',
      youtubeCta: 'YouTubeを見る',
      metrics: [
        { value: '10,000+', label: 'Xフォロワー' },
        { value: '3,000+', label: 'YouTube登録者' },
        { value: '50+', label: 'AMA登壇数' }
      ]
    },
    stats: [
      { value: '10,000+', label: 'Xフォロワー' },
      { value: '3,000+', label: 'YouTube登録者' },
      { value: '50+', label: '年間AMA数' },
      { value: '500+', label: 'AMA平均参加者' },
      { value: '1,000+', label: 'AMA平均コメント' }
    ],
    highlights: {
      sectionLabel: 'Highlights',
      heading: 'What I Do Best',
      cards: [
        {
          emoji: '🎙️',
          title: 'AMA Host / MC',
          org: 'boarding bridge',
          desc: '日本最大級のクリプトDAOでAMA進行とMCを担当。議題設計と進行で、視聴者が置いていかれない場を作ります。',
          metricValue: '1,000+',
          metricLabel: 'avg comments / AMA'
        },
        {
          emoji: '🌏',
          title: 'Community & BD',
          org: 'StakeStone JP Ambassador',
          desc: '公式Xを0から運用し、約1,200フォロワーへ。日本市場での認知と参加導線を設計・運用しました。',
          metricValue: '#1',
          metricLabel: 'largest community globally'
        },
        {
          emoji: '🏆',
          title: 'Content Creator',
          org: 'Mantle Top Creator',
          desc: '2,000人超の応募者の中でトップ評価。短く伝わる構成と実践的な解説で評価されました。',
          metricValue: 'Top 1',
          metricLabel: 'of 2000+ applicants'
        }
      ]
    },
    timeline: {
      sectionLabel: 'Experience',
      heading: 'Career Timeline',
      items: [
        {
          date: '2026/1 - Present',
          title: 'Mantle Japan',
          url: 'https://mantle.xyz',
          role: 'Intern',
          desc: 'ライブ配信・コンテンツ制作を担当。日本市場向けの発信設計と現場運営を担当しています。',
          tags: ['Mantle', 'Live Streaming', 'Content Creation', 'Intern']
        },
        {
          date: '2025/10 - Present',
          title: 'InfoFi Community',
          url: 'https://t.me/infofi_hub',
          role: 'Core Member',
          desc: '日本発InfoFiコミュニティの立ち上げに参画。短期間で規模拡大し、JP/KR共同運営とAMA進行を担当。',
          tags: ['InfoFi', 'Community Building', 'JP / KR']
        },
        {
          date: '2024/10 - Present',
          title: 'boarding bridge',
          url: 'https://x.com/bb_jpdao',
          role: 'Officer / AMA Host / MC',
          desc: '日英AMAの設計と進行を担当。安定したエンゲージメントと要点回収しやすい構成を実現。',
          tags: ['AMA', 'MC', 'Bilingual']
        },
        {
          date: '2023/2 - Present',
          title: 'StakeStone JP',
          url: 'https://x.com/StakeStone_JP',
          role: 'Ambassador / Community & BD',
          desc: '日本コミュニティを0から構築。コンテンツ運用、イベント運営、パートナー連携を一貫して推進。',
          tags: ['DeFi', 'Community', 'BD', 'Events']
        },
        {
          date: '2021/11 - Present',
          title: 'YouTuber / X (KOL)',
          url: 'https://www.youtube.com/@nft4142',
          role: 'Content Creator',
          desc: 'DeFi・クリプト・BCGをテーマに、理解しやすく行動につながるコンテンツを制作。',
          tags: ['YouTube', 'X', 'Cosplay', 'Comedy']
        }
      ]
    },
    past: {
      sectionLabel: 'Past',
      heading: 'Past Achievements',
      items: [
        {
          year: "'22",
          title: '東京ゲームショウ登壇',
          desc: '日本最大級のゲームカンファレンスで、Web3ゲーム領域をKOLとして紹介。'
        },
        {
          year: "'21",
          title: 'Axie Scholars運営',
          desc: '100名超のスカラー運営で、オンボーディングから育成フローまで設計。'
        }
      ]
    },
    gallery: {
      sectionLabel: 'Activity Gallery',
      heading: 'My Activities in Photos',
      note: 'イベント・AMA・コミュニティ運営の実績を写真で紹介しています。',
      imageTitlePrefix: '活動写真',
      imageNote: 'イベント・AMA・コミュニティ'
    },
    youtube: {
      sectionLabel: 'YOUTUBE',
      heading: 'YouTube（サムネで見る）',
      note: '出演や企画の一部を掲載しています。クリックで視聴できます。',
      watchLabel: '視聴する'
    },
    posts: {
      sectionLabel: 'Latest Posts',
      heading: 'From X',
      latestLabel: 'Latest Posts',
      profileHandle: '@aki_playaxie',
      fallbackTag: 'Post',
      displayName: 'Aki'
    },
    fallbackTweets: [
      {
        id: '1991436077920567426',
        text: 'Zeus Network JPとのコラボ投稿。日本市場向けにプロダクトの要点をわかりやすく紹介。',
        tag: 'Zeus Network'
      },
      {
        id: '1976083871675580578',
        text: 'Mantle「Max out Szn」クリエイターコンペでトップ表彰。2,000人超から選出。',
        tag: 'Mantle'
      },
      {
        id: '1888149044922617963',
        text: 'SoSoValueイベントでMCと運営を担当。日本向けWeb3イベントの実践レポート。',
        tag: 'SoSoValue'
      }
    ],
    marquee: {
      label: 'AMA & Collaboration Partners',
      partners: sharedPartners
    },
    cta: {
      heading: 'Let\'s Connect',
      description:
        'イベントMC、AMAホスト、コミュニティ立ち上げ、コンテンツ制作まで。まずは日程・目的だけでもOKです。',
      x: 'X (Twitter)',
      youtube: 'YouTube',
      stakeStone: 'StakeStone JP'
    },
    footer: '© 2026 Aki - Japanese Crypto KOL / Host / Moderator / Event Coordinator'
  },
  en: {
    meta: {
      title: 'Aki | JP/EN Web3 Host / Moderator (AMA & Events)',
      description:
        'JP/EN Web3 host and AMA moderator. I design clear sessions, strong pacing, and practical takeaways that drive action.'
    },
    nav: {
      highlights: 'Highlights',
      experience: 'Experience',
      past: 'Achievements',
      gallery: 'Gallery',
      youtube: 'YouTube',
      posts: 'Posts',
      contact: 'Contact'
    },
    hero: {
      label: 'Japanese Crypto KOL',
      headingLine1: 'Hello,',
      headingLine2Prefix: "I'm ",
      headingName: 'Aki',
      headingLine2Suffix: '',
      subtitle: 'Crypto KOL / Host / Moderator / Community Builder',
      tags: ['KOL', 'Host / Moderator', 'Event Coordinator', 'Content Creator'],
      description:
        "Since 2021, I've been turning complex Web3 topics into clear, engaging AMAs and events. My focus is simple: clearer understanding and stronger audience engagement.",
      xCta: 'Follow on X',
      youtubeCta: 'Watch on YouTube',
      metrics: [
        { value: '10,000+', label: 'X Followers' },
        { value: '3,000+', label: 'YouTube' },
        { value: '50+', label: 'AMAs hosted' }
      ]
    },
    stats: [
      { value: '10,000+', label: 'X Followers' },
      { value: '3,000+', label: 'YouTube' },
      { value: '50+', label: 'AMAs per year' },
      { value: '500+', label: 'Avg live attendees per AMA' },
      { value: '1,000+', label: 'Avg chat messages per AMA' }
    ],
    highlights: {
      sectionLabel: 'Highlights',
      heading: 'What I Do Best',
      cards: [
        {
          emoji: '🎙️',
          title: 'AMA Host / Moderator',
          org: 'boarding bridge',
          desc: "Hosted JP/EN AMAs for one of Japan's leading crypto DAOs. I design the run-of-show and questions so the audience stays engaged throughout.",
          metricValue: '1,000+',
          metricLabel: 'avg comments / AMA'
        },
        {
          emoji: '🌏',
          title: 'Community & BD',
          org: 'StakeStone JP Ambassador',
          desc: 'Built the official X presence from 0 to ~1,200 followers and designed engagement loops to grow the Japanese community.',
          metricValue: '#1',
          metricLabel: 'largest community globally'
        },
        {
          emoji: '🏆',
          title: 'Content Creator',
          org: 'Mantle Top Creator',
          desc: 'Recognized as top creator among 2,000+ applicants through concise storytelling and action-focused content.',
          metricValue: 'Top 1',
          metricLabel: 'of 2000+ applicants'
        }
      ]
    },
    timeline: {
      sectionLabel: 'Experience',
      heading: 'Career Timeline',
      items: [
        {
          date: '2026/1 - Present',
          title: 'Mantle Japan',
          url: 'https://mantle.xyz',
          role: 'Intern',
          desc: 'Leading livestream and content execution for Japan. Focused on practical messaging and event-ready production.',
          tags: ['Mantle', 'Live Streaming', 'Content Creation', 'Intern']
        },
        {
          date: '2025/10 - Present',
          title: 'InfoFi Community',
          url: 'https://t.me/infofi_hub',
          role: 'Core Member',
          desc: 'Core member of an early-stage InfoFi community in Japan, supporting JP/KR collaboration and AMA programming and operations.',
          tags: ['InfoFi', 'Community Building', 'JP / KR']
        },
        {
          date: '2024/10 - Present',
          title: 'boarding bridge',
          url: 'https://x.com/bb_jpdao',
          role: 'Officer / AMA Host / Moderator',
          desc: 'Designed and hosted JP/EN AMAs with consistent engagement and a recap-friendly structure.',
          tags: ['AMA', 'Host / Moderator', 'Bilingual']
        },
        {
          date: '2023/2 - Present',
          title: 'StakeStone JP',
          url: 'https://x.com/StakeStone_JP',
          role: 'Ambassador / Community & BD',
          desc: 'Built the foundation for the Japanese community from scratch through content cadence, event execution, and partner collaboration.',
          tags: ['DeFi', 'Community', 'BD', 'Events']
        },
        {
          date: '2021/11 - Present',
          title: 'YouTuber / X (KOL)',
          url: 'https://www.youtube.com/@nft4142',
          role: 'Content Creator',
          desc: 'Produced educational Web3 content that turns "interesting" into "actionable," with clear structure and practical context.',
          tags: ['YouTube', 'X', 'Cosplay', 'Comedy']
        }
      ]
    },
    past: {
      sectionLabel: 'Past',
      heading: 'Past Achievements',
      items: [
        {
          year: "'22",
          title: 'Tokyo Game Show Speaker',
          desc: "Presented Web3 gaming topics as a KOL at one of Japan's largest game conferences."
        },
        {
          year: "'21",
          title: 'Axie Scholars Operations',
          desc: 'Managed 100+ scholars and structured onboarding, coaching, and performance tracking and improvement.'
        }
      ]
    },
    gallery: {
      sectionLabel: 'Activity Gallery',
      heading: 'My Activities in Photos',
      note: 'Selected moments from events, AMAs, and community work.',
      imageTitlePrefix: 'Activity',
      imageNote: 'Event / AMA / Community'
    },
    youtube: {
      sectionLabel: 'YOUTUBE',
      heading: 'YouTube Highlights',
      note: 'A few samples from appearances and original content.',
      watchLabel: 'Watch'
    },
    posts: {
      sectionLabel: 'Latest Posts',
      heading: 'From X',
      latestLabel: 'Latest Posts',
      profileHandle: '@aki_playaxie',
      fallbackTag: 'Post',
      displayName: 'Aki'
    },
    fallbackTweets: [
      {
        id: '1991436077920567426',
        text: 'Collaboration update with Zeus Network JP, focused on clear product positioning for the Japan audience.',
        tag: 'Zeus Network'
      },
      {
        id: '1976083871675580578',
        text: "Recognized as a top creator in Mantle's Max out Szn campaign among 2,000+ applicants.",
        tag: 'Mantle'
      },
      {
        id: '1888149044922617963',
        text: 'Hosting and coordination for a SoSoValue event, with practical notes from JP Web3 event execution.',
        tag: 'SoSoValue'
      }
    ],
    marquee: {
      label: 'AMA & Collaboration Partners',
      partners: sharedPartners
    },
    cta: {
      heading: "Let's Connect",
      description:
        'Need a JP/EN host, AMA moderator, community launch support, or a content partner? Send me your preferred dates and goals to get started.',
      x: 'X (Twitter)',
      youtube: 'YouTube',
      stakeStone: 'StakeStone JP'
    },
    footer: '© 2026 Aki - Japanese Crypto KOL / Host / Moderator / Event Coordinator'
  }
};
