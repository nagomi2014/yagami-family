import Link from "next/link";
import {
  fetchJLAPosts,
  JLA_CATEGORIES,
  stripHtml,
  formatDate,
} from "@/lib/jla-api";

const categoryFilters = [
  { id: JLA_CATEGORIES.sports, label: "スポーツ", labelEn: "Sports", color: "bg-ocean-mid/10 text-ocean-mid" },
  { id: JLA_CATEGORIES.allJapan, label: "全日本選手権", labelEn: "All Japan", color: "bg-lifesaving-red/10 text-lifesaving-red" },
  { id: JLA_CATEGORIES.hpt, label: "強化指定", labelEn: "HPT", color: "bg-sunset/10 text-sunset" },
  { id: JLA_CATEGORIES.world, label: "世界選手権", labelEn: "World", color: "bg-guard-yellow/10 text-guard-yellow" },
];

export const revalidate = 3600; // ISR: 1時間ごとに再生成

export default async function NewsPage() {
  // 全カテゴリから並列フェッチ
  const results = await Promise.all(
    categoryFilters.map((cat) => fetchJLAPosts(cat.id, 8))
  );

  // フラット化 → 日付順ソート → 重複排除
  const allPosts = results
    .flat()
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const seen = new Set<number>();
  const uniquePosts = allPosts.filter((p) => {
    if (seen.has(p.id)) return false;
    seen.add(p.id);
    return true;
  });

  // カテゴリ判定
  function getCategoryInfo(postId: number) {
    for (let i = 0; i < results.length; i++) {
      if (results[i].some((p) => p.id === postId)) {
        return categoryFilters[i];
      }
    }
    return categoryFilters[0];
  }

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-5 gradient-ocean">
        <div className="max-w-4xl mx-auto text-center">
          <p className="section-label justify-center text-ocean-light/60 before:bg-ocean-light/40">
            News from JLA
          </p>
          <h1 className="font-[family-name:var(--font-serif-jp)] text-white font-bold mt-4 text-3xl md:text-4xl leading-relaxed">
            ライフセービング ニュース
          </h1>
          <p className="text-white/50 mt-4 text-sm leading-loose">
            日本ライフセービング協会（JLA）の最新情報を自動取得しています
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 wave-divider">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z"
              fill="var(--color-sand-pale)"
            />
          </svg>
        </div>
      </section>

      {/* Category Legend */}
      <section className="bg-sand-pale pt-8 px-5">
        <div className="max-w-4xl mx-auto flex gap-2 flex-wrap">
          {categoryFilters.map((cat) => (
            <span
              key={cat.id}
              className={`text-xs px-3 py-1.5 rounded-full font-medium ${cat.color}`}
            >
              {cat.label}
            </span>
          ))}
        </div>
      </section>

      {/* News List */}
      <section className="py-12 px-5 bg-sand-pale min-h-[60vh]">
        <div className="max-w-4xl mx-auto">
          {uniquePosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-text-light">
                ニュースを取得できませんでした。JLAサイトをご確認ください。
              </p>
              <a
                href="https://ls.jla-lifesaving.or.jp/news-lifesaving-sports/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-ocean-mid hover:text-ocean-dark text-sm mt-4 inline-block"
              >
                JLAサイトを開く →
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {uniquePosts.slice(0, 20).map((post) => {
                const cat = getCategoryInfo(post.id);
                const excerpt = stripHtml(post.excerpt.rendered);

                return (
                  <a
                    key={post.id}
                    href={post.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start gap-3">
                      <div className="sm:w-28 shrink-0 flex items-center gap-3">
                        <span className="text-xs text-text-light font-[family-name:var(--font-display)] tracking-wider">
                          {formatDate(post.date)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${cat.color}`}
                          >
                            {cat.label}
                          </span>
                        </div>
                        <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark group-hover:text-ocean-mid transition-colors leading-relaxed">
                          {stripHtml(post.title.rendered)}
                        </h3>
                        {excerpt && (
                          <p className="text-text-mid text-sm mt-2 leading-relaxed line-clamp-2">
                            {excerpt}
                          </p>
                        )}
                      </div>
                      <div className="hidden sm:block shrink-0 text-ocean-light/40 group-hover:text-ocean-mid transition-colors">
                        ↗
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          )}

          {/* JLA Link */}
          <div className="text-center mt-12 space-y-3">
            <a
              href="https://ls.jla-lifesaving.or.jp/news-lifesaving-sports/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-ocean-mid hover:text-ocean-dark text-sm font-[family-name:var(--font-display)] tracking-wider uppercase transition-colors group"
            >
              View All on JLA
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
            <p className="text-text-light text-xs">
              出典：
              <a
                href="https://ls.jla-lifesaving.or.jp/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-ocean-mid"
              >
                公益財団法人日本ライフセービング協会
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
