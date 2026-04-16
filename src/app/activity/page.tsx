"use client";

import { useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";

const categories = ["全て", "トレーニング"];

type Post = {
  slug: string;
  date: string;
  title: string;
  category: string;
  excerpt: string;
  members: string[];
  youtubeId?: string;
  link?: string;
};

const posts: Post[] = [
  {
    slug: "chikura-20260415",
    date: "2026.04.15",
    title: "千倉トレーニング",
    category: "トレーニング",
    excerpt: "",
    members: ["結月", "陽葉", "賢尚"],
  },
  {
    slug: "youth-20260412",
    date: "2026.04.12 AM",
    title: "ユーストレーニング",
    category: "トレーニング",
    excerpt: "",
    members: ["結月", "陽葉"],
  },
  {
    slug: "heisaura-beach-20260412",
    date: "2026.04.12 PM",
    title: "平砂浦 ビーチトレーニング",
    category: "トレーニング",
    excerpt: "",
    members: ["結月", "陽葉", "賢尚"],
  },
  {
    slug: "junior-20260411",
    date: "2026.04.11",
    title: "ジュニアトレーニング",
    category: "トレーニング",
    excerpt: "",
    members: ["結月", "陽葉", "賢尚"],
  },
];

const categoryColors: Record<string, string> = {
  トレーニング: "bg-ocean-mid/10 text-ocean-mid border-ocean-mid/20",
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
                <article
                  className={`bg-white rounded-xl overflow-hidden shadow-sm ${post.link ? "cursor-pointer hover:shadow-md transition-shadow" : ""}`}
                  onClick={() => post.link && (window.location.href = post.link)}
                >
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
