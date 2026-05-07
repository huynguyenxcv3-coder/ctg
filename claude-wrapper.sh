#!/bin/bash
# Script tự động khởi động proxy và chạy Claude Code

export UV_PYTHON_DOWNLOADS=true
export UV_PYTHON_PREFERENCE=managed
export UV_PROJECT_ENVIRONMENT=/home/runner/workspace/cc-nim/.venv
PROXY_URL="http://localhost:3001"

# Kiểm tra xem proxy có đang chạy không
if ! curl -s "$PROXY_URL/health" > /dev/null; then
    echo "Đang khởi động proxy NVIDIA NIM (cc-nim)..."
    cd /home/runner/workspace/cc-nim
    # Xóa log cũ
    > /home/runner/workspace/proxy.log
    
    # Khởi động proxy với đầy đủ biến môi trường
    nohup uv run --python 3.13 uvicorn server:app --host 0.0.0.0 --port 3001 --log-level info >> /home/runner/workspace/proxy.log 2>&1 &
    
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
export ANTHROPIC_API_KEY="sk-ant-freecc"
export ANTHROPIC_BASE_URL="$PROXY_URL"

# Chuyển hướng đến lệnh claude gốc
CLAUDE_BIN="/home/runner/workspace/.config/npm/node_global/bin/claude"
exec "$CLAUDE_BIN" "$@"
