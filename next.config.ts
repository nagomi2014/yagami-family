import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    // Cloudflare には Vercel の画像最適化エンジンが無い。
    // 画像はすべて public/ 配下のローカルファイルなので、最適化なしで配信する。
    // （Sanity CDN は依存だけ残っていて実際には未接続のため remotePatterns は削除した）
    unoptimized: true,
  },
};

// next dev のときに D1 などのバインディングをローカルで使えるようにする
initOpenNextCloudflareForDev();

export default nextConfig;
