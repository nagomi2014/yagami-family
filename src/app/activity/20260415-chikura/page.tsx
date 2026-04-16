"use client";

import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";

export default function Chikura20260415Page() {
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
              千倉トレーニング
            </h1>
            <p className="text-white/50 mt-4 text-sm leading-loose">
              2026年4月15日
            </p>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 wave-divider">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-sand-pale)" />
          </svg>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-24 px-5 bg-sand-pale">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateIn>
            <div className="bg-white rounded-2xl shadow-sm p-12">
              <p className="text-ocean-mid text-4xl mb-4">🏖️</p>
              <h2 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-xl">
                写真・動画を準備中です
              </h2>
              <p className="text-text-mid text-sm mt-3">
                近日公開予定
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
