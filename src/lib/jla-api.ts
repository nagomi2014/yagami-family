const JLA_API_BASE = "https://ls.jla-lifesaving.or.jp/wp-json/wp/v2";

// JLA カテゴリID
export const JLA_CATEGORIES = {
  sports: 3, // ライフセービングスポーツ
  allJapan: 154, // 全日本選手権
  hpt: 21, // HPT（強化指定）
  world: 157, // 世界選手権
  info: 2, // お知らせ
} as const;

export type JLAPost = {
  id: number;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  link: string;
};

export async function fetchJLAPosts(
  categoryId: number = JLA_CATEGORIES.sports,
  perPage: number = 10
): Promise<JLAPost[]> {
  const res = await fetch(
    `${JLA_API_BASE}/posts?categories=${categoryId}&per_page=${perPage}&_fields=id,date,title,excerpt,link`,
    { next: { revalidate: 3600 } } // 1時間キャッシュ
  );

  if (!res.ok) {
    console.error("JLA API fetch failed:", res.status);
    return [];
  }

  return res.json();
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&[^;]+;/g, " ").trim();
}

export function formatDate(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, "0")}.${String(d.getDate()).padStart(2, "0")}`;
}
