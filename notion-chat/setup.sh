#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
source .venv/bin/activate
export NOTIONCHAT_HOME="$(pwd)"

echo "=== NotionChat Setup ==="
echo ""
echo "Step 1: Get your Notion cookie"
echo "  1. Open https://notion.so in your browser"
echo "  2. Login if not already"
echo "  3. Open DevTools (F12) → Application → Cookies → https://www.notion.com"
echo "  4. Copy the full cookie string (must include token_v2)"
echo ""
read -p "Paste your Notion cookie here (then press Enter): " COOKIE
echo ""

if [ -z "$COOKIE" ]; then
  echo "ERROR: Cookie is empty. Please try again."
  exit 1
fi

echo "Running notion init ..."
python -m notionchat init --cookie "$COOKIE"

echo ""
echo "=== Setup complete ==="
echo "Start server: ./run.sh"
echo "Test: curl http://localhost:8000/healthz"
