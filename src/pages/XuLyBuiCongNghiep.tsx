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
    question: 'Hệ thống hút bụi công nghiệp hoạt động theo nguyên lý nào?',
    answer:
      'Hệ thống hút bụi công nghiệp hoạt động theo nguyên lý tạo áp suất âm (chân không cục bộ) tại các điểm phát sinh bụi. Quạt hút công nghiệp tạo lực hút qua hệ thống đường ống, kéo không khí chứa bụi từ nguồn phát sinh đến thiết bị lọc. Tại đây, bụi được tách ra khỏi dòng khí bằng các phương pháp như lọc túi vải (baghouse), lực ly tâm (cyclone), hoặc tĩnh điện (ESP). Không khí sạch sau lọc được thải ra môi trường hoặc tuần hoàn lại nhà xưởng.',
  },
  {
    question: 'Túi lọc bụi (baghouse filter) và cyclone separator khác nhau thế nào?',
    answer:
      'Túi lọc bụi (baghouse) sử dụng các túi vải hoặc vải không dệt để lọc bụi mịn, đạt hiệu suất 99.5–99.9% với hạt bụi ≥ 1μm. Phù hợp cho bụi mịn như bụi xi măng, bụi bột mì, bụi sơn. Cyclone separator sử dụng lực ly tâm để tách bụi thô, hiệu suất 80–95% với hạt ≥ 10μm. Phù hợp cho bụi gỗ, mạt cưa, bụi đá. Trong thực tế, hai thiết bị thường được kết hợp: cyclone lọc thô trước, baghouse lọc tinh sau — giúp tăng tuổi thọ túi lọc và giảm chi phí bảo trì.',
  },
  {
    question: 'Tiêu chuẩn QCVN nào quy định về bụi và khí thải công nghiệp?',
    answer:
      'Các tiêu chuẩn chính gồm: QCVN 19:2009/BTNMT — Quy chuẩn kỹ thuật quốc gia về khí thải công nghiệp đối với bụi và các chất vô cơ, giới hạn nồng độ bụi tổng ≤ 200 mg/Nm³ (cột B). QCVN 20:2009/BTNMT — Quy định về một số chất hữu cơ trong khí thải. QCVN 02:2012/BTNMT — Quy chuẩn về khí thải lò đốt chất thải công nghiệp. Cường Thông Gió thiết kế hệ thống đảm bảo đầu ra đạt cả hai cột A (khu dân cư) và B (khu công nghiệp) theo yêu cầu.',
  },
  {
    question: 'Chi phí lắp đặt hệ thống hút bụi công nghiệp khoảng bao nhiêu?',
    answer:
      'Chi phí phụ thuộc vào nhiều yếu tố: loại bụi, lưu lượng khí cần xử lý, công nghệ lọc, số điểm hút và khoảng cách đường ống. Hệ thống cyclone đơn giản cho xưởng gỗ nhỏ từ 80–150 triệu VNĐ. Hệ thống baghouse filter công suất trung bình từ 200–500 triệu VNĐ. Hệ thống xử lý bụi + khí thải tổng thể cho nhà máy lớn từ 500 triệu – 2 tỷ VNĐ. Liên hệ 0905 001 224 để nhận khảo sát miễn phí và báo giá chính xác theo hiện trạng nhà xưởng.',
  },
  {
    question: 'Hệ thống hút bụi cần bảo trì như thế nào?',
    answer:
      'Bảo trì định kỳ bao gồm: (1) Kiểm tra và thay túi lọc 12–24 tháng/lần tuỳ mức độ bụi; (2) Vệ sinh cyclone và phễu thu bụi hàng tuần; (3) Kiểm tra quạt hút, dây curoa, ổ bi 3 tháng/lần; (4) Đo áp suất chênh lệch (differential pressure) qua bộ lọc hàng ngày — khi vượt 150 mmH2O cần vệ sinh hoặc thay túi; (5) Kiểm tra hệ thống xả bụi tự động (rotary valve, screw conveyor) hàng tháng. Cường Thông Gió cung cấp hợp đồng bảo trì định kỳ với chi phí từ 3–8 triệu VNĐ/lần tuỳ quy mô.',
  },
  {
    question: 'Cường Thông Gió có thi công hệ thống hút bụi cho ngành gỗ không?',
    answer:
      'Có. Ngành chế biến gỗ là một trong những lĩnh vực chuyên môn của chúng tôi. Chúng tôi đã thi công hàng trăm hệ thống hút bụi gỗ tại các xưởng mộc, nhà máy ván ép, và xí nghiệp chế biến gỗ tại Đà Nẵng, Quảng Nam, Quảng Ngãi. Hệ thống bao gồm: hood hút bụi tại từng máy (máy cưa, máy bào, máy CNC router), đường ống tôn mạ kẽm, cyclone tách mạt thô, baghouse lọc bụi mịn, và quạt ly tâm công suất phù hợp.',
  },
  {
    question: 'Wet scrubber (tháp rửa khí) phù hợp với trường hợp nào?',
    answer:
      'Wet scrubber phù hợp khi cần xử lý đồng thời bụi và khí thải có tính ăn mòn hoặc mùi hôi. Ví dụ: khí thải có chứa SO₂, HCl, NH₃, H₂S hoặc hơi axit/kiềm. Wet scrubber sử dụng dung dịch hoá chất (NaOH, Ca(OH)₂, H₂SO₄) để hấp thụ và trung hoà khí độc. Hiệu suất xử lý bụi đạt 95–99% với hạt ≥ 2μm, đồng thời xử lý khí thải đạt QCVN. Nhược điểm là phát sinh nước thải cần xử lý thêm.',
  },
  {
    question: 'Thời gian thi công hệ thống hút bụi công nghiệp mất bao lâu?',
    answer:
      'Thời gian thi công phụ thuộc quy mô dự án. Hệ thống nhỏ (1–5 điểm hút, xưởng gỗ nhỏ): 5–10 ngày làm việc. Hệ thống trung bình (10–30 điểm hút, nhà máy vừa): 15–30 ngày. Hệ thống lớn (nhà máy xi măng, nhiệt điện, 50+ điểm hút): 1–3 tháng. Quy trình gồm: khảo sát → thiết kế → phê duyệt bản vẽ → gia công tại xưởng → vận chuyển → lắp đặt → chạy thử → nghiệm thu → bàn giao hồ sơ hoàn công.',
  },
]

const systemTypes = [
  {
    title: 'Túi Lọc Bụi (Baghouse Filter)',
    desc: 'Hệ thống lọc bụi bằng túi vải là công nghệ phổ biến nhất, hiệu suất lọc đạt 99.5–99.9% với hạt bụi ≥ 1μm. Túi lọc được làm từ polyester, polypropylene, PTFE hoặc sợi thuỷ tinh tuỳ nhiệt độ và tính chất hoá học của bụi. Hệ thống tự động rũ bụi bằng xung khí nén (pulse-jet) hoặc rung cơ học, duy trì hiệu suất lọc ổn định 24/7.',
    specs: ['Hiệu suất lọc: 99.5–99.9%', 'Hạt bụi: ≥ 1μm', 'Nhiệt độ: tối đa 260°C (sợi thuỷ tinh)', 'Vệ sinh: Xung khí nén tự động'],
    tag: 'Phổ biến nhất',
  },
  {
    title: 'Cyclone Separator (Lọc Bụi Ly Tâm)',
    desc: 'Cyclone sử dụng lực ly tâm để tách bụi thô ra khỏi dòng khí. Cấu tạo đơn giản, không có bộ phận chuyển động, chi phí vận hành thấp và tuổi thọ cao. Phù hợp làm bộ lọc sơ cấp (pre-filter) trước baghouse hoặc ESP, giúp giảm tải cho thiết bị lọc tinh và kéo dài tuổi thọ túi lọc.',
    specs: ['Hiệu suất: 80–95%', 'Hạt bụi: ≥ 10μm', 'Không cần thay vật tư lọc', 'Chi phí vận hành thấp nhất'],
    tag: 'Tiết kiệm',
  },
  {
    title: 'Wet Scrubber (Tháp Rửa Khí)',
    desc: 'Wet scrubber sử dụng dung dịch lỏng (nước hoặc hoá chất) để hấp thụ bụi và khí thải độc hại đồng thời. Đặc biệt hiệu quả với bụi dính, bụi có tính ăn mòn, khí thải chứa SO₂, HCl, NH₃. Có thể xử lý bụi ở nhiệt độ cao và bụi có nguy cơ cháy nổ — là lựa chọn bắt buộc cho nhiều ngành công nghiệp hoá chất.',
    specs: ['Hiệu suất bụi: 95–99%', 'Xử lý bụi + khí thải đồng thời', 'Chịu nhiệt cao, chống cháy nổ', 'Cần hệ thống xử lý nước thải'],
    tag: 'Đa năng',
  },
  {
    title: 'ESP (Lọc Bụi Tĩnh Điện)',
    desc: 'Electrostatic Precipitator (ESP) sử dụng điện trường cao áp để ion hoá và thu bụi. Hiệu suất cực cao đến 99.9%, tổn thất áp suất rất thấp (< 25 Pa), phù hợp cho lưu lượng khí lớn. Được sử dụng rộng rãi trong nhà máy nhiệt điện, xi măng, luyện thép — những nơi yêu cầu xử lý hàng trăm nghìn m³/h khí thải.',
    specs: ['Hiệu suất: 99–99.9%', 'Tổn thất áp suất: < 25 Pa', 'Lưu lượng: lên đến 500.000 m³/h', 'Chi phí đầu tư ban đầu cao'],
    tag: 'Cao cấp',
  },
]

const comparisonData = [
  { criteria: 'Hiệu suất lọc', baghouse: '99.5–99.9%', cyclone: '80–95%', scrubber: '95–99%', esp: '99–99.9%' },
  { criteria: 'Kích thước hạt tối thiểu', baghouse: '≥ 1 μm', cyclone: '≥ 10 μm', scrubber: '≥ 2 μm', esp: '≥ 0.1 μm' },
  { criteria: 'Tổn thất áp suất', baghouse: '100–250 Pa', cyclone: '50–150 Pa', scrubber: '250–500 Pa', esp: '< 25 Pa' },
  { criteria: 'Nhiệt độ tối đa', baghouse: '260°C', cyclone: '400°C+', scrubber: 'Không giới hạn', esp: '400°C' },
  { criteria: 'Chi phí đầu tư', baghouse: 'Trung bình', cyclone: 'Thấp', scrubber: 'Trung bình', esp: 'Cao' },
  { criteria: 'Chi phí vận hành', baghouse: 'Trung bình', cyclone: 'Rất thấp', scrubber: 'Cao (hoá chất + nước)', esp: 'Thấp' },
  { criteria: 'Xử lý khí thải', baghouse: 'Không', cyclone: 'Không', scrubber: 'Có', esp: 'Không' },
]

const industries = [
  {
    title: 'Ngành Chế Biến Gỗ',
    desc: 'Xưởng mộc, nhà máy ván ép, sản xuất nội thất — phát sinh lượng lớn bụi gỗ và mạt cưa. Bụi gỗ có nguy cơ cháy nổ cao (nồng độ cháy nổ LEL từ 40 g/m³). Hệ thống hút bụi cần thiết kế phòng nổ theo ATEX/NFPA 652, sử dụng cyclone + baghouse với van xả nổ (explosion vent) và hệ thống dập tia lửa (spark detection).',
    solutions: ['Cyclone tách mạt cưa thô', 'Baghouse lọc bụi mịn PM2.5', 'Van xả nổ ATEX', 'Hood hút tại từng máy CNC'],
  },
  {
    title: 'Ngành Xi Măng & Khoáng Sản',
    desc: 'Nhà máy xi măng, khai thác đá, nghiền khoáng sản — bụi có tính mài mòn cao, nhiệt độ khí thải có thể đến 350°C. Yêu cầu thiết bị lọc chịu nhiệt và chịu mài mòn đặc biệt. ESP là giải pháp phổ biến nhất cho nhà máy xi măng lớn nhờ khả năng xử lý lưu lượng cực lớn với tổn thất áp suất thấp.',
    solutions: ['ESP cho lò nung clinker', 'Baghouse sợi thuỷ tinh chịu nhiệt', 'Cyclone multicell cho nghiền', 'Hệ thống ống gió chịu mài mòn'],
  },
  {
    title: 'Ngành Thực Phẩm & Dược Phẩm',
    desc: 'Nhà máy chế biến thực phẩm, bột mì, đường, dược phẩm — bụi hữu cơ mịn, yêu cầu vệ sinh an toàn thực phẩm nghiêm ngặt. Hệ thống cần thiết kế bằng inox 304/316, bề mặt nhẵn dễ vệ sinh, không có góc chết tích tụ bụi. Tuân thủ tiêu chuẩn GMP, HACCP và ISO 22000.',
    solutions: ['Baghouse inox 304 đạt GMP', 'Ống gió inox bề mặt đánh bóng', 'Hệ thống CIP vệ sinh tự động', 'Túi lọc FDA-approved'],
  },
  {
    title: 'Ngành Dệt May & Giày Da',
    desc: 'Nhà máy dệt, kéo sợi, may mặc, giày da — bụi bông, xơ sợi, bụi da tổng hợp. Bụi sợi dài dễ bám dính và gây tắc nghẽn hệ thống lọc thông thường. Cần sử dụng túi lọc chuyên dụng chống bám dính (anti-static, PTFE membrane) và hệ thống rũ bụi xung khí nén mạnh.',
    solutions: ['Baghouse chống tĩnh điện', 'Túi lọc PTFE membrane', 'Hệ thống hút bụi tại máy dệt', 'Xử lý VOC từ keo dán'],
  },
]

const pricingData = [
  { system: 'Cyclone đơn (1–3 điểm hút)', capacity: '2.000–5.000 m³/h', price: '80–150 triệu', application: 'Xưởng gỗ nhỏ' },
  { system: 'Cyclone + Baghouse', capacity: '5.000–15.000 m³/h', price: '200–400 triệu', application: 'Nhà máy gỗ vừa' },
  { system: 'Baghouse Filter trung bình', capacity: '10.000–30.000 m³/h', price: '300–600 triệu', application: 'Nhà máy sản xuất' },
  { system: 'Baghouse Filter lớn', capacity: '30.000–100.000 m³/h', price: '600 triệu – 1.5 tỷ', application: 'Nhà máy xi măng' },
  { system: 'Wet Scrubber', capacity: '5.000–50.000 m³/h', price: '250–800 triệu', application: 'Hoá chất, mạ điện' },
  { system: 'ESP (Lọc tĩnh điện)', capacity: '50.000–500.000 m³/h', price: '1–5 tỷ', application: 'Nhiệt điện, xi măng' },
]

const processSteps = [
  { step: '01', title: 'Khảo sát & Đánh giá hiện trạng', desc: 'Đội ngũ kỹ sư đến tận nhà xưởng khảo sát: xác định nguồn phát sinh bụi, đo lưu lượng và nồng độ bụi hiện tại, đánh giá layout nhà xưởng, xác định vị trí đặt thiết bị và tuyến ống. Lập báo cáo khảo sát chi tiết và đề xuất giải pháp kỹ thuật tối ưu.' },
  { step: '02', title: 'Thiết kế hệ thống & Tính toán kỹ thuật', desc: 'Tính toán lưu lượng hút tại từng điểm, tốc độ gió trong ống (transport velocity), tổn thất áp suất toàn hệ thống. Lựa chọn công nghệ lọc phù hợp, chọn quạt và motor đúng công suất. Lập bản vẽ thiết kế 2D/3D chi tiết và trình phê duyệt.' },
  { step: '03', title: 'Gia công & Chế tạo thiết bị', desc: 'Gia công ống gió, hood hút, cyclone, thân baghouse tại xưởng 150m² của Cường Thông Gió. Sử dụng máy cắt Plasma CNC và máy hàn TIG/MIG chuyên dụng. Kiểm tra chất lượng 100% trước khi xuất xưởng: kích thước, mối hàn, độ kín khít.' },
  { step: '04', title: 'Lắp đặt & Kết nối hệ thống', desc: 'Vận chuyển và lắp đặt tại công trình theo đúng bản vẽ thiết kế. Kết nối đường ống, lắp thiết bị lọc, quạt hút, hệ thống xả bụi tự động. Lắp đặt hệ thống điều khiển tự động PLC (nếu có) và hệ thống đo giám sát áp suất, nhiệt độ.' },
  { step: '05', title: 'Chạy thử & Nghiệm thu', desc: 'Vận hành thử hệ thống, đo kiểm nồng độ bụi đầu ra so với QCVN 19:2009/BTNMT. Hiệu chỉnh lưu lượng tại từng điểm hút, cân bằng hệ thống. Bàn giao hồ sơ hoàn công, hướng dẫn vận hành — bảo trì, và cung cấp bảo hành 12–24 tháng.' },
]

export function XuLyBuiCongNghiep() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const breadcrumb = makeBreadcrumbSchema([
    { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
    { name: 'Xử lý bụi công nghiệp', url: 'https://cuongthonggio.com/xu-ly-bui-cong-nghiep' },
  ])

  const faqSchema = makeFAQSchema(faqs)

  const serviceSchema = makeServiceSchema({
    name: 'Xử Lý Bụi Công Nghiệp Đà Nẵng',
    description:
      'Thiết kế, thi công hệ thống hút bụi công nghiệp tại Đà Nẵng. Túi lọc bụi baghouse, cyclone separator, wet scrubber, ESP. Đạt chuẩn QCVN 19:2009/BTNMT. Phục vụ ngành gỗ, xi măng, thực phẩm, dệt may.',
    areaServed: 'Đà Nẵng',
  })

  return (
    <div className="bg-white min-h-screen font-sans text-zinc-900">
      <SEO
        title="Xử Lý Bụi Công Nghiệp — Hệ Thống Hút & Lọc Bụi Chuyên Nghiệp Đà Nẵng"
        description="Thiết kế, thi công hệ thống hút bụi công nghiệp tại Đà Nẵng. Baghouse filter, cyclone separator, wet scrubber, ESP. Đạt QCVN 19:2009/BTNMT. Ngành gỗ, xi măng, thực phẩm, dệt may. Hotline 0905 001 224."
        keywords="xử lý bụi công nghiệp Đà Nẵng, hệ thống hút bụi, túi lọc bụi baghouse, cyclone separator, wet scrubber, lọc bụi tĩnh điện ESP, QCVN 19 khí thải, hút bụi gỗ, xử lý khí thải, lọc bụi nhà máy xi măng, hệ thống hút bụi dệt may, lọc bụi thực phẩm, xử lý bụi KCN Đà Nẵng"
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
              <span itemProp="name" className="text-zinc-900 font-bold">Xử lý bụi công nghiệp</span>
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
                Giải pháp xử lý bụi toàn diện
              </motion.span>
              <div className="mb-10 md:mb-12 max-w-6xl w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.1] text-center">
                  Xử Lý Bụi Công Nghiệp<br />
                  <span className="text-zinc-400">Hệ Thống Hút & Lọc Bụi Chuyên Nghiệp</span>
                </h1>
              </div>

              <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-500 mb-10 md:mb-14 leading-relaxed max-w-3xl font-normal px-4">
                Cường Thông Gió thiết kế và thi công trọn gói hệ thống hút bụi, lọc bụi công nghiệp tại Đà Nẵng và Miền Trung. Từ túi lọc bụi baghouse, cyclone separator đến wet scrubber và lọc tĩnh điện ESP — chúng tôi đảm bảo nồng độ bụi đầu ra đạt chuẩn QCVN 19:2009/BTNMT, bảo vệ sức khoẻ công nhân và tuân thủ quy định môi trường.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto px-6 mb-16">
                <Button asChild size="lg" className="w-full sm:w-auto min-w-[200px] px-8 font-bold text-sm h-14 rounded-full shadow-lg shadow-zinc-100 transition-all duration-300 bg-zinc-950 text-white hover:bg-zinc-800 uppercase tracking-widest whitespace-nowrap">
                  <Link to="/lien-he">Khảo sát miễn phí</Link>
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
      <section className="py-12 md:py-20 bg-zinc-50 border-y border-zinc-100" aria-label="Thống kê năng lực xử lý bụi">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center w-full mx-auto max-w-5xl">
            {[
              { value: '99.9%', label: 'Hiệu suất lọc tối đa' },
              { value: '200+', label: 'Hệ thống đã lắp đặt' },
              { value: 'QCVN', label: 'Đạt chuẩn khí thải' },
              { value: '24h', label: 'Phản hồi nhanh' },
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
      <section className="py-20 md:py-32 bg-white" aria-label="Giới thiệu dịch vụ xử lý bụi công nghiệp">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-8 tracking-tight">
                Tại sao cần hệ thống<br />xử lý bụi công nghiệp?
              </h2>
              <div className="prose prose-lg max-w-none text-zinc-600 leading-relaxed space-y-6">
                <p>
                  <strong className="text-zinc-800">Bụi công nghiệp là một trong những tác nhân gây ô nhiễm nghiêm trọng nhất</strong> trong môi trường sản xuất. Theo thống kê của Bộ Y tế, hơn 30% bệnh nghề nghiệp tại Việt Nam liên quan trực tiếp đến bụi phổi — bao gồm bụi silic (silicosis), bụi amiang (asbestosis) và bụi bông (byssinosis). Mỗi năm, hàng nghìn công nhân mắc bệnh phổi nghề nghiệp do tiếp xúc lâu dài với bụi tại nơi làm việc.
                </p>
                <p>
                  Ngoài vấn đề sức khoẻ, <strong className="text-zinc-800">bụi công nghiệp còn tiềm ẩn nguy cơ cháy nổ cực kỳ nguy hiểm</strong>. Bụi gỗ, bụi bột mì, bụi nhôm, bụi đường khi đạt nồng độ tới hạn (LEL — Lower Explosive Limit) có thể phát nổ với sức công phá tương đương thuốc nổ. Vụ nổ bụi tại nhà máy đường Imperial Sugar (Mỹ, 2008) đã cướp đi sinh mạng 14 công nhân — minh chứng rõ nét cho hậu quả của việc không kiểm soát bụi đúng cách.
                </p>
                <p>
                  Tại Việt Nam, <strong className="text-zinc-800">QCVN 19:2009/BTNMT quy định nồng độ bụi tổng trong khí thải công nghiệp không được vượt 200 mg/Nm³</strong> (cột B — khu công nghiệp) và 100 mg/Nm³ (cột A — khu dân cư). Các doanh nghiệp vi phạm sẽ bị xử phạt hành chính từ 50–500 triệu đồng, đình chỉ hoạt động hoặc thu hồi giấy phép. Vì vậy, đầu tư hệ thống xử lý bụi không chỉ là trách nhiệm xã hội mà còn là yêu cầu pháp lý bắt buộc.
                </p>
                <p>
                  Cường Thông Gió cung cấp <strong className="text-zinc-800">giải pháp xử lý bụi toàn diện từ A đến Z</strong>: khảo sát hiện trạng → thiết kế hệ thống → gia công chế tạo → lắp đặt → chạy thử nghiệm thu. Với hơn 200 hệ thống đã lắp đặt tại các khu công nghiệp Hoà Khánh, Liên Chiểu, Điện Ngọc và các tỉnh Miền Trung, chúng tôi tự tin đáp ứng mọi yêu cầu xử lý bụi — từ xưởng gỗ nhỏ đến nhà máy xi măng quy mô lớn.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* System Types Section */}
      <section className="py-20 md:py-32 bg-zinc-50" aria-label="Các loại hệ thống lọc bụi">
        <div className="container-custom">
          <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              4 công nghệ lọc bụi công nghiệp
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
              Cường Thông Gió tư vấn và thi công đầy đủ 4 công nghệ lọc bụi hàng đầu, lựa chọn phù hợp nhất theo tính chất bụi, lưu lượng và ngân sách của từng doanh nghiệp.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-7xl mx-auto">
            {systemTypes.map((system, i) => (
              <motion.article
                key={system.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-[1.5rem] overflow-hidden border border-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col p-8 md:p-10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block px-3 py-1 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">{system.tag}</span>
                </div>
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

      {/* Technical Comparison Table */}
      <section className="py-16 md:py-24 bg-white border-y border-zinc-100" aria-label="So sánh kỹ thuật các công nghệ lọc bụi">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
              So sánh 4 công nghệ lọc bụi
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto">
              Bảng so sánh chi tiết giúp doanh nghiệp lựa chọn công nghệ phù hợp nhất theo yêu cầu kỹ thuật và ngân sách.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm bg-white max-w-6xl mx-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Tiêu chí</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Baghouse</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Cyclone</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Wet Scrubber</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">ESP</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {comparisonData.map((row) => (
                  <tr key={row.criteria} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-zinc-900">{row.criteria}</td>
                    <td className="px-6 py-4 text-zinc-600">{row.baghouse}</td>
                    <td className="px-6 py-4 text-zinc-600">{row.cyclone}</td>
                    <td className="px-6 py-4 text-zinc-600">{row.scrubber}</td>
                    <td className="px-6 py-4 text-zinc-600">{row.esp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* QCVN Standards Section */}
      <section className="py-20 md:py-32 bg-zinc-950 text-white" aria-label="Tiêu chuẩn QCVN về khí thải">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight leading-tight">
                  Tiêu chuẩn QCVN<br />
                  <span className="text-zinc-500">— Tuân thủ quy định môi trường</span>
                </h2>
                <div className="space-y-6 text-zinc-400 leading-relaxed">
                  <p>
                    <strong className="text-white">QCVN 19:2009/BTNMT</strong> là quy chuẩn kỹ thuật quốc gia về khí thải công nghiệp đối với bụi và các chất vô cơ. Quy chuẩn này quy định nồng độ tối đa cho phép của bụi tổng trong khí thải: <strong className="text-white">100 mg/Nm³ (cột A)</strong> cho cơ sở trong khu dân cư và <strong className="text-white">200 mg/Nm³ (cột B)</strong> cho cơ sở trong khu công nghiệp. Ngoài ra, các chất vô cơ như SO₂, NOₓ, CO cũng phải tuân thủ giới hạn riêng.
                  </p>
                  <p>
                    <strong className="text-white">QCVN 20:2009/BTNMT</strong> bổ sung quy định về các chất hữu cơ trong khí thải — bao gồm benzene, toluene, xylene, formaldehyde và các hợp chất VOC. Đặc biệt quan trọng cho ngành sản xuất sơn, in ấn, dệt nhuộm và chế biến gỗ sử dụng keo dán.
                  </p>
                  <p>
                    Cường Thông Gió thiết kế hệ thống xử lý bụi đảm bảo <strong className="text-white">nồng độ bụi đầu ra ≤ 50 mg/Nm³</strong> — thấp hơn nhiều so với giới hạn QCVN, tạo dự phòng an toàn cho doanh nghiệp khi cơ quan môi trường kiểm tra. Chúng tôi cung cấp báo cáo quan trắc môi trường và hỗ trợ lập hồ sơ đánh giá tác động môi trường (ĐTM).
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[
                  { label: 'QCVN 19', sub: 'Bụi & chất vô cơ' },
                  { label: '≤ 50', sub: 'mg/Nm³ đầu ra' },
                  { label: 'QCVN 20', sub: 'Chất hữu cơ VOC' },
                  { label: '100%', sub: 'Đạt chuẩn nghiệm thu' },
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

      {/* Industry Applications Section */}
      <section className="py-20 md:py-32 bg-white" aria-label="Các ngành ứng dụng hệ thống hút bụi">
        <div className="container-custom">
          <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Ngành nghề ứng dụng
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
              Mỗi ngành công nghiệp có đặc thù bụi riêng — chúng tôi thiết kế giải pháp chuyên biệt cho từng ứng dụng cụ thể.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-7xl mx-auto">
            {industries.map((industry, i) => (
              <motion.article
                key={industry.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-zinc-50 rounded-[1.5rem] overflow-hidden border border-zinc-100 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col p-8 md:p-10"
              >
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4 tracking-tight leading-tight">{industry.title}</h3>
                <p className="text-zinc-500 text-sm md:text-base mb-8 leading-relaxed">{industry.desc}</p>
                <div className="space-y-3 mt-auto">
                  <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mb-2">Giải pháp</div>
                  {industry.solutions.map((sol) => (
                    <div key={sol} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 shrink-0" />
                      <span className="text-sm font-semibold text-zinc-700">{sol}</span>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-zinc-50" aria-label="Quy trình thi công hệ thống hút bụi">
        <div className="container-custom">
          <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Quy trình thi công 5 bước
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
              Quy trình chuẩn hoá từ khảo sát đến nghiệm thu — đảm bảo hệ thống vận hành hiệu quả và đạt chuẩn QCVN ngay từ lần chạy thử đầu tiên.
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
      <section className="py-16 md:py-24 bg-white border-y border-zinc-100" aria-label="Bảng giá hệ thống hút bụi công nghiệp">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
              Bảng giá hệ thống xử lý bụi tham khảo
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto">
              <strong>Đơn giá tham khảo (VNĐ)</strong> — Giá thực tế phụ thuộc vào hiện trạng nhà xưởng, loại bụi, lưu lượng và yêu cầu đầu ra. Liên hệ để nhận báo giá chính xác.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm bg-white max-w-6xl mx-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Loại hệ thống</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Công suất</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Giá tham khảo</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Ứng dụng</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {pricingData.map((row) => (
                  <tr key={row.system} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-zinc-900">{row.system}</td>
                    <td className="px-6 py-4 text-zinc-600">{row.capacity}</td>
                    <td className="px-6 py-4 text-zinc-600 font-medium">{row.price}</td>
                    <td className="px-6 py-4 text-zinc-600">{row.application}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-zinc-400 mt-4 max-w-2xl mx-auto">
            * Giá trên chưa bao gồm VAT. Bao gồm khảo sát, thiết kế, gia công, lắp đặt và chạy thử. Cập nhật tháng 6/2026.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-zinc-50" aria-label="Ưu điểm hệ thống xử lý bụi Cường Thông Gió">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-zinc-900 mb-12 tracking-tight text-center">
              Tại sao chọn Cường Thông Gió?
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Thiết kế theo thực tế', desc: 'Không áp dụng giải pháp chung chung — mỗi hệ thống được thiết kế riêng dựa trên khảo sát thực tế: loại bụi, kích thước hạt, nhiệt độ, độ ẩm, lưu lượng và bố trí mặt bằng nhà xưởng. Đảm bảo hiệu suất tối ưu với chi phí hợp lý nhất.' },
                { title: 'Xưởng gia công tại Đà Nẵng', desc: 'Sở hữu xưởng gia công 150m² với dây chuyền cắt Plasma CNC, máy hàn TIG/MIG, máy cuốn tôn. Tự sản xuất ống gió, hood hút, cyclone, thân baghouse — không phụ thuộc bên thứ ba, kiểm soát chất lượng 100% và đảm bảo tiến độ cam kết.' },
                { title: 'Đạt chuẩn QCVN nghiêm ngặt', desc: 'Thiết kế hệ thống đảm bảo nồng độ bụi đầu ra ≤ 50 mg/Nm³ — thấp hơn nhiều so với giới hạn QCVN 19 (200 mg/Nm³). Cung cấp báo cáo quan trắc và hỗ trợ lập hồ sơ môi trường phục vụ thanh tra.' },
                { title: 'Bảo hành & bảo trì dài hạn', desc: 'Bảo hành 12–24 tháng cho toàn bộ hệ thống. Cung cấp hợp đồng bảo trì định kỳ: vệ sinh lọc, thay túi, kiểm tra quạt, đo áp suất — giúp hệ thống vận hành ổn định và tuổi thọ thiết bị được kéo dài tối đa.' },
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

      {/* Dust Explosion Safety Section */}
      <section className="py-20 md:py-32 bg-white" aria-label="An toàn phòng chống nổ bụi">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-8 tracking-tight">
                  An toàn phòng chống nổ bụi<br />
                  <span className="text-zinc-400">— Yếu tố sống còn</span>
                </h2>
                <div className="space-y-6 text-zinc-600 leading-relaxed">
                  <p>
                    Nổ bụi (dust explosion) là hiện tượng cháy nổ xảy ra khi bụi dễ cháy đạt nồng độ giới hạn nổ dưới (LEL) trong môi trường có nguồn phát lửa. Bụi gỗ có LEL chỉ khoảng 40 g/m³, bụi bột mì 60 g/m³, bụi nhôm thậm chí thấp hơn — chỉ 30 g/m³. Điều này có nghĩa một lượng nhỏ bụi lơ lửng trong không khí đã đủ gây ra vụ nổ kinh hoàng.
                  </p>
                  <p>
                    Cường Thông Gió thiết kế hệ thống hút bụi tuân thủ tiêu chuẩn phòng nổ quốc tế <strong className="text-zinc-800">ATEX (châu Âu)</strong> và <strong className="text-zinc-800">NFPA 652/654 (Mỹ)</strong>. Các biện pháp an toàn bao gồm: van xả nổ (explosion vent), van cách ly nổ (explosion isolation valve), hệ thống dập tia lửa (spark detection & extinguishing), thiết bị chống cháy ngược (backdraft damper), và tiếp đất chống tĩnh điện cho toàn bộ đường ống.
                  </p>
                  <p>
                    Đặc biệt với ngành gỗ và ngành thực phẩm — hai ngành có nguy cơ nổ bụi cao nhất tại Việt Nam — chúng tôi luôn tích hợp đầy đủ thiết bị an toàn phòng nổ vào thiết kế hệ thống, đảm bảo an toàn tuyệt đối cho công nhân và tài sản doanh nghiệp.
                  </p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-6">
                {[
                  {
                    title: 'Van Xả Nổ (Explosion Vent)',
                    desc: 'Màng xả áp lực lắp trên thân cyclone/baghouse, tự động mở khi áp suất nội tăng đột ngột do nổ bụi, giải phóng áp lực ra ngoài an toàn — bảo vệ kết cấu thiết bị và con người.',
                    tag: 'Bắt buộc',
                  },
                  {
                    title: 'Hệ Thống Dập Tia Lửa',
                    desc: 'Cảm biến hồng ngoại phát hiện tia lửa trong đường ống ở tốc độ < 0.5 giây, tự động kích hoạt đầu phun nước hoặc hoá chất dập lửa trước khi tia lửa đến thiết bị lọc — ngăn chặn cháy nổ từ nguồn gốc.',
                    tag: 'Khuyến nghị',
                  },
                  {
                    title: 'Tiếp Đất Chống Tĩnh Điện',
                    desc: 'Toàn bộ đường ống, thiết bị lọc và phễu thu bụi được nối đất đồng bộ, điện trở tiếp đất < 10Ω. Ngăn ngừa tích tụ tĩnh điện — nguyên nhân phổ biến gây phát tia lửa và cháy nổ bụi.',
                    tag: 'Tiêu chuẩn',
                  },
                ].map((item) => (
                  <div key={item.title} className="bg-zinc-50 rounded-2xl p-6 md:p-8 border border-zinc-100">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-3 py-1 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full">{item.tag}</span>
                    </div>
                    <h3 className="text-lg font-bold text-zinc-900 mb-2">{item.title}</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-zinc-50" aria-label="Câu hỏi thường gặp về xử lý bụi công nghiệp" id="faq">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14 md:mb-20">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
                Câu hỏi thường gặp
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
                Giải đáp chi tiết các thắc mắc phổ biến về hệ thống hút bụi và xử lý bụi công nghiệp.
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
                  className="bg-white rounded-2xl border border-zinc-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                    aria-expanded={openFaq === idx}
                    aria-controls={`bui-faq-${idx}`}
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
                    id={`bui-faq-${idx}`}
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
      <section className="relative w-full py-20 md:py-32 px-4" aria-label="Liên hệ tư vấn hệ thống hút bụi">
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
                Cần giải pháp xử lý bụi?
              </h2>
              <p className="text-zinc-400 mb-10 md:mb-14 text-base md:text-lg font-normal leading-relaxed max-w-xl mx-auto">
                Đội ngũ kỹ sư Cường Thông Gió sẵn sàng khảo sát miễn phí, tư vấn giải pháp tối ưu và gửi báo giá chi tiết trong vòng 24h. Liên hệ ngay để bảo vệ sức khoẻ công nhân và tuân thủ quy định môi trường.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 mx-auto w-full sm:w-auto">
                <Button asChild size="lg" className="w-full sm:w-auto font-bold uppercase tracking-wider text-[13px] h-14 md:h-16 px-10 rounded-full shadow-lg transition-all duration-300 bg-white text-zinc-900 hover:bg-zinc-100 whitespace-nowrap">
                  <Link to="/lien-he" className="flex items-center justify-center w-full h-full">Yêu cầu khảo sát miễn phí</Link>
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
