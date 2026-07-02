#!/usr/bin/env bash
set -e

echo "🚀 Setting up Codex Proxy Pool..."

# Check if node exists
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Install it first."
    exit 1
fi

# Install deps if not present
if [ ! -d "node_modules" ]; then
    echo "📤 Installing dependencies..."
    npm install
fi

echo ""
echo "✅ Setup done!"
echo ""
echo "📝 Next steps:"
echo "   1. cp .env.example .env"
echo "   2. Edit .env → paste your keys into V0_API_KEY_POOL"
echo "   3. node proxy.js"
echo ""
echo "🔑 Then configure Codex CLI to use:"
echo "   export OPENAI_BASE_URL=http://localhost:3456"
echo "   export OPENAI_API_KEY=dummy (any value)"
echo ""
