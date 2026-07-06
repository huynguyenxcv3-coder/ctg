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
        text: 'Tôi hay gặp trường hợp chủ xưởng chọn quạt theo giá rẻ, lắp xong thì gió không đủ, máy nóng ran, công nhân kêu ca, rồi phải tháo ra thay lại gần gấp đôi tiền. Chọn quạt sai thực sự tốn kém lắm. Bài này tôi viết dựa trên những gì đã làm thực tế qua hơn 13 năm và hơn 2.000 dự án, hy vọng giúp anh em tránh được mấy cái bẫy thường gặp.'
      },
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Nhà xưởng mà không có hệ thống thông gió tốt thì nóng như cái lò. Công nhân mệt mỏi, máy móc hỏng nhanh, sản phẩm dễ lỗi. Trái tim của cả hệ thống chính là chiếc quạt. Nhưng chọn sao cho đúng thì không đơn giản chỉ nhìn vào công suất.'
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
        text: 'Loại này không khí vào theo trục rồi bị đẩy ra góc 90 độ. Nó tạo áp suất tĩnh mạnh, đẩy gió qua những đường ống dài, qua bộ lọc bụi hay những nơi có trở lực lớn. Thực tế tôi hay dùng cho hệ thống hút bụi, hút khói bếp hay thông gió tầng hầm.'
      },
      {
        type: 'list' as const,
        items: [
          'Ưu điểm nổi bật: Gió mạnh, chịu được ống dài, hút tốt bụi và khí độc.',
          'Thường dùng cho: Lọc bụi, hút khói công nghiệp, thông gió tầng hầm, hệ thống ống phức tạp.'
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
        text: 'Gió đi thẳng theo trục cánh. Lưu lượng lớn nhưng áp suất yếu. Phù hợp những chỗ cần thông gió trực tiếp, gắn tường hoặc mái, không cần đẩy xa.'
      },
      {
        type: 'list' as const,
        items: [
          'Ưu điểm: Lưu lượng cao, giá rẻ hơn, lắp nhanh, tiết kiệm điện.',
          'Thường dùng cho: Làm mát nhà xưởng, gắn trực tiếp tường/mái, nơi không có hệ ống dài.'
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
        text: '2. Những thứ thực tế phải tính khi chọn quạt'
      },
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Không phải cứ mua cái to là tốt. Có lần tôi làm cho xưởng dệt ở Đà Nẵng, khách chọn quạt theo cảm tính, sau 3 tháng thì nóng không chịu nổi vì bụi vải bám đầy. Phải tính kỹ mấy cái này:'
      },
      {
        type: 'list' as const,
        items: [
          'Thể tích nhà xưởng (dài × rộng × cao) — đây là gốc để tính lưu lượng.',
          'Nhiệt độ và nguồn nhiệt — xưởng có lò, máy nén khí thì ACH phải cao hơn.',
          'Loại bụi hay khí thải — bụi gỗ, kim loại, sơn, hóa chất mỗi cái cần cách xử lý khác nhau.',
          'Áp suất tĩnh — ống càng dài, càng nhiều cút nối thì cần quạt mạnh hơn.',
          'Độ ồn cho phép — gần khu dân cư hay văn phòng thì phải chọn loại êm.',
          'Điện 1 pha hay 3 pha — cân nhắc chi phí vận hành lâu dài.'
        ]
      },
      /* ─── 3. Công thức tính ─── */
      {
        type: 'heading' as const,
        level: 'h2',
        text: '3. Cách tính lưu lượng gió đơn giản nhất'
      },
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Cách tôi hay dùng là tính theo số lần thay đổi không khí mỗi giờ (ACH). Công thức:'
      },
      {
        type: 'formula' as const,
        text: 'Lưu lượng gió (m³/h) = Thể tích nhà xưởng (m³) × ACH'
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
        text: 'Ví dụ thực tế tôi hay lấy: Nhà xưởng cơ khí 40m × 25m × 6m, thể tích 6.000 m³. Chọn ACH 25 thì cần 150.000 m³/h. Nếu dùng quạt 25.000 m³/h thì cần 6 cái. Đơn giản vậy thôi, nhưng phải đo đạc thực tế mới chính xác.'
      },
      /* ─── 4. Tiêu chuẩn ─── */
      {
        type: 'heading' as const,
        level: 'h2',
        text: '4. Tiêu chuẩn nên tham khảo'
      },
      {
        type: 'list' as const,
        items: [
          'SMACNA — tiêu chuẩn quốc tế về ống gió, độ dày tôn, cách gia cường.',
          'TCVN 5687:2010 — tiêu chuẩn Việt Nam về thông gió điều hòa.',
          'QCVN 06:2022/BXD — bắt buộc với hệ thống hút khói PCCC tầng hầm.'
        ]
      },
      /* ─── 5. Sai lầm ─── */
      {
        type: 'heading' as const,
        level: 'h2',
        text: '5. Những sai lầm tôi hay gặp'
      },
      {
        type: 'list' as const,
        items: [
          'Chọn theo giá hoặc theo cảm tính, không tính lưu lượng → thiếu hoặc thừa công suất.',
          'Dùng quạt hướng trục cho hệ ống gió dài → gió yếu teo, không đẩy nổi.',
          'Quên tính áp suất tĩnh → quạt chạy nhưng gió không ra.',
          'Không xem xét bụi và nhiệt đặc thù của xưởng → hệ thống không hiệu quả.',
          'Mua rẻ, motor yếu → sau 1-2 năm phải thay, tốn kém hơn nhiều.'
        ]
      },
      {
        type: 'callout' as const,
        speakable: true,
        text: 'Nhiều người hỏi quạt công nghiệp có tốn điện không. Thực ra nếu chọn đúng loại và đúng công suất thì điện không đáng kể. Chính việc chọn sai mới làm tiền điện tăng vọt.'
      },
      /* ─── 6. CTA ─── */
      {
        type: 'heading' as const,
        level: 'h2',
        text: '6. Cần tư vấn cho dự án cụ thể?'
      },
      {
        type: 'callout' as const,
        speakable: true,
        text: 'Anh em ở Cường Thông Gió sẵn sàng xuống khảo sát, đo đạc và báo giá miễn phí. Gọi 0905 001 224 hoặc Zalo cùng số. Xưởng sản xuất tại KCN Hòa Khánh, Đà Nẵng. Chúng tôi làm thật, không qua trung gian.'
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
        text: 'Chi phí làm hệ thống thông gió nhà xưởng không phải lúc nào cũng giống nhau. Có dự án tôi làm cho khách ở Đà Nẵng chỉ cần quạt hướng trục đơn giản thì rẻ, nhưng có cái phải làm ống gió Inox chịu nhiệt, quạt ly tâm lớn thì đội giá lên rất nhiều. Năm 2025-2026, theo những gì chúng tôi thực hiện, trung bình rơi vào khoảng 150.000 – 450.000 VNĐ mỗi mét vuông sàn, tùy thuộc vào độ phức tạp.'
      },
      {
        type: 'heading' as const,
        text: 'Giá thiết bị tham khảo năm 2026 (thực tế từ xưởng)'
      },
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Quạt ly tâm công nghiệp thường từ 8 triệu đến 85 triệu một cái, tùy công suất từ 1.5kW đến 55kW. Quạt hướng trục thì rẻ hơn, khoảng 5 – 65 triệu. Ống gió tôn mạ kẽm rơi vào 180.000 – 350.000 VNĐ/m². Van điều tiết VCD khoảng 450k – 1,2 triệu/cái. Van chặn lửa FD từ 800k đến 2,5 triệu. Chi phí lắp đặt thường chiếm 25-35% tổng giá thiết bị.'
      },
      {
        type: 'heading' as const,
        text: 'Chi phí theo diện tích nhà xưởng (tham khảo thực tế)'
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
        text: 'Ghi chú: Hệ thống cơ bản thường dùng quạt hướng trục + ống đơn giản. Trung bình thì thêm quạt ly tâm và van điều tiết. Cao cấp thì dùng vật liệu chịu nhiệt, Inox, điều khiển tự động. Giá chưa gồm VAT 8%.'
      },
      {
        type: 'heading' as const,
        text: 'Những thứ làm đội giá lên'
      },
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Nhiều khách hay ngạc nhiên vì báo giá cao hơn dự kiến. Thực ra có mấy cái hay làm tăng chi phí: lắp đặt trên cao quá 6m thì phải dùng giàn giáo hay xe nâng, tốn thêm 15-25%. Dùng ống Inox thay vì tôn mạ kẽm thì đắt gấp 2-3 lần. Dự án xa Đà Nẵng thì cộng thêm vận chuyển. Yêu cầu PCCC đầy đủ (quạt chịu nhiệt, van FD) thì đội thêm 30-50%.'
      },
      {
        type: 'heading' as const,
        text: 'Cách tiết kiệm mà vẫn làm tốt'
      },
      {
        type: 'paragraph' as const,
        speakable: false,
        text: 'Tôi thường khuyên khách: thiết kế đường ống ngắn nhất có thể, ít co cua để giảm trở lực, quạt không cần quá to. Dùng quạt hướng trục cho những khu thông gió trực tiếp, chỉ dùng ly tâm khi thực sự cần áp suất. Quan trọng nhất là chọn đơn vị có xưởng sản xuất riêng như chúng tôi, cắt được khâu trung gian nên rẻ hơn 15-20%. Làm cùng lúc với hệ M&E cũng tiết kiệm được giàn giáo và nhân công.'
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
        text: 'Làm thông gió PCCC cho tầng hầm là chuyện bắt buộc, không phải chuyện tùy chọn. Theo QCVN 06:2022/BXD, tầng hầm (đặc biệt bãi đỗ xe ngầm) phải có hệ thống hút khói cơ khí hoạt động được ít nhất 120 phút ở nhiệt độ 300°C khi có cháy. Tôi đã gặp không ít dự án làm ẩu, quạt không chịu nhiệt, nghiệm thu PCCC không qua được, phải tháo ra làm lại.'
      },
      {
        type: 'heading' as const,
        text: 'Yêu cầu lưu lượng gió theo quy chuẩn'
      },
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Theo QCVN 06:2022/BXD, hệ thống phải đảm bảo: lưu lượng hút khói tối thiểu ACH 6 lần thể tích tầng hầm ở chế độ bình thường. Khi có cháy thì phải chuyển sang chế độ khẩn cấp với ACH ≥ 10. Vận tốc tại miệng hút ít nhất 1,5 m/s. Tốc độ trong ống khói không quá 10 m/s. Mỗi vùng cháy tối đa 3.000 m² phải hút được ít nhất 36.000 m³/h.'
      },
      {
        type: 'heading' as const,
        text: 'Quạt hút khói PCCC phải đạt những gì?'
      },
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Quạt phải chịu nhiệt 300°C liên tục trong 120 phút (theo EN 12101-3). Động cơ thường đặt ngoài luồng khí nóng hoặc dùng loại chịu nhiệt cấp H. Công suất thường từ 7.5kW đến 55kW. Phải có biến tần VFD, tự động chạy khi có báo cháy, và kết nối với hệ thống BMS để giám sát từ xa.'
      },
      {
        type: 'heading' as const,
        text: 'Cách thiết kế hệ thống hút khói tầng hầm'
      },
      {
        type: 'paragraph' as const,
        speakable: false,
        text: 'Một hệ thống hoàn chỉnh thường gồm: quạt cấp gió tươi đặt cao để đẩy không khí sạch vào, quạt hút khói đặt trên cùng để hút khói ra, ống gió chịu nhiệt (tôn dày từ 0.8mm, bọc bông chịu nhiệt), van chặn lửa FD tự đóng ở 72°C, và miệng hút bố trí ở trần, cách tường không quá 2m, mỗi miệng phục vụ tối đa 100m².'
      },
      {
        type: 'heading' as const,
        text: 'Kinh nghiệm thực tế từ các dự án'
      },
      {
        type: 'paragraph' as const,
        speakable: true,
        text: 'Cường Thông Gió đã làm hơn 350 dự án PCCC tầng hầm ở Đà Nẵng và Miền Trung, từ chung cư, trung tâm thương mại đến tòa nhà cao tầng. Quy trình của chúng tôi thường là: khảo sát thực tế + bản vẽ, tính toán theo đúng QCVN, vẽ shop drawing chi tiết, sản xuất tại xưởng rồi lắp đặt và nghiệm thu cùng cơ quan PCCC. Mỗi lần đều đo đạc lưu lượng thực tế bằng thiết bị chuyên dụng, không để sai lệch.'
      },
      {
        type: 'heading' as const,
        text: 'Những lỗi hay gặp và cách tránh'
      },
      {
        type: 'paragraph' as const,
        speakable: false,
        text: 'Lỗi thường thấy nhất: dùng quạt thông gió thường thay vì loại chịu nhiệt 300°C/2h — nghiệm thu không đạt. Quên lắp van FD ở vị trí ống xuyên sàn/tường chống cháy. Ống gió cứng nhắc không có nối mềm với quạt, gây rung và ồn. Miệng hút đặt quá xa tường, tạo vùng chết không hút khói được. Chúng tôi luôn làm đúng 100% quy chuẩn và hỗ trợ chủ đầu tư trong quá trình nghiệm thu.'
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
