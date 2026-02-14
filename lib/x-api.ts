/**
 * X (Twitter) API v2 で @aki_playaxie の最新ツイートを取得する。
 * X_BEARER_TOKEN が未設定の場合は null を返し、静的フォールバックを使用する。
 * @see https://developer.x.com/en/docs/twitter-api/tweets/timelines/api-reference/get-users-id-tweets
 */

const X_USERNAME = 'aki_playaxie';
const X_API_BASE = 'https://api.twitter.com/2';

export type XTweet = {
  id: string;
  text: string;
  createdAt: string;
  /** 本文から抽出した最初の #タグ（なければ null） */
  tag: string | null;
};

/**
 * テキストから最初の #ハッシュタグを取得（# 除く）
 */
function extractFirstHashtag(text: string): string | null {
  const match = text.match(/#(\w[\w\u3040-\u309f\u30a0-\u30ff\u4e00-\u9faf]*)/u);
  return match ? match[1] : null;
}

/**
 * 最新3件のツイートを取得。API 未設定・エラー時は null。
 */
export async function getLatestTweets(maxResults = 3): Promise<XTweet[] | null> {
  const token = process.env.X_BEARER_TOKEN;
  if (!token?.trim()) return null;

  try {
    const userId = await getUserIdByUsername(X_USERNAME, token);
    if (!userId) return null;

    const tweets = await getUserTweets(userId, token, Math.max(maxResults, 5));
    if (!tweets?.length) return null;

    return tweets.slice(0, maxResults).map((t) => ({
      id: t.id,
      text: t.text,
      createdAt: t.created_at ?? '',
      tag: extractFirstHashtag(t.text)
    }));
  } catch {
    return null;
  }
}

async function getUserIdByUsername(username: string, bearerToken: string): Promise<string | null> {
  const res = await fetch(`${X_API_BASE}/users/by/username/${encodeURIComponent(username)}`, {
    headers: { Authorization: `Bearer ${bearerToken}` },
    next: { revalidate: 300 }
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { data?: { id: string } };
  return data.data?.id ?? null;
}

async function getUserTweets(
  userId: string,
  bearerToken: string,
  maxResults: number
): Promise<{ id: string; text: string; created_at?: string }[] | null> {
  const params = new URLSearchParams({
    max_results: String(maxResults),
    'tweet.fields': 'created_at',
    exclude: 'replies,retweets'
  });
  const res = await fetch(`${X_API_BASE}/users/${userId}/tweets?${params}`, {
    headers: { Authorization: `Bearer ${bearerToken}` },
    next: { revalidate: 300 }
  });
  if (!res.ok) return null;
  const data = (await res.json()) as { data?: { id: string; text: string; created_at?: string }[] };
  return data.data ?? null;
}

/** ツイートURLを生成 */
export function tweetUrl(tweetId: string, username: string = X_USERNAME): string {
  return `https://x.com/${username}/status/${tweetId}`;
}

const OEMBED_BASE = 'https://publish.twitter.com/oembed';

/**
 * 指定ツイートIDの oEmbed HTML を取得（APIキー不要）。
 * 認証不要で使える。ツイートIDは手動で更新すれば「表示したい最新3件」を切り替えられる。
 * @see https://developer.x.com/en/docs/twitter-for-websites/oembed-api
 */
export async function getTweetOEmbeds(
  tweetIds: string[],
  options?: { maxwidth?: number; omitScript?: boolean }
): Promise<{ id: string; html: string }[]> {
  const maxwidth = options?.maxwidth ?? 550;
  const omitScript = options?.omitScript ?? true;
  const results: { id: string; html: string }[] = [];

  for (const id of tweetIds.slice(0, 3)) {
    try {
      const url = `${OEMBED_BASE}?url=${encodeURIComponent(tweetUrl(id))}&maxwidth=${maxwidth}&omit_script=${omitScript}&hide_media=false&hide_thread=true`;
      const res = await fetch(url, { next: { revalidate: 600 } });
      if (!res.ok) continue;
      const data = (await res.json()) as { html?: string };
      if (data.html) results.push({ id, html: data.html });
    } catch {
      // skip
    }
  }
  return results;
}

/** 表示するツイートIDを取得（環境変数 X_TWEET_IDS またはデフォルト3件） */
export function getTweetIdsFromEnv(): string[] {
  const raw = process.env.X_TWEET_IDS;
  if (raw?.trim()) {
    return raw.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return ['1991436077920567426', '1976083871675580578', '1888149044922617963'];
}
