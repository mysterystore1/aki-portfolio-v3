import { NextResponse } from 'next/server';

const glossary = [
  'StakeStone',
  'boarding bridge',
  'AMA',
  'KOL',
  'DeFi',
  'NFT',
  'BD',
  'Web3'
];

const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
const apiKey = process.env.MICROCMS_API_KEY;
const webhookSecret = process.env.MICROCMS_WEBHOOK_SECRET;
const openaiApiKey = process.env.OPENAI_API_KEY;

type WebhookPayload = {
  api?: 'works' | 'services' | 'settings' | 'profile';
  id?: string;
  contents?: Record<string, unknown>;
};

async function translateJaToEn(text: string) {
  if (!openaiApiKey) return null;

  const prompt = `
You are a translation assistant for Web3 content.
Keep the following terms exactly as-is if they appear:
${glossary.join(', ')}

Translate the following Japanese into concise, professional English:
${text}
`;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${openaiApiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2
    })
  });

  if (!res.ok) return null;
  const data = (await res.json()) as {
    choices?: Array<{ message?: { content?: string } }>;
  };
  return data.choices?.[0]?.message?.content?.trim() || null;
}

async function updateMicroCMS(api: string, id: string, body: Record<string, unknown>) {
  if (!serviceDomain || !apiKey) return;

  await fetch(`https://${serviceDomain}.microcms.io/api/v1/${api}/${id}`, {
    method: 'PATCH',
    headers: {
      'X-MICROCMS-API-KEY': apiKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
}

export async function POST(req: Request) {
  if (webhookSecret) {
    const incoming = req.headers.get('x-webhook-secret');
    if (incoming !== webhookSecret) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  }

  const payload = (await req.json()) as WebhookPayload;
  const { api, id, contents } = payload;

  if (!api || !id || !contents) {
    return NextResponse.json({ message: 'Invalid payload' }, { status: 400 });
  }

  if (api === 'works') {
    const patch: Record<string, unknown> = {};

    if (!contents.title_en && contents.title_ja) {
      const translated = await translateJaToEn(String(contents.title_ja));
      if (translated) patch.title_en = translated;
    }
    if (!contents.summary_en && contents.summary_ja) {
      const translated = await translateJaToEn(String(contents.summary_ja));
      if (translated) patch.summary_en = translated;
    }

    if (Object.keys(patch).length) {
      patch.en_reviewed = false;
      await updateMicroCMS('works', id, patch);
    }
  }

  if (api === 'services') {
    const patch: Record<string, unknown> = {};

    if (!contents.body_en && contents.body_ja) {
      const translated = await translateJaToEn(String(contents.body_ja));
      if (translated) patch.body_en = translated;
    }
    if (!contents.meta_title_en && contents.meta_title_ja) {
      const translated = await translateJaToEn(String(contents.meta_title_ja));
      if (translated) patch.meta_title_en = translated;
    }
    if (!contents.meta_desc_en && contents.meta_desc_ja) {
      const translated = await translateJaToEn(String(contents.meta_desc_ja));
      if (translated) patch.meta_desc_en = translated;
    }

    if (Object.keys(patch).length) {
      await updateMicroCMS('services', id, patch);
    }
  }

  if (api === 'profile') {
    const patch: Record<string, unknown> = {};

    if (!contents.title_en && contents.title_ja) {
      const translated = await translateJaToEn(String(contents.title_ja));
      if (translated) patch.title_en = translated;
    }
    if (!contents.bio_en && contents.bio_ja) {
      const translated = await translateJaToEn(String(contents.bio_ja));
      if (translated) patch.bio_en = translated;
    }

    if (!contents.strengths_en && Array.isArray(contents.strengths_ja)) {
      const translated = await Promise.all(
        contents.strengths_ja.map((item) => translateJaToEn(String(item)))
      );
      const sanitized = translated.filter(Boolean) as string[];
      if (sanitized.length) patch.strengths_en = sanitized;
    }

    if (!contents.activities_en && Array.isArray(contents.activities_ja)) {
      const translated = await Promise.all(
        contents.activities_ja.map((item) => translateJaToEn(String(item)))
      );
      const sanitized = translated.filter(Boolean) as string[];
      if (sanitized.length) patch.activities_en = sanitized;
    }

    if (Object.keys(patch).length) {
      await updateMicroCMS('profile', id, patch);
    }
  }

  return NextResponse.json({ message: 'ok' });
}
