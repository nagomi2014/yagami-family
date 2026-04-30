"""
yagami_all_records.json から TypeScript データファイルを生成。

出力：src/app/records/data.ts
"""
import json
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_DIR = SCRIPT_DIR.parent
OUT = PROJECT_DIR / "src" / "app" / "records" / "data.ts"

YAGAMI_META = {
    "賢尚": {"name": "矢上 賢尚", "nameEn": "Kenshow Yagami"},
    "陽葉": {"name": "矢上 陽葉", "nameEn": "Kiyoha Yagami"},
    "結月": {"name": "矢上 結月", "nameEn": "Yuzuki Yagami"},
}

# 2025年度（今期）のメイン区分
CURRENT_CATEGORY = {
    "賢尚": "U8男子",  # 2025年度はU8で出場
    "陽葉": "U15女子",
    "結月": "U18女子",
}

# ランキングデータは ranking_for_records.json から動的読み込み
RANKING_JSON = SCRIPT_DIR / "ranking_for_records.json"
ALL_RANKINGS_JSON = SCRIPT_DIR / "all_rankings.json"
BENCHMARKS_JSON = SCRIPT_DIR / "benchmarks.json"

# 2025年度の出場カテゴリTOP10（ランキング併記用、データソースは前回出力）
# キーは (年度, 選手, セクション) → 簡易表記。
TOP10_2025 = {
    "賢尚": {
        "category_label": "U8男子総合",
        "ocean_top": [
            ("矢上 賢尚", "館山SLSC", 60, "本人"),
            ("山崎 貴大", "湯河原LSC", 59, ""),
            ("岡本 涼太", "館山SLSC", 49, ""),
            ("飯田 真凪", "西浜SLSC", 48, ""),
            ("大塚 理玄", "西浜SLSC", 45, ""),
            ("河地 遼大", "湘南GAA", 45, ""),
            ("佐藤 亙", "西浜SLSC", 42, ""),
            ("高橋 海心", "湘南GAA", 41, ""),
            ("常盤 琉仁", "勝浦LSC", 37, ""),
            ("マイヤーエーロン晟", "勝浦LSC", 18, ""),
        ],
        "pool_top": [
            ("外村 爽羽", "湘南GAA", 32, ""),
            ("矢上 賢尚", "館山SLSC", 29, "本人"),
            ("荒井 絢仁", "西浜SLSC", 28, ""),
            ("山崎 貴大", "湯河原LSC", 27, ""),
            ("河地 遼大", "湘南GAA", 23, ""),
            ("常盤 琉仁", "勝浦LSC", 22, ""),
            ("大塚 理玄", "西浜SLSC", 21, ""),
            ("古藤 大智", "西浜SLSC", 18, ""),
            ("佐藤 亙", "西浜SLSC", 15, ""),
            ("森田 千瑛", "湘南GAA", 15, ""),
        ],
        "total_top": [
            ("矢上 賢尚", "館山SLSC", 89, "本人"),
            ("山崎 貴大", "湯河原LSC", 86, ""),
            ("河地 遼大", "湘南GAA", 68, ""),
            ("大塚 理玄", "西浜SLSC", 66, ""),
            ("常盤 琉仁", "勝浦LSC", 59, ""),
            ("佐藤 亙", "西浜SLSC", 57, ""),
            ("岡本 涼太", "館山SLSC", 49, ""),
            ("飯田 真凪", "西浜SLSC", 48, ""),
            ("高橋 海心", "湘南GAA", 41, ""),
            ("古藤 大智", "西浜SLSC", 35, ""),
        ],
    },
    "陽葉": {
        "category_label": "U15女子総合",
        "ocean_top": [
            ("髙田 琉衣", "湘南GAA", 68, ""),
            ("上野 美月", "西浜SLSC", 62, ""),
            ("鴨林 夏花", "西浜SLSC", 56, ""),
            ("矢上 陽葉", "館山SLSC", 42, "本人"),
            ("塚根 小夏", "湘南GAA", 37, ""),
            ("丸山 はやか", "鎌倉LG", 33, ""),
            ("常盤 珠絆", "勝浦LSC", 29, ""),
            ("谷中 渚瑠", "鎌倉LG", 27, ""),
            ("河端 詩央梨", "K-AQUA", 27, ""),
            ("上田 香蓮", "湘南GAA", 25, ""),
        ],
        "pool_top": [
            ("柳 輝於", "K-AQUA", 62, ""),
            ("藤﨑 笑佳", "西浜SLSC", 56, ""),
            ("河端 詩央梨", "K-AQUA", 55, ""),
            ("古賀 夏美", "西浜SLSC", 39, ""),
            ("髙田 琉衣", "湘南GAA", 36, ""),
            ("小池 侑依", "K-AQUA", 35, ""),
            ("鈴木 萌那", "K-AQUA", 32, ""),
            ("鴨林 夏花", "西浜SLSC", 32, ""),
            ("髙松 澪", "K-AQUA", 30, ""),
            ("春日 あかり", "十文字中高", 29, ""),
        ],
        "total_top": [
            ("髙田 琉衣", "湘南GAA", 104, ""),
            ("鴨林 夏花", "西浜SLSC", 88, ""),
            ("柳 輝於", "K-AQUA", 83, ""),
            ("河端 詩央梨", "K-AQUA", 82, ""),
            ("藤﨑 笑佳", "西浜SLSC", 81, ""),
            ("上野 美月", "西浜SLSC", 71, ""),
            ("塚根 小夏", "湘南GAA", 60, ""),
            ("古賀 夏美", "西浜SLSC", 53, ""),
            ("小池 侑依", "K-AQUA", 46, ""),
            ("矢上 陽葉", "館山SLSC", 42, "本人"),
        ],
    },
    "結月": {
        "category_label": "U18女子総合",
        "ocean_top": [
            ("成海 幸波", "館山SLSC", 65, ""),
            ("槍田 愛", "西浜SLSC", 41, ""),
            ("藤﨑 笑佳", "西浜SLSC", 39, ""),
            ("千葉 まひる", "館山SLSC", 37, ""),
            ("花塚 聖奈", "西浜SLSC", 36, ""),
            ("佐藤 志帆子", "西浜SLSC", 34, ""),
            ("富田 優佳子", "西浜SLSC", 32, ""),
            ("塚根 小夏", "湘南GAA", 32, ""),
            ("岸 愛姫", "日体大荏原", 32, ""),
            ("宍戸 晴奏", "成城学園", 31, ""),
        ],
        "pool_top": [
            ("槍田 愛", "西浜SLSC", 74, ""),
            ("中西 裕愛", "K-AQUA", 59, ""),
            ("千葉 まひる", "館山SLSC", 57, ""),
            ("橋本 香蓮", "日体大荏原", 52, ""),
            ("大橋 絆", "日体大荏原", 51, ""),
            ("河端 詩央梨", "K-AQUA", 41, ""),
            ("林 美穂", "十文字中高", 40, ""),
            ("花塚 聖奈", "西浜SLSC", 37, ""),
            ("森田 真帆", "K-AQUA", 32, ""),
            ("飯野 花梨", "十文字中高", 31, ""),
        ],
        "total_top": [
            ("槍田 愛", "西浜SLSC", 115, ""),
            ("千葉 まひる", "館山SLSC", 94, "館山勢"),
            ("中西 裕愛", "K-AQUA", 77, ""),
            ("花塚 聖奈", "西浜SLSC", 73, ""),
            ("橋本 香蓮", "日体大荏原", 68, ""),
            ("大橋 絆", "日体大荏原", 67, ""),
            ("成海 幸波", "館山SLSC", 65, "館山勢"),
            ("鴨林 夏花", "西浜SLSC", 60, ""),
            ("飯野 花梨", "十文字中高", 58, ""),
            ("藤﨑 笑佳", "西浜SLSC", 57, ""),
        ],
    },
}


def main():
    data = json.load(open(SCRIPT_DIR / "yagami_all_records.json", encoding="utf-8"))

    out_lines = []
    out_lines.append("// このファイルは自動生成されています。")
    out_lines.append("// 生成元: lifesaver-ranking/_emit_data_ts.py")
    out_lines.append("// 編集する場合は元データ（yagami_all_records.json）を更新してください。")
    out_lines.append("")
    out_lines.append("export type Section = \"ocean\" | \"pool\";")
    out_lines.append("")
    out_lines.append("export type EventRecord = {")
    out_lines.append("  section: Section;")
    out_lines.append("  event: string;")
    out_lines.append("  category: string;")
    out_lines.append("  gender: string;")
    out_lines.append("  rank: number;")
    out_lines.append("  time: string;")
    out_lines.append("};")
    out_lines.append("")
    out_lines.append("export type YearRecords = {")
    out_lines.append("  year: string;")
    out_lines.append("  records: EventRecord[];")
    out_lines.append("};")
    out_lines.append("")
    out_lines.append("export type AthleteRecords = {")
    out_lines.append("  athlete: string;")
    out_lines.append("  athleteEn: string;")
    out_lines.append("  shortName: string;")
    out_lines.append("  currentCategory: string;")
    out_lines.append("  years: YearRecords[];")
    out_lines.append("};")
    out_lines.append("")
    out_lines.append("export const yagamiRecords: AthleteRecords[] = [")

    # 順序：陽葉 → 結月 → 賢尚 (年齢順)
    for short in ["結月", "陽葉", "賢尚"]:
        meta = YAGAMI_META[short]
        years = data.get(short, {})
        if not years:
            continue
        out_lines.append("  {")
        out_lines.append(f"    athlete: \"{meta['name']}\",")
        out_lines.append(f"    athleteEn: \"{meta['nameEn']}\",")
        out_lines.append(f"    shortName: \"{short}\",")
        out_lines.append(f"    currentCategory: \"{CURRENT_CATEGORY[short]}\",")
        out_lines.append("    years: [")
        # 年度を新しい順に
        for year in sorted(years.keys(), reverse=True):
            recs = years[year]
            # ソート：section→rank順
            recs_sorted = sorted(recs, key=lambda r: (r["section"], r["rank"]))
            out_lines.append(f"      {{ year: \"{year}\", records: [")
            for r in recs_sorted:
                line = (
                    f"        {{ section: \"{r['section']}\", "
                    f"event: \"{r['event']}\", "
                    f"category: \"{r['category']}\", "
                    f"gender: \"{r['gender']}\", "
                    f"rank: {r['rank']}, "
                    f"time: \"{r['time']}\" }},"
                )
                out_lines.append(line)
            out_lines.append("      ] },")
        out_lines.append("    ],")
        out_lines.append("  },")
    out_lines.append("];")
    out_lines.append("")

    # ランキングTOP10（2025年度のみ）— ranking_for_records.jsonから動的生成
    ranking_data = json.load(open(RANKING_JSON, encoding="utf-8"))

    def js_str(s: str) -> str:
        return s.replace("\\", "\\\\").replace("\"", "\\\"")

    out_lines.append("export type RankingRow = {")
    out_lines.append("  rank: number;")
    out_lines.append("  name: string;")
    out_lines.append("  club: string;")
    out_lines.append("  points: number;")
    out_lines.append("  highlight: string;")
    out_lines.append("};")
    out_lines.append("")
    out_lines.append("export type SelfStanding = {")
    out_lines.append("  rank: number;")
    out_lines.append("  points: number;")
    out_lines.append("  events: number;")
    out_lines.append("} | null;")
    out_lines.append("")
    out_lines.append("export type AthleteRankings = {")
    out_lines.append("  shortName: string;")
    out_lines.append("  categoryLabel: string;")
    out_lines.append("  oceanTop: RankingRow[];")
    out_lines.append("  poolTop: RankingRow[];")
    out_lines.append("  totalTop: RankingRow[];")
    out_lines.append("  self: {")
    out_lines.append("    total: SelfStanding;")
    out_lines.append("    ocean: SelfStanding;")
    out_lines.append("    pool: SelfStanding;")
    out_lines.append("  };")
    out_lines.append("};")
    out_lines.append("")
    out_lines.append("export const ranking2025: AthleteRankings[] = [")
    for short in ["結月", "陽葉", "賢尚"]:
        block = ranking_data.get(short)
        if not block:
            continue
        out_lines.append("  {")
        out_lines.append(f"    shortName: \"{short}\",")
        out_lines.append(f"    categoryLabel: \"{js_str(block['categoryLabel'])}\",")
        for field in ["totalTop", "oceanTop", "poolTop"]:
            out_lines.append(f"    {field}: [")
            for row in block[field]:
                out_lines.append(
                    f"      {{ rank: {row['rank']}, name: \"{js_str(row['name'])}\", club: \"{js_str(row['club'])}\", points: {row['points']}, highlight: \"{js_str(row['highlight'])}\" }},"
                )
            out_lines.append("    ],")
        # self
        out_lines.append("    self: {")
        for k in ("total", "ocean", "pool"):
            v = block["self"].get(k)
            if v is None:
                out_lines.append(f"      {k}: null,")
            else:
                out_lines.append(
                    f"      {k}: {{ rank: {v['rank']}, points: {v['points']}, events: {v['events']} }},"
                )
        out_lines.append("    },")
        out_lines.append("  },")
    out_lines.append("];")
    out_lines.append("")

    # ===== 全カテゴリTOP10ランキング =====
    all_rankings = json.load(open(ALL_RANKINGS_JSON, encoding="utf-8"))

    out_lines.append("export type CategoryRanking = {")
    out_lines.append("  key: string;")
    out_lines.append("  label: string;")
    out_lines.append("  totalTop: RankingRow[];")
    out_lines.append("  oceanTop: RankingRow[];")
    out_lines.append("  poolTop: RankingRow[];")
    out_lines.append("};")
    out_lines.append("")
    out_lines.append("export const allRankings: CategoryRanking[] = [")
    # 表示順
    for key in [
        "honsen_male", "honsen_female",
        "u18_male", "u18_female",
        "u15_male", "u15_female",
        "u12_male", "u12_female",
        "u10_male", "u10_female",
        "u8_male", "u8_female",
    ]:
        block = all_rankings.get(key)
        if not block:
            continue
        out_lines.append("  {")
        out_lines.append(f"    key: \"{key}\",")
        out_lines.append(f"    label: \"{js_str(block['label'])}\",")
        for field in ["totalTop", "oceanTop", "poolTop"]:
            out_lines.append(f"    {field}: [")
            for row in block[field]:
                out_lines.append(
                    f"      {{ rank: {row['rank']}, name: \"{js_str(row['name'])}\", club: \"{js_str(row['club'])}\", points: {row['points']}, highlight: \"{js_str(row['highlight'])}\" }},"
                )
            out_lines.append("    ],")
        out_lines.append("  },")
    out_lines.append("];")
    out_lines.append("")

    # ===== ベンチマーク =====
    benchmarks = json.load(open(BENCHMARKS_JSON, encoding="utf-8"))
    out_lines.append("export type BenchmarkRow = {")
    out_lines.append("  rank: string;")
    out_lines.append("  name: string;")
    out_lines.append("  club: string;")
    out_lines.append("  time: string;")
    out_lines.append("};")
    out_lines.append("")
    out_lines.append("export type BenchmarkEvent = {")
    out_lines.append("  event: string;")
    out_lines.append("  rows: BenchmarkRow[];")
    out_lines.append("};")
    out_lines.append("")
    out_lines.append("export type AthleteBenchmark = {")
    out_lines.append("  shortName: string;")
    out_lines.append("  athleteName: string;")
    out_lines.append("  category: string;")
    out_lines.append("  comment: string;")
    out_lines.append("  events: BenchmarkEvent[];")
    out_lines.append("};")
    out_lines.append("")
    out_lines.append("export const benchmarks: AthleteBenchmark[] = [")
    for short in ["賢尚", "陽葉", "結月"]:
        block = benchmarks.get(short)
        if not block:
            continue
        full_name = YAGAMI_META[short]["name"]
        out_lines.append("  {")
        out_lines.append(f"    shortName: \"{short}\",")
        out_lines.append(f"    athleteName: \"{full_name}\",")
        out_lines.append(f"    category: \"{js_str(block['category'])}\",")
        out_lines.append(f"    comment: \"{js_str(block['comment'])}\",")
        out_lines.append("    events: [")
        for ev in block["events"]:
            out_lines.append(f"      {{ event: \"{js_str(ev['event'])}\", rows: [")
            for row in ev["rows"]:
                out_lines.append(
                    f"        {{ rank: \"{js_str(row['rank'])}\", name: \"{js_str(row['name'])}\", club: \"{js_str(row['club'])}\", time: \"{js_str(row['time'])}\" }},"
                )
            out_lines.append("      ] },")
        out_lines.append("    ],")
        out_lines.append("  },")
    out_lines.append("];")
    out_lines.append("")

    OUT.write_text("\n".join(out_lines), encoding="utf-8")
    print(f"[done] wrote {OUT}")


if __name__ == "__main__":
    main()
