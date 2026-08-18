import { getCloudflareContext } from "@opennextjs/cloudflare";

/**
 * Cloudflare のバインディング／シークレットを取り出す。
 *
 * 旧構成では Supabase の URL とキーを process.env から読んでいたが、
 * Supabase プロジェクトが休眠削除で消滅したため D1 に移した。
 * D1 は Cloudflare アカウント配下にあるので同じ事故は起きない。
 */
async function getEnv() {
  const { env } = await getCloudflareContext({ async: true });
  return env as unknown as {
    DB?: D1Database;
    GOALS_ADMIN_PASSWORD?: string;
    GOALS_SESSION_SECRET?: string;
  };
}

export async function getDB(): Promise<D1Database> {
  const env = await getEnv();
  if (!env.DB) {
    throw new Error(
      "D1 未設定: wrangler.jsonc の d1_databases に DB バインディングがありません"
    );
  }
  return env.DB;
}

/** シークレットは Workers の env が正。ローカルの next dev 用に process.env も見る。 */
export async function getSecret(
  name: "GOALS_ADMIN_PASSWORD" | "GOALS_SESSION_SECRET"
): Promise<string | undefined> {
  const env = await getEnv();
  return env[name] ?? process.env[name];
}

export async function isGoalsConfigured(): Promise<boolean> {
  try {
    const env = await getEnv();
    return Boolean(env.DB);
  } catch {
    return false;
  }
}

/** id は Postgres の gen_random_uuid() の代わり。Workers は Web Crypto が使える。 */
export function newId(): string {
  return crypto.randomUUID();
}
