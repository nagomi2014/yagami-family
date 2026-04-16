"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";

type Post = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  members: string[];
  thumbnail?: string;
  mediaType?: "photo" | "video";
  link: string;
};

const posts: Post[] = [
  {
    slug: "chikura-20260415",
    date: "2026.04.15",
    title: "千倉トレーニング",
    excerpt: "",
    members: ["結月", "陽葉", "賢尚"],
    link: "/activity/20260415-chikura",
  },
  {
    slug: "youth-20260412",
    date: "2026.04.12 AM",
    title: "ユーストレーニング",
    excerpt: "",
    members: ["結月", "陽葉"],
    thumbnail: "/images/activity/20260412youth/LINE_ALBUM_2023412 育成_260416_1.jpg",
    mediaType: "photo",
    link: "/activity/20260412-youth",
  },
  {
    slug: "heisaura-20260412",
    date: "2026.04.12 PM",
    title: "平砂浦 ビーチトレーニング",
    excerpt: "",
    members: ["結月", "陽葉", "賢尚"],
    mediaType: "video",
    link: "/activity/20260412-heisaura",
  },
  {
    slug: "junior-20260411",
    date: "2026.04.11",
    title: "ジュニアトレーニング",
    excerpt: "",
    members: ["結月", "陽葉", "賢尚"],
    thumbnail: "/images/activity/20260411jr/LINE_ALBUM_2026411ジュニア_260416_4.jpg",
    mediaType: "photo",
    link: "/activity/20260411-junior",
  },
  {
    slug: "hojo-20260408",
    date: "2026.04.08",
    title: "北条トレーニング",
    excerpt: "",
    members: ["結月", "陽葉", "賢尚"],
    thumbnail: "/images/activity/20260408hojo/LINE_ALBUM_202648\u3000北条_260416_1.jpg",
    mediaType: "photo",
    link: "/activity/20260408-hojo",
  },
  {
    slug: "beachclean-20260405",
    date: "2026.04.05",
    title: "ビーチクリーン",
    excerpt: "",
    members: ["結月", "陽葉", "賢尚"],
    thumbnail: "/images/activity/20260405beachclean/LINE_ALBUM_ビーチクリーン_260416_1.jpg",
    mediaType: "photo",
    link: "/activity/20260405-beachclean",
  },
];

/* 月別にグループ化 */
function groupByMonth(items: Post[]) {
  const groups: { label: string; posts: Post[] }[] = [];
  const map = new Map<string, Post[]>();

  for (const post of items) {
    // "2026.04.15" → "2026.04"
    const month = post.date.split(".").slice(0, 2).join(".");
    if (!map.has(month)) {
      map.set(month, []);
    }
    map.get(month)!.push(post);
  }

  for (const [key, value] of map) {
    const [y, m] = key.split(".");
    groups.push({ label: `${y}年${Number(m)}月の活動`, posts: value });
  }

  return groups;
}

function MediaBadge({ type }: { type?: "photo" | "video" }) {
  if (!type) return null;
  return (
    <span className="absolute top-3 right-3 bg-ocean-deep/60 text-white text-[10px] px-2 py-1 rounded-full backdrop-blur-sm">
      {type === "photo" ? "📷 写真" : "🎬 動画"}
    </span>
  );
}

export default function ActivityPage() {
  const groups = groupByMonth(posts);

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

      {/* 月別グループ */}
      <section className="py-16 px-5 bg-sand-pale">
        <div className="max-w-5xl mx-auto">
          {groups.map((group, gi) => (
            <div key={group.label} className={gi > 0 ? "mt-16" : ""}>
              <AnimateIn>
                <h2 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-xl mb-8 flex items-center gap-3">
                  <span className="w-1 h-6 bg-ocean-mid rounded-full" />
                  {group.label}
                </h2>
              </AnimateIn>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {group.posts.map((post, i) => (
                  <AnimateIn key={post.slug} delay={i * 0.08}>
                    <Link href={post.link} className="group block">
                      <article className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                        {/* サムネイル */}
                        <div className="relative aspect-[4/3] bg-gradient-to-br from-ocean/60 to-ocean-dark overflow-hidden">
                          {post.thumbnail ? (
                            <Image
                              src={post.thumbnail}
                              alt={post.title}
                              fill
                              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                          ) : (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-white/30 text-4xl">
                                {post.mediaType === "video" ? "🎬" : "🏖️"}
                              </span>
                            </div>
                          )}
                          <MediaBadge type={post.mediaType} />
                        </div>

                        {/* テキスト */}
                        <div className="p-5">
                          <span className="text-text-light text-xs">{post.date}</span>
                          <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-base mt-1 group-hover:text-ocean-mid transition-colors leading-relaxed">
                            {post.title}
                          </h3>
                          {post.excerpt && (
                            <p className="text-text-mid text-sm mt-2 leading-relaxed line-clamp-2">
                              {post.excerpt}
                            </p>
                          )}
                          <div className="flex gap-1 mt-3">
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
                      </article>
                    </Link>
                  </AnimateIn>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
