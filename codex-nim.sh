#!/bin/bash
# Script để chạy Codex CLI với NVIDIA NIM

export NVIDIA_API_KEY="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"

# Mặc định dùng model gpt-oss-120b nếu không chỉ định
MODEL=${1:-"gpt-oss-120b"}
shift

if [ "$MODEL" == "pro" ]; then
    MODEL="gpt-oss-120b"
elif [ "$MODEL" == "fast" ]; then
    MODEL="gpt-oss-20b"
fi

echo "Đang chạy Codex với model: $MODEL"
/home/runner/workspace/.config/npm/node_global/bin/codex --provider nvidia --model "$MODEL" "$@"
