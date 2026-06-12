"""
真のライフセーバーランキング（ジュニア選手権・個人種目・U8/U10/U12×男女別）

JLA 2026年度方針に準拠：
- 個人種目のみ：1位=16点 〜 16位=1点
- U8/U10/U12 × 男女 で6区分のランキング
- 対象大会：第22回全日本ジュニアライフセービング選手権大会（Liveheats event_id=397169）
"""

import json
import sys
import urllib.request
from pathlib import Path

GRAPHQL_URL = "https://liveheats.com/api/graphql"
EVENT_ID = "397169"
SCRIPT_DIR = Path(__file__).resolve().parent

# (division_id, 種目名, カテゴリ, 性別)
INDIVIDUAL_DIVISIONS = [
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

COLUMN_ORDER = {
    ("U8", "男子"): ["ウェーディングレース", "ニッパーボードレース", "ビーチフラッグス", "ビーチスプリント"],
    ("U8", "女子"): ["ウェーディングレース", "ニッパーボードレース", "ビーチフラッグス", "ビーチスプリント"],
    ("U10", "男子"): ["ランスイムラン", "ニッパーボードレース", "ビーチフラッグス", "ビーチスプリント"],
    ("U10", "女子"): ["ランスイムラン", "ニッパーボードレース", "ビーチフラッグス", "ビーチスプリント"],
    ("U12", "男子"): ["ランスイムラン", "ニッパーボードレース", "ビーチフラッグス", "ビーチスプリント", "ビーチラン（1km）"],
    ("U12", "女子"): ["ランスイムラン", "ニッパーボードレース", "ビーチフラッグス", "ビーチスプリント", "ビーチラン（1km）"],
}


def points_for(place):
    if place is None or place < 1 or place > 16:
        return 0
    return 17 - place


QUERY = """
{
  eventDivision(id: "%s") {
    id
    status
    division { name }
    ranking {
      place
      athleteId
      competitor {
        athlete { name }
        teamName
      }
    }
  }
}
"""


def fetch(division_id):
    body = json.dumps({"query": QUERY % division_id}).encode("utf-8")
    req = urllib.request.Request(
        GRAPHQL_URL, data=body, headers={"Content-Type": "application/json"}
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


def main():
    raw_dir = SCRIPT_DIR / "raw_junior"
    raw_dir.mkdir(parents=True, exist_ok=True)

    aggregated = {}

    for div_id, event_name, category, gender in INDIVIDUAL_DIVISIONS:
        print(f"[fetch] {category} {event_name}（{gender}） id={div_id}", file=sys.stderr)
        data = fetch(div_id)
        (raw_dir / f"{div_id}_{category}_{event_name}_{gender}.json").write_text(
            json.dumps(data, ensure_ascii=False, indent=2), encoding="utf-8"
        )
        ranking = (data.get("data", {}).get("eventDivision") or {}).get("ranking") or []

        for r in ranking:
            place = r.get("place")
            pts = points_for(place)
            if pts == 0:
                continue
            athlete_id = r.get("athleteId") or ""
            comp = r.get("competitor") or {}
            athlete = (comp.get("athlete") or {}).get("name") or "(unknown)"
            team = comp.get("teamName") or ""
            ath_key = athlete_id or f"name:{athlete}"

            key = (category, gender, ath_key)
            entry = aggregated.setdefault(
                key,
                {
                    "name": athlete,
                    "team": team,
                    "category": category,
                    "gender": gender,
                    "events": [],
                    "total": 0,
                },
            )
            entry["events"].append((event_name, place, pts))
            entry["total"] += pts
            if not entry["team"]:
                entry["team"] = team

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
    md.append("# 真のライフセーバーランキング 2025（ジュニア選手権）")
    md.append("")
    md.append("**対象大会**：第22回全日本ジュニアライフセービング選手権大会")
    md.append("**集計対象**：個人種目（U8・U10・U12 ／ 男女別）")
    md.append("**加点ルール**：1位=16点／2位=15点／…／16位=1点（JLA 2026年度方針に準拠）")
    md.append("")
    md.append("> ※チーム種目（リレー・レスキュー）は対象外。")
    md.append("> ※U12ビーチラン（1km）は小学5,6年生限定種目。")
    md.append("")

    for cat in ("U12", "U10", "U8"):
        for gender in ("男子", "女子"):
            rows = buckets.get((cat, gender), [])
            md.append(f"## 【{cat}】{gender}総合")
            md.append("")
            if not rows:
                md.append("（データなし）")
                md.append("")
                continue
            ranked = assign_ranks(rows)
            cols = COLUMN_ORDER[(cat, gender)]
            header = ["順位", "選手名", "所属", "合計点", "出場数"] + cols
            md.append("| " + " | ".join(header) + " |")
            md.append("|" + "|".join(["---"] * len(header)) + "|")
            for rank, row in ranked:
                event_map = {ev: place for ev, place, _ in row["events"]}
                cells = [
                    str(rank),
                    row["name"],
                    row["team"],
                    str(row["total"]),
                    str(len(row["events"])),
                ]
                for col in cols:
                    p = event_map.get(col)
                    cells.append(f"{p}位" if p else "-")
                md.append("| " + " | ".join(cells) + " |")
            md.append("")

    out = SCRIPT_DIR / "2025_全日本ジュニア_個人ランキング.md"
    out.write_text("\n".join(md), encoding="utf-8")
    print(f"[done] wrote {out}", file=sys.stderr)
    for (cat, gen), rows in sorted(buckets.items()):
        print(f"  {cat} {gen}: {len(rows)}名", file=sys.stderr)


if __name__ == "__main__":
    main()
