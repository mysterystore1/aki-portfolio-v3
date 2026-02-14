# Workspace Analysis Baseline

最終更新: 2026-02-14 16:37:44
対象:
- `c:\work\projects`
- `c:\work\_shared\ai`

## 1. 全体構造（AI運用視点）

### 共通ハブ（shared-ai）
- `shared-ai/SKILL.md`: 共通運用ルール
- `shared-ai/PROJECTS.md`: プロジェクト別ルール台帳
- `shared-ai/codex-gate/SKILL.md`: 反復レビューゲート
- `shared-ai/.cursor/rules/*.mdc`: 共通ルール群（自律/Workflow/Security/Git/Policy）
- `shared-ai/.cursor/agents/*.md`: チーム編成用エージェント定義

### プロジェクト側（主に有効化済み）
- `Akiポートフォリオサイト`
  - `.cursor/agents/*.md`（planner/frontend/logic/tester/security-reviewer）
  - `.cursor/hooks.json`
  - `.cursor/hooks/grind.ts`
  - `.cursor/hooks/run-tests.sh`
  - `.cursor/skills/full-feature/SKILL.md`
  - `.cursor/skills/test-and-fix/SKILL.md`
- `ParallelAgentsStarter`
  - `.cursor/rules/*.mdc`（autonomy/nextjs/workflow/yolo policy）
  - `.cursor/hooks.json`
  - `.cursor/hooks/security-scan.ps1`
  - `.cursor/hooks/grind.ts`
  - `.cursor/hooks/run-tests.sh`
  - `.cursor/skills/security-review/SKILL.md`
  - `.cursor/worktrees.json`

## 2. いまの自動実行フロー（要約）

1. 起点は `shared-ai/.cursorrules.shared` と `shared-ai/SKILL.md`
2. タスク受領時:
   - planner で計画
   - frontend / logic を並列実装
   - tester / security-reviewer で検証
3. 編集後:
   - format
   - test
   - （ParallelAgentsStarter は）secret scan
4. 停止時:
   - grind 実行（テスト再チェック）
   - （設定に応じて）security scan
5. コミット前:
   - security gate
   - codex-gate レビュー

## 3. ルール/Skill/Agent の責務分離

### Rules
- `000-autonomy.mdc`: 完全自律 + 自動チーム編成
- `001-nextjs.mdc`: Aki向け参照順と技術前提
- `002-workflow.mdc`: Plan→Execute→Test→Review→Commit
- `003-security.mdc`: セキュリティ原則（秘密情報/入力/API）
- `004-git.mdc`: コミット運用
- `005-security-gate.mdc`: コミット前ゲート
- `006-yolo-command-policy.mdc`: 危険コマンド抑止

### Skills
- `codex-gate/SKILL.md`: レビュー反復の枠組み
- `Aki/.cursor/skills/test-and-fix`: テスト失敗時の自動修正ループ
- `Aki/.cursor/skills/full-feature`: 新機能完結フロー
- `ParallelAgentsStarter/.cursor/skills/security-review`: シークレット検出前提のレビュー

### Agents
- planner / frontend / logic / tester / security-reviewer を shared と Aki の両方で定義

## 4. 現状ギャップ（改善優先）

- `shared-ai` 側に `security-review` スキル本体が未配置（参照はされる）
- Aki には `.cursor/rules` がなく、shared側ルール依存が強い
- フック定義がプロジェクト間で微妙に差分（scan有無など）
- `PROJECTS.md` の未記入セクションが多く、判断材料が不足しやすい

## 5. 今後の「まとめて分析」手順（再利用）

毎回この順で差分点検する:
1. `shared-ai/SKILL.md` と `shared-ai/PROJECTS.md` を読む
2. `**/.cursor/rules/*.mdc` を棚卸し
3. `**/.cursor/agents/*.md` を棚卸し
4. `**/.cursor/skills/**/SKILL.md` を棚卸し
5. `**/.cursor/hooks.json` と hooks スクリプトを確認
6. 前回 `WORKSPACE_ANALYSIS.md` と比較して差分を追記

## 6. 次に自動化すべき項目（提案）

- `shared-ai/.cursor/skills/security-review/SKILL.md` を正式追加（参照先を一致）
- Aki に `rules/` を追加して shared 依存を明文化
- hooks を共通テンプレート化（shared 管理）
- `PROJECTS.md` の空欄セクション埋め

## 7. 今回反映した改善（実施済み）

- `shared-ai/.cursor/skills/security-review/SKILL.md` を追加
- `Akiポートフォリオサイト/.cursor/rules/000-shared-ai-baseline.mdc` を追加
- `Akiポートフォリオサイト/.cursor/hooks/security-scan.ps1` を追加
- `Akiポートフォリオサイト/.cursor/hooks.json` に security scan を追加
- `shared-ai/.cursor/templates/hooks/` に hooks 共通テンプレートを追加
