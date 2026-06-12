"""Quick check: 矢上家 + 館山SLSC 上位選手の統合順位を抽出。"""
import re
from pathlib import Path

NAMES = ["矢上", "細田", "成海", "岡本", "中川", "石黒", "千葉", "小松", "横矢", "住吉"]
SCRIPT_DIR = Path(__file__).resolve().parent

for fn in [
    SCRIPT_DIR / "2026_ユース統合ランキング（ビーチ＋プール）.md",
    SCRIPT_DIR / "2026_ジュニア統合ランキング（ビーチ＋プール）.md",
]:
    print(f"\n=== {fn.name} ===")
    text = fn.read_text(encoding="utf-8")
    cat = ""
    for line in text.splitlines():
        if line.startswith("##"):
            cat = line.strip()
            continue
        if not line.startswith("|"):
            continue
        cells = [c.strip() for c in line.split("|")]
        if len(cells) < 6:
            continue
        name = cells[2]
        if any(name.startswith(n + " ") or name.startswith(n + "　") or name == n for n in NAMES):
            print(f"  {cat}  順位{cells[1]}  {cells[2]}  {cells[3]}  {cells[4]}点  {cells[5]}種目")
