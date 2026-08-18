import { getReadClient } from "./supabase";
import type { Goal, Task, GoalWithTasks } from "./types";

export async function fetchAllGoalsWithTasks(): Promise<GoalWithTasks[]> {
  const supabase = getReadClient();
  const { data: goals, error: goalsError } = await supabase
    .from("goals")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (goalsError) throw goalsError;
  if (!goals || goals.length === 0) return [];

  const ids = goals.map((g: Goal) => g.id);
  const { data: tasks, error: tasksError } = await supabase
    .from("tasks")
    .select("*")
    .in("goal_id", ids)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (tasksError) throw tasksError;

  const tasksByGoal = new Map<string, Task[]>();
  for (const t of (tasks ?? []) as Task[]) {
    const arr = tasksByGoal.get(t.goal_id) ?? [];
    arr.push(t);
    tasksByGoal.set(t.goal_id, arr);
  }

  return (goals as Goal[]).map((g) => ({
    ...g,
    tasks: tasksByGoal.get(g.id) ?? [],
  }));
}

export async function fetchGoalById(id: string): Promise<GoalWithTasks | null> {
  const supabase = getReadClient();
  const { data: goal, error } = await supabase
    .from("goals")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!goal) return null;

  const { data: tasks, error: tasksError } = await supabase
    .from("tasks")
    .select("*")
    .eq("goal_id", id)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (tasksError) throw tasksError;

  return { ...(goal as Goal), tasks: (tasks ?? []) as Task[] };
}
