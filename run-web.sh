#!/bin/bash
# Start backend server in background
node server/index.js &

# Start frontend development server
cd cuong-thong-gio && pnpm dev
