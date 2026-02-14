/**
 * YouTube oEmbed でサムネ・タイトルを取得（APIキー不要）
 * https://www.youtube.com/oembed?url=...&format=json
 */

export type YouTubeVideo = {
  url: string;
  videoId: string;
  title: string;
  thumbnailUrl: string;
};

const OEMBED_BASE = 'https://www.youtube.com/oembed';

function extractVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname === 'youtu.be') return u.pathname.slice(1).replace(/\/.*/, '');
    return u.searchParams.get('v');
  } catch {
    return null;
  }
}

function normalizeUrl(videoId: string): string {
  return `https://www.youtube.com/watch?v=${videoId}`;
}

export async function getYouTubeVideo(url: string): Promise<YouTubeVideo | null> {
  const videoId = extractVideoId(url);
  if (!videoId) return null;
  const watchUrl = normalizeUrl(videoId);
  try {
    const res = await fetch(`${OEMBED_BASE}?url=${encodeURIComponent(watchUrl)}&format=json`, {
      next: { revalidate: 3600 }
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { title?: string; thumbnail_url?: string };
    return {
      url: watchUrl,
      videoId,
      title: data.title ?? 'YouTube',
      thumbnailUrl: data.thumbnail_url ?? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    };
  } catch {
    return { url: watchUrl, videoId, title: 'YouTube', thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` };
  }
}

export async function getYouTubeVideos(urls: string[]): Promise<YouTubeVideo[]> {
  const results = await Promise.all(urls.map((u) => getYouTubeVideo(u)));
  return results.filter((v): v is YouTubeVideo => v != null);
}
