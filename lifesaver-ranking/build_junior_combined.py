"""
真のライフセーバーランキング（ジュニア統合版・U8/U10/U12×男女別）

データソース：
1. 第22回全日本ジュニアライフセービング選手権大会（Liveheats event_id=397169）
2. 全日本ジュニアユースマスターズライフセービング・プール競技選手権大会2025（PDF）

加点ルール：個人種目のみ、1位=16点〜16位=1点（JLA 2026年度方針）
"""

import json
import sys
import urllib.request
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPT_DIR))
from _pool_parser import parse_pdf, normalize_name, EVENT_META  # noqa: E402

GRAPHQL_URL = "https://liveheats.com/api/graphql"

# Liveheats のジュニア個人種目
LIVEHEATS_DIVISIONS = [
    # U8
    ("704837", "ウェーディングレース", "U8", "女子"),
    ("704838", "ウェーディングレース", "U8", "男子"),
    ("704843", "ニッパーボードレース", "U8", "女子"),
    ("704844", "ニッパーボードレース", "U8", "男子"),
    ("704849", "ビーチフラッグス", "U8", "女子"),
    ("704850", "ビーチフラッグス", "U8", "男子"),
    ("704855", "ビーチスプリント", "U8", "女子"),
    ("704856", "ビーチスプリント", "U8", "男子"),
    # U10
    ("704839", "ランスイムラン", "U10", "女子"),
    ("704840", "ランスイムラン", "U10", "男子"),
    ("704845", "ニッパーボードレース", "U10", "女子"),
    ("704846", "ニッパーボードレース", "U10", "男子"),
    ("704851", "ビーチフラッグス", "U10", "女子"),
    ("704852", "ビーチフラッグス", "U10", "男子"),
    ("704857", "ビーチスプリント", "U10", "女子"),
    ("704858", "ビーチスプリント", "U10", "男子"),
    # U12
    ("704841", "ランスイムラン", "U12", "女子"),
    ("704842", "ランスイムラン", "U12", "男子"),
    ("704847", "ニッパーボードレース", "U12", "女子"),
    ("704848", "ニッパーボードレース", "U12", "男子"),
    ("704853", "ビーチフラッグス", "U12", "女子"),
    ("704854", "ビーチフラッグス", "U12", "男子"),
    ("704859", "ビーチスプリント", "U12", "女子"),
    ("704860", "ビーチスプリント", "U12", "男子"),
    ("704861", "ビーチラン（1km）", "U12", "女子"),
    ("704862", "ビーチラン（1km）", "U12", "男子"),
]

# プールPDFの該当番号（U8/U10/U12の個人種目）
POOL_NUMBERS = [
    "05", "06", "53", "54",   # U8: 障害物スイム50m, ジュニアチューブスイム50m
    "07", "08", "55", "56",   # U10: 障害物スイム50m, レスキューチューブトウ100m
    "09", "10", "57", "58",   # U12: 障害物スイム50m, レスキューチューブトウ100m
]


QUERY = """
{
  eventDivision(id: "%s") {
    ranking {
      place
      athleteId
      competitor { athlete { name } teamName }
    }
  }
}
"""


def fetch_liveheats(division_id):
    body = json.dumps({"query": QUERY % division_id}).encode("utf-8")
    req = urllib.request.Request(
        GRAPHQL_URL, data=body, headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def points_for(place):
    if place is None or place < 1 or place > 16:
        return 0
    return 17 - place


def main():
    aggregated = {}

    def add(category, gender, name, team, event_name, place, source):
        pts = points_for(place)
        if pts == 0:
            return
        nname = normalize_name(name)
        key = (category, gender, nname)
        entry = aggregated.setdefault(
            key,
            {
                "name": nname,
                "team": team,
                "category": category,
                "gender": gender,
                "events": [],
                "total": 0,
            },
        )
        entry["events"].append((event_name, place, pts, source))
        entry["total"] += pts
        if not entry["team"]:
            entry["team"] = team

    # 1) Liveheats（ビーチ）
    for div_id, event_name, category, gender in LIVEHEATS_DIVISIONS:
        print(f"[liveheats] {category} {event_name}（{gender}）", file=sys.stderr)
        data = fetch_liveheats(div_id)
        ranking = (data.get("data", {}).get("eventDivision") or {}).get("ranking") or []
        for r in ranking:
            comp = r.get("competitor") or {}
            athlete = (comp.get("athlete") or {}).get("name") or ""
            team = comp.get("teamName") or ""
            add(category, gender, athlete, team, event_name, r.get("place"), "ビーチ")

    # 2) Pool PDFs
    pool_dir = SCRIPT_DIR / "raw_pool"
    for no in POOL_NUMBERS:
        meta = EVENT_META.get(no)
        if not meta:
            continue
        event_name, category, gender = meta
        if category not in ("U8", "U10", "U12"):
            continue
        pdf_path = pool_dir / f"jym-p_2025_result_{no}.pdf"
        if not pdf_path.exists():
            print(f"[pool] missing {pdf_path}", file=sys.stderr)
            continue
        print(f"[pool] {category} {event_name}（{gender}） {pdf_path.name}", file=sys.stderr)
        rows = parse_pdf(pdf_path)
        for row in rows:
            add(category, gender, row["name"], row["team"], event_name, row["rank"], "プール")

    buckets = {}
    for (cat, gen, _), entry in aggregated.items():
        buckets.setdefault((cat, gen), []).append(entry)
    for k in buckets:
        buckets[k].sort(key=lambda e: (-e["total"], -len(e["events"]), e["name"]))

    def assign_ranks(rows):
        out, prev_total, rank = [], None, 0
        for i, row in enumerate(rows, start=1):
            if row["total"] != prev_total:
                rank = i
                prev_total = row["total"]
            out.append((rank, row))
        return out

    md = []
    md.append("# 真のライフセーバーランキング 2025-2026（ジュニア統合版）")
    md.append("")
    md.append("**対象大会**：")
    md.append("- 第22回全日本ジュニアライフセービング選手権大会（2025年9月）")
    md.append("- 全日本ジュニアユースマスターズライフセービング・プール競技選手権大会2025（2026年1月）")
    md.append("")
    md.append("**集計対象**：個人種目のみ（U8・U10・U12 ／ 男女別）")
    md.append("**加点ルール**：1位=16点／2位=15点／…／16位=1点（JLA 2026年度方針）")
    md.append("")
    md.append("> ※チーム種目（リレー）は対象外")
    md.append("")

    for cat in ("U12", "U10", "U8"):
        for gender in ("男子", "女子"):
            rows = buckets.get((cat, gender), [])
            md.append(f"## 【{cat}】{gender}総合")
            md.append("")
            if not rows:
                md.append("（データなし）"); md.append(""); continue
            ranked = assign_ranks(rows)
            md.append("| 順位 | 選手名 | 所属 | 合計点 | 出場数 | 入賞種目 |")
            md.append("|---|---|---|---|---|---|")
            for rank, row in ranked:
                ev_strs = []
                for ev_name, place, pts, src in sorted(row["events"], key=lambda x: x[1]):
                    ev_strs.append(f"{ev_name} {place}位({src[0]})")
                cells = [
                    str(rank),
                    row["name"],
                    row["team"],
                    str(row["total"]),
                    str(len(row["events"])),
                    " / ".join(ev_strs),
                ]
                md.append("| " + " | ".join(cells) + " |")
            md.append("")

    out = SCRIPT_DIR / "2026_ジュニア統合ランキング（ビーチ＋プール）.md"
    out.write_text("\n".join(md), encoding="utf-8")
    print(f"[done] wrote {out}", file=sys.stderr)
    for (cat, gen), rows in sorted(buckets.items()):
        print(f"  {cat} {gen}: {len(rows)}名", file=sys.stderr)


if __name__ == "__main__":
    main()
