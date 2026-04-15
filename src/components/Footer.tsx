import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ocean-deep text-white/60">
      {/* Wave Divider */}
      <div className="wave-divider">
        <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
            fill="#0A1628"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🌊</span>
              <div>
                <p className="font-[family-name:var(--font-serif-jp)] text-white font-bold">
                  矢上家のライフセービングな日常
                </p>
                <p className="text-[10px] font-[family-name:var(--font-display)] tracking-[0.2em] uppercase text-ocean-light/50">
                  The Yagami Lifesaving Family
                </p>
              </div>
            </div>
            <p className="text-sm leading-relaxed">
              海を、命を、家族で守る。
              <br />
              ライフセーバー一家の活動を発信しています。
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-white mb-4">
              Navigation
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/about", label: "私たちについて" },
                { href: "/activity", label: "活動記録" },
                { href: "/records", label: "大会記録" },
                { href: "/support", label: "サポーター募集" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm hover:text-ocean-light transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-xs tracking-[0.2em] uppercase text-white mb-4">
              Follow Us
            </h3>
            <div className="flex gap-4">
              {["Instagram", "YouTube", "X"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-xs hover:border-ocean-light hover:text-ocean-light transition-colors"
                >
                  {social[0]}
                </a>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/support"
                className="inline-block bg-sunset/80 hover:bg-sunset text-white text-sm px-6 py-2.5 rounded-full transition-colors"
              >
                🤝 サポーターになる
              </Link>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 mt-12 pt-8 text-center text-xs">
          <p>© {new Date().getFullYear()} 矢上家 / The Yagami Family. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
