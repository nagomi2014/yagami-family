"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";

const photos = Array.from({ length: 39 }, (_, i) => ({
  src: `/images/activity/20260408hojo/LINE_ALBUM_202648\u3000北条_260416_${i + 1}.jpg`,
}));

export default function Hojo20260408Page() {
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
              北条トレーニング
            </h1>
            <p className="text-white/50 mt-4 text-sm leading-loose">
              2026年4月8日
            </p>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 wave-divider">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-sand-pale)" />
          </svg>
        </div>
      </section>

      {/* フォトギャラリー */}
      <section className="py-12 px-5 bg-sand-pale">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <p className="section-label">Photo Gallery</p>
            <h2 className="section-title mt-2 text-ocean-dark">トレーニングフォト</h2>
            <p className="text-text-light text-sm mt-2">{photos.length}枚</p>
          </AnimateIn>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, i) => (
              <AnimateIn key={i} delay={i * 0.04}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <div className="relative aspect-video">
                    <Image
                      src={photo.src}
                      alt="北条トレーニング"
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
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
