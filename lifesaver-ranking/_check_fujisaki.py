"""藤﨑笑佳のU18・U15各種目への出場をチェック。"""
import json, glob
from pathlib import Path

SCRIPT_DIR = Path(__file__).resolve().parent
NAME = "藤﨑"

print("=== U18種目への出場 ===")
for f in sorted((SCRIPT_DIR / "raw_youth").glob("763*.json")):
    d = json.load(open(f, encoding="utf-8"))
    rk = (d.get("data", {}).get("eventDivision") or {}).get("ranking") or []
    for r in rk:
        comp = r.get("competitor") or {}
        name = (comp.get("athlete") or {}).get("name") or ""
        if NAME in name and r.get("place") and r["place"] <= 16:
            print(f"  {f.name}: {r['place']}位 {name}")
