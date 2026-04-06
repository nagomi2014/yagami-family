"use client";

import { useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";

const categories = ["全て", "大会", "大会レポート動画"];

type Post = {
  slug: string;
  date: string;
  title: string;
  category: string;
  excerpt: string;
  members: string[];
  youtubeId?: string;
};

const posts: Post[] = [
  {
    slug: "jym-pool-2025",
    date: "2025.01",
    title: "全日本JYMプール大会 2025",
    category: "大会",
    excerpt:
      "結月・陽葉が全5種目にエントリー。陽葉はマネキンキャリー50mで約5秒短縮、マネキンキャリーWF100mで完泳を達成。スーパーライフセーバー200mにも初挑戦。",
    members: ["結月", "陽葉"],
  },
  {
    slug: "jym-pool-2024",
    date: "2024.01",
    title: "全日本JYMプール大会 2024",
    category: "大会",
    excerpt:
      "結月がU15カテゴリで初出場。陽葉と共に障害物スイム・マネキンキャリー・マネキントウの全種目にエントリー。",
    members: ["結月", "陽葉"],
  },
  {
    slug: "jym-pool-2023",
    date: "2023.02",
    title: "全日本JYMプール大会 2023",
    category: "大会",
    excerpt:
      "陽葉が2年連続出場。障害物スイム50mで36.57秒（前年比-2.94秒）と大幅にタイムを更新。チューブトウ100mも1:31.24。",
    members: ["陽葉"],
  },
  {
    slug: "jym-pool-2022",
    date: "2022.02",
    title: "全日本JYMプール大会 2022 初出場",
    category: "大会",
    excerpt:
      "陽葉が小学5年生で全日本大会に初出場。障害物スイム50mで39.51秒（12位）。藤崎笑佳と共に館山SLSCチームでリレーにも出場。",
    members: ["陽葉"],
  },
  {
    slug: "jym-beach-2022-vol1",
    date: "2022.09",
    title: "2022年 全日本JYMビーチ大会 Vol.1",
    category: "大会レポート動画",
    excerpt: "2022年全日本ジュニア・ユース・マスターズ ビーチ大会の記録映像。真吾による撮影レポート。",
    members: ["結月", "陽葉", "賢尚"],
    youtubeId: "ljz5XNQQjS4",
  },
  {
    slug: "jym-beach-2022-vol2",
    date: "2022.09",
    title: "2022年 全日本JYMビーチ大会 Vol.2",
    category: "大会レポート動画",
    excerpt: "ビーチ大会のレース映像と振り返り。子どもたちの成長が見える貴重な記録。",
    members: ["結月", "陽葉", "賢尚"],
    youtubeId: "xv7bZuQTH68",
  },
  {
    slug: "jym-beach-2022-vol3",
    date: "2022.09",
    title: "2022年 全日本JYMビーチ大会 Vol.3",
    category: "大会レポート動画",
    excerpt: "大会の裏側、ウォーミングアップから本番まで。矢上家のライフセービングな1日。",
    members: ["結月", "陽葉", "賢尚"],
    youtubeId: "cGLJQRhuPVk",
  },
];

const categoryColors: Record<string, string> = {
  大会: "bg-lifesaving-red/10 text-lifesaving-red border-lifesaving-red/20",
  大会レポート動画: "bg-ocean-mid/10 text-ocean-mid border-ocean-mid/20",
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
            <path
              d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z"
              fill="var(--color-sand-pale)"
            />
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
                <article className="bg-white rounded-xl overflow-hidden shadow-sm">
                  {/* YouTube embed */}
                  {post.youtubeId && (
                    <div className="aspect-video w-full">
                      <iframe
                        src={`https://www.youtube.com/embed/${post.youtubeId}`}
                        title={post.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  )}

                  {/* Thumbnail placeholder for non-video posts */}
                  {!post.youtubeId && (
                    <div className="h-3 bg-gradient-to-r from-ocean-mid to-ocean-dark" />
                  )}

                  <div className="p-6">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span
                        className={`text-[10px] px-3 py-1 rounded-full font-medium border ${
                          categoryColors[post.category] || "bg-gray-50 text-gray-600 border-gray-200"
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
                    <h2 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-lg leading-relaxed">
                      {post.title}
                    </h2>
                    <p className="text-text-mid text-sm mt-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </article>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
