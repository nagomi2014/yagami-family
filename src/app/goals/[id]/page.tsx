import Link from "next/link";
import { notFound } from "next/navigation";
import { fetchGoalById } from "@/lib/goals/queries";
import { isAdminLoggedIn } from "@/lib/goals/auth";
import {
  CATEGORY_COLOR,
  CATEGORY_EMOJI,
  CATEGORY_LABEL,
  MEMBER_LABEL,
  TASK_STATUS_LABEL,
  progressPct,
  type Task,
  type TaskStatus,
} from "@/lib/goals/types";
import { updateTaskStatusAction } from "@/lib/goals/actions";

export const dynamic = "force-dynamic";

export default async function GoalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const goal = await fetchGoalById(id);
  if (!goal) notFound();

  const loggedIn = await isAdminLoggedIn();
  const c = CATEGORY_COLOR[goal.category];
  const pct = progressPct(goal.tasks);

  const grouped: Record<TaskStatus, Task[]> = { todo: [], doing: [], done: [] };
  for (const t of goal.tasks) grouped[t.status].push(t);

  return (
    <div className="pt-24 pb-24 px-5 bg-sand-pale min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/goals"
          className="inline-flex items-center gap-1.5 text-text-mid hover:text-ocean-mid text-xs tracking-wider uppercase font-[family-name:var(--font-display)] transition-colors"
        >
          ← Back to Goals
        </Link>

        <div className={`mt-4 bg-white rounded-2xl overflow-hidden border ${c.border} shadow-sm`}>
          <div className={`bg-gradient-to-r ${c.gradient} px-6 py-5 text-white`}>
            <div className="flex items-center gap-2 text-xs">
              <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                {CATEGORY_EMOJI[goal.category]} {CATEGORY_LABEL[goal.category]}
              </span>
              <span className="bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full">
                {MEMBER_LABEL[goal.member]}
              </span>
              {goal.deadline && (
                <span className="ml-auto text-white/70">期限 {goal.deadline}</span>
              )}
            </div>
            <h1 className="font-[family-name:var(--font-serif-jp)] text-2xl font-bold mt-2 leading-snug">
              {goal.title}
            </h1>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 gap-3">
              <Stat label="目標" value={goal.target_value} unit={goal.unit} highlight={c.text} />
              <Stat label="現在" value={goal.current_value} unit={goal.unit} />
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-text-light tracking-wider uppercase font-[family-name:var(--font-display)]">
                  Progress
                </span>
                <span className={`font-mono font-bold ${c.text}`}>
                  {pct}% <span className="text-text-light font-normal">
                    ({grouped.done.length}/{goal.tasks.length})
                  </span>
                </span>
              </div>
              <div className="h-3 bg-sand rounded-full overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${c.gradient} transition-all`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>

            {goal.notes && (
              <div className="mt-6 bg-sand-pale rounded-lg p-4 border border-sand">
                <p className="text-[10px] text-text-light tracking-wider uppercase mb-1">Notes</p>
                <p className="text-sm text-text-mid whitespace-pre-wrap leading-relaxed">
                  {goal.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-[family-name:var(--font-serif-jp)] text-lg font-bold text-ocean-dark">
              ギャップを埋めるタスク
            </h2>
            {loggedIn && (
              <Link
                href={`/goals/admin?edit=${goal.id}`}
                className="text-xs px-3 py-1.5 rounded-full bg-ocean-mid text-white hover:bg-ocean-dark transition-colors"
              >
                ✏️ 編集
              </Link>
            )}
          </div>

          {goal.tasks.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center text-text-light text-sm border border-sand">
              タスクがまだありません
            </div>
          ) : (
            <div className="space-y-6">
              {(["doing", "todo", "done"] as TaskStatus[]).map((status) => {
                const list = grouped[status];
                if (list.length === 0) return null;
                return (
                  <div key={status}>
                    <h3 className="text-[10px] tracking-[0.3em] uppercase font-[family-name:var(--font-display)] text-text-light mb-2">
                      {TASK_STATUS_LABEL[status]}（{list.length}）
                    </h3>
                    <div className="space-y-2">
                      {list.map((t) => (
                        <TaskRow
                          key={t.id}
                          task={t}
                          goalId={goal.id}
                          accent={c}
                          loggedIn={loggedIn}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  unit,
  highlight,
}: {
  label: string;
  value: string | null;
  unit: string | null;
  highlight?: string;
}) {
  return (
    <div className="bg-sand-pale rounded-lg p-4 border border-sand text-center">
      <p className="text-[10px] text-text-light tracking-wider uppercase">{label}</p>
      <p className={`font-mono text-xl font-bold mt-1 ${highlight ?? "text-text-dark"}`}>
        {value ?? "—"}
        {unit && value && (
          <span className="text-xs ml-1 font-normal text-text-mid">{unit}</span>
        )}
      </p>
    </div>
  );
}

function TaskRow({
  task,
  goalId,
  accent,
  loggedIn,
}: {
  task: Task;
  goalId: string;
  accent: { text: string; ring: string; bgSoft: string };
  loggedIn: boolean;
}) {
  const isDone = task.status === "done";
  const nextStatus: TaskStatus =
    task.status === "todo" ? "doing" : task.status === "doing" ? "done" : "todo";

  return (
    <div
      className={`flex items-center gap-3 bg-white rounded-lg px-4 py-3 border ${
        isDone ? "border-sand opacity-60" : "border-sand"
      }`}
    >
      {loggedIn ? (
        <form action={updateTaskStatusAction}>
          <input type="hidden" name="id" value={task.id} />
          <input type="hidden" name="goal_id" value={goalId} />
          <input type="hidden" name="status" value={nextStatus} />
          <button
            type="submit"
            aria-label={`次の状態へ: ${TASK_STATUS_LABEL[nextStatus]}`}
            className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs transition-all ${
              isDone
                ? "bg-ocean-mid border-ocean-mid text-white"
                : task.status === "doing"
                  ? `${accent.bgSoft} border-current ${accent.text}`
                  : "border-text-light/40 hover:border-ocean-mid"
            }`}
          >
            {isDone ? "✓" : task.status === "doing" ? "·" : ""}
          </button>
        </form>
      ) : (
        <div
          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs ${
            isDone
              ? "bg-ocean-mid border-ocean-mid text-white"
              : task.status === "doing"
                ? `${accent.bgSoft} border-current ${accent.text}`
                : "border-text-light/40"
          }`}
        >
          {isDone ? "✓" : task.status === "doing" ? "·" : ""}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className={`text-sm ${isDone ? "line-through text-text-light" : "text-text-dark"}`}>
          {task.title}
        </p>
        {task.due_date && (
          <p className="text-[10px] text-text-light mt-0.5">期限 {task.due_date}</p>
        )}
      </div>
    </div>
  );
}
