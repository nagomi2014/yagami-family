"use client";

import { useState } from "react";
import { AnimateIn } from "@/components/AnimateIn";

type EventRule = {
  name: string;
  nameEn: string;
  distance: string;
  category: string;
  icon: string;
  description: string;
  rules: string[];
  tips: string[];
  familyNote?: string;
};

const poolEvents: EventRule[] = [
  {
    name: "障害物スイム",
    nameEn: "Obstacle Swim",
    distance: "50m (U12) / 100m (U15)",
    category: "プール競技",
    icon: "🏊",
    description: "水中に設置された障害物（ネット）の下を潜って通過しながら泳ぐ種目。",
    rules: [
      "プール底の障害物（ネット）を完全にくぐって通過する",
      "障害物の上を越えると失格",
      "50mは障害物2つ、100mは障害物4つ（ターンあり）",
      "飛び込みスタート",
    ],
    tips: [
      "潜水のタイミングが重要。障害物手前で無駄なく潜る",
      "通過後はドルフィンキックで加速",
    ],
    familyNote: "結月・陽葉が毎年出場する主力種目。陽葉は2022年の50m（39.51秒）から毎年更新中。",
  },
  {
    name: "マネキンキャリー",
    nameEn: "Manikin Carry",
    distance: "50m (U15)",
    category: "プール競技",
    icon: "🏋️",
    description: "プール底に沈んだマネキンを引き上げ、抱えて泳いで運ぶ種目。溺者救助を模した競技。",
    rules: [
      "プール底のマネキンまで泳ぎ、水面に引き上げる",
      "仰向けに抱え、マネキンの顔を水面上に出して運ぶ",
      "マネキンを引きずってはいけない",
      "マネキンを持ったまま壁にゴールタッチ",
    ],
    tips: [
      "リフトの速さがタイムを大きく左右する",
      "背泳ぎ姿勢でマネキンを胸に抱え、キックで推進",
    ],
    familyNote: "陽葉は2024→2025で約5秒短縮（53.94→48.97秒）。",
  },
  {
    name: "マネキンキャリー・ウィズフィン",
    nameEn: "Manikin Carry with Fins",
    distance: "100m (U15)",
    category: "プール競技",
    icon: "🦶",
    description: "フィン（足ひれ）装着でマネキンを運ぶ100m版。フィンの推進力を活かす技術が必要。",
    rules: [
      "フィンを装着してスタート",
      "50m地点でマネキンを引き上げ、残り50mを運ぶ",
      "マネキンの顔は常に水面上に出す",
    ],
    tips: [
      "前半のスイムスピードとマネキンリフトの切り替えがポイント",
      "フィンの浮力を利用してマネキンを安定させる",
    ],
    familyNote: "陽葉は2024年に失格→2025年に1:24.41で完泳達成。",
  },
  {
    name: "マネキントウ・ウィズフィン",
    nameEn: "Manikin Tow with Fins",
    distance: "100m (U15)",
    category: "プール競技",
    icon: "🔗",
    description: "フィンとレスキューチューブを装着し、マネキンにチューブを掛けて曳航する種目。最も実践的。",
    rules: [
      "フィン＋レスキューチューブを装着してスタート",
      "50m地点でマネキンにチューブをクリップで固定",
      "残り50mをマネキンを曳航して泳ぐ",
      "ゴール時にマネキンがチューブに繋がっていること",
    ],
    tips: [
      "クリップ操作の速さが勝負を分ける",
      "曳航時は一定のテンションを保つ",
    ],
    familyNote: "藤崎笑佳が2024・2025年と2年連続優勝。陽葉は2025年に10秒短縮の1:27.72。",
  },
  {
    name: "スーパーライフセーバー",
    nameEn: "Super Lifesaver",
    distance: "200m (U18)",
    category: "プール競技",
    icon: "⭐",
    description: "障害物スイム＋マネキンキャリー＋マネキントウを1人で連続して行う複合種目。最高難度。",
    rules: [
      "第1区間（50m）：障害物スイム",
      "第2区間（50m）：素泳ぎ（自由形）",
      "第3区間（50m）：マネキンキャリー",
      "第4区間（50m）：フィン装着→マネキントウ",
    ],
    tips: [
      "ペース配分が重要。前半で飛ばしすぎると後半でミスが出る",
      "フィン＋チューブの装着を素早く行う練習が不可欠",
    ],
    familyNote: "2025年に結月（3:52.41/22位）・陽葉（3:34.41/19位）・藤崎（2:57.37/6位）が出場。",
  },
];

const beachEvents: EventRule[] = [
  {
    name: "ビーチスプリント",
    nameEn: "Beach Sprint",
    distance: "90m",
    category: "ビーチ競技",
    icon: "🏃",
    description: "砂浜を全力で駆け抜けるスプリント種目。",
    rules: [
      "砂浜90mのコースを走る",
      "トーナメント形式（4人1組、上位2名が次へ）",
      "フライングは1回で失格",
    ],
    tips: [
      "前傾姿勢を保ち、膝を高く上げる",
      "つま先で走ると砂に足を取られにくい",
    ],
  },
  {
    name: "ビーチフラッグス",
    nameEn: "Beach Flags",
    distance: "-",
    category: "ビーチ競技",
    icon: "🚩",
    description: "うつ伏せからスタートし、後方のフラッグ（棒）を取り合う種目。",
    rules: [
      "スタートラインにうつ伏せで待機",
      "笛の合図で起き上がり、20m後方のフラッグを取りに走る",
      "選手数 - 1本のフラッグ。取れなかった選手が敗退",
    ],
    tips: [
      "起き上がりの速さが最重要",
      "周囲を見ながら空いているフラッグを狙う",
    ],
  },
];

const relayEvents: EventRule[] = [
  {
    name: "障害物リレー",
    nameEn: "Obstacle Relay",
    distance: "4x50m",
    category: "プールリレー",
    icon: "🔄",
    description: "4人が1人50mずつ障害物スイムをリレーする種目。",
    rules: [
      "4人1チーム、1人50m（障害物2つ）ずつ",
      "前の泳者がゴールタッチ後に次の泳者がスタート",
      "男女混合チーム可（大会による）",
    ],
    tips: ["アンカーにエースを置くのが一般的"],
    familyNote: "2022年に矢上・藤崎が館山SLSCチームで出場。",
  },
];

function EventCard({ event }: { event: EventRule }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-6 flex items-start gap-4 hover:bg-sand-pale/50 transition-colors"
      >
        <span className="text-3xl shrink-0 mt-1">{event.icon}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-ocean-mid/10 text-ocean-mid font-medium">{event.category}</span>
            <span className="text-[10px] text-text-light">{event.distance}</span>
          </div>
          <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-lg">{event.name}</h3>
          <p className="text-xs text-text-light font-[family-name:var(--font-display)] tracking-wider">{event.nameEn}</p>
          <p className="text-text-mid text-sm mt-2 leading-relaxed">{event.description}</p>
        </div>
        <span className={`text-ocean-mid text-xl transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}>▾</span>
      </button>
      {isOpen && (
        <div className="px-6 pb-6 border-t border-gray-100">
          <div className="mt-4">
            <h4 className="text-xs font-[family-name:var(--font-display)] tracking-wider uppercase text-text-light mb-3">Rules</h4>
            <ul className="space-y-2">
              {event.rules.map((rule, i) => (
                <li key={i} className="text-sm text-text-mid flex items-start gap-2">
                  <span className="text-ocean-mid mt-0.5 shrink-0">{i + 1}.</span>{rule}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-5">
            <h4 className="text-xs font-[family-name:var(--font-display)] tracking-wider uppercase text-text-light mb-3">Tips</h4>
            <ul className="space-y-2">
              {event.tips.map((tip, i) => (
                <li key={i} className="text-sm text-text-mid flex items-start gap-2">
                  <span className="text-sunset shrink-0">▸</span>{tip}
                </li>
              ))}
            </ul>
          </div>
          {event.familyNote && (
            <div className="mt-5 p-4 bg-sunset/5 rounded-xl border border-sunset/20">
              <p className="text-xs font-bold text-ocean-dark mb-1">🌊 矢上家メモ</p>
              <p className="text-sm text-text-mid leading-relaxed">{event.familyNote}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function RulesPage() {
  return (
    <>
      <section className="relative pt-32 pb-20 px-5 gradient-ocean">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateIn>
            <p className="section-label justify-center text-ocean-light/60 before:bg-ocean-light/40">Competition Rules</p>
            <h1 className="font-[family-name:var(--font-serif-jp)] text-white font-bold mt-4 text-3xl md:text-4xl leading-relaxed">競技ルール解説</h1>
            <p className="text-white/50 mt-4 text-sm leading-loose">ライフセービングのプール競技・ビーチ競技のルールをわかりやすく解説</p>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 wave-divider">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-sand-pale)" />
          </svg>
        </div>
      </section>

      <section className="py-12 px-5 bg-sand-pale">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <p className="section-label">Pool Events</p>
            <h2 className="section-title mt-2 text-ocean-dark">プール競技</h2>
            <p className="text-text-light text-sm mt-2">タップで詳細ルール・コツ・矢上家メモを表示</p>
          </AnimateIn>
          <div className="mt-8 space-y-4">
            {poolEvents.map((e) => (<AnimateIn key={e.name}><EventCard event={e} /></AnimateIn>))}
          </div>
        </div>
      </section>

      <section className="py-12 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <p className="section-label">Relay Events</p>
            <h2 className="section-title mt-2 text-ocean-dark">リレー競技</h2>
          </AnimateIn>
          <div className="mt-8 space-y-4">
            {relayEvents.map((e) => (<AnimateIn key={e.name}><EventCard event={e} /></AnimateIn>))}
          </div>
        </div>
      </section>

      <section className="py-12 px-5 bg-sand-pale">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <p className="section-label">Beach Events</p>
            <h2 className="section-title mt-2 text-ocean-dark">ビーチ競技</h2>
          </AnimateIn>
          <div className="mt-8 space-y-4">
            {beachEvents.map((e) => (<AnimateIn key={e.name}><EventCard event={e} /></AnimateIn>))}
          </div>
        </div>
      </section>

      <section className="py-16 px-5 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateIn>
            <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-lg mb-4">公式競技規則</h3>
            <p className="text-text-mid text-sm mb-6 leading-relaxed">
              正式な競技規則は日本ライフセービング協会（JLA）が制定しています。
            </p>
            <a
              href="https://ls.jla-lifesaving.or.jp/lifesaving-sports/rule/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ocean-mid hover:bg-ocean text-white font-medium px-8 py-4 rounded-full text-sm tracking-wider transition-colors shadow-lg shadow-ocean-mid/20"
            >
              JLA 公式規程ページ ↗
            </a>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
