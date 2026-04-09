"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";

const results = [
  {
    name: "矢上 結月",
    category: "小学3年生（U10）女子",
    club: "館山SLSC",
    events: [
      { event: "ランスイムラン", rank: "決勝進出", note: "" },
      { event: "ニッパー", rank: "決勝進出", note: "" },
      { event: "ボード", rank: "決勝進出", note: "" },
      { event: "ビーチフラッグス", rank: "出場", note: "" },
    ],
  },
  {
    name: "矢上 陽葉",
    category: "小学1年生（U8）女子",
    club: "館山SLSC",
    events: [
      { event: "ウェーディングレース", rank: "出場", note: "初参加" },
    ],
  },
];

const photos = [
  { src: "/images/activity/jym-2018/60126_0.jpg", caption: "ビーチフラッグス", portrait: false },
  { src: "/images/activity/jym-2018/60127_0.jpg", caption: "ビーチフラッグス", portrait: false },
  { src: "/images/activity/jym-2018/60128_0.jpg", caption: "応援中", portrait: false },
  { src: "/images/activity/jym-2018/60129_0.jpg", caption: "ニッパーボードレース", portrait: true },
  { src: "/images/activity/jym-2018/60130_0.jpg", caption: "ニッパーボードレース", portrait: true },
  { src: "/images/activity/jym-2018/60131_0.jpg", caption: "ニッパーボードレーススタート", portrait: true },
  { src: "/images/activity/jym-2018/60133_0.jpg", caption: "レスキューボードと長男（1歳）", portrait: false },
];

export default function JYM2018Page() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-5 gradient-ocean">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateIn>
            <p className="section-label justify-center text-ocean-light/60 before:bg-ocean-light/40">
              Competition Report
            </p>
            <h1 className="font-[family-name:var(--font-serif-jp)] text-white font-bold mt-4 text-3xl md:text-4xl leading-relaxed">
              2018年 大会参加
            </h1>
            <p className="text-white/50 mt-4 text-sm leading-loose">
              結月 小3 / 陽葉 小1 初参加
            </p>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 wave-divider">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-sand-pale)" />
          </svg>
        </div>
      </section>

      {/* 大会概要 */}
      <section className="py-12 px-5 bg-sand-pale">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <div className="bg-white rounded-2xl shadow-sm p-6 md:p-8">
              <h2 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-xl mb-6">
                大会概要
              </h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div className="flex gap-3">
                  <span className="text-ocean-mid shrink-0">📅</span>
                  <div>
                    <p className="text-text-light text-xs">開催年</p>
                    <p className="text-text-dark font-medium">2018年</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-ocean-mid shrink-0">🏊</span>
                  <div>
                    <p className="text-text-light text-xs">種目</p>
                    <p className="text-text-dark font-medium">ランスイムラン / ニッパー / ボード / ビーチフラッグス / ウェーディング</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-ocean-mid shrink-0">👥</span>
                  <div>
                    <p className="text-text-light text-xs">出場選手</p>
                    <p className="text-text-dark font-medium">矢上 結月（小3）/ 矢上 陽葉（小1・初参加）</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-ocean-mid shrink-0">⭐</span>
                  <div>
                    <p className="text-text-light text-xs">トピック</p>
                    <p className="text-text-dark font-medium">陽葉が小1で初参加！結月は決勝進出多数</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* 結果 */}
      <section className="py-12 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <p className="section-label">Results</p>
            <h2 className="section-title mt-2 text-ocean-dark">大会結果</h2>
          </AnimateIn>

          <div className="mt-8 space-y-8">
            {results.map((athlete) => (
              <AnimateIn key={athlete.name}>
                <div className="bg-sand-pale rounded-2xl p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-xl">
                      {athlete.name}
                    </h3>
                    <span className="text-xs bg-ocean-mid/10 text-ocean-mid px-3 py-1 rounded-full">
                      {athlete.category}
                    </span>
                    <span className="text-xs text-text-light">{athlete.club}</span>
                  </div>

                  <div className="space-y-3">
                    {athlete.events.map((ev) => (
                      <div
                        key={ev.event}
                        className="flex items-center justify-between p-4 rounded-xl bg-white"
                      >
                        <span className="font-medium text-ocean-dark">{ev.event}</span>
                        <div className="text-right flex items-center gap-2">
                          <span className="font-mono font-bold text-lg text-ocean-dark">
                            {ev.rank}
                          </span>
                          {ev.note && (
                            <span className="text-xs bg-guard-yellow/20 text-guard-yellow px-2 py-0.5 rounded-full font-bold">
                              {ev.note}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* フォトギャラリー */}
      <section className="py-12 px-5 bg-sand-pale">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <p className="section-label">Photo Gallery</p>
            <h2 className="section-title mt-2 text-ocean-dark">大会フォト</h2>
          </AnimateIn>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, i) => (
              <AnimateIn key={photo.src} delay={i * 0.08}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <div className={`relative ${photo.portrait ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                    <Image
                      src={photo.src}
                      alt={photo.caption}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </div>
                  <p className="text-text-mid text-xs p-3 text-center">{photo.caption}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Back link */}
      <section className="py-12 px-5 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <Link
            href="/activity"
            className="inline-flex items-center gap-2 text-ocean-mid hover:text-ocean-dark text-sm font-[family-name:var(--font-display)] tracking-wider uppercase transition-colors group"
          >
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            Back to Activity
          </Link>
        </div>
      </section>
    </>
  );
}
