# 矢上家 目標管理アプリ Supabaseセットアップ

## 1. Supabaseプロジェクト作成（5分）

1. https://supabase.com にアクセスして GitHub等でログイン
2. **New Project** をクリック
3. 設定：
   - Organization: 任意（無ければNew Organization作成）
   - Name: `yagami-family-goals`
   - Database Password: 強いパスワードを生成して**控える**（後でほぼ使わないがDBアクセスに必要）
   - Region: `Northeast Asia (Tokyo)` ap-northeast-1
   - Plan: **Free**（無料）
4. **Create new project** をクリック → 1〜2分待つ

## 2. テーブル作成（1分）

1. プロジェクトが起動したら左メニューから **SQL Editor** を開く
2. **New query** をクリック
3. このリポジトリの `supabase/schema.sql` の中身を**全部コピペ**
4. 右下の **Run** をクリック（Success と表示されればOK）

## 3. APIキー取得（1分）

1. 左下の歯車アイコン（**Project Settings**）→ **API**
2. 以下の3つをコピー：
   - **Project URL** （例: `https://xxxxx.supabase.co`）
   - **Project API keys → anon / public**
   - **Project API keys → service_role**（⚠️絶対公開しない）

## 4. .env.local に貼り付け

`yagami-family/.env.local` を開いて以下を埋める：

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...（anon key）
SUPABASE_SERVICE_ROLE_KEY=eyJ...（service_role key）
GOALS_ADMIN_PASSWORD=家族の合言葉をここに（例：yagami2026）
```

## 5. Vercel本番デプロイ用にも環境変数を追加

Vercelダッシュボード → yagami-family プロジェクト → **Settings** → **Environment Variables**

上記4つを全部追加して **Save**。

その後、最新コミットを **Redeploy** すれば本番にも反映される。

## 6. ローカル起動して確認

```bash
cd yagami-family
npm run dev
```

- 一覧: http://localhost:3000/goals
- ログイン: http://localhost:3000/goals/login
- 編集: http://localhost:3000/goals/admin

## トラブルシュート

### 「Supabase 未設定」と表示される
→ `.env.local` を保存したあと、`npm run dev` を**再起動**してください（Next.jsは環境変数を再読込しません）

### 編集ボタンを押すと「認証されていません」エラー
→ ブラウザのCookieが切れています。`/goals/login` から再ログインしてください

### 削除した目標を元に戻したい
→ Supabase Dashboard → **Table Editor** → goals テーブルで直接INSERTできます（ただし基本的には削除＝完全削除です）
