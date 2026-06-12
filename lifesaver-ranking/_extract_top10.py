"""各MDからトップ10と矢上家の順位を抽出。"""
import re
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent

FILES = [
    ("本戦（ビーチ・オーシャン）", SCRIPT_DIR / "2026_全日本本戦_個人ランキング.md"),
    ("ユース統合（ビーチ＋プール）", SCRIPT_DIR / "2026_ユース統合ランキング（ビーチ＋プール）.md"),
    ("ジュニア統合（ビーチ＋プール）", SCRIPT_DIR / "2026_ジュニア統合ランキング（ビーチ＋プール）.md"),
]

YAGAMI_NAMES = ("矢上 賢尚", "矢上 陽葉", "矢上 結月")


def parse(text):
    """## 見出しごとにテーブル行を分解して返す。"""
    sections = {}
    cur = None
    for line in text.splitlines():
        if line.startswith("## "):
            cur = line[3:].strip()
            sections[cur] = []
        elif line.startswith("|") and cur and not line.startswith("| 順位") and not line.startswith("|---"):
            cells = [c.strip() for c in line.split("|")[1:-1]]
            if cells and cells[0].isdigit():
                sections[cur].append(cells)
    return sections


for label, fn in FILES:
    print(f"\n========== {label} ==========")
    text = fn.read_text(encoding="utf-8")
    sections = parse(text)
    for cat, rows in sections.items():
        if not cat:
            continue
        print(f"\n--- {cat} TOP10 ---")
        for cells in rows[:10]:
            # cells = [順位, 選手名, 所属, 合計点, 出場数, ...]
            rank, name, team, total = cells[0], cells[1], cells[2], cells[3]
            print(f"  {rank:>3}  {name}  {team}  {total}点")
        # 矢上家
        for cells in rows:
            name = cells[1]
            if any(name.startswith(yn) for yn in YAGAMI_NAMES):
                rank, total = cells[0], cells[3]
                print(f"  ★矢上家：{rank}位  {name}  {total}点")
