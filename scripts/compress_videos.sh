#!/usr/bin/env bash
set -euo pipefail

ROOT="C:/Users/nagom/nagomi-project/yagami-family"
SRC_BASE="$ROOT/public/images/activity"
DST_BASE="$ROOT/public/videos"

compress_dir() {
  local src="$1"
  local dst="$2"
  mkdir -p "$dst"
  shopt -s nullglob
  local i=0
  for f in "$src"/*.mp4; do
    i=$((i+1))
    local out="$dst/$(printf '%02d' $i).mp4"
    if [ -f "$out" ]; then
      echo "skip $out"
      continue
    fi
    echo "[$i] $(basename "$f") -> $(basename "$out")"
    ffmpeg -y -loglevel error -i "$f" \
      -c:v libx264 -crf 30 -preset slow -vf "scale=540:-2" \
      -c:a aac -b:a 64k -movflags +faststart \
      "$out"
  done
}

extract_poster() {
  local src="$1"
  local out="$2"
  if [ -f "$out" ]; then return; fi
  ffmpeg -y -loglevel error -i "$src" -vf "select=eq(n\,15),scale=540:-2" -vframes 1 "$out"
}

# Compress all days
compress_dir "$SRC_BASE/20260417sprint"     "$DST_BASE/20260417sprint"
compress_dir "$SRC_BASE/20260412heisaura"   "$DST_BASE/20260412heisaura"
compress_dir "$SRC_BASE/20260408hojo"       "$DST_BASE/20260408hojo"
compress_dir "$SRC_BASE/20260411jr"         "$DST_BASE/20260411jr"
compress_dir "$SRC_BASE/20260405beachclean" "$DST_BASE/20260405beachclean"

# Extract posters (frame at ~0.5s) for compressed clips
shopt -s nullglob
for d in "$DST_BASE"/*/; do
  for v in "$d"*.mp4; do
    extract_poster "$v" "${v%.mp4}.jpg"
  done
done

echo "DONE"
