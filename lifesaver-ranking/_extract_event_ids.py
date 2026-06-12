"""
JLA各大会ページから Liveheats event ID と PDF URL を抽出する。
出力：events_index.json
"""
import json
import re
import urllib.request
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent

# 集めるべき大会ページ（矢上家3人の活動範囲）
EVENT_PAGES = [
    # ジュニアビーチ／ジュニア
    ("alljpn-jr-beach-2021", "ジュニア", 2021),
    ("alljpn-jr-beach-2022", "ジュニア", 2022),
    ("alljpn-jr-beach-2023", "ジュニア", 2023),
    ("alljpn-jr-beach-2024", "ジュニア", 2024),
    ("alljpn-jr-beach-2025", "ジュニア", 2025),
    ("alljpn-jr-2024", "ジュニア統合", 2024),
    ("alljpn-jr-2025", "ジュニア統合", 2025),
    ("alljpn-jr-surf-2021", "ジュニアサーフ", 2021),
    ("alljpn-jr-surf-2022", "ジュニアサーフ", 2022),
    ("alljpn-jr-surf-2023", "ジュニアサーフ", 2023),
    # プール（ジュニア／JYM）
    ("alljpn-jr-pool-2020", "プール", 2020),
    ("alljpn-jr-pool-2021", "プール", 2021),
    ("alljpn-jr-pool-2022", "プール", 2022),
    ("alljpn-jr-pool-2023", "プール", 2023),
    ("alljpn-jr-pool-2024", "プール", 2024),
    ("alljpn-jr-pool-2025", "プール", 2025),
]

results = []
for slug, kind, year in EVENT_PAGES:
    url = f"https://ls.jla-lifesaving.or.jp/lifesaving-sports/event-schedule/{slug}/"
    try:
        with urllib.request.urlopen(url, timeout=20) as r:
            html = r.read().decode("utf-8", errors="replace")
    except Exception as e:
        print(f"[skip] {slug}: {e}")
        continue
    # Liveheats URL
    lh_ids = list(set(re.findall(r"liveheats\.[a-z]+/events/(\d+)", html)))
    # 結果PDF URL
    pdfs = list(set(re.findall(r'https://ls\.jla-lifesaving\.or\.jp/wp-content/uploads/[^"\']+\.pdf', html)))
    results.append({
        "slug": slug, "kind": kind, "year": year, "url": url,
        "liveheats_event_ids": lh_ids,
        "pdfs": pdfs,
    })
    print(f"[ok] {slug}  liveheats={lh_ids}  pdfs={len(pdfs)}")

(out := SCRIPT_DIR / "events_index.json").write_text(
    json.dumps(results, ensure_ascii=False, indent=2), encoding="utf-8"
)
print(f"[done] wrote {out}")
