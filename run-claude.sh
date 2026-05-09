#!/bin/bash
export ANTHROPIC_BASE_URL="http://localhost:8082"
export ANTHROPIC_API_KEY="sk-ant-dummy"
export CLAUDE_CODE_SKIP_AUTH="true"
claude "$@"
