/**
 * prerender.mjs — Static Site Generation (SSG) for cuongthonggio.com
 *
 * Generates static HTML files for each route at build time by injecting
 * article content, meta tags, and JSON-LD directly into the HTML.
 * No browser required — pure Node.js approach.
 *
 * For blog/article pages, it reads the article data from the source,
 * generates full semantic HTML, and writes to dist/.
 *
 * Usage:
 *   pnpm build:ssg    → vite build + pre-render
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST_DIR = resolve(__dirname, 'dist');
const BASE_URL = 'https://cuongthonggio.com';

// ─── Read the base index.html template ───
const baseHtml = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8');

// ─── Article Data (mirrored from Blog.tsx) ───
// In a larger project, this would be read from a CMS or shared JSON file.
const articles = [
  {
    id: 'chon-quat-cong-nghiep',
    headline: 'Cách chọn quạt công nghiệp phù hợp cho nhà xưởng — Hướng dẫn từ A đến Z',
    description: 'Chọn sai quạt công nghiệp = tốn điện, ồn ào, thông gió kém và tốn tiền sửa chữa. Hướng dẫn chọn đúng loại quạt, tính đúng lưu lượng gió — đúc kết từ 13+ năm kinh nghiệm và 2.145+ dự án của Cường Thông Gió.',
    datePublished: '2026-06-04',
    dateModified: '2026-06-05',
    author: 'Phan Trọng Cường',
    keywords: 'cách chọn quạt công nghiệp, quạt ly tâm, quạt hướng trục, tính lưu lượng gió, ACH, SMACNA, TCVN 5687, QCVN 06:2022, nhà xưởng, thông gió Đà Nẵng',
    contentSummary: [
      'Hệ thống thông gió là "lá phổi" của nhà xưởng. Một nhà xưởng thông gió tốt giúp giảm nhiệt độ, loại bỏ bụi – khí độc, bảo vệ sức khỏe công nhân và tăng tuổi thọ máy móc.',
      'Quạt ly tâm (Centrifugal): Không khí đi vào theo trục và bị đẩy ra theo phương vuông góc (xoay 90°). Tạo áp suất tĩnh cao, phù hợp khi không khí phải đi qua đường ống dài, bộ lọc bụi hoặc có nhiều trở lực.',
      'Quạt hướng trục (Axial): Không khí đi thẳng theo trục cánh quạt. Tạo lưu lượng gió lớn nhưng áp suất thấp, phù hợp thông gió trực tiếp trên tường/mái.',
      'Công thức tính lưu lượng gió: Lưu lượng gió (m³/h) = Thể tích nhà xưởng (m³) × Số lần thay đổi không khí (ACH).',
      'Ví dụ thực tế: Nhà xưởng cơ khí 40m × 25m × 6m → Thể tích = 6.000 m³ → Chọn ACH = 25 → Lưu lượng cần = 150.000 m³/h → cần 6 quạt 25.000 m³/h.',
      'Tiêu chuẩn SMACNA — tiêu chuẩn quốc tế về thiết kế, chế tạo ống gió. TCVN 5687:2010 — tiêu chuẩn Việt Nam về thông gió. QCVN 06:2022/BXD — quy chuẩn an toàn cháy.',
    ]
  },
  {
    id: 'chi-phi-thi-cong-thong-gio',
    headline: 'Chi phí thi công hệ thống thông gió nhà xưởng năm 2026 — Bảng giá tham khảo',
    description: 'Bảng giá tham khảo chi phí thi công thông gió nhà xưởng 2026: quạt ly tâm, quạt hướng trục, ống gió, lắp đặt. So sánh chi phí theo diện tích nhà xưởng 500m²–5000m².',
    datePublished: '2026-06-04',
    dateModified: '2026-06-04',
    author: 'Phan Trọng Cường',
    keywords: 'chi phí thông gió nhà xưởng, bảng giá thi công thông gió 2026, quạt ly tâm giá, ống gió tôn mạ kẽm, lắp đặt thông gió, Đà Nẵng',
    contentSummary: [
      'Chi phí thi công hệ thống thông gió nhà xưởng dao động từ 150.000 đến 450.000 VNĐ/m² sàn, tùy theo yêu cầu kỹ thuật.',
      'Quạt ly tâm công nghiệp: 8.000.000 – 85.000.000 VNĐ/quạt. Quạt hướng trục: 5.000.000 – 65.000.000 VNĐ/quạt.',
      'Ống gió tôn mạ kẽm: 180.000 – 350.000 VNĐ/m². Van điều tiết VCD: 450.000 – 1.200.000 VNĐ/cái. Van chặn lửa FD: 800.000 – 2.500.000 VNĐ/cái.',
      'Nhà xưởng 1.000 m²: 150 – 500 triệu VNĐ. Nhà xưởng 2.000 m²: 280 – 950 triệu VNĐ. Nhà xưởng 5.000 m²: 650 – 2.200 triệu VNĐ.',
      'Chọn đơn vị thi công có xưởng sản xuất trực tiếp như Cường Thông Gió — giảm 15–20% chi phí so với đơn vị trung gian.',
    ]
  },
  {
    id: 'tieu-chuan-pccc-tang-ham',
    headline: 'Tiêu chuẩn thông gió PCCC tầng hầm theo QCVN 06:2022/BXD — Yêu cầu kỹ thuật',
    description: 'Quy định thông gió PCCC tầng hầm theo QCVN 06:2022/BXD: yêu cầu lưu lượng gió, quạt hút khói, hệ thống thông gió khẩn cấp. Kinh nghiệm Cường Thông Gió với dự án PCCC.',
    datePublished: '2026-06-04',
    dateModified: '2026-06-04',
    author: 'Phan Trọng Cường',
    keywords: 'PCCC tầng hầm, QCVN 06:2022/BXD, quạt hút khói, thông gió PCCC, van chặn lửa FD, tiêu chuẩn phòng cháy, Đà Nẵng',
    contentSummary: [
      'Hệ thống thông gió PCCC tầng hầm là yêu cầu bắt buộc theo QCVN 06:2022/BXD. Quạt hút khói phải chịu nhiệt 300°C liên tục 120 phút.',
      'Lưu lượng hút khói tối thiểu ACH ≥ 6 cho chế độ thường, ACH ≥ 10 khi có cháy. Tốc độ gió tại miệng hút ≥ 1,5 m/s.',
      'Quạt hút khói: công suất 7.5kW–55kW, chịu nhiệt 300°C/2h, có biến tần VFD, tự động khởi động khi báo cháy.',
      'Van chặn lửa FD tự động đóng khi nhiệt độ đạt 72°C theo TCVN 7336:2021.',
      'Cường Thông Gió đã thi công hơn 350 dự án thông gió PCCC tầng hầm tại Đà Nẵng và Miền Trung.',
    ]
  }
];

// ─── FAQ Data ───
const faqData = [
  { question: 'Quạt ly tâm và quạt hướng trục khác nhau thế nào?', answer: 'Quạt ly tâm tạo áp suất cao, phù hợp ống gió dài và hút bụi/khí; quạt hướng trục cho lưu lượng lớn, giá tốt, hợp làm mát nhà xưởng gắn tường/mái.' },
  { question: 'Làm sao biết cần bao nhiêu quạt cho nhà xưởng?', answer: 'Tính thể tích nhà xưởng × ACH (số lần thay đổi không khí/giờ) để ra tổng lưu lượng cần thiết, sau đó chia cho công suất mỗi quạt.' },
  { question: 'Quạt công nghiệp có tốn điện không?', answer: 'Nếu chọn đúng công suất và đúng loại, chi phí điện rất hợp lý. Chọn dư công suất hoặc sai loại mới là nguyên nhân gây tốn điện.' },
  { question: 'Chi phí thi công hệ thống thông gió nhà xưởng 1.000 m² khoảng bao nhiêu?', answer: 'Chi phí dao động từ 150 triệu (cơ bản) đến 500 triệu VNĐ (cao cấp). Giá chưa bao gồm VAT 8%.' },
  { question: 'QCVN 06:2022/BXD yêu cầu gì về thông gió tầng hầm?', answer: 'ACH ≥ 6 (thông gió thường) và ACH ≥ 10 (cháy). Quạt chịu nhiệt 300°C/120 phút. Van FD đóng khi 72°C.' },
  { question: 'Cường Thông Gió có thi công PCCC tầng hầm không?', answer: 'Có. 350+ dự án PCCC tầng hầm tại Đà Nẵng và Miền Trung. Sản xuất quạt chịu nhiệt 300°C/2h.' },
];

// ─── Page definitions ───
const pages = [
  {
    route: '/',
    title: 'Cường Thông Gió — Quạt Công Nghiệp & Hệ Thống Thông Gió Đà Nẵng',
    description: 'Cường Thông Gió — Chuyên sản xuất quạt công nghiệp, gia công ống gió, thi công hệ thống thông gió, xử lý khí thải & bụi tại Đà Nẵng và Miền Trung. 13+ năm kinh nghiệm, 2000+ dự án.',
    keywords: 'quạt công nghiệp, thông gió, ống gió, quạt ly tâm, quạt hướng trục, Đà Nẵng, Cường Thông Gió',
    dateModified: '2026-06-14',
  },
  {
    route: '/san-pham',
    title: 'Cường Thông Gió — Sản Phẩm Quạt Công Nghiệp & Ống Gió',
    description: 'Danh mục sản phẩm quạt công nghiệp, ống gió, quạt ly tâm, quạt hướng trục, hệ thống xử lý khí thải — sản xuất tại Đà Nẵng. Cường Thông Gió.',
    keywords: 'quạt công nghiệp, quạt ly tâm, quạt hướng trục, ống gió, sản phẩm, Cường Thông Gió, Đà Nẵng',
    dateModified: '2026-06-14',
  },
  {
    route: '/gioi-thieu',
    title: 'Cường Thông Gió — Giới Thiệu Công Ty',
    description: 'Công ty TNHH MTV Cường Thông Gió — 13+ năm kinh nghiệm sản xuất quạt công nghiệp và thi công hệ thống thông gió tại Đà Nẵng.',
    keywords: 'Cường Thông Gió, giới thiệu, công ty, quạt công nghiệp, Đà Nẵng',
    dateModified: '2026-06-14',
  },
  {
    route: '/lien-he',
    title: 'Cường Thông Gió — Liên Hệ & Báo Giá',
    description: 'Liên hệ Cường Thông Gió để nhận báo giá miễn phí. Hotline: 0905 001 224. Địa chỉ: 101 Trần Quý Khoách, Đà Nẵng.',
    keywords: 'liên hệ, báo giá, Cường Thông Gió, Đà Nẵng, thông gió',
    dateModified: '2026-06-14',
  },
  {
    route: '/kien-thuc',
    title: 'Cường Thông Gió — Kiến Thức Thông Gió Công Nghiệp',
    description: 'Trung tâm kiến thức thông gió công nghiệp — Hướng dẫn chọn quạt, bảng giá thi công 2026, tiêu chuẩn PCCC tầng hầm. Bài viết chuyên sâu từ kỹ sư Cường Thông Gió.',
    keywords: 'kiến thức thông gió, quạt công nghiệp, chi phí thông gió, PCCC tầng hầm, QCVN 06:2022',
    dateModified: '2026-06-14',
  },
  {
    route: '/du-an',
    title: 'Cường Thông Gió — Dự Án Thông Gió Đã Thực Hiện',
    description: 'Danh sách các dự án thi công hệ thống thông gió, ống gió, xử lý khí thải đã hoàn thành tại Đà Nẵng và Miền Trung — Cường Thông Gió.',
    keywords: 'dự án thông gió, thi công thông gió Đà Nẵng, hệ thống ống gió, xử lý khí thải, Cường Thông Gió',
    dateModified: '2026-06-14',
  },
  {
    route: '/gia-cong-ong-gio-da-nang',
    title: 'Gia Công Ống Gió Đà Nẵng — Cường Thông Gió | Tiêu Chuẩn SMACNA',
    description: 'Gia công ống gió tôn mạ kẽm, inox 304/201 tại Đà Nẵng. Cắt Plasma CNC, tiêu chuẩn SMACNA. Nhận đơn hàng từ 1 mét. Giao hàng tận công trình. Hotline: 0905 001 224.',
    keywords: 'gia công ống gió Đà Nẵng, ống gió vuông, ống gió tròn xoắn, ống gió tôn mạ kẽm, ống gió inox, SMACNA, VCD van điều tiết, Cường Thông Gió',
    dateModified: '2026-06-14',
  },
  {
    route: '/thong-gio-nha-xuong-da-nang',
    title: 'Thông Gió Nhà Xưởng Đà Nẵng — Cường Thông Gió | Giải Pháp Trọn Gói',
    description: 'Thi công hệ thống thông gió nhà xưởng tại Đà Nẵng. Giảm nhiệt 5-10°C, loại bỏ bụi & khí độc. Giải pháp cooling pad, quạt công nghiệp. Chi phí từ 150 triệu. Hotline: 0905 001 224.',
    keywords: 'thông gió nhà xưởng Đà Nẵng, hệ thống thông gió, cooling pad, quạt thông gió nhà xưởng, làm mát nhà xưởng, Cường Thông Gió',
    dateModified: '2026-06-14',
  },
  {
    route: '/hut-khoi-nha-xuong-da-nang',
    title: 'Hút Khói Nhà Xưởng & Bếp Công Nghiệp Đà Nẵng — Cường Thông Gió',
    description: 'Thi công hệ thống hút khói nhà xưởng, bếp công nghiệp, tầng hầm PCCC tại Đà Nẵng. Máng hút khói inox, quạt chịu nhiệt, Jet Fan. Đạt QCVN 06. Hotline: 0905 001 224.',
    keywords: 'hút khói nhà xưởng Đà Nẵng, hút khói bếp công nghiệp, PCCC tầng hầm, Jet Fan, quạt chịu nhiệt, QCVN 06, Cường Thông Gió',
    dateModified: '2026-06-14',
  },
  {
    route: '/quat-ly-tam-cong-nghiep',
    title: 'Quạt Ly Tâm Công Nghiệp — Cường Thông Gió | Sản Xuất Tại Đà Nẵng',
    description: 'Quạt ly tâm công nghiệp 1.5kW-200kW: áp cao, áp trung, áp thấp, hút bụi, inox 304. Sản xuất trực tiếp tại Đà Nẵng. Cân bằng động kỹ thuật số. Hotline: 0905 001 224.',
    keywords: 'quạt ly tâm công nghiệp, quạt ly tâm áp cao, quạt ly tâm hút bụi, quạt ly tâm inox 304, quạt ly tâm Đà Nẵng, centrifugal fan, Cường Thông Gió',
    dateModified: '2026-06-14',
  },
  {
    route: '/xu-ly-bui-cong-nghiep',
    title: 'Xử Lý Bụi Công Nghiệp Đà Nẵng — Cường Thông Gió | Đạt Chuẩn QCVN',
    description: 'Hệ thống xử lý bụi công nghiệp tại Đà Nẵng: lọc bụi túi vải baghouse, cyclone, wet scrubber, ESP. Xử lý bụi gỗ, kim loại, dệt may. Đạt QCVN 19. Hotline: 0905 001 224.',
    keywords: 'xử lý bụi công nghiệp Đà Nẵng, hệ thống hút bụi, túi lọc bụi baghouse, cyclone, wet scrubber, ESP, QCVN 19, hút bụi gỗ, Cường Thông Gió',
    dateModified: '2026-06-14',
  },
  {
    route: '/cong-cu',
    title: 'Cường Thông Gió — Công Cụ Tính Toán HVAC Online',
    description: 'Bộ công cụ tính toán HVAC online miễn phí: tính lưu lượng gió (ACH), tính tiết diện ống gió, tính công suất quạt. Chính xác theo tiêu chuẩn SMACNA & TCVN.',
    keywords: 'tính lưu lượng gió, tính tiết diện ống gió, tính công suất quạt, công cụ HVAC, ACH calculator, Cường Thông Gió',
    dateModified: '2026-06-14',
  },
  {
    route: '/cong-cu/tinh-luu-luong-gio',
    title: 'Tính Lưu Lượng Gió Nhà Xưởng (ACH) — Cường Thông Gió',
    description: 'Công cụ tính lưu lượng gió online miễn phí theo phương pháp ACH. Nhập diện tích, chiều cao nhà xưởng → ra lưu lượng gió cần thiết và số quạt cần dùng.',
    keywords: 'tính lưu lượng gió, ACH calculator, tính gió nhà xưởng, lưu lượng gió m3/h, Cường Thông Gió',
    dateModified: '2026-06-14',
  },
  {
    route: '/cong-cu/tinh-tiet-dien-ong-gio',
    title: 'Tính Tiết Diện Ống Gió — Cường Thông Gió',
    description: 'Công cụ tính tiết diện ống gió online. Nhập lưu lượng gió và tốc độ gió → ra kích thước ống gió vuông và tròn phù hợp.',
    keywords: 'tính tiết diện ống gió, kích thước ống gió, ống gió vuông, ống gió tròn, Cường Thông Gió',
    dateModified: '2026-06-14',
  },
  {
    route: '/cong-cu/tinh-cong-suat-quat',
    title: 'Tính Công Suất Quạt Thông Gió — Cường Thông Gió',
    description: 'Công cụ tính công suất motor quạt thông gió online. Nhập lưu lượng gió và cột áp → ra công suất quạt (kW) cần thiết.',
    keywords: 'tính công suất quạt, motor quạt thông gió, kW quạt, Cường Thông Gió',
    dateModified: '2026-06-14',
  },
];


// ─── Helpers ───
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function makeCanonicalTag(url) {
  return `<link rel="canonical" href="${url}" />`;
}

function makeHreflangTags(url) {
  return `<link rel="alternate" hreflang="vi" href="${url}" />\n    <link rel="alternate" hreflang="x-default" href="${url}" />`;
}

function makeMetaTags(page) {
  const fullUrl = `${BASE_URL}${page.route}`;
  return `
    <!-- SSG: Pre-rendered meta tags for ${page.route} -->
    <title>${escapeHtml(page.title)}</title>
    <meta name="description" content="${escapeHtml(page.description)}" />
    <meta name="keywords" content="${escapeHtml(page.keywords)}" />
    ${makeCanonicalTag(fullUrl)}
    ${makeHreflangTags(fullUrl)}
    <meta property="og:url" content="${fullUrl}" />
    <meta property="og:title" content="${escapeHtml(page.title)}" />
    <meta property="og:description" content="${escapeHtml(page.description)}" />`;
}

function makeArticleJsonLd(article) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.headline,
    "description": article.description,
    "datePublished": article.datePublished,
    "dateModified": article.dateModified,
    "author": { "@type": "Person", "name": article.author, "jobTitle": "Kỹ sư Cơ khí Thông gió" },
    "publisher": { "@type": "Organization", "name": "Cường Thông Gió", "url": BASE_URL },
    "inLanguage": "vi",
    "mainEntityOfPage": `${BASE_URL}/kien-thuc/${article.id}`
  };
  return `<script type="application/ld+json" data-ssg="true">${JSON.stringify(schema)}</script>`;
}

function makeFaqJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(f => ({
      "@type": "Question",
      "name": f.question,
      "acceptedAnswer": { "@type": "Answer", "text": f.answer }
    }))
  };
  return `<script type="application/ld+json" data-ssg="true">${JSON.stringify(schema)}</script>`;
}

function makeBreadcrumbJsonLd(items) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": item.name,
      "item": item.url
    }))
  };
  return `<script type="application/ld+json" data-ssg="true">${JSON.stringify(schema)}</script>`;
}

/**
 * Generate semantic HTML content for an article page.
 * This is injected into the <noscript> section AND also into a hidden
 * div that crawlers can read even with JS enabled.
 */
function generateArticleHtml(article) {
  const paragraphs = article.contentSummary
    .map(p => `        <p>${escapeHtml(p)}</p>`)
    .join('\n');

  return `
      <article itemscope itemtype="https://schema.org/Article" data-ssg-content="true">
        <header>
          <h1 itemprop="headline">${escapeHtml(article.headline)}</h1>
          <p itemprop="description">${escapeHtml(article.description)}</p>
          <div itemprop="author" itemscope itemtype="https://schema.org/Person">
            <span itemprop="name">${escapeHtml(article.author)}</span> —
            <span itemprop="jobTitle">Kỹ sư Cơ khí Thông gió, 13+ năm kinh nghiệm</span>
          </div>
          <time itemprop="datePublished" datetime="${article.datePublished}">${article.datePublished}</time>
          <meta itemprop="dateModified" content="${article.dateModified}" />
        </header>
        <div itemprop="articleBody">
${paragraphs}
        </div>
        <footer>
          <p><strong>Cường Thông Gió</strong> — Hotline/Zalo: <a href="tel:0905001224">0905 001 224</a> — Email: <a href="mailto:phantrongcuong77@gmail.com">phantrongcuong77@gmail.com</a></p>
          <p>Địa chỉ: 101 Trần Quý Khoách, P. Hòa Khánh, TP. Đà Nẵng</p>
        </footer>
      </article>`;
}

/**
 * Generate a listing page for /kien-thuc
 */
function generateBlogListingHtml() {
  const articleLinks = articles
    .map(a => `        <li><a href="/kien-thuc/${a.id}"><strong>${escapeHtml(a.headline)}</strong></a> — ${escapeHtml(a.description)}</li>`)
    .join('\n');

  const faqHtml = faqData
    .map(f => `        <dt><strong>${escapeHtml(f.question)}</strong></dt>\n        <dd>${escapeHtml(f.answer)}</dd>`)
    .join('\n');

  return `
      <section data-ssg-content="true">
        <h1>Kiến thức thông gió công nghiệp — Cường Thông Gió</h1>
        <p>Trung tâm kiến thức thông gió công nghiệp — Hướng dẫn chọn quạt, bảng giá thi công 2026, tiêu chuẩn PCCC tầng hầm. Bài viết chuyên sâu từ kỹ sư Cường Thông Gió.</p>

        <h2>Bài viết</h2>
        <ul>
${articleLinks}
        </ul>

        <h2>Câu hỏi thường gặp</h2>
        <dl>
${faqHtml}
        </dl>
      </section>`;
}

// ─── Process each page ───
function injectSeoIntoHtml(html, page, extraContent = '', extraHead = '') {
  const fullUrl = `${BASE_URL}${page.route}`;
  let result = html;

  // 1. Replace <title> tag
  result = result.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(page.title)}</title>`
  );

  // 2. Replace meta description
  result = result.replace(
    /<meta name="description" content="[^"]*" \/>/,
    `<meta name="description" content="${escapeHtml(page.description)}" />`
  );

  // 3. Replace meta keywords
  result = result.replace(
    /<meta name="keywords" content="[^"]*" \/>/,
    `<meta name="keywords" content="${escapeHtml(page.keywords)}" />`
  );

  // 4. Inject canonical & hreflang after the comment
  result = result.replace(
    /<!-- Canonical & hreflang: managed dynamically by <SEO\/> component per route\.\s*This prevents Google from treating \/san-pham, \/kien-thuc etc\. as duplicates of homepage\.\s*The SEO component sets canonical = https:\/\/cuongthonggio\.com\{pathname\} on every route\. -->/,
    `<!-- Canonical & hreflang: pre-rendered by SSG for ${page.route} -->
    ${makeCanonicalTag(fullUrl)}
    ${makeHreflangTags(fullUrl)}`
  );

  // 5. Update og:url
  result = result.replace(
    /<meta property="og:url" content="[^"]*" \/>/,
    `<meta property="og:url" content="${fullUrl}" />`
  );

  // 6. Update og:title
  result = result.replace(
    /<meta property="og:title" content="[^"]*" \/>/,
    `<meta property="og:title" content="${escapeHtml(page.title)}" />`
  );

  // 7. Update og:description
  result = result.replace(
    /<meta property="og:description" content="[^"]*" \/>/,
    `<meta property="og:description" content="${escapeHtml(page.description)}" />`
  );

  // 7.5 Inject dateModified meta tag for freshness signal
  if (page.dateModified) {
    const modifiedTag = `<meta property="article:modified_time" content="${page.dateModified}" />`;
    result = result.replace('</head>', `    ${modifiedTag}\n  </head>`);
  }

  // 8. Inject extra head content (JSON-LD) before </head>
  if (extraHead) {
    result = result.replace('</head>', `    ${extraHead}\n  </head>`);
  }

  // 9. Inject crawlable content before <div id="root">
  // This content is hidden visually but readable by crawlers
  if (extraContent) {
    result = result.replace(
      '<div id="root"></div>',
      `<!-- SSG: Pre-rendered content for crawlers -->
    <div id="ssg-content" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;" aria-hidden="true">
${extraContent}
    </div>
    <div id="root"></div>`
    );
  }

  // 10. Add SSG marker
  result = result.replace('<!doctype html>', '<!doctype html>\n<!-- Pre-rendered by cuongthonggio.com SSG -->');

  // 11. Inject llms.txt link for AI crawlers
  if (!result.includes('llms.txt')) {
    result = result.replace('</head>', '    <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Information" />\n  </head>');
  }

  return result;
}

// ─── Main ───
function main() {
  console.log('\n🚀 Cường Thông Gió — SSG Pre-renderer (Pure Node.js)');
  console.log('─'.repeat(50));

  if (!existsSync(DIST_DIR)) {
    console.error('❌ dist/ not found. Run `pnpm build` first.');
    process.exit(1);
  }

  let count = 0;

  // 1. Process static pages (/, /san-pham, /gioi-thieu, /lien-he)
  for (const page of pages) {
    let extraContent = '';
    let extraHead = '';

    if (page.route === '/kien-thuc') {
      extraContent = generateBlogListingHtml();
      extraHead = [
        makeBreadcrumbJsonLd([
          { name: 'Trang chủ', url: `${BASE_URL}/` },
          { name: 'Kiến thức', url: `${BASE_URL}/kien-thuc` }
        ]),
        ...articles.map(a => makeArticleJsonLd(a)),
        makeFaqJsonLd()
      ].join('\n    ');
    }

    const html = injectSeoIntoHtml(baseHtml, page, extraContent, extraHead);

    let outputPath;
    if (page.route === '/') {
      outputPath = join(DIST_DIR, 'index.html');
    } else {
      const dir = join(DIST_DIR, page.route.slice(1));
      mkdirSync(dir, { recursive: true });
      outputPath = join(dir, 'index.html');
    }

    writeFileSync(outputPath, html, 'utf-8');
    console.log(`  ✅ ${page.route} → ${outputPath.replace(DIST_DIR, 'dist')}`);
    count++;
  }

  // 2. Process article pages
  for (const article of articles) {
    const route = `/kien-thuc/${article.id}`;
    const page = {
      route,
      title: `Cường Thông Gió — ${article.headline}`,
      description: article.description,
      keywords: article.keywords,
    };

    const extraContent = generateArticleHtml(article);
    const extraHead = [
      makeBreadcrumbJsonLd([
        { name: 'Trang chủ', url: `${BASE_URL}/` },
        { name: 'Kiến thức', url: `${BASE_URL}/kien-thuc` },
        { name: article.headline, url: `${BASE_URL}${route}` }
      ]),
      makeArticleJsonLd(article),
      makeFaqJsonLd()
    ].join('\n    ');

    const html = injectSeoIntoHtml(baseHtml, page, extraContent, extraHead);

    const dir = join(DIST_DIR, 'kien-thuc', article.id);
    mkdirSync(dir, { recursive: true });
    const outputPath = join(dir, 'index.html');

    writeFileSync(outputPath, html, 'utf-8');
    console.log(`  ✅ ${route} → ${outputPath.replace(DIST_DIR, 'dist')}`);
    count++;
  }

  console.log(`\n✨ Done! ${count} pages pre-rendered to dist/`);
  console.log('─'.repeat(50));
  console.log('Each page now has:');
  console.log('  • Correct canonical URL');
  console.log('  • Correct hreflang tags');
  console.log('  • Correct og:url, og:title, og:description');
  console.log('  • JSON-LD structured data (articles, FAQ, breadcrumbs)');
  console.log('  • Hidden semantic HTML content for non-JS crawlers\n');
}

main();
