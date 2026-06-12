"""
events_index.json の各PDFから矢上3人の名前を grep して、出場種目を特定する。
ダウンロード→テキスト抽出→人名検索を一気にやる。

矢上家：賢尚、陽葉、結月
"""
import json
import re
import urllib.parse
import urllib.request
from pathlib import Path

import pdfplumber

SCRIPT_DIR = Path(__file__).resolve().parent
CACHE_DIR = SCRIPT_DIR / "cache_pdfs"
CACHE_DIR.mkdir(exist_ok=True)

YAGAMI_NAMES = ["賢尚", "陽葉", "結月"]
# resultとkey wordsで絞り込む
RESULT_KEYWORDS = ["result", "成績", "個人種目", "個人結果", "競技結果"]
EXCLUDE_KEYWORDS = ["entry", "entrycheck", "brochure", "stage", "tt", "_01_", "_02_", "_03_",
                    "エントリー", "案内", "代表者", "募集", "会場図", "タイムテーブル", "事前", "経路",
                    "管理", "申込", "登録", "感染", "予防"]


def download(url: str) -> Path | None:
    fname_raw = urllib.parse.unquote(url.rsplit("/", 1)[-1])
    fname = re.sub(r"[^\w\.\-_]", "_", fname_raw)[:200]
    cache = CACHE_DIR / fname
    if cache.exists() and cache.stat().st_size > 1000:
        return cache
    # URL本体を日本語含むなら quote する（pathのみ）
    parsed = urllib.parse.urlsplit(url)
    encoded_path = urllib.parse.quote(parsed.path, safe="/-_.~")
    fixed_url = urllib.parse.urlunsplit(
        (parsed.scheme, parsed.netloc, encoded_path, parsed.query, parsed.fragment)
    )
    try:
        req = urllib.request.Request(fixed_url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as r:
            data = r.read()
        cache.write_bytes(data)
        return cache if cache.stat().st_size > 1000 else None
    except Exception as e:
        print(f"  [skip] {fname_raw}: {e}")
        return None


def extract_text(pdf_path: Path) -> str:
    try:
        with pdfplumber.open(pdf_path) as pdf:
            return "\n".join((p.extract_text() or "") for p in pdf.pages)
    except Exception:
        return ""


def main():
    events = json.load(open(SCRIPT_DIR / "events_index.json", encoding="utf-8"))
    findings = []  # {year, kind, slug, pdf, name, lines: [...]}

    for ev in events:
        year, kind, slug = ev["year"], ev["kind"], ev["slug"]
        # フィルタ：result系のみ
        target_pdfs = []
        for url in ev["pdfs"]:
            fname_low = urllib.parse.unquote(url.rsplit("/", 1)[-1]).lower()
            if any(k in fname_low for k in EXCLUDE_KEYWORDS):
                continue
            if any(k.lower() in fname_low for k in RESULT_KEYWORDS):
                target_pdfs.append(url)

        print(f"=== {year} {slug} ({kind})  candidate PDFs: {len(target_pdfs)} ===")
        for url in target_pdfs:
            pdf = download(url)
            if not pdf:
                continue
            text = extract_text(pdf)
            if not text:
                continue
            hits = []
            for line_no, line in enumerate(text.splitlines()):
                for name in YAGAMI_NAMES:
                    # 「賢尚」「陽葉」「結月」が含まれ、かつ「矢上」が同じ行や周辺にあるか
                    if name in line and "矢上" in line:
                        hits.append({"name": name, "line": line.strip()})
            if hits:
                print(f"  HIT: {pdf.name}  matches={len(hits)}")
                findings.append({
                    "year": year, "kind": kind, "slug": slug,
                    "pdf_url": url, "pdf_name": pdf.name,
                    "hits": hits,
                })

    out = SCRIPT_DIR / "yagami_pdf_hits.json"
    out.write_text(json.dumps(findings, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"\n[done] {len(findings)} PDFs hit")
    print(f"saved to {out}")


if __name__ == "__main__":
    main()
