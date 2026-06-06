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
    question: 'Hệ thống thông gió nhà xưởng bao gồm những thiết bị gì?',
    answer:
      'Hệ thống thông gió nhà xưởng thường bao gồm: quạt hút công nghiệp (quạt hướng trục hoặc ly tâm), quạt cấp gió tươi, ống gió phân phối, cửa gió (louver), tấm cooling pad (nếu cần làm mát), van điều tiết VCD, bộ lọc gió và hệ thống điều khiển tự động. Thiết bị cụ thể phụ thuộc vào diện tích xưởng, loại hình sản xuất và yêu cầu nhiệt độ.',
  },
  {
    question: 'ACH (Air Changes per Hour) là gì và tính như thế nào?',
    answer:
      'ACH là số lần thay đổi không khí trong 1 giờ, là chỉ số quan trọng nhất để thiết kế hệ thống thông gió. Công thức: ACH = Lưu lượng gió (m³/h) ÷ Thể tích phòng (m³). Ví dụ: nhà xưởng 1000m², cao 8m, cần ACH = 20 → Lưu lượng = 20 × 8000 = 160.000 m³/h. Tiêu chuẩn ACH theo ngành: xưởng cơ khí 15-25, xưởng hàn 20-30, xưởng sơn 30-50.',
  },
  {
    question: 'Chi phí thi công thông gió nhà xưởng khoảng bao nhiêu?',
    answer:
      'Chi phí phụ thuộc vào diện tích, phương pháp thông gió và yêu cầu kỹ thuật. Thông gió tự nhiên (louver + quạt hút mái): 80.000 – 150.000 VNĐ/m². Thông gió cưỡng bức (quạt + ống gió): 150.000 – 350.000 VNĐ/m². Thông gió kết hợp làm mát cooling pad: 250.000 – 500.000 VNĐ/m². Liên hệ 0905 001 224 để nhận báo giá chính xác.',
  },
  {
    question: 'Cooling pad hoạt động như thế nào và hiệu quả ra sao?',
    answer:
      'Tấm cooling pad là tấm giấy kraft có cấu trúc tổ ong, được ngâm nước liên tục. Khi không khí nóng đi qua tấm pad, nước bay hơi hấp thụ nhiệt, làm giảm nhiệt độ không khí 5-12°C. Hiệu quả nhất khi kết hợp với quạt hút phía đối diện, tạo luồng gió mát xuyên suốt nhà xưởng. Chi phí vận hành chỉ bằng 1/8 so với điều hoà.',
  },
  {
    question: 'Thông gió tự nhiên và thông gió cưỡng bức khác nhau thế nào?',
    answer:
      'Thông gió tự nhiên tận dụng chênh lệch áp suất và nhiệt độ tự nhiên, sử dụng louver, cửa sổ và ống thông gió mái. Ưu điểm: không tốn điện, chi phí thấp. Nhược điểm: phụ thuộc thời tiết, khó kiểm soát lưu lượng. Thông gió cưỡng bức dùng quạt công nghiệp và ống gió để hút/đẩy không khí. Ưu điểm: kiểm soát chính xác, hoạt động mọi thời tiết. Nhược điểm: tiêu thụ điện, chi phí đầu tư cao hơn.',
  },
  {
    question: 'Thời gian thi công hệ thống thông gió nhà xưởng mất bao lâu?',
    answer:
      'Tuỳ quy mô dự án: nhà xưởng nhỏ (dưới 500m²) từ 7-14 ngày; nhà xưởng vừa (500-2000m²) từ 14-30 ngày; nhà xưởng lớn (trên 2000m²) từ 30-60 ngày. Cường Thông Gió cam kết bám sát tiến độ đã thỏa thuận, có penalty nếu trễ hạn.',
  },
  {
    question: 'Cường Thông Gió có thi công thông gió cho khu công nghiệp không?',
    answer:
      'Có. Chúng tôi đã thi công hệ thống thông gió cho hàng trăm nhà xưởng tại các KCN Hòa Khánh, Hòa Cầm, An Đồn, Thọ Quang (Đà Nẵng) và KCN Điện Nam – Điện Ngọc (Quảng Nam). Chúng tôi có kinh nghiệm làm việc với mọi loại hình sản xuất: cơ khí, may mặc, chế biến gỗ, thực phẩm, điện tử.',
  },
]

const ventMethods = [
  {
    title: 'Thông Gió Tự Nhiên',
    badge: 'Chi phí thấp',
    desc: 'Tận dụng chênh lệch áp suất và nhiệt độ tự nhiên để tạo luồng không khí lưu thông. Sử dụng các giải pháp kiến trúc như louver thông gió, cửa thông gió mái (ridge vent), ống thông gió kiểu turbine. Phù hợp cho nhà xưởng có mái cao, diện tích lớn, nguồn nhiệt thải ít.',
    specs: [
      'Louver thông gió tường',
      'Ridge vent mái',
      'Turbine ventilator',
      'Không tiêu thụ điện năng',
    ],
  },
  {
    title: 'Thông Gió Cưỡng Bức',
    badge: 'Hiệu quả cao',
    desc: 'Sử dụng quạt công nghiệp (hướng trục hoặc ly tâm) kết hợp hệ thống ống gió để chủ động hút không khí ô nhiễm ra ngoài và cấp khí tươi vào trong. Đây là phương pháp phổ biến nhất, kiểm soát chính xác lưu lượng gió theo tiêu chuẩn ACH.',
    specs: [
      'Quạt hút hướng trục/ly tâm',
      'Quạt cấp gió tươi',
      'Ống gió phân phối',
      'Kiểm soát chính xác ACH',
    ],
  },
  {
    title: 'Thông Gió + Làm Mát',
    badge: 'Giải pháp tối ưu',
    desc: 'Kết hợp hệ thống thông gió cưỡng bức với tấm cooling pad hoặc máy làm mát bay hơi. Giải pháp này vừa thay đổi không khí vừa giảm nhiệt độ 5-12°C, tạo môi trường làm việc thoải mái cho công nhân. Chi phí vận hành chỉ bằng 1/8 điều hoà truyền thống.',
    specs: [
      'Cooling pad tổ ong',
      'Máy làm mát bay hơi',
      'Giảm nhiệt 5-12°C',
      'Chi phí 1/8 điều hoà',
    ],
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

const pricingData = [
  { method: 'Thông gió tự nhiên (louver + quạt mái)', price500: '40 – 75 triệu', price1000: '70 – 130 triệu', price2000: '120 – 250 triệu' },
  { method: 'Thông gió cưỡng bức (quạt + ống gió)', price500: '75 – 175 triệu', price1000: '130 – 320 triệu', price2000: '250 – 600 triệu' },
  { method: 'Thông gió + Cooling pad', price500: '125 – 250 triệu', price1000: '220 – 480 triệu', price2000: '400 – 900 triệu' },
]

export function ThongGioNhaXuong() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const breadcrumb = makeBreadcrumbSchema([
    { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
    { name: 'Thông gió nhà xưởng', url: 'https://cuongthonggio.com/thong-gio-nha-xuong-da-nang' },
  ])

  const faqSchema = makeFAQSchema(faqs)

  const serviceSchema = makeServiceSchema({
    name: 'Thông Gió Nhà Xưởng Đà Nẵng',
    description:
      'Thi công trọn gói hệ thống thông gió nhà xưởng tại Đà Nẵng. Thông gió tự nhiên, cưỡng bức, làm mát cooling pad. Thiết kế theo ACH chuẩn. 13+ năm kinh nghiệm.',
    areaServed: 'Đà Nẵng',
  })

  return (
    <div className="bg-white min-h-screen font-sans text-zinc-900">
      <SEO
        title="Thông Gió Nhà Xưởng Đà Nẵng — Thi Công Trọn Gói"
        description="Thi công hệ thống thông gió nhà xưởng tại Đà Nẵng. Thông gió tự nhiên, cưỡng bức, cooling pad. Tính toán ACH chuẩn. 13+ năm kinh nghiệm, 2000+ dự án. Hotline 0905 001 224."
        keywords="thông gió nhà xưởng Đà Nẵng, hệ thống thông gió, thông gió công nghiệp, cooling pad, quạt thông gió nhà xưởng, thi công thông gió, ACH, làm mát nhà xưởng, thông gió KCN Hòa Khánh, thông gió KCN Hòa Cầm, quạt hút công nghiệp Đà Nẵng, thông gió nhà máy Liên Chiểu"
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
              <span itemProp="name" className="text-zinc-900 font-bold">Thông gió nhà xưởng</span>
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
                Thi công trọn gói
              </motion.span>
              <div className="mb-10 md:mb-12 max-w-6xl w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.1] text-center">
                  Thông Gió Nhà Xưởng Đà Nẵng<br />
                  <span className="text-zinc-400">Thi Công Trọn Gói, Hiệu Quả Cao</span>
                </h1>
              </div>

              <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-500 mb-10 md:mb-14 leading-relaxed max-w-3xl font-normal px-4">
                Cường Thông Gió cung cấp giải pháp thông gió toàn diện cho nhà xưởng sản xuất — từ thiết kế, tính toán ACH, sản xuất thiết bị đến thi công lắp đặt và nghiệm thu. Hơn 13 năm kinh nghiệm thi công tại các KCN lớn nhất Đà Nẵng và Miền Trung.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto px-6 mb-16">
                <Button asChild size="lg" className="w-full sm:w-auto min-w-[200px] px-8 font-bold text-sm h-14 rounded-full shadow-lg shadow-zinc-100 bg-zinc-950 text-white hover:bg-zinc-800 uppercase tracking-widest whitespace-nowrap">
                  <Link to="/lien-he">Yêu cầu khảo sát miễn phí</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] px-8 font-bold text-sm h-14 rounded-full border-[2px] border-zinc-200 hover:border-zinc-950 hover:bg-zinc-50 text-zinc-950 uppercase tracking-widest whitespace-nowrap">
                  <a href="tel:0905001224">Gọi: 0905 001 224</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-20 md:py-32 bg-zinc-50 border-y border-zinc-100" aria-label="Giới thiệu thông gió nhà xưởng">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-8 tracking-tight">
                Vì sao nhà xưởng cần hệ thống thông gió chuyên nghiệp?
              </h2>
              <div className="space-y-6 text-zinc-600 leading-relaxed">
                <p>
                  <strong className="text-zinc-800">Nhà xưởng sản xuất là môi trường phát sinh nhiều nguồn ô nhiễm không khí</strong> — từ nhiệt thải của máy móc, khói hàn, bụi mài, hơi dung môi, đến mùi hoá chất. Nếu không có hệ thống thông gió phù hợp, không khí trong xưởng sẽ bị ô nhiễm nghiêm trọng, ảnh hưởng trực tiếp đến sức khoẻ công nhân, năng suất lao động và tuổi thọ thiết bị.
                </p>
                <p>
                  Theo <strong className="text-zinc-800">QCVN 26:2016/BYT</strong> (Quy chuẩn kỹ thuật quốc gia về vi khí hậu nơi làm việc), nhà xưởng sản xuất phải đảm bảo nhiệt độ không vượt quá 32°C, vận tốc gió 0.5-1.5 m/s và số lần thay đổi không khí (ACH) phù hợp theo ngành nghề. Vi phạm có thể bị xử phạt hành chính và ảnh hưởng đến giấy phép hoạt động.
                </p>
                <p>
                  Cường Thông Gió với đội ngũ kỹ sư giàu kinh nghiệm sẽ khảo sát thực tế nhà xưởng, phân tích nguồn nhiệt và ô nhiễm, tính toán lưu lượng gió theo tiêu chuẩn ACH, từ đó đề xuất giải pháp thông gió tối ưu nhất về cả hiệu quả kỹ thuật lẫn chi phí đầu tư. Chúng tôi đã thi công thành công cho hơn 2.000 nhà xưởng tại Đà Nẵng, Quảng Nam và các tỉnh Miền Trung.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Ventilation Methods */}
      <section className="py-20 md:py-32 bg-white" aria-label="Phương pháp thông gió nhà xưởng">
        <div className="container-custom">
          <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              3 phương pháp thông gió nhà xưởng
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
              Tuỳ vào diện tích, loại hình sản xuất và ngân sách, chúng tôi sẽ tư vấn phương pháp phù hợp nhất cho nhà xưởng của bạn.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
            {ventMethods.map((method, i) => (
              <motion.article
                key={method.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-zinc-50 rounded-[1.5rem] overflow-hidden border border-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col p-8 md:p-10"
              >
                <span className="inline-block px-3 py-1 bg-zinc-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-6 self-start">{method.badge}</span>
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4 tracking-tight leading-tight">{method.title}</h3>
                <p className="text-zinc-500 text-sm md:text-base mb-8 leading-relaxed">{method.desc}</p>
                <div className="space-y-3 mt-auto">
                  {method.specs.map((spec) => (
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

      {/* ACH Table */}
      <section className="py-16 md:py-24 bg-zinc-50 border-y border-zinc-100" aria-label="Bảng tham khảo ACH">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
              Bảng tham khảo chỉ số ACH theo ngành
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-3xl mx-auto">
              <strong>ACH (Air Changes per Hour)</strong> — số lần thay đổi không khí trong 1 giờ. Chỉ số này quyết định công suất quạt và kích thước ống gió cần thiết cho nhà xưởng.
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

      {/* Cooling Pad Detail */}
      <section className="py-20 md:py-32 bg-white" aria-label="Hệ thống cooling pad">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <span className="inline-block px-4 py-1 bg-zinc-100 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">Giải pháp làm mát</span>
              <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-8 tracking-tight">
                Hệ thống Cooling Pad<br />
                <span className="text-zinc-400">Làm mát không khí hiệu quả</span>
              </h2>
              <div className="space-y-6 text-zinc-600 leading-relaxed">
                <p>
                  <strong className="text-zinc-800">Cooling pad (tấm làm mát)</strong> là giải pháp làm mát nhà xưởng phổ biến nhất tại khu vực Đà Nẵng và Miền Trung — nơi có khí hậu nóng ẩm quanh năm. Nguyên lý hoạt động dựa trên hiện tượng bay hơi nước: không khí nóng bên ngoài được hút qua tấm pad ngâm nước, nhiệt lượng bị hấp thụ bởi quá trình bay hơi, nhiệt độ không khí giảm 5-12°C trước khi vào xưởng.
                </p>
                <p>
                  Hệ thống cooling pad thường được lắp đặt ở một bên tường nhà xưởng, kết hợp với quạt hút công nghiệp ở phía đối diện. Luồng gió mát sẽ di chuyển xuyên suốt nhà xưởng với vận tốc 1-2 m/s, tạo cảm giác mát mẻ cho công nhân. Chi phí vận hành chỉ khoảng 500-1.500 VNĐ/m²/tháng — tiết kiệm gấp 8 lần so với điều hoà.
                </p>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-6">
              {[
                { title: 'Thông số kỹ thuật Cooling Pad', items: ['Kích thước tấm: 1800×600×150mm / 1800×600×100mm', 'Vật liệu: Giấy kraft tổ ong xử lý kháng khuẩn', 'Hiệu suất bay hơi: 85-95%', 'Tuổi thọ: 3-5 năm (tùy chất lượng nước)'] },
                { title: 'Ưu điểm nổi bật', items: ['Giảm nhiệt độ 5-12°C không dùng gas lạnh', 'Chi phí vận hành 1/8 điều hoà', 'Cấp khí tươi 100%, không tuần hoàn', 'Tăng độ ẩm tự nhiên cho xưởng khô'] },
              ].map((group) => (
                <div key={group.title} className="bg-zinc-50 rounded-2xl p-6 md:p-8 border border-zinc-100">
                  <h3 className="text-lg font-bold text-zinc-900 mb-4">{group.title}</h3>
                  <div className="space-y-3">
                    {group.items.map((item) => (
                      <div key={item} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 shrink-0 mt-2" />
                        <span className="text-sm text-zinc-600">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 md:py-32 bg-zinc-950 text-white" aria-label="Dự án tiêu biểu">
        <div className="container-custom">
          <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Dự án thông gió tiêu biểu</h2>
            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
              Một số dự án thông gió nhà xưởng Cường Thông Gió đã thi công thành công tại Đà Nẵng và Quảng Nam.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 max-w-5xl mx-auto">
            {[
              {
                name: 'Nhà máy Gỗ Tân Phát — KCN Hòa Khánh',
                desc: 'Thi công hệ thống thông gió + hút bụi cho xưởng sản xuất đồ gỗ xuất khẩu diện tích 2.500m². Lắp đặt 8 quạt hướng trục Ø900mm, hệ thống ống gió hút bụi tại 24 điểm gia công. Giảm nồng độ bụi từ 15mg/m³ xuống còn 2mg/m³.',
                result: 'Đạt chuẩn QCVN, giảm bụi 87%',
              },
              {
                name: 'Xưởng may — KCN Điện Nam Điện Ngọc',
                desc: 'Thiết kế và thi công hệ thống thông gió + cooling pad cho xưởng may 3.000m², 500 công nhân. Lắp 120m² tấm cooling pad, 12 quạt hút ly tâm, hệ thống phân phối gió đều. Nhiệt độ xưởng giảm từ 38°C xuống 28°C vào mùa hè.',
                result: 'Giảm 10°C, năng suất tăng 22%',
              },
            ].map((project, i) => (
              <motion.article
                key={project.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-10 hover:bg-white/10 transition-colors"
              >
                <span className="inline-block px-3 py-1 bg-white/10 text-white text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">Dự án hoàn thành</span>
                <h3 className="text-xl font-bold text-white mb-4">{project.name}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">{project.desc}</p>
                <div className="pt-4 border-t border-white/10">
                  <span className="text-sm font-bold text-green-400">✓ {project.result}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-16 md:py-24 bg-white border-y border-zinc-100" aria-label="Bảng giá thông gió nhà xưởng">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
              Chi phí thi công thông gió tham khảo
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto">
              <strong>Giá tham khảo theo diện tích nhà xưởng (VNĐ)</strong> — Chi phí thực tế phụ thuộc vào layout, chiều cao, nguồn nhiệt và yêu cầu cụ thể.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm bg-white max-w-6xl mx-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Phương pháp</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">500m²</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">1.000m²</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">2.000m²</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {pricingData.map((row) => (
                  <tr key={row.method} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-zinc-900">{row.method}</td>
                    <td className="px-6 py-4 text-zinc-600">{row.price500}</td>
                    <td className="px-6 py-4 text-zinc-600">{row.price1000}</td>
                    <td className="px-6 py-4 text-zinc-600">{row.price2000}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center text-xs text-zinc-400 mt-4 max-w-2xl mx-auto">
            * Giá trên chưa bao gồm VAT. Bao gồm thiết kế, thiết bị, ống gió, thi công và nghiệm thu. Cập nhật tháng 6/2026.
          </p>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 md:py-32 bg-zinc-50" aria-label="Lợi ích thông gió nhà xưởng">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-zinc-900 mb-12 tracking-tight text-center">
              Lợi ích của hệ thống thông gió chuyên nghiệp
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Bảo vệ sức khoẻ công nhân', desc: 'Loại bỏ khói, bụi, hơi hoá chất ra khỏi không gian làm việc. Đảm bảo vi khí hậu đạt chuẩn QCVN 26:2016/BYT, giảm nguy cơ bệnh nghề nghiệp và nghỉ ốm.' },
                { title: 'Tăng năng suất lao động', desc: 'Nghiên cứu cho thấy khi nhiệt độ giảm 5°C, năng suất lao động tăng 15-25%. Hệ thống thông gió tốt giúp công nhân thoải mái, tập trung hơn.' },
                { title: 'Bảo vệ máy móc thiết bị', desc: 'Nhiệt độ quá cao làm giảm tuổi thọ motor điện, bo mạch và các thiết bị điện tử. Thông gió tốt giúp giảm nhiệt, kéo dài tuổi thọ thiết bị 20-30%.' },
                { title: 'Tuân thủ pháp luật', desc: 'Đáp ứng yêu cầu về vi khí hậu, PCCC và môi trường theo QCVN. Tránh bị xử phạt, ảnh hưởng đến giấy phép hoạt động và uy tín doanh nghiệp.' },
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
      <section className="py-20 md:py-32 bg-white" aria-label="Câu hỏi thường gặp" id="faq">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14 md:mb-20">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
                Câu hỏi thường gặp về thông gió nhà xưởng
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
                Giải đáp chi tiết các thắc mắc phổ biến về hệ thống thông gió nhà xưởng.
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
                    aria-controls={`thonggio-faq-${idx}`}
                  >
                    <h3 className="text-base md:text-lg font-bold text-zinc-900 pr-4 leading-snug">{faq.question}</h3>
                    <svg className={`w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  <div id={`thonggio-faq-${idx}`} className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-96 pb-6 md:pb-8' : 'max-h-0'}`} role="region">
                    <p className="px-6 md:px-8 text-zinc-500 text-sm md:text-base leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative w-full py-20 md:py-32 px-4" aria-label="Liên hệ tư vấn thông gió">
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
                Nhà xưởng bạn cần thông gió?
              </h2>
              <p className="text-zinc-400 mb-10 md:mb-14 text-base md:text-lg leading-relaxed max-w-xl mx-auto">
                Đội ngũ kỹ sư Cường Thông Gió sẵn sàng khảo sát miễn phí tại công trình và đề xuất giải pháp thông gió tối ưu nhất cho nhà xưởng của bạn.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 mx-auto w-full sm:w-auto">
                <Button asChild size="lg" className="w-full sm:w-auto font-bold uppercase tracking-wider text-[13px] h-14 md:h-16 px-10 rounded-full shadow-lg bg-white text-zinc-900 hover:bg-zinc-100 whitespace-nowrap">
                  <Link to="/lien-he" className="flex items-center justify-center w-full h-full">Đặt lịch khảo sát miễn phí</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto font-bold uppercase tracking-wider text-[13px] h-14 md:h-16 px-10 rounded-full border-[2px] border-zinc-600 hover:border-white text-white whitespace-nowrap">
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
