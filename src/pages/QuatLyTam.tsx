import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Variants } from 'framer-motion'
import { Button } from '../components/ui/Button'
import {
  SEO,
  makeBreadcrumbSchema,
  makeFAQSchema,
  makeServiceSchema,
} from '../components/SEO'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const faqs = [
  {
    question: 'Quạt ly tâm công nghiệp là gì và hoạt động theo nguyên lý nào?',
    answer:
      'Quạt ly tâm (centrifugal fan) là loại quạt sử dụng lực ly tâm để tăng áp suất và đẩy dòng khí. Không khí được hút vào tâm cánh quạt (impeller) qua miệng hút, sau đó được các cánh quạt quay tốc độ cao gia tốc và đẩy ra theo phương vuông góc với trục quay — tức hướng kính (radial direction). Nhờ cấu trúc vỏ xoắn ốc (scroll housing), động năng của dòng khí được chuyển hóa thành áp suất tĩnh, cho phép quạt ly tâm tạo ra áp suất cao hơn nhiều so với quạt hướng trục cùng công suất.',
  },
  {
    question: 'Quạt ly tâm áp thấp, áp trung và áp cao khác nhau như thế nào?',
    answer:
      'Sự khác biệt nằm ở dải áp suất tĩnh mà quạt tạo ra: Quạt áp thấp (low pressure) có áp suất dưới 1.000 Pa, sử dụng cánh cong về phía trước (forward-curved), phù hợp cho thông gió chung và HVAC. Quạt áp trung (medium pressure) từ 1.000–3.000 Pa, dùng cánh cong về phía sau (backward-curved), hiệu suất cao, phổ biến trong công nghiệp. Quạt áp cao (high pressure) trên 3.000 Pa, dùng cánh hướng kính (radial blade) hoặc cánh đặc biệt, ứng dụng cho hệ thống hút bụi, vận chuyển vật liệu khí nén, và lò đốt công nghiệp.',
  },
  {
    question: 'Cân bằng động cánh quạt ly tâm là gì và tại sao quan trọng?',
    answer:
      'Cân bằng động (dynamic balancing) là quá trình loại bỏ sự mất cân bằng khối lượng trên cánh quạt (impeller) khi quay ở tốc độ vận hành thực tế. Nếu impeller bị lệch tâm dù chỉ 0.1g, ở tốc độ 2.900 RPM sẽ tạo ra lực rung hàng trăm Newton, gây tiếng ồn, mài mòn ổ bi nhanh gấp 3-5 lần, và giảm tuổi thọ quạt đáng kể. Cường Thông Gió sử dụng máy cân bằng động chuyên dụng, đạt độ chính xác ISO 1940 Grade G6.3 hoặc G2.5, đảm bảo quạt vận hành êm ái và bền bỉ suốt vòng đời sản phẩm.',
  },
  {
    question: 'Nên chọn quạt ly tâm hay quạt hướng trục cho nhà xưởng?',
    answer:
      'Lựa chọn phụ thuộc vào yêu cầu hệ thống: Quạt hướng trục phù hợp khi cần lưu lượng gió lớn nhưng áp suất thấp (dưới 300 Pa), ví dụ thông gió tự nhiên nhà xưởng, quạt gắn tường. Quạt ly tâm là lựa chọn bắt buộc khi hệ thống có tổn thất áp suất lớn — đường ống dài, nhiều co cua, bộ lọc, thiết bị xử lý. Đối với hệ thống hút bụi, xử lý khí thải, cấp gió lò đốt, quạt ly tâm là phương án duy nhất đảm bảo hiệu quả.',
  },
  {
    question: 'Giá quạt ly tâm công nghiệp tại Cường Thông Gió khoảng bao nhiêu?',
    answer:
      'Giá quạt ly tâm phụ thuộc vào công suất, áp suất, vật liệu và yêu cầu đặc biệt. Quạt ly tâm áp thấp từ 3.500.000 – 15.000.000 VNĐ. Quạt áp trung từ 8.000.000 – 35.000.000 VNĐ. Quạt áp cao từ 15.000.000 – 65.000.000 VNĐ trở lên. Do sản xuất trực tiếp tại xưởng, giá của chúng tôi thấp hơn 15-25% so với các đại lý nhập khẩu hoặc trung gian, đồng thời hỗ trợ bảo hành và sửa chữa tận nơi.',
  },
  {
    question: 'Quạt ly tâm của Cường Thông Gió được sản xuất từ vật liệu gì?',
    answer:
      'Chúng tôi sử dụng 3 nhóm vật liệu chính: (1) Thép CT3 sơn tĩnh điện — phổ biến nhất, chịu lực tốt, chi phí hợp lý, phù hợp cho hầu hết ứng dụng công nghiệp; (2) Inox 304/316 — chống ăn mòn hoá chất, chịu nhiệt đến 800°C, bắt buộc cho ngành thực phẩm, dược phẩm, hoá chất; (3) Thép chịu mài mòn Hardox — dùng cho quạt hút bụi, vận chuyển vật liệu có tính mài mòn cao. Trục quạt sử dụng thép C45 nhiệt luyện, ổ bi SKF/NSK chính hãng.',
  },
  {
    question: 'Thời gian sản xuất quạt ly tâm theo đơn đặt hàng mất bao lâu?',
    answer:
      'Thời gian sản xuất phụ thuộc vào kích thước và độ phức tạp: Quạt ly tâm công suất nhỏ (dưới 5.5 kW) hoàn thành trong 5-7 ngày làm việc. Quạt công suất trung bình (5.5–37 kW) từ 7-12 ngày. Quạt công suất lớn (trên 37 kW) hoặc quạt đặc biệt (chịu nhiệt, chống ăn mòn) từ 12-20 ngày. Chúng tôi luôn xác nhận tiến độ chính xác trong bản báo giá và cập nhật cho khách hàng trong quá trình sản xuất.',
  },
  {
    question: 'Cường Thông Gió có cung cấp dịch vụ bảo trì và sửa chữa quạt ly tâm không?',
    answer:
      'Có. Chúng tôi cung cấp dịch vụ bảo trì định kỳ và sửa chữa khẩn cấp cho tất cả các loại quạt ly tâm — kể cả quạt do đơn vị khác sản xuất. Dịch vụ bao gồm: thay ổ bi, cân bằng động lại impeller, thay trục quạt, sửa vỏ xoắn ốc, thay cánh quạt, và kiểm tra độ rung bằng thiết bị đo chuyên dụng. Bảo hành quạt do Cường Thông Gió sản xuất: 18 tháng cho toàn bộ sản phẩm.',
  },
]

const fanTypes = [
  {
    title: 'Quạt Ly Tâm Áp Thấp (Low Pressure)',
    tag: 'Áp suất < 1.000 Pa',
    desc: 'Quạt ly tâm áp thấp sử dụng cánh cong về phía trước (forward-curved blade), tạo lưu lượng gió lớn với áp suất vừa phải. Thiết kế cánh quạt dạng lồng sóc (squirrel cage) với 36-64 cánh mỏng, tốc độ quay thấp nên vận hành êm ái. Phù hợp cho hệ thống HVAC thương mại, thông gió nhà xưởng nhẹ, và hệ thống điều hòa không khí. Hiệu suất quạt đạt 60-70%, kích thước nhỏ gọn hơn so với quạt cánh cong sau cùng công suất.',
    specs: ['Áp suất: 100 – 1.000 Pa', 'Lưu lượng: 500 – 50.000 m³/h', 'Cánh: Forward-Curved (FC)', 'Hiệu suất: 60 – 70%'],
  },
  {
    title: 'Quạt Ly Tâm Áp Trung (Medium Pressure)',
    tag: 'Áp suất 1.000 – 3.000 Pa',
    desc: 'Quạt ly tâm áp trung dùng cánh cong về phía sau (backward-curved/backward-inclined blade), số cánh từ 8-16 cánh dày. Đây là loại quạt có hiệu suất cao nhất trong các loại quạt ly tâm, đạt 80-88%. Cánh cong sau có đặc tính tự giới hạn công suất (non-overloading), tức khi lưu lượng tăng thì công suất tiêu thụ không tăng vượt quá giá trị thiết kế — rất an toàn cho motor. Ứng dụng rộng rãi trong hút khói bếp công nghiệp, hệ thống xử lý khí thải, và cấp gió cho lò sấy.',
    specs: ['Áp suất: 1.000 – 3.000 Pa', 'Lưu lượng: 1.000 – 80.000 m³/h', 'Cánh: Backward-Curved (BC)', 'Hiệu suất: 80 – 88%'],
  },
  {
    title: 'Quạt Ly Tâm Áp Cao (High Pressure)',
    tag: 'Áp suất > 3.000 Pa',
    desc: 'Quạt ly tâm áp cao sử dụng cánh hướng kính (radial blade) hoặc cánh đặc biệt (airfoil), số cánh 6-12 cánh cực dày và chắc chắn. Thiết kế chịu được áp suất lớn, có thể vận chuyển dòng khí chứa bụi, mảnh vụn và vật liệu hạt. Cánh hướng kính có khả năng tự làm sạch (self-cleaning), hạn chế bám bụi khi vận hành. Ứng dụng chủ yếu trong hệ thống hút bụi công nghiệp, vận chuyển vật liệu bằng khí nén (pneumatic conveying), cấp gió cho lò đốt, lò nung xi măng, và các hệ thống cần áp suất trên 5.000 Pa.',
    specs: ['Áp suất: 3.000 – 15.000+ Pa', 'Lưu lượng: 500 – 40.000 m³/h', 'Cánh: Radial / Airfoil', 'Hiệu suất: 55 – 75%'],
  },
  {
    title: 'Quạt Ly Tâm Hai Cửa Hút (Double Inlet)',
    tag: 'Lưu lượng gấp đôi',
    desc: 'Quạt ly tâm hai cửa hút (DIDW — Double Inlet Double Width) có impeller rộng gấp đôi và hai miệng hút đối xứng hai bên. Thiết kế này cho phép tăng gấp đôi lưu lượng gió mà không cần tăng đường kính cánh quạt, giữ nguyên tốc độ quay và áp suất. Quạt DIDW phù hợp cho các hệ thống AHU (Air Handling Unit), máy xử lý không khí, hệ thống HVAC công suất lớn trong tòa nhà cao tầng và trung tâm thương mại. Vỏ quạt thiết kế đối xứng giúp giảm rung động và tiếng ồn.',
    specs: ['Áp suất: 200 – 2.500 Pa', 'Lưu lượng: 2.000 – 120.000 m³/h', 'Cấu hình: DIDW (Double Inlet)', 'Ứng dụng: AHU, HVAC lớn'],
  },
]

const comparisonData = [
  { criteria: 'Hướng dòng khí', centrifugal: 'Vuông góc với trục (hướng kính)', axial: 'Song song với trục' },
  { criteria: 'Áp suất tĩnh', centrifugal: 'Cao (500 – 15.000+ Pa)', axial: 'Thấp (50 – 500 Pa)' },
  { criteria: 'Lưu lượng gió', centrifugal: 'Trung bình – Cao', axial: 'Rất cao' },
  { criteria: 'Hiệu suất', centrifugal: '55 – 88%', axial: '65 – 80%' },
  { criteria: 'Kích thước', centrifugal: 'Lớn (do vỏ xoắn ốc)', axial: 'Nhỏ gọn (dạng ống)' },
  { criteria: 'Tiếng ồn', centrifugal: 'Thấp – Trung bình', axial: 'Trung bình – Cao' },
  { criteria: 'Chịu bụi', centrifugal: 'Tốt (cánh radial tự làm sạch)', axial: 'Kém (bụi bám cánh)' },
  { criteria: 'Ứng dụng chính', centrifugal: 'Hệ thống ống gió, xử lý khí thải, hút bụi', axial: 'Thông gió trực tiếp, tản nhiệt, quạt trần' },
  { criteria: 'Chi phí', centrifugal: 'Cao hơn 30-50%', axial: 'Thấp hơn' },
]

const specsData = [
  { model: 'CTG-FC-300', type: 'Áp thấp (FC)', flow: '1.500 – 3.000', pressure: '150 – 400', power: '0.75 – 1.5', rpm: '1.450', diameter: 'Ø300mm' },
  { model: 'CTG-FC-500', type: 'Áp thấp (FC)', flow: '3.000 – 8.000', pressure: '200 – 600', power: '1.5 – 3.0', rpm: '1.450', diameter: 'Ø500mm' },
  { model: 'CTG-BC-400', type: 'Áp trung (BC)', flow: '2.000 – 6.000', pressure: '800 – 1.800', power: '2.2 – 5.5', rpm: '2.900', diameter: 'Ø400mm' },
  { model: 'CTG-BC-630', type: 'Áp trung (BC)', flow: '5.000 – 15.000', pressure: '1.200 – 2.500', power: '5.5 – 15', rpm: '1.450', diameter: 'Ø630mm' },
  { model: 'CTG-BC-800', type: 'Áp trung (BC)', flow: '10.000 – 30.000', pressure: '1.500 – 3.000', power: '15 – 37', rpm: '1.450', diameter: 'Ø800mm' },
  { model: 'CTG-RB-400', type: 'Áp cao (Radial)', flow: '1.000 – 4.000', pressure: '2.500 – 5.000', power: '3.0 – 7.5', rpm: '2.900', diameter: 'Ø400mm' },
  { model: 'CTG-RB-630', type: 'Áp cao (Radial)', flow: '3.000 – 10.000', pressure: '3.500 – 8.000', power: '7.5 – 22', rpm: '2.900', diameter: 'Ø630mm' },
  { model: 'CTG-RB-800', type: 'Áp cao (Radial)', flow: '5.000 – 20.000', pressure: '5.000 – 12.000', power: '22 – 55', rpm: '1.450', diameter: 'Ø800mm' },
]

const pricingData = [
  { type: 'Quạt ly tâm áp thấp 0.75 kW', material: 'Thép CT3 sơn tĩnh điện', price: '3.500.000 – 5.500.000' },
  { type: 'Quạt ly tâm áp thấp 2.2 kW', material: 'Thép CT3 sơn tĩnh điện', price: '6.000.000 – 9.500.000' },
  { type: 'Quạt ly tâm áp trung 3.0 kW', material: 'Thép CT3 sơn tĩnh điện', price: '8.000.000 – 13.000.000' },
  { type: 'Quạt ly tâm áp trung 7.5 kW', material: 'Thép CT3 sơn tĩnh điện', price: '14.000.000 – 22.000.000' },
  { type: 'Quạt ly tâm áp trung 15 kW', material: 'Thép CT3 sơn tĩnh điện', price: '22.000.000 – 35.000.000' },
  { type: 'Quạt ly tâm áp cao 5.5 kW', material: 'Thép CT3 / Hardox', price: '15.000.000 – 25.000.000' },
  { type: 'Quạt ly tâm áp cao 22 kW', material: 'Thép CT3 / Hardox', price: '30.000.000 – 48.000.000' },
  { type: 'Quạt ly tâm Inox 304 (tuỳ CS)', material: 'Inox SUS 304', price: 'Giá thép CT3 + 40-60%' },
]

const processSteps = [
  { step: '01', title: 'Khảo sát & Tư vấn kỹ thuật', desc: 'Đội ngũ kỹ sư khảo sát thực tế tại nhà xưởng, đo đạc thông số hệ thống (đường ống, tổn thất áp suất, nhiệt độ, tính chất khí). Tính toán lưu lượng và áp suất yêu cầu, tư vấn loại quạt ly tâm phù hợp nhất về kỹ thuật và chi phí.' },
  { step: '02', title: 'Thiết kế & Chọn điểm làm việc', desc: 'Thiết kế quạt ly tâm dựa trên đường đặc tính (performance curve) — xác định điểm làm việc tối ưu (BEP — Best Efficiency Point). Lập bản vẽ kỹ thuật chi tiết: kích thước impeller, góc cánh, vỏ xoắn ốc, bệ đỡ, khớp nối trục và motor.' },
  { step: '03', title: 'Gia công & Chế tạo tại xưởng', desc: 'Cắt tôn/thép CNC, hàn vỏ xoắn ốc và impeller trên bàn gá chuyên dụng. Gia công trục quạt trên máy tiện CNC, dung sai ±0.02mm. Lắp ráp ổ bi SKF/NSK, kiểm tra đồng tâm trục-impeller bằng đồng hồ so.' },
  { step: '04', title: 'Cân bằng động & Kiểm tra', desc: 'Cân bằng động impeller trên máy chuyên dụng theo tiêu chuẩn ISO 1940 (G6.3 hoặc G2.5). Chạy thử tải tại xưởng: đo lưu lượng, áp suất, cường độ dòng điện, độ rung và tiếng ồn. Xuất biên bản kiểm tra chất lượng.' },
  { step: '05', title: 'Giao hàng & Lắp đặt vận hành', desc: 'Đóng gói chuyên dụng, vận chuyển đến công trình. Lắp đặt quạt trên bệ đỡ/khung giảm chấn, kết nối với hệ thống ống gió và motor điện. Chạy thử toàn hệ thống, hiệu chỉnh và bàn giao kèm hồ sơ kỹ thuật đầy đủ.' },
]

const applications = [
  { title: 'Hút khói bếp công nghiệp', desc: 'Quạt ly tâm áp trung hút khói dầu mỡ từ hệ thống hood, đẩy qua bộ lọc tĩnh điện (ESP) và ống khói thải. Vật liệu inox 304 chịu nhiệt, chống bám dầu, dễ vệ sinh. Áp suất đủ lớn để thắng tổn thất qua hệ thống lọc và đường ống dài.' },
  { title: 'Hệ thống hút bụi công nghiệp', desc: 'Quạt ly tâm áp cao cánh radial hút bụi gỗ, bụi kim loại, bụi xi măng từ dây chuyền sản xuất. Cánh hướng kính tự làm sạch, chống bám bụi. Vỏ quạt và impeller bằng thép chịu mài mòn Hardox cho tuổi thọ gấp 3-5 lần thép thường.' },
  { title: 'Xử lý khí thải nhà máy', desc: 'Quạt ly tâm đẩy khí thải qua tháp xử lý (wet scrubber, tháp hấp phụ than hoạt tính). Vật liệu inox 304/316 chống ăn mòn hóa chất (H₂S, SO₂, NH₃). Thiết kế kín khít, không rò rỉ khí độc ra môi trường làm việc.' },
  { title: 'Cấp gió lò đốt & lò sấy', desc: 'Quạt ly tâm áp cao cung cấp gió sơ cấp và gió thứ cấp cho quá trình cháy trong lò hơi, lò đốt rác, lò nung gạch. Áp suất ổn định đảm bảo tỷ lệ gió/nhiên liệu chính xác, tối ưu hiệu suất đốt cháy và giảm phát thải.' },
  { title: 'Thông gió tầng hầm & PCCC', desc: 'Quạt ly tâm chịu nhiệt 300°C/2h dùng trong hệ thống hút khói PCCC tầng hầm theo QCVN 06:2022/BXD. Quạt được chứng nhận chịu lửa, motor đặt ngoài dòng khí nóng, đảm bảo hoạt động liên tục trong điều kiện cháy.' },
  { title: 'Hệ thống HVAC tòa nhà', desc: 'Quạt ly tâm DIDW lắp trong AHU (Air Handling Unit) và FCU (Fan Coil Unit), cung cấp gió điều hòa cho văn phòng, bệnh viện, khách sạn. Vận hành êm ái với mức ồn dưới 65 dBA, hiệu suất cao giúp tiết kiệm điện năng dài hạn.' },
]

export function QuatLyTam() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const breadcrumb = makeBreadcrumbSchema([
    { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
    { name: 'Quạt ly tâm công nghiệp', url: 'https://cuongthonggio.com/quat-ly-tam-cong-nghiep' },
  ])

  const faqSchema = makeFAQSchema(faqs)

  const serviceSchema = makeServiceSchema({
    name: 'Quạt Ly Tâm Công Nghiệp',
    description:
      'Sản xuất quạt ly tâm công nghiệp áp thấp, áp trung, áp cao tại xưởng Đà Nẵng. Vật liệu thép CT3, inox 304, Hardox. Cân bằng động ISO 1940. Bảo hành 18 tháng. Giao hàng toàn quốc.',
    areaServed: 'Đà Nẵng',
  })

  return (
    <div className="bg-white min-h-screen font-sans text-zinc-900">
      <SEO
        title="Quạt Ly Tâm Công Nghiệp — Sản Xuất Trực Tiếp Tại Xưởng"
        description="Sản xuất quạt ly tâm công nghiệp áp thấp, áp trung, áp cao tại Đà Nẵng. Cánh Forward-Curved, Backward-Curved, Radial. Cân bằng động ISO 1940. Bảo hành 18 tháng. Hotline 0905 001 224."
        keywords="quạt ly tâm công nghiệp, quạt ly tâm áp cao, quạt ly tâm áp trung, quạt ly tâm áp thấp, quạt ly tâm hút bụi, quạt ly tâm Đà Nẵng, quạt centrifugal fan, quạt hút khói bếp công nghiệp, quạt cấp gió lò đốt, sản xuất quạt ly tâm, cân bằng động cánh quạt, quạt ly tâm inox 304"
        structuredData={[breadcrumb, faqSchema, serviceSchema]}
        dateModified="2026-06-06"
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="pt-24 md:pt-28 pb-0 bg-white">
        <div className="container-custom">
          <ol className="flex items-center gap-2 text-xs text-zinc-400 font-medium" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" itemProp="item" className="hover:text-zinc-900 transition-colors">
                <span itemProp="name">Trang chủ</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-zinc-300">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-zinc-900 font-bold">Quạt ly tâm công nghiệp</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-24 bg-white overflow-hidden">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
            <motion.div variants={stagger} initial="hidden" animate="visible" className="flex flex-col items-center w-full">
              <motion.span variants={fadeUp} className="inline-block px-4 py-1 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
                Sản xuất trực tiếp tại xưởng
              </motion.span>
              <div className="mb-10 md:mb-12 max-w-6xl w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.1] text-center">
                  Quạt Ly Tâm Công Nghiệp<br />
                  <span className="text-zinc-400">Áp Thấp — Áp Trung — Áp Cao</span>
                </h1>
              </div>

              <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-500 mb-10 md:mb-14 leading-relaxed max-w-3xl font-normal px-4">
                Cường Thông Gió thiết kế và sản xuất quạt ly tâm công nghiệp tại xưởng Đà Nẵng — từ quạt áp thấp cho hệ thống HVAC đến quạt áp cao cho hút bụi và lò đốt. Cánh quạt cân bằng động theo ISO 1940, vỏ xoắn ốc gia công CNC chính xác, ổ bi SKF/NSK chính hãng. Bảo hành 18 tháng, giá xưởng không qua trung gian.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto px-6 mb-16">
                <Button asChild size="lg" className="w-full sm:w-auto min-w-[200px] px-8 font-bold text-sm h-14 rounded-full shadow-lg shadow-zinc-100 transition-all duration-300 bg-zinc-950 text-white hover:bg-zinc-800 uppercase tracking-widest whitespace-nowrap">
                  <Link to="/lien-he">Nhận báo giá trong 24h</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] px-8 font-bold text-sm h-14 rounded-full border-[2px] border-zinc-200 hover:border-zinc-950 hover:bg-zinc-50 transition-all duration-300 text-zinc-950 uppercase tracking-widest whitespace-nowrap">
                  <a href="tel:0905001224">Gọi: 0905 001 224</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-zinc-50 border-y border-zinc-100" aria-label="Thống kê năng lực sản xuất quạt ly tâm">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center w-full mx-auto max-w-5xl">
            {[
              { value: '13+', label: 'Năm kinh nghiệm' },
              { value: '500+', label: 'Quạt ly tâm đã sản xuất' },
              { value: 'ISO 1940', label: 'Cân bằng động' },
              { value: '18', label: 'Tháng bảo hành' },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center"
              >
                <div className="text-4xl md:text-5xl font-bold text-zinc-900 mb-2 tracking-tighter">{s.value}</div>
                <div className="text-[10px] md:text-xs font-bold text-zinc-400 uppercase tracking-widest">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 md:py-32 bg-white" aria-label="Giới thiệu quạt ly tâm công nghiệp">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-8 tracking-tight">
                Quạt ly tâm công nghiệp<br />
                <span className="text-zinc-400">— Nguyên lý và cấu tạo</span>
              </h2>
              <div className="prose prose-lg max-w-none text-zinc-600 leading-relaxed space-y-6">
                <p>
                  <strong className="text-zinc-800">Quạt ly tâm (centrifugal fan)</strong> là thiết bị cơ khí chuyển đổi năng lượng quay của motor điện thành động năng và áp suất cho dòng khí. Khác với quạt hướng trục (axial fan) đẩy gió thẳng theo trục quay, quạt ly tâm hút không khí vào tâm rồi đẩy ra theo phương hướng kính — vuông góc 90° với trục. Nhờ cơ chế này, quạt ly tâm có khả năng tạo áp suất tĩnh cao gấp 5-30 lần so với quạt hướng trục cùng kích thước, là lựa chọn bắt buộc cho mọi hệ thống có tổn thất áp suất lớn.
                </p>
                <p>
                  <strong className="text-zinc-800">Cấu tạo quạt ly tâm</strong> gồm 5 thành phần chính: (1) <strong className="text-zinc-800">Impeller (cánh quạt)</strong> — bộ phận quay tạo lực ly tâm, gồm đĩa trước (shroud), đĩa sau (backplate) và các cánh (blade) được hàn hoặc tán giữa hai đĩa; (2) <strong className="text-zinc-800">Vỏ xoắn ốc (scroll housing/volute)</strong> — thu nhận dòng khí từ impeller, chuyển hóa động năng thành áp suất tĩnh nhờ tiết diện tăng dần theo góc xoắn; (3) <strong className="text-zinc-800">Trục quạt (shaft)</strong> — thép C45 nhiệt luyện, truyền mô-men xoắn từ motor sang impeller; (4) <strong className="text-zinc-800">Ổ bi (bearing)</strong> — đỡ trục quay, chịu tải hướng kính và dọc trục, sử dụng ổ bi SKF/NSK chính hãng; (5) <strong className="text-zinc-800">Bệ đỡ và khung giảm chấn</strong> — hấp thụ rung động, cách ly dao động sang kết cấu công trình.
                </p>
                <p>
                  Tại Cường Thông Gió, chúng tôi <strong className="text-zinc-800">tự thiết kế và sản xuất 100% tại xưởng Đà Nẵng</strong> — từ việc cắt tôn, hàn vỏ xoắn ốc, gia công trục trên máy tiện CNC, đến cân bằng động impeller theo tiêu chuẩn quốc tế ISO 1940. Mỗi quạt ly tâm đều được chạy thử đầy đủ tại xưởng trước khi giao hàng: kiểm tra lưu lượng, áp suất, dòng điện, độ rung và mức ồn. Với 13+ năm kinh nghiệm và hơn 500 quạt ly tâm đã sản xuất, chúng tôi tự tin đáp ứng mọi yêu cầu từ quạt nhỏ 0.75 kW đến quạt lớn 55 kW trở lên.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fan Types Section */}
      <section className="py-20 md:py-32 bg-zinc-50" aria-label="Các loại quạt ly tâm">
        <div className="container-custom">
          <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Các loại quạt ly tâm sản xuất tại xưởng
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
              Cường Thông Gió sản xuất đầy đủ 4 dòng quạt ly tâm chính, phân loại theo dải áp suất và kiểu cánh, đáp ứng mọi nhu cầu từ thông gió HVAC đến hút bụi công nghiệp nặng.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-7xl mx-auto">
            {fanTypes.map((fan, i) => (
              <motion.article
                key={fan.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-[1.5rem] overflow-hidden border border-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col p-8 md:p-10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block px-3 py-1 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">{fan.tag}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4 tracking-tight leading-tight">{fan.title}</h3>
                <p className="text-zinc-500 text-sm md:text-base mb-8 leading-relaxed">{fan.desc}</p>
                <div className="space-y-3 mt-auto">
                  {fan.specs.map((spec) => (
                    <div key={spec} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 shrink-0" />
                      <span className="text-sm font-semibold text-zinc-700">{spec}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison: Centrifugal vs Axial */}
      <section className="py-20 md:py-32 bg-white" aria-label="So sánh quạt ly tâm và quạt hướng trục">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
                So sánh quạt ly tâm vs quạt hướng trục
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
                Hiểu rõ sự khác biệt giúp bạn chọn đúng loại quạt cho hệ thống, tối ưu hiệu suất và chi phí vận hành.
              </motion.p>
            </div>

            <div className="overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm bg-white max-w-5xl mx-auto">
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="bg-zinc-900 text-white">
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Tiêu chí</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Quạt Ly Tâm</th>
                    <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Quạt Hướng Trục</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {comparisonData.map((row) => (
                    <tr key={row.criteria} className="hover:bg-zinc-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-zinc-900">{row.criteria}</td>
                      <td className="px-6 py-4 text-zinc-600">{row.centrifugal}</td>
                      <td className="px-6 py-4 text-zinc-600">{row.axial}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto mt-12">
              <div className="bg-zinc-50 rounded-2xl p-8 md:p-10 border border-zinc-100">
                <h3 className="text-xl font-bold text-zinc-900 mb-4">Khi nào nên chọn quạt ly tâm?</h3>
                <div className="text-zinc-600 text-sm md:text-base leading-relaxed space-y-3">
                  <p>
                    Quạt ly tâm là lựa chọn bắt buộc trong các trường hợp: hệ thống có <strong className="text-zinc-800">đường ống dài trên 20m</strong>, có nhiều co cua và phụ kiện tạo tổn thất áp suất; hệ thống cần đẩy gió qua <strong className="text-zinc-800">thiết bị xử lý</strong> (bộ lọc HEPA, tháp scrubber, bộ trao đổi nhiệt); hệ thống <strong className="text-zinc-800">hút bụi và vận chuyển vật liệu</strong> bằng dòng khí; cấp gió cho <strong className="text-zinc-800">lò đốt, lò nung</strong> cần áp suất ổn định cao.
                  </p>
                  <p>
                    Ngược lại, nếu chỉ cần thông gió trực tiếp qua tường/mái (không có đường ống) với áp suất dưới 200 Pa, quạt hướng trục sẽ đơn giản và kinh tế hơn.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technical Specifications Table */}
      <section className="py-16 md:py-24 bg-zinc-50 border-y border-zinc-100" aria-label="Bảng thông số kỹ thuật quạt ly tâm">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
              Bảng thông số kỹ thuật quạt ly tâm
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto">
              Thông số tham khảo cho các model tiêu chuẩn. Quạt được thiết kế theo yêu cầu cụ thể của từng dự án.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm bg-white max-w-7xl mx-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  <th className="px-4 py-4 font-bold uppercase tracking-wider text-xs">Model</th>
                  <th className="px-4 py-4 font-bold uppercase tracking-wider text-xs">Phân loại</th>
                  <th className="px-4 py-4 font-bold uppercase tracking-wider text-xs">Lưu lượng (m³/h)</th>
                  <th className="px-4 py-4 font-bold uppercase tracking-wider text-xs">Áp suất (Pa)</th>
                  <th className="px-4 py-4 font-bold uppercase tracking-wider text-xs">Công suất (kW)</th>
                  <th className="px-4 py-4 font-bold uppercase tracking-wider text-xs">Tốc độ (RPM)</th>
                  <th className="px-4 py-4 font-bold uppercase tracking-wider text-xs">Đường kính</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {specsData.map((row) => (
                  <tr key={row.model} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-4 py-4 font-semibold text-zinc-900">{row.model}</td>
                    <td className="px-4 py-4 text-zinc-600">{row.type}</td>
                    <td className="px-4 py-4 text-zinc-600">{row.flow}</td>
                    <td className="px-4 py-4 text-zinc-600">{row.pressure}</td>
                    <td className="px-4 py-4 text-zinc-600">{row.power}</td>
                    <td className="px-4 py-4 text-zinc-600">{row.rpm}</td>
                    <td className="px-4 py-4 text-zinc-600">{row.diameter}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-zinc-400 mt-4 max-w-2xl mx-auto">
            * Thông số trên là giá trị tham khảo cho điều kiện tiêu chuẩn (20°C, 101.325 kPa). Giá trị thực tế thay đổi theo nhiệt độ, độ cao và mật độ khí. Liên hệ để nhận đường đặc tính chi tiết.
          </p>
        </div>
      </section>

      {/* Applications Section */}
      <section className="py-20 md:py-32 bg-white" aria-label="Ứng dụng quạt ly tâm trong công nghiệp">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-14 md:mb-20">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Ứng dụng quạt ly tâm trong công nghiệp
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
              Quạt ly tâm là thiết bị không thể thiếu trong hầu hết các hệ thống công nghiệp hiện đại — từ xử lý khí thải, hút bụi đến thông gió PCCC và HVAC.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {applications.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-zinc-50 rounded-2xl p-6 md:p-8 border border-zinc-100 hover:bg-white hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-zinc-900 mb-3">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Balancing Section */}
      <section className="py-20 md:py-32 bg-zinc-950 text-white" aria-label="Quy trình cân bằng động cánh quạt">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight leading-tight">
                  Cân bằng động cánh quạt<br />
                  <span className="text-zinc-500">— Tiêu chuẩn ISO 1940</span>
                </h2>
                <div className="space-y-6 text-zinc-400 leading-relaxed">
                  <p>
                    Cân bằng động (dynamic balancing) là công đoạn quan trọng nhất quyết định tuổi thọ và độ êm ái của quạt ly tâm. Khi impeller quay ở tốc độ cao (1.450 – 2.900 RPM), bất kỳ sự mất cân bằng khối lượng nào — dù chỉ vài gram — đều tạo ra lực ly tâm gây rung động, tiếng ồn, mài mòn ổ bi và thậm chí phá hủy trục quạt.
                  </p>
                  <p>
                    Tại Cường Thông Gió, mỗi impeller sau khi gia công đều được đặt lên máy cân bằng động chuyên dụng. Máy quay impeller ở tốc độ vận hành thực tế, cảm biến rung đo chính xác vị trí và khối lượng mất cân bằng trên cả hai mặt phẳng (two-plane balancing). Kỹ thuật viên gắn đối trọng hoặc mài bớt vật liệu tại vị trí cần thiết, lặp lại cho đến khi đạt tiêu chuẩn ISO 1940 Grade G6.3 (cho quạt thông thường) hoặc G2.5 (cho quạt yêu cầu độ chính xác cao). Kết quả cân bằng được ghi nhận vào biên bản kiểm tra giao cùng sản phẩm.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[
                  { label: 'ISO 1940', sub: 'Tiêu chuẩn cân bằng' },
                  { label: 'G2.5', sub: 'Độ chính xác cao nhất' },
                  { label: '2-Plane', sub: 'Cân bằng 2 mặt phẳng' },
                  { label: '100%', sub: 'Kiểm tra trước xuất' },
                ].map((item, i) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 text-center flex flex-col justify-center items-center hover:bg-white/10 transition-colors"
                  >
                    <div className="text-2xl md:text-3xl font-black text-white mb-2">{item.label}</div>
                    <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.sub}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="py-20 md:py-32 bg-white" aria-label="Vật liệu chế tạo quạt ly tâm">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-8 tracking-tight">
                  Vật liệu chế tạo quạt ly tâm<br />
                  <span className="text-zinc-400">bền bỉ — đúng ứng dụng</span>
                </h2>
                <div className="space-y-6 text-zinc-600 leading-relaxed">
                  <p>
                    Việc lựa chọn vật liệu chế tạo quạt ly tâm phụ thuộc vào môi trường vận hành: nhiệt độ, tính chất hoá học của khí, mức độ mài mòn và yêu cầu vệ sinh. Sai lầm phổ biến là sử dụng vật liệu không phù hợp, dẫn đến quạt bị ăn mòn, mài mòn nhanh, phải thay cánh hoặc thay quạt mới chỉ sau 6-12 tháng — lãng phí chi phí lớn.
                  </p>
                  <p>
                    Đội ngũ kỹ sư Cường Thông Gió sẽ tư vấn vật liệu tối ưu cho từng ứng dụng cụ thể, cân bằng giữa yêu cầu kỹ thuật và ngân sách đầu tư. Tất cả vật liệu đều có chứng nhận nguồn gốc, mill certificate và được kiểm tra trước khi đưa vào sản xuất.
                  </p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-6">
                {[
                  {
                    title: 'Thép CT3 Sơn Tĩnh Điện',
                    desc: 'Vật liệu phổ biến nhất, độ bền cơ học cao, chi phí hợp lý. Lớp sơn tĩnh điện chống gỉ, chịu thời tiết. Phù hợp cho hệ thống thông gió thông thường, hút khói, HVAC — chiếm 70% quạt sản xuất tại xưởng.',
                    tag: 'Phổ biến nhất',
                  },
                  {
                    title: 'Inox 304 / 316 (SUS 304/316)',
                    desc: 'Chống ăn mòn hoá chất (axit, kiềm), chịu nhiệt đến 800°C. Bắt buộc cho ngành thực phẩm, dược phẩm, hoá chất và môi trường có khí ăn mòn (H₂S, SO₂, HCl). Inox 316 cho môi trường biển hoặc cực kỳ ăn mòn.',
                    tag: 'Chống ăn mòn',
                  },
                  {
                    title: 'Thép Chịu Mài Mòn Hardox 400/500',
                    desc: 'Độ cứng bề mặt 400-500 HBW, tuổi thọ gấp 3-5 lần thép thường khi vận chuyển dòng khí chứa bụi mài mòn (bụi xi măng, bụi đá, bụi kim loại). Chuyên dùng cho impeller và vỏ quạt hút bụi công nghiệp.',
                    tag: 'Chịu mài mòn',
                  },
                ].map((mat) => (
                  <div key={mat.title} className="bg-zinc-50 rounded-2xl p-6 md:p-8 border border-zinc-100">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-3 py-1 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">{mat.tag}</span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-2">{mat.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{mat.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-zinc-50" aria-label="Quy trình sản xuất quạt ly tâm">
        <div className="container-custom">
          <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Quy trình sản xuất 5 bước
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
              Quy trình chuẩn hoá từ khảo sát đến bàn giao, đảm bảo mỗi quạt ly tâm đạt chất lượng cao nhất trước khi đến tay khách hàng.
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {processSteps.map((s, i) => (
              <motion.div
                key={s.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex gap-6 md:gap-8 bg-white rounded-2xl p-6 md:p-8 border border-zinc-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="text-3xl md:text-4xl font-black text-zinc-200 shrink-0 w-16 text-center">{s.step}</div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-zinc-900 mb-2">{s.title}</h3>
                  <p className="text-zinc-500 text-sm md:text-base leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-16 md:py-24 bg-white border-y border-zinc-100" aria-label="Bảng giá quạt ly tâm công nghiệp">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
              Bảng giá quạt ly tâm tham khảo
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto">
              <strong>Đơn giá tham khảo (VNĐ/chiếc, đã bao gồm motor)</strong> — Giá thực tế phụ thuộc vào thông số kỹ thuật, vật liệu và yêu cầu đặc biệt. Liên hệ để nhận báo giá chính xác.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm bg-white max-w-5xl mx-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Loại quạt</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Vật liệu</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Giá tham khảo (VNĐ)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {pricingData.map((row) => (
                  <tr key={row.type} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-zinc-900">{row.type}</td>
                    <td className="px-6 py-4 text-zinc-600">{row.material}</td>
                    <td className="px-6 py-4 text-zinc-600">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-zinc-400 mt-4 max-w-2xl mx-auto">
            * Giá trên đã bao gồm motor điện, ổ bi, cân bằng động và sơn tĩnh điện. Chưa bao gồm VAT, vận chuyển, khung giảm chấn và biến tần (nếu có). Cập nhật tháng 6/2026.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-zinc-50" aria-label="Ưu điểm sản xuất quạt ly tâm tại xưởng">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-zinc-900 mb-12 tracking-tight text-center">
              Ưu điểm khi đặt quạt ly tâm tại xưởng Cường Thông Gió
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Giá xưởng — không qua trung gian', desc: 'Sản xuất trực tiếp tại xưởng Đà Nẵng, không qua đại lý hay nhà phân phối. Giá thành thấp hơn 15-25% so với quạt nhập khẩu hoặc mua qua trung gian. Đặc biệt tiết kiệm cho đơn hàng số lượng lớn hoặc dự án dài hạn.' },
                { title: 'Thiết kế theo yêu cầu chính xác', desc: 'Quạt được thiết kế riêng cho từng hệ thống dựa trên lưu lượng, áp suất và đặc tính khí thực tế — không phải chọn "gần đúng" từ catalog có sẵn. Điều này đảm bảo quạt vận hành đúng điểm BEP (Best Efficiency Point), tiết kiệm điện năng tối đa.' },
                { title: 'Bảo hành 18 tháng & hỗ trợ kỹ thuật', desc: 'Bảo hành 18 tháng toàn bộ sản phẩm. Đội ngũ kỹ thuật sẵn sàng hỗ trợ sửa chữa tại chỗ trong vòng 24h cho khu vực Đà Nẵng và Miền Trung. Cung cấp phụ tùng thay thế chính hãng: ổ bi, cánh quạt, trục quạt.' },
                { title: 'Kiểm tra chất lượng toàn diện', desc: 'Mỗi quạt được cân bằng động ISO 1940, chạy thử đầy đủ tại xưởng. Biên bản kiểm tra chất lượng giao kèm sản phẩm bao gồm: kết quả cân bằng, đo lưu lượng/áp suất, dòng điện motor, độ rung và mức ồn.' },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm"
                >
                  <h3 className="text-xl font-bold text-zinc-900 mb-4">{item.title}</h3>
                  <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-white" aria-label="Câu hỏi thường gặp về quạt ly tâm" id="faq">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14 md:mb-20">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
                Câu hỏi thường gặp về dịch vụ của chúng tôi
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
                Giải đáp chi tiết các thắc mắc phổ biến về quạt ly tâm công nghiệp — từ nguyên lý hoạt động, cách chọn quạt đến chi phí và bảo hành.
              </motion.p>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-zinc-50 rounded-2xl border border-zinc-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                    aria-expanded={openFaq === idx}
                    aria-controls={`quatlytam-faq-${idx}`}
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
                    id={`quatlytam-faq-${idx}`}
                    className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-96 pb-6 md:pb-8' : 'max-h-0'}`}
                    role="region"
                  >
                    <p className="px-6 md:px-8 text-zinc-500 text-sm md:text-base leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-20 md:py-32 px-4" aria-label="Liên hệ báo giá quạt ly tâm">
        <div className="container-custom flex justify-center">
          <div className="bg-zinc-900 rounded-[2rem] md:rounded-[3rem] py-20 px-8 md:py-32 md:px-16 text-center relative overflow-hidden mx-auto shadow-2xl w-full max-w-6xl flex flex-col items-center">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0,transparent_100%)] pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center w-full"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 tracking-tight text-white uppercase leading-tight">
                Cần báo giá quạt ly tâm công nghiệp?
              </h2>
              <p className="text-zinc-400 mb-10 md:mb-14 text-base md:text-lg font-normal leading-relaxed max-w-xl mx-auto">
                Cho chúng tôi biết lưu lượng, áp suất và đặc tính khí cần xử lý — đội ngũ kỹ sư Cường Thông Gió sẽ tư vấn loại quạt phù hợp và gửi báo giá chi tiết trong vòng 24h.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 mx-auto w-full sm:w-auto">
                <Button asChild size="lg" className="w-full sm:w-auto font-bold uppercase tracking-wider text-[14px] md:text-base h-auto min-h-[64px] md:min-h-[72px] py-4 px-8 md:px-14 rounded-full shadow-lg transition-all duration-300 bg-white text-zinc-900 hover:bg-zinc-100 text-center">
                  <Link to="/lien-he" className="flex items-center justify-center w-full h-full leading-relaxed">Gửi yêu cầu tư vấn kỹ thuật</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto font-bold uppercase tracking-wider text-[13px] h-14 md:h-16 px-10 rounded-full border-[2px] border-zinc-600 hover:border-white transition-all duration-300 text-white whitespace-nowrap">
                  <a href="tel:0905001224" className="flex items-center justify-center w-full h-full">Hotline: 0905 001 224</a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
