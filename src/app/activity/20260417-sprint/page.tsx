"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";

export default function Sprint20260417Page() {
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
              スタートダッシュ練習
            </h1>
            <p className="text-white/50 mt-4 text-sm leading-loose">
              2026年4月17日
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
              {["慎吾", "陽葉", "賢尚"].map((m) => (
                <span
                  key={m}
                  className="text-xs bg-ocean/10 text-ocean px-3 py-1 rounded-full"
                >
                  {m}
                </span>
              ))}
            </div>
          </AnimateIn>

          {/* 写真 */}
          <AnimateIn>
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/activity/20260417sprint/5884.jpg"
                  alt="スタートダッシュ練習 - 陽葉と賢尚"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority
                />
              </div>
            </div>
          </AnimateIn>

          {/* 練習内容 */}
          <AnimateIn>
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-lg mb-4">
                練習テーマ
              </h2>
              <ul className="space-y-3 text-text-mid text-sm leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-ocean-mid mt-0.5">●</span>
                  低い体勢を維持すること
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ocean-mid mt-0.5">●</span>
                  足の軌道をコントロールすること（膝を回さない）
                </li>
              </ul>

              <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-base mt-6 mb-3">
                それぞれの課題
              </h3>
              <ul className="space-y-3 text-text-mid text-sm leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="text-ocean-mid mt-0.5">▸</span>
                  <span><strong className="text-ocean-dark">父（慎吾）</strong>：つま先が下がるクセを修正したい</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ocean-mid mt-0.5">▸</span>
                  <span><strong className="text-ocean-dark">次女（陽葉）</strong>：動きはスムーズ。ストライドをもっと大きくしていきたい</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-ocean-mid mt-0.5">▸</span>
                  <span><strong className="text-ocean-dark">長男（賢尚）</strong>：足首がしっかり上がっていて◎</span>
                </li>
              </ul>
            </div>
          </AnimateIn>

          {/* YouTube動画 */}
          <AnimateIn>
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <h2 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-lg mb-4">
                練習動画
              </h2>
              <div className="flex justify-center">
                <iframe
                  src="https://www.youtube.com/embed/Jxk0ZIeEEgQ"
                  title="スタートダッシュ練習"
                  className="rounded-xl w-full max-w-[360px] aspect-[9/16]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
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
