# Sanity CMS 調査レポート（2026-03-07）
## 矢上家オフィシャルホームページ構築

## 推奨スタック

| 技術 | 役割 | 費用 |
|------|------|------|
| **Sanity** | コンテンツ管理（Headless CMS） | 無料（Freeプラン） |
| **Next.js** | フロントエンド（React） | 無料 |
| **Vercel** | ホスティング・デプロイ | 無料（Hobbyプラン） |
| **独自ドメイン** | yagami-family.com 等 | 約100円/月 |

**月額コスト：約100円（ドメイン代のみ）**

---

## Sanity Free プランの範囲

- ユーザー数: 3人まで（矢上さん1人なら余裕）
- API リクエスト: 100,000/月
- ストレージ: 10GB
- **家族のホームページには十分すぎる容量**

---

## なぜ WordPress ではなく Sanity？

| 項目 | WordPress | Sanity + Next.js |
|------|-----------|-----------------|
| 表示速度 | 普通〜遅い | 超高速（静的生成） |
| セキュリティ | プラグイン脆弱性あり | 攻撃面が小さい |
| カスタマイズ | テーマ依存 | 完全自由 |
| ランニングコスト | サーバー月1,000円〜 | 約100円/月 |
| 管理画面 | やや複雑 | 直感的・カスタム可能 |
| 学習コスト | 低い | やや高い（初回のみ） |

---

## プロジェクト構成案

```
yagami-family/
├── sanity/                    # Sanity Studio（管理画面）
│   ├── schemas/
│   │   ├── page.ts           # ページ
│   │   ├── familyMember.ts   # 家族メンバー
│   │   ├── post.ts           # ブログ記事
│   │   ├── gallery.ts        # ギャラリー
│   │   └── siteSettings.ts   # サイト設定
│   └── sanity.config.ts
├── nextjs/                    # フロントエンド
│   ├── app/
│   │   ├── page.tsx          # トップページ
│   │   ├── about/            # 家族紹介
│   │   ├── gallery/          # 写真ギャラリー
│   │   └── blog/             # ブログ
│   ├── components/
│   └── lib/
│       └── sanity.ts         # Sanity クライアント
└── package.json
```

---

## コンテンツスキーマ例

### familyMember（家族メンバー）
```typescript
{
  name: 'familyMember',
  title: '家族メンバー',
  fields: [
    { name: 'name', title: '名前', type: 'string' },
    { name: 'role', title: '役割', type: 'string' },
    { name: 'photo', title: '写真', type: 'image' },
    { name: 'bio', title: '自己紹介', type: 'text' },
    { name: 'hobbies', title: '趣味', type: 'array', of: [{ type: 'string' }] },
  ]
}
```

---

## セットアップ手順

1. **Sanity アカウント作成**: https://www.sanity.io/
2. **プロジェクト初期化**:
   ```bash
   npm create sanity@latest -- --project-id <ID> --dataset production
   ```
3. **Next.js セットアップ**:
   ```bash
   npx create-next-app@latest yagami-family-web
   ```
4. **Vercel にデプロイ**:
   ```bash
   vercel deploy
   ```
5. **独自ドメイン接続**: Vercel 管理画面から設定

---

## ページ構成案

- **トップページ**: 家族写真 + 一言メッセージ
- **家族紹介**: 各メンバーのプロフィール
- **ギャラリー**: 家族の写真・思い出
- **ブログ**: 家族の近況・イベント
- **リンク集**: 各事業サイトへのリンク

---

## 次のアクション
1. Sanity.io でアカウント作成
2. プロジェクト名・ドメイン名を決定
3. Claude Code でプロジェクト構築開始
