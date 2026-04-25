"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimateIn } from "@/components/AnimateIn";
import { VideoGrid } from "@/components/VideoGrid";

const photos = [
  { src: "/images/activity/20260411jr/LINE_ALBUM_2026411ジュニア_260416_1.jpg", portrait: true },
  { src: "/images/activity/20260411jr/LINE_ALBUM_2026411ジュニア_260416_2.jpg", portrait: true },
  { src: "/images/activity/20260411jr/LINE_ALBUM_2026411ジュニア_260416_3.jpg", portrait: true },
  { src: "/images/activity/20260411jr/LINE_ALBUM_2026411ジュニア_260416_4.jpg", portrait: false },
  { src: "/images/activity/20260411jr/LINE_ALBUM_2026411ジュニア_260416_5.jpg", portrait: false },
  { src: "/images/activity/20260411jr/LINE_ALBUM_2026411ジュニア_260416_6.jpg", portrait: false },
  { src: "/images/activity/20260411jr/LINE_ALBUM_2026411ジュニア_260416_7.jpg", portrait: false },
];

export default function Junior20260411Page() {
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
              ジュニアトレーニング
            </h1>
            <p className="text-white/50 mt-4 text-sm leading-loose">
              2026年4月11日
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
          </AnimateIn>

          <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
            {photos.map((photo, i) => (
              <AnimateIn key={photo.src} delay={i * 0.08}>
                <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                  <div className={`relative ${photo.portrait ? "aspect-[3/4]" : "aspect-[4/3]"}`}>
                    <Image
                      src={photo.src}
                      alt="ジュニアトレーニング"
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

      {/* 動画 */}
      <section className="py-12 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <p className="section-label">Video</p>
            <h2 className="section-title mt-2 text-ocean-dark">トレーニング動画</h2>
          </AnimateIn>

          <AnimateIn delay={0.1}>
            <VideoGrid path="/videos/20260411jr" count={1} cols={2} />
          </AnimateIn>
        </div>
      </section>

      {/* Back link */}
      <section className="py-12 px-5 bg-sand-pale">
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
