#!/bin/bash
if [ -d "/home/runner/workspace/.gemini_backup" ] && [ "$(ls -A /home/runner/workspace/.gemini_backup)" ]; then
    mkdir -p ~/.gemini
    cp -r /home/runner/workspace/.gemini_backup/. ~/.gemini/
    echo "Da khoi phuc credentials Gemini tu workspace/.gemini_backup/"
else
    echo "Chua co credentials nao duoc luu. Hay chay gemini-login.sh truoc."
fi
