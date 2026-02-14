import type { Profile, Service, Settings, Work, WorkDetailSection } from '@/lib/microcms';
import { copyPack } from '@/lib/copy-pack';

export const mockSettings: Settings = {
  x_profile_url: copyPack.settings.links.x_profile_url,
  telegram_url: copyPack.settings.links.telegram_url,
  youtube_url: copyPack.settings.links.youtube_url,
  media_kit_pdf_url: '/media-kit.pdf',
  hero_copy_ja: copyPack.home.hero.sub.ja,
  hero_copy_en: copyPack.home.hero.sub.en,
  hero_heading_ja: copyPack.home.hero.heading.ja,
  hero_heading_en: copyPack.home.hero.heading.en,
  hero_sub_ja: copyPack.home.hero.sub.ja,
  hero_sub_en: copyPack.home.hero.sub.en,
  highlights_ja: [...copyPack.home.highlights.ja],
  highlights_en: [...copyPack.home.highlights.en],
  home_meta_title_ja: copyPack.home.meta.ja.title,
  home_meta_title_en: copyPack.home.meta.en.title,
  home_meta_desc_ja: copyPack.home.meta.ja.description,
  home_meta_desc_en: copyPack.home.meta.en.description,
  dm_template_ja: copyPack.global.dmTemplate.ja,
  dm_template_en: copyPack.global.dmTemplate.en,
  gallery_enabled: true,
  gallery_title_ja: copyPack.gallery.title.ja,
  gallery_title_en: copyPack.gallery.title.en,
  gallery_note_ja: copyPack.gallery.note.ja,
  gallery_note_en: copyPack.gallery.note.en,
  gallery_items: copyPack.gallery.items.map((item, index) => ({
    image: {
      url: `/images/gallery/${String(index + 1).padStart(2, '0')}.png`,
      width: 1000,
      height: 1000
    },
    caption_ja: item.caption_ja,
    caption_en: item.caption_en,
    tag: item.tag,
    href: 'href' in item ? item.href : undefined
  }))
};

const buildMcBody = () => {
  const hero = copyPack.servicesPages.mc.hero;
  const what = copyPack.servicesPages.mc.whatYouGet;
  const deliver = copyPack.servicesPages.mc.deliverables;
  return [
    `<p>${hero.lead.ja}</p>`,
    `<blockquote>${hero.note.ja}</blockquote>`,
    `<h3>${what.title.ja}</h3>`,
    `<ul>${what.items.ja.map((item) => `<li>${item}</li>`).join('')}</ul>`,
    `<h3>${deliver.title.ja}</h3>`,
    `<ul>${deliver.items.ja.map((item) => `<li>${item}</li>`).join('')}</ul>`
  ].join('');
};

const buildCommunityBody = () => {
  const hero = copyPack.servicesPages.community.hero;
  const items = copyPack.servicesPages.community.items;
  return [
    `<p>${hero.lead.ja}</p>`,
    `<blockquote>${hero.note.ja}</blockquote>`,
    `<ul>${items.ja.map((item) => `<li>${item}</li>`).join('')}</ul>`
  ].join('');
};

const buildContentBody = () => {
  const hero = copyPack.servicesPages.content.hero;
  const items = copyPack.servicesPages.content.items;
  return [
    `<p>${hero.lead.ja}</p>`,
    `<blockquote>${hero.note.ja}</blockquote>`,
    `<ul>${items.ja.map((item) => `<li>${item}</li>`).join('')}</ul>`
  ].join('');
};

export const mockServices: Service[] = [
  {
    id: 'service-mc',
    type: 'mc',
    body_ja: buildMcBody(),
    body_en: [
      `<p>${copyPack.servicesPages.mc.hero.lead.en}</p>`,
      `<blockquote>${copyPack.servicesPages.mc.hero.note.en}</blockquote>`,
      `<h3>${copyPack.servicesPages.mc.whatYouGet.title.en}</h3>`,
      `<ul>${copyPack.servicesPages.mc.whatYouGet.items.en
        .map((item) => `<li>${item}</li>`)
        .join('')}</ul>`,
      `<h3>${copyPack.servicesPages.mc.deliverables.title.en}</h3>`,
      `<ul>${copyPack.servicesPages.mc.deliverables.items.en
        .map((item) => `<li>${item}</li>`)
        .join('')}</ul>`
    ].join(''),
    meta_title_ja: copyPack.servicesPages.mc.meta.ja.title,
    meta_title_en: copyPack.servicesPages.mc.meta.en.title,
    meta_desc_ja: copyPack.servicesPages.mc.meta.ja.description,
    meta_desc_en: copyPack.servicesPages.mc.meta.en.description,
    pricing_enabled: copyPack.servicesPages.mc.pricing.enabled,
    pricing_title_ja: copyPack.servicesPages.mc.pricing.title.ja,
    pricing_title_en: copyPack.servicesPages.mc.pricing.title.en,
    pricing_items: [...copyPack.servicesPages.mc.pricing.items],
    pricing_disclaimer_ja: copyPack.servicesPages.mc.pricing.disclaimer.ja,
    pricing_disclaimer_en: copyPack.servicesPages.mc.pricing.disclaimer.en
  },
  {
    id: 'service-community',
    type: 'community',
    body_ja: buildCommunityBody(),
    body_en: [
      `<p>${copyPack.servicesPages.community.hero.lead.en}</p>`,
      `<blockquote>${copyPack.servicesPages.community.hero.note.en}</blockquote>`,
      `<ul>${copyPack.servicesPages.community.items.en
        .map((item) => `<li>${item}</li>`)
        .join('')}</ul>`
    ].join(''),
    meta_title_ja: copyPack.servicesPages.community.meta.ja.title,
    meta_title_en: copyPack.servicesPages.community.meta.en.title,
    meta_desc_ja: copyPack.servicesPages.community.meta.ja.description,
    meta_desc_en: copyPack.servicesPages.community.meta.en.description,
    pricing_enabled: false
  },
  {
    id: 'service-content',
    type: 'content',
    body_ja: buildContentBody(),
    body_en: [
      `<p>${copyPack.servicesPages.content.hero.lead.en}</p>`,
      `<blockquote>${copyPack.servicesPages.content.hero.note.en}</blockquote>`,
      `<ul>${copyPack.servicesPages.content.items.en
        .map((item) => `<li>${item}</li>`)
        .join('')}</ul>`
    ].join(''),
    meta_title_ja: copyPack.servicesPages.content.meta.ja.title,
    meta_title_en: copyPack.servicesPages.content.meta.en.title,
    meta_desc_ja: copyPack.servicesPages.content.meta.ja.description,
    meta_desc_en: copyPack.servicesPages.content.meta.en.description,
    pricing_enabled: false
  }
];

export const mockProfile: Profile = {
  title_ja: copyPack.profile.title.ja,
  title_en: copyPack.profile.title.en,
  bio_ja: copyPack.profile.bio.ja,
  bio_en: copyPack.profile.bio.en,
  strengths_ja: [...copyPack.profile.strengths.ja],
  strengths_en: [...copyPack.profile.strengths.en],
  activities_ja: [...copyPack.profile.activities.ja],
  activities_en: [...copyPack.profile.activities.en],
  photos: [
    {
      url: '/images/profile.png',
      width: 1000,
      height: 1000
    }
  ],
  meta_title_ja: copyPack.profile.meta.ja.title,
  meta_title_en: copyPack.profile.meta.en.title,
  meta_desc_ja: copyPack.profile.meta.ja.description,
  meta_desc_en: copyPack.profile.meta.en.description
};

const toSections = (
  sections: ReadonlyArray<{ h: string; p?: string; list?: ReadonlyArray<string> }>
): WorkDetailSection[] =>
  sections.map((section) => ({
    heading: section.h,
    body: section.p,
    list: section.list ? [...section.list] : undefined,
    tone:
      section.h.includes('現場メモ') ||
      section.h.includes('補足') ||
      section.h.includes('Field note') ||
      section.h.includes('Note')
      ? 'note'
      : 'default'
  }));

const workCoverImages: Record<string, { url: string; width: number; height: number }> =
  {
    'stakestone-jp-community': {
      url: '/images/works/stakestone.png',
      width: 1600,
      height: 900
    },
    'boarding-bridge-ama-host': {
      url: '/images/works/boarding-bridge.png',
      width: 1600,
      height: 900
    },
    'mantle-creator-awards': {
      url: '/images/works/mantle-creator-awards.png',
      width: 1600,
      height: 900
    }
  };

export const mockWorks: Work[] = copyPack.works.items.map((item, index) => ({
  id: `work-${index + 1}`,
  slug: item.slug,
  title_ja: item.title.ja,
  title_en: item.title.en,
  summary_ja: item.summary.ja,
  summary_en: item.summary.en,
  role_tags: [...item.roleTags],
  metrics: item.metrics.map((metric) => ({ ...metric })),
  proof_links: [],
  date_range: item.dateRange,
  cover_image: workCoverImages[item.slug],
  detail_sections_ja: toSections(item.detail.ja.sections),
  detail_sections_en: toSections(item.detail.en.sections)
}));
