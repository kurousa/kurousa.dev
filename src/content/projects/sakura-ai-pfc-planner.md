---
title: "sakura-ai-pfc-planner"
summary: "自宅の調理器具制約（1口IH・電子レンジ・オーブン・クッキングケトル）と高タンパク・低脂質（PFC）制約を機械検証で守りながら7日間献立を生成するWebアプリ"
tech:
  - "さくらのAI Engine"
  - "FastAPI"
  - "Pydantic"
  - "SQLite"
  - "Docker Compose"
  - "Caddy"
  - "さくらのVPS"
githubUrl: "https://github.com/kurousa/sakura-ai-pfc-planner"
articleUrl: "https://zenn.dev/user_thebigslee/articles/sakura-ai-engine-pfc-planner"
date: 2026-11-23
featured: true
order: 1
---

## 概要

宅配などで届いた1週間分の手持ち食材リストから、**高タンパク・低脂質（PFCバランス重視）**の7日間献立を自動生成するWebアプリケーションです。

汎用的なAIチャットに献立作成を依頼すると、自宅にない調理器具を前提にしたレシピが混ざったり、指定した食材や栄養バランスの制約が崩れたりする課題がありました。本アプリでは **LLM（さくらのAI Engine）による献立提案** と **プログラムによる機械的な制約検証** を組み合わせることで、実行可能で破綻のない献立を安定して生成できるようにしています。

## 解決した課題と工夫

- **自宅キッチンの実態に即した制約条件**: 「1口IH・電子レンジ・オーブン・クッキングケトル」という調理器具の制約を明示的に扱い、実際に自宅で作れる手順・レシピへ落とし込みます。
- **Pydantic による構造化出力と決定論的チェック**: さくらのAI Engine（OpenAI互換API）から構造化データとして献立を取得し、FastAPI / Pydantic 側で型や制約を機械的に検証します。
- **シンプルで再現性の高い構成**: データベースに SQLite を採用し、Docker Compose + Caddy 構成でさくらのVPS上へそのままデプロイ・運用できる構成としています。

## 技術構成

- **LLM API**: さくらのAI Engine（OpenAI互換API）
- **Backend**: FastAPI, Pydantic
- **Database**: SQLite
- **Infrastructure**: Docker Compose, Caddy, さくらのVPS
