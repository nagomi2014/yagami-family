import { getDB } from "./db";
import type { Goal, Task, GoalWithTasks } from "./types";

export async function fetchAllGoalsWithTasks(): Promise<GoalWithTasks[]> {
  const db = await getDB();

  const { results: goals } = await db
    .prepare("SELECT * FROM goals ORDER BY sort_order ASC, created_at ASC")
    .all<Goal>();

  if (!goals || goals.length === 0) return [];

  // goal_id の IN 句はプレースホルダを件数分ならべる（D1 は配列バインドに非対応）
  const placeholders = goals.map(() => "?").join(",");
  const { results: tasks } = await db
    .prepare(
      `SELECT * FROM tasks WHERE goal_id IN (${placeholders})
       ORDER BY sort_order ASC, created_at ASC`
    )
    .bind(...goals.map((g) => g.id))
    .all<Task>();

  const tasksByGoal = new Map<string, Task[]>();
  for (const t of tasks ?? []) {
    const arr = tasksByGoal.get(t.goal_id) ?? [];
    arr.push(t);
    tasksByGoal.set(t.goal_id, arr);
  }

  return goals.map((g) => ({ ...g, tasks: tasksByGoal.get(g.id) ?? [] }));
}

export async function fetchGoalById(id: string): Promise<GoalWithTasks | null> {
  const db = await getDB();

  const goal = await db
    .prepare("SELECT * FROM goals WHERE id = ?")
    .bind(id)
    .first<Goal>();

  if (!goal) return null;

  const { results: tasks } = await db
    .prepare(
      `SELECT * FROM tasks WHERE goal_id = ?
       ORDER BY sort_order ASC, created_at ASC`
    )
    .bind(id)
    .all<Task>();

  return { ...goal, tasks: tasks ?? [] };
}
