"use client";

import { AnimateIn } from "./AnimateIn";

type Props = {
  path: string;
  count: number;
  cols?: 2 | 3;
  /**
   * 配信から外している番号。Cloudflare は静的ファイル1つが25MBを超えると
   * 載せられないため、上限を超えた動画をここで飛ばす（欠番の壊れた
   * プレイヤーを出さないため）。圧縮して戻したら番号を消せばよい。
   */
  skip?: number[];
};

export function VideoGrid({ path, count, cols = 3, skip = [] }: Props) {
  const skipped = new Set(skip);
  const clips = Array.from({ length: count }, (_, i) => i + 1)
    .filter((i) => !skipped.has(i))
    .map((i) => {
      const n = String(i).padStart(2, "0");
      return { src: `${path}/${n}.mp4`, poster: `${path}/${n}.jpg` };
    });

  const gridCols =
    cols === 2 ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-2 md:grid-cols-3";

  return (
    <div className={`mt-8 grid ${gridCols} gap-4`}>
      {clips.map((clip, i) => (
        <AnimateIn key={clip.src} delay={i * 0.03}>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="relative aspect-[9/16] bg-ocean-deep">
              <video
                src={clip.src}
                poster={clip.poster}
                controls
                preload="none"
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </AnimateIn>
      ))}
    </div>
  );
}
