# kurousa.dev

フルスタックエンジニア **kurousa** の個人ポートフォリオサイトです。  
Astro（SSG）＋ TypeScript ＋ Tailwind CSS v4 ＋ Content Collections で構築し、Cloudflare Pages へ静的ホスティングします。

## 技術スタック

- **Framework**: Astro（Static Site Generation）+ TypeScript
- **Styling**: Tailwind CSS v4（ダークテーマデフォルト・ライト/ダーク切替対応）
- **Content**: Astro Content Collections（`src/content/projects/*.md`）
- **Zenn連携**: ビルド時に `https://zenn.dev/user_thebigslee/feed` の RSS を取得して一覧表示（取得失敗時はビルドを落とさずフォールバックUIを表示）
- **Hosting**: Cloudflare Pages（`https://kurousa.dev`）

## ローカル開発・ビルド

```bash
npm install
npm run dev      # 開発サーバー起動 (http://localhost:4321)
npm run build    # 本番用静的ビルド (dist/ へ出力)
npm run preview  # ビルド結果のローカル確認
```

## 制作物（Projects）の追加方法

`src/content/projects/` 配下に Markdown ファイル（例: `my-new-project.md`）を追加します。

```markdown
---
title: "project-name"
summary: "プロジェクトの1〜2行の概要"
tech:
  - "TypeScript"
  - "FastAPI"
githubUrl: "https://github.com/kurousa/project-name"
articleUrl: "https://zenn.dev/user_thebigslee/articles/..."
demoUrl: "https://example.kurousa.dev"
date: 2026-11-23
featured: false
order: 2
---

## 概要

Markdown で詳細を記述します。
```

## Zenn 記事連携とフォールバック

- `src/lib/zenn.ts` がビルド時に Zenn の RSS フィードを取得し、最新6件を `Articles` セクションへ表示します。
- ネットワーク障害・タイムアウト（8秒）・HTTPエラー発生時は警告ログのみを出力し、ビルドを失敗させずに Zenn プロフィールへのフォールバック案内を表示します。
- 新しい Zenn 記事を公開したあとにサイトへ反映したい場合は、Cloudflare Pages の **Deploy Hook** または再デプロイを実行してください。

## Cloudflare Pages デプロイ手順

1. GitHub 上に `kurousa/kurousa.dev` リポジトリを作成し、本リポジトリを `main` ブランチへ push します。
2. Cloudflare ダッシュボード → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** から `kurousa/kurousa.dev` を選択します。
3. ビルド設定を入力します：
   - **Production branch**: `main`
   - **Framework preset**: `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment variables（任意）**: `NODE_VERSION` = `22`（または `24`）
4. デプロイ完了後、Pages プロジェクトの **Custom domains** から `kurousa.dev` を追加します（Cloudflare Registrar 管理ドメインのため DNS レコードは自動設定されます）。
5. `www.kurousa.dev` を `kurousa.dev` へリダイレクトする場合は、Custom domains に `www.kurousa.dev` も追加するか DNS にプレースホルダーレコードを置いたうえで、ドメインの **Rules → Redirect Rules**（Single Redirect）にてホスト名 `www.kurousa.dev` → `https://kurousa.dev${http.request.uri.path}`（301）を設定してください。
