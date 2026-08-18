"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminClient } from "./supabase";
import { isAdminLoggedIn, loginAdmin, logoutAdmin } from "./auth";
import type { Category, Member, TaskStatus } from "./types";

async function requireAdmin() {
  if (!(await isAdminLoggedIn())) {
    throw new Error("認証されていません");
  }
}

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");
  const ok = await loginAdmin(password);
  if (!ok) {
    return { error: "パスワードが違います" };
  }
  redirect("/goals/admin");
}

export async function logoutAction() {
  await logoutAdmin();
  redirect("/goals");
}

export async function createGoalAction(formData: FormData) {
  await requireAdmin();
  const supabase = getAdminClient();

  const payload = {
    member: String(formData.get("member")) as Member,
    category: String(formData.get("category")) as Category,
    title: String(formData.get("title") ?? "").trim(),
    target_value: nullable(formData.get("target_value")),
    current_value: nullable(formData.get("current_value")),
    unit: nullable(formData.get("unit")),
    deadline: nullable(formData.get("deadline")),
    notes: nullable(formData.get("notes")),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };

  if (!payload.title) throw new Error("タイトル必須");

  const { error } = await supabase.from("goals").insert(payload);
  if (error) throw error;

  revalidatePath("/goals");
  revalidatePath("/goals/admin");
}

export async function updateGoalAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("id 必須");
  const supabase = getAdminClient();

  const payload = {
    member: String(formData.get("member")) as Member,
    category: String(formData.get("category")) as Category,
    title: String(formData.get("title") ?? "").trim(),
    target_value: nullable(formData.get("target_value")),
    current_value: nullable(formData.get("current_value")),
    unit: nullable(formData.get("unit")),
    deadline: nullable(formData.get("deadline")),
    notes: nullable(formData.get("notes")),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };

  const { error } = await supabase.from("goals").update(payload).eq("id", id);
  if (error) throw error;

  revalidatePath("/goals");
  revalidatePath(`/goals/${id}`);
  revalidatePath("/goals/admin");
}

export async function deleteGoalAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("id 必須");
  const supabase = getAdminClient();
  const { error } = await supabase.from("goals").delete().eq("id", id);
  if (error) throw error;
  revalidatePath("/goals");
  revalidatePath("/goals/admin");
}

export async function createTaskAction(formData: FormData) {
  await requireAdmin();
  const supabase = getAdminClient();
  const goal_id = String(formData.get("goal_id") ?? "");
  if (!goal_id) throw new Error("goal_id 必須");

  const payload = {
    goal_id,
    title: String(formData.get("title") ?? "").trim(),
    status: (String(formData.get("status") ?? "todo") as TaskStatus),
    due_date: nullable(formData.get("due_date")),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
  if (!payload.title) throw new Error("タイトル必須");

  const { error } = await supabase.from("tasks").insert(payload);
  if (error) throw error;

  revalidatePath("/goals");
  revalidatePath(`/goals/${goal_id}`);
}

export async function updateTaskStatusAction(formData: FormData) {
  await requireAdmin();
  const supabase = getAdminClient();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "todo") as TaskStatus;
  const goal_id = String(formData.get("goal_id") ?? "");
  if (!id) throw new Error("id 必須");

  const { error } = await supabase.from("tasks").update({ status }).eq("id", id);
  if (error) throw error;

  revalidatePath("/goals");
  if (goal_id) revalidatePath(`/goals/${goal_id}`);
}

export async function updateTaskAction(formData: FormData) {
  await requireAdmin();
  const supabase = getAdminClient();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("id 必須");

  const payload = {
    title: String(formData.get("title") ?? "").trim(),
    status: String(formData.get("status") ?? "todo") as TaskStatus,
    due_date: nullable(formData.get("due_date")),
    sort_order: Number(formData.get("sort_order") ?? 0),
  };
  if (!payload.title) throw new Error("タイトル必須");

  const { error } = await supabase.from("tasks").update(payload).eq("id", id);
  if (error) throw error;

  const goal_id = String(formData.get("goal_id") ?? "");
  revalidatePath("/goals");
  if (goal_id) revalidatePath(`/goals/${goal_id}`);
}

export async function deleteTaskAction(formData: FormData) {
  await requireAdmin();
  const supabase = getAdminClient();
  const id = String(formData.get("id") ?? "");
  const goal_id = String(formData.get("goal_id") ?? "");
  if (!id) throw new Error("id 必須");

  const { error } = await supabase.from("tasks").delete().eq("id", id);
  if (error) throw error;

  revalidatePath("/goals");
  if (goal_id) revalidatePath(`/goals/${goal_id}`);
}

function nullable(v: FormDataEntryValue | null): string | null {
  if (v === null) return null;
  const s = String(v).trim();
  return s === "" ? null : s;
}
