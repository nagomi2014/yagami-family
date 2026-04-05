"use client";

import { useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";

/* ===== DATA ===== */

type Record = {
  year: string;
  time: string;
  rank: number | string;
  note?: string;
};

type EventRecords = {
  event: string;
  records: Record[];
};

type AthleteData = {
  name: string;
  nameEn: string;
  age: string;
  club: string;
  events: EventRecords[];
};

const athleteRecords: AthleteData[] = [
  {
    name: "矢上 結月",
    nameEn: "Yuzuki Yagami",
    age: "17歳",
    club: "館山SLSC",
    events: [
      {
        event: "障害物スイム 100m (U15)",
        records: [{ year: "2024", time: "1:33.47", rank: 25 }],
      },
      {
        event: "マネキンキャリー 50m (U15)",
        records: [{ year: "2024", time: "1:03.97", rank: 17 }],
      },
      {
        event: "マネキンキャリーWF 100m (U15)",
        records: [{ year: "2024", time: "失格", rank: "-" }],
      },
      {
        event: "マネキントウWF 100m (U15)",
        records: [{ year: "2024", time: "1:32.10", rank: 15 }],
      },
      {
        event: "スーパーライフセーバー 200m (U18)",
        records: [{ year: "2025", time: "3:52.41", rank: 22 }],
      },
    ],
  },
  {
    name: "矢上 陽葉",
    nameEn: "Kiyoha Yagami",
    age: "15歳",
    club: "館山SLSC",
    events: [
      {
        event: "障害物スイム 50m (U12)",
        records: [
          { year: "2022", time: "39.51", rank: 12 },
          { year: "2023", time: "36.57", rank: 13, note: "-2.94秒" },
        ],
      },
      {
        event: "障害物スイム 100m (U15)",
        records: [
          { year: "2024", time: "1:19.74", rank: 21 },
          { year: "2025", time: "1:19.40", rank: 26, note: "-0.34秒" },
        ],
      },
      {
        event: "レスキューチューブトウ 100m (U12)",
        records: [
          { year: "2022", time: "1:34.82", rank: 10 },
          { year: "2023", time: "1:31.24", rank: 10, note: "-3.58秒" },
        ],
      },
      {
        event: "マネキンキャリー 50m (U15)",
        records: [
          { year: "2024", time: "53.94", rank: 16 },
          { year: "2025", time: "48.97", rank: 17, note: "-4.97秒" },
        ],
      },
      {
        event: "マネキンキャリーWF 100m (U15)",
        records: [
          { year: "2024", time: "失格", rank: "-" },
          { year: "2025", time: "1:24.41", rank: 17, note: "完泳達成" },
        ],
      },
      {
        event: "マネキントウWF 100m (U15)",
        records: [
          { year: "2024", time: "1:37.74", rank: 20 },
          { year: "2025", time: "1:27.72", rank: 20, note: "-10.02秒" },
        ],
      },
      {
        event: "スーパーライフセーバー 200m (U18)",
        records: [{ year: "2025", time: "3:34.41", rank: 19 }],
      },
    ],
  },
  {
    name: "矢上 賢尚",
    nameEn: "Kenshow Yagami",
    age: "9歳",
    club: "館山SLSC",
    events: [
      {
        event: "50m自由形（短水路・手動計測）",
        records: [{ year: "2026", time: "41.00", rank: "B4級相当" }],
      },
      {
        event: "50m走",
        records: [{ year: "2026", time: "9.40秒", rank: "平均超" }],
      },
    ],
  },
];

/* ===== 藤﨑笑佳（比較参考） ===== */
const rivalRecords: AthleteData = {
  name: "藤﨑 笑佳",
  nameEn: "Emika Fujisaki",
  age: "",
  club: "西浜SLSC（2025）",
  events: [
    {
      event: "障害物スイム 50m (U12)",
      records: [
        { year: "2022", time: "35.30", rank: 7 },
        { year: "2023", time: "34.69", rank: 7, note: "-0.61秒" },
      ],
    },
    {
      event: "障害物スイム 100m (U15)",
      records: [{ year: "2025", time: "1:10.13", rank: 4 }],
    },
    {
      event: "マネキンキャリー 50m (U15)",
      records: [
        { year: "2024", time: "44.25", rank: 2 },
        { year: "2025", time: "41.84", rank: 4, note: "-2.41秒" },
      ],
    },
    {
      event: "マネキンキャリーWF 100m (U15)",
      records: [
        { year: "2024", time: "1:13.37", rank: 3 },
        { year: "2025", time: "1:07.00", rank: 3, note: "-6.37秒" },
      ],
    },
    {
      event: "マネキントウWF 100m (U15)",
      records: [
        { year: "2024", time: "1:12.92", rank: 1, note: "優勝" },
        { year: "2025", time: "1:09.00", rank: 1, note: "2連覇" },
      ],
    },
    {
      event: "スーパーライフセーバー 200m (U18)",
      records: [{ year: "2025", time: "2:57.37", rank: 6 }],
    },
  ],
};

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

function AthleteRecordCard({ athlete }: { athlete: AthleteData }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Header */}
      <div className="gradient-ocean px-6 py-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-[family-name:var(--font-serif-jp)] text-white font-bold text-xl">
              {athlete.name}
            </h3>
            <p className="text-ocean-light/60 text-xs font-[family-name:var(--font-display)] tracking-wider mt-1">
              {athlete.nameEn}
            </p>
          </div>
          <div className="text-right">
            <span className="text-white/80 text-sm">{athlete.age}</span>
            <p className="text-ocean-light/50 text-xs">{athlete.club}</p>
          </div>
        </div>
      </div>

      {/* Records */}
      <div className="p-6">
        {athlete.events.map((ev) => (
          <div key={ev.event} className="mb-5 last:mb-0">
            <h4 className="text-sm font-bold text-ocean-dark mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ocean-mid" />
              {ev.event}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-text-light text-xs">
                    <th className="text-left py-1 pr-4">年</th>
                    <th className="text-left py-1 pr-4">記録</th>
                    <th className="text-left py-1 pr-4">順位</th>
                    <th className="text-left py-1">成長</th>
                  </tr>
                </thead>
                <tbody>
                  {ev.records.map((r) => (
                    <tr key={r.year} className="border-t border-gray-100">
                      <td className="py-2 pr-4 text-text-mid">{r.year}</td>
                      <td className="py-2 pr-4 font-mono font-medium text-ocean-dark">
                        {r.time}
                      </td>
                      <td className="py-2 pr-4 text-text-mid">
                        {r.rank === 1 ? (
                          <span className="bg-guard-yellow/20 text-guard-yellow px-2 py-0.5 rounded-full text-xs font-bold">
                            1位
                          </span>
                        ) : (
                          `${r.rank}${typeof r.rank === "number" ? "位" : ""}`
                        )}
                      </td>
                      <td className="py-2">
                        {r.note && (
                          <span
                            className={`text-xs px-2 py-0.5 rounded-full ${
                              r.note.startsWith("-")
                                ? "bg-green-50 text-green-600"
                                : r.note === "完泳達成" || r.note.includes("連覇")
                                ? "bg-blue-50 text-blue-600"
                                : "bg-gray-50 text-gray-600"
                            }`}
                          >
                            {r.note}
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===== TABS ===== */
type Tab = "lifesaving" | "swimming" | "sprint";

export default function RecordsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("lifesaving");

  const tabs: { id: Tab; label: string; labelEn: string }[] = [
    { id: "lifesaving", label: "ライフセービング記録", labelEn: "Lifesaving" },
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
              大会記録の推移と、目標となる各種基準値
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
                    全日本JYMプール大会 記録推移
                  </h2>
                  <p className="text-text-light text-sm mt-2">
                    2022年〜2025年の全日本ジュニア・ユース・マスターズ ライフセービング プール競技選手権大会
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-6">
                  {athleteRecords.map((athlete) => (
                    <AthleteRecordCard key={athlete.name} athlete={athlete} />
                  ))}
                </div>

                {/* 藤﨑笑佳（比較参考） */}
                <div className="mt-12">
                  <p className="section-label">Rival & Training Partner</p>
                  <h2 className="section-title mt-2 text-ocean-dark">
                    比較参考：藤﨑 笑佳
                  </h2>
                  <p className="text-text-light text-sm mt-2">
                    館山SLSC時代から共に成長してきた仲間の記録
                  </p>
                  <div className="mt-6 max-w-2xl">
                    <AthleteRecordCard athlete={rivalRecords} />
                  </div>
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

                {/* 資格級テーブル */}
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
                            g.num === 4
                              ? "bg-sunset/10 font-bold"
                              : ""
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
                          <td className="py-2.5 text-center font-mono">
                            {g.num}
                          </td>
                          <td className="py-2.5 text-center font-mono font-medium text-ocean-dark">
                            {g.time}
                          </td>
                          <td className="py-2.5 text-text-mid">{g.level}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* 賢尚の現在位置 */}
                  <div className="mt-4 p-4 bg-sunset/5 rounded-xl border border-sunset/20">
                    <p className="text-sm font-bold text-ocean-dark">
                      賢尚の現在地：41秒 → <span className="text-sunset">B4級相当</span>
                    </p>
                    <p className="text-xs text-text-light mt-1">
                      飛び込み補正込みで実質B5級圏内。A級（38.39秒）まであと約2.6秒
                    </p>
                  </div>
                </div>

                {/* JO基準 */}
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
                          <td className="py-2.5 text-center font-mono">
                            {d.male}秒
                          </td>
                          <td className="py-2.5 text-center font-mono">
                            {d.female}秒
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* 賢尚の現在位置 */}
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
