"use client";

import { AnimateIn } from "@/components/AnimateIn";

const tiers = [
  {
    name: "Beach Supporter",
    nameJa: "ビーチサポーター",
    emoji: "🏖️",
    price: "¥1,000",
    period: "/ 月",
    features: ["サイトにお名前掲載"],
    color: "from-ocean-light/20 to-ocean-light/5",
    borderColor: "border-ocean-light/30",
    badge: null,
    stripeUrl: "https://buy.stripe.com/aFa8wPaiSeuq65ja0za3u0k",
  },
  {
    name: "Wave Supporter",
    nameJa: "ウェーブサポーター",
    emoji: "🌊",
    price: "¥3,000",
    period: "/ 月",
    features: [
      "サイトにお名前掲載",
      "年間活動報告書",
    ],
    color: "from-ocean-mid/20 to-ocean/10",
    borderColor: "border-ocean-mid/40",
    badge: "おすすめ",
    stripeUrl: "https://buy.stripe.com/fZu28rbmW4TQ3Xb8Wva3u0l",
  },
  {
    name: "Guardian",
    nameJa: "ガーディアン",
    emoji: "🏅",
    price: "¥10,000",
    period: "/ 月",
    features: [
      "サイトにお名前掲載（上位表示）",
      "年間活動報告書",
      "お礼メッセージ動画（四半期に1回）",
    ],
    color: "from-guard-yellow/15 to-sunset/10",
    borderColor: "border-guard-yellow/40",
    badge: null,
    stripeUrl: "https://buy.stripe.com/28E8wP76Gdqm8drgoXa3u0m",
  },
];

const costs = [
  { label: "遠征費", amount: "年間 約30万円〜", desc: "大会参加のための交通費・宿泊費", icon: "✈️" },
  { label: "機材費", amount: "年間 約15万円", desc: "ボード、フィン、ウェットスーツなど", icon: "🏄" },
  { label: "トレーニング費", amount: "年間 約10万円", desc: "施設使用料、コーチング費用", icon: "💪" },
];

export default function SupportPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-32 pb-24 px-5 gradient-ocean overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "radial-gradient(circle at 30% 50%, rgba(135,206,235,0.4) 0%, transparent 50%)",
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <AnimateIn>
            <p className="section-label justify-center text-ocean-light/60 before:bg-ocean-light/40">
              Support Us
            </p>
            <h1
              className="font-[family-name:var(--font-serif-jp)] text-white font-bold mt-4 leading-relaxed"
              style={{ fontSize: "clamp(1.8rem, 4vw, 2.8rem)" }}
            >
              あなたの応援が、
              <br />
              私たちの波を大きくする。
            </h1>
            <p className="text-white/50 mt-6 text-sm leading-loose max-w-lg mx-auto">
              ライフセービング活動を続けるために、
              <br />
              皆さまのサポートをお願いしています。
            </p>
          </AnimateIn>
        </div>
        <div className="absolute bottom-0 left-0 right-0 wave-divider">
          <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C480,80 960,0 1440,40 L1440,80 L0,80 Z" fill="var(--color-sand-pale)" />
          </svg>
        </div>
      </section>

      {/* Why Support */}
      <section className="py-20 px-5 bg-sand-pale">
        <div className="max-w-4xl mx-auto">
          <AnimateIn>
            <p className="section-label">Why We Need Support</p>
            <h2 className="section-title mt-4 text-ocean-dark">活動にかかる費用</h2>
            <p className="text-text-mid mt-4 text-sm leading-loose">
              ライフセービング競技は、遠征・機材・トレーニングなど多くの費用がかかります。
              <br />
              将来的にはオーストラリアでの長期遠征も視野に入れています。
              <br />
              皆さまのサポートがあることで、子どもたちは競技に集中できます。
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {costs.map((cost, i) => (
              <AnimateIn key={cost.label} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 text-center shadow-sm">
                  <span className="text-3xl">{cost.icon}</span>
                  <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark mt-3">
                    {cost.label}
                  </h3>
                  <p className="text-sunset font-[family-name:var(--font-display)] font-bold text-lg mt-2">
                    {cost.amount}
                  </p>
                  <p className="text-text-light text-xs mt-2">{cost.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Monthly Supporter Tiers */}
      <section className="py-24 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <AnimateIn className="text-center mb-16">
            <p className="section-label justify-center">Monthly Supporter</p>
            <h2 className="section-title mt-4 text-ocean-dark">
              月額サポーター
            </h2>
            <p className="text-text-mid mt-4 text-sm">
              毎月の応援で、継続的な力になります。
            </p>
          </AnimateIn>

          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier, i) => (
              <AnimateIn key={tier.name} delay={i * 0.12}>
                <div
                  className={`relative bg-gradient-to-b ${tier.color} rounded-2xl p-8 border ${tier.borderColor} hover:shadow-lg transition-shadow h-full flex flex-col`}
                >
                  {tier.badge && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <span className="bg-sunset text-white text-[10px] font-bold px-4 py-1 rounded-full">
                        {tier.badge}
                      </span>
                    </div>
                  )}

                  <div className="text-center">
                    <span className="text-4xl">{tier.emoji}</span>
                    <h3 className="font-[family-name:var(--font-display)] text-sm tracking-wider uppercase text-ocean-dark mt-3 font-semibold">
                      {tier.name}
                    </h3>
                    <p className="text-xs text-text-light mt-1">
                      {tier.nameJa}
                    </p>
                    <div className="mt-4">
                      <span className="font-[family-name:var(--font-accent)] text-4xl font-semibold text-ocean-dark">
                        {tier.price}
                      </span>
                      <span className="text-text-light text-sm">
                        {tier.period}
                      </span>
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3 flex-1">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-sm text-text-mid flex items-start gap-2"
                      >
                        <span className="text-ocean-mid mt-0.5">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={tier.stripeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 w-full bg-ocean-dark hover:bg-ocean text-white font-medium py-3 rounded-full text-sm tracking-wider transition-colors text-center block"
                  >
                    サポーターになる
                  </a>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate Sponsor */}
      <section className="py-24 px-5 bg-sand-light">
        <div className="max-w-4xl mx-auto">
          <AnimateIn className="text-center mb-12">
            <p className="section-label justify-center">Corporate Sponsor</p>
            <h2 className="section-title mt-4 text-ocean-dark">
              企業スポンサー
            </h2>
            <p className="text-text-mid mt-4 text-sm leading-loose">
              企業・団体として矢上家のライフセービング活動を支援しませんか。
              <br />
              スポンサー様には、活動を通じたブランド露出をご提供します。
            </p>
          </AnimateIn>

          <AnimateIn delay={0.15}>
            <div className="bg-white rounded-2xl shadow-sm p-8 md:p-12">
              <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark text-lg mb-8 text-center">
                スポンサー特典
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {[
                  { icon: "🌐", title: "Webサイト掲載", desc: "企業ロゴ・リンクをサポーターページに掲載" },
                  { icon: "📸", title: "SNS・動画での紹介", desc: "活動報告の投稿・動画内でスポンサー紹介" },
                  { icon: "📊", title: "活動レポート", desc: "四半期ごとの活動報告・SNS露出レポート" },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <span className="text-2xl shrink-0">{item.icon}</span>
                    <div>
                      <h4 className="font-medium text-ocean-dark text-sm">{item.title}</h4>
                      <p className="text-text-light text-xs mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 pt-8 border-t border-gray-100 text-center">
                <p className="text-text-mid text-sm mb-6">
                  スポンサープランは活動内容・ご予算に応じてご相談いたします。
                </p>
                <a
                  href="mailto:nagomi2014@gmail.com?subject=矢上家ライフセービング スポンサーのお問い合わせ"
                  className="inline-flex items-center gap-2 bg-ocean-dark hover:bg-ocean text-white font-medium px-10 py-4 rounded-full text-sm tracking-wider transition-colors"
                >
                  📩 お問い合わせ
                </a>
              </div>
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Supporter List */}
      <section className="py-24 px-5 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <AnimateIn>
            <p className="section-label justify-center">Our Supporters</p>
            <h2 className="section-title mt-4 text-ocean-dark">
              サポーターの皆さま
            </h2>
            <p className="text-text-mid mt-4 text-sm">
              いつも応援ありがとうございます。
            </p>
          </AnimateIn>

          <AnimateIn delay={0.2}>
            <div className="mt-12 space-y-8">
              {[
                { tier: "🏅 Guardian", names: "最初のガーディアンを募集中..." },
                { tier: "🌊 Wave", names: "最初のウェーブサポーターを募集中..." },
                { tier: "🏖️ Beach", names: "最初のビーチサポーターを募集中..." },
              ].map((group) => (
                <div
                  key={group.tier}
                  className="bg-sand-light/50 rounded-xl p-6"
                >
                  <h3 className="font-[family-name:var(--font-display)] text-sm tracking-wider uppercase text-ocean-dark font-medium mb-3">
                    {group.tier}
                  </h3>
                  <p className="text-text-light text-sm italic">{group.names}</p>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>
    </>
  );
}
