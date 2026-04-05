"use client";

import { AnimateIn } from "@/components/AnimateIn";

const upcoming = [
  {
    date: "2026.04.12",
    title: "九州ライフセービング選手権",
    location: "宮崎・青島ビーチ",
    participants: ["長女", "次女", "長男"],
    type: "大会",
  },
  {
    date: "2026.05.24",
    title: "全日本ジュニアライフセービング選手権",
    location: "神奈川・片瀬西浜",
    participants: ["長男"],
    type: "大会",
  },
  {
    date: "2026.06.15",
    title: "地域ライフセービング講習会",
    location: "地元ビーチ",
    participants: ["長女", "次女", "長男"],
    type: "地域活動",
  },
  {
    date: "2026.07.20",
    title: "全日本ライフセービング選手権",
    location: "千葉・御宿",
    participants: ["長女", "次女"],
    type: "大会",
  },
];

const results = [
  {
    year: "2025年度",
    records: [
      { event: "全日本選手権 ビーチフラッグス", member: "長女", result: "3位 🥉" },
      { event: "九州選手権 ビーチフラッグス", member: "長女", result: "2位 🥈" },
      { event: "九州選手権 ボードレスキュー", member: "次女", result: "3位 🥉" },
      { event: "県大会 ビーチスプリント", member: "長男", result: "優勝 🥇" },
    ],
  },
  {
    year: "2024年度",
    records: [
      { event: "全日本ジュニア選手権 ビーチフラッグス", member: "長女", result: "5位" },
      { event: "九州選手権 オーシャンスイム", member: "長女", result: "優勝 🥇" },
      { event: "県大会 ボードレスキュー", member: "次女", result: "2位 🥈" },
    ],
  },
];

export default function SchedulePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-5 gradient-ocean">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateIn>
            <p className="section-label justify-center text-ocean-light/60 before:bg-ocean-light/40">
              Schedule & Results
            </p>
            <h1 className="font-[family-name:var(--font-serif-jp)] text-white font-bold mt-4 text-3xl md:text-4xl leading-relaxed">
              スケジュール & 戦績
            </h1>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 wave-divider">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-sand-pale)" />
          </svg>
        </div>
      </section>

      {/* Upcoming */}
      <section className="py-20 px-5 bg-sand-pale">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <p className="section-label">Upcoming</p>
            <h2 className="section-title mt-4 text-ocean-dark">今後の予定</h2>
          </AnimateIn>

          <div className="mt-12 space-y-4">
            {upcoming.map((event, i) => (
              <AnimateIn key={event.title} delay={i * 0.08}>
                <div className="bg-white rounded-xl p-6 flex flex-col sm:flex-row gap-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="sm:w-28 shrink-0">
                    <div className="text-ocean-mid font-[family-name:var(--font-display)] font-bold text-sm">
                      {event.date}
                    </div>
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full mt-1 inline-block ${
                        event.type === "大会"
                          ? "bg-lifesaving-red/10 text-lifesaving-red"
                          : "bg-sunset/10 text-sunset"
                      }`}
                    >
                      {event.type}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark">
                      {event.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-text-mid">
                      <span>📍 {event.location}</span>
                      <span>
                        👥 {event.participants.join("・")}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Past Results */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <p className="section-label">Results</p>
            <h2 className="section-title mt-4 text-ocean-dark">過去の戦績</h2>
          </AnimateIn>

          <div className="mt-12 space-y-12">
            {results.map((year) => (
              <AnimateIn key={year.year}>
                <div>
                  <h3 className="font-[family-name:var(--font-display)] text-ocean-mid font-bold text-lg mb-4 flex items-center gap-3">
                    <span className="w-8 h-px bg-ocean-mid/30" />
                    {year.year}
                  </h3>
                  <div className="bg-sand-light rounded-xl overflow-hidden">
                    {year.records.map((record, i) => (
                      <div
                        key={i}
                        className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 px-6 py-4 border-b border-white last:border-0"
                      >
                        <span className="text-xs text-ocean bg-ocean/5 px-2 py-0.5 rounded w-fit">
                          {record.member}
                        </span>
                        <span className="flex-1 text-sm text-text-dark">
                          {record.event}
                        </span>
                        <span className="text-sm font-bold text-ocean-dark">
                          {record.result}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
