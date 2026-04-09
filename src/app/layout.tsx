import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "矢上家のライフセービングな日常 | The Yagami Lifesaving Family",
  description:
    "海を、命を、家族で守る。ライフセーバー一家・矢上家の活動記録とサポーター募集サイト。",
  openGraph: {
    title: "矢上家のライフセービングな日常",
    description: "海を、命を、家族で守る。",
    locale: "ja_JP",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon-192.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0C2D48" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,400&family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Serif+JP:wght@400;600;700&family=Outfit:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CTSEVEKY8R"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CTSEVEKY8R');
          `}
        </Script>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
