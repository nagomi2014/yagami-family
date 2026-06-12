"""
yagami_pdf_hits.json で見つかったPDFから、矢上家3人の出場記録を抽出。

各PDFの種類：
- 1種目PDF（result_NN.pdf 系）: PDFヘッダに種目名・カテゴリ。順位表に矢上家がいるか確認
- 統合PDF（2021/2022 個人種目競技結果.pdf）: 1ファイルに複数種目、種目ごとに区切り

戦略：
- PDFを全文テキスト化
- 矢上家の名前がある行を見つけ、直前の「種目情報」も併せて取得
- 行構造から順位・タイムを抽出
"""

import json
import re
from pathlib import Path

import pdfplumber

SCRIPT_DIR = Path(__file__).resolve().parent
CACHE_DIR = SCRIPT_DIR / "cache_pdfs"

YAGAMI = {
    "矢上 賢尚": "賢尚",
    "矢上　賢尚": "賢尚",
    "矢上 陽葉": "陽葉",
    "矢上　陽葉": "陽葉",
    "矢上 結月": "結月",
    "矢上　結月": "結月",
}

# 種目ヘッダのパターン（「競技No. : N 男子/女子 種目名 (UNN/性別) ...」）
EVENT_HEADER_RE = re.compile(
    r"競技No\.?\s*[:：]?\s*(\d+)[^\n]*?(男子|女子|混合)?\s*([^\n]+?)(?:タイム決勝|予選|決勝|FINAL)?",
)

# 種目名キーワード辞書（カテゴリ判定）
CATEGORY_RE = re.compile(r"[ＵU]\s*[1１]\s*[2２5５8８0０]\s*[5５8８2２0０]?|U\d{1,2}|小学生|中学生|高校生|マスターズ|シニア|オープン")

# 順位行：番号 [組/レーン] 氏名 所属 ... タイム
RANK_NUMBER = re.compile(r"^\s*(\d{1,3})\s")
TIME_RE = re.compile(r"(\d+:\d{2}\.\d{2}|\d+\.\d{2})")


def parse_pdf_for_yagami(pdf_path: Path):
    """1つのPDFから、矢上家の出場記録を全て抽出して返す。
    Returns: list of {event_no, event_title, category, gender, name_short, rank, time, raw_line, context}
    """
    findings = []
    try:
        pdf = pdfplumber.open(pdf_path)
    except Exception:
        return findings

    with pdf:
        for page_no, page in enumerate(pdf.pages, start=1):
            text = page.extract_text() or ""
            lines = text.splitlines()

            # 直近のページヘッダ（種目情報）を保持
            current_event = ""
            current_gender = ""
            current_category = ""

            for i, line in enumerate(lines):
                ls = line.strip()

                # 種目ヘッダ更新
                if "競技No" in ls or "種目No" in ls:
                    current_event = ls
                if any(g in ls for g in ["男子", "女子", "混合"]) and ("レース" in ls or "種目" in ls or "メートル" in ls or "m" in ls.lower() or "障害物" in ls or "ビーチ" in ls or "ボード" in ls or "サーフ" in ls or "オーシャン" in ls or "フラッグ" in ls or "スプリント" in ls or "マネキン" in ls or "ライフセーバー" in ls):
                    current_event = ls
                # カテゴリ
                m_cat = CATEGORY_RE.search(ls)
                if m_cat:
                    current_category = m_cat.group(0)
                # 性別
                if "男子" in ls and "女子" not in ls:
                    current_gender = "男子"
                elif "女子" in ls and "男子" not in ls:
                    current_gender = "女子"

                # 矢上家チェック
                for full_name, short in YAGAMI.items():
                    if full_name in ls:
                        # 順位（行頭の数字）
                        rank_match = RANK_NUMBER.match(ls)
                        rank = int(rank_match.group(1)) if rank_match else None

                        # リレー除外：順位なし＋他選手の名前が複数並ぶ行は team行
                        # 「氏名 氏名 氏名」のように人名が3つ以上含まれる
                        other_names = re.findall(r"(?<!矢上 )[一-龥々〆〤]{1,4}\s+[一-龥々〆〤ぁ-んァ-ヶ]{1,4}", ls)
                        if rank is None and len(other_names) >= 2:
                            # team行とみなしてskip
                            continue

                        # タイム検索：当該行＋次行（プール系PDF用）
                        time_str = ""
                        tm = TIME_RE.search(ls)
                        if tm:
                            time_str = tm.group(1)
                        elif i + 1 < len(lines):
                            tm2 = TIME_RE.search(lines[i + 1])
                            if tm2:
                                time_str = tm2.group(1)

                        # 直前の数行をコンテキストとして取得（種目情報補助）
                        context = "\n".join(lines[max(0, i - 6): i]).strip()

                        findings.append({
                            "page": page_no,
                            "name_short": short,
                            "rank": rank,
                            "time": time_str,
                            "raw_line": ls,
                            "context": context[-400:],
                            "event_header": current_event,
                            "gender": current_gender,
                            "category": current_category,
                        })
    return findings


def main():
    hits = json.load(open(SCRIPT_DIR / "yagami_pdf_hits.json", encoding="utf-8"))
    all_records = []
    for hit in hits:
        pdf_path = CACHE_DIR / hit["pdf_name"]
        if not pdf_path.exists():
            continue
        records = parse_pdf_for_yagami(pdf_path)
        for r in records:
            r["year"] = hit["year"]
            r["kind"] = hit["kind"]
            r["pdf"] = hit["pdf_name"]
            all_records.append(r)

    out = SCRIPT_DIR / "yagami_records_raw.json"
    out.write_text(json.dumps(all_records, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"[done] {len(all_records)} records extracted")
    # サマリー
    from collections import Counter
    by_year_name = Counter()
    for r in all_records:
        by_year_name[(r["year"], r["name_short"], r["kind"])] += 1
    for k in sorted(by_year_name):
        print(f"  {k[0]} {k[1]} {k[2]}: {by_year_name[k]}件")


if __name__ == "__main__":
    main()
