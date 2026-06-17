#!/bin/bash
mkdir -p /home/runner/workspace/.gemini_backup
cp -r ~/.gemini/. /home/runner/workspace/.gemini_backup/
echo "Da luu credentials Gemini vao workspace/.gemini_backup/"

# Luu Claude & Codex
mkdir -p /home/runner/workspace/.config_backup
[ -d ~/.claude ] && cp -r ~/.claude /home/runner/workspace/.config_backup/
[ -d ~/.codex ] && cp -r ~/.codex /home/runner/workspace/.config_backup/
[ -f ~/.profile ] && cp ~/.profile /home/runner/workspace/.config_backup/.profile_backup
echo "Da luu cau hinh Claude & Codex vao workspace/.config_backup/"
