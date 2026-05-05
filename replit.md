# Workspace Overview

## Projects

### 1. Website Cường Thống Gió (`/cuong-thong-gio`)
Website e-commerce/giới thiệu doanh nghiệp cho **Công Ty TNHH MTV Cường Thống Gió**.

**Tech stack:**
- React 19 + TypeScript
- Vite 8 (port 5000)
- Tailwind CSS v4 (via @tailwindcss/vite)
- React Router DOM v7
- Lucide React (icons)
- Plus Jakarta Sans + Inter (Google Fonts)

**Trang:**
- `/` — Trang chủ: Hero, Stats, Features, Sản phẩm nổi bật, CTA, Testimonials
- `/san-pham` — Danh mục sản phẩm với filter theo category và search
- `/gioi-thieu` — Giới thiệu công ty, lịch sử, đội ngũ
- `/lien-he` — Form báo giá, thông tin liên hệ

**Chạy:** `cd cuong-thong-gio && pnpm dev`

### 2. Gemini CLI Persistence Scripts
Scripts lưu và khôi phục credentials Gemini CLI (tránh mất khi restart):
- `gemini-save.sh` — Lưu credentials vào `.gemini_backup/`
- `gemini-restore.sh` — Khôi phục credentials
- `gemini-login.sh` — Hướng dẫn đăng nhập lần đầu
- `.profile` — Tự động khôi phục mỗi khi mở shell

### 3. cc-nim
Thư mục dự án cũ (giữ nguyên).
