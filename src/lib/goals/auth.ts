import { cookies } from "next/headers";

const COOKIE_NAME = "yagami_goals_admin";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30日

function getPassword(): string {
  const pw = process.env.GOALS_ADMIN_PASSWORD;
  if (!pw) {
    throw new Error("GOALS_ADMIN_PASSWORD が .env.local に設定されていません");
  }
  return pw;
}

export async function isAdminLoggedIn(): Promise<boolean> {
  const store = await cookies();
  const expected = process.env.GOALS_ADMIN_PASSWORD;
  if (!expected) return false;
  return store.get(COOKIE_NAME)?.value === expected;
}

export async function loginAdmin(password: string): Promise<boolean> {
  if (password !== getPassword()) return false;
  const store = await cookies();
  store.set(COOKIE_NAME, password, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return true;
}

export async function logoutAdmin(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
