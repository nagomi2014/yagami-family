"""
真のライフセーバーランキング 2025-2026 まとめ記事生成

各カテゴリの TOP10 を「総合 / オーシャン部門 / プール部門」の3部門で並べ、
矢上家の順位もハイライトして、SNS / Note 用記事として出力。

データソース：build_youth_combined / build_junior_combined と同じく
- ユース：Liveheats event 406805 + プール大会PDF（ジュニアユースマスターズ）
- ジュニア：Liveheats event 397169 + プール大会PDF
- 本戦（成人）：Liveheats event 414527（プール大会未開催のためビーチのみ）
"""

import json
import sys
import urllib.request
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(SCRIPT_DIR))
from _pool_parser import parse_pdf, normalize_name, EVENT_META  # noqa: E402

GRAPHQL_URL = "https://liveheats.com/api/graphql"

# ===== 本戦（成人）=====
HONSEN_DIVISIONS = [
    ("732808", "サーフレース", "本戦", "女子"),
    ("732809", "サーフレース", "本戦", "男子"),
    ("732810", "サーフスキーレース", "本戦", "女子"),
    ("732811", "サーフスキーレース", "本戦", "男子"),
    ("732812", "ボードレース", "本戦", "女子"),
    ("732813", "ボードレース", "本戦", "男子"),
    ("732814", "オーシャンウーマン", "本戦", "女子"),
    ("732815", "オーシャンマン", "本戦", "男子"),
    ("732816", "ビーチフラッグス", "本戦", "女子"),
    ("732817", "ビーチフラッグス", "本戦", "男子"),
    ("732818", "ビーチスプリント", "本戦", "女子"),
    ("732819", "ビーチスプリント", "本戦", "男子"),
    ("732820", "ビーチラン（2km）", "本戦", "女子"),
    ("732821", "ビーチラン（2km）", "本戦", "男子"),
]

# ===== ユース =====
YOUTH_DIVISIONS = [
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
YOUTH_DEFER = {"763349", "763350"}  # ユースオーシャン（U15/U18合同）
YOUTH_DEFER_DIVS = [
    ("763349", "ユースオーシャンウーマン", "?", "女子"),
    ("763350", "ユースオーシャンマン", "?", "男子"),
]

YOUTH_POOL_NUMBERS = [
    "01","02","03","04",
    "33","34","35","36",
    "42","43","44","45",
    "51","52","65","66",
    "71","72","73","74",
]

# ===== ジュニア =====
JUNIOR_DIVISIONS = [
    ("704837", "ウェーディングレース", "U8", "女子"),
    ("704838", "ウェーディングレース", "U8", "男子"),
    ("704843", "ニッパーボードレース", "U8", "女子"),
    ("704844", "ニッパーボードレース", "U8", "男子"),
    ("704849", "ビーチフラッグス", "U8", "女子"),
    ("704850", "ビーチフラッグス", "U8", "男子"),
    ("704855", "ビーチスプリント", "U8", "女子"),
    ("704856", "ビーチスプリント", "U8", "男子"),
    ("704839", "ランスイムラン", "U10", "女子"),
    ("704840", "ランスイムラン", "U10", "男子"),
    ("704845", "ニッパーボードレース", "U10", "女子"),
    ("704846", "ニッパーボードレース", "U10", "男子"),
    ("704851", "ビーチフラッグス", "U10", "女子"),
    ("704852", "ビーチフラッグス", "U10", "男子"),
    ("704857", "ビーチスプリント", "U10", "女子"),
    ("704858", "ビーチスプリント", "U10", "男子"),
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
JUNIOR_POOL_NUMBERS = [
    "05", "06", "53", "54",
    "07", "08", "55", "56",
    "09", "10", "57", "58",
]

QUERY = """
{
  eventDivision(id: "%s") {
    ranking {
      place athleteId
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


def add_entry(agg, category, gender, name, team, place, source):
    pts = points_for(place)
    if pts == 0:
        return
    nname = normalize_name(name)
    key = (category, gender, nname)
    e = agg.setdefault(
        key,
        {
            "name": nname, "team": team, "category": category, "gender": gender,
            "ocean_pts": 0, "pool_pts": 0, "ocean_events": 0, "pool_events": 0,
        },
    )
    if source == "ocean":
        e["ocean_pts"] += pts
        e["ocean_events"] += 1
    else:
        e["pool_pts"] += pts
        e["pool_events"] += 1
    if not e["team"]:
        e["team"] = team


def collect_youth():
    """
    ユース集計：選手の主区分を判定し、所属外区分の点数も主区分に振り分ける。

    手順：
    1. 全種目の出場データを (cat, gen, name) → entries の形で一旦集める
    2. 各選手 (gen, name) の U15 出場数 vs U18 出場数を比較し主区分を決定
    3. 主区分外の種目記録は主区分に振り分けて加算
    """
    # raw_records[(gender, name)] = [{cat_event, event_name, place, source, team}, ...]
    raw_records = {}

    def collect(div_id, ev_name, cat, gen, source):
        data = fetch_liveheats(div_id)
        ranking = (data.get("data", {}).get("eventDivision") or {}).get("ranking") or []
        for r in ranking:
            comp = r.get("competitor") or {}
            athlete = (comp.get("athlete") or {}).get("name") or ""
            team = comp.get("teamName") or ""
            place = r.get("place")
            if place is None:
                continue
            nname = normalize_name(athlete)
            key = (gen, nname)
            raw_records.setdefault(key, []).append({
                "cat": cat, "event": ev_name, "place": place,
                "source": source, "team": team,
            })

    # オーシャン（年齢明示の種目）
    for div_id, ev_name, cat, gen in YOUTH_DIVISIONS:
        collect(div_id, ev_name, cat, gen, "ocean")

    # ユースオーシャン（U15合同種目、cat=undecided）
    for div_id, ev_name, _, gen in YOUTH_DEFER_DIVS:
        collect(div_id, ev_name, "undecided", gen, "ocean")

    # プール
    pool_dir = SCRIPT_DIR / "raw_pool"
    for no in YOUTH_POOL_NUMBERS:
        meta = EVENT_META.get(no)
        if not meta:
            continue
        ev_name, cat, gen = meta
        if cat not in ("U15", "U18"):
            continue
        pdf = pool_dir / f"jym-p_2025_result_{no}.pdf"
        if not pdf.exists():
            continue
        for row in parse_pdf(pdf):
            nname = normalize_name(row["name"])
            key = (gen, nname)
            raw_records.setdefault(key, []).append({
                "cat": cat, "event": ev_name, "place": row["rank"],
                "source": "pool", "team": row["team"],
            })

    # 各選手の主区分を判定（明示カテゴリのみで判定）
    main_cat = {}
    for key, recs in raw_records.items():
        u15 = sum(1 for r in recs if r["cat"] == "U15")
        u18 = sum(1 for r in recs if r["cat"] == "U18")
        # 多い方を主区分。同数の場合はU18優先（年長優先）
        main_cat[key] = "U18" if u18 > u15 else ("U15" if u15 > u18 else "U18")

    # 集計：選手の主区分と一致する種目（および合同種目）に加算
    # 加えて、U15選手が「U15に同じ種目がないU18種目」（サーフスキー／レスキューメドレー／
    # スーパーLS）で入賞した点数はU15部門にも加算する。これらはJLA方針で
    # 「U15区分の種目設定がなく、U18にしかない種目に限りU15競技者の出場を認める」
    # と明記された種目で、実質U15選手の上位種目として扱える。
    U18_EVENTS_OPEN_TO_U15 = {
        "サーフスキーレース",
        "レスキューメドレー（100m）",
        "スーパーライフセーバー（200m）",
    }
    agg = {}
    for key, recs in raw_records.items():
        gen, nname = key
        cat = main_cat[key]
        for r in recs:
            # 主区分一致 or 合同種目 → 加算
            if r["cat"] == cat or r["cat"] == "undecided":
                add_entry(agg, cat, gen, nname, r["team"], r["place"], r["source"])
            # U15選手のU18種目（U15に種目設定がないもの）→ U15に加算
            elif cat == "U15" and r["cat"] == "U18" and r["event"] in U18_EVENTS_OPEN_TO_U15:
                add_entry(agg, cat, gen, nname, r["team"], r["place"], r["source"])
    return agg


def collect_junior():
    agg = {}
    for div_id, ev_name, cat, gen in JUNIOR_DIVISIONS:
        data = fetch_liveheats(div_id)
        ranking = (data.get("data", {}).get("eventDivision") or {}).get("ranking") or []
        for r in ranking:
            comp = r.get("competitor") or {}
            athlete = (comp.get("athlete") or {}).get("name") or ""
            team = comp.get("teamName") or ""
            add_entry(agg, cat, gen, athlete, team, r.get("place"), "ocean")

    pool_dir = SCRIPT_DIR / "raw_pool"
    for no in JUNIOR_POOL_NUMBERS:
        meta = EVENT_META.get(no)
        if not meta:
            continue
        ev_name, cat, gen = meta
        if cat not in ("U8", "U10", "U12"):
            continue
        pdf = pool_dir / f"jym-p_2025_result_{no}.pdf"
        if not pdf.exists():
            continue
        for row in parse_pdf(pdf):
            add_entry(agg, cat, gen, row["name"], row["team"], row["rank"], "pool")
    return agg


def collect_honsen():
    agg = {}
    for div_id, ev_name, cat, gen in HONSEN_DIVISIONS:
        data = fetch_liveheats(div_id)
        ranking = (data.get("data", {}).get("eventDivision") or {}).get("ranking") or []
        for r in ranking:
            comp = r.get("competitor") or {}
            athlete = (comp.get("athlete") or {}).get("name") or ""
            team = comp.get("teamName") or ""
            add_entry(agg, cat, gen, athlete, team, r.get("place"), "ocean")
    return agg


def rank_section(rows, key):
    """key="total"|"ocean"|"pool" でランキング順に並べて返す。"""
    def total(e):
        if key == "total":
            return e["ocean_pts"] + e["pool_pts"]
        elif key == "ocean":
            return e["ocean_pts"]
        else:
            return e["pool_pts"]
    def event_count(e):
        if key == "total":
            return e["ocean_events"] + e["pool_events"]
        elif key == "ocean":
            return e["ocean_events"]
        else:
            return e["pool_events"]
    sorted_rows = sorted(
        [r for r in rows if total(r) > 0],
        key=lambda e: (-total(e), -event_count(e), e["name"]),
    )
    out, prev, rank = [], None, 0
    for i, r in enumerate(sorted_rows, start=1):
        t = total(r)
        if t != prev:
            rank = i
            prev = t
        out.append((rank, r, t, event_count(r)))
    return out


YAGAMI = {
    "矢上 賢尚": ("U8", "男子", "賢尚くん"),
    "矢上 陽葉": ("U15", "女子", "陽葉ちゃん"),
    "矢上 結月": ("U18", "女子", "結月ちゃん"),
}


def yagami_in(rankings, cat, gen):
    """ranked = [(rank, entry, total, count), ...] から矢上家を抽出。"""
    out = []
    for rank, entry, total, count in rankings:
        for yname, (yc, yg, _) in YAGAMI.items():
            if yc == cat and yg == gen and entry["name"] == yname:
                out.append((rank, entry, total, count))
    return out


def make_table(ranked, top_n=10):
    lines = [
        "| 順位 | 選手 | 所属 | 点 |",
        "|---|---|---|---|",
    ]
    for rank, e, total, count in ranked[:top_n]:
        lines.append(f"| {rank} | {e['name']} | {e['team']} | {total} |")
    return lines


def write_article(honsen_agg, youth_agg, junior_agg):
    md = []
    md.append("# 真のライフセーバーランキング 2025-2026")
    md.append("")
    md.append("**ライフセービングの「真の総合力」を、JLA 2026年度方針に基づいて算出しました。**")
    md.append("")
    md.append("対象大会は次の3つ。")
    md.append("- 第51回 全日本ライフセービング選手権大会（2025年10月／本戦）")
    md.append("- 第17回 全日本ユースライフセービング選手権大会（2025年10月／U15・U18）")
    md.append("- 第22回 全日本ジュニアライフセービング選手権大会（2025年9月／U8・U10・U12）")
    md.append("- 全日本ジュニアユースマスターズライフセービング・プール競技選手権大会2025（2026年1月）")
    md.append("")
    md.append("加点ルールはJLA方針に準拠して、各個人種目の **1位＝16点、2位＝15点…16位＝1点**。")
    md.append("チーム種目は対象外、個人種目のみで集計しています。")
    md.append("")
    md.append("各カテゴリで「**総合（オーシャン＋プール）**」「**オーシャン部門**」「**プール部門**」の3区分で TOP10 をまとめました。")
    md.append("オーシャンとプールでは身体の使い方も得意な選手も全く違うので、両方こなす選手こそが“真のオールラウンダー”です。")
    md.append("")
    md.append("---")
    md.append("")

    sections = [
        ("本戦（成人男子）", honsen_agg, "本戦", "男子", False),
        ("本戦（成人女子）", honsen_agg, "本戦", "女子", False),
        ("ユース U18 男子", youth_agg, "U18", "男子", True),
        ("ユース U18 女子", youth_agg, "U18", "女子", True),
        ("ユース U15 男子", youth_agg, "U15", "男子", True),
        ("ユース U15 女子", youth_agg, "U15", "女子", True),
        ("ジュニア U12 男子", junior_agg, "U12", "男子", True),
        ("ジュニア U12 女子", junior_agg, "U12", "女子", True),
        ("ジュニア U10 男子", junior_agg, "U10", "男子", True),
        ("ジュニア U10 女子", junior_agg, "U10", "女子", True),
        ("ジュニア U8 男子", junior_agg, "U8", "男子", True),
        ("ジュニア U8 女子", junior_agg, "U8", "女子", True),
    ]

    for title, agg, cat, gen, has_pool in sections:
        rows = [e for (c, g, _), e in agg.items() if c == cat and g == gen]
        total_ranked = rank_section(rows, "total")
        ocean_ranked = rank_section(rows, "ocean")
        pool_ranked = rank_section(rows, "pool")

        md.append(f"## {title}")
        md.append("")

        # 総合
        md.append("### 総合")
        if has_pool:
            md.append("オーシャン＋プールの個人種目を合算した順位です。")
        else:
            md.append("オーシャン種目のみの集計です（成人プール大会は2026年2月開催・結果未公開）。")
        md.append("")
        md.extend(make_table(total_ranked))
        md.append("")

        if has_pool:
            md.append("### オーシャン部門")
            md.append("")
            md.extend(make_table(ocean_ranked))
            md.append("")

            md.append("### プール部門")
            md.append("")
            md.extend(make_table(pool_ranked))
            md.append("")

        # 矢上家
        ya_total = yagami_in(total_ranked, cat, gen)
        ya_ocean = yagami_in(ocean_ranked, cat, gen)
        ya_pool = yagami_in(pool_ranked, cat, gen)
        if ya_total or ya_ocean or ya_pool:
            md.append("**📍 矢上家**")
            md.append("")
            for rank, e, total, count in ya_total:
                nick = YAGAMI[e["name"]][2]
                md.append(f"- 総合：{nick}（{e['name']}）→ **{rank}位** / {total}点 / {count}種目入賞")
            for rank, e, total, count in ya_ocean:
                nick = YAGAMI[e["name"]][2]
                md.append(f"- オーシャン：{nick} → {rank}位 / {total}点 / {count}種目入賞")
            for rank, e, total, count in ya_pool:
                nick = YAGAMI[e["name"]][2]
                md.append(f"- プール：{nick} → {rank}位 / {total}点 / {count}種目入賞")
            md.append("")

        md.append("---")
        md.append("")

    md.append("## まとめ")
    md.append("")
    md.append("オーシャンの強さと、プールの強さは、必ずしも一致しません。")
    md.append("両方の舞台で結果を残せる選手こそが、災害現場（海・プール・水辺）どこに行っても助けられる「真のライフセーバー」だと思います。")
    md.append("")
    md.append("そして我が家の3人。賢尚はU8男子で総合1位の快挙、陽葉はU15女子で全国10位、結月はU18の超激戦区にチャレンジし続けています。")
    md.append("これからも家族みんなで挑戦していきます。応援どうぞよろしくお願いします。")
    md.append("")
    md.append("> 集計対象：個人種目のみ（チーム種目は除外）。加点ルールは JLA 2026年度競技会運営方針に準拠。")
    md.append("> 対象大会：第51回全日本／第17回ユース／第22回ジュニア／全日本ジュニアユースマスターズ・プール競技選手権大会2025")

    out = SCRIPT_DIR / "2026_真のライフセーバーランキング_記事.md"
    out.write_text("\n".join(md), encoding="utf-8")
    print(f"[done] wrote {out}", file=sys.stderr)


def emit_all_rankings_json(honsen_agg, youth_agg, junior_agg):
    """全カテゴリのTOP10を data.ts 用にJSON出力。"""
    sections = [
        ("honsen_male", honsen_agg, "本戦", "男子", "全日本男子"),
        ("honsen_female", honsen_agg, "本戦", "女子", "全日本女子"),
        ("u18_male", youth_agg, "U18", "男子", "U18男子"),
        ("u18_female", youth_agg, "U18", "女子", "U18女子"),
        ("u15_male", youth_agg, "U15", "男子", "U15男子"),
        ("u15_female", youth_agg, "U15", "女子", "U15女子"),
        ("u12_male", junior_agg, "U12", "男子", "U12男子"),
        ("u12_female", junior_agg, "U12", "女子", "U12女子"),
        ("u10_male", junior_agg, "U10", "男子", "U10男子"),
        ("u10_female", junior_agg, "U10", "女子", "U10女子"),
        ("u8_male", junior_agg, "U8", "男子", "U8男子"),
        ("u8_female", junior_agg, "U8", "女子", "U8女子"),
    ]
    out = {}
    for key, agg, cat, gen, label in sections:
        rows = [e for (c, g, _), e in agg.items() if c == cat and g == gen]
        total_ranked = rank_section(rows, "total")
        ocean_ranked = rank_section(rows, "ocean")
        pool_ranked = rank_section(rows, "pool")

        def serialize(ranked, top_n=10):
            out_rows = []
            for rank, e, total, count in ranked[:top_n]:
                # 矢上家ハイライト
                hl = ""
                if "矢上" in e["name"]:
                    hl = "本人"
                elif e["team"] == "館山サーフライフセービングクラブ":
                    hl = "館山勢"
                out_rows.append({
                    "rank": rank, "name": e["name"], "club": e["team"],
                    "points": total, "highlight": hl,
                })
            return out_rows

        out[key] = {
            "label": label,
            "totalTop": serialize(total_ranked),
            "oceanTop": serialize(ocean_ranked),
            "poolTop": serialize(pool_ranked),
        }
    out_path = SCRIPT_DIR / "all_rankings.json"
    out_path.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[done] wrote {out_path}", file=sys.stderr)


def emit_ranking_json(honsen_agg, youth_agg, junior_agg):
    """data.ts 生成用に、3きょうだいの所属カテゴリTOP10と矢上家順位をJSON出力。"""
    out = {}
    targets = [
        ("賢尚", "矢上 賢尚", junior_agg, "U8", "男子", "U8男子総合"),
        ("陽葉", "矢上 陽葉", youth_agg, "U15", "女子", "U15女子総合"),
        ("結月", "矢上 結月", youth_agg, "U18", "女子", "U18女子総合"),
    ]
    for short, full_name, agg, cat, gen, label in targets:
        rows = [e for (c, g, _), e in agg.items() if c == cat and g == gen]
        total_ranked = rank_section(rows, "total")
        ocean_ranked = rank_section(rows, "ocean")
        pool_ranked = rank_section(rows, "pool")

        def serialize(ranked, top_n=10):
            out_rows = []
            for i, (rank, e, total, count) in enumerate(ranked[:top_n]):
                hl = "本人" if e["name"] == full_name else (
                    "館山勢" if e["team"] == "館山サーフライフセービングクラブ" else ""
                )
                out_rows.append({
                    "rank": rank, "name": e["name"], "club": e["team"],
                    "points": total, "highlight": hl,
                })
            return out_rows

        def find_self(ranked):
            for rank, e, total, count in ranked:
                if e["name"] == full_name:
                    return {"rank": rank, "points": total, "events": count}
            return None

        out[short] = {
            "categoryLabel": label,
            "totalTop": serialize(total_ranked),
            "oceanTop": serialize(ocean_ranked),
            "poolTop": serialize(pool_ranked),
            "self": {
                "total": find_self(total_ranked),
                "ocean": find_self(ocean_ranked),
                "pool": find_self(pool_ranked),
            },
        }
    out_path = SCRIPT_DIR / "ranking_for_records.json"
    out_path.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[done] wrote {out_path}", file=sys.stderr)


def main():
    print("[fetch] 本戦…", file=sys.stderr)
    honsen_agg = collect_honsen()
    print("[fetch] ユース…", file=sys.stderr)
    youth_agg = collect_youth()
    print("[fetch] ジュニア…", file=sys.stderr)
    junior_agg = collect_junior()
    write_article(honsen_agg, youth_agg, junior_agg)
    emit_ranking_json(honsen_agg, youth_agg, junior_agg)
    emit_all_rankings_json(honsen_agg, youth_agg, junior_agg)


if __name__ == "__main__":
    main()
