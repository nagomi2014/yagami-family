"""
プール大会PDFパーサ
全日本ジュニアユースマスターズライフセービング・プール競技選手権大会2025

PDF1個 = 1種目で、上位を順位順に表示。
1ページに約20名、2ページ目以降にも続く場合あり。
"""

import re
from pathlib import Path

import pdfplumber

# 競技No -> (種目名, カテゴリ, 性別)
# JLA news ページの a タグテキストから手動マッピング（個人種目のみ抜粋）
EVENT_META = {
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
    "26": ("ラインスロー（12.5m）", "U18", "女子"),
    "27": ("ラインスロー（12.5m）", "U18", "男子"),
    "31": ("ラインスロー（10m）", "U15", "女子"),
    "32": ("ラインスロー（10m）", "U15", "男子"),
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


def normalize_name(name: str) -> str:
    """選手名を正規化。括弧内のカナを削除し、空白を統一。"""
    if not name:
        return ""
    # 開き括弧（全角・半角）以降を一律削除（カナ部分丸ごと）
    name = re.split(r"[（(]", name, maxsplit=1)[0]
    # 全角・半角空白を統一して1つに
    name = name.replace("　", " ")
    name = re.sub(r"\s+", " ", name).strip()
    return name


# 順位行のパターン
# 例: "1 4/7 橋本 香蓮 日体大荏原LSC"
# 例（棄権）: "1/2 大塚 万里愛 西浜SLSC"
RANK_LINE = re.compile(
    r"^(?P<rank>\d{1,3})\s+(?P<lane>\d+/\d+)\s+(?P<name>\S+\s+\S+(?:\s+\S+)?)\s+(?P<team>.+?)$"
)


def parse_pdf(pdf_path: Path) -> list[dict]:
    """PDFから順位データを抽出。"""
    rows = []
    seen_ranks = set()

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text() or ""
            lines = text.splitlines()
            for line in lines:
                line = line.strip()
                # 順位行を抽出
                m = RANK_LINE.match(line)
                if not m:
                    continue
                rank_str = m.group("rank")
                try:
                    rank = int(rank_str)
                except ValueError:
                    continue
                if rank in seen_ranks:
                    continue  # 同じ順位の重複読み込みをスキップ

                name = m.group("name").strip()
                team = m.group("team").strip()

                # 名前らしくない（タイムや「Page」等）はフィルタ
                if any(c.isdigit() for c in name.split()[0]):
                    continue
                if "Page" in line or "SEIKO" in line:
                    continue

                # team列に "棄権" や "タイム" が混入する場合は除外
                if "棄権" in team or "失格" in team or "DSQ" in team:
                    continue

                # チーム名を整える（後続のカナ部分を切り捨て）
                # team例："日体大荏原LSC" や "K-AQUA" など
                # たまに "西浜SLSC ﾆｼﾊﾏSLSC 2:20.34" のように1行に結合される可能性あり
                # → 数字（タイム）が出現したら手前で切る
                team = re.sub(r"\s+\d+:\d+\.\d+.*$", "", team)
                # 連続英大文字＋数字以外の特殊が混在しない正規化
                team = team.strip()

                rows.append(
                    {
                        "rank": rank,
                        "name": normalize_name(name),
                        "team": team,
                    }
                )
                seen_ranks.add(rank)
    return rows


if __name__ == "__main__":
    import sys

    p = Path(sys.argv[1])
    rows = parse_pdf(p)
    print(f"file: {p.name}, parsed: {len(rows)}")
    for r in rows[:20]:
        print(f"  {r['rank']:>3} {r['name']:<20} {r['team']}")
