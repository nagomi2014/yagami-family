"""
真のライフセーバーランキング（ユース統合版・U15/U18×男女別）

データソース：
1. 第17回全日本ユースライフセービング選手権大会（Liveheats event_id=406805）
2. 全日本ジュニアユースマスターズライフセービング・プール競技選手権大会2025（PDF）

加点ルール：個人種目のみ、1位=16点〜16位=1点（JLA 2026年度方針）
"""

import json
import re
import sys
import urllib.request
from pathlib import Path

# Add this dir to import _pool_parser
SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPT_DIR))
from _pool_parser import parse_pdf, normalize_name, EVENT_META  # noqa: E402

GRAPHQL_URL = "https://liveheats.com/api/graphql"

# Liveheats のユース個人種目（763xxx 系のレース結果ディビジョン）
LIVEHEATS_DIVISIONS = [
    ("763300", "サーフレース", "U15", "女子"),
    ("763301", "サーフレース", "U15", "男子"),
    ("763333", "ニッパーボードレース", "U15", "女子"),
    ("763334", "ニッパーボードレース", "U15", "男子"),
    ("763335", "ボードレース", "U15", "女子"),
    ("763336", "ボードレース", "U15", "男子"),
    ("763337", "ビーチフラッグス", "U15", "女子"),
    ("763338", "ビーチフラッグス", "U15", "男子"),
    ("763339", "ビーチスプリント", "U15", "女子"),
    ("763340", "ビーチスプリント", "U15", "男子"),
    ("763341", "ビーチラン（1km）", "U15", "女子"),
    ("763342", "ビーチラン（1km）", "U15", "男子"),
    ("763349", "ユースオーシャンウーマン", "U15", "女子"),
    ("763350", "ユースオーシャンマン", "U15", "男子"),
    ("763343", "サーフレース", "U18", "女子"),
    ("763344", "サーフレース", "U18", "男子"),
    ("763345", "ボードレース", "U18", "女子"),
    ("763346", "ボードレース", "U18", "男子"),
    ("763347", "サーフスキーレース", "U18", "女子"),
    ("763348", "サーフスキーレース", "U18", "男子"),
    ("763351", "オーシャンウーマン", "U18", "女子"),
    ("763352", "オーシャンマン", "U18", "男子"),
    ("763353", "ビーチフラッグス", "U18", "女子"),
    ("763354", "ビーチフラッグス", "U18", "男子"),
    ("763355", "ビーチスプリント", "U18", "女子"),
    ("763356", "ビーチスプリント", "U18", "男子"),
    ("763357", "ビーチラン（2km）", "U18", "女子"),
    ("763358", "ビーチラン（2km）", "U18", "男子"),
]

# プールPDFの該当番号（U15/U18の個人種目のみ）
# ラインスロー（26,27,31,32）はチーム種目（2人組）のため除外
POOL_NUMBERS = [
    "01", "02", "03", "04",         # 障害物スイム U18/U15
    "33", "34", "35", "36",         # マネキンキャリー
    "42", "43", "44", "45",         # マネキンキャリーWF
    "51", "52", "65", "66",         # レスキューメドレー / スーパーLS
    "71", "72", "73", "74",         # マネキントウWF
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
    # name_key -> entry
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

    # 「ユースオーシャン」種目（763349/763350）はU15・U18合同レースで、
    # U18選手も出場している。集計順序を分けて、選手の主区分で振り分ける。
    DEFER_IDS = {"763349", "763350"}

    # 1) Liveheats（先に確定カテゴリの種目だけ処理）
    for div_id, event_name, category, gender in LIVEHEATS_DIVISIONS:
        if div_id in DEFER_IDS:
            continue
        print(f"[liveheats] {category} {event_name}（{gender}）", file=sys.stderr)
        data = fetch_liveheats(div_id)
        ranking = (data.get("data", {}).get("eventDivision") or {}).get("ranking") or []
        for r in ranking:
            comp = r.get("competitor") or {}
            athlete = (comp.get("athlete") or {}).get("name") or ""
            team = comp.get("teamName") or ""
            add(category, gender, athlete, team, event_name, r.get("place"), "ビーチ・オーシャン")

    # 1b) ユースオーシャン：選手が既にU18にいればU18、それ以外はU15に加算
    for div_id, event_name, category, gender in LIVEHEATS_DIVISIONS:
        if div_id not in DEFER_IDS:
            continue
        print(f"[liveheats-defer] {event_name}（{gender}）→選手の主区分で振り分け", file=sys.stderr)
        data = fetch_liveheats(div_id)
        ranking = (data.get("data", {}).get("eventDivision") or {}).get("ranking") or []
        for r in ranking:
            comp = r.get("competitor") or {}
            athlete = (comp.get("athlete") or {}).get("name") or ""
            team = comp.get("teamName") or ""
            nname = normalize_name(athlete)
            target_cat = "U18" if ("U18", gender, nname) in aggregated else "U15"
            add(target_cat, gender, athlete, team, event_name, r.get("place"), "ビーチ・オーシャン")

    # 2) Pool PDFs
    pool_dir = SCRIPT_DIR / "raw_pool"
    for no in POOL_NUMBERS:
        meta = EVENT_META.get(no)
        if not meta:
            continue
        event_name, category, gender = meta
        if category not in ("U15", "U18"):
            continue
        pdf_path = pool_dir / f"jym-p_2025_result_{no}.pdf"
        if not pdf_path.exists():
            print(f"[pool] missing {pdf_path}", file=sys.stderr)
            continue
        print(f"[pool] {category} {event_name}（{gender}） {pdf_path.name}", file=sys.stderr)
        rows = parse_pdf(pdf_path)
        for row in rows:
            add(category, gender, row["name"], row["team"], event_name, row["rank"], "プール")

    # 区分別ソート
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

    # MD出力
    md = []
    md.append("# 真のライフセーバーランキング 2025-2026（ユース統合版）")
    md.append("")
    md.append("**対象大会**：")
    md.append("- 第17回全日本ユースライフセービング選手権大会（2025年10月）")
    md.append("- 全日本ジュニアユースマスターズライフセービング・プール競技選手権大会2025（2026年1月）")
    md.append("")
    md.append("**集計対象**：個人種目のみ（U15・U18 ／ 男女別）")
    md.append("**加点ルール**：1位=16点／2位=15点／…／16位=1点（JLA 2026年度方針）")
    md.append("")
    md.append("> ※チーム種目（リレー・レスキュー）は対象外")
    md.append("")

    for cat in ("U18", "U15"):
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

    out = SCRIPT_DIR / "2026_ユース統合ランキング（ビーチ＋プール）.md"
    out.write_text("\n".join(md), encoding="utf-8")
    print(f"[done] wrote {out}", file=sys.stderr)
    for (cat, gen), rows in sorted(buckets.items()):
        print(f"  {cat} {gen}: {len(rows)}名", file=sys.stderr)


if __name__ == "__main__":
    main()
