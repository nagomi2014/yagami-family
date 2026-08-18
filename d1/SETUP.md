# /goals のデータベース（Cloudflare D1）

## なぜ D1 なのか

もともと Supabase を使っていたが、**無料プランのプロジェクトが休眠削除で消滅**した
（2026-08-12 検知。教材アプリでも同じ事故が起きている → `apps/elife-textbook/RECOVERY.md`）。
D1 は Cloudflare アカウントに紐づくため、同じ消え方はしない。

| | 旧（Supabase） | 新（Cloudflare D1） |
|---|---|---|
| DB | Postgres | D1（SQLite） |
| 読み取り制御 | RLS ポリシー | 公開ページは読み取りのみ。書き込みはサーバーアクションで `requireAdmin()` を通す |
| 管理者セッション | Cookie にパスワードを直接保存 | 有効期限 + HMAC 署名（パスワードはブラウザに渡さない） |
| id | `gen_random_uuid()` | アプリ側で `crypto.randomUUID()` |

## データベース

- 名前：`yagami-family`
- ID：`4b213732-478a-4c79-b80c-9d5f782502ed`（リージョン APAC）
- バインディング：`DB`（`wrangler.jsonc`）

## 手順

### 1. スキーマ適用

```bash
npm run db:remote   # 本番
npm run db:local    # ローカル（npm run preview 用）
```

### 2. シークレット登録

```bash
npx wrangler secret put GOALS_ADMIN_PASSWORD   # /goals/admin のログインパスワード
npx wrangler secret put GOALS_SESSION_SECRET   # Cookie署名鍵（32文字以上のランダム）
```

`GOALS_SESSION_SECRET` は登録済み。`GOALS_ADMIN_PASSWORD` は運用者が決めて登録する。
未登録でも公開ページ（`/goals`）は読み取り専用で動く。管理画面のログインだけが使えない。

ローカルで動かすときは `.dev.vars.example` を `.dev.vars` にコピーして値を入れる
（`.dev.vars` は Git 管理外）。

### 3. デプロイ

```bash
npm run deploy
```

`build:cf` の中で `scripts/prune-assets.mjs` が走り、配信しないメディアを落とす。

## テーブル

- `goals` … シーズン目標・大会目標（member / category / title / target_value ほか）
- `tasks` … 目標にぶら下がる作業（status = todo / doing / done）

`tasks` は `ON DELETE CASCADE`。目標を削除するとタスクも消える（D1 で動作確認済み）。

## 手でデータを見る・直す

```bash
# 件数
npx wrangler d1 execute yagami-family --remote \
  --command "SELECT (SELECT COUNT(*) FROM goals) AS goals, (SELECT COUNT(*) FROM tasks) AS tasks"

# 一覧
npx wrangler d1 execute yagami-family --remote \
  --command "SELECT id, member, title FROM goals ORDER BY sort_order"
```

> **注意**：この PC のユーザー環境変数に古い `CLOUDFLARE_API_TOKEN` が残っており、
> そのままだと wrangler が認証エラー（code 10000）になる。
> 一時的に外して実行するか、トークンを更新すること。
