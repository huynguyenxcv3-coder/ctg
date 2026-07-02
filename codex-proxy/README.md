# Codex Proxy Pool

Auto-switch API key cho Codex CLI. Khi 1 key hết quota, tự động dùng key khác.

## Setup

```bash
cd codex-proxy
bash setup.sh
```

## Cấu hình

```bash
cp .env.example .env
# Edit .env → dán key v0.dev vào V0_API_KEY_POOL, cách nhau bằng dấu phẩy
```

## Chạy

```bash
node proxy.js
# hoặc
codex-proxy
```

## Cấu hình Codex CLI

### Cách 1: Env vars (khuyên dùng)

```bash
export OPENAI_BASE_URL=http://localhost:3456
export OPENAI_API_KEY=dummy
```

### Cách 2: Config file

```bash
# ~/.codex/config.json
{
  "apiKey": "dummy",
  "baseUrl": "http://localhost:3456"
}
```

## Chế độ pool

- **Round-robin**: Tự động xoay key mỗi request
- **Least-used**: Ưu tiên key chưa dùng nhiều
- **Auto-fallback**: Nếu 1 key trả về 429, request sau dùng key khác
