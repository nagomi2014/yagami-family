"use client";

import { useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";
import {
  yagamiRecords,
  ranking2025,
  allRankings,
  benchmarks,
  type AthleteRecords,
  type EventRecord,
  type AthleteRankings,
  type CategoryRanking,
  type AthleteBenchmark,
} from "./data";

/* ===== 水泳資格級 ===== */
const swimGrades = {
  title: "水泳資格級 男子 50m自由形（9歳）",
  grades: [
    { cls: "AA", num: 15, time: "28.20", level: "全国トップ" },
    { cls: "AA", num: 11, time: "31.04", level: "全国大会" },
    { cls: "A", num: 10, time: "32.51", level: "公認大会上位" },
    { cls: "A", num: 6, time: "38.39", level: "公認大会" },
    { cls: "B", num: 5, time: "39.86", level: "地域大会上位" },
    { cls: "B", num: 4, time: "41.33", level: "地域大会" },
    { cls: "B", num: 1, time: "45.74", level: "初心者" },
  ],
  joStandard: { shortCourse: "31.14", longCourse: "31.56" },
};

/* ===== 陸上50m走 ===== */
const sprint50m = {
  title: "50m走 全国平均タイム（文部科学省 新体力テスト）",
  data: [
    { grade: "小1", age: "6歳", male: "11.45", female: "11.82" },
    { grade: "小2", age: "7歳", male: "10.59", female: "10.93" },
    { grade: "小3", age: "8歳", male: "10.02", female: "10.40" },
    { grade: "小4", age: "9歳", male: "9.61", female: "9.91" },
    { grade: "小5", age: "10歳", male: "9.22", female: "9.52" },
    { grade: "小6", age: "11歳", male: "8.87", female: "9.15" },
    { grade: "中1", age: "12歳", male: "8.42", female: "8.90" },
    { grade: "中2", age: "13歳", male: "7.80", female: "8.62" },
    { grade: "中3", age: "14歳", male: "7.45", female: "8.56" },
    { grade: "高1", age: "15歳", male: "7.45", female: "8.85" },
    { grade: "高2", age: "16歳", male: "7.24", female: "8.79" },
    { grade: "高3", age: "17歳", male: "7.16", female: "8.83" },
  ],
};

/* ===== COMPONENTS ===== */

function RecordsTable({ records }: { records: EventRecord[] }) {
  if (records.length === 0) {
    return <p className="text-text-light text-sm py-2">出場記録なし</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-text-light text-xs">
            <th className="text-left py-1 pr-3">種目</th>
            <th className="text-left py-1 pr-3">区分</th>
            <th className="text-center py-1 pr-3 w-12">順位</th>
            <th className="text-right py-1">タイム</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r, i) => (
            <tr key={`${r.event}-${i}`} className="border-t border-gray-100">
              <td className="py-2 pr-3 text-text-mid">{r.event}</td>
              <td className="py-2 pr-3 text-text-light text-xs">
                {r.category}
                {r.gender ? ` ${r.gender}` : ""}
              </td>
              <td className="py-2 pr-3 text-center">
                {r.rank === 1 ? (
                  <span className="bg-guard-yellow/20 text-guard-yellow px-2 py-0.5 rounded-full text-xs font-bold">
                    1位
                  </span>
                ) : r.rank <= 3 ? (
                  <span className="text-ocean-dark font-bold">{r.rank}位</span>
                ) : (
                  <span className="text-text-mid">{r.rank}位</span>
                )}
              </td>
              <td className="py-2 text-right font-mono text-ocean-dark">
                {r.time || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function YearBlock({
  year,
  records,
  ranking,
  athleteName,
}: {
  year: string;
  records: EventRecord[];
  ranking?: AthleteRankings;
  athleteName: string;
}) {
  const ocean = records.filter((r) => r.section === "ocean");
  const pool = records.filter((r) => r.section === "pool");
  return (
    <div className="border-l-2 border-ocean-mid/30 pl-5 ml-1 pb-6 last:pb-0">
      <div className="flex items-baseline gap-3 mb-3">
        <h4 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-2xl">
          {year}
        </h4>
        <span className="text-xs text-text-light">年度</span>
      </div>

      {ocean.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-bold text-ocean-mid mb-1 flex items-center gap-1">
            <span className="w-1 h-3 bg-ocean-mid rounded-sm" />
            オーシャン・ビーチ
          </p>
          <RecordsTable records={ocean} />
        </div>
      )}

      {pool.length > 0 && (
        <div className="mb-4">
          <p className="text-xs font-bold text-ocean-mid mb-1 flex items-center gap-1">
            <span className="w-1 h-3 bg-guard-yellow rounded-sm" />
            プール
          </p>
          <RecordsTable records={pool} />
        </div>
      )}

      {ranking && <RankingPanel ranking={ranking} athleteName={athleteName} />}
    </div>
  );
}

function RankingPanel({ ranking, athleteName }: { ranking: AthleteRankings; athleteName: string }) {
  const [activeKind, setActiveKind] = useState<"total" | "ocean" | "pool">("total");
  const rows =
    activeKind === "total"
      ? ranking.totalTop
      : activeKind === "ocean"
      ? ranking.oceanTop
      : ranking.poolTop;

  const selfStanding =
    activeKind === "total"
      ? ranking.self.total
      : activeKind === "ocean"
      ? ranking.self.ocean
      : ranking.self.pool;

  // 矢上家本人がTOP10に入っているかチェック
  const selfInTop10 = rows.some((r) => r.highlight === "本人");

  return (
    <div className="mt-4 bg-sand-pale rounded-xl p-4">
      <p className="text-xs text-text-light mb-2">📊 真のライフセーバーランキング</p>
      <h5 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark mb-3">
        {ranking.categoryLabel} TOP10
      </h5>
      <div className="flex gap-1 mb-3">
        {[
          { id: "total" as const, label: "総合" },
          { id: "ocean" as const, label: "オーシャン" },
          { id: "pool" as const, label: "プール" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveKind(tab.id)}
            className={`px-3 py-1 rounded-lg text-xs font-medium transition ${
              activeKind === tab.id
                ? "bg-ocean-mid text-white"
                : "bg-white text-text-mid hover:bg-ocean-mid/10"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <tbody>
            {rows.map((row) => (
              <tr
                key={`${row.rank}-${row.name}`}
                className={`border-t border-gray-200 ${
                  row.highlight === "本人"
                    ? "bg-guard-yellow/10 font-bold"
                    : row.highlight === "館山勢"
                    ? "bg-ocean-mid/5"
                    : ""
                }`}
              >
                <td className="py-1.5 pr-2 w-10 text-center font-bold text-ocean-mid">
                  {row.rank}
                </td>
                <td className="py-1.5 pr-2 text-text-mid">{row.name}</td>
                <td className="py-1.5 pr-2 text-text-light text-[11px]">
                  {row.club}
                </td>
                <td className="py-1.5 text-right font-mono text-ocean-dark">
                  {row.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 矢上家本人がTOP10外の場合は順位を別途表示 */}
      {!selfInTop10 && (
        <div className="mt-3 pt-3 border-t border-ocean-mid/20">
          {selfStanding ? (
            <p className="text-xs text-text-mid">
              <span className="font-bold text-guard-yellow">📍 {athleteName}</span>：
              <span className="font-bold text-ocean-dark">{selfStanding.rank}位</span>
              <span className="ml-2 text-text-light">
                （{selfStanding.points}点／{selfStanding.events}種目入賞）
              </span>
            </p>
          ) : (
            <p className="text-xs text-text-light">
              <span className="font-bold">📍 {athleteName}</span>：この部門は入賞圏外
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function AthleteTimeline({ athlete }: { athlete: AthleteRecords }) {
  const ranking = ranking2025.find((r) => r.shortName === athlete.shortName);
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="gradient-ocean px-6 py-5">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-[family-name:var(--font-serif-jp)] text-white font-bold text-2xl">
              {athlete.athlete}
            </h3>
            <p className="text-ocean-light/60 text-xs font-[family-name:var(--font-display)] tracking-wider mt-1">
              {athlete.athleteEn}
            </p>
          </div>
          <span className="bg-white/20 text-white text-xs px-3 py-1 rounded-full">
            2026年度: {athlete.currentCategory}
          </span>
        </div>
      </div>
      <div className="p-6">
        {athlete.years.map((y, idx) => (
          <YearBlock
            key={y.year}
            year={y.year}
            records={y.records}
            ranking={idx === 0 ? ranking : undefined}
            athleteName={athlete.athlete}
          />
        ))}
      </div>
    </div>
  );
}

/* ===== 全国ランキング ===== */

function NationalRankingPanel({ ranking }: { ranking: CategoryRanking }) {
  const [kind, setKind] = useState<"total" | "ocean" | "pool">("total");
  const rows =
    kind === "total"
      ? ranking.totalTop
      : kind === "ocean"
      ? ranking.oceanTop
      : ranking.poolTop;
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="px-6 py-4 bg-ocean-mid/5 border-b border-ocean-mid/10">
        <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-lg">
          {ranking.label}
        </h3>
      </div>
      <div className="p-5">
        <div className="flex gap-1 mb-3">
          {[
            { id: "total" as const, label: "総合" },
            { id: "ocean" as const, label: "オーシャン" },
            { id: "pool" as const, label: "プール" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setKind(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                kind === tab.id
                  ? "bg-ocean-mid text-white"
                  : "bg-sand-pale text-text-mid hover:bg-ocean-mid/10"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {rows.length === 0 ? (
          <p className="text-text-light text-xs py-2">この部門は対象大会未開催</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <tbody>
                {rows.map((row, i) => (
                  <tr
                    key={`${row.rank}-${row.name}-${i}`}
                    className={`border-t border-gray-100 ${
                      row.highlight === "本人"
                        ? "bg-guard-yellow/10 font-bold"
                        : row.highlight === "館山勢"
                        ? "bg-ocean-mid/5"
                        : ""
                    }`}
                  >
                    <td className="py-1.5 pr-2 w-10 text-center font-bold text-ocean-mid">
                      {row.rank}
                    </td>
                    <td className="py-1.5 pr-2 text-text-mid">{row.name}</td>
                    <td className="py-1.5 pr-2 text-text-light text-[11px]">
                      {row.club}
                    </td>
                    <td className="py-1.5 text-right font-mono text-ocean-dark">
                      {row.points}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

function BenchmarkCard({ data }: { data: AthleteBenchmark }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border-l-4 border-guard-yellow">
      <div className="px-6 py-5 bg-gradient-to-r from-guard-yellow/10 to-transparent">
        <div className="flex items-baseline gap-2 flex-wrap">
          <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-xl text-ocean-dark">
            {data.athleteName}
          </h3>
          <span className="text-xs px-2.5 py-1 rounded-full bg-guard-yellow text-white tracking-wider">
            {data.category}
          </span>
        </div>
        <p className="text-sm text-text-mid mt-3 leading-relaxed">{data.comment}</p>
      </div>
      <div className="p-5">
        {data.events.map((ev) => (
          <div key={ev.event} className="mb-4 last:mb-0">
            <h4 className="text-sm font-bold text-ocean-dark mb-2 flex items-center gap-2 border-b border-gray-100 pb-1">
              <span className="w-1.5 h-1.5 rounded-full bg-guard-yellow" />
              {ev.event}
            </h4>
            <table className="w-full text-xs">
              <tbody>
                {ev.rows.map((r) => (
                  <tr key={r.rank} className="border-t border-gray-100">
                    <td className="py-1.5 pr-2 w-12 font-bold text-guard-yellow">
                      {r.rank}
                    </td>
                    <td className="py-1.5 pr-2 text-text-mid">{r.name}</td>
                    <td className="py-1.5 pr-2 text-text-light text-[11px]">
                      {r.club}
                    </td>
                    <td className="py-1.5 text-right font-mono font-bold text-ocean-dark">
                      {r.time}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== TABS ===== */
type Tab = "lifesaving" | "ranking" | "swimming" | "sprint";

export default function RecordsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("lifesaving");

  const tabs: { id: Tab; label: string; labelEn: string }[] = [
    { id: "lifesaving", label: "ライフセービング記録", labelEn: "Lifesaving" },
    { id: "ranking", label: "全国ランキング", labelEn: "Rankings" },
    { id: "swimming", label: "水泳 資格級・JO基準", labelEn: "Swimming" },
    { id: "sprint", label: "陸上 50m走基準", labelEn: "Sprint" },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-5 gradient-ocean">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateIn>
            <p className="section-label justify-center text-ocean-light/60 before:bg-ocean-light/40">
              Records & Standards
            </p>
            <h1 className="font-[family-name:var(--font-serif-jp)] text-white font-bold mt-4 text-3xl md:text-4xl leading-relaxed">
              記録・指標
            </h1>
            <p className="text-white/50 mt-4 text-sm leading-loose">
              年度ごとの大会記録と、目標となる各種基準値
            </p>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 wave-divider">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z"
              fill="var(--color-sand-pale)"
            />
          </svg>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="bg-sand-pale pt-8 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap px-5 py-3 rounded-xl text-sm font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-ocean-mid text-white shadow-lg shadow-ocean-mid/20"
                    : "bg-white text-text-mid hover:bg-ocean-mid/10"
                }`}
              >
                <span className="font-[family-name:var(--font-serif-jp)]">
                  {tab.label}
                </span>
                <span className="hidden sm:inline text-xs opacity-60 ml-2 font-[family-name:var(--font-display)] tracking-wider">
                  {tab.labelEn}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="py-12 px-5 bg-sand-pale min-h-[60vh]">
        <div className="max-w-5xl mx-auto">
          {/* ===== LIFESAVING TAB ===== */}
          {activeTab === "lifesaving" && (
            <AnimateIn>
              <div className="space-y-8">
                <div>
                  <p className="section-label">Yagami Family</p>
                  <h2 className="section-title mt-2 text-ocean-dark">
                    年度別 大会記録
                  </h2>
                  <p className="text-text-light text-sm mt-2 leading-relaxed">
                    全日本ライフセービング選手権・ユース・ジュニア・JYMプール大会の出場記録（2021〜2025年度）。
                    最新年度には「真のライフセーバーランキング」TOP10も併記しています。
                  </p>
                  <p className="text-text-light text-xs mt-2">
                    ※ ランキング加点：個人種目で1位＝16点、2位＝15点 …16位＝1点（JLA 2026年度方針）／チーム種目は対象外
                  </p>
                </div>

                <div className="grid lg:grid-cols-1 gap-8">
                  {yagamiRecords.map((athlete) => (
                    <AthleteTimeline key={athlete.shortName} athlete={athlete} />
                  ))}
                </div>
              </div>
            </AnimateIn>
          )}

          {/* ===== RANKING TAB ===== */}
          {activeTab === "ranking" && (
            <AnimateIn>
              <div className="space-y-10">
                <div>
                  <p className="section-label">National Rankings 2025-2026</p>
                  <h2 className="section-title mt-2 text-ocean-dark">
                    真のライフセーバーランキング
                  </h2>
                  <p className="text-text-light text-sm mt-2 leading-relaxed">
                    全日本選手権・ユース・ジュニア・JYMプール大会の個人種目を合算した、
                    全カテゴリのTOP10を「総合 / オーシャン / プール」の3部門で表示します。
                  </p>
                  <p className="text-text-light text-xs mt-2">
                    ※ 加点：1位＝16点、2位＝15点 …16位＝1点（JLA 2026年度方針）／チーム種目は対象外／
                    各選手は主区分（U15/U18など）の種目のみ加算
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  {allRankings.map((r) => (
                    <NationalRankingPanel key={r.key} ranking={r} />
                  ))}
                </div>

                <div className="pt-6 border-t border-ocean-mid/20">
                  <p className="section-label">Next Benchmarks</p>
                  <h2 className="section-title mt-2 text-ocean-dark">
                    次の目標タイム
                  </h2>
                  <p className="text-text-light text-sm mt-2 leading-relaxed">
                    JYMプール競技選手権2025の上位タイム（1位／3位／5位／8位／16位）を、
                    3きょうだいの来期ベンチマークとして記しています。
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-5">
                  {benchmarks.map((b) => (
                    <BenchmarkCard key={b.shortName} data={b} />
                  ))}
                </div>
              </div>
            </AnimateIn>
          )}

          {/* ===== SWIMMING TAB ===== */}
          {activeTab === "swimming" && (
            <AnimateIn>
              <div className="space-y-8">
                <div>
                  <p className="section-label">Swimming Standards</p>
                  <h2 className="section-title mt-2 text-ocean-dark">
                    水泳 資格級 & JO基準
                  </h2>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 overflow-x-auto">
                  <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark mb-4">
                    {swimGrades.title}
                  </h3>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-text-light text-xs border-b-2 border-ocean-light/20">
                        <th className="text-left py-2">クラス</th>
                        <th className="text-center py-2">級</th>
                        <th className="text-center py-2">タイム</th>
                        <th className="text-left py-2">レベル</th>
                      </tr>
                    </thead>
                    <tbody>
                      {swimGrades.grades.map((g) => (
                        <tr
                          key={g.num}
                          className={`border-t border-gray-100 ${
                            g.num === 4 ? "bg-sunset/10 font-bold" : ""
                          }`}
                        >
                          <td className="py-2.5">
                            <span
                              className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                                g.cls === "AA"
                                  ? "bg-guard-yellow/20 text-guard-yellow"
                                  : g.cls === "A"
                                  ? "bg-green-50 text-green-600"
                                  : "bg-blue-50 text-blue-600"
                              }`}
                            >
                              {g.cls}
                            </span>
                          </td>
                          <td className="py-2.5 text-center font-mono">{g.num}</td>
                          <td className="py-2.5 text-center font-mono font-medium text-ocean-dark">
                            {g.time}
                          </td>
                          <td className="py-2.5 text-text-mid">{g.level}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-4 p-4 bg-sunset/5 rounded-xl border border-sunset/20">
                    <p className="text-sm font-bold text-ocean-dark">
                      賢尚の現在地：41秒 → <span className="text-sunset">B4級相当</span>
                    </p>
                    <p className="text-xs text-text-light mt-1">
                      飛び込み補正込みで実質B5級圏内。A級（38.39秒）まであと約2.6秒
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark mb-4">
                    JO（ジュニアオリンピック）標準記録 9歳以下 男子 50m自由形
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-ocean-mid/5 rounded-xl p-5 text-center">
                      <p className="text-xs text-text-light mb-1">短水路（25m）</p>
                      <p className="text-3xl font-mono font-bold text-ocean-dark">
                        {swimGrades.joStandard.shortCourse}
                      </p>
                    </div>
                    <div className="bg-ocean-mid/5 rounded-xl p-5 text-center">
                      <p className="text-xs text-text-light mb-1">長水路（50m）</p>
                      <p className="text-3xl font-mono font-bold text-ocean-dark">
                        {swimGrades.joStandard.longCourse}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </AnimateIn>
          )}

          {/* ===== SPRINT TAB ===== */}
          {activeTab === "sprint" && (
            <AnimateIn>
              <div className="space-y-8">
                <div>
                  <p className="section-label">Sprint Standards</p>
                  <h2 className="section-title mt-2 text-ocean-dark">
                    陸上 50m走 全国平均
                  </h2>
                  <p className="text-text-light text-sm mt-2">
                    文部科学省 新体力テスト データより
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-sm p-6 overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-text-light text-xs border-b-2 border-ocean-light/20">
                        <th className="text-left py-2">学年</th>
                        <th className="text-center py-2">年齢</th>
                        <th className="text-center py-2">男子平均</th>
                        <th className="text-center py-2">女子平均</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sprint50m.data.map((d) => (
                        <tr
                          key={d.grade}
                          className={`border-t border-gray-100 ${
                            d.age === "9歳"
                              ? "bg-sunset/10 font-bold"
                              : d.age === "15歳" || d.age === "17歳"
                              ? "bg-ocean-mid/5"
                              : ""
                          }`}
                        >
                          <td className="py-2.5 font-medium text-ocean-dark">
                            {d.grade}
                          </td>
                          <td className="py-2.5 text-center text-text-mid">
                            {d.age}
                          </td>
                          <td className="py-2.5 text-center font-mono">{d.male}秒</td>
                          <td className="py-2.5 text-center font-mono">
                            {d.female}秒
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="mt-4 p-4 bg-sunset/5 rounded-xl border border-sunset/20">
                    <p className="text-sm font-bold text-ocean-dark">
                      賢尚（9歳）：9.4秒 →{" "}
                      <span className="text-green-600">平均9.61秒を上回る</span>
                    </p>
                  </div>
                </div>
              </div>
            </AnimateIn>
          )}
        </div>
      </section>
    </>
  );
}
