#!/bin/bash
# Chạy Codex CLI với Ollama server (Kaggle T4x2 qua Cloudflare tunnel)
# Cập nhật TUNNEL_URL mỗi khi khởi động lại notebook Kaggle

TUNNEL_URL="${OLLAMA_TUNNEL_URL:-https://chicken-utilities-saying-eventually.trycloudflare.com}"

MODEL=${1:-"gpt-oss-20b-claude"}
shift 2>/dev/null

if [ "$MODEL" == "fast" ] || [ "$MODEL" == "20b" ]; then
    MODEL="gpt-oss-20b-claude"
fi

echo "🔗 Tunnel: $TUNNEL_URL"
echo "🤖 Model : $MODEL"
echo ""

export OPENAI_BASE_URL="${TUNNEL_URL}/v1"
export OPENAI_API_KEY="ollama"

/home/runner/workspace/.config/npm/node_global/bin/codex --model "$MODEL" "$@"
