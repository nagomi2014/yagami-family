"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";

const categories = ["全て", "大会", "トレーニング", "地域活動", "メディア"];

const posts = [
  {
    slug: "national-championship-2026",
    date: "2026.03.09",
    title: "全日本ライフセービング選手権 出場レポート",
    category: "大会",
    excerpt: "長女が見事3位入賞！全国の舞台で成長を見せました。家族全員で挑んだ全日本選手権の記録です。",
    members: ["長女", "次女"],
  },
  {
    slug: "winter-training-miyazaki",
    date: "2026.02.15",
    title: "冬季トレーニングキャンプ in 宮崎",
    category: "トレーニング",
    excerpt: "家族全員で宮崎の海で冬季トレーニングを実施。オフシーズンの地道な積み重ねが、来シーズンの結果につながる。",
    members: ["長女", "次女", "長男"],
  },
  {
    slug: "school-workshop-jan",
    date: "2026.01.20",
    title: "地元小学校でライフセービング体験授業",
    category: "地域活動",
    excerpt: "地域の子どもたちに海の安全と命の大切さを伝えました。「自分の命は自分で守る」をテーマに体験型の授業を実施。",
    members: ["長女", "長男"],
  },
  {
    slug: "tv-feature-dec",
    date: "2025.12.10",
    title: "地元テレビ局の特集に出演",
    category: "メディア",
    excerpt: "「ライフセーバー家族の挑戦」として地元テレビ局の夕方ニュースで特集されました。",
    members: ["長女", "次女", "長男"],
  },
  {
    slug: "kyushu-championship",
    date: "2025.11.03",
    title: "九州ライフセービング選手権",
    category: "大会",
    excerpt: "長女がビーチフラッグス2位、次女がボードレスキュー3位。きょうだいでのW入賞を達成！",
    members: ["長女", "次女"],
  },
  {
    slug: "beach-cleanup",
    date: "2025.10.15",
    title: "秋のビーチクリーン活動",
    category: "地域活動",
    excerpt: "ホームビーチの清掃活動に参加。海を守ることもライフセーバーの大切な使命です。",
    members: ["長女", "次女", "長男"],
  },
];

const categoryColors: Record<string, string> = {
  大会: "bg-lifesaving-red/10 text-lifesaving-red border-lifesaving-red/20",
  トレーニング: "bg-ocean-mid/10 text-ocean-mid border-ocean-mid/20",
  地域活動: "bg-sunset/10 text-sunset border-sunset/20",
  メディア: "bg-guard-yellow/10 text-guard-yellow border-guard-yellow/30",
};

export default function ActivityPage() {
  const [activeCategory, setActiveCategory] = useState("全て");

  const filtered =
    activeCategory === "全て"
      ? posts
      : posts.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-5 gradient-ocean">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateIn>
            <p className="section-label justify-center text-ocean-light/60 before:bg-ocean-light/40">
              Activity
            </p>
            <h1 className="font-[family-name:var(--font-serif-jp)] text-white font-bold mt-4 text-3xl md:text-4xl leading-relaxed">
              活動記録
            </h1>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 wave-divider">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-sand-pale)" />
          </svg>
        </div>
      </section>

      {/* Filter + List */}
      <section className="py-16 px-5 bg-sand-pale">
        <div className="max-w-4xl mx-auto">
          {/* Category Filter */}
          <AnimateIn>
            <div className="flex flex-wrap gap-3 mb-12">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-xs px-4 py-2 rounded-full border transition-all font-medium ${
                    activeCategory === cat
                      ? "bg-ocean-dark text-white border-ocean-dark"
                      : "bg-white text-text-mid border-ocean-light/30 hover:border-ocean-mid"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </AnimateIn>

          {/* Posts */}
          <div className="space-y-6">
            {filtered.map((post, i) => (
              <AnimateIn key={post.slug} delay={i * 0.08}>
                <Link href={`/activity`} className="group block">
                  <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row">
                    {/* Thumbnail placeholder */}
                    <div className="md:w-64 h-48 md:h-auto bg-gradient-to-br from-ocean/70 to-ocean-dark shrink-0 relative">
                      <div className="absolute inset-0 bg-ocean-deep/10 group-hover:bg-transparent transition-colors" />
                    </div>

                    <div className="p-6 flex-1">
                      <div className="flex flex-wrap items-center gap-3 mb-3">
                        <span
                          className={`text-[10px] px-3 py-1 rounded-full font-medium border ${
                            categoryColors[post.category] || ""
                          }`}
                        >
                          {post.category}
                        </span>
                        <span className="text-text-light text-xs">
                          {post.date}
                        </span>
                        <div className="flex gap-1">
                          {post.members.map((m) => (
                            <span
                              key={m}
                              className="text-[10px] bg-ocean/5 text-ocean px-2 py-0.5 rounded"
                            >
                              {m}
                            </span>
                          ))}
                        </div>
                      </div>
                      <h2 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark group-hover:text-ocean-mid transition-colors text-lg leading-relaxed">
                        {post.title}
                      </h2>
                      <p className="text-text-mid text-sm mt-3 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                  </article>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
