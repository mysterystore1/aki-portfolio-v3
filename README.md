# Aki Web3 Portfolio (Next.js + microCMS)

多言語（/jp /en）対応のポートフォリオサイトです。microCMSが未設定でもモックデータで動作します。

## Git / プッシュ

リモートを追加してプッシュする例（GitHub で新規リポジトリ作成後）:

```bash
git remote add origin https://github.com/あなたのユーザー名/aki-portfolio-v3.git
git branch -M main
git push -u origin main
```

## セットアップ

```bash
pnpm install
pnpm dev
```

## ランディング（新デザイン）

ダウンロードした `aki-site` HTML を移行したランディングページです。

- **URL**: `/jp/landing` または `/en/landing`
- **構成**: `app/[locale]/landing/`（blush テーマの CSS、スクロール連動ナビ・reveal アニメ）
- このルートでは既存のサイトヘッダー・フッターは表示されません

続きの編集は `app/[locale]/landing/page.tsx` と `app/[locale]/landing/landing.css` から行えます。

## スモークテスト（最優先）

```bash
pnpm build
pnpm start
```

以下を確認：

- `http://localhost:3000/jp` が表示される
- `/en` でENフォールバックとバッジ表示が出る
- `/works/[slug]` で画像比率が崩れない
- `/jp/landing` で新ランディング（ピンク系テーマ）が表示される

## ローカル画像配置

開発時にローカル画像を使う場合は `public/images` に配置します。

- ヒーロー画像: `public/images/hero-v2.png`
- ヒーロー背景: `public/images/hero-bg.png`
- プロフィール画像: `public/images/profile.png`
- 実績ハイライト（StakeStone）: `public/images/works/stakestone.png`
- 実績ハイライト（boarding bridge）: `public/images/works/boarding-bridge.png`
- 実績ハイライト（Mantle）: `public/images/works/mantle-creator-awards.png`
- ロゴ: `public/images/logo-v2.png`

## CMS優先 + ローカルfallback

- CMSに画像/テキストがあればそれを優先
- 無い場合は `public/images` の既定画像にフォールバック
- それも無い場合は `ImageFallback` でプレースホルダー表示
- Galleryは CMSが空 or disabled でも `public/images/gallery/01-12.png` を表示
- Worksは `cover_image` が無ければ `/images/works/<slug>.png` を使用
- ギャラリー画像: `public/images/gallery/01.png` 〜 `12.png`

※ 画像が未配置でもプレースホルダー表示されます。

## 環境変数

`.env.local` に以下を設定します。

```
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
SITE_URL=https://your-domain.com
MICROCMS_REVALIDATE=300
GA4_MEASUREMENT_ID=G-XXXXXXXXXX

# 任意（自動翻訳Webhook）
MICROCMS_WEBHOOK_SECRET=your-secret
OPENAI_API_KEY=your-openai-api-key
```

## microCMS モデル

### Settings（単一）
- `x_profile_url` (text)
- `telegram_url` (text)
- `youtube_url` (text)
- `media_kit_pdf_url` (text, optional)
- `hero_copy_ja` (text)
- `hero_copy_en` (text)
- `hero_heading_ja` (text)
- `hero_heading_en` (text)
- `hero_sub_ja` (text)
- `hero_sub_en` (text)
- `highlights_ja` (repeat text)
- `highlights_en` (repeat text)
- `home_meta_title_ja` (text)
- `home_meta_title_en` (text)
- `home_meta_desc_ja` (text)
- `home_meta_desc_en` (text)
- `dm_template_ja` / `dm_template_en` (textarea)
- `gallery_enabled` (boolean)
- `gallery_title_ja` / `gallery_title_en` (text)
- `gallery_note_ja` / `gallery_note_en` (text)
- `gallery_items` (repeat object)
  - `image` (image)
  - `caption_ja` / `caption_en` (text)
  - `tag` (text)
  - `href` (text, optional)

### Profile（単一）
- `title_ja` / `title_en` (text)
- `bio_ja` / `bio_en` (textarea)
- `strengths_ja` / `strengths_en` (repeat text)
- `activities_ja` / `activities_en` (repeat textarea)
- `photos` (repeat image)
- `meta_title_ja` / `meta_title_en` (text)
- `meta_desc_ja` / `meta_desc_en` (text)

### Works
- `slug` (text / unique)
- `title_ja` (text)
- `title_en` (text)
- `summary_ja` (text)
- `summary_en` (text)
- `role_tags` (text[] / select or repeat)
- `metrics` (repeat / label, value)
- `proof_links` (repeat / label, url)
- `cover_image` (image)
- `gallery_images` (image[] / repeat)
- `date_range` (text)
- `en_reviewed` (boolean)

### Services
- `type` (select: mc / community / content)
- `body_ja` (rich text or text)
- `body_en` (rich text or text)
- `meta_title_ja` (text)
- `meta_title_en` (text)
- `meta_desc_ja` (text)
- `meta_desc_en` (text)
- `pricing_enabled` (boolean)
- `pricing_title_ja` / `pricing_title_en` (text)
- `pricing_items` (repeat object)
  - `label_ja` / `value_ja` / `note_ja` (text)
  - `label_en` / `value_en` / `note_en` (text)
- `pricing_disclaimer_ja` / `pricing_disclaimer_en` (textarea)

## 自動翻訳Webhook（任意）

`/api/webhooks/microcms` にWebhookを設定してください。  
`MICROCMS_WEBHOOK_SECRET` を設定した場合、ヘッダー `x-webhook-secret` に同じ値を入れてください。

OpenAI APIキーがある場合のみ翻訳を実行し、ENの未入力フィールドを埋めます。  
翻訳済みでも `en_reviewed=false` として扱い、EN画面には `Auto-translated (review pending)` バッジが表示されます。

## GA4（イベント計測）

以下のイベントを計測します。

- `cta_x_click`
- `cta_telegram_click`
- `lang_switch`
- `work_open`
- `gallery_tile_click`
- `dm_template_copy`

## デプロイ（Vercel想定）

1. GitHubにpush
2. Vercelで新規プロジェクト作成
3. 環境変数を設定
4. `pnpm build` が通ることを確認
5. `/sitemap.xml` が想定ページを返すことを確認
6. Search Consoleに登録しサイトマップ送信

## 立ち上げの確認フロー（非エンジニア向け）

1. microCMSにモデル作成（Settings / Profile / Services / Works）
2. 初期コンテンツを投入（最低限でOK）
3. iPhoneから更新し「公開」→数分待って反映確認

## ルーティング

- `/jp` / `/en`
- `/jp/services/[mc|community|content]` / `/en/services/[mc|community|content]`
- `/jp/profile` / `/en/profile`
- `/jp/works` / `/en/works`
- `/jp/works/[slug]` / `/en/works/[slug]`
- `/jp/media-kit` / `/en/media-kit`

## iPhone更新フロー（非エンジニア向け）

1. microCMSの管理画面にログイン
2. Settings / Profile / Services / Works を編集
3. 変更後に「公開」ボタンを押す
4. 反映が必要なら数分待って再読み込み（ISR）

## デザイン方針

- Clean + Pop（余白多め、カードUI、タグチップ、数字バッジ）
- モバイル最適化
- 画像比率固定（16:9 / 4:5 / 1:1）

## 変更点（UI/UX）

- FieldNoteコンポーネントを共通化し、各ページに配置
- Works一覧に検索・タグフィルタ・Proof表示を追加
- Homeの判断導線を「Hero→Proof→Services→Works→Process→FAQ→Media Kit→CTA」に再編
- DMテンプレにCopyボタン＋トースト
- YouTubeサムネ3枚のハイライト追加
- FieldNoteの色ルール統一（Note=黄 / Proof=青）

## 主な追加ファイル

- `lib/copy-pack.ts`（コピーの単一ソース）
- `components/FieldNote.tsx`
- `components/WorksExplorer.tsx`
- `components/ContactPanel.tsx`
