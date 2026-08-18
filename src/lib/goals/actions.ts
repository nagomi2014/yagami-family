"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getDB, newId } from "./db";
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
  const db = await getDB();

  const title = String(formData.get("title") ?? "").trim();
  if (!title) throw new Error("タイトル必須");

  await db
    .prepare(
      `INSERT INTO goals
         (id, member, category, title, target_value, current_value, unit, deadline, notes, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .bind(
      newId(),
      String(formData.get("member")) as Member,
      String(formData.get("category")) as Category,
      title,
      nullable(formData.get("target_value")),
      nullable(formData.get("current_value")),
      nullable(formData.get("unit")),
      nullable(formData.get("deadline")),
      nullable(formData.get("notes")),
      Number(formData.get("sort_order") ?? 0)
    )
    .run();

  revalidatePath("/goals");
  revalidatePath("/goals/admin");
}

export async function updateGoalAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("id 必須");
  const db = await getDB();

  const title = String(formData.get("title") ?? "").trim();
  if (!title) throw new Error("タイトル必須");

  await db
    .prepare(
      `UPDATE goals SET
         member = ?, category = ?, title = ?, target_value = ?, current_value = ?,
         unit = ?, deadline = ?, notes = ?, sort_order = ?
       WHERE id = ?`
    )
    .bind(
      String(formData.get("member")) as Member,
      String(formData.get("category")) as Category,
      title,
      nullable(formData.get("target_value")),
      nullable(formData.get("current_value")),
      nullable(formData.get("unit")),
      nullable(formData.get("deadline")),
      nullable(formData.get("notes")),
      Number(formData.get("sort_order") ?? 0),
      id
    )
    .run();

  revalidatePath("/goals");
  revalidatePath(`/goals/${id}`);
  revalidatePath("/goals/admin");
}

export async function deleteGoalAction(formData: FormData) {
  await requireAdmin();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("id 必須");
  const db = await getDB();

  // tasks は ON DELETE CASCADE で一緒に消える
  await db.prepare("DELETE FROM goals WHERE id = ?").bind(id).run();

  revalidatePath("/goals");
  revalidatePath("/goals/admin");
}

export async function createTaskAction(formData: FormData) {
  await requireAdmin();
  const db = await getDB();
  const goal_id = String(formData.get("goal_id") ?? "");
  if (!goal_id) throw new Error("goal_id 必須");

  const title = String(formData.get("title") ?? "").trim();
  if (!title) throw new Error("タイトル必須");

  await db
    .prepare(
      `INSERT INTO tasks (id, goal_id, title, status, due_date, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)`
    )
    .bind(
      newId(),
      goal_id,
      title,
      String(formData.get("status") ?? "todo") as TaskStatus,
      nullable(formData.get("due_date")),
      Number(formData.get("sort_order") ?? 0)
    )
    .run();

  revalidatePath("/goals");
  revalidatePath(`/goals/${goal_id}`);
}

export async function updateTaskStatusAction(formData: FormData) {
  await requireAdmin();
  const db = await getDB();
  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "todo") as TaskStatus;
  const goal_id = String(formData.get("goal_id") ?? "");
  if (!id) throw new Error("id 必須");

  await db
    .prepare("UPDATE tasks SET status = ? WHERE id = ?")
    .bind(status, id)
    .run();

  revalidatePath("/goals");
  if (goal_id) revalidatePath(`/goals/${goal_id}`);
}

export async function updateTaskAction(formData: FormData) {
  await requireAdmin();
  const db = await getDB();
  const id = String(formData.get("id") ?? "");
  if (!id) throw new Error("id 必須");

  const title = String(formData.get("title") ?? "").trim();
  if (!title) throw new Error("タイトル必須");

  await db
    .prepare(
      "UPDATE tasks SET title = ?, status = ?, due_date = ?, sort_order = ? WHERE id = ?"
    )
    .bind(
      title,
      String(formData.get("status") ?? "todo") as TaskStatus,
      nullable(formData.get("due_date")),
      Number(formData.get("sort_order") ?? 0),
      id
    )
    .run();

  const goal_id = String(formData.get("goal_id") ?? "");
  revalidatePath("/goals");
  if (goal_id) revalidatePath(`/goals/${goal_id}`);
}

export async function deleteTaskAction(formData: FormData) {
  await requireAdmin();
  const db = await getDB();
  const id = String(formData.get("id") ?? "");
  const goal_id = String(formData.get("goal_id") ?? "");
  if (!id) throw new Error("id 必須");

  await db.prepare("DELETE FROM tasks WHERE id = ?").bind(id).run();

  revalidatePath("/goals");
  if (goal_id) revalidatePath(`/goals/${goal_id}`);
}

function nullable(v: FormDataEntryValue | null): string | null {
  if (v === null) return null;
  const s = String(v).trim();
  return s === "" ? null : s;
}
