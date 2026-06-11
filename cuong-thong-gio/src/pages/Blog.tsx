import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO, makeBreadcrumbSchema, makeFAQSchema } from '../components/SEO';

/* ─── Exported Types ─── */
export interface ArticleContentBlock {
  type: 'paragraph' | 'heading' | 'table' | 'callout' | 'list' | 'formula';
  text?: string;
  speakable?: boolean;
  headers?: string[];
  rows?: string[][];
  items?: string[];
  level?: 'h2' | 'h3';
}

export interface ArticleData {
  id: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  author: string;
  keywords: string;
  content: ArticleContentBlock[];
}

/* ─── Inline Article Schema Helper ─── */
export const makeArticleSchema = (article: { headline: string; description: string; datePublished: string; dateModified: string; author: string; url: string }) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": article.headline,
  "description": article.description,
  "datePublished": article.datePublished,
  "dateModified": article.dateModified,
  "author": { "@type": "Person", "name": article.author, "jobTitle": "Kỹ sư Cơ khí Thông gió" },
  "publisher": { "@type": "Organization", "name": "Cường Thông Gió", "url": "https://cuongthonggio.com" },
  "inLanguage": "vi",
  "mainEntityOfPage": article.url
});

/* ─── Article Data ─── */
export const articles: ArticleData[] = [
  {
    id: 'chon-quat-cong-nghiep',
    headline: 'Cách chọn quạt công nghiệp phù hợp cho nhà xưởng — Hướng dẫn từ A đến Z',
    description: 'Chọn sai quạt công nghiệp = tốn điện, ồn ào, thông gió kém và tốn tiền sửa chữa. Hướng dẫn chọn đúng loại quạt, tính đúng lưu lượng gió — đúc kết từ 13+ năm kinh nghiệm và 2.145+ dự án của Cường Thông Gió.',
    datePublished: '2026-06-04',
    dateModified: '2026-06-05',
    author: 'Phan Trọng Cường',
    keywords: 'cách chọn quạt công nghiệp, quạt ly tâm, quạt hướng trục, tính lưu lượng gió, ACH, SMACNA, TCVN 5687, QCVN 06:2022, nhà xưởng, thông gió Đà Nẵng, quạt công nghiệp tốn điện',
    content: [
      /* ─── Callout mở đầu ─── */
      {
        type: 'callout' as const,
        speakable: true,
        text: 'Chọn sai quạt công nghiệp = tốn điện, ồn ào, thông gió kém và tốn tiền sửa chữa. Bài viết này hướng dẫn bạn chọn đúng loại quạt, tính đúng lưu lượng gió và tránh các sai lầm phổ biến — đúc kết từ 13+ năm kinh nghiệm và 2.145+ dự án của Cường Thông Gió.'
      },
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Hệ thống thông gió là "lá phổi" của nhà xưởng. Một nhà xưởng thông gió tốt giúp giảm nhiệt độ, loại bỏ bụi – khí độc, bảo vệ sức khỏe công nhân và tăng tuổi thọ máy móc. Và trái tim của hệ thống đó chính là chiếc quạt. Vậy chọn quạt sao cho đúng? Cùng đi từng bước.'
      },
      /* ─── 1. Hai loại quạt ─── */
      {
        type: 'heading' as const,
        level: 'h2',
        text: '1. Hai loại quạt công nghiệp phổ biến nhất'
      },
      {
        type: 'heading' as const,
        level: 'h3',
        text: 'Quạt ly tâm (Centrifugal)'
      },
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Không khí đi vào theo trục và bị đẩy ra theo phương vuông góc (xoay 90°). Loại này tạo áp suất tĩnh cao, phù hợp khi không khí phải đi qua đường ống dài, bộ lọc bụi hoặc có nhiều trở lực.'
      },
      {
        type: 'list' as const,
        items: [
          'Ưu điểm: Áp suất mạnh, hiệu quả với hệ ống gió dài, hút được bụi/khí',
          'Phù hợp: Hệ thống lọc bụi, hút khói bếp công nghiệp, thông gió tầng hầm, ống gió phức tạp'
        ]
      },
      {
        type: 'heading' as const,
        level: 'h3',
        text: 'Quạt hướng trục (Axial)'
      },
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Không khí đi thẳng theo trục cánh quạt. Loại này tạo lưu lượng gió lớn nhưng áp suất thấp, phù hợp thông gió trực tiếp trên tường/mái.'
      },
      {
        type: 'list' as const,
        items: [
          'Ưu điểm: Lưu lượng lớn, giá tốt, lắp đặt đơn giản, tiết kiệm điện',
          'Phù hợp: Thông gió làm mát nhà xưởng, gắn tường/mái, nơi không cần ống gió dài'
        ]
      },
      {
        type: 'table' as const,
        headers: ['Tiêu chí', 'Quạt ly tâm', 'Quạt hướng trục'],
        rows: [
          ['Áp suất tĩnh', 'Cao', 'Thấp'],
          ['Lưu lượng gió', 'Trung bình', 'Rất lớn'],
          ['Dùng với ống gió dài', '✅ Tốt', '❌ Kém'],
          ['Chi phí đầu tư', 'Cao hơn', 'Tốt hơn'],
          ['Ứng dụng điển hình', 'Lọc bụi, hút khói, tầng hầm', 'Làm mát nhà xưởng']
        ]
      },
      /* ─── 2. Yếu tố quyết định ─── */
      {
        type: 'heading' as const,
        level: 'h2',
        text: '2. Các yếu tố quyết định khi chọn quạt'
      },
      {
        type: 'list' as const,
        items: [
          'Diện tích & thể tích nhà xưởng — cơ sở để tính lưu lượng gió cần thiết.',
          'Nhiệt độ & nguồn nhiệt — xưởng có lò nung, máy phát nhiệt cần số lần thay đổi không khí cao hơn.',
          'Loại bụi / khí — bụi gỗ, bụi kim loại, khí hàn, hơi hóa chất đều cần giải pháp riêng (có thể cần lọc bụi trước khi thải).',
          'Áp suất tĩnh (Static Pressure) — ống gió càng dài, càng nhiều co/nối thì trở lực càng lớn → cần quạt áp cao.',
          'Độ ồn cho phép — khu vực gần văn phòng/khu dân cư cần quạt êm hơn.',
          'Điện áp & công suất — 1 pha hay 3 pha, cân đối hiệu suất và chi phí điện.'
        ]
      },
      /* ─── 3. Công thức tính ─── */
      {
        type: 'heading' as const,
        level: 'h2',
        text: '3. Công thức tính lưu lượng gió cần thiết'
      },
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Phương pháp phổ biến nhất là số lần thay đổi không khí/giờ (ACH – Air Changes per Hour):'
      },
      {
        type: 'formula' as const,
        text: 'Lưu lượng gió (m³/h) = Thể tích nhà xưởng (m³) × Số lần thay đổi không khí (ACH). Trong đó: Thể tích = Dài × Rộng × Cao'
      },
      {
        type: 'table' as const,
        headers: ['Loại không gian', 'ACH (lần/giờ)'],
        rows: [
          ['Kho hàng, nhà xưởng thông thường', '10 – 20'],
          ['Xưởng cơ khí, lắp ráp', '20 – 30'],
          ['Xưởng có nhiệt / bụi nhiều (dệt, in)', '30 – 40'],
          ['Xưởng sơn, hóa chất, lò nung', '40 – 60']
        ]
      },
      {
        type: 'callout' as const,
        speakable: true,
        text: 'Ví dụ thực tế: Nhà xưởng cơ khí 40m × 25m × 6m → Thể tích = 6.000 m³ → Chọn ACH = 25 → Lưu lượng cần = 150.000 m³/h → Nếu mỗi quạt 25.000 m³/h → cần 6 quạt.'
      },
      /* ─── 4. Tiêu chuẩn ─── */
      {
        type: 'heading' as const,
        level: 'h2',
        text: '4. Tiêu chuẩn tham khảo'
      },
      {
        type: 'list' as const,
        items: [
          'SMACNA — tiêu chuẩn quốc tế về thiết kế, chế tạo ống gió (độ dày tôn, gia cường, mối nối).',
          'TCVN 5687:2010 — tiêu chuẩn Việt Nam về thông gió – điều hòa không khí.',
          'QCVN 06:2022/BXD — quy chuẩn an toàn cháy, bắt buộc với thông gió hút khói / PCCC tầng hầm.'
        ]
      },
      /* ─── 5. Sai lầm ─── */
      {
        type: 'heading' as const,
        level: 'h2',
        text: '5. Năm sai lầm thường gặp khi chọn quạt'
      },
      {
        type: 'list' as const,
        items: [
          'Chọn quạt theo cảm tính, không tính lưu lượng gió → thiếu/thừa công suất.',
          'Dùng quạt hướng trục cho hệ ống gió dài → gió yếu, không đẩy được.',
          'Bỏ qua áp suất tĩnh → quạt chạy nhưng không đủ lực vượt trở lực ống.',
          'Không tính nguồn nhiệt/bụi đặc thù → thông gió không đạt.',
          'Ham giá rẻ, bỏ qua độ bền motor → tốn chi phí sửa chữa, thay thế về sau.'
        ]
      },
      {
        type: 'callout' as const,
        speakable: true,
        text: 'Quạt công nghiệp có tốn điện không? Nếu chọn đúng công suất và đúng loại, chi phí điện rất hợp lý. Chọn dư công suất hoặc sai loại mới là nguyên nhân gây tốn điện.'
      },
      /* ─── 6. CTA ─── */
      {
        type: 'heading' as const,
        level: 'h2',
        text: '6. Cần tư vấn chọn quạt cho dự án cụ thể?'
      },
      {
        type: 'callout' as const,
        speakable: true,
        text: 'Đội ngũ kỹ sư Cường Thông Gió khảo sát, thiết kế và báo giá miễn phí. Hotline/Zalo: 0905 001 224 — Email: phantrongcuong77@gmail.com — Địa chỉ: 101 Trần Quý Khoách, P. Hòa Khánh, TP. Đà Nẵng.'
      }
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
    content: [
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Chi phí thi công hệ thống thông gió nhà xưởng phụ thuộc vào nhiều yếu tố: loại quạt, chiều dài hệ thống ống gió, phụ kiện (VCD, FD, miệng gió), và mức độ phức tạp của công trình. Theo dữ liệu từ các dự án Cường Thông Gió đã thực hiện trong năm 2025–2026, chi phí trung bình cho hệ thống thông gió nhà xưởng dao động từ 150.000 đến 450.000 VNĐ/m² sàn, tùy theo yêu cầu kỹ thuật.'
      },
      {
        type: 'heading' as const,
        text: 'Bảng giá thiết bị tham khảo (2026)'
      },
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Quạt ly tâm công nghiệp: 8.000.000 – 85.000.000 VNĐ/quạt (tùy công suất 1.5kW–55kW). Quạt hướng trục công nghiệp: 5.000.000 – 65.000.000 VNĐ/quạt (tùy đường kính 400mm–1500mm). Ống gió tôn mạ kẽm: 180.000 – 350.000 VNĐ/m² (tùy độ dày 0.48–1.15mm, tiêu chuẩn SMACNA). Van điều tiết VCD: 450.000 – 1.200.000 VNĐ/cái. Van chặn lửa FD: 800.000 – 2.500.000 VNĐ/cái. Miệng gió nhôm: 120.000 – 450.000 VNĐ/cái. Chi phí lắp đặt: 25–35% giá trị thiết bị.'
      },
      {
        type: 'heading' as const,
        text: 'So sánh chi phí theo diện tích nhà xưởng'
      },
      {
        type: 'table' as const,
        headers: ['Diện tích', 'Hệ thống cơ bản', 'Hệ thống trung bình', 'Hệ thống cao cấp'],
        rows: [
          ['500 m²', '75 – 120 triệu', '120 – 180 triệu', '180 – 250 triệu'],
          ['1.000 m²', '150 – 230 triệu', '230 – 350 triệu', '350 – 500 triệu'],
          ['2.000 m²', '280 – 450 triệu', '450 – 680 triệu', '680 – 950 triệu'],
          ['5.000 m²', '650 – 1.000 triệu', '1.000 – 1.600 triệu', '1.600 – 2.200 triệu']
        ]
      },
      {
        type: 'paragraph' as const,
        speakable: false,
        text: 'Ghi chú: Hệ thống cơ bản gồm quạt hướng trục + ống gió đơn giản; Hệ thống trung bình gồm quạt ly tâm + ống gió tiêu chuẩn + VCD; Hệ thống cao cấp gồm quạt ly tâm chịu nhiệt/Inox + ống gió SMACNA + VCD + FD + hệ thống điều khiển tự động. Giá trên chưa bao gồm VAT 8%.'
      },
      {
        type: 'heading' as const,
        text: 'Yếu tố ảnh hưởng đến chi phí'
      },
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Các yếu tố chính ảnh hưởng đến tổng chi phí thi công: (1) Chiều cao lắp đặt — lắp đặt trên 6m cần giàn giáo hoặc xe nâng, tăng chi phí nhân công 15–25%; (2) Vật liệu ống gió — tôn mạ kẽm tiêu chuẩn rẻ hơn Inox 304 khoảng 2.5–3 lần; (3) Khoảng cách vận chuyển — các dự án ngoài Đà Nẵng phát sinh thêm 3–8% chi phí vận chuyển; (4) Yêu cầu PCCC — hệ thống có van chặn lửa FD, quạt chịu nhiệt 300°C/2h sẽ tăng chi phí 30–50% so với hệ thống thông gió thông thường.'
      },
      {
        type: 'heading' as const,
        text: 'Mẹo tối ưu ngân sách'
      },
      {
        type: 'paragraph' as const,
        speakable: false,
        text: 'Để tiết kiệm chi phí mà vẫn đảm bảo hiệu quả: (1) Ưu tiên thiết kế đường ống ngắn nhất, giảm co cua để hạn chế tổn thất áp suất và giảm kích cỡ quạt cần thiết; (2) Sử dụng quạt hướng trục cho các khu vực thông gió trực tiếp, chỉ dùng quạt ly tâm khi cần áp suất cao; (3) Chọn đơn vị thi công có xưởng sản xuất trực tiếp như Cường Thông Gió — giảm 15–20% chi phí so với đơn vị trung gian nhờ cắt bỏ khâu trung gian; (4) Thi công đồng bộ với hệ thống M&E chung để giảm chi phí giàn giáo và nhân công.'
      }
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
    content: [
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Hệ thống thông gió PCCC (Phòng cháy Chữa cháy) tầng hầm là yêu cầu bắt buộc theo QCVN 06:2022/BXD — Quy chuẩn kỹ thuật quốc gia về An toàn cháy cho nhà và công trình. Tầng hầm, đặc biệt là bãi đỗ xe ngầm, phải được trang bị hệ thống hút khói cơ khí (mechanical smoke extraction) có khả năng hoạt động liên tục tối thiểu 120 phút ở nhiệt độ 300°C khi xảy ra cháy.'
      },
      {
        type: 'heading' as const,
        text: 'Yêu cầu lưu lượng gió theo QCVN 06:2022/BXD'
      },
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Theo Mục 3.6 và Phụ lục D của QCVN 06:2022/BXD, hệ thống thông gió tầng hầm phải đảm bảo: (1) Lưu lượng hút khói tối thiểu 6 lần thể tích tầng hầm mỗi giờ (ACH ≥ 6) cho chế độ thông gió thường; (2) Khi có cháy, hệ thống chuyển sang chế độ hút khói cưỡng bức với ACH ≥ 10, đảm bảo hút được ít nhất 36.000 m³/h cho mỗi vùng cháy (fire zone) có diện tích đến 3.000 m²; (3) Vận tốc gió tại miệng hút khói không nhỏ hơn 1,5 m/s; (4) Tốc độ gió trong ống dẫn khói không vượt quá 10 m/s.'
      },
      {
        type: 'heading' as const,
        text: 'Yêu cầu kỹ thuật cho quạt hút khói PCCC'
      },
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Quạt hút khói PCCC tầng hầm phải đáp ứng các tiêu chuẩn nghiêm ngặt: (1) Chịu nhiệt 300°C liên tục trong 120 phút (theo TCVN 6160:1996 và EN 12101-3); (2) Động cơ đặt ngoài luồng khí nóng hoặc sử dụng động cơ chịu nhiệt cấp H (180°C); (3) Công suất quạt thường từ 7.5kW đến 55kW tùy diện tích tầng hầm; (4) Có biến tần (VFD) để điều chỉnh tốc độ theo tín hiệu từ tủ trung tâm PCCC; (5) Tự động khởi động khi nhận tín hiệu báo cháy từ đầu báo khói hoặc nút ấn khẩn cấp; (6) Kết nối với hệ thống BMS (Building Management System) để giám sát từ xa.'
      },
      {
        type: 'heading' as const,
        text: 'Thiết kế hệ thống thông gió khẩn cấp tầng hầm'
      },
      {
        type: 'paragraph' as const,
        speakable: false,
        text: 'Hệ thống thông gió PCCC tầng hầm hoàn chỉnh gồm: (1) Quạt cấp gió tươi (supply fan) — đặt ở vị trí cao, cấp không khí sạch vào tầng hầm với áp suất dương nhẹ; (2) Quạt hút khói (exhaust/smoke fan) — đặt phía trên cùng, hút khói nóng ra ngoài qua ống gió chịu nhiệt; (3) Ống gió chịu nhiệt — sử dụng tôn mạ kẽm dày từ 0.8mm trở lên, mối nối bắt bu-lông, bọc bông chịu nhiệt; (4) Van chặn lửa FD (Fire Damper) — tự động đóng khi nhiệt độ đạt 72°C, ngăn lửa lan qua ống gió theo TCVN 7336:2021; (5) Miệng hút khói — bố trí ở trần, cách tường tối đa 2m, mỗi miệng phục vụ tối đa 100 m² sàn.'
      },
      {
        type: 'heading' as const,
        text: 'Kinh nghiệm Cường Thông Gió với dự án PCCC'
      },
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Cường Thông Gió đã thi công hơn 350 dự án thông gió PCCC tầng hầm tại Đà Nẵng và Miền Trung, bao gồm các tòa nhà cao tầng, trung tâm thương mại và chung cư. Quy trình triển khai gồm 5 bước: (1) Khảo sát hiện trạng và bản vẽ kiến trúc; (2) Tính toán lưu lượng gió theo QCVN 06:2022/BXD; (3) Thiết kế bản vẽ thi công (shop drawing) chi tiết; (4) Sản xuất quạt chịu nhiệt và ống gió tại xưởng; (5) Lắp đặt, vận hành thử và nghiệm thu cùng cơ quan PCCC. Mỗi dự án đều được kiểm định lưu lượng gió thực tế bằng thiết bị đo chuyên dụng, đảm bảo đạt 100% yêu cầu nghiệm thu.'
      },
      {
        type: 'heading' as const,
        text: 'Lưu ý quan trọng khi thi công'
      },
      {
        type: 'paragraph' as const,
        speakable: false,
        text: 'Các lỗi thường gặp khi thi công thông gió PCCC tầng hầm: (1) Chọn quạt không đủ chịu nhiệt 300°C/2h — chỉ dùng quạt thông gió thường, không đạt yêu cầu nghiệm thu PCCC; (2) Không lắp van chặn lửa FD tại vị trí ống gió xuyên tường/sàn chống cháy; (3) Ống gió thiếu phần mềm (flexible duct) kết nối với quạt, gây rung và tiếng ồn; (4) Bố trí miệng hút khói quá xa (hơn 2m từ tường), tạo vùng chết không hút được khói. Chúng tôi cam kết tuân thủ 100% QCVN 06:2022/BXD và hỗ trợ chủ đầu tư trong quá trình nghiệm thu PCCC.'
      }
    ]
  }
];

/* ─── FAQ Data ─── */
export const faqData = [
  {
    question: 'Quạt ly tâm và quạt hướng trục khác nhau thế nào?',
    answer: 'Quạt ly tâm tạo áp suất cao, phù hợp ống gió dài và hút bụi/khí; quạt hướng trục cho lưu lượng lớn, giá tốt, hợp làm mát nhà xưởng gắn tường/mái.'
  },
  {
    question: 'Làm sao biết cần bao nhiêu quạt cho nhà xưởng?',
    answer: 'Tính thể tích nhà xưởng × ACH (số lần thay đổi không khí/giờ) để ra tổng lưu lượng cần thiết, sau đó chia cho công suất mỗi quạt. Ví dụ: nhà xưởng 40m×25m×6m với ACH=25 cần 150.000 m³/h, tức 6 quạt 25.000 m³/h.'
  },
  {
    question: 'Quạt công nghiệp có tốn điện không?',
    answer: 'Nếu chọn đúng công suất và đúng loại, chi phí điện rất hợp lý. Chọn dư công suất hoặc sai loại (ví dụ dùng quạt hướng trục cho hệ ống dài) mới là nguyên nhân gây tốn điện.'
  },
  {
    question: 'Chi phí thi công hệ thống thông gió nhà xưởng 1.000 m² khoảng bao nhiêu?',
    answer: 'Chi phí thi công thông gió cho nhà xưởng 1.000 m² dao động từ 150 triệu (hệ thống cơ bản với quạt hướng trục) đến 500 triệu VNĐ (hệ thống cao cấp với quạt ly tâm chịu nhiệt, ống gió SMACNA và hệ thống điều khiển tự động). Giá chưa bao gồm VAT 8%.'
  },
  {
    question: 'QCVN 06:2022/BXD yêu cầu gì về thông gió tầng hầm?',
    answer: 'QCVN 06:2022/BXD yêu cầu tầng hầm phải có hệ thống hút khói cơ khí với ACH ≥ 6 (thông gió thường) và ACH ≥ 10 (chế độ cháy). Quạt hút khói phải chịu nhiệt 300°C liên tục 120 phút. Van chặn lửa FD tự động đóng khi nhiệt độ đạt 72°C.'
  },
  {
    question: 'Cường Thông Gió có thi công PCCC tầng hầm không?',
    answer: 'Có. Cường Thông Gió đã thi công hơn 350 dự án thông gió PCCC tầng hầm tại Đà Nẵng và Miền Trung. Chúng tôi sản xuất quạt chịu nhiệt 300°C/2h, ống gió chịu lửa và hỗ trợ chủ đầu tư nghiệm thu PCCC theo QCVN 06:2022/BXD.'
  }
];

/* ─── Blog Page Component ─── */
export function Blog() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const breadcrumb = makeBreadcrumbSchema([
    { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
    { name: 'Kiến thức', url: 'https://cuongthonggio.com/kien-thuc' }
  ]);

  const articleSchemas = articles.map(a => makeArticleSchema({
    headline: a.headline,
    description: a.description,
    datePublished: a.datePublished,
    dateModified: a.dateModified,
    author: a.author,
    url: `https://cuongthonggio.com/kien-thuc/${a.id}`
  }));

  const faqSchema = makeFAQSchema(faqData);

  return (
    <div className="bg-white">
      <SEO
        title="Kiến Thức Thông Gió Công Nghiệp"
        description="Trung tâm kiến thức thông gió công nghiệp — Hướng dẫn chọn quạt, bảng giá thi công 2026, tiêu chuẩn PCCC tầng hầm QCVN 06:2022/BXD. Bài viết chuyên sâu từ kỹ sư Cường Thông Gió."
        keywords="kiến thức thông gió, cách chọn quạt công nghiệp, chi phí thông gió nhà xưởng 2026, tiêu chuẩn PCCC tầng hầm, QCVN 06:2022, quạt ly tâm, quạt hướng trục, ống gió SMACNA, thông gió Đà Nẵng"
        structuredData={[breadcrumb, ...articleSchemas, faqSchema]}
        dateModified="2026-06-05"
      />

      {/* ─── Breadcrumb ─── */}
      <nav aria-label="Breadcrumb" className="pt-24 md:pt-28 pb-0 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ol className="flex items-center gap-2 text-xs text-zinc-400 font-medium" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" itemProp="item" className="hover:text-zinc-900 transition-colors">
                <span itemProp="name">Trang chủ</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-zinc-300">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-zinc-900 font-bold">Kiến thức</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className="pt-8 pb-20 border-b border-zinc-100" aria-label="Kiến thức thông gió công nghiệp">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
              Kiến thức chuyên sâu
            </span>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-zinc-900 mb-8 max-w-5xl leading-[1.1]">
              Kiến thức thông gió công nghiệp —{' '}
              <br className="hidden md:block" />
              Hỏi gì, đáp nấy.
            </h1>
            <p className="text-zinc-500 text-lg md:text-xl max-w-3xl leading-relaxed">
              Tổng hợp bài viết chuyên sâu từ kỹ sư Cường Thông Gió — giúp chủ đầu tư, kỹ sư M&E và nhà thầu hiểu rõ về quạt công nghiệp, chi phí thi công và tiêu chuẩn PCCC.
            </p>
            <p className="text-zinc-700 text-base md:text-lg font-semibold leading-relaxed max-w-3xl mt-4" data-speakable="true">
              <strong>
                Cường Thông Gió chia sẻ kiến thức thực tiễn về cách chọn quạt công nghiệp (ly tâm, hướng trục), bảng giá thi công thông gió nhà xưởng 2026 (từ 150 triệu cho 1.000 m²), và tiêu chuẩn PCCC tầng hầm QCVN 06:2022/BXD — dựa trên 13+ năm kinh nghiệm và 2.145+ dự án.
              </strong>
            </p>
          </motion.div>
        </div>
      </section>

      {/* ─── Articles ─── */}
      <section className="py-20 md:py-32" aria-label="Bài viết kiến thức thông gió">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          {articles.map((article, idx) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="bg-white rounded-2xl border border-zinc-100 shadow-[0_2px_30px_rgba(0,0,0,0.04)] overflow-hidden hover:shadow-[0_4px_40px_rgba(0,0,0,0.08)] transition-shadow duration-500"
              itemScope
              itemType="https://schema.org/Article"
            >
              <Link
                to={`/kien-thuc/${article.id}`}
                className="block p-8 md:p-12 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full">
                    Bài viết #{idx + 1}
                  </span>
                  <time
                    dateTime={article.datePublished}
                    className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest"
                    itemProp="datePublished"
                  >
                    {article.datePublished}
                  </time>
                </div>

                <h2
                  className="text-xl md:text-3xl font-bold text-zinc-900 mb-4 leading-tight tracking-tight group-hover:text-zinc-700 transition-colors"
                  itemProp="headline"
                >
                  {article.headline}
                </h2>

                <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-6" itemProp="description">
                  {article.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3" itemProp="author" itemScope itemType="https://schema.org/Person">
                    <div className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center text-white text-xs font-bold shrink-0">
                      C
                    </div>
                    <div>
                      <span className="text-xs font-bold text-zinc-700 block" itemProp="name">{article.author}</span>
                      <span className="text-[10px] text-zinc-400 uppercase tracking-wider" itemProp="jobTitle">Kỹ sư Cơ khí Thông gió</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm font-bold text-zinc-400 group-hover:text-zinc-900 transition-colors">
                    <span className="hidden sm:inline">Đọc bài viết</span>
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ─── FAQ Section ─── */}
      <section className="py-20 md:py-32 bg-zinc-50 border-y border-zinc-100" aria-label="Câu hỏi thường gặp về thông gió" id="faq-kien-thuc">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14 md:mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight"
            >
              Câu hỏi thường gặp
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-500 text-base md:text-lg leading-relaxed"
            >
              <strong>Giải đáp nhanh các thắc mắc về quạt công nghiệp, chi phí thi công và tiêu chuẩn PCCC.</strong>
            </motion.p>
          </div>

          <div className="space-y-4">
            {faqData.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-zinc-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                  aria-expanded={openFaq === idx}
                  aria-controls={`blog-faq-answer-${idx}`}
                >
                  <h3 className="text-base md:text-lg font-bold text-zinc-900 pr-4 leading-snug">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  id={`blog-faq-answer-${idx}`}
                  className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-96 pb-6 md:pb-8' : 'max-h-0'}`}
                  role="region"
                >
                  <p className="faq-answer px-6 md:px-8 text-zinc-500 text-sm md:text-base leading-relaxed" data-speakable="true">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight leading-tight">
              Cần tư vấn giải pháp thông gió cho dự án của bạn?
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto leading-relaxed mb-10">
              Đội ngũ kỹ sư Cường Thông Gió sẵn sàng khảo sát, thiết kế và báo giá miễn phí — từ thông gió nhà xưởng đến PCCC tầng hầm.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/lien-he"
                className="bg-zinc-900 text-white px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-zinc-800 transition-colors shadow-2xl shadow-zinc-300 inline-flex items-center justify-center"
              >
                Nhận báo giá miễn phí
              </Link>
              <a
                href="tel:0905001224"
                className="border-2 border-zinc-200 text-zinc-900 px-12 py-5 rounded-full font-bold uppercase tracking-widest text-sm hover:border-zinc-900 transition-colors inline-flex items-center justify-center"
              >
                Gọi ngay: 0905 001 224
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
