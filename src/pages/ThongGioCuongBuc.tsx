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
    question: 'Thông gió cưỡng bức là gì và khác gì thông gió tự nhiên?',
    answer:
      'Thông gió cưỡng bức (mechanical ventilation) là phương pháp sử dụng quạt công nghiệp và hệ thống ống gió để chủ động hút không khí ô nhiễm ra ngoài và/hoặc đẩy không khí tươi vào trong nhà xưởng. Khác với thông gió tự nhiên (dựa vào chênh lệch áp suất và nhiệt độ), thông gió cưỡng bức cho phép kiểm soát chính xác lưu lượng gió, hoạt động ổn định bất kể thời tiết, và đáp ứng được các tiêu chuẩn ACH khắt khe theo TCVN 5687:2010.',
  },
  {
    question: 'Khi nào nhà xưởng bắt buộc phải dùng thông gió cưỡng bức?',
    answer:
      'Theo QCVN 06:2022/BXD và TCVN 5687:2010, nhà xưởng phải dùng thông gió cưỡng bức trong các trường hợp: (1) Phát sinh khí độc, hơi dung môi, VOC (xưởng sơn, hoá chất); (2) Phát sinh bụi mịn nguy hiểm (xưởng gỗ, cơ khí); (3) Nhiệt thải lớn từ lò, máy móc (xưởng đúc, luyện kim); (4) Không gian kín, không có đủ cửa sổ thông gió tự nhiên; (5) Yêu cầu ACH ≥ 15 lần/giờ. Trong những trường hợp này, thông gió tự nhiên không đủ đáp ứng.',
  },
  {
    question: 'Chi phí thi công hệ thống thông gió cưỡng bức khoảng bao nhiêu?',
    answer:
      'Chi phí phụ thuộc vào diện tích, yêu cầu ACH và loại thiết bị. Trung bình: hệ thống hút cơ bản (quạt hướng trục + ống gió): 150.000 – 250.000 VNĐ/m²; hệ thống hút-đẩy kết hợp: 250.000 – 400.000 VNĐ/m²; hệ thống có xử lý khí thải (scrubber, lọc bụi): 350.000 – 600.000 VNĐ/m². Nhà xưởng 1.000m² chi phí trung bình từ 150 – 400 triệu VNĐ. Liên hệ 0905 001 224 để được báo giá chính xác.',
  },
  {
    question: 'ACH (Air Changes per Hour) tính như thế nào cho thông gió cưỡng bức?',
    answer:
      'ACH = Tổng lưu lượng gió (m³/h) ÷ Thể tích không gian (m³). Ví dụ: xưởng 1.000m², cao 8m, thể tích = 8.000m³. Nếu cần ACH = 20 → lưu lượng = 20 × 8.000 = 160.000 m³/h. Từ đó chọn số lượng và công suất quạt. Tiêu chuẩn ACH theo TCVN 5687:2010: xưởng cơ khí 15-25, xưởng hàn 20-30, xưởng sơn 30-50, bếp công nghiệp 30-60. Cường Thông Gió tính toán chi tiết theo điều kiện thực tế, bao gồm cả tổn thất áp suất trong ống gió.',
  },
  {
    question: 'Hệ thống hút (exhaust) và hệ thống đẩy (supply) khác nhau thế nào?',
    answer:
      'Hệ thống hút (exhaust) đặt quạt ở vị trí hút khí ô nhiễm ra ngoài, tạo áp suất âm trong nhà xưởng, khí tươi tự vào qua các cửa gió. Phù hợp cho xưởng có nguồn ô nhiễm cục bộ. Hệ thống đẩy (supply) đẩy khí tươi đã lọc vào trong, tạo áp suất dương, ngăn bụi/côn trùng xâm nhập. Phù hợp cho phòng sạch, xưởng điện tử. Giải pháp tối ưu nhất là hệ thống hút-đẩy kết hợp (balanced), cân bằng áp suất và kiểm soát chính xác chất lượng không khí.',
  },
  {
    question: 'Quạt ly tâm và quạt hướng trục khác nhau thế nào? Nên chọn loại nào?',
    answer:
      'Quạt hướng trục (axial fan): lưu lượng lớn, áp suất tĩnh thấp (< 300Pa), thích hợp hút/thổi trực tiếp qua tường, mái hoặc ống gió ngắn. Giá thành thấp hơn. Quạt ly tâm (centrifugal fan): áp suất tĩnh cao (300 – 3.000Pa), thích hợp hệ thống ống gió dài, nhiều nhánh, có bộ lọc. Bền hơn, ít rung. Nguyên tắc: ống gió < 10m dùng quạt hướng trục; ống gió > 10m hoặc có lọc bụi dùng quạt ly tâm. Cường Thông Gió sẽ tính toán tổn thất áp suất để chọn loại quạt phù hợp.',
  },
  {
    question: 'Thời gian thi công hệ thống thông gió cưỡng bức mất bao lâu?',
    answer:
      'Tùy quy mô và độ phức tạp: nhà xưởng nhỏ (< 500m², hệ thống hút đơn giản): 7-14 ngày; nhà xưởng vừa (500-2.000m², hệ thống hút-đẩy): 14-30 ngày; nhà xưởng lớn hoặc hệ thống phức tạp (> 2.000m², có xử lý khí thải): 30-60 ngày. Thời gian bao gồm: khảo sát, thiết kế, sản xuất thiết bị, thi công lắp đặt, cân chỉnh và nghiệm thu. Cường Thông Gió cam kết đúng tiến độ.',
  },
  {
    question: 'Cường Thông Gió có thi công hệ thống thông gió cưỡng bức cho nhà máy lớn không?',
    answer:
      'Có. Chúng tôi đã thi công hệ thống thông gió cưỡng bức cho hàng trăm nhà xưởng và nhà máy tại các KCN Hòa Khánh, Hòa Cầm, An Đồn, Thọ Quang (Đà Nẵng) và KCN Điện Nam – Điện Ngọc (Quảng Nam). Quy mô dự án từ 200m² đến 20.000m², bao gồm cơ khí, may mặc, chế biến gỗ, thực phẩm, điện tử, sơn phủ. Chúng tôi thiết kế theo TCVN 5687:2010, SMACNA và có đội ngũ kỹ sư chuyên môn cao với 13+ năm kinh nghiệm.',
  },
]

const ventSystems = [
  {
    title: 'Hệ thống Hút (Exhaust)',
    badge: 'Phổ biến nhất',
    desc: 'Quạt hút đặt trên tường hoặc mái nhà xưởng hút không khí ô nhiễm, nóng, bụi ra ngoài. Khí tươi bên ngoài tự động vào qua các cửa gió (louver) nhờ chênh lệch áp suất. Tạo áp suất âm (negative pressure) bên trong nhà xưởng. Phù hợp cho hầu hết các loại nhà xưởng có nguồn ô nhiễm cục bộ hoặc phân tán.',
    specs: [
      'Tạo áp suất âm (negative pressure)',
      'Quạt hút hướng trục hoặc ly tâm',
      'Cửa gió cấp khí tươi tự nhiên',
      'Chi phí đầu tư trung bình',
      'Hiệu quả với xưởng có nhiệt thải cao',
    ],
  },
  {
    title: 'Hệ thống Đẩy (Supply)',
    badge: 'Phòng sạch',
    desc: 'Quạt cấp đẩy không khí tươi đã qua lọc vào bên trong nhà xưởng, tạo áp suất dương (positive pressure). Không khí cũ bị đẩy ra ngoài qua các cửa thoát gió. Ngăn bụi, côn trùng và ô nhiễm từ bên ngoài xâm nhập. Đặc biệt phù hợp cho phòng sạch (clean room), xưởng điện tử, xưởng thực phẩm.',
    specs: [
      'Tạo áp suất dương (positive pressure)',
      'Quạt cấp gió kết hợp bộ lọc',
      'Ngăn bụi/côn trùng xâm nhập',
      'Chi phí đầu tư cao hơn hệ hút',
      'Tiêu chuẩn ISO Class cho phòng sạch',
    ],
  },
  {
    title: 'Hệ thống Hút-Đẩy kết hợp (Balanced)',
    badge: 'Hiệu quả cao',
    desc: 'Kết hợp cả quạt hút và quạt cấp, cân bằng áp suất bên trong nhà xưởng. Kiểm soát chính xác nhất lưu lượng gió vào-ra, phân phối đều khí tươi đến mọi vị trí. Đây là giải pháp tiên tiến nhất, đáp ứng tiêu chuẩn TCVN 5687:2010 và SMACNA về chất lượng không khí trong nhà xưởng.',
    specs: [
      'Cân bằng áp suất (balanced pressure)',
      'Kiểm soát chính xác lưu lượng',
      'Phân phối gió đều toàn xưởng',
      'Đáp ứng TCVN 5687:2010, SMACNA',
      'Hiệu quả năng lượng tối ưu',
    ],
  },
]

const comparisonData = [
  { criteria: 'Nguyên lý', forced: 'Dùng quạt công nghiệp + ống gió chủ động hút/đẩy không khí', natural: 'Tận dụng chênh lệch áp suất, nhiệt độ tự nhiên' },
  { criteria: 'Lưu lượng gió', forced: 'Kiểm soát chính xác, ổn định theo ACH yêu cầu', natural: 'Biến thiên theo thời tiết, không ổn định' },
  { criteria: 'Kiểm soát', forced: 'Điều chỉnh được tốc độ quạt, lưu lượng, áp suất', natural: 'Không điều chỉnh được, phụ thuộc tự nhiên' },
  { criteria: 'Chi phí đầu tư', forced: '150.000 – 400.000 VNĐ/m²', natural: '80.000 – 150.000 VNĐ/m²' },
  { criteria: 'Chi phí vận hành', forced: 'Có chi phí điện (quạt, bộ điều khiển)', natural: 'Gần như không có chi phí vận hành' },
  { criteria: 'Phụ thuộc thời tiết', forced: 'Không — hoạt động ổn định 24/7', natural: 'Có — giảm hiệu quả khi trời lặng gió' },
  { criteria: 'Ứng dụng', forced: 'Xưởng có khí độc, bụi, nhiệt thải cao, phòng sạch', natural: 'Kho bãi, xưởng mái cao, nhiệt thải thấp' },
]

const equipmentData = [
  {
    name: 'Quạt hướng trục (Axial Fan)',
    desc: 'Lưu lượng lớn (5.000 – 80.000 m³/h), áp suất thấp. Lắp trực tiếp trên tường hoặc ống gió ngắn. Phù hợp hút/thổi trực tiếp.',
    spec: 'Ø400 – Ø1400mm | 0.37 – 7.5 kW',
  },
  {
    name: 'Quạt ly tâm (Centrifugal Fan)',
    desc: 'Áp suất tĩnh cao (300 – 3.000Pa), phù hợp hệ thống ống gió dài, nhiều nhánh, có bộ lọc. Bền, ít rung, tuổi thọ cao.',
    spec: '1.000 – 100.000 m³/h | 0.75 – 45 kW',
  },
  {
    name: 'Ống gió tôn mạ kẽm (Galvanized Duct)',
    desc: 'Ống gió phân phối và thu hồi không khí. Sản xuất theo tiêu chuẩn SMACNA. Có dạng tròn và chữ nhật, nối bằng bích hoặc TDC/TDF.',
    spec: 'Tôn dày 0.6 – 1.2mm | SMACNA',
  },
  {
    name: 'Cửa gió (Louver / Grille)',
    desc: 'Cửa gió tường, cửa gió trần, miệng gió điều chỉnh hướng. Vật liệu nhôm hoặc thép sơn tĩnh điện. Có lưới chống côn trùng.',
    spec: 'Nhôm / Thép sơn tĩnh điện',
  },
  {
    name: 'Van điều tiết VCD (Volume Control Damper)',
    desc: 'Điều chỉnh lưu lượng gió trong ống gió. Có loại tay gạt thủ công và loại motor điều khiển tự động. Thiết yếu cho hệ thống nhiều nhánh.',
    spec: 'Thủ công / Motor 24V AC/DC',
  },
  {
    name: 'Bộ lọc gió công nghiệp (Air Filter)',
    desc: 'Lọc bụi, hạt mịn trước khi cấp gió vào xưởng hoặc trước khi thải ra môi trường. Các cấp lọc G4, F7, F9, HEPA tùy yêu cầu.',
    spec: 'G4 – HEPA H14 | EN 1822',
  },
]

const achTable = [
  { area: 'Xưởng cơ khí, gia công kim loại', ach: '15 – 25', note: 'Khói hàn, bụi kim loại' },
  { area: 'Xưởng may mặc, dệt', ach: '10 – 20', note: 'Bụi vải, nhiệt thải' },
  { area: 'Xưởng chế biến gỗ', ach: '20 – 30', note: 'Bụi gỗ mịn, mùn cưa' },
  { area: 'Xưởng sơn, phun phủ', ach: '30 – 50', note: 'Hơi dung môi, VOC' },
  { area: 'Bếp công nghiệp', ach: '30 – 60', note: 'Khói, nhiệt, dầu mỡ' },
  { area: 'Nhà kho, kho lạnh', ach: '6 – 10', note: 'Thông gió cơ bản' },
  { area: 'Tầng hầm, bãi xe', ach: '6 – 10', note: 'Khí CO, NO₂' },
  { area: 'Phòng sạch (clean room)', ach: '20 – 60', note: 'Tiêu chuẩn ISO Class' },
]

const processSteps = [
  {
    step: '01',
    title: 'Khảo sát & Phân tích hiện trạng',
    desc: 'Kỹ sư đến tận nơi đo đạc kích thước nhà xưởng, xác định nguồn ô nhiễm (nhiệt, bụi, khí độc), đánh giá hướng gió và điều kiện lắp đặt. Sử dụng thiết bị đo lưu lượng gió, nhiệt độ, nồng độ bụi.',
  },
  {
    step: '02',
    title: 'Tính toán & Thiết kế kỹ thuật',
    desc: 'Tính toán ACH, lưu lượng gió, tổn thất áp suất trong ống gió theo TCVN 5687:2010 và SMACNA. Chọn loại quạt, kích thước ống gió, vị trí miệng hút/cấp. Xuất bản vẽ shop drawing chi tiết.',
  },
  {
    step: '03',
    title: 'Sản xuất & Gia công thiết bị',
    desc: 'Sản xuất ống gió tôn mạ kẽm, khung đỡ, phụ kiện tại xưởng Cường Thông Gió theo bản vẽ đã duyệt. Kiểm tra chất lượng mối ghép, độ kín. Quạt công nghiệp nhập từ nhà sản xuất uy tín.',
  },
  {
    step: '04',
    title: 'Thi công lắp đặt tại công trình',
    desc: 'Đội thi công chuyên nghiệp lắp đặt ống gió, quạt, cửa gió, van điều tiết theo đúng bản vẽ. Thi công tuân thủ quy trình an toàn lao động, đảm bảo mỹ quan. Có thể thi công ngoài giờ sản xuất nếu cần.',
  },
  {
    step: '05',
    title: 'Cân chỉnh, Nghiệm thu & Bàn giao',
    desc: 'Đo kiểm lưu lượng gió tại mỗi miệng gió, điều chỉnh van VCD để đạt đúng ACH thiết kế. Chạy thử toàn hệ thống, kiểm tra rung, ồn. Nghiệm thu bằng văn bản, bàn giao hồ sơ hoàn công và hướng dẫn vận hành.',
  },
]

const pricingData = [
  { equipment: 'Quạt hướng trục Ø600mm (1.5kW)', unit: 'Cái', price: '4.500.000 – 6.500.000' },
  { equipment: 'Quạt hướng trục Ø900mm (3kW)', unit: 'Cái', price: '8.000.000 – 12.000.000' },
  { equipment: 'Quạt ly tâm 5.000 m³/h', unit: 'Cái', price: '12.000.000 – 18.000.000' },
  { equipment: 'Quạt ly tâm 15.000 m³/h', unit: 'Cái', price: '25.000.000 – 40.000.000' },
  { equipment: 'Ống gió tôn mạ kẽm (tròn/chữ nhật)', unit: 'm²', price: '280.000 – 450.000' },
  { equipment: 'Cửa gió louver nhôm 600×600mm', unit: 'Cái', price: '650.000 – 1.200.000' },
  { equipment: 'Van điều tiết VCD (motor)', unit: 'Cái', price: '1.800.000 – 3.500.000' },
  { equipment: 'Thi công lắp đặt trọn gói', unit: 'm²', price: '150.000 – 400.000' },
]

export function ThongGioCuongBuc() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const breadcrumb = makeBreadcrumbSchema([
    { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
    { name: 'Thông gió cưỡng bức', url: 'https://cuongthonggio.com/thong-gio-cuong-buc' },
  ])

  const faqSchema = makeFAQSchema(faqs)

  const serviceSchema = makeServiceSchema({
    name: 'Thông Gió Cưỡng Bức Nhà Xưởng',
    description:
      'Thiết kế và thi công hệ thống thông gió cưỡng bức (mechanical ventilation) cho nhà xưởng: hệ thống hút, đẩy, hút-đẩy kết hợp. Tính toán ACH theo TCVN 5687:2010. 13+ năm kinh nghiệm tại Đà Nẵng.',
    areaServed: 'Đà Nẵng',
  })

  return (
    <div className="bg-white min-h-screen font-sans text-zinc-900">
      <SEO
        title="Thông Gió Cưỡng Bức Nhà Xưởng — Nguyên Lý, Thiết Kế & Thi Công"
        description="Hướng dẫn toàn diện về thông gió cưỡng bức (mechanical ventilation) cho nhà xưởng: nguyên lý hút-đẩy, cách tính ACH, so sánh với thông gió tự nhiên, thiết bị cần thiết và bảng giá thi công 2026. Cường Thông Gió — 13+ năm kinh nghiệm tại Đà Nẵng."
        keywords="thông gió cưỡng bức, thông gió cơ khí, mechanical ventilation, quạt thông gió công nghiệp, hệ thống hút đẩy, thông gió nhà xưởng, ACH, quạt ly tâm, quạt hướng trục, Đà Nẵng, Cường Thông Gió"
        structuredData={[breadcrumb, faqSchema, serviceSchema]}
        dateModified="2026-06-28"
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
              <span itemProp="name" className="text-zinc-900 font-bold">Thông gió cưỡng bức</span>
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
                Mechanical Ventilation
              </motion.span>
              <div className="mb-10 md:mb-12 max-w-6xl w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.1] text-center">
                  Thông Gió Cưỡng Bức Nhà Xưởng<br />
                  <span className="text-zinc-400">Nguyên Lý, Thiết Kế & Thi Công</span>
                </h1>
              </div>

              <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-500 mb-10 md:mb-14 leading-relaxed max-w-3xl font-normal px-4">
                Hướng dẫn toàn diện về hệ thống thông gió cưỡng bức cho nhà xưởng công nghiệp — từ nguyên lý hút-đẩy, cách tính ACH, lựa chọn thiết bị đến quy trình thi công chuyên nghiệp. Cường Thông Gió — 13+ năm kinh nghiệm, 350+ dự án thông gió cưỡng bức tại Đà Nẵng.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto px-6 mb-16">
                <Button asChild size="lg" className="w-full sm:w-auto min-w-[200px] px-8 font-bold text-sm h-14 rounded-xl shadow-lg shadow-zinc-100 bg-zinc-950 text-white hover:bg-zinc-800 uppercase tracking-widest whitespace-nowrap">
                  <Link to="/lien-he">Yêu cầu khảo sát miễn phí</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] px-8 font-bold text-sm h-14 rounded-xl border-[2px] border-zinc-200 hover:border-zinc-950 hover:bg-zinc-50 text-zinc-950 uppercase tracking-widest whitespace-nowrap">
                  <a href="tel:0905001224">Gọi: 0905 001 224</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 md:py-20 bg-zinc-50 border-y border-zinc-100" aria-label="Thống kê Cường Thông Gió">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-5xl mx-auto text-center">
            {[
              { value: '13+', label: 'Năm kinh nghiệm' },
              { value: '2,145+', label: 'Dự án hoàn thành' },
              { value: '350+', label: 'Dự án cưỡng bức' },
              { value: '4.9★', label: 'Đánh giá Google' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="text-3xl md:text-5xl font-extrabold text-zinc-900 tracking-tight mb-2">{stat.value}</div>
                <div className="text-sm md:text-base text-zinc-500 font-medium">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Nguyên lý Section - 3 Ventilation System Types */}
      <section className="py-20 md:py-32 bg-white" aria-label="Nguyên lý thông gió cưỡng bức">
        <div className="container-custom">
          <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              3 nguyên lý thông gió cưỡng bức
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
              Tùy vào đặc thù sản xuất, nguồn ô nhiễm và yêu cầu kiểm soát chất lượng không khí, chúng tôi sẽ tư vấn hệ thống phù hợp nhất theo TCVN 5687:2010.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
            {ventSystems.map((system, i) => (
              <motion.article
                key={system.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-zinc-50 rounded-[1.5rem] overflow-hidden border border-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col p-8 md:p-10"
              >
                <span className="inline-block px-3 py-1 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 self-start">{system.badge}</span>
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4 tracking-tight leading-tight">{system.title}</h3>
                <p className="text-zinc-500 text-sm md:text-base mb-8 leading-relaxed">{system.desc}</p>
                <div className="space-y-3 mt-auto">
                  {system.specs.map((spec) => (
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

      {/* Comparison Table: Cưỡng bức vs Tự nhiên */}
      <section className="py-16 md:py-24 bg-white border-y border-zinc-100" aria-label="So sánh thông gió cưỡng bức và tự nhiên">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
              So sánh thông gió cưỡng bức vs tự nhiên
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-3xl mx-auto">
              Bảng so sánh chi tiết giúp bạn hiểu rõ ưu nhược điểm của từng phương pháp và lựa chọn giải pháp phù hợp cho nhà xưởng.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm bg-white max-w-5xl mx-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Tiêu chí</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Thông gió cưỡng bức</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Thông gió tự nhiên</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {comparisonData.map((row) => (
                  <tr key={row.criteria} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-zinc-900">{row.criteria}</td>
                    <td className="px-6 py-4 text-zinc-600">{row.forced}</td>
                    <td className="px-6 py-4 text-zinc-500">{row.natural}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Thiết bị Section */}
      <section className="py-20 md:py-32 bg-zinc-50" aria-label="Thiết bị thông gió cưỡng bức">
        <div className="container-custom">
          <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Thiết bị trong hệ thống thông gió cưỡng bức
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
              Các thiết bị chính cấu thành hệ thống thông gió cưỡng bức nhà xưởng, được lựa chọn và thiết kế theo tiêu chuẩn TCVN 5687:2010 và SMACNA.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
            {equipmentData.map((item, i) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="bg-white rounded-2xl p-8 border border-zinc-100 shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg md:text-xl font-bold text-zinc-900 mb-3 tracking-tight">{item.name}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="pt-4 border-t border-zinc-100">
                  <span className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Thông số: </span>
                  <span className="text-sm font-semibold text-zinc-700">{item.spec}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ACH Table */}
      <section className="py-16 md:py-24 bg-white border-y border-zinc-100" aria-label="Bảng tham khảo ACH">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
              Bảng tham khảo chỉ số ACH theo ngành
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-3xl mx-auto">
              <strong>ACH (Air Changes per Hour)</strong> — số lần thay đổi không khí trong 1 giờ. Là cơ sở để tính toán công suất quạt và kích thước ống gió trong hệ thống thông gió cưỡng bức theo TCVN 5687:2010.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm bg-white max-w-5xl mx-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Loại nhà xưởng</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">ACH khuyến nghị</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Ghi chú</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {achTable.map((row) => (
                  <tr key={row.area} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-zinc-900">{row.area}</td>
                    <td className="px-6 py-4 text-zinc-600 font-bold">{row.ach}</td>
                    <td className="px-6 py-4 text-zinc-500">{row.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quy trình thi công */}
      <section className="py-20 md:py-32 bg-zinc-50" aria-label="Quy trình thi công thông gió cưỡng bức">
        <div className="container-custom">
          <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Quy trình thi công 5 bước
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
              Quy trình thi công hệ thống thông gió cưỡng bức chuyên nghiệp, đảm bảo chất lượng và đúng tiến độ theo cam kết.
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {processSteps.map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-8 md:p-10 border border-zinc-100 shadow-sm flex gap-6 md:gap-8 items-start"
              >
                <div className="text-3xl md:text-4xl font-extrabold text-zinc-200 shrink-0 leading-none">{item.step}</div>
                <div>
                  <h3 className="text-lg md:text-xl font-bold text-zinc-900 mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-zinc-500 text-sm md:text-base leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bảng giá thiết bị */}
      <section className="py-16 md:py-24 bg-white border-y border-zinc-100" aria-label="Bảng giá thiết bị thông gió cưỡng bức">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
              Bảng giá thiết bị & thi công tham khảo
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto">
              <strong>Giá tham khảo thiết bị và thi công thông gió cưỡng bức (VNĐ)</strong> — Chi phí thực tế phụ thuộc vào công suất, vật liệu và yêu cầu cụ thể.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm bg-white max-w-5xl mx-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Thiết bị / Hạng mục</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Đơn vị</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Giá tham khảo (VNĐ)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {pricingData.map((row) => (
                  <tr key={row.equipment} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-zinc-900">{row.equipment}</td>
                    <td className="px-6 py-4 text-zinc-600">{row.unit}</td>
                    <td className="px-6 py-4 text-zinc-600 font-bold">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-zinc-400 mt-4 max-w-2xl mx-auto">
            * Giá trên chưa bao gồm VAT. Bao gồm thiết bị và phụ kiện kèm theo. Giá thi công trọn gói bao gồm thiết kế, thiết bị, ống gió, lắp đặt và nghiệm thu. Cập nhật tháng 6/2026.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-white" aria-label="Câu hỏi thường gặp về thông gió cưỡng bức" id="faq">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14 md:mb-20">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
                Câu hỏi thường gặp về thông gió cưỡng bức
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
                Giải đáp chi tiết các thắc mắc phổ biến về hệ thống thông gió cưỡng bức nhà xưởng công nghiệp.
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
                    aria-controls={`cuongbuc-faq-${idx}`}
                  >
                    <h3 className="text-base md:text-lg font-bold text-zinc-900 pr-4 leading-snug">{faq.question}</h3>
                    <svg className={`w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div id={`cuongbuc-faq-${idx}`} className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-96 pb-6 md:pb-8' : 'max-h-0'}`} role="region">
                    <p className="px-6 md:px-8 text-zinc-500 text-sm md:text-base leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-20 md:py-32 px-4" aria-label="Liên hệ tư vấn thông gió cưỡng bức">
        <div className="container-custom flex justify-center">
          <div className="bg-zinc-900 rounded-[2rem] md:rounded-[3rem] py-20 px-8 md:py-32 md:px-16 text-center relative overflow-hidden mx-auto shadow-2xl w-full max-w-6xl flex flex-col items-center">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.4)_0,transparent_100%)] pointer-events-none" />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative z-10 max-w-3xl mx-auto flex flex-col items-center text-center w-full"
            >
              <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 tracking-tight text-white uppercase leading-tight">
                Cần thi công thông gió cưỡng bức?
              </h2>
              <p className="text-zinc-400 mb-10 md:mb-14 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                Đội ngũ kỹ sư Cường Thông Gió sẵn sàng khảo sát miễn phí, tính toán ACH và đề xuất hệ thống thông gió cưỡng bức tối ưu nhất cho nhà xưởng của bạn.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 mx-auto w-full sm:w-auto">
                <Button asChild size="lg" className="w-full sm:w-auto font-bold uppercase tracking-wider text-[14px] md:text-base h-auto min-h-[64px] md:min-h-[72px] py-4 px-8 md:px-14 rounded-xl shadow-lg bg-white text-zinc-900 hover:bg-zinc-100 text-center">
                  <Link to="/lien-he" className="flex items-center justify-center w-full h-full leading-relaxed">Gửi yêu cầu tư vấn kỹ thuật</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto font-bold uppercase tracking-wider text-[13px] h-14 md:h-16 px-10 rounded-xl border-[2px] border-zinc-600 hover:border-white text-white whitespace-nowrap">
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
