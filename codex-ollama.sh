#!/bin/bash
# Chạy Codex CLI với Ollama server (Kaggle T4x2 qua Cloudflare tunnel)
# Cập nhật TUNNEL_URL mỗi khi khởi động lại notebook Kaggle

TUNNEL_URL="${OLLAMA_TUNNEL_URL:-https://chicken-utilities-saying-eventually.trycloudflare.com}"
MODEL="${1:-gpt-oss-20b}"
shift 2>/dev/null

PROXY_PORT=11434
PROXY_SCRIPT="/home/runner/workspace/ollama-proxy.py"

# Kill proxy cũ
pkill -f "ollama-proxy.py" 2>/dev/null
sleep 0.3

# Khởi động proxy: localhost:11434 → tunnel
python3 "$PROXY_SCRIPT" "$TUNNEL_URL" "$PROXY_PORT" &
PROXY_PID=$!
sleep 1

echo "🔗 Tunnel : $TUNNEL_URL"
echo "🔌 Proxy  : localhost:$PROXY_PORT → tunnel (pid $PROXY_PID)"
echo "🤖 Model  : $MODEL"
echo ""

export OLLAMA_HOST="http://127.0.0.1:$PROXY_PORT"

/home/runner/workspace/.config/npm/node_global/bin/codex \
    --oss \
    --local-provider ollama \
    --model "$MODEL" \
    "$@"

# Dọn dẹp
kill $PROXY_PID 2>/dev/null
