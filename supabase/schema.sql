-- 矢上家ライフセービング 目標管理 スキーマ
-- Supabase SQL Editor で実行

-- goals: シーズン目標・大会目標
create table if not exists goals (
  id uuid primary key default gen_random_uuid(),
  member text not null check (member in ('yuzuki', 'kiyoha', 'kenshow', 'family')),
  category text not null check (category in ('sea', 'land', 'pool')),
  title text not null,
  target_value text,
  current_value text,
  unit text,
  deadline date,
  notes text,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- tasks: ギャップを埋める作業
create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  goal_id uuid not null references goals(id) on delete cascade,
  title text not null,
  status text not null default 'todo' check (status in ('todo', 'doing', 'done')),
  due_date date,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_tasks_goal_id on tasks(goal_id);
create index if not exists idx_goals_member on goals(member);
create index if not exists idx_goals_category on goals(category);

-- updated_at 自動更新
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_goals_updated_at on goals;
create trigger trg_goals_updated_at before update on goals
  for each row execute function set_updated_at();

drop trigger if exists trg_tasks_updated_at on tasks;
create trigger trg_tasks_updated_at before update on tasks
  for each row execute function set_updated_at();

-- RLS: 閲覧オープン、書き込みはサーバー側 service_role からのみ
alter table goals enable row level security;
alter table tasks enable row level security;

drop policy if exists "goals read all" on goals;
create policy "goals read all" on goals for select using (true);

drop policy if exists "tasks read all" on tasks;
create policy "tasks read all" on tasks for select using (true);
-- 書き込みポリシーは作らない = anon からは書けない
-- 編集はサーバーアクションで service_role キーを使って実行する
