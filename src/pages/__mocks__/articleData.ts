import type { Article } from '../../api/articleApi';

const commonAuthor = {
  name: '山田 太郎',
  avatarUrl:
    'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" fill="%232563eb"/><text x="32" y="40" font-size="28" fill="white" text-anchor="middle" font-family="sans-serif">YT</text></svg>',
  bio: 'フロントエンドエンジニア。記事執筆歴10年。',
};

const commonHero =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400"><defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="%232563eb"/><stop offset="1" stop-color="%2310b981"/></linearGradient></defs><rect width="800" height="400" fill="url(%23g)"/><text x="400" y="210" font-size="36" fill="white" text-anchor="middle" font-family="sans-serif">Hero Image</text></svg>';

const commonBody = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
  'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.',
];

const commonComments = [
  {
    id: 'c1',
    author: '鈴木 一郎',
    content: 'とても参考になりました。続編期待しています！',
    createdAt: '2026-04-15',
  },
  {
    id: 'c2',
    author: '佐藤 花子',
    content: '似たような問題に直面していたので助かりました。',
    createdAt: '2026-04-16',
  },
];

const commonRelated = [
  {
    id: 'r1',
    title: '関連記事1: フロントエンド開発のベストプラクティス',
    excerpt: 'モダンなフロントエンド開発で押さえておきたいポイントをまとめました。',
  },
  {
    id: 'r2',
    title: '関連記事2: TypeScript の型安全な設計',
    excerpt: '実務で役立つ TypeScript の型設計パターンを紹介します。',
  },
  {
    id: 'r3',
    title: '関連記事3: テスト駆動開発入門',
    excerpt: 'TDD の基本から実践的なテスト戦略まで解説します。',
  },
];

export const mockFreeArticle: Article = {
  id: 'free-1',
  tier: 'free',
  title: '【無料記事】VRT入門：見た目のリグレッションを検知する方法',
  heroImageUrl: commonHero,
  publishedAt: '2026-04-10',
  body: commonBody.slice(0, 2), // Free plan gets only first 2 paragraphs
  tags: ['VRT', 'テスト', '入門'],
  author: commonAuthor,
  comments: [], // No comments for free tier
  related: [],
};

export const mockPremiumArticle: Article = {
  id: 'premium-1',
  tier: 'premium',
  title: '【プレミアム】VRT実践：Storybook + storycap + reg-suit の使い方',
  heroImageUrl: commonHero,
  publishedAt: '2026-04-12',
  body: commonBody,
  tags: ['VRT', 'Storybook', 'reg-suit', '実践'],
  author: commonAuthor,
  comments: commonComments,
  related: [], // No related for premium tier
};

export const mockEnterpriseArticle: Article = {
  id: 'enterprise-1',
  tier: 'enterprise',
  title: '【エンタープライズ】大規模プロジェクトでのVRT運用戦略',
  heroImageUrl: commonHero,
  publishedAt: '2026-04-18',
  body: commonBody,
  tags: ['VRT', 'エンタープライズ', '運用', 'CI/CD'],
  author: commonAuthor,
  comments: commonComments,
  related: commonRelated, // Full related for enterprise tier
};
