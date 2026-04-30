"""
プール大会ベンチマーク（1位/3位/5位/8位/16位）を data.ts 用にJSON出力。

対象：
- 賢尚（来年U10）
- 陽葉（U15継続）
- 結月（U18継続）
"""

import json
import re
from pathlib import Path

import pdfplumber

SCRIPT_DIR = Path(__file__).resolve().parent

# (PDFファイル番号, 種目名)
TARGETS = {
    "賢尚": {
        "category": "2026年度はU10",
        "comment": "U8で頂点に立った賢尚が、ひとつ上の階段へ。まずは入賞圏（16位以内）を確実に。",
        "events": [
            ("08", "障害物スイム（50m）"),
            ("56", "レスキューチューブトウ（100m）"),
        ],
    },
    "陽葉": {
        "category": "2026年度もU15",
        "comment": "オーシャンでは全国5位（U15女子）。プールでも入賞圏（16位以内）に届けば、総合順位で大きく前進。",
        "events": [
            ("03", "障害物スイム（100m）"),
            ("33", "マネキンキャリー（50m）"),
            ("42", "マネキンキャリー・ウィズフィン（100m）"),
            ("71", "マネキントウ・ウィズフィン（100m）"),
        ],
    },
    "結月": {
        "category": "2026年度もU18",
        "comment": "U18女子の超激戦区。今期の200m障害物は2:59、16位の壁（2:44）まで15秒。一歩ずつ削っていく。",
        "events": [
            ("01", "障害物スイム（200m）"),
            ("35", "マネキンキャリー（50m）"),
            ("44", "マネキンキャリー・ウィズフィン（100m）"),
            ("51", "レスキューメドレー（100m）"),
            ("65", "スーパーライフセーバー（200m）"),
            ("73", "マネキントウ・ウィズフィン（100m）"),
        ],
    },
}

TARGET_RANKS = [1, 3, 5, 8, 16]
EXCLUDE_NAMES = {"藤﨑 笑佳"}  # 比較対象から除外（本人指示）

RANK_LINE = re.compile(r"^(\d{1,3})\s+\d+/\d+\s+(\S+\s+\S+(?:\s+\S+)?)\s+(.+?)$")
TIME_RE = re.compile(r"\d+:\d+\.\d+|\d+\.\d+")


def parse_pool(no: str):
    """1種目PDFから rank → {name, club, time} のマップを返す。"""
    pdf = SCRIPT_DIR / "raw_pool" / f"jym-p_2025_result_{no}.pdf"
    out = {}
    with pdfplumber.open(pdf) as p:
        text = "\n".join((pg.extract_text() or "") for pg in p.pages)
    lines = text.splitlines()
    for i, line in enumerate(lines):
        m = RANK_LINE.match(line.strip())
        if not m:
            continue
        rank = int(m.group(1))
        name = m.group(2).strip()
        # チーム名（タイム除去）
        team = re.sub(r"\s+\d+:\d+\.\d+.*$", "", m.group(3)).strip()
        team = re.sub(r"\s+\d+\.\d+.*$", "", team).strip()
        # 当該行 or 次行からタイム
        time_str = ""
        tm = TIME_RE.findall(line)
        if tm:
            time_str = tm[-1]
        if not time_str and i + 1 < len(lines):
            tm = TIME_RE.findall(lines[i + 1])
            if tm:
                time_str = tm[0]
        if rank not in out:
            out[rank] = {"name": name, "club": team, "time": time_str}
    return out


def main():
    result = {}
    for short, body in TARGETS.items():
        events_out = []
        for no, ev_name in body["events"]:
            results = parse_pool(no)
            rows = []
            for rank in TARGET_RANKS:
                if rank in results:
                    r = results[rank]
                    if r["name"] in EXCLUDE_NAMES:
                        continue  # 比較対象から除外
                    rows.append({
                        "rank": f"{rank}位",
                        "name": r["name"],
                        "club": r["club"],
                        "time": r["time"],
                    })
            if rows:
                events_out.append({"event": ev_name, "rows": rows})
        result[short] = {
            "category": body["category"],
            "comment": body["comment"],
            "events": events_out,
        }
    out = SCRIPT_DIR / "benchmarks.json"
    out.write_text(json.dumps(result, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[done] wrote {out}")


if __name__ == "__main__":
    main()
