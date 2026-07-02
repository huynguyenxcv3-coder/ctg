const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require('dotenv').config();

// Prefer Replit secret over .env
if (process.env.V0_API_KEY_POOL) {
  // Already loaded from Replit secret
} else if (require('fs').existsSync('.env')) {
  require('dotenv').config();
}

const app = express();
const PORT = process.env.PROXY_PORT || 3456;

// Parse key pool from env: comma-separated list
const KEY_POOL = (process.env.V0_API_KEY_POOL || '').split(',').map(k => k.trim()).filter(Boolean);

if (KEY_POOL.length === 0) {
  console.error('❌ No keys in V0_API_KEY_POOL');
  process.exit(1);
}

let currentKeyIndex = 0;

function getNextKey() {
  const key = KEY_POOL[currentKeyIndex];
  currentKeyIndex = (currentKeyIndex + 1) % KEY_POOL.length;
  return key;
}

// Request counter per key
const keyUsage = {};
KEY_POOL.forEach(k => keyUsage[k] = 0);

function getLeastUsedKey() {
  let minKey = KEY_POOL[0];
  let minCount = Infinity;
  for (const k of KEY_POOL) {
    if (keyUsage[k] < minCount) {
      minCount = keyUsage[k];
      minKey = k;
    }
  }
  keyUsage[minKey]++;
  return minKey;
}

app.use(require('morgan')('tiny'));

app.use((req, res, next) => {
  req.startTime = Date.now();
  next();
});

const proxyTarget = process.env.V0_BASE_URL || 'https://api.v0.dev';

const proxy = createProxyMiddleware({
  target: proxyTarget,
  changeOrigin: true,
  secure: true,
  ws: false,
  onProxyReq: (proxyReq, req, res) => {
    // Remove any existing auth header
    proxyReq.removeHeader('authorization');
    // Set new key
    const key = getLeastUsedKey();
    proxyReq.setHeader('Authorization', `Bearer ${key}`);
    console.log(`🔑 [${req.method}] ${req.path} → key #${KEY_POOL.indexOf(key) + 1} (usage: ${keyUsage[key]})`);
  },
  onProxyRes: (proxyRes, req, res) => {
    const elapsed = Date.now() - req.startTime;
    const status = proxyRes.statusCode;
    console.log(`⬅️  ${status} in ${elapsed}ms`);
    // If rate limited, try next key
    if (status === 429) {
      console.log('⚠️ Rate limited! Next request will use different key');
    }
  },
  onError: (err, req, res) => {
    console.error('❌ Proxy error:', err.message);
    res.status(502).json({ error: 'Proxy error', message: err.message });
  },
});

app.use('/', proxy);

app.listen(PORT, () => {
  console.log(`🚀 Codex Proxy Pool running on http://localhost:${PORT}`);
  console.log(`🔑 Loaded ${KEY_POOL.length} keys`);
  console.log(`🎯 Target: ${proxyTarget}`);
});
