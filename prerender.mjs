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
      'Hồi mới vào nghề tôi hay gặp chủ xưởng chọn quạt theo giá rẻ, lắp xong gió không đủ, máy nóng ran, công nhân kêu ca. Chọn sai tốn kém lắm.',
      'Quạt ly tâm tạo áp suất cao, đẩy gió qua ống dài, hút bụi tốt. Quạt hướng trục thì lưu lượng lớn, phù hợp làm mát trực tiếp.',
      'Công thức đơn giản: Lưu lượng = thể tích xưởng × ACH. Ví dụ xưởng 40x25x6m, ACH 25 cần 150.000 m³/h.',
      'Dùng tiêu chuẩn SMACNA cho ống gió, TCVN 5687 và QCVN 06:2022/BXD cho PCCC.',
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
      'Chi phí thực tế dao động mạnh tùy dự án. Có cái chỉ cần quạt hướng trục đơn giản, có cái phải làm Inox chịu nhiệt thì đắt gấp đôi.',
      'Quạt ly tâm thường 8-85 triệu/cái. Hướng trục rẻ hơn, 5-65 triệu. Ống gió tôn mạ kẽm khoảng 180-350k/m².',
      'Nhà xưởng 1.000m² thường rơi vào 150-500 triệu. Làm PCCC đầy đủ thì đội thêm 30-50%.',
      'Chọn đơn vị có xưởng sản xuất trực tiếp sẽ rẻ hơn trung gian khoảng 15-20%.',
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
      'Tầng hầm bắt buộc phải có hệ thống hút khói chịu nhiệt 300°C trong 120 phút theo QCVN 06:2022/BXD.',
      'ACH ≥ 6 bình thường, ≥ 10 khi cháy. Miệng hút phải đạt vận tốc 1.5 m/s.',
      'Quạt phải có VFD, tự động chạy khi báo cháy, chịu nhiệt đúng chuẩn.',
      'Cường Thông Gió đã làm hơn 350 dự án PCCC tầng hầm, toàn bộ nghiệm thu qua cơ quan PCCC.',
    ]
  },
  {
    id: 'thiet-ke-ong-gio-nha-xuong',
    headline: 'Thiết kế và tính toán kích thước ống gió cho nhà xưởng — Kinh nghiệm thực tế',
    description: 'Hướng dẫn chi tiết cách tính kích thước ống gió, chọn vật liệu và thiết kế hệ thống ống gió nhà xưởng hiệu quả. Kinh nghiệm từ hơn 2000 dự án của Cường Thông Gió.',
    datePublished: '2026-07-06',
    dateModified: '2026-07-06',
    author: 'Phan Trọng Cường',
    keywords: 'thiết kế ống gió, tính kích thước ống gió, ống gió nhà xưởng, tôn mạ kẽm, SMACNA, thông gió công nghiệp, Đà Nẵng',
    contentSummary: [
      'Ống gió quyết định hiệu suất cả hệ thống. Vận tốc hợp lý và giảm trở lực là chìa khóa.',
      'Công thức: Diện tích = Lưu lượng / (Vận tốc × 3600). Ví dụ 15.000 m³/h @ 8m/s cần ống ~Ø800 hoặc 800x650.',
      'Tôn mạ kẽm thông thường, Inox cho môi trường ăn mòn. Tránh lạm dụng ống mềm.',
      'Thực tế: rút ngắn ống giúp giảm công suất quạt và tiết kiệm điện dài hạn.'
    ]
  },
  {
    id: 'bao-tri-he-thong-thong-gio',
    headline: 'Bảo trì hệ thống quạt công nghiệp và thông gió nhà xưởng đúng cách',
    description: 'Hướng dẫn bảo trì định kỳ quạt công nghiệp, ống gió, hệ thống lọc bụi để tăng tuổi thọ và tiết kiệm chi phí. Kinh nghiệm thực tế từ Cường Thông Gió.',
    datePublished: '2026-07-06',
    dateModified: '2026-07-06',
    author: 'Phan Trọng Cường',
    keywords: 'bảo trì quạt công nghiệp, bảo dưỡng hệ thống thông gió, lọc bụi nhà xưởng, vệ sinh ống gió, Đà Nẵng',
    contentSummary: [
      'Bảo trì định kỳ rẻ hơn rất nhiều so với thay motor hay sửa chữa lớn.',
      'Vệ sinh cánh quạt 3 tháng/lần, kiểm tra motor hàng năm, lọc bụi theo chênh áp.',
      'Dấu hiệu cần bảo trì ngay: quạt kêu lạ, gió yếu, motor nóng bất thường.',
      'Xưởng bảo trì định kỳ sau 5 năm quạt vẫn tốt; xưởng không bảo trì thay 4 motor sau 2 năm.'
    ]
  }
];

// ─── FAQ Data ───
const faqData = [
  { question: 'Quạt ly tâm và quạt hướng trục khác nhau thế nào?', answer: 'Quạt ly tâm đẩy gió mạnh qua ống dài, hút bụi tốt. Quạt hướng trục thì gió nhiều, giá rẻ hơn, phù hợp làm mát trực tiếp gắn tường hoặc mái.' },
  { question: 'Làm sao biết cần bao nhiêu quạt cho nhà xưởng?', answer: 'Tính thể tích xưởng nhân với ACH. Ví dụ xưởng 6.000m³ với ACH 25 thì cần 150.000 m³/h, tức khoảng 6 quạt 25.000 m³/h.' },
  { question: 'Quạt công nghiệp có tốn điện không?', answer: 'Chọn đúng loại và đúng công suất thì không tốn. Nhiều trường hợp tốn điện là do chọn dư sức hoặc sai loại (dùng hướng trục cho ống dài chẳng hạn).' },
  { question: 'Chi phí thi công hệ thống thông gió nhà xưởng 1.000 m² khoảng bao nhiêu?', answer: 'Từ 150 triệu cho hệ cơ bản đến 500 triệu cho hệ cao cấp (quạt ly tâm chịu nhiệt, ống gió SMACNA). Giá chưa VAT 8%.' },
  { question: 'QCVN 06:2022/BXD yêu cầu gì về thông gió tầng hầm?', answer: 'ACH ít nhất 6 lần bình thường, 10 lần khi cháy. Quạt phải chịu nhiệt 300°C trong 120 phút. Van chặn lửa FD tự động đóng khi nhiệt độ đạt 72°C.' },
  { question: 'Cường Thông Gió có thi công PCCC tầng hầm không?', answer: 'Có, hơn 350 dự án. Chúng tôi sản xuất quạt chịu nhiệt 300°C/2h và hỗ trợ nghiệm thu PCCC luôn.' },
];

// ─── Page definitions ───
const pages = [
  {
    route: '/',
    title: 'Thông Gió Đà Nẵng | Hệ Thống Quạt Công Nghiệp & Ống Gió | Cường Thông Gió',
    description: 'Thông gió Đà Nẵng chuyên nghiệp: thi công hệ thống quạt công nghiệp, ống gió, lọc bụi cho nhà xưởng tại Đà Nẵng & Miền Trung. 13+ năm kinh nghiệm, sản xuất trực tiếp từ xưởng, giá tối ưu.',
    keywords: 'thông gió đà nãng, hệ thống thông gió đà nãng, quạt công nghiệp đà nãng, ống gió đà nãng, thi công thông gió nhà xưởng đà nãng, Cường Thông Gió',
    dateModified: '2026-07-06',
  },
  {
    route: '/san-pham',
    title: 'Sản Phẩm Thông Gió Đà Nẵng | Quạt Công Nghiệp & Ống Gió | Cường Thông Gió',
    description: 'Sản phẩm thông gió Đà Nẵng: quạt công nghiệp, ống gió Plasma CNC, hệ thống lọc bụi — sản xuất trực tiếp tại xưởng Đà Nẵng. Cường Thông Gió.',
    keywords: 'sản phẩm thông gió đà nãng, quạt công nghiệp đà nãng, ống gió đà nãng, quạt ly tâm đà nãng',
    dateModified: '2026-07-06',
  },
  {
    route: '/gioi-thieu',
    title: 'Giới Thiệu Thông Gió Đà Nẵng | Cường Thông Gió - 13+ Năm Kinh Nghiệm',
    description: 'Cường Thông Gió - Đơn vị chuyên thi công thông gió Đà Nẵng, sản xuất quạt công nghiệp và ống gió. 13+ năm, 2000+ dự án tại Đà Nẵng & Miền Trung.',
    keywords: 'thông gió đà nãng, giới thiệu công ty thông gió đà nãng, Cường Thông Gió Đà Nẵng',
    dateModified: '2026-07-06',
  },
  {
    route: '/lien-he',
    title: 'Liên Hệ Thông Gió Đà Nẵng | Báo Giá Hệ Thống Quạt & Ống Gió',
    description: 'Liên hệ Cường Thông Gió Đà Nẵng để được tư vấn và báo giá miễn phí hệ thống thông gió, quạt công nghiệp. Hotline 0905 001 224.',
    keywords: 'liên hệ thông gió đà nãng, báo giá thông gió đà nãng, Cường Thông Gió',
    dateModified: '2026-07-06',
  },
  {
    route: '/kien-thuc',
    title: 'Kiến Thức Thông Gió Đà Nẵng | Chia Sẻ Kỹ Thuật Quạt & Ống Gió',
    description: 'Kiến thức thông gió Đà Nẵng: cách chọn quạt công nghiệp, thiết kế ống gió, bảo trì hệ thống, tiêu chuẩn PCCC. Chia sẻ thực tế từ kỹ sư Cường Thông Gió.',
    keywords: 'kiến thức thông gió đà nãng, thông gió đà nãng, kỹ thuật quạt công nghiệp đà nãng, bảo trì thông gió',
    dateModified: '2026-07-06',
  },
  {
    route: '/du-an',
    title: 'Cường Thông Gió — Dự Án Thông Gió Đã Thực Hiện',
    description: 'Danh sách các dự án thi công hệ thống thông gió, ống gió, xử lý khí thải đã hoàn thành tại Đà Nẵng và Miền Trung — Cường Thông Gió.',
    keywords: 'dự án thông gió, thi công thông gió Đà Nẵng, hệ thống ống gió, xử lý khí thải, Cường Thông Gió',
    dateModified: '2026-07-03',
  },
  {
    route: '/gia-cong-ong-gio-da-nang',
    title: 'Gia Công Ống Gió Đà Nẵng — Cường Thông Gió | Tiêu Chuẩn SMACNA',
    description: 'Gia công ống gió tôn mạ kẽm, inox 304/201 tại Đà Nẵng. Cắt Plasma CNC, tiêu chuẩn SMACNA. Nhận đơn hàng từ 1 mét. Giao hàng tận công trình. Hotline: 0905 001 224.',
    keywords: 'gia công ống gió Đà Nẵng, ống gió vuông, ống gió tròn xoắn, ống gió tôn mạ kẽm, ống gió inox, SMACNA, VCD van điều tiết, Cường Thông Gió',
    dateModified: '2026-07-03',
  },
  {
    route: '/thong-gio-nha-xuong-da-nang',
    title: 'Thông Gió Nhà Xưởng Đà Nẵng | Thi Công Hệ Thống Quạt & Ống Gió | Cường Thông Gió',
    description: 'Thông gió nhà xưởng Đà Nẵng chuyên nghiệp: giảm nhiệt 5-10°C, lọc bụi khí độc. Thi công quạt công nghiệp, ống gió, cooling pad. Giá từ 150 triệu. Hotline 0905 001 224.',
    keywords: 'thông gió nhà xưởng đà nãng, thông gió đà nãng, thi công thông gió đà nãng, quạt thông gió nhà xưởng đà nãng',
    dateModified: '2026-07-06',
  },
  {
    route: '/thong-gio-cuong-buc-nha-xuong',
    title: 'Thông Gió Cưỡng Bức Nhà Xưởng — Nguyên Lý, Thiết Kế & Thi Công | Cường Thông Gió',
    description: 'Hướng dẫn toàn diện về thông gió cưỡng bức (mechanical ventilation) cho nhà xưởng: nguyên lý hút-đẩy, cách tính ACH, so sánh với thông gió tự nhiên, thiết bị cần thiết và bảng giá thi công 2026. Cường Thông Gió — 13+ năm kinh nghiệm tại Đà Nẵng.',
    keywords: 'thông gió cưỡng bức, thông gió cơ khí, mechanical ventilation, hệ thống hút đẩy, quạt thông gió công nghiệp, ACH, quạt ly tâm, quạt hướng trục, thông gió nhà xưởng, Đà Nẵng, Cường Thông Gió',
    dateModified: '2026-06-28',
  },
  {
    route: '/hut-khoi-nha-xuong-da-nang',
    title: 'Hút Khói Nhà Xưởng & Bếp Công Nghiệp Đà Nẵng — Cường Thông Gió',
    description: 'Thi công hệ thống hút khói nhà xưởng, bếp công nghiệp, tầng hầm PCCC tại Đà Nẵng. Máng hút khói inox, quạt chịu nhiệt, Jet Fan. Đạt QCVN 06. Hotline: 0905 001 224.',
    keywords: 'hút khói nhà xưởng Đà Nẵng, hút khói bếp công nghiệp, PCCC tầng hầm, Jet Fan, quạt chịu nhiệt, QCVN 06, Cường Thông Gió',
    dateModified: '2026-07-03',
  },
  {
    route: '/quat-ly-tam-cong-nghiep',
    title: 'Quạt Ly Tâm Công Nghiệp — Cường Thông Gió | Sản Xuất Tại Đà Nẵng',
    description: 'Quạt ly tâm công nghiệp 1.5kW-200kW: áp cao, áp trung, áp thấp, hút bụi, inox 304. Sản xuất trực tiếp tại Đà Nẵng. Cân bằng động kỹ thuật số. Hotline: 0905 001 224.',
    keywords: 'quạt ly tâm công nghiệp, quạt ly tâm áp cao, quạt ly tâm hút bụi, quạt ly tâm inox 304, quạt ly tâm Đà Nẵng, centrifugal fan, Cường Thông Gió',
    dateModified: '2026-07-03',
  },
  {
    route: '/xu-ly-bui-cong-nghiep',
    title: 'Xử Lý Bụi Công Nghiệp Đà Nẵng — Cường Thông Gió | Đạt Chuẩn QCVN',
    description: 'Hệ thống xử lý bụi công nghiệp tại Đà Nẵng: lọc bụi túi vải baghouse, cyclone, wet scrubber, ESP. Xử lý bụi gỗ, kim loại, dệt may. Đạt QCVN 19. Hotline: 0905 001 224.',
    keywords: 'xử lý bụi công nghiệp Đà Nẵng, hệ thống hút bụi, túi lọc bụi baghouse, cyclone, wet scrubber, ESP, QCVN 19, hút bụi gỗ, Cường Thông Gió',
    dateModified: '2026-07-03',
  },
  {
    route: '/cong-cu',
    title: 'Cường Thông Gió — Công Cụ Tính Toán HVAC Online',
    description: 'Bộ công cụ tính toán HVAC online miễn phí: tính lưu lượng gió (ACH), tính tiết diện ống gió, tính công suất quạt. Chính xác theo tiêu chuẩn SMACNA & TCVN.',
    keywords: 'tính lưu lượng gió, tính tiết diện ống gió, tính công suất quạt, công cụ HVAC, ACH calculator, Cường Thông Gió',
    dateModified: '2026-07-03',
  },
  {
    route: '/cong-cu/tinh-luu-luong-gio',
    title: 'Tính Lưu Lượng Gió Nhà Xưởng (ACH) — Cường Thông Gió',
    description: 'Công cụ tính lưu lượng gió online miễn phí theo phương pháp ACH. Nhập diện tích, chiều cao nhà xưởng → ra lưu lượng gió cần thiết và số quạt cần dùng.',
    keywords: 'tính lưu lượng gió, ACH calculator, tính gió nhà xưởng, lưu lượng gió m3/h, Cường Thông Gió',
    dateModified: '2026-07-03',
  },
  {
    route: '/cong-cu/tinh-tiet-dien-ong-gio',
    title: 'Tính Tiết Diện Ống Gió — Cường Thông Gió',
    description: 'Công cụ tính tiết diện ống gió online. Nhập lưu lượng gió và tốc độ gió → ra kích thước ống gió vuông và tròn phù hợp.',
    keywords: 'tính tiết diện ống gió, kích thước ống gió, ống gió vuông, ống gió tròn, Cường Thông Gió',
    dateModified: '2026-07-03',
  },
  {
    route: '/cong-cu/tinh-cong-suat-quat',
    title: 'Tính Công Suất Quạt Thông Gió — Cường Thông Gió',
    description: 'Công cụ tính công suất motor quạt thông gió online. Nhập lưu lượng gió và cột áp → ra công suất quạt (kW) cần thiết.',
    keywords: 'tính công suất quạt, motor quạt thông gió, kW quạt, Cường Thông Gió',
    dateModified: '2026-07-03',
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

function makeOrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness", "HVACBusiness"],
    "name": "Cường Thông Gió",
    "alternateName": ["Công ty TNHH MTV Cường Thông Gió", "Cuong Thong Gio", "CTG Co., Ltd"],
    "url": BASE_URL,
    "logo": `${BASE_URL}/logo.png`,
    "image": `${BASE_URL}/logo.png`,
    "telephone": "+84-905-001-224",
    "email": "phantrongcuong77@gmail.com",
    "description": "Chuyên sản xuất quạt công nghiệp, gia công ống gió, thi công hệ thống thông gió, xử lý khí thải & bụi tại Đà Nẵng và Miền Trung. 13+ năm kinh nghiệm, 2145+ dự án.",
    "foundingDate": "2015",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "101 Trần Quý Khoách, P. Hòa Khánh",
      "addressLocality": "Đà Nẵng",
      "addressRegion": "Đà Nẵng",
      "postalCode": "550000",
      "addressCountry": "VN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "16.0773",
      "longitude": "108.1595"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
      "opens": "08:00",
      "closes": "17:00"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "127",
      "bestRating": "5"
    },
    "priceRange": "$$",
    "areaServed": ["Đà Nẵng", "Miền Trung", "Việt Nam"],
    "sameAs": [
      "https://www.facebook.com/cuongthonggio",
      "https://zalo.me/0905001224",
      "https://www.google.com/maps/place/?q=place_id:ChIJAQDvmduYQjERvtE7J7awz68"
    ]
  };
  return `<script type="application/ld+json" data-ssg="true">${JSON.stringify(schema)}</script>`;
}

function makeWebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Cường Thông Gió",
    "url": BASE_URL,
    "inLanguage": "vi",
    "publisher": {
      "@type": "Organization",
      "name": "Cường Thông Gió",
      "url": BASE_URL
    }
  };
  return `<script type="application/ld+json" data-ssg="true">${JSON.stringify(schema)}</script>`;
}

function makeWebPageJsonLd(page) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": page.title,
    "description": page.description,
    "url": `${BASE_URL}${page.route}`,
    "inLanguage": "vi",
    "dateModified": page.dateModified,
    "isPartOf": {
      "@type": "WebSite",
      "name": "Cường Thông Gió",
      "url": BASE_URL
    },
    "about": {
      "@type": "Organization",
      "name": "Cường Thông Gió",
      "url": BASE_URL
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", "[data-speakable]", ".answer-block", "article > p:first-of-type"]
    }
  };
  return `<script type="application/ld+json" data-ssg="true">${JSON.stringify(schema)}</script>`;
}

function generatePageSummaryHtml(page) {
  return `
      <section data-ssg-content="true" itemscope itemtype="https://schema.org/WebPage">
        <h1 itemprop="name">${escapeHtml(page.title)}</h1>
        <p itemprop="description">${escapeHtml(page.description)}</p>
        <p><strong>Cường Thông Gió</strong> sản xuất quạt công nghiệp, gia công ống gió, thi công thông gió nhà xưởng, hút khói, xử lý bụi và xử lý khí thải tại Đà Nẵng, Miền Trung.</p>
        <p>Hotline/Zalo: <a href="tel:0905001224">0905 001 224</a> — Email: <a href="mailto:phantrongcuong77@gmail.com">phantrongcuong77@gmail.com</a></p>
        <p>Địa chỉ: 101 Trần Quý Khoách, P. Hòa Khánh, TP. Đà Nẵng.</p>
      </section>`;
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

  // 4. Replace existing canonical & hreflang tags (if any from base template) with correct ones for this route
  // Remove any existing canonical and hreflang tags (safety measure)
  result = result.replace(/\s*<link rel="canonical" href="[^"]*" \/>\s*/g, '\n');
  result = result.replace(/\s*<link rel="alternate" hreflang="[^"]*" href="[^"]*" \/>\s*/g, '\n');
  // Handle both old and new comment formats
  result = result.replace(
    /<!-- Canonical & hreflang:.*?-->/s,
    `<!-- Canonical & hreflang: pre-rendered by SSG for ${page.route} -->`
  );
  // Remove the placeholder comment for dynamic injection
  result = result.replace(/\s*<!-- canonical and hreflang tags are injected dynamically per route -->\s*/g, '\n');
  // Insert canonical and hreflang before </head>
  const canonicalBlock = `    ${makeCanonicalTag(fullUrl)}\n    ${makeHreflangTags(fullUrl)}`;
  result = result.replace('</head>', `${canonicalBlock}\n  </head>`);

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

  // 8. Inject route-scoped extra head content (JSON-LD) before </head>
  if (extraHead) {
    const routeScopedHead = extraHead.replace(
      /data-ssg="true"/g,
      `data-ssg="true" data-ssg-route="${escapeHtml(page.route)}"`
    );
    result = result.replace('</head>', `    ${routeScopedHead}\n  </head>`);
  }

  // 9. Inject crawlable content inside <div id="root"> for proper hydration
  // Content is visible initially; React will hydrate over it
  if (extraContent) {
    result = result.replace(
      '<div id="root"></div>',
      `<div id="root">
    <!-- SSG: Pre-rendered content visible to all crawlers -->
    <div id="ssg-content" data-ssg="true">
${extraContent}
    </div>
    </div>`
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

  // Extract products dynamically for pre-rendering
  try {
    const productsContent = readFileSync(resolve(__dirname, 'src/pages/productsDetailData.ts'), 'utf-8');
    const productRegex = /slug:\s*'([^']+)',[\s\S]*?title:\s*'([^']+)'/g;
    let pMatch;
    while ((pMatch = productRegex.exec(productsContent)) !== null) {
      pages.push({
        route: '/san-pham/' + pMatch[1],
        title: pMatch[2] + ' — Cường Thông Gió Đà Nẵng',
        description: pMatch[2] + ' sản xuất và phân phối bởi Cường Thông Gió tại Đà Nẵng. Bảo hành 12-18 tháng. Liên hệ: 0905 001 224.',
        keywords: pMatch[2] + ', quạt công nghiệp Đà Nẵng, ống gió, Cường Thông Gió',
        dateModified: '2026-07-03'
      });
    }
  } catch(e) {
    console.error("Failed to extract product routes", e);
  }

  // 1. Process static and dynamic pages
  for (const page of pages) {
    let extraContent = generatePageSummaryHtml(page);
    let extraHead = [
      makeOrganizationJsonLd(),
      makeWebsiteJsonLd(),
      makeWebPageJsonLd(page),
      makeBreadcrumbJsonLd(page.route === '/'
        ? [{ name: 'Trang chủ', url: `${BASE_URL}/` }]
        : [
            { name: 'Trang chủ', url: `${BASE_URL}/` },
            { name: page.title.replace(/^Cường Thông Gió —\s*/, '').replace(/\s*[|—].*$/, ''), url: `${BASE_URL}${page.route}` }
          ]
      )
    ].join('\n    ');

    if (page.route === '/kien-thuc') {
      extraContent = generateBlogListingHtml();
      extraHead = [
        extraHead,
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
      dateModified: article.dateModified,
    };

    const extraContent = generateArticleHtml(article);
    const extraHead = [
      makeOrganizationJsonLd(),
      makeWebsiteJsonLd(),
      makeWebPageJsonLd(page),
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
  console.log('  • Route-specific semantic HTML content for crawlers\n');
}

main();
