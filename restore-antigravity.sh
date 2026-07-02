#!/usr/bin/env bash
# Auto-install Antigravity CLI

echo "🔄 Checking Antigravity CLI..."

if command -v agy &> /dev/null; then
    echo "✅ Antigravity already installed: $(agy --version 2>&1 | head -1)"
    exit 0
fi

echo "⏳ Installing..."
curl -fsSL https://antigravity.google/cli/install.sh | bash

echo "✅ Done! agy is ready."
