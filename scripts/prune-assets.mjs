// ============================================================
// OpenNext のビルド出力から「配信しないメディア」を落とす。
//
// Next.js は public/ を丸ごとビルド出力へ複製するが、public/ の実体には
// Git管理外の撮って出し動画（最大618MB）や動画制作の中間物が置かれている。
// Vercel では .vercelignore がこれを除外していたので、同じ規則を再現する。
//
//   .vercelignore:
//     素材/ ／ 矢上家の挑戦/ ／ *.mp4 *.mov *.avi
//     ただし !/public/videos/**/*.mp4 は配信する
//
// Cloudflare は静的ファイル1つ25MB・1デプロイ20,000ファイルが上限のため、
// 落とし忘れがあると deploy が失敗する。最後に上限チェックまで行う。
// ============================================================
import { readdirSync, statSync, rmSync } from "node:fs";
import { join, relative, sep } from "node:path";

const ASSETS = ".open-next/assets";
const MAX_BYTES = 25 * 1024 * 1024;
const MAX_FILES = 20000;

const MOVIE = /\.(mp4|mov|avi)$/i;
const KEEP_MOVIE_UNDER = "videos"; // assets/videos/** の動画だけ残す
const DROP_DIRS = new Set(["work", "素材", "矢上家の挑戦"]);

let removedFiles = 0;
let removedBytes = 0;

function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }

  for (const e of entries) {
    const full = join(dir, e.name);

    if (e.isDirectory()) {
      if (DROP_DIRS.has(e.name)) {
        removedBytes += dirSize(full);
        removedFiles += countFiles(full);
        rmSync(full, { recursive: true, force: true });
        continue;
      }
      walk(full);
      continue;
    }

    if (MOVIE.test(e.name)) {
      const rel = relative(ASSETS, full);
      const top = rel.split(sep)[0];
      if (top !== KEEP_MOVIE_UNDER) {
        removedBytes += statSync(full).size;
        removedFiles++;
        rmSync(full, { force: true });
      }
    }
  }
}

function dirSize(dir) {
  let total = 0;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    total += e.isDirectory() ? dirSize(full) : statSync(full).size;
  }
  return total;
}

function countFiles(dir) {
  let n = 0;
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    n += e.isDirectory() ? countFiles(join(dir, e.name)) : 1;
  }
  return n;
}

function collect(dir, out = []) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, e.name);
    if (e.isDirectory()) collect(full, out);
    else out.push(full);
  }
  return out;
}

walk(ASSETS);

const files = collect(ASSETS);
const oversized = files.filter((f) => statSync(f).size > MAX_BYTES);

const mb = (b) => (b / 1048576).toFixed(1);
console.log(`[prune-assets] 除外 ${removedFiles} 件 / ${mb(removedBytes)} MB`);
console.log(`[prune-assets] 残り ${files.length} 件 (上限 ${MAX_FILES})`);

if (oversized.length > 0) {
  console.error(`[prune-assets] ✗ 25MB超が ${oversized.length} 件残っています:`);
  for (const f of oversized) {
    console.error(`  ${mb(statSync(f).size)} MB  ${relative(ASSETS, f)}`);
  }
  process.exit(1);
}

if (files.length > MAX_FILES) {
  console.error(`[prune-assets] ✗ ファイル数が上限 ${MAX_FILES} を超えています`);
  process.exit(1);
}

console.log("[prune-assets] ✓ Cloudflare の上限を満たしています");
