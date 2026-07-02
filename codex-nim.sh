#!/bin/bash
# Script để chạy Codex CLI với IYH Gateway

export OPENAI_API_KEY="iyh_OtGXzOCggfKWzr87qZAy1Jn3LCmxOlPX"

# Mặc định dùng model gpt-5.5-xhigh nếu không chỉ định
MODEL=${1:-"gpt-5.5-xhigh"}
shift

if [ "$MODEL" == "pro" ]; then
    MODEL="gpt-5.5-xhigh"
elif [ "$MODEL" == "fast" ]; then
    MODEL="gpt-5.3-codex-high"
fi

echo "Đang chạy Codex với model: $MODEL"
# Sử dụng cấu hình từ ~/.codex/config.toml
codex --model "$MODEL" "$@"
