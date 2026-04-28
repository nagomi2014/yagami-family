"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";

export default function Sprint20260428Page() {
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
              トップスピードのフォーム練習
            </h1>
            <p className="text-white/50 mt-4 text-sm leading-loose">
              2026年4月28日　5:15 - 6:20
            </p>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 wave-divider">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-sand-pale)" />
          </svg>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 px-5 bg-sand-pale">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* メンバー */}
          <AnimateIn>
            <div className="flex gap-2 justify-center">
              {["慎吾"].map((m) => (
                <span
                  key={m}
                  className="text-xs bg-ocean/10 text-ocean px-3 py-1 rounded-full"
                >
                  {m}
                </span>
              ))}
            </div>
          </AnimateIn>

          {/* ハイライト動画 (Short) */}
          <AnimateIn>
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-lg mb-4">
                ハイライト動画
              </h2>
              <div className="flex justify-center">
                <video
                  src="/videos/20260428sprint/highlight.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  poster="/images/activity/20260428sprint/cover.jpg"
                  className="rounded-xl w-full max-w-[360px] aspect-[9/16] bg-black"
                />
              </div>
              <p className="text-text-light text-xs text-center mt-3">
                38秒のショート動画
              </p>
            </div>
          </AnimateIn>

          {/* この日のテーマ */}
          <AnimateIn>
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-lg mb-4">
                この日のテーマ
              </h2>
              <ul className="space-y-3 text-text-mid text-sm leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-ocean-mid mt-0.5">●</span>
                  トップスピードでも崩れないフォームを反復する
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ocean-mid mt-0.5">●</span>
                  全力ではなく <strong className="text-ocean-dark">8割の出力</strong> でフォームを意識
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ocean-mid mt-0.5">●</span>
                  最大出力ではフォームが崩れる。8割なら頭で意識した動きが体にハマる
                </li>
              </ul>

              <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-base mt-6 mb-3">
                ひとことメモ
              </h3>
              <p className="text-text-mid text-sm leading-relaxed">
                派手な記録更新ではなく、「一つずつ・一日ずつ」を信じて続ける、地味な早朝の30分。
                出力ではなく <strong className="text-ocean-dark">再現性</strong> を上げる練習。
              </p>
            </div>
          </AnimateIn>

          {/* 締め */}
          <AnimateIn>
            <div className="text-center py-6">
              <p className="font-[family-name:var(--font-serif-jp)] text-ocean-dark text-lg leading-relaxed">
                一つづつ
                <br />
                積み上げていきます
              </p>
              <p className="text-text-light text-xs mt-2 tracking-widest uppercase">
                Day by day
              </p>
            </div>
          </AnimateIn>
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
