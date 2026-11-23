export interface InterestItem {
  title: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export interface SocialLink {
  label: string;
  handle: string;
  url: string;
  description: string;
}

export const siteMeta = {
  title: 'kurousa.dev — kurousa | フルスタックエンジニア',
  description:
    'フルスタックエンジニア kurousa のポートフォリオサイト。AIエージェント、パーソナルナレッジベース、Web開発の制作物や技術記事をまとめています。',
  url: 'https://kurousa.dev',
  author: 'kurousa',
} as const;

export const profile = {
  name: 'kurousa',
  role: 'フルスタックエンジニア',
  heroLead:
    'AIエージェント・LLMの社会実装から、バックエンド・フロントエンド・インフラまで一貫して手がけるフルスタックエンジニア。日常の課題を技術で気持ちよく解決するプロダクトづくりが好きです。',
  about:
    'Python / TypeScript / Rust を軸に、Webアプリケーションの設計・開発からデプロイ・運用まで幅広く取り組んでいます。近年は「AIの柔軟さ」と「プログラムによる決定論的な検証」を組み合わせた実用的なAIアプリや、個人の知的生産を支えるパーソナルナレッジベースの構築に注力しています。',
  zennFeedUrl: 'https://zenn.dev/user_thebigslee/feed',
  zennProfileUrl: 'https://zenn.dev/user_thebigslee',
  interests: [
    {
      title: 'AIエージェント & 実用LLMアプリ',
      description:
        '制約条件の機械検証や、ローカルLLM・クラウドLLMのハイブリッド設計',
    },
    {
      title: 'パーソナルナレッジベース & DX',
      description:
        '日々の思考や開発ログを自動で構造化・活用する仕組みづくり',
    },
    {
      title: 'フルスタックWeb開発 & インフラ運用',
      description:
        'FastAPI / モダンフロントエンド / Docker・Cloudflare・さくらインターネットを用いた個人開発〜本番公開',
    },
  ] satisfies InterestItem[],
  skills: [
    {
      category: 'Languages',
      items: ['Python', 'TypeScript', 'Rust'],
    },
    {
      category: 'Backend',
      items: ['FastAPI'],
    },
    {
      category: 'Frontend',
      items: ['Vue.js', 'Nuxt.js', 'React', 'Next.js', 'Astro'],
    },
    {
      category: 'Database',
      items: ['SQLite', 'MongoDB'],
    },
    {
      category: 'Infra / Cloud',
      items: ['Docker', 'Cloudflare', 'Vercel', 'Sakura Internet'],
    },
  ] satisfies SkillGroup[],
  links: [
    {
      label: 'GitHub',
      handle: '@kurousa',
      url: 'https://github.com/kurousa',
      description: 'ソースコード・OSS・個人開発リポジトリ',
    },
    {
      label: 'Zenn',
      handle: '@user_thebigslee',
      url: 'https://zenn.dev/user_thebigslee',
      description: '設計論・開発ログ・技術検証記事',
    },
    {
      label: 'Qiita',
      handle: '@kurousa',
      url: 'https://qiita.com/kurousa',
      description: '技術メモ・Tips・学習アウトプット',
    },
  ] satisfies SocialLink[],
} as const;
