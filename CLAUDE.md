# CLAUDE.md

## このファイルの役割
Claude Code が最初に読むプロジェクト指示書。
詳細ルールは `_shared/ai/` に集約されている。

## 参照順（必ずこの順で読むこと）
1. このファイル（CLAUDE.md）
2. `_shared/ai/SKILL.md` — ワークスペース共通ルール
3. `_shared/ai/PROJECTS.md` — 該当プロジェクトのセクション
4. プロジェクトの README.md / package.json / 設定ファイル

## 衝突時の優先度
PROJECTS.md（プロジェクト固有） > SKILL.md（共通） > このファイル

## スコープ
- このリポジトリ配下のみ操作可能
- ワークスペース外へのアクセス・変更は禁止
- `_shared/ai/**` は参照のみ（編集禁止）

## コンテンツ SSOT
- Aki のプロフィール・実績データ → `_shared/ai/AKI_DATA.md`
- サイトコンテンツ変更時は必ずこのファイルを参照すること

## Codex レビューゲート（任意）
- 大規模変更時は `_shared/ai/codex-gate/SKILL.md` のフローに従う
- Codex CLI 未導入の場合はスキップ可

## Codex 連携
- Codex（AGENTS.md）はレビュー専用。コード変更権限なし
- 大規模変更後のレビュー依頼時は `_shared/ai/codex-gate/SKILL.md` のフローに従う
- Codex の出力（JSON）を受け取り、修正を実施するのは Claude Code の責務
