"""
プール大会のベンチマークタイム抽出
1位／3位／5位／8位／16位のタイムを各種目で出力。

対象：
- 賢尚（来年U10）：U10男子のプール種目
- 陽葉（U15）：U15女子のプール種目
- 結月（U18）：U18女子のプール種目
"""

import re
from pathlib import Path
import pdfplumber

SCRIPT_DIR = Path(__file__).resolve().parent

# 対象PDFと種目情報
TARGETS = {
    "賢尚（U10男子）": [
        ("08", "障害物スイム（50m）"),
        ("56", "レスキューチューブトウ（100m）"),
    ],
    "陽葉（U15女子）": [
        ("03", "障害物スイム（100m）"),
        ("33", "マネキンキャリー（50m）"),
        ("42", "マネキンキャリー・ウィズフィン（100m）"),
        ("71", "マネキントウ・ウィズフィン（100m）"),
    ],
    "結月（U18女子）": [
        ("01", "障害物スイム（200m）"),
        ("35", "マネキンキャリー（50m）"),
        ("44", "マネキンキャリー・ウィズフィン（100m）"),
        ("51", "レスキューメドレー（100m）"),
        ("65", "スーパーライフセーバー（200m）"),
        ("73", "マネキントウ・ウィズフィン（100m）"),
    ],
}

TARGET_RANKS = [1, 2, 3, 4, 5, 8, 16]

# 順位行：「1 4/7 橋本 香蓮 日体大荏原LSC」
RANK_LINE = re.compile(r"^(\d{1,3})\s+\d+/\d+\s+(\S+\s+\S+(?:\s+\S+)?)\s+(.+?)$")
# タイム：「2:20.34」「48.97」「1:24.41」
TIME_PAT = re.compile(r"\d+:\d+\.\d+|\d+\.\d+")


def parse_pool(no: str):
    """PDF1個から (rank → {name, team, time}) を作る。"""
    pdf_path = SCRIPT_DIR / "raw_pool" / f"jym-p_2025_result_{no}.pdf"
    out = {}
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            lines = text.splitlines()
            for i, line in enumerate(lines):
                line = line.strip()
                m = RANK_LINE.match(line)
                if not m:
                    continue
                try:
                    rank = int(m.group(1))
                except ValueError:
                    continue
                if rank in out:
                    continue
                name = m.group(2).strip()
                team = m.group(3).strip()
                # チーム末尾にタイムが入っているケースも考慮
                # 例: "西浜SLSC 2:20.34 ( 0.70)"
                team_clean = re.sub(r"\s+\d+:\d+\.\d+.*$", "", team).strip()
                team_clean = re.sub(r"\s+\d+\.\d+.*$", "", team_clean).strip()

                # タイムは次行から拾う（カナ＋所属カナ＋タイム）
                time_str = ""
                # まず当該行末尾にタイムがあるかチェック
                tm = TIME_PAT.findall(line)
                if tm:
                    time_str = tm[-1]
                # 次行も確認
                if not time_str and i + 1 < len(lines):
                    nm = TIME_PAT.findall(lines[i + 1])
                    if nm:
                        time_str = nm[0]
                out[rank] = {"name": name, "team": team_clean, "time": time_str}
    return out


def main():
    print("# プール大会 ベンチマークタイム（1位／3位／5位／8位／16位）")
    print()
    print("対象大会：全日本ジュニアユースマスターズライフセービング・プール競技選手権大会2025")
    print()

    for title, events in TARGETS.items():
        print(f"\n## 🎯 {title}")
        print()
        for no, ev_name in events:
            print(f"### {ev_name}")
            print()
            results = parse_pool(no)
            print("| 順位 | 選手 | 所属 | タイム |")
            print("|---|---|---|---|")
            for rank in TARGET_RANKS:
                if rank in results:
                    r = results[rank]
                    print(f"| {rank}位 | {r['name']} | {r['team']} | **{r['time']}** |")
                else:
                    print(f"| {rank}位 | （データなし） | - | - |")
            print()


if __name__ == "__main__":
    main()
