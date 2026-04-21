# VRT Sample: Storybook + storycap + reg-suit

Storybookで書いたストーリーを`storycap`でスクリーンショット化し、`reg-suit`で差分検知するミニマムサンプルです。
devcontainer付属なので、VS Code の「Reopen in Container」一発で試せます。

## 構成

| ツール | 役割 |
|---|---|
| **Storybook** | コンポーネントのストーリー（状態）を一覧化 |
| **storycap** | Storybookを巡回してスクリーンショットを `__screenshots__/` に出力 |
| **reg-suit** | `__screenshots__/`（actual）と `.reg/expected/`（baseline）をピクセル比較、HTML レポート生成 |

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

### 2. Storybook を目視確認（任意）

```bash
npm run storybook
```

→ http://localhost:6006 で `Button` / `Card` / `Badge` のストーリーが閲覧できます。

### 3. 初回：ベースライン取得

```bash
# Storybook を静的ビルド → storycap でスクショ取得
npm run build-storybook
npm run vrt:capture

# __screenshots__/ を .reg/expected/ にコピーしてベースライン化
npm run vrt:baseline
```

`.reg/expected/` に PNG が保存されたら準備完了です。

### 4. 差分検知を体験する

試しにコンポーネントを意図的に変えてみましょう。

**例：`src/components/Button/Button.tsx` のプライマリ色を変更**

```diff
 primary: {
-  background: 'var(--color-primary)',
+  background: '#10b981', // 緑に変更
   color: '#ffffff',
-  border: '1px solid var(--color-primary)',
+  border: '1px solid #10b981',
 },
```

再度キャプチャして比較：

```bash
npm run build-storybook
npm run vrt:capture
npm run vrt:run
```

コンソールに差分件数が出力され、`.reg/index.html` に HTML レポートが生成されます。

### 5. レポートを見る

```bash
npm run vrt:report
```

→ http://localhost:8080 で差分レポート（before / after / diff の3枚表示）が開きます。

### 6. 変更を承認する（新ベースラインとして採用）

差分が期待通りなら、新しいスクショをベースラインに昇格：

```bash
npm run vrt:baseline
```

## スクリプト一覧

| コマンド | 内容 |
|---|---|
| `npm run storybook` | Storybook を開発モードで起動（:6006） |
| `npm run build-storybook` | Storybook を静的ビルド |
| `npm run vrt:capture` | storycap でスクショ取得 → `__screenshots__/` |
| `npm run vrt:baseline` | 現在のスクショをベースラインに昇格 |
| `npm run vrt:run` | reg-suit で比較＋HTML レポート生成 |
| `npm run vrt:report` | `.reg/index.html` をブラウザで開く |
| `npm run vrt:all` | build → capture → run をまとめて実行 |

## 設定のポイント

### 複数ビューポートのキャプチャ

`.storybook/preview.ts` でグローバル設定：

```ts
parameters: {
  screenshot: {
    viewports: {
      sp: { width: 375, height: 667 },
      pc: { width: 1280, height: 800 },
    },
  },
}
```

各ストーリーごとに個別の `viewports`、`delay`、`fullPage`、`waitFor` などを指定することもできます。

### ストーリー単位で設定を上書き

```ts
export const WithAnimation: Story = {
  args: { ... },
  parameters: {
    screenshot: {
      delay: 500, // アニメーション終了を待つ
      fullPage: true,
    },
  },
};
```

### 特定ストーリーをスキップ

```ts
export const InteractiveOnly: Story = {
  parameters: {
    screenshot: { skip: true },
  },
};
```

### 差分閾値の調整

`regconfig.json` の `thresholdRate` を `0.01` 等にすると、アンチエイリアシング由来の微細差を無視できます。
`thresholdPixel` でピクセル数指定も可能です。

## ディレクトリ構成

```
.
├── .devcontainer/          # Dev Container 設定（Node 22 + Chromium）
├── .storybook/             # Storybook 設定 + storycap 連携
├── src/
│   ├── components/
│   │   ├── Button/
│   │   ├── Card/
│   │   └── Badge/
│   └── index.css
├── __screenshots__/        # storycap 出力（actual）※ gitignore
├── .reg/
│   ├── expected/           # ベースライン（前回のスクショ）
│   ├── actual/             # 今回のスクショのコピー
│   ├── diff/               # 差分画像
│   └── index.html          # レポート
├── regconfig.json          # reg-suit 設定
└── package.json
```

## 実運用に向けた発展

このサンプルは「ローカルで手動ベースライン管理」のシンプル構成です。
チーム運用に乗せる場合は以下を検討してください。

- **reg-keygen-git-hash-plugin**：ベースラインをコミットハッシュで自動紐付け
- **reg-publish-s3-plugin / reg-publish-gcs-plugin**：スクショをクラウドに保存してチームで共有
- **reg-notify-github-plugin**：PR に差分レポート URL をコメント
- **CI 統合**：GitHub Actions 等で PR ごとに自動比較
