"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "HOME", labelJa: "ホーム" },
  { href: "/about", label: "ABOUT", labelJa: "私たちについて" },
  { href: "/activity", label: "ACTIVITY", labelJa: "活動記録" },
  { href: "/records", label: "RECORDS", labelJa: "大会記録" },
  { href: "/support", label: "SUPPORT", labelJa: "サポーター募集" },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-ocean-deep/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 py-4 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-full bg-ocean-mid/20 border border-ocean-light/30 flex items-center justify-center text-lg group-hover:bg-ocean-mid/40 transition-colors">
              🌊
            </div>
            <div>
              <span className="font-[family-name:var(--font-serif-jp)] text-white font-bold text-sm tracking-wider">
                矢上家
              </span>
              <span className="hidden sm:inline text-ocean-light/60 text-[10px] font-[family-name:var(--font-display)] tracking-[0.2em] uppercase ml-2">
                Lifesaving Family
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/70 hover:text-white text-xs font-[family-name:var(--font-display)] tracking-[0.15em] uppercase transition-colors relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-ocean-light group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
            <Link
              href="/support"
              className="bg-sunset hover:bg-sunset-light text-white text-xs font-medium px-5 py-2.5 rounded-full tracking-wider transition-colors font-[family-name:var(--font-display)] uppercase"
            >
              Support Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 text-white"
            aria-label="Menu"
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1.5px] bg-white block"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-[1.5px] bg-white block"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1.5px] bg-white block"
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 gradient-ocean flex items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-white text-center block"
                  >
                    <span className="font-[family-name:var(--font-display)] text-2xl tracking-[0.2em] uppercase">
                      {link.label}
                    </span>
                    <span className="block text-white/40 text-xs mt-1">
                      {link.labelJa}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/support"
                  onClick={() => setIsOpen(false)}
                  className="mt-4 bg-sunset hover:bg-sunset-light text-white px-8 py-3 rounded-full font-[family-name:var(--font-display)] tracking-wider uppercase transition-colors"
                >
                  Support Us
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
