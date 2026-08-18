import Link from "next/link";
import { fetchAllGoalsWithTasks } from "@/lib/goals/queries";
import { isSupabaseConfigured } from "@/lib/goals/supabase";
import { isAdminLoggedIn } from "@/lib/goals/auth";
import {
  CATEGORY_COLOR,
  CATEGORY_EMOJI,
  CATEGORY_LABEL,
  MEMBER_LABEL,
  MEMBER_NAME_EN,
  progressPct,
  type Category,
  type GoalWithTasks,
} from "@/lib/goals/types";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "目標 | 矢上家のライフセービング",
  description: "矢上家3兄弟のシーズン目標と日々のトレーニング進捗",
};

export default async function GoalsPage() {
  if (!isSupabaseConfigured()) {
    return <SetupNotice />;
  }

  const goals = await fetchAllGoalsWithTasks();
  const loggedIn = await isAdminLoggedIn();

  const byCategory: Record<Category, GoalWithTasks[]> = {
    sea: [],
    land: [],
    pool: [],
  };
  for (const g of goals) byCategory[g.category].push(g);

  const cats: Category[] = ["sea", "land", "pool"];

  return (
    <div className="pt-24 pb-24 px-5 bg-sand-pale min-h-screen">
      <div className="max-w-6xl mx-auto">
        <header className="mb-12 text-center">
          <p className="section-label justify-center">Family Goals</p>
          <h1 className="section-title mt-4 text-ocean-dark">
            目標と、
            <br className="sm:hidden" />
            今日の一歩。
          </h1>
          <p className="text-text-mid text-sm mt-4 leading-loose max-w-xl mx-auto">
            シーズンの目標 / 現在の記録 / 距離を埋めるタスク。
            <br />
            海・陸・プールの3カテゴリで管理しています。
          </p>
          <div className="mt-6">
            {loggedIn ? (
              <Link
                href="/goals/admin"
                className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full bg-ocean-mid text-white hover:bg-ocean-dark transition-colors font-[family-name:var(--font-display)] tracking-wider uppercase"
              >
                ✏️ Edit Goals
              </Link>
            ) : (
              <Link
                href="/goals/login"
                className="inline-flex items-center gap-2 text-xs px-4 py-2 rounded-full border border-ocean-mid/30 text-ocean-mid hover:bg-ocean-mid/5 transition-colors font-[family-name:var(--font-display)] tracking-wider uppercase"
              >
                🔒 Admin Login
              </Link>
            )}
          </div>
        </header>

        {goals.length === 0 ? (
          <EmptyState loggedIn={loggedIn} />
        ) : (
          <div className="space-y-16">
            {cats.map((cat) => {
              const list = byCategory[cat];
              if (list.length === 0) return null;
              return (
                <section key={cat}>
                  <CategoryHeading category={cat} count={list.length} />
                  <div className="grid md:grid-cols-2 gap-5 mt-6">
                    {list.map((g) => (
                      <GoalCard key={g.id} goal={g} />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function CategoryHeading({ category, count }: { category: Category; count: number }) {
  const c = CATEGORY_COLOR[category];
  return (
    <div className="flex items-center gap-4">
      <div
        className={`w-10 h-10 rounded-full ${c.bg} flex items-center justify-center text-lg shadow-sm`}
      >
        {CATEGORY_EMOJI[category]}
      </div>
      <div>
        <p className="text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-display)] text-text-light">
          {category}
        </p>
        <h2 className={`font-[family-name:var(--font-serif-jp)] text-xl font-bold ${c.text}`}>
          {CATEGORY_LABEL[category]}カテゴリ
          <span className="ml-2 text-xs text-text-light font-normal">/ {count}件</span>
        </h2>
      </div>
    </div>
  );
}

function GoalCard({ goal }: { goal: GoalWithTasks }) {
  const c = CATEGORY_COLOR[goal.category];
  const pct = progressPct(goal.tasks);
  const taskCount = goal.tasks.length;
  const doneCount = goal.tasks.filter((t) => t.status === "done").length;

  return (
    <Link
      href={`/goals/${goal.id}`}
      className={`group block bg-white rounded-2xl overflow-hidden border ${c.border} shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5`}
    >
      <div className={`h-2 bg-gradient-to-r ${c.gradient}`} />
      <div className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${c.bgSoft} ${c.text}`}
          >
            {CATEGORY_EMOJI[goal.category]} {CATEGORY_LABEL[goal.category]}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-sand-light text-text-mid">
            {MEMBER_LABEL[goal.member]}
          </span>
          {goal.deadline && (
            <span className="text-[10px] text-text-light ml-auto">期限 {goal.deadline}</span>
          )}
        </div>

        <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark leading-relaxed group-hover:text-ocean-mid transition-colors">
          {goal.title}
        </h3>

        <div className="grid grid-cols-2 gap-3 mt-4 text-center">
          <div className="bg-sand-pale rounded-lg p-3 border border-sand">
            <p className="text-[10px] text-text-light tracking-wider uppercase">目標</p>
            <p className={`font-mono font-bold mt-1 ${c.text}`}>
              {goal.target_value ?? "—"}
              {goal.unit && goal.target_value && (
                <span className="text-xs ml-0.5 font-normal text-text-mid">{goal.unit}</span>
              )}
            </p>
          </div>
          <div className="bg-sand-pale rounded-lg p-3 border border-sand">
            <p className="text-[10px] text-text-light tracking-wider uppercase">現在</p>
            <p className="font-mono font-bold mt-1 text-text-dark">
              {goal.current_value ?? "—"}
              {goal.unit && goal.current_value && (
                <span className="text-xs ml-0.5 font-normal text-text-mid">{goal.unit}</span>
              )}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-text-light tracking-wider uppercase font-[family-name:var(--font-display)]">
              Progress
            </span>
            <span className={`font-mono font-bold ${c.text}`}>
              {pct}% <span className="text-text-light font-normal">({doneCount}/{taskCount})</span>
            </span>
          </div>
          <div className="h-2 bg-sand rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r ${c.gradient} transition-all`}
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

function EmptyState({ loggedIn }: { loggedIn: boolean }) {
  return (
    <div className="bg-white rounded-2xl p-10 text-center border border-ocean-mid/10 shadow-sm">
      <div className="text-4xl mb-3">🎯</div>
      <p className="text-text-mid">まだ目標が登録されていません。</p>
      {loggedIn ? (
        <Link
          href="/goals/admin"
          className="inline-block mt-4 px-5 py-2.5 rounded-full bg-ocean-mid text-white text-sm hover:bg-ocean-dark transition-colors"
        >
          目標を追加する →
        </Link>
      ) : (
        <Link
          href="/goals/login"
          className="inline-block mt-4 px-5 py-2.5 rounded-full bg-ocean-mid text-white text-sm hover:bg-ocean-dark transition-colors"
        >
          ログインして追加 →
        </Link>
      )}
    </div>
  );
}

function SetupNotice() {
  return (
    <div className="pt-24 pb-24 px-5 bg-sand-pale min-h-screen">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-ocean-mid/10">
        <h1 className="font-[family-name:var(--font-serif-jp)] text-xl font-bold text-ocean-dark">
          🛠 Supabase のセットアップが必要です
        </h1>
        <p className="text-sm text-text-mid mt-3 leading-loose">
          このページを使うには Supabase プロジェクトを作成し、
          <br />
          <code className="bg-sand-light px-1 rounded">yagami-family/.env.local</code>{" "}
          に下記キーを追加してください：
        </p>
        <pre className="bg-ocean-deep text-ocean-light text-xs p-4 rounded-lg mt-4 overflow-x-auto">{`NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
GOALS_ADMIN_PASSWORD=家族の合言葉`}</pre>
        <p className="text-xs text-text-light mt-4">
          詳しい手順は <code>yagami-family/supabase/SETUP.md</code> を参照
        </p>
      </div>
    </div>
  );
}
