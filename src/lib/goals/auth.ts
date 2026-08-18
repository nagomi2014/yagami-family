import { cookies } from "next/headers";
import { getSecret } from "./db";

const COOKIE_NAME = "yagami_goals_admin";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30日

/**
 * 管理者セッション。
 *
 * 旧実装は「Cookie にパスワードそのものを入れ、値が一致するか」で判定していた。
 * Cookie が漏れるとパスワードがそのまま漏れるので、移行にあわせて
 * 「有効期限＋HMAC署名」方式に変えた（教材アプリ v2 と同じ考え方）。
 * ブラウザに渡すのは署名だけで、パスワードは載せない。
 */

async function getSigningKey(): Promise<CryptoKey> {
  // 署名鍵は専用シークレットが正。未設定ならパスワードを鍵として流用する
  // （設定漏れで機能ごと止まるより、動いたうえで鍵を分離できる方が良い）
  const secret =
    (await getSecret("GOALS_SESSION_SECRET")) ??
    (await getSecret("GOALS_ADMIN_PASSWORD"));

  if (!secret) {
    throw new Error(
      "GOALS_SESSION_SECRET も GOALS_ADMIN_PASSWORD も設定されていません"
    );
  }

  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
}

function toBase64Url(bytes: ArrayBuffer): string {
  let bin = "";
  for (const b of new Uint8Array(bytes)) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

async function sign(payload: string): Promise<string> {
  const key = await getSigningKey();
  const mac = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(payload)
  );
  return toBase64Url(mac);
}

/** 文字列比較は長さと内容で早期returnしない（総当たりのヒントを与えない） */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function makeToken(): Promise<string> {
  const exp = String(Math.floor(Date.now() / 1000) + SESSION_MAX_AGE);
  return `${exp}.${await sign(exp)}`;
}

async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  const dot = token.indexOf(".");
  if (dot <= 0) return false;

  const exp = token.slice(0, dot);
  const mac = token.slice(dot + 1);

  if (!/^\d+$/.test(exp)) return false;
  if (Number(exp) < Math.floor(Date.now() / 1000)) return false; // 期限切れ

  try {
    return safeEqual(mac, await sign(exp));
  } catch {
    return false;
  }
}

export async function isAdminLoggedIn(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(COOKIE_NAME)?.value);
}

export async function loginAdmin(password: string): Promise<boolean> {
  const expected = await getSecret("GOALS_ADMIN_PASSWORD");
  if (!expected) {
    throw new Error("GOALS_ADMIN_PASSWORD が設定されていません");
  }
  if (!safeEqual(password, expected)) return false;

  const store = await cookies();
  store.set(COOKIE_NAME, await makeToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
  return true;
}

export async function logoutAdmin(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
