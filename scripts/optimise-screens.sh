#!/usr/bin/env bash
# Make web-sized JPEG copies of full-size screenshots for the flyout.
# Drop PNGs named by reference number (e.g. R-12.png) into assets/screens/ and run:
#   scripts/optimise-screens.sh
# Each R-n.png without a matching R-n.jpg becomes R-n.jpg (900px wide). Existing JPEGs are never
# overwritten, because some have personal data redacted; delete a JPEG first to regenerate it.
# Original PNGs are git-ignored. macOS only (uses sips).
set -euo pipefail
cd "$(dirname "$0")/../assets/screens"
made=0
for png in *.png; do
  jpg="${png%.png}.jpg"
  [[ -f "$jpg" ]] && continue
  sips -s format jpeg -s formatOptions 80 --resampleWidth 900 "$png" --out "$jpg" >/dev/null
  echo "Optimised $png -> $jpg"
  made=$((made + 1))
done
if (( made > 0 )); then
  echo "Check the new JPEGs for personal data (names, emails, phone numbers, account numbers, photos) before committing."
fi
