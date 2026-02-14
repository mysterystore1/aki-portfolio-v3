import type { MetadataRoute } from 'next';
import { locales } from '@/lib/i18n';
import { getWorks } from '@/lib/microcms';
import { getBaseUrl } from '@/lib/seo';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = getBaseUrl();
  const works = await getWorks();
  const now = new Date();

  const staticPaths = locales.flatMap((locale) => [
    `/${locale}`,
    `/${locale}/services/mc`,
    `/${locale}/services/community`,
    `/${locale}/services/content`,
    `/${locale}/profile`,
    `/${locale}/works`,
    `/${locale}/media-kit`
  ]);

  const workPaths = locales.flatMap((locale) =>
    works.map((work) => `/${locale}/works/${work.slug}`)
  );

  return [...staticPaths, ...workPaths].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: now
  }));
}
