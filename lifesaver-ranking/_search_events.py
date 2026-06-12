import urllib.request, json, sys

term = sys.argv[1] if len(sys.argv) > 1 else "プール"
q = json.dumps({"query": '{ eventsByName(search: "%s", limit: 50) { id name date } }' % term}).encode("utf-8")
req = urllib.request.Request("https://liveheats.com/api/graphql", data=q, headers={"Content-Type":"application/json"})
body = urllib.request.urlopen(req, timeout=30).read().decode("utf-8")
print("RAW:", body[:500], file=sys.stderr)
d = json.loads(body)
evs = d.get("data", {}).get("eventsByName") or []
print(f"count: {len(evs)}", file=sys.stderr)
for e in evs:
    sys.stdout.write(f"{e['id']} | {(e.get('date') or '')[:10]} | {e['name']}\n")
    sys.stdout.flush()
