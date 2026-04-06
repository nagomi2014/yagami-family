"use client";

import { AnimateIn } from "@/components/AnimateIn";

const athletes = [
  {
    name: "矢上 結月",
    nameEn: "Yuzuki Yagami",
    age: "17歳",
    events: ["障害物スイム", "マネキントウ", "スーパーライフセーバー"],
    bio: "矢上家の長女。ライフセービングのプール競技で着実に成長を続ける。2024年には館山SLSCからフル参戦し、2025年にはスーパーライフセーバー200mに挑戦。",
    quote: "「挑戦し続けることが、自分を強くしてくれる。」",
    achievements: [
      "2024年 全日本JYMプール大会 マネキントウWF100m 15位",
      "2025年 全日本JYMプール大会 スーパーライフセーバー200m 22位",
    ],
  },
  {
    name: "矢上 陽葉",
    nameEn: "Kiyoha Yagami",
    age: "15歳",
    events: ["障害物スイム", "マネキンキャリー", "マネキントウ"],
    bio: "2022年の小学生時代から全日本大会に出場し続ける館山SLSC一筋の選手。毎年確実にタイムを伸ばし、2025年は全5種目にエントリー。",
    quote: "「海でも、プールでも、全力で泳ぐのが好き。」",
    achievements: [
      "2022年 全日本JYMプール大会 障害物スイム50m 12位（初出場）",
      "2025年 全日本JYMプール大会 障害物スイム100m 26位（4年連続出場）",
      "2025年 マネキンキャリー50m 4.97秒短縮（前年比）",
    ],
  },
  {
    name: "矢上 賢尚",
    nameEn: "Kenshow Yagami",
    age: "9歳",
    events: ["50m自由形", "ビーチスプリント"],
    bio: "矢上家の末っ子。水泳50m自由形は41秒（B4級相当）、陸上50m走は9.4秒と同学年平均を上回る身体能力を持つ。姉たちの背中を追いかけ成長中。",
    quote: "「走るのも泳ぐのも全部好き。一番になりたい！」",
    achievements: [
      "水泳50m自由形 41秒（9歳・資格級B4相当）",
      "陸上50m走 9.4秒（小4平均9.61秒を上回る）",
    ],
  },
];

const timeline = [
  { year: "2016", title: "矢上家、初めての大会", desc: "結月が小学1年生で初めて大会に参加。ウェーディングとビーチフラッグスに出場。矢上家のライフセービングへの挑戦が始まった年。" },
  { year: "2017", title: "結月、初の入賞", desc: "結月（小2）がウェーディングレース U8女子で2位に入賞。ビーチフラッグスにも出場。" },
  { year: "2018", title: "陽葉、初参加", desc: "陽葉（小1）が初めて大会に参加。ウェーディングレースに出場。結月（小3）はランスイムラン・ニッパー・ボードで決勝進出。" },
  { year: "2019", title: "姉妹でタップリンリレー2位", desc: "サーフ大会で結月（小4）と陽葉（小2）がU12タップリンリレーに出場し2位。陽葉はニッパーボード3位、ビーチフラッグス3位と頭角を現す。" },
  { year: "2020", title: "大会中止", desc: "新型コロナウイルスの影響により全日本大会が中止。" },
  { year: "2022", title: "陽葉も全日本デビュー・ビーチフラッグス優勝", desc: "陽葉が小学5年生で全日本JYMプール大会に初出場。ビーチ大会では陽葉がニッパー3位、真吾もマスターズに参戦。結月はサーフ決勝19位。" },
  { year: "2023", title: "2年連続出場・成長の手応え", desc: "陽葉が障害物スイム50mで36.57秒（前年比-2.94秒）と大幅にタイムを更新。チューブトウ100mも1:31.24と着実に成長。" },
  { year: "2024", title: "姉妹でU15フル参戦", desc: "結月がU15カテゴリでプール大会に初参戦。陽葉と共に障害物スイム・マネキンキャリー・マネキントウの全種目にエントリー。賢尚もビーチフラッグス優勝。" },
  { year: "2025", title: "全5種目出場・スーパーライフセーバーに挑戦", desc: "結月・陽葉の2人がスーパーライフセーバー200mを含む全5種目に出場。陽葉はマネキンキャリー50mで約5秒短縮。賢尚も水泳・陸上で力をつけ始める。" },
  { year: "2026", title: "現在", desc: "3きょうだいが切磋琢磨しながら成長中。矢上家のライフセービングな日常を発信している。" },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-5 gradient-ocean">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateIn>
            <p className="section-label justify-center text-ocean-light/60 before:bg-ocean-light/40">
              About Us
            </p>
            <h1 className="font-[family-name:var(--font-serif-jp)] text-white font-bold mt-4 text-3xl md:text-4xl leading-relaxed">
              矢上家のこと
            </h1>
            <p className="text-white/50 mt-4 text-sm leading-loose">
              ライフセーバー3きょうだいと、それを支える両親の物語。
            </p>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 wave-divider">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-sand-pale)" />
          </svg>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-5 bg-sand-pale">
        <div className="max-w-3xl mx-auto">
          <AnimateIn>
            <p className="section-label">Our Story</p>
            <h2 className="section-title mt-4 text-ocean-dark">これまでの歩み</h2>
          </AnimateIn>

          <div className="mt-16 relative">
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-ocean-light/30 -translate-x-1/2" />

            {timeline.map((item, i) => (
              <AnimateIn
                key={item.year}
                delay={i * 0.1}
                direction={i % 2 === 0 ? "left" : "right"}
              >
                <div className={`relative flex items-start gap-8 mb-12 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}>
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-6 md:left-1/2 w-3 h-3 rounded-full bg-ocean-mid border-2 border-sand-pale -translate-x-1/2 mt-2 z-10" />
                  <div className="pl-14 md:pl-0 md:w-1/2">
                    <span className="font-[family-name:var(--font-display)] text-ocean-mid font-bold text-lg">
                      {item.year}
                    </span>
                    <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark mt-1">
                      {item.title}
                    </h3>
                    <p className="text-text-mid text-sm mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Athletes */}
      <section className="py-24 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimateIn className="text-center mb-20">
            <p className="section-label justify-center">The Athletes</p>
            <h2 className="section-title mt-4 text-ocean-dark">3人の選手たち</h2>
          </AnimateIn>

          {athletes.map((athlete, i) => (
            <AnimateIn key={athlete.name} delay={0.1}>
              <div
                className={`flex flex-col ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } gap-10 items-center mb-24 last:mb-0`}
              >
                {/* Photo */}
                <div className="md:w-2/5 w-full">
                  <div className="aspect-[3/4] rounded-2xl overflow-hidden bg-gradient-to-br from-ocean-dark to-ocean relative">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl opacity-20">
                        {i === 0 ? "🏃‍♀️" : i === 1 ? "🏄‍♀️" : "🏊‍♂️"}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-ocean-mid/80 backdrop-blur-sm text-white text-[10px] px-3 py-1 rounded-full font-[family-name:var(--font-display)] tracking-wider uppercase">
                        {athlete.nameEn}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="md:w-3/5 w-full">
                  <h3 className="font-[family-name:var(--font-serif-jp)] text-3xl font-bold text-ocean-dark">
                    {athlete.name}
                  </h3>
                  <div className="flex gap-2 mt-3">
                    {athlete.events.map((event) => (
                      <span
                        key={event}
                        className="text-xs bg-ocean-mid/10 text-ocean-mid px-3 py-1 rounded-full"
                      >
                        {event}
                      </span>
                    ))}
                  </div>
                  <p className="text-text-mid mt-6 leading-loose">{athlete.bio}</p>
                  <p className="text-ocean font-[family-name:var(--font-serif-jp)] italic mt-4 text-sm border-l-2 border-ocean-light/40 pl-4">
                    {athlete.quote}
                  </p>

                  <div className="mt-6">
                    <h4 className="text-xs font-[family-name:var(--font-display)] tracking-wider uppercase text-text-light mb-3">
                      Achievements
                    </h4>
                    <ul className="space-y-2">
                      {athlete.achievements.map((a) => (
                        <li key={a} className="text-sm text-text-mid flex items-start gap-2">
                          <span className="text-ocean-mid mt-0.5">▸</span>
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* Support Team */}
      <section className="py-24 px-5 bg-sand-light">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateIn>
            <p className="section-label justify-center">The Team</p>
            <h2 className="section-title mt-4 text-ocean-dark">支える家族</h2>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <div className="grid md:grid-cols-2 gap-8 mt-12 max-w-2xl mx-auto">
              {[
                {
                  name: "矢上 真吾",
                  role: "父 / チームマネージャー",
                  bio: "Jリーグトレーナー10年、鍼灸整体師として23年の臨床経験。子どもたちのフィジカルコンディショニングとメンタルサポートを担当。",
                },
                {
                  name: "母",
                  role: "母 / 栄養管理・ロジスティクス",
                  bio: "遠征の手配から日々の栄養管理まで、家族の活動を裏側から支える。「みんなが笑顔で海に向かえるように。」",
                },
              ].map((member) => (
                <div
                  key={member.name}
                  className="bg-white rounded-xl p-8 text-left shadow-sm"
                >
                  <div className="w-16 h-16 rounded-full bg-ocean/10 flex items-center justify-center text-2xl mb-4">
                    👤
                  </div>
                  <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-lg">
                    {member.name}
                  </h3>
                  <p className="text-ocean-mid text-xs mt-1">{member.role}</p>
                  <p className="text-text-mid text-sm mt-4 leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
