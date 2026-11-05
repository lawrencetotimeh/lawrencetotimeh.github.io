#!/usr/bin/env python3
"""Download current state legislators from Open States (data.openstates.org)
and write one small JSON per state to publicservants/data/leg-XX.json.
Runs weekly from .github/workflows/legislators.yml. No party labels are kept."""
import csv, io, json, os, re, sys, urllib.request, datetime
STATES = "al ak az ar ca co ct de fl ga hi id il in ia ks ky la me md ma mi mn ms mo mt ne nv nh nj nm ny nc nd oh ok or pa ri sc sd tn tx ut vt va wa wv wi wy".split()
OUT = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "publicservants", "data")
os.makedirs(OUT, exist_ok=True)
def key(d):
    d = str(d or "").lower().replace("district", " ")
    d = re.sub(r"[^a-z0-9]+", " ", d).strip()
    return " ".join(str(int(w)) if w.isdigit() else w for w in d.split())
def phone(s):
    s = (s or "").split(";")[0].strip()
    return s
ok = 0; fails = []
for st in STATES:
    url = f"https://data.openstates.org/people/current/{st}.csv"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "lawrencetotimeh.com public servants updater"})
        txt = urllib.request.urlopen(req, timeout=60).read().decode("utf-8-sig")
    except Exception as e:
        fails.append(f"{st}: {e}"); continue
    data = {"upper": {}, "lower": {}}
    n = 0
    for r in csv.DictReader(io.StringIO(txt)):
        ch = (r.get("current_chamber") or "").strip().lower()
        ch = "upper" if ch in ("upper", "legislature") else "lower" if ch == "lower" else None
        if not ch or not r.get("name"): continue
        data[ch].setdefault(key(r.get("current_district")), []).append({
            "n": r["name"].strip(),
            "p": phone(r.get("capitol_voice")) or phone(r.get("district_voice")),
            "e": (r.get("email") or "").split(";")[0].strip(),
            "d": (r.get("current_district") or "").strip(),
        })
        n += 1
    if n < 20:
        fails.append(f"{st}: only {n} rows"); continue
    data["updated"] = datetime.date.today().isoformat()
    data["source"] = "Open States, openstates.org"
    with open(os.path.join(OUT, f"leg-{st.upper()}.json"), "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, separators=(",", ":"))
    ok += 1
print(f"wrote {ok} states"); print("\n".join(fails))
if ok < 40: sys.exit("too many failures, not committing")
