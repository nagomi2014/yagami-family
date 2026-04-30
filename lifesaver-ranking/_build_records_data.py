"""
矢上家3人の年度別記録を統合し、Next.js page.tsx 用の TypeScript データファイルを生成する。

データソース：
- 過去年度（2021〜2024）：yagami_records_raw.json（PDF抽出済み）
- 2025年度：
  - ビーチ：raw/ raw_youth/ raw_junior/ の Liveheats JSON
  - プール：raw_pool/ の jym-p_2025_result_NN.pdf

出力：src/app/records/data.ts
"""

import json
import re
from pathlib import Path

import pdfplumber

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent
OUT_PATH = PROJECT_DIR / "src" / "app" / "records" / "data.ts"

YAGAMI_FULL = {"矢上 賢尚": "賢尚", "矢上 陽葉": "陽葉", "矢上 結月": "結月"}
YAGAMI_NORM = {"矢上 賢尚": "矢上 賢尚", "矢上 陽葉": "矢上 陽葉", "矢上 結月": "矢上 結月"}


def parse_event_header(header: str, gender_hint: str = "") -> tuple[str, str, str]:
    """event_header を (種目名, カテゴリ, 性別) に分解。"""
    h = header.strip()
    # カテゴリ抽出
    cat = ""
    m_cat = re.search(r"[ＵU]\s*[1１]\s*[8８5５2２0０]\s*[5５8８2２0０]?", h)
    if m_cat:
        c = m_cat.group(0).replace("Ｕ", "U").replace("１", "1").replace("８", "8").replace("５", "5").replace("２", "2").replace("０", "0").replace(" ", "")
        cat = c
    elif "小学3" in h or "小学４" in h or "小学3･4" in h:
        cat = "小学3-4年"
    elif "小学5" in h or "小学6" in h or "小学5･6" in h:
        cat = "小学5-6年"
    elif "中学生" in h:
        cat = "中学生"
    elif "高校生" in h:
        cat = "高校生"
    # 性別
    gen = "女子" if "女子" in h else ("男子" if "男子" in h else gender_hint)
    # 種目名（カテゴリ・性別を取り除く）
    name = h
    name = re.sub(r"[ＵU]\s*[1１]?[0-9０-９]+", "", name)
    name = re.sub(r"小学[3-6][･・3-6年]+生?", "", name)
    name = re.sub(r"(中学生|高校生)", "", name)
    name = re.sub(r"(男子|女子|混合)", "", name)
    name = re.sub(r"競技No\.?\s*[:：]?\s*\d+", "", name)
    name = re.sub(r"タイム決勝|予選|決勝|FINAL", "", name)
    name = re.sub(r"[（()]\s*[）)]", "", name)
    name = re.sub(r"\s+", " ", name).strip()
    name = name.strip("（）()/／")
    return name, cat, gen


def normalize_event(name: str) -> str:
    """種目名を統一。"""
    n = name
    n = n.replace("ボ ードレース", "ボードレース")
    n = n.replace("（", "（").replace("）", "）")
    # 共通正規化
    mapping = {
        "ニッパーボードレース": "ニッパーボードレース",
        "ボードレース": "ボードレース",
        "サーフレース": "サーフレース",
        "サーフスキーレース": "サーフスキーレース",
        "ビーチフラッグス": "ビーチフラッグス",
        "ビーチスプリント": "ビーチスプリント",
        "ビーチラン": "ビーチラン",
        "オーシャンマン": "オーシャンマン",
        "オーシャンウーマン": "オーシャンウーマン",
        "ユースオーシャンマン": "ユースオーシャンマン",
        "ユースオーシャンウーマン": "ユースオーシャンウーマン",
        "ウェーディングレース": "ウェーディングレース",
        "ランスイムラン": "ランスイムラン",
        "障害物スイム": "障害物スイム",
        "マネキンキャリー": "マネキンキャリー",
        "マネキントウ": "マネキントウ",
        "マネキンキャリー・ウィズフィン": "マネキンキャリー・ウィズフィン",
        "マネキントウ・ウィズフィン": "マネキントウ・ウィズフィン",
        "レスキューチューブトウ": "レスキューチューブトウ",
        "ジュニアチューブスイム": "ジュニアチューブスイム",
        "レスキューメドレー": "レスキューメドレー",
        "スーパーライフセーバー": "スーパーライフセーバー",
        "ラインスロー": "ラインスロー",
    }
    for k, v in mapping.items():
        if k in n:
            # 距離部分を保持
            m = re.search(rf"{k}[^a-zA-Z]*?(\([0-9]+m\)|（[0-9]+m）)?", n)
            if m and m.group(1):
                return f"{v}{m.group(1)}".replace("(", "（").replace(")", "）")
            return v
    return n


# ===== 過去年度の整形 =====
def build_past_years():
    raw = json.load(open(SCRIPT_DIR / "yagami_records_raw.json", encoding="utf-8"))
    # records[name][year] = list of {kind, event, category, gender, rank, time}
    data = {"賢尚": {}, "陽葉": {}, "結月": {}}
    for r in raw:
        if r["rank"] is None:
            continue
        ev_name, cat, gen = parse_event_header(r["event_header"], r.get("gender", ""))
        ev_name = normalize_event(ev_name)
        if not ev_name or len(ev_name) < 2:
            continue
        # リレー・チーム種目を除外
        if "リレー" in ev_name or "リレー" in r["event_header"]:
            continue
        # チーム種目（メンバーが複数並ぶ行）も除外（rawから判定）
        # raw_lineが「数字 矢上 X カナ 所属」の形式でなければ怪しい
        # → contextに「ジュニアレスキュー」「リレー」「チーム」が含まれる場合除外
        ctx_text = r.get("context", "") + " " + r["event_header"]
        if any(k in ctx_text for k in ["リレー", "ニッパーレスキュー", "ジュニアレスキュー", "チーム種目", "ボードレスキュー", "レスキューチューブレスキュー"]):
            continue
        # 種別判定（プール / ビーチ／オーシャン）
        kind = r["kind"]
        if "プール" in kind or "プール" in r["pdf"]:
            section = "pool"
        else:
            section = "ocean"
        year = str(r["year"])
        athlete = data[r["name_short"]]
        athlete.setdefault(year, []).append({
            "section": section,
            "event": ev_name,
            "category": cat,
            "gender": gen,
            "rank": r["rank"],
            "time": r["time"],
        })
    return data


# ===== 2025年度のビーチ／オーシャン（Liveheats） =====
def collect_2025_ocean():
    """2025年度Liveheatsデータから矢上家の出場記録を抽出。"""
    out = {"賢尚": [], "陽葉": [], "結月": []}
    sources = [
        # (folder, division_id_to_event_map)
        ("raw", [  # 本戦（成人）→ 矢上家は対象外
        ]),
        ("raw_youth", [
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
        ]),
        ("raw_junior", [
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
        ]),
    ]
    for folder, divs in sources:
        for div_id, event_name, category, gender in divs:
            # JSONファイル名のパターン
            files = list((SCRIPT_DIR / folder).glob(f"{div_id}_*.json"))
            for f in files:
                try:
                    d = json.load(open(f, encoding="utf-8"))
                except Exception:
                    continue
                ranking = (d.get("data", {}).get("eventDivision") or {}).get("ranking") or []
                for r in ranking:
                    comp = r.get("competitor") or {}
                    name = (comp.get("athlete") or {}).get("name") or ""
                    for full, short in YAGAMI_FULL.items():
                        if full in name:
                            place = r.get("place")
                            if place is None:
                                continue
                            out[short].append({
                                "section": "ocean",
                                "event": event_name,
                                "category": category,
                                "gender": gender,
                                "rank": place,
                                "time": "",
                            })
    return out


# ===== 2025年度プール（PDF） =====
RANK_LINE_POOL = re.compile(r"^(\d{1,3})\s+\d+/\d+\s+(\S+\s+\S+(?:\s+\S+)?)\s+(.+?)$")
TIME_RE_POOL = re.compile(r"(\d+:\d+\.\d+|\d+\.\d+)")

POOL_EVENTS_2025 = {
    # PDF番号 → (種目名, カテゴリ, 性別)
    "01": ("障害物スイム（200m）", "U18", "女子"),
    "02": ("障害物スイム（200m）", "U18", "男子"),
    "03": ("障害物スイム（100m）", "U15", "女子"),
    "04": ("障害物スイム（100m）", "U15", "男子"),
    "05": ("障害物スイム（50m）", "U8", "女子"),
    "06": ("障害物スイム（50m）", "U8", "男子"),
    "07": ("障害物スイム（50m）", "U10", "女子"),
    "08": ("障害物スイム（50m）", "U10", "男子"),
    "09": ("障害物スイム（50m）", "U12", "女子"),
    "10": ("障害物スイム（50m）", "U12", "男子"),
    "33": ("マネキンキャリー（50m）", "U15", "女子"),
    "34": ("マネキンキャリー（50m）", "U15", "男子"),
    "35": ("マネキンキャリー（50m）", "U18", "女子"),
    "36": ("マネキンキャリー（50m）", "U18", "男子"),
    "42": ("マネキンキャリー・ウィズフィン（100m）", "U15", "女子"),
    "43": ("マネキンキャリー・ウィズフィン（100m）", "U15", "男子"),
    "44": ("マネキンキャリー・ウィズフィン（100m）", "U18", "女子"),
    "45": ("マネキンキャリー・ウィズフィン（100m）", "U18", "男子"),
    "51": ("レスキューメドレー（100m）", "U18", "女子"),
    "52": ("レスキューメドレー（100m）", "U18", "男子"),
    "53": ("ジュニアチューブスイム（50m）", "U8", "女子"),
    "54": ("ジュニアチューブスイム（50m）", "U8", "男子"),
    "55": ("レスキューチューブトウ（100m）", "U10", "女子"),
    "56": ("レスキューチューブトウ（100m）", "U10", "男子"),
    "57": ("レスキューチューブトウ（100m）", "U12", "女子"),
    "58": ("レスキューチューブトウ（100m）", "U12", "男子"),
    "65": ("スーパーライフセーバー（200m）", "U18", "女子"),
    "66": ("スーパーライフセーバー（200m）", "U18", "男子"),
    "71": ("マネキントウ・ウィズフィン（100m）", "U15", "女子"),
    "72": ("マネキントウ・ウィズフィン（100m）", "U15", "男子"),
    "73": ("マネキントウ・ウィズフィン（100m）", "U18", "女子"),
    "74": ("マネキントウ・ウィズフィン（100m）", "U18", "男子"),
}


def collect_2025_pool():
    out = {"賢尚": [], "陽葉": [], "結月": []}
    for no, (event_name, cat, gen) in POOL_EVENTS_2025.items():
        pdf = SCRIPT_DIR / "raw_pool" / f"jym-p_2025_result_{no}.pdf"
        if not pdf.exists():
            continue
        try:
            with pdfplumber.open(pdf) as p:
                text = "\n".join((pg.extract_text() or "") for pg in p.pages)
        except Exception:
            continue
        lines = text.splitlines()
        for i, line in enumerate(lines):
            m = RANK_LINE_POOL.match(line.strip())
            if not m:
                continue
            rank = int(m.group(1))
            name = m.group(2).strip()
            for full, short in YAGAMI_FULL.items():
                if full in name:
                    # タイム取得（次行）
                    time_str = ""
                    if i + 1 < len(lines):
                        tm = TIME_RE_POOL.search(lines[i + 1])
                        if tm:
                            time_str = tm.group(1)
                    out[short].append({
                        "section": "pool",
                        "event": event_name,
                        "category": cat,
                        "gender": gen,
                        "rank": rank,
                        "time": time_str,
                    })
    return out


# ===== 2019年データ（手動補完）=====
RECORDS_2019 = {
    "陽葉": [
        {"section": "ocean", "event": "ビーチフラッグス", "category": "小学1-2年", "gender": "女子", "rank": 3, "time": ""},
        {"section": "ocean", "event": "ビーチスプリント", "category": "小学1-2年", "gender": "女子", "rank": 4, "time": ""},
    ],
    "結月": [
        {"section": "ocean", "event": "ビーチスプリント", "category": "小学3-4年", "gender": "女子", "rank": 7, "time": ""},
    ],
}


# ===== 統合 =====
def main():
    past = build_past_years()
    ocean_2025 = collect_2025_ocean()
    pool_2025 = collect_2025_pool()

    # 2019年データを追加
    for short, recs in RECORDS_2019.items():
        past.setdefault(short, {}).setdefault("2019", []).extend(recs)

    # 2025年度のレコードをpastと同じ構造に追加
    for short, recs in ocean_2025.items():
        for r in recs:
            past[short].setdefault("2025", []).append(r)
    for short, recs in pool_2025.items():
        for r in recs:
            past[short].setdefault("2025", []).append(r)

    # サマリー
    for short, by_year in past.items():
        for y in sorted(by_year):
            ocean_n = sum(1 for r in by_year[y] if r["section"] == "ocean")
            pool_n = sum(1 for r in by_year[y] if r["section"] == "pool")
            print(f"  {short} {y}: ocean={ocean_n} pool={pool_n}")

    out_json = SCRIPT_DIR / "yagami_all_records.json"
    out_json.write_text(json.dumps(past, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n[done] saved {out_json}")


if __name__ == "__main__":
    main()
