"use client";

import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";

// YouTube動画ID（アップロード後に設定）
const youtubeIds: string[] = [];

export default function Heisaura20260412Page() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-5 gradient-ocean">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateIn>
            <p className="section-label justify-center text-ocean-light/60 before:bg-ocean-light/40">
              Training Report
            </p>
            <h1 className="font-[family-name:var(--font-serif-jp)] text-white font-bold mt-4 text-3xl md:text-4xl leading-relaxed">
              平砂浦 ビーチトレーニング
            </h1>
            <p className="text-white/50 mt-4 text-sm leading-loose">
              2026年4月12日 PM
            </p>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 wave-divider">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-sand-pale)" />
          </svg>
        </div>
      </section>

      {/* 動画ギャラリー */}
      <section className="py-12 px-5 bg-sand-pale">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <p className="section-label">Videos</p>
            <h2 className="section-title mt-2 text-ocean-dark">ビーチトレーニング動画</h2>
          </AnimateIn>

          {youtubeIds.length > 0 ? (
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {youtubeIds.map((id, i) => (
                <AnimateIn key={id} delay={i * 0.05}>
                  <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
                    <div className="aspect-video w-full">
                      <iframe
                        src={`https://www.youtube.com/embed/${id}`}
                        title={`ビーチトレーニング動画 ${i + 1}`}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full"
                      />
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          ) : (
            <AnimateIn delay={0.1}>
              <div className="mt-8 bg-white rounded-2xl p-12 text-center">
                <p className="text-ocean-mid text-4xl mb-4">🎬</p>
                <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-xl">
                  動画を準備中です
                </h3>
                <p className="text-text-mid text-sm mt-3">
                  近日公開予定
                </p>
              </div>
            </AnimateIn>
          )}
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
