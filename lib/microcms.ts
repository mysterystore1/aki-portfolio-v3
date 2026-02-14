import {
  mockProfile,
  mockServices,
  mockSettings,
  mockWorks
} from '@/lib/mock-data';

export type MicroCMSImage = {
  url: string;
  width: number;
  height: number;
};

export type Settings = {
  x_profile_url: string;
  telegram_url: string;
  youtube_url: string;
  media_kit_pdf_url?: string;
  hero_copy_ja?: string;
  hero_copy_en?: string;
  hero_heading_ja?: string;
  hero_heading_en?: string;
  hero_sub_ja?: string;
  hero_sub_en?: string;
  highlights_ja?: string[];
  highlights_en?: string[];
  home_meta_title_ja?: string;
  home_meta_title_en?: string;
  home_meta_desc_ja?: string;
  home_meta_desc_en?: string;
  dm_template_ja?: string;
  dm_template_en?: string;
  gallery_enabled?: boolean;
  gallery_title_ja?: string;
  gallery_title_en?: string;
  gallery_note_ja?: string;
  gallery_note_en?: string;
  gallery_items?: GalleryItem[];
};

export type WorkMetric = {
  label: string;
  value: string;
};

export type ProofLink = {
  label: string;
  url: string;
};

export type GalleryItem = {
  image?: MicroCMSImage;
  caption_ja: string;
  caption_en?: string;
  tag?: string;
  href?: string;
};

export type WorkDetailSection = {
  heading: string;
  body?: string;
  list?: string[];
  tone?: 'note' | 'default';
};

export type Work = {
  id: string;
  slug: string;
  title_ja: string;
  title_en?: string;
  summary_ja: string;
  summary_en?: string;
  role_tags: string[];
  metrics: WorkMetric[];
  proof_links: ProofLink[];
  cover_image?: MicroCMSImage;
  gallery_images?: MicroCMSImage[];
  date_range?: string;
  en_reviewed?: boolean;
  detail_sections_ja?: WorkDetailSection[];
  detail_sections_en?: WorkDetailSection[];
};

export type ServiceType = 'mc' | 'community' | 'content';

export type PricingItem = {
  label_ja: string;
  value_ja: string;
  note_ja?: string;
  label_en?: string;
  value_en?: string;
  note_en?: string;
};

export type Service = {
  id: string;
  type: ServiceType;
  body_ja: string;
  body_en?: string;
  meta_title_ja?: string;
  meta_title_en?: string;
  meta_desc_ja?: string;
  meta_desc_en?: string;
  pricing_enabled?: boolean;
  pricing_title_ja?: string;
  pricing_title_en?: string;
  pricing_items?: PricingItem[];
  pricing_disclaimer_ja?: string;
  pricing_disclaimer_en?: string;
};

export type Profile = {
  title_ja: string;
  title_en?: string;
  bio_ja: string;
  bio_en?: string;
  strengths_ja?: string[];
  strengths_en?: string[];
  activities_ja?: string[];
  activities_en?: string[];
  photos?: MicroCMSImage[];
  meta_title_ja?: string;
  meta_title_en?: string;
  meta_desc_ja?: string;
  meta_desc_en?: string;
};

type MicroCMSList<T> = {
  contents: T[];
  totalCount: number;
  offset: number;
  limit: number;
};

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;
const revalidateSeconds = Number(process.env.MICROCMS_REVALIDATE ?? 300);

const fallbackString = (value: string | undefined, fallback?: string) =>
  value && value.trim().length > 0 ? value : fallback ?? '';

const fallbackArray = <T>(value: T[] | undefined, fallback: T[]) =>
  Array.isArray(value) && value.length > 0 ? value : fallback;

const buildLocalWorkCover = (slug?: string): MicroCMSImage | undefined =>
  slug
    ? {
        url: `/images/works/${slug}.png`,
        width: 1600,
        height: 900
      }
    : undefined;

const normalizeWork = (work: Partial<Work>): Work => {
  const mock = mockWorks.find((item) => item.slug === work.slug);
  const slug = fallbackString(work.slug, mock?.slug ?? '');
  const titleJa = fallbackString(work.title_ja, mock?.title_ja ?? slug);
  const summaryJa = fallbackString(work.summary_ja, mock?.summary_ja ?? '');
  const coverImage = work.cover_image ?? mock?.cover_image ?? buildLocalWorkCover(slug);

  return {
    id: work.id ?? mock?.id ?? slug,
    slug,
    title_ja: titleJa,
    title_en: fallbackString(
      work.title_en || '',
      mock?.title_en || mock?.title_ja || titleJa
    ),
    summary_ja: summaryJa,
    summary_en: fallbackString(
      work.summary_en || '',
      mock?.summary_en || mock?.summary_ja || summaryJa
    ),
    role_tags: fallbackArray(work.role_tags, mock?.role_tags ?? []),
    metrics: fallbackArray(work.metrics, mock?.metrics ?? []),
    proof_links: fallbackArray(work.proof_links, mock?.proof_links ?? []),
    cover_image: coverImage,
    gallery_images: fallbackArray(work.gallery_images, mock?.gallery_images ?? []),
    date_range: fallbackString(work.date_range, mock?.date_range ?? ''),
    en_reviewed: work.en_reviewed ?? mock?.en_reviewed,
    detail_sections_ja: fallbackArray(
      work.detail_sections_ja,
      mock?.detail_sections_ja ?? []
    ),
    detail_sections_en: fallbackArray(
      work.detail_sections_en,
      mock?.detail_sections_en ?? []
    )
  };
};

const normalizeService = (service: Partial<Service>): Service => {
  const mock = mockServices.find((item) => item.type === service.type);
  const type = (service.type ?? mock?.type ?? 'mc') as ServiceType;

  return {
    id: service.id ?? mock?.id ?? type,
    type,
    body_ja: fallbackString(service.body_ja, mock?.body_ja ?? ''),
    body_en: fallbackString(
      service.body_en || '',
      mock?.body_en || mock?.body_ja || service.body_ja || ''
    ),
    meta_title_ja: fallbackString(
      service.meta_title_ja || '',
      mock?.meta_title_ja || ''
    ),
    meta_title_en: fallbackString(
      service.meta_title_en || '',
      mock?.meta_title_en || mock?.meta_title_ja || ''
    ),
    meta_desc_ja: fallbackString(
      service.meta_desc_ja || '',
      mock?.meta_desc_ja || ''
    ),
    meta_desc_en: fallbackString(
      service.meta_desc_en || '',
      mock?.meta_desc_en || mock?.meta_desc_ja || ''
    ),
    pricing_enabled: service.pricing_enabled ?? mock?.pricing_enabled ?? false,
    pricing_title_ja: fallbackString(
      service.pricing_title_ja || '',
      mock?.pricing_title_ja || ''
    ),
    pricing_title_en: fallbackString(
      service.pricing_title_en || '',
      mock?.pricing_title_en || mock?.pricing_title_ja || ''
    ),
    pricing_items: fallbackArray(
      service.pricing_items,
      mock?.pricing_items ?? []
    ),
    pricing_disclaimer_ja: fallbackString(
      service.pricing_disclaimer_ja || '',
      mock?.pricing_disclaimer_ja || ''
    ),
    pricing_disclaimer_en: fallbackString(
      service.pricing_disclaimer_en || '',
      mock?.pricing_disclaimer_en || mock?.pricing_disclaimer_ja || ''
    )
  };
};

const normalizeSettings = (settings: Partial<Settings>): Settings => ({
  x_profile_url: fallbackString(
    settings.x_profile_url,
    mockSettings.x_profile_url
  ),
  telegram_url: fallbackString(
    settings.telegram_url,
    mockSettings.telegram_url
  ),
  youtube_url: fallbackString(settings.youtube_url, mockSettings.youtube_url),
  media_kit_pdf_url: fallbackString(
    settings.media_kit_pdf_url || '',
    mockSettings.media_kit_pdf_url || '/media-kit.pdf'
  ),
  hero_copy_ja: fallbackString(settings.hero_copy_ja, mockSettings.hero_copy_ja),
  hero_copy_en: fallbackString(
    settings.hero_copy_en || '',
    mockSettings.hero_copy_en || ''
  ),
  hero_heading_ja: fallbackString(
    settings.hero_heading_ja || '',
    mockSettings.hero_heading_ja || ''
  ),
  hero_heading_en: fallbackString(
    settings.hero_heading_en || '',
    mockSettings.hero_heading_en || ''
  ),
  hero_sub_ja: fallbackString(
    settings.hero_sub_ja || '',
    mockSettings.hero_sub_ja || ''
  ),
  hero_sub_en: fallbackString(
    settings.hero_sub_en || '',
    mockSettings.hero_sub_en || ''
  ),
  highlights_ja: fallbackArray(
    settings.highlights_ja,
    mockSettings.highlights_ja || []
  ),
  highlights_en: fallbackArray(
    settings.highlights_en,
    mockSettings.highlights_en || []
  ),
  home_meta_title_ja: fallbackString(
    settings.home_meta_title_ja || '',
    mockSettings.home_meta_title_ja || ''
  ),
  home_meta_title_en: fallbackString(
    settings.home_meta_title_en || '',
    mockSettings.home_meta_title_en || ''
  ),
  home_meta_desc_ja: fallbackString(
    settings.home_meta_desc_ja || '',
    mockSettings.home_meta_desc_ja || ''
  ),
  home_meta_desc_en: fallbackString(
    settings.home_meta_desc_en || '',
    mockSettings.home_meta_desc_en || ''
  ),
  dm_template_ja: fallbackString(
    settings.dm_template_ja || '',
    mockSettings.dm_template_ja || ''
  ),
  dm_template_en: fallbackString(
    settings.dm_template_en || '',
    mockSettings.dm_template_en || ''
  ),
  gallery_enabled: settings.gallery_enabled ?? mockSettings.gallery_enabled ?? false,
  gallery_title_ja: fallbackString(
    settings.gallery_title_ja || '',
    mockSettings.gallery_title_ja || ''
  ),
  gallery_title_en: fallbackString(
    settings.gallery_title_en || '',
    mockSettings.gallery_title_en || ''
  ),
  gallery_note_ja: fallbackString(
    settings.gallery_note_ja || '',
    mockSettings.gallery_note_ja || ''
  ),
  gallery_note_en: fallbackString(
    settings.gallery_note_en || '',
    mockSettings.gallery_note_en || ''
  ),
  gallery_items: fallbackArray(
    settings.gallery_items,
    mockSettings.gallery_items || []
  )
});

const normalizeProfile = (profile: Partial<Profile>): Profile => ({
  title_ja: fallbackString(profile.title_ja, mockProfile.title_ja),
  title_en: fallbackString(
    profile.title_en || '',
    mockProfile.title_en || mockProfile.title_ja
  ),
  bio_ja: fallbackString(profile.bio_ja, mockProfile.bio_ja),
  bio_en: fallbackString(
    profile.bio_en || '',
    mockProfile.bio_en || mockProfile.bio_ja
  ),
  strengths_ja: fallbackArray(
    profile.strengths_ja,
    mockProfile.strengths_ja || []
  ),
  strengths_en: fallbackArray(
    profile.strengths_en,
    mockProfile.strengths_en || []
  ),
  activities_ja: fallbackArray(
    profile.activities_ja,
    mockProfile.activities_ja || []
  ),
  activities_en: fallbackArray(
    profile.activities_en,
    mockProfile.activities_en || []
  ),
  photos: fallbackArray(profile.photos, mockProfile.photos || []),
  meta_title_ja: fallbackString(
    profile.meta_title_ja || '',
    mockProfile.meta_title_ja || mockProfile.title_ja
  ),
  meta_title_en: fallbackString(
    profile.meta_title_en || '',
    mockProfile.meta_title_en || mockProfile.title_en || mockProfile.title_ja
  ),
  meta_desc_ja: fallbackString(
    profile.meta_desc_ja || '',
    mockProfile.meta_desc_ja || mockProfile.bio_ja
  ),
  meta_desc_en: fallbackString(
    profile.meta_desc_en || '',
    mockProfile.meta_desc_en || mockProfile.bio_en || mockProfile.bio_ja
  )
});

function buildUrl(endpoint: string, params?: Record<string, string>) {
  const base = `https://${serviceDomain}.microcms.io/api/v1${endpoint}`;
  const url = new URL(base);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value) url.searchParams.set(key, value);
    });
  }

  return url.toString();
}

async function fetchMicroCMS<T>(endpoint: string, params?: Record<string, string>) {
  if (!serviceDomain || !apiKey) {
    throw new Error('microCMS credentials are missing');
  }

  const res = await fetch(buildUrl(endpoint, params), {
    headers: {
      'X-MICROCMS-API-KEY': apiKey
    },
    next: { revalidate: revalidateSeconds }
  });

  if (!res.ok) {
    throw new Error(`microCMS fetch failed: ${res.status}`);
  }

  return (await res.json()) as T;
}

export async function getSettings(): Promise<Settings> {
  try {
    const data = await fetchMicroCMS<Settings>('/settings');
    return normalizeSettings(data);
  } catch {
    return normalizeSettings(mockSettings);
  }
}

export async function getWorks(): Promise<Work[]> {
  try {
    const data = await fetchMicroCMS<MicroCMSList<Work>>('/works', {
      orders: '-publishedAt',
      limit: '100'
    });
    return data.contents.length
      ? data.contents.map((work) => normalizeWork(work))
      : mockWorks.map((work) => normalizeWork(work));
  } catch {
    return mockWorks.map((work) => normalizeWork(work));
  }
}

export async function getWorkBySlug(slug: string): Promise<Work | undefined> {
  try {
    const data = await fetchMicroCMS<MicroCMSList<Work>>('/works', {
      filters: `slug[equals]${slug}`,
      limit: '1'
    });
    return data.contents[0] ? normalizeWork(data.contents[0]) : undefined;
  } catch {
    const fallback = mockWorks.find((work) => work.slug === slug);
    return fallback ? normalizeWork(fallback) : undefined;
  }
}

export async function getServices(): Promise<Service[]> {
  try {
    const data = await fetchMicroCMS<MicroCMSList<Service>>('/services', {
      limit: '100'
    });
    if (!data.contents.length) {
      return mockServices.map((service) => normalizeService(service));
    }
    const normalized = data.contents.map((service) => normalizeService(service));
    const existingTypes = new Set(normalized.map((service) => service.type));
    const withFallbacks = [
      ...normalized,
      ...mockServices
        .filter((service) => !existingTypes.has(service.type))
        .map((service) => normalizeService(service))
    ];
    return withFallbacks;
  } catch {
    return mockServices.map((service) => normalizeService(service));
  }
}

export async function getServiceByType(
  type: ServiceType
): Promise<Service | undefined> {
  const services = await getServices();
  return (
    services.find((service) => service.type === type) ||
    mockServices.find((service) => service.type === type)
  );
}

export async function getProfile(): Promise<Profile> {
  try {
    const data = await fetchMicroCMS<Profile>('/profile');
    return normalizeProfile(data);
  } catch {
    return normalizeProfile(mockProfile);
  }
}
