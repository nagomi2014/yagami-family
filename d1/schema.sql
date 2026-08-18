-- ============================================================
-- 矢上家ライフセービング 目標管理 スキーマ（Cloudflare D1 / SQLite）
--
--   ローカル: npm run db:local
--   本番    : npm run db:remote
--
-- 旧 supabase/schema.sql からの移植。Postgres との違い:
--   - uuid + gen_random_uuid() → TEXT。idはアプリ側で crypto.randomUUID() を入れる
--   - timestamptz → TEXT（ISO8601文字列）
--   - RLS は無い。書き込みは全てサーバーアクション経由で、
--     requireAdmin() を通らないと実行されない
-- ============================================================

-- goals: シーズン目標・大会目標
CREATE TABLE IF NOT EXISTS goals (
  id            TEXT PRIMARY KEY,
  member        TEXT NOT NULL CHECK (member IN ('yuzuki', 'kiyoha', 'kenshow', 'family')),
  category      TEXT NOT NULL CHECK (category IN ('sea', 'land', 'pool')),
  title         TEXT NOT NULL,
  target_value  TEXT,
  current_value TEXT,
  unit          TEXT,
  deadline      TEXT,
  notes         TEXT,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  updated_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- tasks: ギャップを埋める作業
CREATE TABLE IF NOT EXISTS tasks (
  id         TEXT PRIMARY KEY,
  goal_id    TEXT NOT NULL REFERENCES goals(id) ON DELETE CASCADE,
  title      TEXT NOT NULL,
  status     TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'doing', 'done')),
  due_date   TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now')),
  updated_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

CREATE INDEX IF NOT EXISTS idx_tasks_goal_id  ON tasks(goal_id);
CREATE INDEX IF NOT EXISTS idx_goals_member   ON goals(member);
CREATE INDEX IF NOT EXISTS idx_goals_category ON goals(category);

-- updated_at 自動更新（Postgres のトリガ関数を SQLite のトリガで置き換え）
-- WHEN 句は自己再帰よけ。updated_at 自体を書き換えた UPDATE では発火させない。
CREATE TRIGGER IF NOT EXISTS trg_goals_updated_at
AFTER UPDATE ON goals FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE goals SET updated_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now') WHERE id = OLD.id;
END;

CREATE TRIGGER IF NOT EXISTS trg_tasks_updated_at
AFTER UPDATE ON tasks FOR EACH ROW
WHEN NEW.updated_at = OLD.updated_at
BEGIN
  UPDATE tasks SET updated_at = strftime('%Y-%m-%dT%H:%M:%SZ', 'now') WHERE id = OLD.id;
END;
