"use client";

import { AnimateIn } from "./AnimateIn";

type Props = {
  path: string;
  count: number;
  cols?: 2 | 3;
};

export function VideoGrid({ path, count, cols = 3 }: Props) {
  const clips = Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
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
