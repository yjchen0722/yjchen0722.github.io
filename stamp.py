#!/usr/bin/env python3
"""Stamp the current time into every page's footer.

Run this after editing the site, before publishing:

    python3 stamp.py

It rewrites the `Last updated …` line in each .html file in this folder.
The timestamp is Korea Standard Time, matching where the site is written.
"""

import re
from datetime import datetime, timedelta, timezone
from pathlib import Path

KST = timezone(timedelta(hours=9), "KST")
UPDATED = re.compile(r'(Last updated )[^<]*')
COPYRIGHT = re.compile(r'(©\s*)\d{4}')

def main() -> None:
    now = datetime.now(KST)
    stamp = now.strftime("%Y-%m-%d %H:%M (KST)")
    here = Path(__file__).parent

    for path in sorted(here.rglob("*.html")):
        text = path.read_text()
        text, n = UPDATED.subn(rf"\g<1>{stamp}", text)
        text, c = COPYRIGHT.subn(rf"\g<1>{now.year}", text)
        if n or c:
            path.write_text(text)
        print(f"{path.relative_to(here)}: {n} stamped, {c} copyright")

    print(f"\nLast updated {stamp}")

if __name__ == "__main__":
    main()
