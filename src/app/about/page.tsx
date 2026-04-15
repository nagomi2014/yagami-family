"use client";

import Image from "next/image";
import { AnimateIn } from "@/components/AnimateIn";

const athletes = [
  {
    name: "矢上 結月",
    nameEn: "Yuzuki Yagami",
    event: "障害物スイム / マネキントウ / スーパーライフセーバー",
    photo: "/images/members/yuzuki.jpg",
  },
  {
    name: "矢上 陽葉",
    nameEn: "Kiyoha Yagami",
    event: "障害物スイム / マネキンキャリー / マネキントウ",
    photo: "/images/members/kiyoha.jpg",
  },
  {
    name: "矢上 賢尚",
    nameEn: "Kenshow Yagami",
    event: "障害物スイム / ビーチスプリント / 50m自由形",
    photo: "/images/members/kenshow.jpg",
  },
];

const supportTeam = [
  { name: "矢上 真吾", role: "父 / コーチ・フィジカルトレーナー" },
  { name: "母", role: "母 / 栄養管理・サポート" },
];

const timeline = [
  { year: "2016", text: "結月（小1）が初めて大会に参加。矢上家の挑戦が始まる" },
  { year: "2018", text: "陽葉（小1）が初参加。姉妹でライフセービングの道へ" },
  { year: "2019", text: "姉妹でタップリンリレー2位入賞。陽葉ビーチフラッグス3位" },
  { year: "2022", text: "陽葉がビーチフラッグス優勝。プール大会にも初出場" },
  { year: "2024", text: "結月がU15カテゴリで全日本プール大会に初出場" },
  { year: "2025", text: "陽葉がマネキンキャリーで約5秒短縮。スーパーライフセーバーに初挑戦" },
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
              砂浜の向こう側に、
              <br className="sm:hidden" />
              僕たちの日常がある。
            </h1>
            <p className="text-white/50 mt-6 text-sm leading-loose max-w-lg mx-auto">
              走って、泳いで、笑う。それが矢上家の日常。
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

      {/* Athletes */}
      <section className="py-24 px-5 bg-sand-pale">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {athletes.map((member, i) => (
              <AnimateIn key={member.name} delay={i * 0.15}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="aspect-[3/4] bg-gradient-to-br from-ocean-dark to-ocean relative overflow-hidden">
                    {member.photo && (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ocean-deep/80 to-transparent p-6">
                      <p className="text-white/50 text-[10px] font-[family-name:var(--font-display)] tracking-[0.2em] uppercase">
                        {member.nameEn}
                      </p>
                      <h3 className="text-white font-[family-name:var(--font-serif-jp)] text-xl font-bold mt-1">
                        {member.name}
                      </h3>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-text-mid text-sm">{member.event}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Support Team */}
          <AnimateIn delay={0.3}>
            <div className="flex justify-center gap-6 flex-wrap">
              {supportTeam.map((member) => (
                <div
                  key={member.name}
                  className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-full px-5 py-3 border border-ocean-light/20"
                >
                  <div className="w-10 h-10 rounded-full bg-ocean/10 flex items-center justify-center text-sm">
                    👤
                  </div>
                  <div>
                    <p className="text-sm font-medium text-ocean-dark">
                      {member.name}
                    </p>
                    <p className="text-xs text-text-light">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-5 bg-white">
        <div className="max-w-3xl mx-auto">
          <AnimateIn className="text-center mb-16">
            <p className="section-label justify-center">Our Journey</p>
            <h2 className="section-title mt-4 text-ocean-dark">矢上家の歩み</h2>
          </AnimateIn>

          <div className="space-y-0">
            {timeline.map((item, i) => (
              <AnimateIn key={item.year} delay={i * 0.1}>
                <div className="flex gap-6 pb-8 last:pb-0">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-ocean-mid/10 border-2 border-ocean-mid flex items-center justify-center shrink-0">
                      <span className="text-ocean-mid font-[family-name:var(--font-display)] text-xs font-bold">
                        {item.year}
                      </span>
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="w-[2px] flex-1 bg-ocean-light/20 mt-2" />
                    )}
                  </div>
                  <div className="pt-3">
                    <p className="text-text-mid text-sm leading-relaxed">
                      {item.text}
                    </p>
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
