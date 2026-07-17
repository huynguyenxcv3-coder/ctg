# NotionChat — OpenAI Compatible API for Notion AI

Đã clone từ https://github.com/mughu-id/Notion-AI-to-OpenAI-Compatible

## Cấu trúc

```
notion-chat/
├── .venv/              # Python virtual env (uv)
├── notionchat/         # Source code
├── .env                # Config (API key, port, home path)
├── setup.sh            # Interactive wizard để nhập cookie
├── run.sh              # Khởi động server
└── notion_account.json # Tự động tạo sau init (KHÔNG commit)
```

## Setup (Chỉ làm 1 lần)

```bash
cd ~/workspace/notion-chat
./setup.sh
```

Script sẽ hỏi cookie từ browser. Cách lấy:
1. Vào https://notion.so → login
2. F12 → Application → Cookies → https://www.notion.com
3. Copy toàn bộ cookie string (phải có `token_v2`)

Sau khi nhập cookie, script chạy `notion init` để tạo `notion_account.json`.

## Chạy server

```bash
cd ~/workspace/notion-chat
./run.sh
```

Server chạy trên http://127.0.0.1:8000

## Test

```bash
# Health check
curl http://localhost:8000/healthz

# List models
curl http://localhost:8000/v1/models \
  -H "Authorization: Bearer sk-notionchat"

# Chat completion
curl http://localhost:8000/v1/chat/completions \
  -H "Authorization: Bearer sk-notionchat" \
  -H "Content-Type: application/json" \
  -d '{"model":"opus-4.8","messages":[{"role":"user","content":"Xin chào"}]}'
```

## Kết nối với Cursor / OpenAI client

- **Base URL:** `http://127.0.0.1:8000/v1`
- **API Key:** `sk-notionchat` (hoặc giá trị `NOTIONCHAT_API_KEY` trong `.env`)
- **Models:** lấy từ `/v1/models` (ví dụ: `opus-4.8`, `gpt-4o`, `sonnet-4.6`)

## Lưu ý

- Cookie cần được làm mới khi bị 401/403 (Notion hết hạn session)
- Nếu chạy trên VPS khác IP với browser, có thể cần `NOTION_PROXY`
- `notion_account.json` chứa credentials — **không bao giờ commit**
