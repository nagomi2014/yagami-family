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
import {
  yagamiSwimGrades,
  type AthleteSwimGrades,
  type DistanceGrade,
} from "./swim_grades";

/* ===== 水泳資格級（旧定数。新データは swim_grades.ts へ） ===== */
const joStandard = { shortCourse: "31.14", longCourse: "31.56" };

/* ===== 陸上100m走 3きょうだいの全国基準 ===== */
type SprintTarget = {
  level: string;
  time: string;
  note: string;
  highlight?: boolean;
};

type AthleteSprint = {
  shortName: string;
  athleteName: string;
  ageLabel: string;
  categoryLabel: string;
  description: string;
  targets: SprintTarget[];
  closingNote?: string;
};

const sprintData: AthleteSprint[] = [
  {
    shortName: "賢尚",
    athleteName: "矢上 賢尚",
    ageLabel: "小学3年生（男子）",
    categoryLabel: "全国小学生陸上競技交流大会（日清食品カップ）",
    description:
      "出場対象は5・6年生のみ。参加標準タイムは設定されておらず、各都道府県の代表として選抜される必要があります。賢尚は小3のため、来々年（小5）から出場対象に。",
    targets: [
      { level: "小6男子 大会記録", time: "11.63秒", note: "目野 惺大（2025年）" },
      { level: "小5男子 大会記録", time: "12.48秒", note: "服部 蓮太郎（2017年）", highlight: true },
      { level: "全国大会 決勝進出ライン", time: "11.5〜12.5秒", note: "5・6年生 全国上位レベル" },
      { level: "都道府県 上位入賞", time: "12.5〜13.0秒", note: "県大会 表彰台クラス" },
      { level: "都道府県 決勝進出", time: "13.0〜13.7秒", note: "兵庫県小6男子・2024年決勝参考" },
    ],
    closingNote:
      "※ 陸上のジュニアオリンピックカップ（U16/U18/U20）は中学生以上が対象のため、小学生にはJO基準そのものは存在しない。",
  },
  {
    shortName: "陽葉",
    athleteName: "矢上 陽葉",
    ageLabel: "中学2年生（女子・U16カデット）",
    categoryLabel: "全日本中学校陸上競技選手権（全中陸上） / U16カデット",
    description:
      "全日本中学校陸上競技選手権（全中）の参加標準記録（2025年度）と、JOCジュニアオリンピックカップ第56回U16陸上競技大会の参考タイム。",
    targets: [
      { level: "全中 女子100m 参加標準（2025）", time: "12.50秒", note: "全国大会出場ライン", highlight: true },
      { level: "JO U16 都道府県予選 標準", time: "13.70秒", note: "三重県U16共通女子参考（2025）" },
      { level: "中学全国上位 決勝", time: "11.8〜12.3秒", note: "全国大会 表彰台クラス" },
    ],
  },
  {
    shortName: "結月",
    athleteName: "矢上 結月",
    ageLabel: "高校2年生（女子・U18ユース）",
    categoryLabel: "全国高等学校総合体育大会（インターハイ） / U18ユース",
    description:
      "インターハイ（全国高校総体）の参加標準記録と、JOCジュニアオリンピックカップ第19回U18陸上競技大会の参考タイム。",
    targets: [
      { level: "インターハイ 女子100m 参加標準", time: "12.25秒", note: "全国大会標準タイム", highlight: true },
      { level: "高校全国上位 決勝", time: "11.5〜12.0秒", note: "インターハイ 表彰台クラス" },
      { level: "県総体 決勝進出", time: "12.5〜13.5秒", note: "都道府県大会上位の目安" },
    ],
  },
];

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

/* ===== 水泳 資格級カード ===== */

function DistanceGradeTable({
  data,
  athleteName,
}: {
  data: DistanceGrade;
  athleteName: string;
}) {
  // 「次の目標」級を計算：currentより速いgrade群の中で最も遅いタイム
  const currentSec = parseTime(data.current);
  const slowerGrades = data.grades
    .filter((g) => parseTime(g.time) < currentSec)
    .sort((a, b) => parseTime(b.time) - parseTime(a.time));
  const nextGradeTime = slowerGrades[0]?.time;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="px-5 py-4 bg-ocean-mid/5 border-b border-ocean-mid/10 flex items-baseline justify-between flex-wrap gap-2">
        <h4 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-lg">
          {data.distance}
        </h4>
        <div className="text-right">
          <span className="text-xs text-text-light mr-2">現在</span>
          <span className="font-mono font-bold text-ocean-dark text-lg">
            {data.current}
          </span>
          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-sunset/15 text-sunset font-bold">
            {data.currentLevel}
          </span>
        </div>
      </div>
      <div className="px-5 py-3 bg-sunset/5 border-b border-sunset/10">
        <p className="text-xs text-text-mid">
          <span className="font-bold text-sunset mr-1">📍 {athleteName}</span>
          {data.comment}
        </p>
      </div>
      <div className="overflow-x-auto p-2">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-text-light text-xs border-b-2 border-ocean-light/20">
              <th className="text-left py-2 px-2">クラス</th>
              <th className="text-center py-2">級</th>
              <th className="text-center py-2">基準タイム</th>
              <th className="text-left py-2 px-2">現在地</th>
            </tr>
          </thead>
          <tbody>
            {data.grades.map((g) => {
              const baseStatus = compareCleared(data.current, g.time);
              const cleared =
                baseStatus === "future" && g.time === nextGradeTime
                  ? "next"
                  : baseStatus;
              return (
                <tr
                  key={`${g.cls}-${g.num}`}
                  className={`border-t border-gray-100 ${
                    cleared === "next"
                      ? "bg-sunset/10 font-bold"
                      : cleared === "cleared"
                      ? "bg-green-50/50"
                      : ""
                  }`}
                >
                  <td className="py-1.5 px-2">
                    <span
                      className={`text-[11px] px-2 py-0.5 rounded-full font-bold ${
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
                  <td className="py-1.5 text-center font-mono text-xs">{g.num}</td>
                  <td className="py-1.5 text-center font-mono text-ocean-dark">
                    {g.time}
                  </td>
                  <td className="py-1.5 px-2 text-xs">
                    {cleared === "cleared" ? (
                      <span className="text-green-600">✓ クリア</span>
                    ) : cleared === "next" ? (
                      <span className="text-sunset font-bold">← 次の目標</span>
                    ) : (
                      <span className="text-text-light">挑戦中</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// "39.00" / "1:13.00" のタイム文字列を秒数に変換
function parseTime(s: string): number {
  if (s.includes(":")) {
    const [m, sec] = s.split(":");
    return parseInt(m) * 60 + parseFloat(sec);
  }
  return parseFloat(s);
}

// current が grade.time をクリアしているか判定
// "cleared": クリア済み（current ≤ grade）
// "next": クリアしていないが、最も近い未達ライン
// "future": まだ届かない上位
function compareCleared(
  current: string,
  gradeTime: string
): "cleared" | "next" | "future" {
  const c = parseTime(current);
  const g = parseTime(gradeTime);
  // current が g 以下（速い）= cleared
  if (c <= g) return "cleared";
  return "future";
}

function AthleteSwimCard({ athlete }: { athlete: AthleteSwimGrades }) {
  return (
    <div className="space-y-5">
      <div className="bg-ocean-mid/5 rounded-2xl p-5 border-l-4 border-ocean-mid">
        <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-xl">
          {athlete.athleteName}
          <span className="ml-3 text-xs px-2.5 py-1 rounded-full bg-ocean-mid text-white tracking-wider">
            {athlete.ageLabel}
          </span>
        </h3>
        <p className="text-text-light text-xs mt-1">
          資格級カテゴリ：{athlete.categoryLabel}
        </p>
      </div>
      <div className="grid lg:grid-cols-1 gap-5">
        {athlete.distances.map((d) => (
          <DistanceGradeTable
            key={d.distance}
            data={d}
            athleteName={athlete.athleteName}
          />
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
    { id: "sprint", label: "陸上 100m走基準", labelEn: "Sprint" },
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
              <div className="space-y-10">
                <div>
                  <p className="section-label">Swimming Qualification</p>
                  <h2 className="section-title mt-2 text-ocean-dark">
                    水泳 資格級
                  </h2>
                  <p className="text-text-light text-sm mt-2 leading-relaxed">
                    日本水泳連盟の年齢別資格級を、3きょうだいの年代＋種目別にまとめました。
                    現在タイム（黄色）とクリア済み級（緑）、次の目標（オレンジ）を一目で確認できます。
                  </p>
                </div>

                {yagamiSwimGrades.map((athlete) => (
                  <div key={athlete.shortName} className="space-y-5">
                    <AthleteSwimCard athlete={athlete} />
                  </div>
                ))}

                <div className="pt-6 border-t border-ocean-mid/20">
                  <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark mb-4 text-lg">
                    JO（ジュニアオリンピック）標準記録 ／ 9歳以下 男子 50m自由形
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-ocean-mid/5 rounded-xl p-5 text-center">
                      <p className="text-xs text-text-light mb-1">短水路（25m）</p>
                      <p className="text-3xl font-mono font-bold text-ocean-dark">
                        {joStandard.shortCourse}
                      </p>
                    </div>
                    <div className="bg-ocean-mid/5 rounded-xl p-5 text-center">
                      <p className="text-xs text-text-light mb-1">長水路（50m）</p>
                      <p className="text-3xl font-mono font-bold text-ocean-dark">
                        {joStandard.longCourse}
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
              <div className="space-y-10">
                <div>
                  <p className="section-label">Sprint Standards</p>
                  <h2 className="section-title mt-2 text-ocean-dark">
                    陸上 100m走 全国基準
                  </h2>
                  <p className="text-text-light text-sm mt-2 leading-relaxed">
                    3きょうだいそれぞれの年代に対応する全国大会の参加標準・大会記録をまとめました。
                  </p>
                </div>

                {sprintData.map((athlete) => (
                  <div
                    key={athlete.shortName}
                    className="bg-white rounded-2xl shadow-sm overflow-hidden"
                  >
                    <div className="px-6 py-5 bg-gradient-to-r from-ocean-mid/10 to-transparent border-l-4 border-ocean-mid">
                      <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-xl">
                        {athlete.athleteName}
                        <span className="ml-3 text-xs px-2.5 py-1 rounded-full bg-ocean-mid text-white tracking-wider">
                          {athlete.ageLabel}
                        </span>
                      </h3>
                      <p className="text-text-light text-xs mt-1">
                        {athlete.categoryLabel}
                      </p>
                      <p className="text-text-mid text-sm mt-3 leading-relaxed">
                        {athlete.description}
                      </p>
                    </div>
                    <div className="p-5">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-text-light text-xs border-b-2 border-ocean-light/20">
                            <th className="text-left py-2 pr-3">レベル</th>
                            <th className="text-center py-2 pr-3">タイム</th>
                            <th className="text-left py-2">備考</th>
                          </tr>
                        </thead>
                        <tbody>
                          {athlete.targets.map((t) => (
                            <tr
                              key={t.level}
                              className={`border-t border-gray-100 ${
                                t.highlight
                                  ? "bg-sunset/10 font-bold"
                                  : ""
                              }`}
                            >
                              <td className="py-2.5 pr-3 text-text-mid">
                                {t.level}
                              </td>
                              <td className="py-2.5 pr-3 text-center font-mono font-bold text-ocean-dark">
                                {t.time}
                              </td>
                              <td className="py-2.5 text-text-light text-xs">
                                {t.note}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {athlete.closingNote && (
                        <p className="text-[11px] text-text-light mt-4 leading-relaxed">
                          {athlete.closingNote}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </AnimateIn>
          )}
        </div>
      </section>
    </>
  );
}
