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
    question: 'Ống gió vuông và ống gió tròn khác nhau như thế nào?',
    answer:
      'Ống gió vuông phù hợp cho không gian có trần thấp, dễ lắp đặt sát trần và phân phối gió đều trong các toà nhà thương mại. Ống gió tròn có tổn thất áp suất thấp hơn 20-30%, phù hợp cho hệ thống công nghiệp cần lưu lượng lớn. Ống gió xoắn (spiral duct) kết hợp ưu điểm cả hai: kín khít, ít rò rỉ, thi công nhanh.',
  },
  {
    question: 'Cường Thông Gió sản xuất ống gió theo tiêu chuẩn nào?',
    answer:
      'Chúng tôi sản xuất ống gió theo tiêu chuẩn quốc tế SMACNA (Sheet Metal and Air Conditioning Contractors National Association). Tiêu chuẩn này quy định độ dày tôn, kiểu gấp mép, loại gioăng và phương pháp gia cố theo từng kích thước ống gió, đảm bảo hệ thống vận hành kín khít và bền bỉ.',
  },
  {
    question: 'Vật liệu nào được sử dụng để gia công ống gió?',
    answer:
      'Chúng tôi sử dụng 3 loại vật liệu chính: (1) Tôn mạ kẽm (GI) dày 0.48–1.2mm — phổ biến nhất, chống gỉ tốt, giá thành hợp lý; (2) Inox 304 — chịu nhiệt cao, chống ăn mòn hoá chất, dùng cho bếp công nghiệp và nhà máy thực phẩm; (3) Inox 201 — chi phí thấp hơn inox 304, phù hợp cho môi trường ít ăn mòn.',
  },
  {
    question: 'Thời gian gia công ống gió mất bao lâu?',
    answer:
      'Thời gian gia công phụ thuộc vào khối lượng đơn hàng. Đơn hàng nhỏ (dưới 100m²) thường hoàn thành trong 3-5 ngày làm việc. Đơn hàng lớn (500m² trở lên) từ 7-15 ngày. Chúng tôi sở hữu dây chuyền cắt Plasma CNC tại xưởng 150m² nên đảm bảo tiến độ nhanh nhất khu vực Đà Nẵng.',
  },
  {
    question: 'Chi phí gia công ống gió tại Đà Nẵng khoảng bao nhiêu?',
    answer:
      'Giá gia công ống gió tôn mạ kẽm dao động từ 120.000 – 250.000 VNĐ/m² tuỳ độ dày tôn và kích thước. Ống gió inox 304 từ 350.000 – 650.000 VNĐ/m². Giá đã bao gồm vật tư, gia công và phụ kiện kết nối cơ bản. Liên hệ 0905 001 224 để nhận báo giá chính xác theo bản vẽ.',
  },
  {
    question: 'Phụ kiện ống gió nào được cung cấp kèm theo?',
    answer:
      'Chúng tôi cung cấp đầy đủ phụ kiện: Van điều tiết VCD (Volume Control Damper), van chống cháy FD (Fire Damper), cửa gió cấp/hồi (supply/return grilles), miệng gió 4 hướng, flexible duct, co, tê, chuyển tiếp, và gioăng kết nối. Tất cả sản xuất theo tiêu chuẩn SMACNA.',
  },
  {
    question: 'Cường Thông Gió có thi công lắp đặt ống gió tại công trình không?',
    answer:
      'Có. Chúng tôi cung cấp dịch vụ trọn gói từ thiết kế → gia công tại xưởng → vận chuyển → lắp đặt tại công trình → nghiệm thu. Đội ngũ thợ lành nghề 10+ năm kinh nghiệm, thi công theo đúng bản vẽ thiết kế M&E, đảm bảo tiến độ và chất lượng.',
  },
  {
    question: 'Làm sao để chọn độ dày tôn phù hợp cho ống gió?',
    answer:
      'Theo tiêu chuẩn SMACNA, độ dày tôn phụ thuộc vào kích thước ống gió và áp suất hệ thống. Ống gió cạnh dài dưới 750mm dùng tôn 0.5mm; cạnh 750–1500mm dùng tôn 0.8mm; trên 1500mm dùng tôn 1.0–1.2mm. Đối với hệ thống áp suất cao (trên 500 Pa) cần tăng thêm 1 bậc độ dày.',
  },
]

const ductTypes = [
  {
    title: 'Ống Gió Vuông (Rectangular Duct)',
    desc: 'Ống gió vuông/chữ nhật được sử dụng phổ biến nhất trong các công trình thương mại, văn phòng, bệnh viện và trung tâm thương mại. Thiết kế phẳng giúp lắp đặt sát trần, tiết kiệm không gian kỹ thuật. Kết nối bằng mặt bích (flange) TDC hoặc TDF theo tiêu chuẩn SMACNA.',
    specs: ['Kích thước: 100×100 – 2000×2000mm', 'Độ dày tôn: 0.5 – 1.2mm', 'Mối nối: TDC / TDF flange', 'Gia cố: Thanh chống ngang cho ống > 1200mm'],
  },
  {
    title: 'Ống Gió Tròn (Round Duct)',
    desc: 'Ống gió tròn có tổn thất áp suất thấp hơn ống vuông 20-30% nhờ dòng khí chảy đều hơn. Phù hợp cho hệ thống thông gió công nghiệp, hút bụi, xử lý khí thải. Kết nối bằng đai ốc hoặc gioăng cao su, đảm bảo kín khít.',
    specs: ['Đường kính: Ø100 – Ø1500mm', 'Độ dày tôn: 0.48 – 1.0mm', 'Chiều dài đoạn: 1200mm tiêu chuẩn', 'Kết nối: Đai ốc / Gioăng cao su'],
  },
  {
    title: 'Ống Gió Xoắn (Spiral Duct)',
    desc: 'Ống gió xoắn được cuốn từ tôn mạ kẽm liên tục, tạo thành mối ghép xoắn ốc kín khít tuyệt đối. Đây là loại ống gió cao cấp nhất, giảm rò rỉ gió lên đến 90% so với ống vuông thông thường. Được ưa chuộng trong các dự án yêu cầu chất lượng cao như bệnh viện, phòng sạch.',
    specs: ['Đường kính: Ø100 – Ø1250mm', 'Độ dày tôn: 0.5 – 0.8mm', 'Rò rỉ: < 1% lưu lượng', 'Mối ghép xoắn liên tục, không cần sealant'],
  },
]

const pricingData = [
  { material: 'Tôn mạ kẽm 0.5mm', square: '120.000 – 150.000', round: '130.000 – 160.000', spiral: '180.000 – 220.000' },
  { material: 'Tôn mạ kẽm 0.8mm', square: '150.000 – 200.000', round: '160.000 – 210.000', spiral: '220.000 – 280.000' },
  { material: 'Tôn mạ kẽm 1.0mm', square: '200.000 – 250.000', round: '210.000 – 260.000', spiral: '280.000 – 350.000' },
  { material: 'Inox 201 (0.5mm)', square: '250.000 – 350.000', round: '270.000 – 380.000', spiral: '—' },
  { material: 'Inox 304 (0.5mm)', square: '350.000 – 500.000', round: '380.000 – 550.000', spiral: '450.000 – 650.000' },
  { material: 'Inox 304 (1.0mm)', square: '500.000 – 650.000', round: '530.000 – 680.000', spiral: '—' },
]

const processSteps = [
  { step: '01', title: 'Nhận bản vẽ & Báo giá', desc: 'Tiếp nhận bản vẽ kỹ thuật M&E từ chủ đầu tư hoặc nhà thầu. Bóc tách khối lượng, tính toán vật tư và gửi báo giá chi tiết trong vòng 24h.' },
  { step: '02', title: 'Triển khai Shop Drawing', desc: 'Lập bản vẽ gia công chi tiết (shop drawing) cho từng đoạn ống gió, đánh số thứ tự lắp đặt, xác định phương pháp kết nối và vị trí gia cố.' },
  { step: '03', title: 'Cắt & Gia công tại xưởng', desc: 'Sử dụng máy cắt Plasma CNC, máy gấp mép CNC và máy cuốn tôn để gia công chính xác từng chi tiết. Kiểm tra kích thước 100% trước khi xuất xưởng.' },
  { step: '04', title: 'Vận chuyển & Lắp đặt', desc: 'Đóng gói cẩn thận, vận chuyển đến công trình. Đội ngũ thợ lành nghề lắp đặt theo đúng shop drawing, đảm bảo độ kín khít và thẩm mỹ.' },
  { step: '05', title: 'Nghiệm thu & Bàn giao', desc: 'Kiểm tra toàn bộ hệ thống bằng thiết bị đo chuyên dụng: lưu lượng gió, áp suất, độ rò rỉ. Bàn giao hồ sơ hoàn công và hướng dẫn bảo trì.' },
]

export function GiaCongOngGio() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const breadcrumb = makeBreadcrumbSchema([
    { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
    { name: 'Gia công ống gió', url: 'https://cuongthonggio.com/gia-cong-ong-gio-da-nang' },
  ])

  const faqSchema = makeFAQSchema(faqs)

  const serviceSchema = makeServiceSchema({
    name: 'Gia Công Ống Gió Đà Nẵng',
    description:
      'Xưởng gia công ống gió vuông, tròn, xoắn tại Đà Nẵng. Vật liệu tôn mạ kẽm, inox 304/201 theo tiêu chuẩn SMACNA. Cung cấp phụ kiện van VCD, FD, cửa gió. Thi công trọn gói.',
    areaServed: 'Đà Nẵng',
  })

  return (
    <div className="bg-white min-h-screen font-sans text-zinc-900">
      <SEO
        title="Gia Công Ống Gió Đà Nẵng — Xưởng Sản Xuất Trực Tiếp"
        description="Xưởng gia công ống gió vuông, tròn, xoắn tại Đà Nẵng. Tôn mạ kẽm, inox 304/201, tiêu chuẩn SMACNA. Phụ kiện VCD, FD, cửa gió. Nhận báo giá trong 24h. Hotline 0905 001 224."
        keywords="gia công ống gió Đà Nẵng, ống gió vuông, ống gió tròn, ống gió xoắn, ống gió tôn mạ kẽm, ống gió inox, ống gió SMACNA, VCD van điều tiết, fire damper, cửa gió, gia công ống gió KCN Hòa Khánh, sản xuất ống gió Liên Chiểu, ống gió công nghiệp Đà Nẵng, phụ kiện ống gió"
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
              <span itemProp="name" className="text-zinc-900 font-bold">Gia công ống gió</span>
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
                Xưởng sản xuất trực tiếp
              </motion.span>
              <div className="mb-10 md:mb-12 max-w-6xl w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.1] text-center">
                  Gia Công Ống Gió Đà Nẵng<br />
                  <span className="text-zinc-400">Xưởng Sản Xuất Trực Tiếp</span>
                </h1>
              </div>

              <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-500 mb-10 md:mb-14 leading-relaxed max-w-3xl font-normal px-4">
                Chúng tôi sở hữu xưởng gia công ống gió quy mô 150m² tại Đà Nẵng, trang bị dây chuyền cắt Plasma CNC, máy gấp mép và cuốn tôn hiện đại. Chúng tôi sản xuất ống gió vuông, tròn, xoắn từ tôn mạ kẽm và inox 304/201 theo tiêu chuẩn quốc tế SMACNA — đảm bảo kín khít, chính xác và giao hàng đúng tiến độ cho mọi công trình.
              </motion.p>

              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto px-6 mb-16">
                <Button asChild size="lg" className="w-full sm:w-auto min-w-[200px] px-8 font-bold text-sm h-14 rounded-xl shadow-lg shadow-zinc-100 transition-all duration-300 bg-zinc-950 text-white hover:bg-zinc-800 uppercase tracking-widest whitespace-nowrap">
                  <Link to="/lien-he">Nhận báo giá trong 24h</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] px-8 font-bold text-sm h-14 rounded-xl border-[2px] border-zinc-200 hover:border-zinc-950 hover:bg-zinc-50 transition-all duration-300 text-zinc-950 uppercase tracking-widest whitespace-nowrap">
                  <a href="tel:0905001224">Gọi: 0905 001 224</a>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 md:py-20 bg-zinc-50 border-y border-zinc-100" aria-label="Thống kê xưởng gia công">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center w-full mx-auto max-w-5xl">
            {[
              { value: '150m²', label: 'Diện tích xưởng' },
              { value: '13+', label: 'Năm kinh nghiệm' },
              { value: '2,000+', label: 'Dự án hoàn thành' },
              { value: '24h', label: 'Báo giá nhanh' },
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
      <section className="py-20 md:py-32 bg-white" aria-label="Giới thiệu dịch vụ gia công ống gió">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-8 tracking-tight">
                Tại sao chọn gia công ống gió<br />tại xưởng Cường Thông Gió?
              </h2>
              <div className="prose prose-lg max-w-none text-zinc-600 leading-relaxed space-y-6">
                <p>
                  <strong className="text-zinc-800">Ống gió là thành phần quan trọng nhất</strong> trong mọi hệ thống thông gió, điều hoà không khí (HVAC) và xử lý khí thải. Chất lượng ống gió ảnh hưởng trực tiếp đến hiệu suất hệ thống, mức tiêu thụ năng lượng và chi phí vận hành dài hạn. Một hệ thống ống gió rò rỉ 10% có thể khiến chi phí điện năng tăng 15-20% mỗi năm.
                </p>
                <p>
                  Tại Cường Thông Gió, chúng tôi không chỉ là đơn vị thi công — mà là <strong className="text-zinc-800">xưởng sản xuất trực tiếp</strong> với đầy đủ máy móc chuyên dụng. Điều này mang lại 3 lợi thế quyết định cho khách hàng: <strong className="text-zinc-800">giá thành tốt hơn</strong> (không qua trung gian), <strong className="text-zinc-800">kiểm soát chất lượng toàn diện</strong> (từ nguyên liệu đến thành phẩm), và <strong className="text-zinc-800">tiến độ nhanh chóng</strong> (chủ động hoàn toàn về năng lực sản xuất).
                </p>
                <p>
                  Với 13+ năm kinh nghiệm và hơn 2.000 dự án đã bàn giao tại Đà Nẵng, Quảng Nam và các tỉnh Miền Trung, chúng tôi tự tin đáp ứng mọi yêu cầu gia công ống gió — từ dự án nhỏ vài chục mét vuông đến các công trình lớn hàng nghìn mét vuông. Tất cả đều tuân thủ nghiêm ngặt tiêu chuẩn quốc tế SMACNA về độ dày tôn, phương pháp gấp mép, và kiểm soát độ rò rỉ.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Duct Types Section */}
      <section className="py-20 md:py-32 bg-zinc-50" aria-label="Các loại ống gió">
        <div className="container-custom">
          <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Các loại ống gió chúng tôi gia công
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
              Cường Thông Gió sản xuất đầy đủ 3 dạng ống gió chính, đáp ứng mọi yêu cầu kỹ thuật từ dân dụng đến công nghiệp nặng.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto">
            {ductTypes.map((duct, i) => (
              <motion.article
                key={duct.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-[1.5rem] overflow-hidden border border-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col p-8 md:p-10"
              >
                <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4 tracking-tight leading-tight">{duct.title}</h3>
                <p className="text-zinc-500 text-sm md:text-base mb-8 leading-relaxed">{duct.desc}</p>
                <div className="space-y-3 mt-auto">
                  {duct.specs.map((spec) => (
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

      {/* Materials Section */}
      <section className="py-20 md:py-32 bg-white" aria-label="Vật liệu gia công ống gió">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-8 tracking-tight">
                  Vật liệu gia công ống gió<br />
                  <span className="text-zinc-400">chất lượng — đúng tiêu chuẩn</span>
                </h2>
                <div className="space-y-6 text-zinc-600 leading-relaxed">
                  <p>
                    Chất lượng vật liệu quyết định tuổi thọ và hiệu quả của hệ thống ống gió. Cường Thông Gió chỉ sử dụng nguyên liệu từ các nhà cung cấp uy tín, có chứng chỉ chất lượng và xuất xứ rõ ràng. Mỗi cuộn tôn đều được kiểm tra độ dày, lớp mạ kẽm và độ phẳng bề mặt trước khi đưa vào sản xuất.
                  </p>
                  <p>
                    Việc lựa chọn vật liệu phù hợp phụ thuộc vào môi trường sử dụng, nhiệt độ vận hành, tính chất hoá học của khí thải và yêu cầu vệ sinh an toàn thực phẩm. Đội ngũ kỹ sư của chúng tôi sẽ tư vấn chi tiết để đảm bảo bạn chọn đúng vật liệu với chi phí tối ưu nhất.
                  </p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-6">
                {[
                  {
                    title: 'Tôn Mạ Kẽm (Galvanized Iron — GI)',
                    desc: 'Vật liệu phổ biến nhất, lớp mạ kẽm bảo vệ chống gỉ sét. Độ dày từ 0.48mm đến 1.2mm. Phù hợp cho hệ thống HVAC thông thường, thông gió nhà xưởng, tòa nhà.',
                    tag: 'Phổ biến nhất',
                  },
                  {
                    title: 'Inox 304 (SUS 304)',
                    desc: 'Thép không gỉ cao cấp, chịu nhiệt đến 800°C, chống ăn mòn hoá chất mạnh. Bắt buộc cho bếp công nghiệp, nhà máy thực phẩm, dược phẩm và môi trường có hoá chất.',
                    tag: 'Cao cấp',
                  },
                  {
                    title: 'Inox 201 (SUS 201)',
                    desc: 'Chi phí thấp hơn inox 304 khoảng 30%, chịu nhiệt trung bình. Phù hợp cho các ứng dụng ít tiếp xúc hoá chất, môi trường khô ráo, yêu cầu thẩm mỹ cao.',
                    tag: 'Tiết kiệm',
                  },
                ].map((mat, i) => (
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

      {/* SMACNA Standards Section */}
      <section className="py-20 md:py-32 bg-zinc-950 text-white" aria-label="Tiêu chuẩn SMACNA">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight leading-tight">
                  Tiêu chuẩn SMACNA<br />
                  <span className="text-zinc-500">— Chuẩn quốc tế cho ống gió</span>
                </h2>
                <div className="space-y-6 text-zinc-400 leading-relaxed">
                  <p>
                    SMACNA (Sheet Metal and Air Conditioning Contractors' National Association) là tiêu chuẩn quốc tế được sử dụng rộng rãi nhất trong ngành gia công ống gió. Tiêu chuẩn này quy định chi tiết về: độ dày kim loại tối thiểu, phương pháp gấp mép, kiểu kết nối (TDC, TDF, flange), khoảng cách gia cố và mức rò rỉ cho phép theo từng cấp áp suất.
                  </p>
                  <p>
                    Tại Cường Thông Gió, chúng tôi áp dụng nghiêm ngặt tiêu chuẩn SMACNA cho 100% sản phẩm ống gió xuất xưởng. Điều này đảm bảo hệ thống ống gió có tuổi thọ cao, vận hành kín khít, giảm thiểu tổn thất áp suất và tiết kiệm năng lượng cho khách hàng.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[
                  { label: 'SMACNA', sub: 'Tiêu chuẩn quốc tế' },
                  { label: '< 1%', sub: 'Tỷ lệ rò rỉ gió' },
                  { label: 'CNC', sub: 'Cắt Plasma chính xác' },
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

      {/* Accessories Section */}
      <section className="py-20 md:py-32 bg-white" aria-label="Phụ kiện ống gió">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-14 md:mb-20">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Phụ kiện ống gió đồng bộ
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
              Ngoài ống gió chính, chúng tôi sản xuất và cung cấp đầy đủ phụ kiện kết nối, điều tiết và phân phối gió theo tiêu chuẩn SMACNA.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {[
              { title: 'Van VCD (Volume Control Damper)', desc: 'Van điều tiết lưu lượng gió dạng vuông/tròn, cơ cấu trục vít hoặc motor điện. Dùng để cân bằng lưu lượng giữa các nhánh ống gió, đảm bảo phân phối đều.' },
              { title: 'Van FD (Fire Damper)', desc: 'Van chống cháy lan tự động đóng khi nhiệt độ đạt 72°C (cầu chì nhiệt). Bắt buộc lắp đặt tại các vị trí ống gió xuyên tường/sàn chống cháy theo QCVN 06:2022/BXD.' },
              { title: 'Cửa Gió Cấp/Hồi (Supply/Return Grilles)', desc: 'Cửa gió nhôm sơn tĩnh điện, có cánh điều hướng. Kích thước từ 200×200 đến 1200×600mm. Lắp đặt tại trần, tường hoặc sàn nâng.' },
              { title: 'Miệng Gió 4 Hướng (4-Way Diffuser)', desc: 'Miệng gió khuếch tán 4 hướng dạng vuông, phân phối gió đồng đều trong không gian. Kích thước 300×300 đến 600×600mm, phù hợp trần thạch cao.' },
              { title: 'Flexible Duct (Ống Mềm)', desc: 'Ống gió mềm bọc cách nhiệt, đường kính Ø100–Ø400mm. Dùng kết nối từ ống gió chính đến miệng gió, giảm rung động và tiếng ồn từ quạt.' },
              { title: 'Co, Tê, Chuyển Tiếp', desc: 'Các phụ kiện chuyển hướng (elbow), chia nhánh (tee), chuyển tiếp kích thước (reducer). Gia công theo góc và kích thước yêu cầu, đảm bảo dòng khí chảy đều.' },
            ].map((item, i) => (
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

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-zinc-50" aria-label="Quy trình gia công ống gió">
        <div className="container-custom">
          <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Quy trình gia công 5 bước
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
              Quy trình chuẩn hoá giúp đảm bảo chất lượng đồng nhất và tiến độ cam kết cho mọi dự án.
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
      <section className="py-16 md:py-24 bg-white border-y border-zinc-100" aria-label="Bảng giá gia công ống gió">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
              Bảng giá gia công ống gió tham khảo
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto">
              <strong>Đơn giá tham khảo (VNĐ/m²)</strong> — Giá thực tế phụ thuộc vào khối lượng, kích thước và yêu cầu cụ thể. Liên hệ để nhận báo giá chính xác.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm bg-white max-w-6xl mx-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Vật liệu</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Ống vuông</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Ống tròn</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Ống xoắn</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {pricingData.map((row) => (
                  <tr key={row.material} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-zinc-900">{row.material}</td>
                    <td className="px-6 py-4 text-zinc-600">{row.square}</td>
                    <td className="px-6 py-4 text-zinc-600">{row.round}</td>
                    <td className="px-6 py-4 text-zinc-600">{row.spiral}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-zinc-400 mt-4 max-w-2xl mx-auto">
            * Giá trên chưa bao gồm VAT, chi phí vận chuyển và lắp đặt. Áp dụng cho đơn hàng từ 50m² trở lên. Cập nhật tháng 6/2026.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 md:py-32 bg-zinc-50" aria-label="Ưu điểm xưởng gia công trực tiếp">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-zinc-900 mb-12 tracking-tight text-center">
              Ưu điểm khi chọn xưởng gia công trực tiếp
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                { title: 'Giá thành cạnh tranh', desc: 'Không qua trung gian, tiết kiệm 15-25% chi phí so với đặt hàng qua đại lý. Sở hữu dây chuyền sản xuất riêng nên kiểm soát được giá thành từ vật tư đến nhân công.' },
                { title: 'Kiểm soát chất lượng 100%', desc: 'Kiểm tra độ dày tôn, độ chính xác kích thước và độ kín mối ghép tại từng công đoạn. Mỗi sản phẩm xuất xưởng đều qua bước kiểm tra cuối cùng (QC) trước khi giao hàng.' },
                { title: 'Tiến độ nhanh chóng', desc: 'Chủ động hoàn toàn về năng lực sản xuất, không phụ thuộc bên thứ ba. Đơn hàng nhỏ hoàn thành trong 3-5 ngày, đơn hàng lớn 7-15 ngày làm việc.' },
                { title: 'Linh hoạt theo yêu cầu', desc: 'Có thể sản xuất ống gió theo kích thước phi tiêu chuẩn, gia công phụ kiện đặc biệt theo bản vẽ riêng của khách hàng. Hỗ trợ tư vấn giải pháp tối ưu về mặt kỹ thuật và chi phí.' },
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
      <section className="py-20 md:py-32 bg-white" aria-label="Câu hỏi thường gặp về gia công ống gió" id="faq">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14 md:mb-20">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
                Câu hỏi thường gặp về dịch vụ của chúng tôi
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
                Giải đáp chi tiết các thắc mắc phổ biến về dịch vụ gia công ống gió tại Cường Thông Gió.
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
                    aria-controls={`onggio-faq-${idx}`}
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
                    id={`onggio-faq-${idx}`}
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
      <section className="relative w-full py-20 md:py-32 px-4" aria-label="Liên hệ báo giá ống gió">
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
                Cần báo giá gia công ống gió?
              </h2>
              <p className="text-zinc-400 mb-10 md:mb-14 text-base md:text-lg font-normal leading-relaxed max-w-xl mx-auto">
                Gửi bản vẽ kỹ thuật hoặc mô tả yêu cầu — đội ngũ kỹ sư của chúng tôi sẽ bóc tách khối lượng và gửi báo giá chi tiết trong vòng 24h.
              </p>
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 mx-auto w-full sm:w-auto">
                <Button asChild size="lg" className="w-full sm:w-auto font-bold uppercase tracking-wider text-[14px] md:text-base h-auto min-h-[64px] md:min-h-[72px] py-4 px-8 md:px-14 rounded-xl shadow-lg transition-all duration-300 bg-white text-zinc-900 hover:bg-zinc-100 text-center">
                  <Link to="/lien-he" className="flex items-center justify-center w-full h-full leading-relaxed">Gửi yêu cầu tư vấn kỹ thuật</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto font-bold uppercase tracking-wider text-[13px] h-14 md:h-16 px-10 rounded-xl border-[2px] border-zinc-600 hover:border-white transition-all duration-300 text-white whitespace-nowrap">
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
