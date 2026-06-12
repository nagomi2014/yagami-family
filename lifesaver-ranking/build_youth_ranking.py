"""
真のライフセーバーランキング（ユース選手権・個人種目・U15/U18×男女別）

JLA 2026年度方針に準拠：
- 個人種目のみ：1位=16点 〜 16位=1点
- U15/U18 ＋ 男女 で4区分のランキング
- 対象大会：第17回全日本ユースライフセービング選手権大会（Liveheats event_id=406805）

Liveheats上は同名IDが2系統あるが、763xxx 系がレース結果のディビジョン。
"""

import json
import sys
import urllib.request
from pathlib import Path

GRAPHQL_URL = "https://liveheats.com/api/graphql"
EVENT_ID = "406805"
SCRIPT_DIR = Path(__file__).resolve().parent

# (division_id, 種目名, カテゴリ, 性別)
INDIVIDUAL_DIVISIONS = [
    # U15
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
    # U18
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

# カテゴリごとに表示する種目列の順番
COLUMN_ORDER = {
    ("U15", "男子"): ["サーフレース", "サーフスキーレース", "ボードレース", "ニッパーボードレース",
                       "ユースオーシャンマン", "ビーチフラッグス", "ビーチスプリント", "ビーチラン（1km）"],
    ("U15", "女子"): ["サーフレース", "サーフスキーレース", "ボードレース", "ニッパーボードレース",
                       "ユースオーシャンウーマン", "ビーチフラッグス", "ビーチスプリント", "ビーチラン（1km）"],
    ("U18", "男子"): ["サーフレース", "サーフスキーレース", "ボードレース",
                       "オーシャンマン", "ビーチフラッグス", "ビーチスプリント", "ビーチラン（2km）"],
    ("U18", "女子"): ["サーフレース", "サーフスキーレース", "ボードレース",
                       "オーシャンウーマン", "ビーチフラッグス", "ビーチスプリント", "ビーチラン（2km）"],
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
    raw_dir = SCRIPT_DIR / "raw_youth"
    raw_dir.mkdir(parents=True, exist_ok=True)

    # キー: (category, gender, athlete_key) -> entry
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

    # 区分別に分けてソート
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

    # マークダウン出力
    md = []
    md.append("# 真のライフセーバーランキング 2026（ユース選手権）")
    md.append("")
    md.append("**対象大会**：第17回全日本ユースライフセービング選手権大会")
    md.append("**集計対象**：個人種目（U15・U18 ／ 男女別）")
    md.append("**加点ルール**：1位=16点／2位=15点／…／16位=1点（JLA 2026年度方針に準拠）")
    md.append("")
    md.append("> ※チーム種目（リレー・レスキュー）は対象外。")
    md.append("")

    for cat in ("U18", "U15"):
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

    out = SCRIPT_DIR / "2026_全日本ユース_個人ランキング.md"
    out.write_text("\n".join(md), encoding="utf-8")
    print(f"[done] wrote {out}", file=sys.stderr)
    for (cat, gen), rows in sorted(buckets.items()):
        print(f"  {cat} {gen}: {len(rows)}名", file=sys.stderr)


if __name__ == "__main__":
    main()
