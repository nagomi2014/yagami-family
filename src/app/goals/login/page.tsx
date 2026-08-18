import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdminLoggedIn, loginAdmin } from "@/lib/goals/auth";

export const dynamic = "force-dynamic";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await isAdminLoggedIn()) redirect("/goals/admin");
  const { error } = await searchParams;

  async function login(formData: FormData) {
    "use server";
    const password = String(formData.get("password") ?? "");
    const ok = await loginAdmin(password);
    if (!ok) redirect("/goals/login?error=1");
    redirect("/goals/admin");
  }

  return (
    <div className="pt-24 pb-24 px-5 bg-sand-pale min-h-screen flex items-start">
      <div className="max-w-sm mx-auto w-full bg-white rounded-2xl p-8 shadow-sm border border-ocean-mid/10">
        <Link
          href="/goals"
          className="inline-flex items-center gap-1.5 text-text-mid hover:text-ocean-mid text-xs tracking-wider uppercase font-[family-name:var(--font-display)] transition-colors"
        >
          ← Back
        </Link>
        <h1 className="font-[family-name:var(--font-serif-jp)] text-xl font-bold text-ocean-dark mt-3">
          家族の合言葉を入力
        </h1>
        <p className="text-xs text-text-light mt-1">編集は家族メンバーのみ</p>

        <form action={login} className="mt-6 space-y-3">
          <input
            type="password"
            name="password"
            required
            autoFocus
            placeholder="パスワード"
            className="w-full px-4 py-3 rounded-lg border border-sand bg-sand-pale text-sm focus:outline-none focus:ring-2 focus:ring-ocean-mid"
          />
          {error && (
            <p className="text-xs text-lifesaving-red">パスワードが違います</p>
          )}
          <button
            type="submit"
            className="w-full bg-ocean-mid hover:bg-ocean-dark text-white text-sm py-3 rounded-lg transition-colors font-[family-name:var(--font-display)] tracking-wider uppercase"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
