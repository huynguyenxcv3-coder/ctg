/**
 * Product detail data for individual product pages (e-commerce style).
 * Each product has a slug, images, specs, detailed description, and related products.
 */

export interface ProductSpec {
  label: string;
  value: string;
}

export interface ProductDetailData {
  slug: string;
  title: string;
  badge: string;
  shortDesc: string;
  imageUrl: string;
  images: string[];
  specs: ProductSpec[];
  highlights: string[];
  description: string; // Rich HTML-like description content
  relatedSlugs: string[];
  price?: string;
  installNote?: string;
}

export const productsDetailList: ProductDetailData[] = [
  {
    slug: 'quat-ly-tam-cong-nghiep',
    title: 'Quạt Ly Tâm Công Nghiệp',
    badge: 'Sản xuất & Lắp đặt',
    shortDesc: 'Quạt ly tâm được chúng tôi trực tiếp gia công với vỏ thép dày, cánh quạt cân bằng động kỹ thuật số. Phù hợp cho hệ thống hút bụi, thông gió áp suất cao, lò hơi và các công trình công nghiệp nặng.',
    imageUrl: '/quat-ly-tam.png',
    images: ['/quat-ly-tam.png'],
    price: 'Liên hệ báo giá: 8 – 85 triệu VNĐ',
    installNote: 'Bao gồm lắp đặt, vận hành thử, bảo hành 12 tháng',
    specs: [
      { label: 'Công suất', value: '1.5kW – 200kW' },
      { label: 'Áp suất tĩnh', value: 'Lên đến 3.000 Pa' },
      { label: 'Cánh quạt', value: 'Cân bằng động kỹ thuật số' },
      { label: 'Vật liệu', value: 'Thép CT3, sơn tĩnh điện' },
      { label: 'Bảo hành', value: '12 tháng' },
      { label: 'Xuất xứ', value: 'Sản xuất tại xưởng Đà Nẵng' },
    ],
    highlights: [
      'Vỏ thép dày, chịu lực cao, bền bỉ trong môi trường khắc nghiệt',
      'Cánh quạt được cân bằng động, vận hành êm ái không rung lắc',
      'Phù hợp cho nhiều ứng dụng: hút bụi, lò hơi, hệ thống lọc',
      'Sản xuất trực tiếp tại xưởng Đà Nẵng — kiểm soát chất lượng 100%',
    ],
    description: `Quạt ly tâm là loại quạt có ứng dụng cao trong sản xuất công nghiệp, nhà máy, nhà kho hay các cơ sở hạ tầng lớn nhỏ. Nhờ khả năng tạo ra áp suất cao và vận chuyển không khí qua hệ thống ống gió dài, quạt ly tâm trở thành lựa chọn hàng đầu cho các dự án yêu cầu hiệu suất thông gió vượt trội.

## Cánh quạt ly tâm là gì?

Cánh quạt ly tâm được coi là bộ phận trung tâm, thực hiện chức năng quan trọng nhất — tạo ra lưu lượng gió nhờ nguyên lý cơ học. Đây là bộ phận được gắn vào trục quạt, sử dụng để tạo ra lưu lượng không khí hoặc chất lỏng thông qua sự quay tốc độ cao.

Cánh quạt ly tâm công nghiệp được thiết kế với các cánh cong, hướng chuyển động tạo ra áp lực từ trung tâm ra ngoài. Khi hoạt động, cánh quạt xoay nhanh quanh trục, tạo ra lực ly tâm mạnh đẩy không khí hoặc chất lỏng đi ra xa trung tâm quạt.

## Phân loại cánh quạt ly tâm công nghiệp

Tùy thuộc vào từng loại quạt ly tâm mà thiết kế cánh quạt cũng khác nhau, phục vụ những nhiệm vụ riêng biệt:

### Theo vật liệu sản xuất
- **Cánh quạt ly tâm inox**: Làm từ thép không gỉ (inox), chịu được môi trường ẩm ướt và có khả năng chống ăn mòn cao.
- **Cánh quạt ly tâm nhựa PP**: Làm từ nhựa Polypropylene (PP), có khả năng chịu hóa chất và tác động môi trường ẩm ướt.
- **Cánh quạt ly tâm composite**: Làm từ nhựa gia cường sợi thủy tinh (FRP), kết hợp giữa độ bền của sợi thủy tinh và tính linh hoạt của nhựa.

### Theo cột áp
- **Cánh quạt ly tâm thấp áp**: Sử dụng để thông gió và hút khí không đòi hỏi cột áp cao.
- **Cánh quạt ly tâm trung áp**: Tạo ra áp lực trung bình để vận chuyển không khí hoặc chất lỏng qua hệ thống ống dẫn.
- **Cánh quạt ly tâm cao áp**: Có khả năng tạo ra cột áp cao để vận chuyển không khí hoặc khí hóa lỏng qua hệ thống ống dẫn dài.

### Theo thiết kế động cơ
- **Truyền động trực tiếp**: Động cơ gắn trực tiếp với cánh quạt, cường độ hoạt động nhanh chóng và hiệu quả cao.
- **Truyền động gián tiếp**: Động cơ gắn gián tiếp qua hệ thống dây curoa, giúp bảo vệ tuổi thọ động cơ.

## Thiết kế cánh quạt ly tâm

Hiện nay, có 3 kiểu dáng thiết kế cánh quạt ly tâm phổ biến nhất:

1. **Cánh hướng tâm**: Dạng cánh có số lượng lá ít, bề mặt rộng. Tốc độ quay trung bình, lưu lượng thấp. Hoạt động ổn định, không rung lắc, độ ồn thấp.

2. **Cánh cong nghiêng về trước**: Dịch chuyển dòng khí lớn với áp suất thấp. Tốc độ quay chậm, độ ồn thấp, phù hợp cho điều hòa không khí và thông gió.

3. **Cánh cong nghiêng về sau**: Đem lại hiệu suất hoạt động cao nhất, không làm động cơ quá tải. Thích hợp cho hệ thống có lưu lượng khí cao.

Tại Cường Thông Gió, chúng tôi trực tiếp sản xuất và lắp đặt quạt ly tâm công nghiệp tại xưởng KCN Hòa Khánh, Đà Nẵng. Mọi sản phẩm đều được kiểm tra cân bằng động nghiêm ngặt trước khi giao hàng.`,
    relatedSlugs: ['quat-huong-truc-cong-nghiep', 'gia-cong-ong-gio-phu-kien', 'thi-cong-he-thong-ong-gio'],
  },
  {
    slug: 'quat-huong-truc-cong-nghiep',
    title: 'Quạt Hướng Trục Công Nghiệp',
    badge: 'Sản xuất & Lắp đặt',
    shortDesc: 'Chúng tôi trực tiếp gia công và lắp đặt các dòng quạt hướng trục công nghiệp. Sản phẩm sử dụng động cơ dây đồng tiêu chuẩn, cánh quạt được cân bằng động kỹ thuật số đảm bảo vận hành êm ái, bền bỉ.',
    imageUrl: '/quat-huong-truc.png',
    images: ['/quat-huong-truc.png'],
    price: 'Liên hệ báo giá: 5 – 65 triệu VNĐ',
    installNote: 'Bao gồm lắp đặt, vận hành thử, bảo hành 12 tháng',
    specs: [
      { label: 'Công suất', value: '1.1kW – 200kW' },
      { label: 'Lưu lượng', value: 'Lên đến 150.000 m³/h' },
      { label: 'Áp suất', value: 'Cao, hiệu suất tối ưu' },
      { label: 'Vật liệu', value: 'Thép CT3 hoặc Inox 304' },
      { label: 'Bảo hành', value: '12 tháng' },
      { label: 'Xuất xứ', value: 'Sản xuất tại xưởng Đà Nẵng' },
    ],
    highlights: [
      'Động cơ dây đồng tiêu chuẩn, bền bỉ và tiết kiệm năng lượng',
      'Cánh quạt cân bằng động, vận hành êm không rung lắc',
      'Lưu lượng gió lớn — phù hợp thông gió trực tiếp nhà xưởng',
      'Sản xuất tại Đà Nẵng, đáp ứng nhanh đơn hàng lớn',
    ],
    description: `Quạt hướng trục công nghiệp (axial fan) là thiết bị thông gió tạo ra dòng khí di chuyển song song với trục quay của cánh quạt. Loại quạt này có khả năng tạo lưu lượng gió rất lớn, phù hợp cho các ứng dụng thông gió trực tiếp tại nhà xưởng, hầm, khu công nghiệp.

## Cấu tạo quạt hướng trục

Quạt hướng trục gồm các bộ phận chính: cánh quạt, thân quạt (vỏ), động cơ điện và bộ phận truyền động. Cánh quạt được gắn trực tiếp vào trục motor hoặc qua hệ thống dây đai, tạo ra dòng khí hướng trục khi quay.

Cánh quạt hướng trục thường được chế tạo từ hợp kim nhôm, thép CT3 hoặc inox 304, tùy theo môi trường sử dụng. Với các ứng dụng trong môi trường có hóa chất hoặc ẩm ướt, cánh inox 304 là lựa chọn tối ưu.

## Ưu điểm quạt hướng trục

- **Lưu lượng gió lớn**: Lên đến 150.000 m³/h, phù hợp cho nhà xưởng diện tích rộng.
- **Tiêu thụ điện năng thấp**: So với quạt ly tâm cùng công suất, quạt hướng trục tiết kiệm điện hơn đáng kể.
- **Dễ lắp đặt**: Có thể lắp gắn tường, gắn trần hoặc đặt trong ống gió tròn.
- **Bảo trì đơn giản**: Kết cấu đơn giản, dễ dàng vệ sinh và thay thế linh kiện.

## Ứng dụng phổ biến

Quạt hướng trục được sử dụng rộng rãi trong:
- Thông gió nhà xưởng sản xuất, kho hàng
- Hệ thống hút khói, thoát khí nóng
- Thông gió tầng hầm (kết hợp jet fan)
- Hệ thống PCCC — quạt chịu nhiệt 300°C/2h
- Làm mát khu vực sản xuất kết hợp cooling pad

## So sánh với quạt ly tâm

| Tiêu chí | Quạt hướng trục | Quạt ly tâm |
|-----------|-----------------|-------------|
| Lưu lượng | Rất cao | Trung bình – Cao |
| Áp suất | Thấp – Trung bình | Cao (đến 3.000 Pa) |
| Giá thành | Thấp hơn | Cao hơn |
| Ứng dụng | Thông gió trực tiếp | Hút bụi, ống gió dài |

Tại Cường Thông Gió, chúng tôi sản xuất quạt hướng trục từ 1.1kW đến 200kW, với cánh quạt được cân bằng động nghiêm ngặt. Đội ngũ kỹ thuật kinh nghiệm hơn 13 năm sẵn sàng tư vấn và lắp đặt tận nơi.`,
    relatedSlugs: ['quat-ly-tam-cong-nghiep', 'thi-cong-he-thong-ong-gio', 'gia-cong-ong-gio-phu-kien'],
  },
  {
    slug: 'may-dieu-hoa-cassette',
    title: 'Máy Điều Hoà Cassette',
    badge: 'Cung cấp & Lắp đặt',
    shortDesc: 'Cung cấp và lắp đặt máy điều hoà dạng cassette âm trần cho văn phòng, trung tâm thương mại, nhà hàng và khu công nghiệp.',
    imageUrl: '/may-dieu-hoa-cassette.png',
    images: ['/may-dieu-hoa-cassette.png'],
    price: 'Liên hệ báo giá theo công suất',
    installNote: 'Bao gồm lắp đặt, vận hành, bảo hành theo hãng',
    specs: [
      { label: 'Công suất', value: '1.5HP – 5HP' },
      { label: 'Gas', value: 'R32 / R410A tiết kiệm năng lượng' },
      { label: 'Phân phối gió', value: '4 chiều đồng đều' },
      { label: 'Công nghệ', value: 'Inverter — tiết kiệm đến 40% điện' },
      { label: 'Bảo hành', value: 'Theo chính sách hãng sản xuất' },
      { label: 'Lắp đặt', value: 'Đội ngũ kỹ thuật chuyên nghiệp' },
    ],
    highlights: [
      'Phân phối gió 4 chiều đồng đều, không gây khó chịu',
      'Công nghệ Inverter tiết kiệm đến 40% điện năng',
      'Thiết kế âm trần, thẩm mỹ và tiết kiệm không gian',
      'Phù hợp văn phòng, nhà hàng, trung tâm thương mại',
    ],
    description: `Máy điều hòa cassette (hay còn gọi điều hòa âm trần) là dòng máy lạnh được thiết kế lắp đặt âm vào trần nhà, với panel phân phối gió 4 chiều nổi bật. Đây là giải pháp làm mát chuyên nghiệp cho các không gian thương mại và văn phòng hiện đại.

## Ưu điểm máy điều hòa cassette

- **Phân phối gió 4 chiều**: Luồng gió được thổi đều theo 4 hướng, phủ sóng toàn bộ không gian phòng, tránh hiện tượng gió tập trung gây khó chịu.
- **Thẩm mỹ cao**: Lắp đặt âm trần, chỉ lộ mặt panel phẳng, giữ tính thẩm mỹ cho không gian nội thất.
- **Tiết kiệm không gian**: Không chiếm diện tích tường hay sàn, phù hợp cho các không gian thương mại đông người.
- **Công nghệ Inverter**: Tiết kiệm đến 40% điện năng so với máy thường, hoạt động êm ái.

## Khi nào nên chọn điều hòa cassette?

Máy điều hòa cassette phù hợp nhất cho:
- Văn phòng công ty, phòng họp
- Nhà hàng, quán cafe, cửa hàng
- Trung tâm thương mại, showroom
- Phòng khám, bệnh viện
- Khu vực tiếp khách của nhà máy

## Quy trình lắp đặt của chúng tôi

1. **Khảo sát thực tế**: Đội ngũ kỹ thuật đến tận nơi đo đạc, đánh giá nhu cầu làm mát.
2. **Tư vấn & báo giá**: Đề xuất mẫu máy phù hợp từ các hãng uy tín, báo giá chi tiết.
3. **Lắp đặt chuyên nghiệp**: Thi công đúng kỹ thuật, đảm bảo thẩm mỹ đường ống.
4. **Nghiệm thu & bàn giao**: Vận hành thử, hướng dẫn sử dụng, bàn giao giấy tờ bảo hành.

Liên hệ chúng tôi để được tư vấn và lắp đặt máy điều hòa cassette với giá tốt nhất tại Đà Nẵng.`,
    relatedSlugs: ['mieng-gio-4-huong', 'gia-cong-ong-gio-phu-kien', 'thi-cong-he-thong-ong-gio'],
  },
  {
    slug: 'mieng-gio-4-huong',
    title: 'Miệng Gió 4 Hướng',
    badge: 'Phụ kiện & Phân phối',
    shortDesc: 'Cung cấp miệng gió 4 hướng dạng âm trần, phân phối luồng không khí đều theo 4 chiều. Sản phẩm làm từ nhôm sơn tĩnh điện trắng.',
    imageUrl: '/mieng-gio-4-huong.png',
    images: ['/mieng-gio-4-huong.png'],
    price: 'Liên hệ báo giá theo kích thước',
    installNote: 'Tương thích với hệ thống điều hoà trung tâm và thông gió',
    specs: [
      { label: 'Vật liệu', value: 'Nhôm sơn tĩnh điện trắng' },
      { label: 'Kích thước', value: '300x300 đến 600x600mm' },
      { label: 'Phân phối gió', value: 'Đồng đều 4 hướng' },
      { label: 'Lắp đặt', value: 'Trần thạch cao / trần nhôm' },
      { label: 'Xuất xứ', value: 'Sản phẩm chất lượng cao' },
      { label: 'Ứng dụng', value: 'Văn phòng, thương mại, dân dụng' },
    ],
    highlights: [
      'Nhôm sơn tĩnh điện trắng, bền đẹp lâu dài',
      'Phân phối gió đều 4 hướng, không gây khó chịu',
      'Nhiều kích thước từ 300x300 đến 600x600mm',
      'Lắp đặt dễ dàng trên trần thạch cao hoặc trần nhôm',
    ],
    description: `Miệng gió 4 hướng (còn gọi là diffuser 4 chiều) là phụ kiện quan trọng trong hệ thống điều hòa không khí và thông gió. Sản phẩm được lắp đặt trên trần nhà để phân phối luồng không khí lạnh hoặc gió tươi đều theo 4 hướng, đảm bảo nhiệt độ đồng đều trong phòng.

## Đặc điểm cấu tạo

Miệng gió 4 hướng có cấu tạo gồm:
- **Khung viền ngoài**: Làm từ nhôm đúc hoặc nhôm tấm, sơn tĩnh điện trắng bền đẹp.
- **Lá gió điều chỉnh**: 4 bộ lá gió có thể điều chỉnh góc hướng gió theo ý muốn.
- **Hộp gió kết nối**: Kết nối với ống gió mềm hoặc ống gió cứng từ hệ thống.

## Kích thước phổ biến

| Kích thước | Lưu lượng gió | Ứng dụng |
|-----------|--------------|----------|
| 300x300mm | 200–400 m³/h | Phòng nhỏ, phòng ngủ |
| 400x400mm | 400–600 m³/h | Văn phòng, phòng họp |
| 500x500mm | 600–900 m³/h | Sảnh lớn, cửa hàng |
| 600x600mm | 900–1200 m³/h | Nhà hàng, trung tâm TM |

## Hướng dẫn chọn miệng gió phù hợp

- Xác định lưu lượng gió cần thiết cho từng phòng.
- Chọn kích thước miệng gió tương ứng với lưu lượng.
- Đảm bảo khoảng cách giữa các miệng gió theo tiêu chuẩn.
- Kiểm tra tương thích với kiểu trần nhà (thạch cao, nhôm, gỗ).

Cường Thông Gió cung cấp đầy đủ các kích thước miệng gió 4 hướng chất lượng cao, giao hàng nhanh tại Đà Nẵng và các tỉnh Miền Trung.`,
    relatedSlugs: ['may-dieu-hoa-cassette', 'vcd-vuong-truc-vit', 'gia-cong-ong-gio-phu-kien'],
  },
  {
    slug: 'vcd-vuong-truc-vit',
    title: 'VCD Vuông Trục Vít',
    badge: 'Van điều tiết gió',
    shortDesc: 'Van điều tiết lưu lượng VCD dạng vuông cơ cấu trục vít, dùng để điều chỉnh và cân bằng lưu lượng gió trong hệ thống ống gió.',
    imageUrl: '/vcd-vuong-truc-vit.png',
    images: ['/vcd-vuong-truc-vit.png'],
    price: 'Liên hệ báo giá theo kích thước',
    installNote: 'Phù hợp ống gió vuông tiêu chuẩn SMACNA',
    specs: [
      { label: 'Vật liệu', value: 'Tôn mạ kẽm dày 1.0mm' },
      { label: 'Kích thước', value: 'Theo yêu cầu thực tế' },
      { label: 'Cơ cấu', value: 'Điều chỉnh trục vít chắc chắn' },
      { label: 'Tiêu chuẩn', value: 'SMACNA' },
      { label: 'Chức năng', value: 'Điều chỉnh & cân bằng lưu lượng gió' },
      { label: 'Ứng dụng', value: 'Hệ thống ống gió vuông' },
    ],
    highlights: [
      'Tôn mạ kẽm dày 1.0mm, chịu lực tốt',
      'Cơ cấu trục vít chắc chắn, điều chỉnh chính xác',
      'Sản xuất theo kích thước yêu cầu thực tế',
      'Đạt tiêu chuẩn ống gió vuông SMACNA',
    ],
    description: `Van điều tiết lưu lượng VCD (Volume Control Damper) dạng vuông với cơ cấu trục vít là thiết bị quan trọng trong hệ thống ống gió, giúp điều chỉnh và cân bằng lưu lượng không khí đi qua từng nhánh ống gió.

## Chức năng và vai trò

VCD vuông trục vít có các chức năng chính:
- **Điều chỉnh lưu lượng gió**: Cho phép tăng/giảm lưu lượng gió đi qua từng nhánh ống gió theo nhu cầu.
- **Cân bằng hệ thống**: Đảm bảo phân phối gió đều đặn giữa các khu vực, tránh tình trạng một nơi quá nhiều gió, nơi khác thiếu gió.
- **Tiết kiệm năng lượng**: Khi điều chỉnh đúng, hệ thống vận hành hiệu quả hơn, giảm tải cho quạt và tiết kiệm điện.

## Cấu tạo

- **Khung van**: Tôn mạ kẽm dày 1.0mm, chịu lực tốt, chống rỉ sét.
- **Lá van (blade)**: Dạng tấm phẳng hoặc dạng nhiều lá, xoay quanh trục để thay đổi tiết diện đường gió.
- **Cơ cấu trục vít**: Cho phép điều chỉnh vị trí lá van chính xác, giữ nguyên vị trí nhờ lực ma sát trục vít.

## Lưu ý khi lắp đặt

- Lắp VCD ở vị trí dễ tiếp cận để thuận tiện điều chỉnh sau khi nghiệm thu.
- Đảm bảo hướng lá van phù hợp với hướng gió.
- Kiểm tra kín khít giữa VCD và ống gió để tránh rò rỉ.
- Sau khi lắp đặt xong toàn bộ hệ thống, tiến hành cân bằng gió bằng cách đo lưu lượng tại từng miệng gió và điều chỉnh VCD tương ứng.

Cường Thông Gió sản xuất VCD vuông trục vít theo kích thước yêu cầu, đạt tiêu chuẩn SMACNA, giao hàng nhanh tại Đà Nẵng.`,
    relatedSlugs: ['mieng-gio-4-huong', 'gia-cong-ong-gio-phu-kien', 'thi-cong-he-thong-ong-gio'],
  },
  {
    slug: 'thi-cong-he-thong-ong-gio',
    title: 'Thi Công Hệ Thống Ống Gió Tại Công Trường',
    badge: 'Thi công trực tiếp',
    shortDesc: 'Đội ngũ kỹ thuật của chúng tôi trực tiếp lắp đặt hệ thống ống gió tại công trình nhà máy, kho xưởng và toà nhà thương mại.',
    imageUrl: '/he-thong-ong-gio-cong-truong.png',
    images: [
      '/he-thong-ong-gio-cong-truong.png',
      '/ong-gio-cong-truong-1.png',
      '/ong-gio-cong-truong-2.png',
      '/ong-gio-cong-truong-3.png',
      '/ong-gio-cong-truong-4.png',
      '/ong-gio-cong-truong-5.png',
      '/ong-gio-cong-truong-6.png',
    ],
    price: 'Báo giá theo diện tích & phạm vi công trình',
    installNote: 'Thi công đúng tiến độ, nghiệm thu thực tế',
    specs: [
      { label: 'Bọc cách nhiệt', value: 'Bông thủy tinh tiêu chuẩn' },
      { label: 'Thiết kế', value: 'Theo bản vẽ ME' },
      { label: 'Tiến độ', value: 'Đúng cam kết' },
      { label: 'Nghiệm thu', value: 'Đo đạc thực tế tại công trình' },
      { label: 'Phạm vi', value: 'Nhà máy, kho lạnh, toà nhà' },
      { label: 'Bảo hành', value: '12 tháng thi công' },
    ],
    highlights: [
      'Ống gió bọc bông thủy tinh cách nhiệt đúng tiêu chuẩn',
      'Lắp đặt theo bản vẽ thiết kế ME chuyên nghiệp',
      'Thi công đúng tiến độ, nghiệm thu thực tế bằng thiết bị đo',
      'Phù hợp nhà máy, kho lạnh, toà nhà thương mại',
    ],
    description: `Thi công hệ thống ống gió là một trong những dịch vụ cốt lõi của Cường Thông Gió. Với đội ngũ kỹ thuật viên giàu kinh nghiệm và trang thiết bị hiện đại, chúng tôi đảm bảo mọi hệ thống ống gió được lắp đặt chính xác, đúng tiến độ và đạt hiệu suất tối ưu.

## Quy trình thi công

### 1. Tiếp nhận bản vẽ ME
- Nghiên cứu bản vẽ thiết kế cơ điện (ME) từ đơn vị tư vấn.
- Đánh giá khối lượng vật tư, nhân công cần thiết.
- Lên kế hoạch thi công chi tiết theo từng giai đoạn.

### 2. Gia công tại xưởng
- Ống gió được gia công tại xưởng KCN Hòa Khánh bằng máy cắt Plasma CNC.
- Kiểm tra kích thước và chất lượng mối ghép trước khi vận chuyển.

### 3. Thi công tại công trường
- Lắp đặt hệ thống treo, giá đỡ theo vị trí thiết kế.
- Gắn ống gió, kết nối các đoạn và phụ kiện.
- Bọc cách nhiệt bông thủy tinh theo tiêu chuẩn.
- Lắp đặt miệng gió, VCD, van chặn lửa.

### 4. Nghiệm thu & bàn giao
- Đo lưu lượng gió tại từng miệng gió bằng thiết bị chuyên dụng.
- Cân bằng hệ thống, điều chỉnh VCD.
- Bàn giao hồ sơ hoàn công, chế độ bảo hành.

## Năng lực thi công

Chúng tôi đã hoàn thành hơn 2.145 dự án thi công ống gió trên khắp Đà Nẵng và Miền Trung, từ nhà máy nhỏ đến các công trình công nghiệp quy mô lớn. Đội ngũ 30+ kỹ thuật viên sẵn sàng triển khai nhanh chóng.`,
    relatedSlugs: ['gia-cong-ong-gio-phu-kien', 'quat-ly-tam-cong-nghiep', 'vcd-vuong-truc-vit'],
  },
  {
    slug: 'gia-cong-ong-gio-phu-kien',
    title: 'Gia Công Ống Gió & Phụ Kiện',
    badge: 'Cơ khí chính xác',
    shortDesc: 'Sở hữu dây chuyền cắt Plasma CNC hiện đại, chúng tôi sản xuất ống gió vuông, tròn xoắn theo tiêu chuẩn quốc tế (SMACNA).',
    imageUrl: '/ong-gio-phu-kien.png',
    images: ['/ong-gio-phu-kien.png'],
    price: 'Báo giá theo bản vẽ & khối lượng',
    installNote: 'Sản xuất nhanh, giao hàng tận công trình',
    specs: [
      { label: 'Vật liệu', value: 'Tôn mạ kẽm 0.48 – 1.15mm' },
      { label: 'Cửa gió', value: 'Nhôm sơn tĩnh điện' },
      { label: 'Tiêu chuẩn', value: 'SMACNA quốc tế' },
      { label: 'Công nghệ', value: 'Cắt Plasma CNC' },
      { label: 'Kết nối', value: 'Kín khít, giảm tổn thất áp' },
      { label: 'Giao hàng', value: 'Nhanh, tận công trình' },
    ],
    highlights: [
      'Dây chuyền cắt Plasma CNC hiện đại, chính xác cao',
      'Tôn mạ kẽm dày 0.48 – 1.15mm đạt chuẩn',
      'Cửa gió nhôm sơn tĩnh điện cao cấp',
      'Kết nối kín khít, giảm tổn thất áp suất tối đa',
    ],
    description: `Cường Thông Gió sở hữu xưởng gia công ống gió quy mô tại KCN Hòa Khánh, Đà Nẵng, trang bị dây chuyền cắt Plasma CNC hiện đại. Chúng tôi sản xuất đầy đủ các loại ống gió vuông, tròn xoắn và phụ kiện theo tiêu chuẩn quốc tế SMACNA.

## Sản phẩm ống gió chính

### Ống gió vuông
- Vật liệu: Tôn mạ kẽm dày 0.48 – 1.15mm tùy kích thước.
- Mối ghép: Mặt bích TDC/TDF hoặc mặt bích góc L.
- Cách nhiệt: Bọc bông thủy tinh + aluminium foil khi cần.

### Ống gió tròn xoắn (spiral duct)
- Ưu điểm: Kín khít hơn ống vuông, tổn thất áp suất thấp hơn.
- Đường kính: Từ Ø100mm đến Ø1500mm.
- Phù hợp cho hệ thống thông gió dân dụng và thương mại.

### Phụ kiện ống gió
- **Co (elbow)**: 90°, 45°, bo tròn hoặc nhiều khúc.
- **Tê (tee)**: Chia nhánh ống gió vuông/tròn.
- **Cút chuyển (reducer)**: Chuyển đổi kích thước ống gió.
- **Van VCD**: Điều tiết lưu lượng gió.
- **Van chặn lửa (FD)**: Tự đóng tại 72°C, tiêu chuẩn PCCC.

## Tiêu chuẩn SMACNA

Tất cả ống gió của Cường Thông Gió được sản xuất theo tiêu chuẩn SMACNA (Sheet Metal and Air Conditioning Contractors' National Association):
- Độ dày tôn theo kích thước ống gió chuẩn.
- Khoảng cách mặt bích & thanh gia cường đúng quy cách.
- Kín khít tại các mối ghép, giảm thiểu rò rỉ gió.

## Tại sao chọn Cường Thông Gió?

- Xưởng sản xuất tại KCN Hòa Khánh — giao hàng nhanh khu vực Đà Nẵng.
- Máy cắt Plasma CNC — đảm bảo chính xác kích thước.
- Đội ngũ thợ lành nghề — kinh nghiệm 13+ năm.
- Giá cạnh tranh — mua tận gốc tôn mạ kẽm.`,
    relatedSlugs: ['thi-cong-he-thong-ong-gio', 'vcd-vuong-truc-vit', 'mieng-gio-4-huong'],
  },
];

export function getProductBySlug(slug: string): ProductDetailData | undefined {
  return productsDetailList.find(p => p.slug === slug);
}

export function getRelatedProducts(slugs: string[]): ProductDetailData[] {
  return slugs.map(s => productsDetailList.find(p => p.slug === s)).filter(Boolean) as ProductDetailData[];
}
