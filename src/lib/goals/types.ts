export type Member = "yuzuki" | "kiyoha" | "kenshow" | "family";
export type Category = "sea" | "land" | "pool";
export type TaskStatus = "todo" | "doing" | "done";

export interface Goal {
  id: string;
  member: Member;
  category: Category;
  title: string;
  target_value: string | null;
  current_value: string | null;
  unit: string | null;
  deadline: string | null;
  notes: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface Task {
  id: string;
  goal_id: string;
  title: string;
  status: TaskStatus;
  due_date: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

export interface GoalWithTasks extends Goal {
  tasks: Task[];
}

export const MEMBER_LABEL: Record<Member, string> = {
  yuzuki: "結月",
  kiyoha: "陽葉",
  kenshow: "賢尚",
  family: "家族",
};

export const MEMBER_NAME_EN: Record<Member, string> = {
  yuzuki: "Yuzuki",
  kiyoha: "Kiyoha",
  kenshow: "Kenshow",
  family: "Family",
};

export const CATEGORY_LABEL: Record<Category, string> = {
  sea: "海",
  land: "陸",
  pool: "プール",
};

export const CATEGORY_EMOJI: Record<Category, string> = {
  sea: "🌊",
  land: "🏃",
  pool: "🏊",
};

export const CATEGORY_COLOR: Record<
  Category,
  { bg: string; bgSoft: string; border: string; text: string; ring: string; gradient: string }
> = {
  sea: {
    bg: "bg-ocean-dark",
    bgSoft: "bg-ocean-mid/10",
    border: "border-ocean-mid/30",
    text: "text-ocean-dark",
    ring: "ring-ocean-mid",
    gradient: "from-ocean-deep via-ocean-dark to-ocean-mid",
  },
  land: {
    bg: "bg-sunset",
    bgSoft: "bg-sunset/10",
    border: "border-sunset/30",
    text: "text-sunset",
    ring: "ring-sunset",
    gradient: "from-sunset via-sunset-light to-sunset",
  },
  pool: {
    bg: "bg-ocean-light",
    bgSoft: "bg-ocean-light/15",
    border: "border-ocean-light/40",
    text: "text-ocean-mid",
    ring: "ring-ocean-light",
    gradient: "from-ocean-mid via-ocean-light to-ocean-pale",
  },
};

export const TASK_STATUS_LABEL: Record<TaskStatus, string> = {
  todo: "やる",
  doing: "進行中",
  done: "完了",
};

export function progressPct(tasks: Task[]): number {
  if (tasks.length === 0) return 0;
  const done = tasks.filter((t) => t.status === "done").length;
  return Math.round((done / tasks.length) * 100);
}
