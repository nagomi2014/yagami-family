"use client";

import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";

const results = [
  {
    name: "矢上 結月",
    category: "小学6年生 女子 → 中学生",
    club: "館山SLSC",
    events: [
      { event: "ランスイムラン", rank: "決勝", note: "" },
      { event: "サーフ", rank: "決勝19位", note: "" },
      { event: "ニッパー", rank: "予選", note: "" },
      { event: "ビーチスプリント", rank: 7, note: "" },
      { event: "ビーチフラッグス", rank: "予選", note: "" },
    ],
  },
  {
    name: "矢上 陽葉",
    category: "小学5年生 女子",
    club: "館山SLSC",
    events: [
      { event: "ウェーディング", rank: 8, note: "" },
      { event: "ニッパー", rank: 3, note: "" },
      { event: "ビーチスプリント", rank: "予選", note: "" },
      { event: "ビーチフラッグス", rank: "予選", note: "" },
    ],
  },
  {
    name: "矢上 真吾",
    category: "マスターズ",
    club: "館山SLSC",
    events: [
      { event: "ビーチスプリント", rank: "予選最下位", note: "" },
      { event: "ビーチフラッグス", rank: "予選2本目", note: "" },
    ],
  },
];

const videos = [
  {
    id: "ljz5XNQQjS4",
    title: "2022年 全日本JYMビーチ大会 Vol.1",
    description: "大会の雰囲気と準備の様子",
  },
  {
    id: "xv7bZuQTH68",
    title: "2022年 全日本JYMビーチ大会 Vol.2",
    description: "レース映像と振り返り",
  },
  {
    id: "cGLJQRhuPVk",
    title: "2022年 全日本JYMビーチ大会 Vol.3",
    description: "ウォーミングアップから本番まで",
  },
];

export default function JYMBeach2022Page() {
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
              全日本JYMビーチ大会 2022
            </h1>
            <p className="text-white/50 mt-4 text-sm leading-loose">
              全日本ジュニア/ユース/マスターズ ライフセービング選手権大会 2022［ビーチ］
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
                    <p className="text-text-light text-xs">開催日</p>
                    <p className="text-text-dark font-medium">2022年6月4日（土）〜5日（日）</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-ocean-mid shrink-0">📍</span>
                  <div>
                    <p className="text-text-light text-xs">会場</p>
                    <p className="text-text-dark font-medium">横浜海の公園（神奈川県横浜市金沢区）</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-ocean-mid shrink-0">🏊</span>
                  <div>
                    <p className="text-text-light text-xs">種目</p>
                    <p className="text-text-dark font-medium">ビーチフラッグス / ビーチスプリント / ビーチラン</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="text-ocean-mid shrink-0">👥</span>
                  <div>
                    <p className="text-text-light text-xs">出場選手</p>
                    <p className="text-text-dark font-medium">矢上 結月（小6）/ 矢上 陽葉（小5）/ 矢上 真吾（マスターズ）</p>
                  </div>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100">
                <a
                  href="https://ls.jla-lifesaving.or.jp/lifesaving-sports/event-schedule/alljpn-jr-beach-2022/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-ocean-mid hover:text-ocean-dark text-xs font-[family-name:var(--font-display)] tracking-wider transition-colors"
                >
                  JLA 公式大会ページ ↗
                </a>
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
                        className={`flex items-center justify-between p-4 rounded-xl ${
                          ev.rank === 1
                            ? "bg-guard-yellow/10 border border-guard-yellow/30"
                            : "bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          {ev.rank === 1 && <span className="text-2xl">🥇</span>}
                          <span className="font-medium text-ocean-dark">{ev.event}</span>
                        </div>
                        <div className="text-right">
                          <span
                            className={`font-mono font-bold text-lg ${
                              ev.rank === 1 ? "text-guard-yellow" : "text-ocean-dark"
                            }`}
                          >
                            {typeof ev.rank === "number" ? `${ev.rank}位` : ev.rank}
                          </span>
                          {ev.note && (
                            <span className="ml-2 text-xs bg-guard-yellow/20 text-guard-yellow px-2 py-0.5 rounded-full font-bold">
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

      {/* 動画レポート */}
      <section className="py-12 px-5 bg-sand-pale">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <p className="section-label">Video Report</p>
            <h2 className="section-title mt-2 text-ocean-dark">大会レポート動画</h2>
            <p className="text-text-light text-sm mt-2">
              撮影・編集：矢上真吾
            </p>
          </AnimateIn>

          <div className="mt-8 space-y-8">
            {videos.map((video, i) => (
              <AnimateIn key={video.id} delay={i * 0.1}>
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
                  <div className="aspect-video w-full">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark">
                      {video.title}
                    </h3>
                    <p className="text-text-mid text-sm mt-1">{video.description}</p>
                  </div>
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
