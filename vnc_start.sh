#!/bin/bash

# Configuration
RESOLUTION="1280x720x24"
VNC_PORT=5901
NOVNC_PORT=6080
DISPLAY_VAL=":1"

# Paths (Found via research)
XVNC_BIN="/nix/store/x5hwjkyng8385q1pqhz8wyqkq0izmhpi-replit-runtime-path/bin/Xvnc"
FLUXBOX_BIN="/nix/store/2rfmy75bkhyd1b6z6p70r2d9r49z72mm-fluxbox-1.3.7/bin/fluxbox"
WEBSOCKIFY_BIN="/nix/store/031kfpijr04xpfkps46n3qhqinapw5bi-python3.11-websockify-0.12.0/bin/websockify"
NOVNC_WEB_PATH="/nix/store/0a18wyirbc3ls9yvlw33lrmql94n2hmc-novnc-1.5.0/share/webapps/novnc"
CHROMIUM_BIN="/nix/store/ia69plrrvn7czdhn3flq1ll39i92ixab-chromium-92.0.4515.159/bin/chromium"

echo "Stopping existing VNC services..."
pkill -9 Xvnc
pkill -9 fluxbox
pkill -9 websockify
pkill -9 chromium

echo "Starting Xvnc on $DISPLAY_VAL..."
$XVNC_BIN $DISPLAY_VAL -geometry 1280x720 -depth 24 -SecurityTypes None -localhost no -noreset &
sleep 2

export DISPLAY=$DISPLAY_VAL

echo "Starting Fluxbox..."
$FLUXBOX_BIN &
sleep 1

echo "Starting websockify on port $NOVNC_PORT..."
$WEBSOCKIFY_BIN --web "$NOVNC_WEB_PATH" $NOVNC_PORT localhost:$VNC_PORT &
sleep 1

echo "Starting Chromium with Google Antigravity..."
$CHROMIUM_BIN --no-sandbox https://googleantigravity.com/ &

echo "===================================================="
echo "VNC Setup Complete!"
echo "Access via Webview on port 6080"
echo "URL: https://${REPL_SLUG}.${REPL_OWNER}.repl.co"
echo "===================================================="
