# VRT Sample: Storybook + storycap + reg-suit + MSW

Storybookで書いたストーリーを`storycap`でスクリーンショット化し、`reg-suit`で差分検知するミニマムサンプルです。
**コンポーネント単位** と **ページ単位（プラン別分岐込み）** の両方をカバーし、
ページ単位のデータ取得は **MSW** でモック化しています。

devcontainer付属なので、VS Code の「Reopen in Container」一発で試せます。

## 構成

| ツール | 役割 |
|---|---|
| **Storybook** | コンポーネント・ページのストーリーを一覧化 |
| **storycap** | Storybookを巡回してスクリーンショットを `__screenshots__/` に出力 |
| **reg-suit** | `__screenshots__/`（actual）と `.reg/expected/`（baseline）をピクセル比較 |
| **MSW** | `fetch` を intercept してデータ取得を伴うページもストーリー化可能に |

## クイックスタート

### 前提

- Docker Desktop
- VS Code + Dev Containers 拡張機能

### 1. Dev Container で起動

```bash
# このフォルダを VS Code で開く
code .
# コマンドパレット（F1）→ "Dev Containers: Reopen in Container"
```

`postCreateCommand` で `npm install` が走ります（初回は数分）。

### 2. MSW の Service Worker を生成（初回のみ）

```bash
npm run msw:init
```

`public/mockServiceWorker.js` が生成されます。
Storybook は `.storybook/main.ts` の `staticDirs: ['../public']` で
このファイルを配信するので、MSW がブラウザ環境で動作します。

### 3. Storybook を目視確認（任意）

```bash
npm run storybook
```

→ http://localhost:6006 で以下が閲覧できます：

- `Components/Button` `Card` `Badge` — 小さい単位のストーリー
- `Pages/ArticlePageView (props-only)` — ページ単位（props直渡し）
- `Pages/ArticlePage (MSW)` — ページ単位（MSW経由のデータ取得）

### 4. 初回：ベースライン取得

```bash
npm run build-storybook
npm run vrt:capture
npm run vrt:baseline
```

### 5. 差分検知を体験

コンポーネントを変えて再キャプチャ：

```bash
npm run build-storybook
npm run vrt:capture
npm run vrt:run
```

### 6. レポート閲覧

```bash
npm run vrt:report
```

→ http://localhost:8080

## ストーリーの2つのスタイル

このサンプルでは、ページ単位のストーリーを**意図的に2パターン**用意しています。

### A. `ArticlePageView.stories.tsx` — props-only（推奨）

データを `article` propで直接渡す。

```tsx
export const PremiumPlan: Story = {
  args: { article: mockPremiumArticle },
};
```

| 利点 | 欠点 |
|---|---|
| ネットワーク非依存、完全決定的 | データ取得層は検証できない |
| キャプチャが速い・flakeしない | コンテナのロジックは通らない |
| VRTの本命向き | |

**VRTの大半はこちらで書くのがおすすめ。**

### B. `ArticlePage.stories.tsx` — MSW経由

`fetch()`を含むコンテナを、MSWハンドラで intercept して動かす。

```tsx
export const PremiumPlan: Story = {
  args: { articleId: 'premium-1' },
  parameters: {
    msw: {
      handlers: [
        http.get('/api/articles/:id', () => HttpResponse.json(mockPremiumArticle)),
      ],
    },
  },
};
```

| 利点 | 欠点 |
|---|---|
| 本番コードを変更不要 | 非同期待ち（`delay`設定）が必要 |
| ローディング・エラー状態も検証可能 | VRTでflakeのリスクあり |
| fetch層の不具合も拾える | |

Loading / Errorストーリーも含んでいるので、**データ取得中・エラー時のUIもVRT対象にできる**のがポイントです。

## プラン別分岐の扱い方

`src/pages/sectionVisibility.ts` にプラン分岐を**純粋関数として抽出**しています。

```ts
export function getSectionVisibility(tier: Tier): SectionVisibility {
  return {
    paywall: tier === 'free',
    comments: tier === 'premium' || tier === 'enterprise',
    related: tier === 'enterprise',
  };
}
```

これをコンポーネント側では宣言的に使う：

```tsx
const v = getSectionVisibility(article.tier);
// ...
{v.comments && <CommentsSection comments={article.comments} />}
{v.related && <RelatedArticles articles={article.related} />}
```

### なぜ分離するか

1. **ユニットテストで網羅可能** — `sectionVisibility.test.ts` を参照。React抜きで全プランを1msで検証できる
2. **JSXが読める** — 条件式が `(tier === 'premium' || tier === 'enterprise') && ...` のように散らばらない
3. **ルール変更の影響範囲が明確** — VRTで拾うのは「UI崩れ」、ユニットテストで拾うのは「分岐ルールの誤り」と役割分担できる

実行は以下：

```bash
node --import tsx --test src/pages/sectionVisibility.test.ts
```

## スクリプト一覧

| コマンド | 内容 |
|---|---|
| `npm run msw:init` | MSW の Service Worker ファイルを生成（初回のみ） |
| `npm run storybook` | Storybook を開発モードで起動（:6006） |
| `npm run build-storybook` | Storybook を静的ビルド |
| `npm run vrt:capture` | storycap でスクショ取得 → `__screenshots__/` |
| `npm run vrt:baseline` | 現在のスクショをベースラインに昇格 |
| `npm run vrt:run` | reg-suit で比較＋HTML レポート生成 |
| `npm run vrt:report` | `.reg/index.html` をブラウザで開く |
| `npm run vrt:all` | build → capture → run をまとめて実行 |

## ディレクトリ構成

```
.
├── .devcontainer/
├── .storybook/
│   ├── main.ts              # staticDirs で public/ を配信（MSW用）
│   └── preview.ts           # MSW initialize + storycap 設定
├── public/
│   └── mockServiceWorker.js # `npm run msw:init` で生成
├── src/
│   ├── api/
│   │   └── articleApi.ts    # fetch 実装（本番コード）
│   ├── components/
│   │   ├── Button/
│   │   ├── Card/
│   │   ├── Badge/
│   │   └── page-sections/   # ページを構成するセクション群
│   │       ├── ArticleHeader.tsx
│   │       ├── ArticleHero.tsx
│   │       ├── ArticleBody.tsx
│   │       ├── AuthorCard.tsx
│   │       ├── CommentsSection.tsx
│   │       └── RelatedArticles.tsx
│   ├── pages/
│   │   ├── ArticlePage.tsx               # コンテナ（fetch あり）
│   │   ├── ArticlePage.stories.tsx       # MSW経由のストーリー
│   │   ├── ArticlePageView.tsx           # プレゼンテーショナル
│   │   ├── ArticlePageView.stories.tsx   # props-only ストーリー
│   │   ├── sectionVisibility.ts          # 純粋関数（プラン分岐）
│   │   ├── sectionVisibility.test.ts     # ユニットテスト例
│   │   └── __mocks__/
│   │       └── articleData.ts            # 3プラン分のフィクスチャ
│   └── index.css
├── regconfig.json
└── package.json
```

## このサンプルで示している設計パターン

プラン別にセクションの出し分けがある大規模ページをVRTで安全に守るには、以下の3点セットが有効です。

### 1. コンテナ / プレゼンテーショナル分離

| 層 | 役割 | Storybook |
|---|---|---|
| `ArticlePage` | データ取得・状態管理 | MSWストーリーで検証 |
| `ArticlePageView` | 見た目のみ・props-only | propsストーリーで網羅 |

VRTの主戦場は**プレゼンテーショナル側**。ここさえ全プラン網羅していれば、見た目のリグレッションはほぼ防げます。

### 2. プラン分岐ルールの純粋関数化

`getSectionVisibility(tier)` のように**設定オブジェクトを返す関数**にまとめる。
JSX内に条件式を散らさない。ユニットテストで全プランの分岐ルールを担保。

### 3. モックデータをファイル化

`__mocks__/articleData.ts` のように**フィクスチャを資産化**する。
Storybookのストーリー、ユニットテスト、E2Eテストで使い回せる。

## 実運用に向けた発展

このサンプルは「ローカルで手動ベースライン管理」のシンプル構成です。チーム運用には：

- **reg-keygen-git-hash-plugin**：ベースラインをコミットハッシュで自動紐付け
- **reg-publish-s3-plugin / reg-publish-gcs-plugin**：スクショをクラウドに保存
- **reg-notify-github-plugin**：PRに差分レポートURLをコメント
- **CI統合**：GitHub Actions等でPRごとに自動比較

GraphQL環境では `fetch` の代わりに Apollo Client + `MockedProvider` でも同じことができます。
Next.js App Router の Server Component は Storybook で直接動かせないため、
「データ取得は Server Component、表示は Client Component」に分離する設計が相性が良いです。
