"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimateIn } from "@/components/AnimateIn";

const categories = ["全て", "大会", "練習", "日常", "イベント"];

const photos = Array.from({ length: 18 }).map((_, i) => ({
  id: i,
  category: ["大会", "練習", "日常", "イベント"][i % 4],
  caption: [
    "全日本選手権でのビーチフラッグス",
    "朝練のオーシャンスイム",
    "トレーニング後の家族タイム",
    "地元ビーチクリーンイベント",
    "サーフスキーの練習",
    "表彰式での1枚",
  ][i % 6],
  hue: 190 + (i * 15) % 60,
  lightness: 25 + (i * 5) % 30,
  span: i % 7 === 0 || i % 7 === 3,
}));

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("全て");
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);

  const filtered =
    activeCategory === "全て"
      ? photos
      : photos.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-5 gradient-ocean">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateIn>
            <p className="section-label justify-center text-ocean-light/60 before:bg-ocean-light/40">
              Gallery
            </p>
            <h1 className="font-[family-name:var(--font-serif-jp)] text-white font-bold mt-4 text-3xl md:text-4xl leading-relaxed">
              思い出の記録
            </h1>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 wave-divider">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-sand-pale)" />
          </svg>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 px-5 bg-sand-pale min-h-screen">
        <div className="max-w-6xl mx-auto">
          {/* Filter */}
          <AnimateIn>
            <div className="flex flex-wrap gap-3 mb-12 justify-center">
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

          {/* Masonry Grid */}
          <div className="columns-2 md:columns-3 lg:columns-4 gap-3 space-y-3">
            {filtered.map((photo, i) => (
              <AnimateIn key={photo.id} delay={Math.min(i * 0.05, 0.5)}>
                <div
                  onClick={() => setSelectedPhoto(photo.id)}
                  className="break-inside-avoid rounded-xl overflow-hidden cursor-pointer group relative"
                  style={{
                    aspectRatio: photo.span ? "1/1.3" : "1/0.8",
                  }}
                >
                  <div
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                    style={{
                      background: `linear-gradient(${135 + i * 25}deg,
                        hsl(${photo.hue}, 55%, ${photo.lightness}%),
                        hsl(${photo.hue + 20}, 45%, ${photo.lightness + 15}%))`,
                    }}
                  />
                  <div className="absolute inset-0 bg-ocean-deep/0 group-hover:bg-ocean-deep/30 transition-colors flex items-end">
                    <div className="p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <p className="text-white text-xs">{photo.caption}</p>
                      <span className="text-white/50 text-[10px]">
                        {photo.category}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-[60] bg-ocean-deep/95 backdrop-blur-sm flex items-center justify-center p-8 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="max-w-4xl w-full aspect-[4/3] rounded-2xl overflow-hidden"
              style={{
                background: `linear-gradient(135deg,
                  hsl(${190 + selectedPhoto * 15}, 55%, 30%),
                  hsl(${210 + selectedPhoto * 10}, 45%, 45%))`,
              }}
            />
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white text-2xl"
            >
              ✕
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
