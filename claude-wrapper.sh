#!/bin/bash
# Script tự động khởi động proxy và chạy Claude Code

export UV_PYTHON_DOWNLOADS=true
export UV_PYTHON_PREFERENCE=managed
export UV_PROJECT_ENVIRONMENT=/home/runner/workspace/cc-nim/.venv
PROXY_URL="http://localhost:3001"
CODEX_PROXY_PORT=3456

# Kiểm tra xem codex-proxy có đang chạy không
if ! curl -s "http://localhost:$CODEX_PROXY_PORT" > /dev/null 2>&1; then
    echo "Đang khởi động Codex Proxy Pool (v0.dev)..."
    cd /home/runner/workspace/codex-proxy
    nohup node proxy.js >> /home/runner/workspace/codex-proxy.log 2>&1 &
    sleep 2
fi

# Kiểm tra xem proxy có đang chạy không
if ! curl -s "$PROXY_URL/health" > /dev/null; then
    echo "Đang khởi động proxy NVIDIA NIM (cc-nim)..."
    cd /home/runner/workspace/cc-nim
    # Xóa log cũ
    > /home/runner/workspace/proxy.log
    
    # Khởi động proxy với đầy đủ biến môi trường
    nohup uv run --python 3.11 uvicorn server:app --host 0.0.0.0 --port 3001 --log-level info >> /home/runner/workspace/proxy.log 2>&1 &
    
    # Chờ proxy khởi động (tối đa 15s)
    for i in {1..15}; do
        if curl -s "$PROXY_URL/health" > /dev/null; then
            echo "Proxy đã sẵn sàng."
            break
        fi
        sleep 1
    done
fi

# Chạy lệnh claude với các biến môi trường cần thiết
# Thử cả hai biến môi trường phổ biến
export ANTHROPIC_AUTH_TOKEN="freecc"
export ANTHROPIC_API_KEY="freecc"
export ANTHROPIC_MODEL="opus-4.8"
export ANTHROPIC_BASE_URL="$PROXY_URL"
export CLAUDE_CONFIG_DIR="/home/runner/workspace/.config/claude"

# Chuyển hướng đến lệnh claude gốc
CLAUDE_BIN="/home/runner/workspace/.config/npm/node_global/bin/claude"
exec "$CLAUDE_BIN" "$@"
