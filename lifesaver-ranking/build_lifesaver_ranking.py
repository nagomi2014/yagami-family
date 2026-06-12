"""
真のライフセーバーランキング（個人種目・男女別）

JLA 2026年度方針に準拠：
- 個人種目のみ：1位=16点 〜 16位=1点
- 男女別に集計
- 対象大会：第51回全日本ライフセービング選手権大会（Liveheats event_id=414527）

GraphQL: https://liveheats.com/api/graphql
"""

import json
import sys
import urllib.request
from collections import defaultdict
from pathlib import Path

GRAPHQL_URL = "https://liveheats.com/api/graphql"
EVENT_ID = "414527"

# 個人種目のみ（男女別）。チーム種目・U12・支払い枠は除外
INDIVIDUAL_DIVISIONS = [
    ("732808", "サーフレース", "女子"),
    ("732809", "サーフレース", "男子"),
    ("732810", "サーフスキーレース", "女子"),
    ("732811", "サーフスキーレース", "男子"),
    ("732812", "ボードレース", "女子"),
    ("732813", "ボードレース", "男子"),
    ("732814", "オーシャンウーマン", "女子"),
    ("732815", "オーシャンマン", "男子"),
    ("732816", "ビーチフラッグス", "女子"),
    ("732817", "ビーチフラッグス", "男子"),
    ("732818", "ビーチスプリント", "女子"),
    ("732819", "ビーチスプリント", "男子"),
    ("732820", "ビーチラン（2km）", "女子"),
    ("732821", "ビーチラン（2km）", "男子"),
]

# 上位16位まで。1位=16点 → 16位=1点
def points_for(place: int) -> int:
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


def fetch(division_id: str) -> dict:
    body = json.dumps({"query": QUERY % division_id}).encode("utf-8")
    req = urllib.request.Request(
        GRAPHQL_URL,
        data=body,
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))


SCRIPT_DIR = Path(__file__).resolve().parent


def main():
    raw_dir = SCRIPT_DIR / "raw"
    raw_dir.mkdir(parents=True, exist_ok=True)

    # athleteId -> {"name": ..., "team": ..., "gender": ..., "events": [(種目名, place, points)], "total": int}
    aggregated: dict[str, dict] = {}

    for div_id, event_name, gender in INDIVIDUAL_DIVISIONS:
        print(f"[fetch] {event_name}（{gender}） id={div_id}", file=sys.stderr)
        data = fetch(div_id)
        (raw_dir / f"{div_id}_{event_name}_{gender}.json").write_text(
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

            key = athlete_id or f"name:{athlete}"
            entry = aggregated.setdefault(
                key,
                {
                    "name": athlete,
                    "team": team,
                    "gender": gender,
                    "events": [],
                    "total": 0,
                },
            )
            entry["events"].append((event_name, place, pts))
            entry["total"] += pts
            # 名前と所属が空の場合に補完
            if not entry["name"] or entry["name"] == "(unknown)":
                entry["name"] = athlete
            if not entry["team"]:
                entry["team"] = team
            entry["gender"] = gender  # 男女別なので種目から決定

    # 男女別に分けてソート
    by_gender = {"男子": [], "女子": []}
    for entry in aggregated.values():
        by_gender[entry["gender"]].append(entry)

    for g in by_gender:
        # 合計点降順、同点は出場種目数の多い順、それも同じなら名前
        by_gender[g].sort(
            key=lambda e: (-e["total"], -len(e["events"]), e["name"])
        )

    # 順位付け（同点=同順位、次は飛ばす）
    def assign_ranks(rows):
        rank = 0
        prev = None
        out = []
        for i, row in enumerate(rows, start=1):
            if row["total"] != prev:
                rank = i
                prev = row["total"]
            out.append((rank, row))
        return out

    # マークダウン出力
    md = []
    md.append("# 真のライフセーバーランキング 2026")
    md.append("")
    md.append("**対象大会**：第51回全日本ライフセービング選手権大会（本戦）")
    md.append("**集計対象**：個人種目14区分（男女別）")
    md.append("**加点ルール**：1位=16点／2位=15点／…／16位=1点（JLA 2026年度方針に準拠）")
    md.append("")
    md.append("> ※チーム種目（リレー・レスキュー）は対象外。U12ニッパーも対象外。")
    md.append("")

    obj_events = ["サーフレース", "サーフスキーレース", "ボードレース",
                  "オーシャンマン", "オーシャンウーマン",
                  "ビーチフラッグス", "ビーチスプリント", "ビーチラン（2km）"]

    for gender in ("男子", "女子"):
        md.append(f"## {gender}総合")
        md.append("")
        rows = assign_ranks(by_gender[gender])

        # 種目列の見出し（出場した種目を列にする）
        # 男子・女子で対象種目の正式名を絞る
        if gender == "男子":
            cols = ["サーフレース", "サーフスキーレース", "ボードレース",
                    "オーシャンマン", "ビーチフラッグス",
                    "ビーチスプリント", "ビーチラン（2km）"]
        else:
            cols = ["サーフレース", "サーフスキーレース", "ボードレース",
                    "オーシャンウーマン", "ビーチフラッグス",
                    "ビーチスプリント", "ビーチラン（2km）"]

        header = ["順位", "選手名", "所属", "合計点", "出場数"] + cols
        md.append("| " + " | ".join(header) + " |")
        md.append("|" + "|".join(["---"] * len(header)) + "|")

        for rank, row in rows:
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

    out_path = SCRIPT_DIR / "2026_全日本本戦_個人ランキング.md"
    out_path.write_text("\n".join(md), encoding="utf-8")
    print(f"[done] wrote {out_path}", file=sys.stderr)
    print(f"  男子: {len(by_gender['男子'])}名 / 女子: {len(by_gender['女子'])}名", file=sys.stderr)


if __name__ == "__main__":
    main()
