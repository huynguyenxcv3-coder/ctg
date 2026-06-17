#!/bin/bash
if [ -d "/home/runner/workspace/.gemini_backup" ] && [ "$(ls -A /home/runner/workspace/.gemini_backup)" ]; then
    mkdir -p ~/.gemini
    cp -r /home/runner/workspace/.gemini_backup/. ~/.gemini/
    echo "Da khoi phuc credentials Gemini tu workspace/.gemini_backup/"
else
    echo "Chua co credentials Gemini nao duoc luu."
fi

# Khoi phuc Claude & Codex
if [ -d "/home/runner/workspace/.config_backup" ]; then
    [ -d "/home/runner/workspace/.config_backup/.claude" ] && cp -r /home/runner/workspace/.config_backup/.claude ~/
    [ -d "/home/runner/workspace/.config_backup/.codex" ] && cp -r /home/runner/workspace/.config_backup/.codex ~/
    [ -f "/home/runner/workspace/.config_backup/.profile_backup" ] && cat /home/runner/workspace/.config_backup/.profile_backup >> ~/.profile
    echo "Da khoi phuc cau hinh Claude & Codex tu workspace/.config_backup/"
fi
