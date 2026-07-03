# SEO Bug Report — Cường Thông Gió Website

> Phân tích kỹ thuật SEO — tìm hiểu nguyên nhân ranking tụt thảm hại

---

## 🚀 CẬP NHẬT (03/07/2026): CÁC FIX ĐÃ ĐƯỢC THỰC HIỆN

1. **Pre-render trang sản phẩm (Critical Fix):** Đã cập nhật `prerender.mjs` để tự động đọc `productsDetailData.ts` và pre-render toàn bộ các trang chi tiết sản phẩm `/san-pham/:slug`. Điều này giúp Googlebot lập chỉ mục các sản phẩm dễ dàng hơn thay vì dựa vào Client-Side Rendering.
2. **Đồng nhất NAP (Local SEO Fix):** Sửa lỗi vênh địa chỉ trên hệ thống JSON-LD và HTML. Địa chỉ `"101 Trần Quý Khoách, P. Hòa Khánh"` đã được thống nhất thành `"101 Trần Quý Khoách, P. Hòa Khánh, Q. Liên Chiểu"` trong tất cả schema (`LOCAL_BUSINESS_SCHEMA`, v.v.) và dưới footer html.
3. **Hydration Mismatch Fix:** Thay thế `createRoot` bằng `hydrateRoot` trong `main.tsx` để không làm mất nội dung tĩnh được tạo ra từ SSG.
4. **Vercel 404 Fallback:** Cập nhật `vercel.json` để chuyển hướng các URL không tồn tại trả về lỗi `404` thay vì `200` (ngăn chặn Google index hàng ngàn URL rác, giải quyết tận gốc vấn đề Soft 404).

---


---

## 1. SSR/Prerender bị hổng (Vấn đề nghiêm trọng nhất)

### 1.1 SSG không chạy mặc định
- Script `prerender.mjs` chỉ nằm trong lệnh `build:ssg`, không phải `build`
- Nếu deploy chỉ chạy `npm run build` → không có file HTML tĩnh
- Googlebot chỉ thấy `<div id="root"></div>` trắng tinh → **thin content penalty**

### 1.2 Duplicate meta tags (Hydration mismatch)
- `SEO.tsx` dùng `useEffect` chèn meta tags ở client-side
- Khi SSG chạy: HTML tĩnh đã có meta tags → React chạy lại chèn thêm 1 bộ nữa
- Kết quả: 2 bộ tags trùng nhau trên cùng 1 trang
- Google có thể coi là cloaking hoặc lỗi kỹ thuật nghiêm trọng

### 1.3 Prerender bằng regex dễ lỗi
- `prerender.mjs` dùng regex thay thế chuỗi trong `index.html` (dòng 440-485)
- Cấu trúc HTML thay đổi nhỏ → regex không match → meta tags không được chèn
- Không có validation kiểm tra output SSG

**File liên quan:**
- `prerender.mjs` — logic prerender
- `package.json` — script `build:ssg`
- `src/components/SEO.tsx` — client-side meta injection

---

## 2. Schema Markup Spam (Over-optimization)

### 2.1 Quá nhiều schema trên mọi trang
`SEO.tsx` chèn hàng chục loại schema không phân biệt trang:
- `LocalBusiness`, `Organization`, `Website` — phù hợp
- `Breadcrumb` — phù hợp nếu có breadcrumb thực
- `FAQ`, `Service`, `Review`, `HowTo`, `GeoCircle`, `Person`, `Speakable` — được chèn vào **tất cả** các trang

### 2.2 Review schema không có nội dung thực
- Chèn `Review` schema vào cả trang liên hệ, trang sản phẩm không có review
- Google coi là **Schema Spam** → rich snippets bị gỡ, có thể manual action

### 2.3 HowTo schema không phù hợp
- `HowTo` chèn vào trang không phải hướng dẫn → bị Google bỏ qua hoặc penalty

**File liên quan:**
- `src/components/SEO.tsx` — schema generation logic

---

## 3. Soft 404 — Tất cả URL đều trả 200 OK

### 3.1 Netlify redirect config
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### 3.2 Hậu quả
- Mọi URL sai (404) đều trả mã 200 OK
- Google index hàng ngàn URL rác: `/abc`, `/xyz`, `/test`...
- Làm loãng chất lượng website → **algorithmic quality penalty**
- Không có cơ chế trả về 404 thực sự cho SPA

**File liên quan:**
- `netlify.toml` — redirect config

---

## 4. Giả mạo tín hiệu thời gian (Freshness Signal)

### 4.1 Ngày trong tương lai
- `article:modified_time` để cứng là `2026-06-14` — ngày chưa tới
- Google **cực kỳ dị ứng** việc giả mạo ngày cập nhật

### 4.2 Freshness manipulation
- Thuật toán Google ưu tiên nội dung mới → giả mạo ngày = thao túng thuật toán
- Có thể là nguyên nhân chính khiến ranking tụt đột ngột

**File liên quan:**
- `src/components/SEO.tsx` — `dateModified` prop
- Các trang `*.tsx` — giá trị `dateModified` cứng

---

## 5. Geo-tagging quá đà (Keyword Stuffing địa điểm)

### 5.1 Meta tags địa lý lặp lại
```html
<meta name="geo.region" content="VN-43">
<meta name="geo.position" content="16.0471;108.2068">
<meta name="ICBM" content="16.0471, 108.2068">
```

### 5.2 Schema GeoCircle + LocalBusiness
- Schema địa điểm lặp lại ở cả HTML meta và JSON-LD
- Google coi là cố tình nhồi nhét từ khóa địa lý → keyword stuffing penalty

---

## 6. Core Web Vitals & Performance

### 6.1 LCP (Largest Contentful Paint)
- Ảnh PNG dung lượng lớn chưa chuyển WebP
- Code có tham chiếu `.webp` nhưng file thực tế vẫn là `.png`

### 6.2 TBT (Total Blocking Time)
- Framer Motion + GSAP + Lucide React → bundle JS nặng
- Code-splitting lazy load giúp bundle nhưng chậm hiển thị nội dung chính

### 6.3 CLS (Cumulative Layout Shift)
- Lazy loading images không có placeholder định trước
- Font Google Fonts chưa preload đúng cách

**File liên quan:**
- `public/*.png` — chưa có WebP
- `src/App.tsx` — lazy loading config

---

## 7. Cấu trúc URL & Routing

### 7.1 Slug không nhất quán
- Route `App.tsx`: `/thong-gio-nha-xuong-da-nang`
- Link nội dung có thể dùng slug khác → broken link hoặc redirect loop

### 7.2 Thiếu trailing slash config
- Không có canonical chuẩn hóa trailing slash
- Có thể tạo duplicate content: `/san-pham` vs `/san-pham/`

---

## 8. Tổng kết nguyên nhân ranking tụt

| Thứ tự | Nguyên nhân | Mức độ nghiêm trọng | Loại penalty |
|---------|-------------|-------------------|-------------|
| 1 | Prerender hỏng → trang trắng | 🔴 Cao | Thin content |
| 2 | Schema spam | 🔴 Cao | Manual action / Algorithmic |
| 3 | Ngày giả mạo tương lai | 🔴 Cao | Freshness manipulation |
| 4 | Soft 404 (200 cho mọi URL) | 🔴 Cao | Quality algorithmic |
| 5 | Geo keyword stuffing | 🟡 Trung bình | Keyword stuffing |
| 6 | Duplicate meta tags | 🟡 Trung bình | Technical issue |
| 7 | Core Web Vitals yếu | 🟡 Trung bình | Ranking factor |
| 8 | Ảnh PNG chưa WebP | 🟠 Thấp | LCP impact |

---

## 9. Hướng sửa (nếu cần)

### Ưu tiên cao (fix ngay)
1. **Sửa prerender:** Chạy `prerender.mjs` trong `postbuild` hoặc CI/CD
2. **Xóa ngày tương lai:** Thay `dateModified` bằng ngày build thực hoặc bỏ hoàn toàn
3. **Sửa redirect 404:** Thêm logic trả 404 cho URL không tồn tại trong SPA
4. **Giảm schema spam:** Chỉ giữ schema phù hợp từng loại trang

### Ưu tiên trung bình
5. **Sửa duplicate tags:** Dùng `react-helmet-async` hoặc renderToString đúng cách
6. **Giảm geo meta:** Chỉ giữ 1 bộ địa điểm, bỏ ICBM
7. **Thêm WebP:** Convert ảnh PNG sang WebP với fallback

### Ưu tiên thấp
8. **Tối ưu CWV:** Preload fonts, thêm image placeholders, giảm JS bundle
9. **Canonical chuẩn hóa:** Thêm trailing slash config

---

*Report generated: $(date)*
*Phương pháp: Phân tích static code + config review, không chạy Lighthouse*
