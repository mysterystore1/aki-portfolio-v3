export const copyPack = {
  navigation: {
    siteName: { ja: 'Aki Web3', en: 'Aki Web3' },
    items: [
      { key: 'home', label: { ja: 'ホーム', en: 'Home' }, href: '/jp' },
      {
        key: 'services',
        label: { ja: 'サービス', en: 'Services' },
        href: '/jp/services/mc'
      },
      {
        key: 'profile',
        label: { ja: 'プロフィール', en: 'Profile' },
        href: '/jp/profile'
      },
      { key: 'works', label: { ja: '実績', en: 'Works' }, href: '/jp/works' },
      {
        key: 'mediaKit',
        label: { ja: 'メディアキット', en: 'Media Kit' },
        href: '/jp/media-kit'
      }
    ],
    youtubeCta: { label: { ja: 'YouTube', en: 'YouTube' } }
  },
  global: {
    cta: {
      x: { label: { ja: 'Xで相談', en: 'Message on X' } },
      telegram: { label: { ja: 'Telegramで相談', en: 'Message on Telegram' } }
    },
    dmTemplate: {
      ja: '【日程】____  【言語】JP / EN  【形式】AMA / Event / Community / Content  【目的】認知・参加・理解・獲得  【参考】URLがあれば1つ',
      en: 'Date: ____ / Language: JP or EN / Format: AMA, Event, Community, Content / Goal: Awareness, Participation, Education, Conversion / Reference: 1 link if any'
    },
    footer: {
      ja: '© 2026 Aki Web3 Portfolio',
      en: '© 2026 Aki Web3 Portfolio'
    },
    autoTranslatedBadge: {
      en: 'Auto-translated (review pending)'
    }
  },
  settings: {
    links: {
      x_profile_url: 'https://x.com/aki_playaxie',
      telegram_url: 'https://t.me/Aki_Bcg',
      youtube_url: 'https://www.youtube.com/@nft4142'
    }
  },
  home: {
    meta: {
      ja: {
        title: 'Web3イベント司会（MC）・AMAホスト（日英）｜Aki',
        description:
          '日英の司会（MC）/ AMAホスト、コミュニティ運営、コンテンツ制作。難しい話を“短く・具体に”して、観客が次の一手を持ち帰れる場を作ります。X/Telegramで相談OK。'
      },
      en: {
        title: 'JP/EN Web3 MC & AMA Host | Aki',
        description:
          'JP/EN event MC and AMA host. I turn complex Web3 topics into clear, actionable sessions. Community ops and content collaborations available. Message via X or Telegram.'
      }
    },
    hero: {
      badge: { ja: 'FIELD NOTES', en: 'FIELD NOTES' },
      heading: {
        ja: 'Web3を「分かる」から「動く」へ。\n日英MC・AMAホストのAki',
        en: 'From “understood” to “action.”\nJP/EN Web3 MC & AMA Host'
      },
      sub: {
        ja: '難しい話ほど、短く・具体に。\nAMAなら「質問設計 → テンポ → 要点回収」で、コメントが動く流れを作ります。',
        en: 'Clear structure, tight pacing, solid takeaways.\nFor AMAs: agenda + questions, pacing, and key recap that makes people respond.'
      },
      micro: {
        ja: 'DMは「日程・言語・目的」だけでOK。まずは雑にどうぞ 👀',
        en: 'Just send date, language, and goal. That’s enough to start. 👀'
      },
      primaryCta: { ja: '実績を見る', en: 'See works' },
      secondaryCta: { ja: 'サービスを見る', en: 'View services' },
      rightCard: {
        title: { ja: 'WEB3', en: 'WEB3' },
        name: 'Aki',
        subtitle: { ja: 'KOL / MC / Community', en: 'KOL / MC / Community' }
      }
    },
    highlights: {
      ja: [
        'Xフォロワー：約9,000',
        'YouTube登録者：約3,000',
        'StakeStone JP：0 → 約1,200（公式JPアカ運用）',
        'オフイベント：合計5回、累計約150名動員',
        'AMA：平均コメント約1,000／平均リスナー約500（継続運用）'
      ],
      en: [
        'X followers: ~9,000',
        'YouTube subscribers: ~3,000',
        'StakeStone JP: 0 → ~1,200 (official JP account ops)',
        'Offline events: 5 sessions, ~150 attendees total',
        'AMA: ~1,000 comments / ~500 listeners on average (ongoing)'
      ],
      note: {
        ja: '数字は“何の数字か”が大事。曖昧な指標は出さない派です。',
        en: 'Numbers must have meaning. If it’s unclear, I don’t use it.'
      }
    },
    services: {
      sectionTitle: { ja: '支援できる領域', en: 'What I do' },
      cards: [
        {
          type: 'mc',
          kicker: { ja: 'MC', en: 'MC' },
          title: { ja: 'Web3司会 / AMAホスト（日英）', en: 'JP/EN Web3 MC & AMA Host' },
          desc: {
            ja: '台本の骨子と質問を先に作って、当日は“置いていかれない進行”。\n伝わるところまで一緒にやります。',
            en: 'Agenda + questions first, then tight pacing on the day.\nI keep it clear and engaging.'
          },
          note: {
            ja: 'コメントが動くのは“質問の設計”が9割。',
            en: 'Engagement starts with better questions.'
          }
        },
        {
          type: 'community',
          kicker: { ja: 'COMMUNITY', en: 'COMMUNITY' },
          title: { ja: '日本コミュニティ運営 / BD', en: 'Japan Community Ops / BD' },
          desc: {
            ja: '公式SNS運用、イベント動員、KOL/メディア連携まで。\n“死んでる熱量”を起こして回す導線を作ります。',
            en: 'Ops, events, partnerships.\nI build loops that keep the community alive and moving.'
          },
          note: {
            ja: '参加しやすさ＝定着率。入口を軽くする。',
            en: 'Low friction drives retention.'
          }
        },
        {
          type: 'content',
          kicker: { ja: 'CONTENT', en: 'CONTENT' },
          title: { ja: 'コンテンツ制作（YouTube / X）', en: 'Content (YouTube / X)' },
          desc: {
            ja: '難しいテーマほど「次に何をすればいい？」まで落とす。\n“分かった気がする”で終わらせない構成で作ります。',
            en: 'I turn complexity into action.\nNot just “understood,” but “what to do next.”'
          },
          note: {
            ja: '3分で伝わる要点にするのが好き。',
            en: 'I love sharp 3-minute takeaways.'
          }
        }
      ]
    },
    worksTeaser: {
      title: { ja: '実績ハイライト', en: 'Featured works' },
      micro: {
        ja: '“何をしたか”より、“何が起きたか”。証拠リンク込みでまとめます。',
        en: 'Not just what I did, but what changed. With proof links.'
      }
    },
    youtube: {
      title: { ja: 'YouTube（サムネで見る）', en: 'YouTube highlights' },
      lead: {
        ja: '出演・企画の一部です。クリックで視聴できます。',
        en: 'A few samples from appearances and content. Click to watch.'
      }
    },
    process: {
      title: { ja: '進め方', en: 'How it works' },
      steps: {
        ja: [
          'DMで相談（テンプレでOK）',
          '目的・日程・言語を整理',
          '進行案/台本の骨子を共有',
          '当日運営（必要なら通訳要素も）',
          '振り返り（次回の改善まで）'
        ],
        en: [
          'DM (template is fine)',
          'Clarify goal / date / language',
          'Share outline + agenda/questions',
          'Run the session (JP/EN support)',
          'Recap and iterate'
        ]
      },
      note: {
        ja: '最初のDMは短いほど進みます。必要な情報だけでOK。',
        en: 'Shorter first messages move faster. Keep it simple.'
      }
    },
    faq: {
      title: { ja: 'よくある質問', en: 'FAQ' },
      items: {
        ja: [
          { q: '英語対応できる？', a: '日英の進行に対応します。通訳要素込みの設計も相談OK。' },
          {
            q: '料金は？',
            a: '形式と準備工数で変わるので、まず目的と日程をください。目安はサービスページに載せています（CMSで更新します）。'
          },
          {
            q: 'どんな案件が多い？',
            a: 'AMA、イベント司会、モデレーション、日本コミュニティ運営、コンテンツ制作。'
          },
          {
            q: '最初に何を送ればいい？',
            a: '日程・言語・目的だけでOK。参考URLが1つあると速いです。'
          }
        ],
        en: [
          {
            q: 'Do you support English?',
            a: 'Yes. JP/EN hosting, moderation, and planning support.'
          },
          {
            q: 'Pricing?',
            a: 'Depends on scope and prep. Share goal + date first. A pricing guide is on each service page (editable in CMS).'
          },
          {
            q: 'Typical requests?',
            a: 'AMAs, event MC, panel moderation, Japan community ops, content collabs.'
          },
          {
            q: 'What should I send first?',
            a: 'Date, language, goal. One reference link helps.'
          }
        ]
      }
    }
  },
  gallery: {
    title: {
      ja: 'Gallery（現場の証拠）',
      en: 'Gallery (Field Proof)'
    },
    note: {
      ja: '写真があると、話が一気に早い。',
      en: 'Photos speed up trust.'
    },
    items: [
      {
        caption_ja: 'AMA進行（JP/EN）',
        caption_en: 'AMA hosting (JP/EN)',
        tag: 'AMA',
        href: '/jp/works/boarding-bridge-ama-host'
      },
      {
        caption_ja: '日本コミュニティ運営',
        caption_en: 'Japan community ops',
        tag: 'Community',
        href: '/jp/works/stakestone-jp-community'
      },
      {
        caption_ja: 'クリエイター施策',
        caption_en: 'Creator programs',
        tag: 'Content',
        href: '/jp/works/mantle-creator-awards'
      },
      {
        caption_ja: 'イベント現場',
        caption_en: 'Event floor',
        tag: 'Event'
      },
      {
        caption_ja: '登壇サポート',
        caption_en: 'Speaker support',
        tag: 'MC'
      },
      {
        caption_ja: '舞台裏の進行設計',
        caption_en: 'Run-of-show setup',
        tag: 'Ops'
      },
      {
        caption_ja: '現場レポート制作',
        caption_en: 'Field recaps',
        tag: 'Content'
      },
      {
        caption_ja: 'オフライン誘導',
        caption_en: 'Offline activation',
        tag: 'Event'
      },
      {
        caption_ja: 'コミュニティコラボ',
        caption_en: 'Community collab',
        tag: 'Community'
      },
      {
        caption_ja: '配信設計',
        caption_en: 'Livestream design',
        tag: 'AMA'
      },
      {
        caption_ja: '投稿設計',
        caption_en: 'Social cadence',
        tag: 'BD'
      },
      {
        caption_ja: 'アーカイブまとめ',
        caption_en: 'Archive summary',
        tag: 'Content'
      }
    ]
  },
  servicesPages: {
    mc: {
      meta: {
        ja: {
          title: 'Web3司会（MC）/ AMAホスト（日英・女性MC）｜Aki',
          description:
            'Web3/クリプトのイベント司会、AMAホスト、パネルモデレーターを日英で対応。議題/質問/台本の骨子から当日進行まで。X/Telegramで相談。'
        },
        en: {
          title: 'JP/EN Web3 MC (female) & AMA Host | Aki',
          description:
            'JP/EN event MC, AMA host, and panel moderation. Agenda + question design, pacing, and clear takeaways. Message via X or Telegram.'
        }
      },
      hero: {
        kicker: { ja: 'SERVICES', en: 'SERVICES' },
        title: { ja: 'Web3司会 / AMAホスト（日英）', en: 'JP/EN Web3 MC & AMA Host' },
        lead: {
          ja: '“盛り上げる”より先に、“伝わる”を作る。\nその上で、ちゃんと熱量も上げます。',
          en: 'Clarity first. Then energy.\nI make sessions understandable and engaging.'
        },
        note: {
          ja: '質問が良いと、登壇者が勝手に輝く。',
          en: 'Better questions make speakers shine.'
        }
      },
      whatYouGet: {
        title: { ja: '任せると何が起きる？', en: 'What changes?' },
        items: {
          ja: [
            '登壇者の強みが短く刺さる（話が散らからない）',
            '視聴者が置いていかれない（要点回収が入る）',
            'コメントが動く（質問設計とテンポ）',
            '最後に“次の一手”が残る（まとめ方）'
          ],
          en: [
            'Speakers land their key points clearly',
            'Audience never gets lost (recap built-in)',
            'Engagement rises (question design + pacing)',
            'People leave with a next action (clear wrap-up)'
          ]
        }
      },
      deliverables: {
        title: { ja: '提供するもの', en: 'Deliverables' },
        items: {
          ja: [
            '議題の骨子（何をどの順で話すか）',
            '質問リスト（盛り上がる順に設計）',
            '当日の進行（タイムキープ/合図/切り返し）',
            '要点まとめ（アーカイブ/共有向け）'
          ],
          en: [
            'Agenda outline',
            'Question list (designed for engagement)',
            'On-site / live moderation (timing, transitions)',
            'Key recap for archive/sharing'
          ]
        }
      },
      pricing: {
        enabled: true,
        title: {
          ja: '料金の目安（管理画面で変更できます）',
          en: 'Pricing guide (editable)'
        },
        items: [
          {
            label_ja: 'AMAホスト（60分）',
            value_ja: '¥____〜 / 回',
            note_ja: '準備工数（質問設計/台本）で変動',
            label_en: 'AMA Host (60 min)',
            value_en: 'From ¥____ / session',
            note_en: 'Depends on prep scope'
          },
          {
            label_ja: 'イベント司会（2時間枠）',
            value_ja: '¥____〜 / 枠',
            note_ja: 'リハ/登壇者人数で変動',
            label_en: 'Event MC (2h slot)',
            value_en: 'From ¥____ / slot',
            note_en: 'Depends on rehearsal/speakers'
          },
          {
            label_ja: '日英対応',
            value_ja: '+¥____〜',
            note_ja: '形式により調整',
            label_en: 'JP/EN support',
            value_en: '+¥____',
            note_en: 'Varies by format'
          }
        ],
        disclaimer: {
          ja: 'まずは目的と日程だけください。必要な範囲に絞って提案します。',
          en: 'Send goal + date first. I’ll propose a lean scope.'
        }
      },
      cta: {
        title: { ja: '相談テンプレ（コピペOK）', en: 'DM template (copy/paste)' },
        text: {
          ja: '上のDMテンプレをそのまま送ってください。返信早めです 👀',
          en: 'Send the template above. Fast replies. 👀'
        }
      }
    },
    community: {
      meta: {
        ja: {
          title: '日本コミュニティ運営 / BD（Web3）｜Aki',
          description:
            '日本向けコミュニティ運営、公式SNS立ち上げ・運用、イベント動員、KOL/メディア連携まで。参加導線を軽くして“回る型”を作ります。'
        },
        en: {
          title: 'Japan Community Ops / BD | Aki',
          description:
            'Japan community operations: social launch, content cadence, event activation, and partnerships. I build low-friction loops that retain people.'
        }
      },
      hero: {
        kicker: { ja: 'SERVICES', en: 'SERVICES' },
        title: { ja: '日本コミュニティ運営 / BD', en: 'Japan Community Ops / BD' },
        lead: {
          ja: '“人が集まる”だけだと、すぐ静かになる。\n参加→定着→紹介が回る導線を作ります。',
          en: 'Attention fades fast.\nI build loops: join → stay → invite.'
        },
        note: {
          ja: '入口が軽いほど、コアが増える。',
          en: 'Lower friction grows core members.'
        }
      },
      items: {
        ja: [
          '公式SNSの立ち上げ・運用（投稿設計/反応の型）',
          'コミュニティ導線（オンボ/FAQ/イベント）',
          'オフイベント運営（動員/当日導線）',
          'KOL/メディア連携（共催/紹介/コラボ）'
        ],
        en: [
          'Official social launch & cadence',
          'Onboarding & community loops',
          'Offline event activation',
          'KOL / media partnerships'
        ]
      },
      cta: {
        ja: '日本向けの“現状”と“目標”だけ送ってください。最短ルート出します。',
        en: 'Send your current state + goal in Japan. I’ll propose the shortest path.'
      }
    },
    content: {
      meta: {
        ja: {
          title: 'コンテンツ制作（YouTube / X）｜Aki',
          description:
            'DeFi/チェーン/BCGを分かりやすく。『次に何をすればいい？』まで落とす構成で、視聴→行動につなげます。'
        },
        en: {
          title: 'Content (YouTube / X) | Aki',
          description:
            'Content that turns complex Web3 topics into clear next steps. Not just views, but action.'
        }
      },
      hero: {
        kicker: { ja: 'SERVICES', en: 'SERVICES' },
        title: { ja: 'コンテンツ制作（YouTube / X）', en: 'Content (YouTube / X)' },
        lead: {
          ja: '“分かった気がする”で終わらせない。\n視聴者が次に動ける構成で作ります。',
          en: 'Not just “I get it.”\nI write and edit toward a next action.'
        },
        note: {
          ja: '3分で伝わる要点に削るのが好き。',
          en: 'I love cutting to a 3-minute core.'
        }
      },
      items: {
        ja: [
          '企画（誰に何を伝えるか）',
          '構成（要点→具体→次アクション）',
          '制作（YouTube / X向け）',
          'コラボ（KOL/コミュニティ連携）'
        ],
        en: [
          'Concept (who/what/why)',
          'Structure (core → example → next step)',
          'Production (YouTube/X)',
          'Collabs (KOL/community)'
        ]
      },
      cta: {
        ja: '題材と狙いだけ送ってください。刺さる角度を3案出します。',
        en: 'Send topic + goal. I’ll propose 3 strong angles.'
      }
    }
  },
  profile: {
    meta: {
      ja: {
        title: 'Aki｜Web3 女性MC / AMAホスト（日英）・KOL',
        description:
          '日英の司会（MC）/ AMAホスト、コミュニティ運営、コンテンツ制作。難しい話を“短く・具体に”して、現場の熱量と理解を同時に作ります。'
      },
      en: {
        title: 'Aki | female Web3 MC & AMA Host (JP/EN)',
        description:
          'JP/EN Web3 MC and AMA host. Clear structure, real energy, and practical takeaways. Community ops and content collaborations available.'
      }
    },
    title: {
      ja: 'Aki（Japanese KOL / MC / Event Coordinator / Content Creator）',
      en: 'Aki (Japanese KOL / MC / Event Coordinator / Content Creator)'
    },
    bio: {
      ja: '私は「分かった気がする」で終わるのが苦手です。\nだから、難しい話を短く・具体にして、観客が次に動ける形にします。\n（そして、ちゃんと楽しい空気も作ります）',
      en: 'I don’t like “understood, but stuck.”\nI translate complexity into clear next steps, and keep the room energized.'
    },
    strengths: {
      ja: [
        '日英の場づくり（AMA/イベントの進行）',
        '難しい話を短くまとめる（要点回収）',
        'コミュニティの熱量を“回す”（導線設計）'
      ],
      en: [
        'JP/EN moderation that keeps sessions clear',
        'Sharp summaries and clean takeaways',
        'Community loops that sustain momentum'
      ]
    },
    activities: {
      ja: [
        'AMA/スペースの企画・台本・進行',
        'コミュニティ運営（導線/KPI/イベント）',
        'YouTube/Xの企画・制作'
      ],
      en: [
        'AMA planning, scripts, and hosting',
        'Community ops (loops, metrics, events)',
        'YouTube/X content planning and production'
      ]
    },
    quickFacts: {
      ja: [
        { k: '対応言語', v: 'JP / EN' },
        { k: '領域', v: 'MC / AMA / Community / Content' },
        { k: '連絡', v: 'X / Telegram' }
      ],
      en: [
        { k: 'Languages', v: 'JP / EN' },
        { k: 'Focus', v: 'MC / AMA / Community / Content' },
        { k: 'Contact', v: 'X / Telegram' }
      ]
    }
  },
  works: {
    listMeta: {
      ja: {
        title: '実績一覧｜Aki',
        description:
          'MC/AMA、コミュニティ運営、コンテンツ制作の実績。課題→施策→結果→証拠リンクでまとめています。'
      },
      en: {
        title: 'Works | Aki',
        description:
          'MC/AMA, community ops, and content works. Each case: problem → actions → outcomes → proof.'
      }
    },
    items: [
      {
        slug: 'stakestone-jp-community',
        dateRange: '2024.06 - 2024.08',
        title: { ja: 'StakeStone JP', en: 'StakeStone JP' },
        summary: {
          ja: '公式SNS立ち上げ〜運用、イベント動員、連携施策まで。日本コミュニティの“回る型”を作る。',
          en: 'From social launch to operations, events, and partnerships. Built repeatable loops for Japan community.'
        },
        roleTags: ['Community', 'BD'],
        metrics: [
          { label: 'JP account', value: '0 → ~1,200 followers' },
          { label: 'Offline events', value: '5 sessions / ~150 attendees total' }
        ],
        detail: {
          ja: {
            sections: [
              {
                h: '課題',
                p: '日本での認知と参加導線を作り、コミュニティが“続く状態”を作る。'
              },
              {
                h: 'やったこと',
                list: [
                  '公式SNSの立ち上げ・運用（投稿設計/反応の型）',
                  'イベントオペレーション（動員/当日導線）',
                  '連携施策（KOL/メディア/コミュニティ）'
                ]
              },
              {
                h: '結果',
                list: [
                  'フォロワー 0 → 約1,200（目安）',
                  'オフイベント合計5回、累計約150名動員'
                ]
              },
              {
                h: '補足',
                p: '参加のハードルを下げると、コアが増える。まず入口を軽く。'
              }
            ]
          },
          en: {
            sections: [
              {
                h: 'Problem',
                p: 'Build awareness and participation loops for Japan, and keep momentum over time.'
              },
              {
                h: 'Actions',
                list: [
                  'Launched and operated official social cadence',
                  'Event operations and attendee flows',
                  'Partnerships with KOL/media/communities'
                ]
              },
              {
                h: 'Outcomes',
                list: [
                  '0 → ~1,200 followers (approx.)',
                  '5 offline events / ~150 attendees total'
                ]
              },
              {
                h: 'Note',
                p: 'Lower friction grows core members. Start with the entry point.'
              }
            ]
          }
        }
      },
      {
        slug: 'boarding-bridge-ama-host',
        dateRange: '2023.11 - 2024.02',
        title: { ja: 'boarding bridge', en: 'boarding bridge' },
        summary: {
          ja: '日英AMAの進行・議題設計。コメントが動く質問とテンポで視聴体験を改善。',
          en: 'JP/EN AMA hosting and agenda design. Improved engagement with better questions and pacing.'
        },
        roleTags: ['AMA/MC', 'Event'],
        metrics: [
          { label: 'Avg comments', value: '~1,000' },
          { label: 'Avg listeners', value: '~500' }
        ],
        detail: {
          ja: {
            sections: [
              {
                h: '課題',
                p: 'AMAが“聞いて終わり”になりがち。理解と盛り上がりを両立し、行動につなげる。'
              },
              {
                h: 'やったこと',
                list: [
                  '議題と質問の設計（盛り上がる順）',
                  'テンポ設計（長くならない/置いていかない）',
                  '要点回収（最後に次の一手）'
                ]
              },
              {
                h: '結果（目安）',
                list: [
                  '平均コメント 約1,000',
                  'アーカイブ含む平均リスナー 約500'
                ]
              },
              {
                h: '補足',
                p: 'コメントが動かない時は、まず質問の角度を変える。'
              }
            ]
          },
          en: {
            sections: [
              {
                h: 'Problem',
                p: 'AMAs often end as passive listening. We needed clarity + engagement + next actions.'
              },
              {
                h: 'Actions',
                list: ['Agenda and question design', 'Pacing and transitions', 'Clean recap with a next step']
              },
              {
                h: 'Outcomes (approx.)',
                list: ['~1,000 comments on average', '~500 listeners including archive']
              },
              {
                h: 'Note',
                p: 'If engagement drops, change the question angle first.'
              }
            ]
          }
        }
      },
      {
        slug: 'mantle-creator-awards',
        dateRange: '2024.03',
        title: { ja: 'Mantle（Creator Awards）', en: 'Mantle (Creator Awards)' },
        summary: {
          ja: '応募600名以上の中からトップ表彰。企画と見せ方の“差別化”で評価。',
          en: 'Top recognition among 600+ applicants. Awarded for unique concepts and storytelling.'
        },
        roleTags: ['Content'],
        metrics: [{ label: 'Applicants', value: '600+ (as stated)' }],
        detail: {
          ja: {
            sections: [
              { h: '課題', p: '難しい領域を、面白く伝わる形に落とす。' },
              {
                h: 'やったこと',
                list: ['企画（視点の差別化）', '構成（短く・具体に）', '表現（伝わる見せ方）']
              },
              { h: '結果', list: ['トップ表彰（応募600名以上の中）'] },
              { h: '補足', p: '伝え方が変わると、理解の速度が変わる。' }
            ]
          },
          en: {
            sections: [
              { h: 'Problem', p: 'Make complex topics fun and understandable.' },
              {
                h: 'Actions',
                list: ['Unique angle', 'Short, concrete structure', 'Clear storytelling and visuals']
              },
              { h: 'Outcome', list: ['Top recognition among 600+ applicants'] },
              { h: 'Note', p: 'Better framing changes the speed of understanding.' }
            ]
          }
        }
      }
    ]
  },
  mediaKit: {
    meta: {
      ja: {
        title: 'メディアキット｜Aki',
        description:
          'プロフィール・提供内容・実績・連絡先が1枚で分かる資料。PDFと、ページ版の両方で用意。相談はX/TelegramでOK。'
      },
      en: {
        title: 'Media Kit | Aki',
        description:
          'One-page overview: profile, services, works, contacts. PDF + page version. DM via X/Telegram.'
      }
    },
    hero: {
      kicker: { ja: 'MEDIA KIT', en: 'MEDIA KIT' },
      title: { ja: 'メディアキット', en: 'Media Kit' },
      lead: {
        ja: '「何ができる人？」が一瞬で分かる1枚。\n提案資料や社内共有にもそのまま使えます。',
        en: 'A one-page overview you can forward internally.\nClear, fast, and ready to use.'
      }
    },
    includes: {
      ja: [
        'サービス一覧（MC/AMA・Community・Content）',
        '実績サマリ（指名実績・受賞）',
        '対応言語と連絡先（X/Telegram）'
      ],
      en: [
        'Services (MC/AMA, Community, Content)',
        'Works summary (cases, awards)',
        'Languages + contacts (X/Telegram)'
      ]
    },
    useCases: {
      ja: ['イベント・AMA検討', '提案資料の共有', '社内合意の資料に'],
      en: ['Considering an event/AMA', 'Sharing proposal context', 'Internal alignment']
    },
    buttons: {
      pdf: { ja: 'PDFをダウンロード', en: 'Download PDF' },
      x: { ja: 'Xで相談', en: 'Message on X' },
      telegram: { ja: 'Telegramで相談', en: 'Message on Telegram' }
    },
    note: {
      ja: 'PDFがなくても、このページをそのまま転送でOK。',
      en: 'Even without the PDF, this page is forward-ready.'
    }
  }
} as const;
