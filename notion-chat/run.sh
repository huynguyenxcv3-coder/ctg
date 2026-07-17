#!/usr/bin/env bash
set -e
cd "$(dirname "$0")"
source .venv/bin/activate
export NOTIONCHAT_HOME="$(pwd)"
exec python -m notionchat serve "$@"
