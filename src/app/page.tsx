"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { AnimateIn } from "@/components/AnimateIn";

/* ===== HERO ===== */
function Hero() {
  return (
    <section className="relative h-[70vh] md:h-screen flex items-end justify-center overflow-hidden">
      {/* Hero photo */}
      <Image
        src="/images/hero.jpg"
        alt="ビーチでボードを持って走るライフセーバーたち"
        fill
        className="object-cover object-center"
        sizes="100vw"
        priority
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-ocean-deep/70 via-ocean-deep/40 to-ocean-deep/85" />

      <div className="relative z-10 text-center px-5 max-w-4xl mb-4 md:mb-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-6"
        >
          <span className="font-[family-name:var(--font-display)] text-ocean-light/60 text-xs tracking-[0.4em] uppercase">
            The Yagami Lifesaving Family
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="font-[family-name:var(--font-serif-jp)] text-white font-bold leading-relaxed"
          style={{ fontSize: "clamp(2rem, 6vw, 4rem)" }}
        >
          砂浜が、
          <br />
          僕たちの教室だ。
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.0 }}
          className="text-white/50 mt-6 text-sm font-light tracking-wider leading-loose"
        >
          走って、泳いで、笑う。それが矢上家の日常。
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-12"
        >
          <div className="animate-bounce text-ocean-light/40 text-2xl">↓</div>
          <span className="text-ocean-light/30 text-[10px] font-[family-name:var(--font-display)] tracking-[0.3em] uppercase">
            Scroll
          </span>
        </motion.div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0 wave-divider">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,60 1440,80 L1440,120 L0,120 Z"
            fill="var(--color-sand-pale)"
          />
        </svg>
      </div>
    </section>
  );
}

/* ===== WHO WE ARE ===== */
function WhoWeAre() {
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

  return (
    <section className="py-24 px-5 bg-sand-pale">
      <div className="max-w-6xl mx-auto">
        <AnimateIn className="text-center mb-16">
          <p className="section-label justify-center">Who We Are</p>
          <h2 className="section-title mt-4 text-ocean-dark">
            砂浜の向こう側に、
            <br className="sm:hidden" />
            僕たちの日常がある。
          </h2>
        </AnimateIn>

        {/* Main Athletes */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {athletes.map((member, i) => (
            <AnimateIn key={member.name} delay={i * 0.15}>
              <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                <div className="aspect-video bg-gradient-to-br from-ocean-dark to-ocean relative overflow-hidden">
                  {member.photo && (
                    <Image
                      src={member.photo}
                      alt={member.name}
                      fill
                      className="object-cover object-center"
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
            {[
              { name: "矢上 真吾", role: "父 / コーチ・フィジカルトレーナー" },
              { name: "母", role: "母 / 栄養管理・サポート" },
            ].map((member) => (
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

        <AnimateIn delay={0.4} className="text-center mt-12">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-ocean-mid hover:text-ocean-dark text-sm font-[family-name:var(--font-display)] tracking-wider uppercase transition-colors group"
          >
            More About Us
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ===== LATEST ACTIVITY ===== */
function LatestActivity() {
  const posts = [
    {
      date: "2026.03.09",
      title: "全日本ライフセービング選手権 出場レポート",
      category: "大会",
      excerpt: "長女が見事3位入賞！全国の舞台で成長を見せました。",
    },
    {
      date: "2026.02.15",
      title: "冬季トレーニングキャンプ in 宮崎",
      category: "トレーニング",
      excerpt: "家族全員で宮崎の海で冬季トレーニングを実施。",
    },
    {
      date: "2026.01.20",
      title: "地元小学校でライフセービング体験授業",
      category: "地域活動",
      excerpt: "地域の子どもたちに海の安全と命の大切さを伝えました。",
    },
  ];

  const categoryColors: Record<string, string> = {
    大会: "bg-lifesaving-red/10 text-lifesaving-red",
    トレーニング: "bg-ocean-mid/10 text-ocean-mid",
    地域活動: "bg-sunset/10 text-sunset",
    メディア: "bg-guard-yellow/10 text-guard-yellow",
  };

  return (
    <section className="py-24 px-5 bg-white">
      <div className="max-w-6xl mx-auto">
        <AnimateIn className="mb-16">
          <p className="section-label">Latest Activity</p>
          <h2 className="section-title mt-4 text-ocean-dark">活動記録</h2>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <AnimateIn key={post.title} delay={i * 0.12}>
              <Link href="/activity" className="group block">
                <div className="aspect-[16/10] bg-gradient-to-br from-ocean/80 to-ocean-dark rounded-xl mb-4 overflow-hidden relative">
                  <div className="absolute inset-0 bg-ocean-deep/20 group-hover:bg-transparent transition-colors duration-500" />
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-medium ${
                      categoryColors[post.category] || "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-text-light text-xs">{post.date}</span>
                </div>
                <h3 className="font-[family-name:var(--font-serif-jp)] font-bold text-ocean-dark group-hover:text-ocean-mid transition-colors leading-relaxed">
                  {post.title}
                </h3>
                <p className="text-text-mid text-sm mt-2 leading-relaxed">
                  {post.excerpt}
                </p>
              </Link>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={0.3} className="text-center mt-12">
          <Link
            href="/activity"
            className="inline-flex items-center gap-2 text-ocean-mid hover:text-ocean-dark text-sm font-[family-name:var(--font-display)] tracking-wider uppercase transition-colors group"
          >
            View All Activity
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ===== RECORDS HIGHLIGHT ===== */
function RecordsHighlight() {
  const highlights = [
    {
      name: "矢上 結月",
      nameEn: "Yuzuki",
      best: [
        { event: "障害物スイム 100m", time: "1:33.47", year: "2024" },
        { event: "マネキントウWF 100m", time: "1:32.10", year: "2024" },
      ],
    },
    {
      name: "矢上 陽葉",
      nameEn: "Kiyoha",
      best: [
        { event: "マネキンキャリー 50m", time: "48.97", year: "2025" },
        { event: "スーパーライフセーバー 200m", time: "3:34.41", year: "2025" },
      ],
    },
    {
      name: "矢上 賢尚",
      nameEn: "Kenshow",
      best: [
        { event: "50m自由形", time: "41.00", year: "2026" },
        { event: "50m走", time: "9.40秒", year: "2026" },
      ],
    },
  ];

  return (
    <section className="py-24 px-5 bg-sand-light">
      <div className="max-w-6xl mx-auto">
        <AnimateIn className="mb-16">
          <p className="section-label">Records</p>
          <h2 className="section-title mt-4 text-ocean-dark">大会記録</h2>
        </AnimateIn>

        <div className="grid md:grid-cols-3 gap-6">
          {highlights.map((athlete, i) => (
            <AnimateIn key={athlete.name} delay={i * 0.12}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="gradient-ocean px-5 py-4">
                  <p className="text-ocean-light/50 text-[10px] font-[family-name:var(--font-display)] tracking-[0.2em] uppercase">
                    {athlete.nameEn}
                  </p>
                  <h3 className="text-white font-[family-name:var(--font-serif-jp)] font-bold text-lg">
                    {athlete.name}
                  </h3>
                </div>
                <div className="p-5 space-y-3">
                  {athlete.best.map((record) => (
                    <div key={record.event} className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-text-light">{record.event}</p>
                        <p className="font-mono font-medium text-ocean-dark">{record.time}</p>
                      </div>
                      <span className="text-xs text-text-light bg-sand-pale px-2 py-1 rounded">
                        {record.year}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={0.3} className="text-center mt-12">
          <Link
            href="/records"
            className="inline-flex items-center gap-2 text-ocean-mid hover:text-ocean-dark text-sm font-[family-name:var(--font-display)] tracking-wider uppercase transition-colors group"
          >
            View All Records
            <span className="group-hover:translate-x-1 transition-transform">
              →
            </span>
          </Link>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ===== SUPPORT CTA ===== */
function SupportCTA() {
  return (
    <section className="relative py-32 px-5 overflow-hidden">
      <div className="absolute inset-0 gradient-ocean" />
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 50%, rgba(135,206,235,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(46,134,171,0.2) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <AnimateIn>
          <p className="section-label justify-center text-ocean-light/60 before:bg-ocean-light/40">
            Support Us
          </p>
          <h2 className="font-[family-name:var(--font-serif-jp)] text-white font-bold mt-4 leading-relaxed"
            style={{ fontSize: "clamp(1.5rem, 4vw, 2.5rem)" }}
          >
            あなたの応援が、
            <br />
            私たちの波を大きくする。
          </h2>
          <p className="text-white/50 mt-6 text-sm leading-loose max-w-lg mx-auto">
            遠征費、機材費、トレーニング費——
            <br />
            ライフセービング活動には多くの費用がかかります。
            <br />
            皆さまのサポートが、私たちの力になります。
          </p>
        </AnimateIn>

        <AnimateIn delay={0.2}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Link
              href="/support"
              className="bg-sunset hover:bg-sunset-light text-white font-medium px-8 py-4 rounded-full text-sm tracking-wider transition-colors shadow-lg shadow-sunset/20"
            >
              💙 寄付する
            </Link>
            <Link
              href="/support"
              className="bg-white/10 hover:bg-white/20 text-white border border-white/20 font-medium px-8 py-4 rounded-full text-sm tracking-wider transition-colors backdrop-blur-sm"
            >
              🌊 サポーターになる
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}

/* ===== PAGE ===== */
export default function Home() {
  return (
    <>
      <Hero />
      <WhoWeAre />
      <LatestActivity />
      <RecordsHighlight />
      <SupportCTA />
    </>
  );
}
