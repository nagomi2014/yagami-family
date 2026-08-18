import Link from "next/link";
import { redirect } from "next/navigation";
import { fetchAllGoalsWithTasks } from "@/lib/goals/queries";
import { isAdminLoggedIn } from "@/lib/goals/auth";
import {
  createGoalAction,
  updateGoalAction,
  deleteGoalAction,
  createTaskAction,
  updateTaskAction,
  deleteTaskAction,
  logoutAction,
} from "@/lib/goals/actions";
import {
  CATEGORY_COLOR,
  CATEGORY_EMOJI,
  CATEGORY_LABEL,
  MEMBER_LABEL,
  TASK_STATUS_LABEL,
  type Category,
  type GoalWithTasks,
  type Member,
  type TaskStatus,
} from "@/lib/goals/types";

export const dynamic = "force-dynamic";

const MEMBERS: Member[] = ["yuzuki", "kiyoha", "kenshow", "family"];
const CATS: Category[] = ["sea", "land", "pool"];
const STATUSES: TaskStatus[] = ["todo", "doing", "done"];

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  if (!(await isAdminLoggedIn())) redirect("/goals/login");

  const { edit } = await searchParams;
  const goals = await fetchAllGoalsWithTasks();
  const editingGoal = edit ? goals.find((g) => g.id === edit) ?? null : null;

  return (
    <div className="pt-24 pb-24 px-5 bg-sand-pale min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/goals"
              className="inline-flex items-center gap-1.5 text-text-mid hover:text-ocean-mid text-xs tracking-wider uppercase font-[family-name:var(--font-display)] transition-colors"
            >
              ← View
            </Link>
            <h1 className="section-title text-ocean-dark mt-2">目標管理</h1>
          </div>
          <form action={logoutAction}>
            <button
              type="submit"
              className="text-xs px-3 py-2 rounded-full border border-text-light/30 text-text-mid hover:bg-white transition-colors"
            >
              Logout
            </button>
          </form>
        </div>

        {/* 新規作成 */}
        <section className="bg-white rounded-2xl p-6 border border-ocean-mid/10 shadow-sm">
          <h2 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark mb-4">
            + 新しい目標を追加
          </h2>
          <GoalForm action={createGoalAction} />
        </section>

        {/* 既存ゴール一覧 */}
        <section className="mt-10">
          <h2 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark mb-4">
            既存の目標（{goals.length}件）
          </h2>
          {goals.length === 0 ? (
            <p className="text-sm text-text-light bg-white rounded-xl p-6 text-center border border-sand">
              まだ目標がありません。上のフォームから追加してください。
            </p>
          ) : (
            <div className="space-y-4">
              {goals.map((goal) => (
                <GoalEditBlock
                  key={goal.id}
                  goal={goal}
                  expanded={editingGoal?.id === goal.id}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function GoalEditBlock({ goal, expanded }: { goal: GoalWithTasks; expanded: boolean }) {
  const c = CATEGORY_COLOR[goal.category];
  return (
    <div className="bg-white rounded-2xl border border-sand shadow-sm overflow-hidden">
      <div className={`h-1 bg-gradient-to-r ${c.gradient}`} />
      <details className="group" open={expanded}>
        <summary className="cursor-pointer p-5 list-none flex items-center gap-3">
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${c.bgSoft} ${c.text}`}>
            {CATEGORY_EMOJI[goal.category]} {CATEGORY_LABEL[goal.category]}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-sand-light text-text-mid">
            {MEMBER_LABEL[goal.member]}
          </span>
          <span className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark flex-1">
            {goal.title}
          </span>
          <span className="text-xs text-text-light">{goal.tasks.length}タスク</span>
          <span className="text-text-light group-open:rotate-180 transition-transform">▾</span>
        </summary>

        <div className="px-5 pb-5 border-t border-sand pt-5">
          <h3 className="text-xs text-text-light tracking-wider uppercase mb-3">目標を編集</h3>
          <GoalForm action={updateGoalAction} goal={goal} />

          <form action={deleteGoalAction} className="mt-3">
            <input type="hidden" name="id" value={goal.id} />
            <button
              type="submit"
              className="text-xs text-lifesaving-red hover:underline"
            >
              この目標を削除
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-sand">
            <h3 className="text-xs text-text-light tracking-wider uppercase mb-3">
              タスク（{goal.tasks.length}）
            </h3>

            <div className="space-y-2">
              {goal.tasks.map((t) => (
                <form
                  key={t.id}
                  action={updateTaskAction}
                  className="flex flex-wrap items-center gap-2 bg-sand-pale rounded-lg p-3 border border-sand"
                >
                  <input type="hidden" name="id" value={t.id} />
                  <input type="hidden" name="goal_id" value={goal.id} />
                  <input
                    name="title"
                    defaultValue={t.title}
                    className="flex-1 min-w-[200px] px-2 py-1.5 text-sm rounded border border-sand bg-white"
                    required
                  />
                  <select
                    name="status"
                    defaultValue={t.status}
                    className="text-xs px-2 py-1.5 rounded border border-sand bg-white"
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {TASK_STATUS_LABEL[s]}
                      </option>
                    ))}
                  </select>
                  <input
                    type="date"
                    name="due_date"
                    defaultValue={t.due_date ?? ""}
                    className="text-xs px-2 py-1.5 rounded border border-sand bg-white"
                  />
                  <input
                    type="number"
                    name="sort_order"
                    defaultValue={t.sort_order}
                    className="w-16 text-xs px-2 py-1.5 rounded border border-sand bg-white"
                    title="並び順"
                  />
                  <button
                    type="submit"
                    className="text-xs px-3 py-1.5 rounded bg-ocean-mid text-white hover:bg-ocean-dark transition-colors"
                  >
                    保存
                  </button>
                  <button
                    type="submit"
                    formAction={deleteTaskAction}
                    className="text-xs text-lifesaving-red hover:underline"
                  >
                    削除
                  </button>
                </form>
              ))}
            </div>

            <form
              action={createTaskAction}
              className="flex flex-wrap items-center gap-2 mt-4 bg-ocean-mid/5 rounded-lg p-3 border border-dashed border-ocean-mid/30"
            >
              <input type="hidden" name="goal_id" value={goal.id} />
              <input
                name="title"
                placeholder="新しいタスク"
                className="flex-1 min-w-[200px] px-2 py-1.5 text-sm rounded border border-sand bg-white"
                required
              />
              <select
                name="status"
                defaultValue="todo"
                className="text-xs px-2 py-1.5 rounded border border-sand bg-white"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {TASK_STATUS_LABEL[s]}
                  </option>
                ))}
              </select>
              <input
                type="date"
                name="due_date"
                className="text-xs px-2 py-1.5 rounded border border-sand bg-white"
              />
              <button
                type="submit"
                className="text-xs px-3 py-1.5 rounded bg-sunset text-white hover:bg-sunset-light transition-colors"
              >
                + 追加
              </button>
            </form>
          </div>
        </div>
      </details>
    </div>
  );
}

function GoalForm({
  action,
  goal,
}: {
  action: (formData: FormData) => Promise<unknown> | unknown;
  goal?: GoalWithTasks;
}) {
  return (
    <form action={action as (fd: FormData) => Promise<void>} className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {goal && <input type="hidden" name="id" value={goal.id} />}

      <label className="text-xs text-text-mid">
        メンバー
        <select
          name="member"
          defaultValue={goal?.member ?? "family"}
          className="block w-full mt-1 px-3 py-2 text-sm rounded border border-sand bg-white"
          required
        >
          {MEMBERS.map((m) => (
            <option key={m} value={m}>
              {MEMBER_LABEL[m]}
            </option>
          ))}
        </select>
      </label>

      <label className="text-xs text-text-mid">
        カテゴリ
        <select
          name="category"
          defaultValue={goal?.category ?? "sea"}
          className="block w-full mt-1 px-3 py-2 text-sm rounded border border-sand bg-white"
          required
        >
          {CATS.map((cat) => (
            <option key={cat} value={cat}>
              {CATEGORY_EMOJI[cat]} {CATEGORY_LABEL[cat]}
            </option>
          ))}
        </select>
      </label>

      <label className="text-xs text-text-mid md:col-span-2">
        タイトル
        <input
          name="title"
          defaultValue={goal?.title ?? ""}
          placeholder="例：50m自由形 30秒切り"
          className="block w-full mt-1 px-3 py-2 text-sm rounded border border-sand bg-white"
          required
        />
      </label>

      <label className="text-xs text-text-mid">
        目標値
        <input
          name="target_value"
          defaultValue={goal?.target_value ?? ""}
          placeholder="例：29.9"
          className="block w-full mt-1 px-3 py-2 text-sm rounded border border-sand bg-white"
        />
      </label>

      <label className="text-xs text-text-mid">
        現在値
        <input
          name="current_value"
          defaultValue={goal?.current_value ?? ""}
          placeholder="例：41.0"
          className="block w-full mt-1 px-3 py-2 text-sm rounded border border-sand bg-white"
        />
      </label>

      <label className="text-xs text-text-mid">
        単位
        <input
          name="unit"
          defaultValue={goal?.unit ?? ""}
          placeholder="例：秒 / kg / km"
          className="block w-full mt-1 px-3 py-2 text-sm rounded border border-sand bg-white"
        />
      </label>

      <label className="text-xs text-text-mid">
        期限
        <input
          type="date"
          name="deadline"
          defaultValue={goal?.deadline ?? ""}
          className="block w-full mt-1 px-3 py-2 text-sm rounded border border-sand bg-white"
        />
      </label>

      <label className="text-xs text-text-mid md:col-span-2">
        メモ
        <textarea
          name="notes"
          defaultValue={goal?.notes ?? ""}
          rows={3}
          placeholder="背景・狙いなど"
          className="block w-full mt-1 px-3 py-2 text-sm rounded border border-sand bg-white"
        />
      </label>

      <label className="text-xs text-text-mid">
        並び順
        <input
          type="number"
          name="sort_order"
          defaultValue={goal?.sort_order ?? 0}
          className="block w-full mt-1 px-3 py-2 text-sm rounded border border-sand bg-white"
        />
      </label>

      <div className="md:col-span-2">
        <button
          type="submit"
          className="bg-ocean-mid hover:bg-ocean-dark text-white px-6 py-2.5 rounded-lg text-sm font-[family-name:var(--font-display)] tracking-wider uppercase transition-colors"
        >
          {goal ? "保存" : "追加"}
        </button>
      </div>
    </form>
  );
}
