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
    question: 'Hệ thống hút khói bếp công nghiệp cần những thiết bị gì?',
    answer:
      'Một hệ thống hút khói bếp công nghiệp hoàn chỉnh bao gồm: (1) Máng hút khói (hood) inox 304 dày 1.0–1.5mm lắp phía trên bếp, (2) Ống gió dẫn khói bằng inox hoặc tôn mạ kẽm, (3) Quạt hút ly tâm chịu nhiệt 200–400°C công suất phù hợp lưu lượng, (4) Hệ thống lọc dầu mỡ (grease filter) dạng baffle bằng inox, (5) Van chống cháy lan (fire damper) tại vị trí xuyên tường/sàn, và (6) Ống xả khói ra ngoài trời đảm bảo tiêu chuẩn phát thải QCVN 19:2009/BTNMT. Tổng chi phí phụ thuộc vào quy mô bếp và chiều dài tuyến ống.',
  },
  {
    question: 'Chi phí lắp đặt hệ thống hút khói nhà xưởng khoảng bao nhiêu?',
    answer:
      'Chi phí hệ thống hút khói nhà xưởng dao động từ 25.000.000 – 150.000.000 VNĐ tùy quy mô. Cụ thể: bếp nhà hàng nhỏ (1–3 bếp) từ 25–50 triệu; bếp công nghiệp trung bình (4–8 bếp) từ 50–100 triệu; nhà xưởng sản xuất hoặc tầng hầm PCCC từ 80–150 triệu trở lên. Chi phí bao gồm thiết kế, vật tư (máng hood inox, ống gió, quạt hút), nhân công lắp đặt và nghiệm thu. Liên hệ 0905 001 224 để được khảo sát miễn phí và báo giá chính xác theo thực tế công trình.',
  },
  {
    question: 'Máng hút khói (hood) inox được gia công như thế nào?',
    answer:
      'Máng hút khói inox được gia công tại xưởng Cường Thông Gió theo quy trình: cắt tấm inox 304 bằng máy Plasma CNC → gấp mép và tạo hình theo kích thước thiết kế → hàn TIG (hàn argon) đảm bảo mối hàn kín, đẹp và không bị oxy hóa → lắp khung treo bằng thép hộp mạ kẽm → gắn bộ lọc dầu mỡ (grease filter) dạng baffle có thể tháo rời để vệ sinh. Kích thước máng hood được thiết kế rộng hơn mặt bếp 150–200mm mỗi bên và nhô ra phía trước 200–300mm để đảm bảo bao phủ toàn bộ vùng phát sinh khói.',
  },
  {
    question: 'Quạt hút khói chịu nhiệt khác gì quạt thông gió thông thường?',
    answer:
      'Quạt hút khói chịu nhiệt (smoke exhaust fan) được thiết kế đặc biệt để hoạt động ổn định trong môi trường nhiệt độ cao 200–400°C liên tục, trong khi quạt thông thường chỉ chịu được 40–60°C. Điểm khác biệt chính: (1) Cánh quạt bằng thép chịu nhiệt hoặc inox 304/316, (2) Motor cách ly nhiệt hoặc đặt ngoài luồng khí nóng, (3) Vòng bi (bearing) chịu nhiệt độ cao với bôi trơn đặc biệt, (4) Trục quạt bằng thép C45 hoặc SUS304 không bị giãn nở gây lệch tâm. Quạt chịu nhiệt bắt buộc sử dụng cho hệ thống hút khói bếp và hệ thống tăng áp/hút khói PCCC theo QCVN 06:2022/BXD.',
  },
  {
    question: 'Tiêu chuẩn QCVN nào áp dụng cho hệ thống hút khói PCCC?',
    answer:
      'Hệ thống hút khói PCCC phải tuân thủ QCVN 06:2022/BXD — Quy chuẩn kỹ thuật quốc gia về an toàn cháy cho nhà và công trình. Theo đó, hệ thống phải đảm bảo: (1) Lưu lượng hút khói tối thiểu theo diện tích sàn và chiều cao không gian, (2) Quạt hút khói phải hoạt động ở 400°C trong tối thiểu 120 phút liên tục, (3) Ống gió hút khói PCCC phải chịu lửa với giới hạn chịu lửa EI 60 hoặc EI 120, (4) Van chống cháy (fire damper) lắp tại mọi vị trí xuyên vách ngăn cháy. Ngoài ra, QCVN 19:2009/BTNMT quy định nồng độ phát thải khói cho phép ra môi trường.',
  },
  {
    question: 'Hệ thống hút khói tầng hầm để xe hoạt động như thế nào?',
    answer:
      'Hệ thống hút khói tầng hầm để xe hoạt động theo nguyên lý: trong điều kiện bình thường, quạt Jet Fan (quạt phản lực) tạo luồng gió đẩy khí thải từ xe cộ về phía miệng hút, quạt hút ly tâm đặt tại tầng kỹ thuật hút khí thải ra ngoài qua ống gió thẳng đứng (shaft). Khi xảy ra cháy, hệ thống tự động chuyển sang chế độ PCCC: quạt Jet Fan đổi chiều đẩy khói về vùng hút, quạt hút khói chịu nhiệt 400°C/120 phút hoạt động đồng thời với hệ thống tăng áp cầu thang bộ. Toàn bộ được điều khiển bởi tủ BMS liên kết với hệ thống báo cháy tự động.',
  },
  {
    question: 'Cường Thông Gió có thi công hút khói cho nhà hàng nhỏ không?',
    answer:
      'Có. Cường Thông Gió nhận thi công hệ thống hút khói cho mọi quy mô, từ quán ăn nhỏ 1–2 bếp gas đến nhà hàng lớn, bếp trung tâm (central kitchen) và khu chế biến thực phẩm công nghiệp. Đối với nhà hàng nhỏ, chúng tôi cung cấp giải pháp tối ưu chi phí: máng hood inox 304 kích thước vừa đủ, quạt hút ly tâm công suất phù hợp, ống gió tôn mạ kẽm dẫn khói ra ngoài. Thời gian thi công từ 2–4 ngày tùy độ phức tạp đường ống. Bảo hành 12 tháng toàn bộ hệ thống.',
  },
  {
    question: 'Bao lâu cần vệ sinh bảo trì hệ thống hút khói bếp?',
    answer:
      'Tần suất bảo trì phụ thuộc vào cường độ sử dụng: (1) Bếp nhà hàng hoạt động liên tục — vệ sinh bộ lọc dầu mỡ (grease filter) mỗi 1–2 tuần, vệ sinh ống gió và quạt mỗi 3–6 tháng; (2) Bếp canteen công ty — vệ sinh filter mỗi 2–4 tuần, vệ sinh hệ thống mỗi 6–12 tháng; (3) Hệ thống hút khói PCCC — kiểm tra vận hành và bảo trì mỗi 6 tháng theo quy định PCCC. Việc bảo trì định kỳ giúp duy trì hiệu suất hút, giảm nguy cơ cháy nổ do dầu mỡ tích tụ trong ống gió, và kéo dài tuổi thọ thiết bị.',
  },
]

const systemTypes = [
  {
    title: 'Hút Khói Bếp Nhà Hàng & Khách Sạn',
    desc: 'Hệ thống hút khói chuyên dụng cho bếp thương mại: nhà hàng, khách sạn, quán ăn, căn tin, bếp trung tâm. Sử dụng máng hood inox 304 với bộ lọc dầu mỡ baffle filter, quạt ly tâm chịu nhiệt 200°C và ống gió inox/tôn mạ kẽm. Đảm bảo hút sạch khói, mùi, hơi nóng — giữ không gian bếp thoáng mát, an toàn vệ sinh thực phẩm.',
    specs: [
      'Máng hood inox 304, dày 1.0–1.5mm',
      'Bộ lọc dầu mỡ baffle filter inox',
      'Quạt ly tâm chịu nhiệt 200°C',
      'Lưu lượng hút: 2.000–15.000 m³/h',
    ],
  },
  {
    title: 'Hút Khói Nhà Xưởng Sản Xuất',
    desc: 'Giải pháp hút khói, khí thải cho nhà xưởng công nghiệp: hàn cắt kim loại, sơn phun, chế biến hoá chất, luyện kim, sản xuất nhựa. Thiết kế hệ thống hút cục bộ (local exhaust) tại nguồn phát sinh hoặc hút tổng (general exhaust) cho toàn nhà xưởng. Đáp ứng tiêu chuẩn QCVN 19:2009/BTNMT về phát thải và QCVN 24:2016/BYT về môi trường lao động.',
    specs: [
      'Chụp hút cục bộ tại nguồn phát sinh',
      'Ống gió chịu nhiệt/chịu hoá chất',
      'Quạt công nghiệp 5.000–50.000 m³/h',
      'Tích hợp hệ thống lọc bụi/khí thải',
    ],
  },
  {
    title: 'Hút Khói Tầng Hầm PCCC',
    desc: 'Hệ thống hút khói và tăng áp cầu thang bộ cho tầng hầm để xe theo QCVN 06:2022/BXD. Sử dụng quạt Jet Fan kết hợp quạt hút ly tâm chịu nhiệt 400°C/120 phút, ống gió chịu lửa EI 120, van chống cháy (fire damper) và tủ điều khiển BMS. Đảm bảo hệ thống PCCC đạt nghiệm thu của cơ quan Cảnh sát PCCC.',
    specs: [
      'Quạt chịu nhiệt 400°C / 120 phút',
      'Quạt Jet Fan tầng hầm 30–50 N lực đẩy',
      'Ống gió chịu lửa EI 60 / EI 120',
      'Van chống cháy FD 72°C tự động',
    ],
  },
  {
    title: 'Hút Khói Khu Vực BBQ & Lẩu',
    desc: 'Hệ thống hút khói âm bàn hoặc trên trần cho nhà hàng BBQ, lẩu, nướng. Thiết kế đặc thù với miệng hút tại từng bàn ăn, đường ống dẫn khói chạy ngầm dưới sàn hoặc trên trần, quạt hút tập trung đặt tại tầng kỹ thuật. Giữ không gian nhà hàng sạch sẽ, không khói — nâng cao trải nghiệm thực khách.',
    specs: [
      'Miệng hút âm bàn inox 304',
      'Ống gió ngầm sàn / trên trần',
      'Quạt hút tập trung, giảm tiếng ồn',
      'Hệ thống lọc than hoạt tính khử mùi',
    ],
  },
]

const pricingData = [
  { item: 'Máng hood inox 304 (1.0mm)', unit: 'm²', price: '850.000 – 1.200.000' },
  { item: 'Máng hood inox 304 (1.5mm)', unit: 'm²', price: '1.200.000 – 1.800.000' },
  { item: 'Bộ lọc dầu mỡ baffle filter inox', unit: 'Bộ', price: '350.000 – 650.000' },
  { item: 'Ống gió tôn mạ kẽm 0.8mm', unit: 'm²', price: '150.000 – 200.000' },
  { item: 'Ống gió inox 304 (0.8mm)', unit: 'm²', price: '450.000 – 650.000' },
  { item: 'Quạt ly tâm chịu nhiệt 200°C', unit: 'Bộ', price: '8.500.000 – 25.000.000' },
  { item: 'Quạt hút khói PCCC 400°C/120ph', unit: 'Bộ', price: '35.000.000 – 85.000.000' },
  { item: 'Van chống cháy Fire Damper', unit: 'Bộ', price: '1.200.000 – 3.500.000' },
  { item: 'Quạt Jet Fan tầng hầm', unit: 'Bộ', price: '12.000.000 – 28.000.000' },
]

const processSteps = [
  {
    step: '01',
    title: 'Khảo sát & Tư vấn',
    desc: 'Kỹ sư Cường Thông Gió trực tiếp khảo sát hiện trạng công trình: đo đạc kích thước bếp/nhà xưởng, xác định vị trí phát sinh khói, đánh giá nhiệt độ và tính chất khí thải, kiểm tra điều kiện đấu nối điện và vị trí xả khói ra ngoài. Từ đó tư vấn giải pháp hút khói phù hợp nhất về kỹ thuật và chi phí.',
  },
  {
    step: '02',
    title: 'Thiết kế & Tính toán kỹ thuật',
    desc: 'Lập bản vẽ thiết kế chi tiết hệ thống hút khói: bố trí máng hood, tuyến ống gió, vị trí quạt hút, điểm xả khói. Tính toán lưu lượng hút (m³/h) theo nhiệt lượng phát sinh và diện tích bếp, chọn công suất quạt phù hợp, tính tổn thất áp suất trên toàn tuyến ống. Đối với hệ thống PCCC: tính toán theo QCVN 06:2022/BXD.',
  },
  {
    step: '03',
    title: 'Gia công tại xưởng',
    desc: 'Máng hood inox được cắt, gấp và hàn TIG tại xưởng 150m² của Cường Thông Gió bằng dây chuyền CNC. Ống gió được gia công theo kích thước thiết kế, kiểm tra 100% trước xuất xưởng. Bộ lọc dầu mỡ, khung treo, phụ kiện kết nối được sản xuất đồng bộ, đánh số theo bản vẽ lắp đặt (shop drawing).',
  },
  {
    step: '04',
    title: 'Lắp đặt tại công trình',
    desc: 'Đội thợ lành nghề 10+ năm kinh nghiệm thi công lắp đặt: treo máng hood, lắp ống gió, đấu nối quạt hút, lắp van chống cháy và hệ thống điện điều khiển. Thi công gọn gàng, đảm bảo thẩm mỹ và an toàn. Đối với nhà hàng đang hoạt động, Cường Thông Gió sắp xếp thi công ngoài giờ kinh doanh để không ảnh hưởng doanh thu.',
  },
  {
    step: '05',
    title: 'Nghiệm thu & Bàn giao',
    desc: 'Chạy thử toàn bộ hệ thống, đo kiểm lưu lượng hút tại từng miệng hút bằng thiết bị Anemometer chuyên dụng, kiểm tra nhiệt độ khói xả, độ ồn quạt và độ kín ống gió. Bàn giao hồ sơ hoàn công, hướng dẫn vận hành và lịch bảo trì. Bảo hành 12 tháng toàn bộ hệ thống, hỗ trợ kỹ thuật trọn đời.',
  },
]

const applicationAreas = [
  {
    title: 'Nhà hàng & Khách sạn',
    desc: 'Bếp nhà hàng, buffet, khách sạn 3–5 sao tại Đà Nẵng, Hội An. Hệ thống hút khói kết hợp lọc dầu mỡ, khử mùi — đảm bảo tiêu chuẩn vệ sinh ATTP và không ảnh hưởng khu vực xung quanh.',
  },
  {
    title: 'Quán BBQ & Lẩu nướng',
    desc: 'Hệ thống hút khói âm bàn hoặc trên trần, thiết kế riêng cho từng mô hình kinh doanh. Giúp thực khách thưởng thức món ăn trong không gian thoáng đãng, không khói mù.',
  },
  {
    title: 'Bếp công nghiệp & Canteen',
    desc: 'Bếp trung tâm của bệnh viện, trường học, khu công nghiệp, nhà máy. Lưu lượng hút lớn, hoạt động liên tục 10–16 tiếng/ngày, yêu cầu bền bỉ và dễ bảo trì.',
  },
  {
    title: 'Nhà xưởng hàn cắt kim loại',
    desc: 'Hút khói hàn, bụi kim loại, hơi kẽm tại các xưởng cơ khí, đóng tàu, lắp ráp kết cấu thép. Bảo vệ sức khỏe công nhân theo QCVN 24:2016/BYT.',
  },
  {
    title: 'Nhà máy sơn & Hoá chất',
    desc: 'Hút hơi dung môi, khí độc trong quy trình sơn phun, pha chế hoá chất. Sử dụng quạt chống cháy nổ (explosion-proof) và ống gió chống tĩnh điện.',
  },
  {
    title: 'Tầng hầm để xe',
    desc: 'Hệ thống Jet Fan + quạt hút khói PCCC cho tầng hầm chung cư, trung tâm thương mại, tòa nhà văn phòng. Tuân thủ QCVN 06:2022/BXD, đạt nghiệm thu PCCC.',
  },
]

export function HutKhoiNhaXuong() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const breadcrumb = makeBreadcrumbSchema([
    { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
    { name: 'Hút khói nhà xưởng', url: 'https://cuongthonggio.com/hut-khoi-nha-xuong-da-nang' },
  ])

  const faqSchema = makeFAQSchema(faqs)

  const serviceSchema = makeServiceSchema({
    name: 'Hút Khói Nhà Xưởng & Bếp Công Nghiệp Đà Nẵng',
    description:
      'Thi công hệ thống hút khói bếp nhà hàng, nhà xưởng, tầng hầm PCCC tại Đà Nẵng. Máng hood inox 304, quạt chịu nhiệt 200–400°C, ống gió chịu lửa. Tuân thủ QCVN 06:2022/BXD. Bảo hành 12 tháng.',
    areaServed: 'Đà Nẵng',
  })

  return (
    <div className="bg-white min-h-screen font-sans text-zinc-900">
      <SEO
        title="Hút Khói Nhà Xưởng & Bếp Công Nghiệp Đà Nẵng"
        description="Thi công hệ thống hút khói bếp nhà hàng, nhà xưởng sản xuất, tầng hầm PCCC tại Đà Nẵng. Máng hood inox 304, quạt chịu nhiệt 200–400°C, đạt QCVN. Hotline 0905 001 224."
        keywords="hút khói nhà xưởng Đà Nẵng, hút khói bếp công nghiệp, hệ thống hút khói bếp nhà hàng, máng hút khói inox, quạt chịu nhiệt, hút khói tầng hầm PCCC, hood bếp inox 304, hút khói BBQ, quạt hút khói 400 độ, thi công hút khói Đà Nẵng, QCVN 06 PCCC, Jet Fan tầng hầm, lọc dầu mỡ bếp, fire damper"
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
              <span itemProp="name" className="text-zinc-900 font-bold">Hút khói nhà xưởng</span>
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
                Thi công trọn gói — Bảo hành 12 tháng
              </motion.span>
              <div className="mb-10 md:mb-12 max-w-6xl w-full">
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-zinc-900 leading-[1.1] text-center">
                  Hút Khói Nhà Xưởng<br />
                  <span className="text-zinc-400">& Bếp Công Nghiệp Đà Nẵng</span>
                </h1>
              </div>

              <motion.p variants={fadeUp} className="text-lg md:text-xl text-zinc-500 mb-10 md:mb-14 leading-relaxed max-w-3xl font-normal px-4">
                Cường Thông Gió chuyên thiết kế, gia công và thi công hệ thống hút khói cho bếp nhà hàng, nhà xưởng sản xuất và tầng hầm PCCC tại Đà Nẵng. Máng hood inox 304 sản xuất trực tiếp tại xưởng, quạt chịu nhiệt 200–400°C, ống gió chịu lửa — tuân thủ nghiêm ngặt QCVN 06:2022/BXD và QCVN 19:2009/BTNMT. 13+ năm kinh nghiệm, 2.000+ dự án đã bàn giao.
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
      <section className="py-12 md:py-20 bg-zinc-50 border-y border-zinc-100" aria-label="Thống kê dịch vụ hút khói">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center w-full mx-auto max-w-5xl">
            {[
              { value: '500+', label: 'Hệ thống hút khói' },
              { value: '13+', label: 'Năm kinh nghiệm' },
              { value: '150m²', label: 'Xưởng gia công' },
              { value: '12', label: 'Tháng bảo hành' },
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
      <section className="py-20 md:py-32 bg-white" aria-label="Giới thiệu dịch vụ hút khói">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-8 tracking-tight">
                Tại sao cần hệ thống hút khói<br />chuyên nghiệp?
              </h2>
              <div className="prose prose-lg max-w-none text-zinc-600 leading-relaxed space-y-6">
                <p>
                  <strong className="text-zinc-800">Khói, hơi nóng và khí thải</strong> là vấn đề nghiêm trọng trong mọi bếp công nghiệp, nhà xưởng sản xuất và tầng hầm kín. Nếu không được xử lý đúng cách, chúng gây ảnh hưởng trực tiếp đến sức khỏe người lao động, tăng nguy cơ cháy nổ (đặc biệt do dầu mỡ tích tụ trong ống gió), và vi phạm các quy chuẩn về phát thải môi trường QCVN 19:2009/BTNMT cũng như an toàn PCCC theo QCVN 06:2022/BXD.
                </p>
                <p>
                  Tại Đà Nẵng — với khí hậu nóng ẩm và hàng trăm nhà hàng, quán ăn, nhà xưởng trong các KCN Hòa Khánh, Hòa Cầm, Thọ Quang — nhu cầu về hệ thống hút khói chất lượng cao ngày càng tăng. Một hệ thống hút khói được <strong className="text-zinc-800">thiết kế đúng, thi công chuẩn</strong> không chỉ giải quyết vấn đề khói bụi mà còn giúp tiết kiệm điện năng vận hành, giảm chi phí bảo trì dài hạn, và đảm bảo tuân thủ pháp luật.
                </p>
                <p>
                  Cường Thông Gió là đơn vị <strong className="text-zinc-800">sản xuất trực tiếp</strong> máng hood inox, ống gió và cung cấp quạt chịu nhiệt — không qua trung gian. Với xưởng gia công 150m² tại Đà Nẵng trang bị máy cắt Plasma CNC, máy hàn TIG, máy gấp CNC, chúng tôi đảm bảo chất lượng sản phẩm từ nguyên liệu đầu vào đến thành phẩm lắp đặt. Đội ngũ kỹ sư và thợ thi công 10+ năm kinh nghiệm đã hoàn thành hơn 500 hệ thống hút khói tại Đà Nẵng, Quảng Nam và các tỉnh Miền Trung.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* System Types Section */}
      <section className="py-20 md:py-32 bg-zinc-50" aria-label="Các loại hệ thống hút khói">
        <div className="container-custom">
          <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Các loại hệ thống hút khói
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
              Chúng tôi cung cấp giải pháp hút khói toàn diện cho mọi loại hình công trình — từ bếp nhà hàng đến tầng hầm PCCC.
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

      {/* Technical Specs — QCVN Standards Section */}
      <section className="py-20 md:py-32 bg-zinc-950 text-white" aria-label="Tiêu chuẩn QCVN hút khói">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-8 tracking-tight leading-tight">
                  Tiêu chuẩn QCVN<br />
                  <span className="text-zinc-500">— An toàn & Tuân thủ pháp luật</span>
                </h2>
                <div className="space-y-6 text-zinc-400 leading-relaxed">
                  <p>
                    Mọi hệ thống hút khói do Cường Thông Gió thi công đều tuân thủ nghiêm ngặt các Quy chuẩn Kỹ thuật Quốc gia (QCVN) hiện hành. Đối với hệ thống PCCC, <strong className="text-white">QCVN 06:2022/BXD</strong> quy định chi tiết về lưu lượng hút khói tối thiểu, thời gian chịu nhiệt của quạt và ống gió (400°C/120 phút), vị trí lắp đặt van chống cháy, và yêu cầu về hệ thống tăng áp cầu thang bộ.
                  </p>
                  <p>
                    Đối với khí thải ra môi trường, <strong className="text-white">QCVN 19:2009/BTNMT</strong> quy định nồng độ tối đa cho phép của các chất ô nhiễm trong khí thải công nghiệp: bụi, SO₂, NOx, CO, và các hợp chất hữu cơ bay hơi (VOC). Hệ thống hút khói phải kết hợp các giải pháp lọc phù hợp để đảm bảo khí thải xả ra ngoài đạt tiêu chuẩn quy định.
                  </p>
                  <p>
                    Ngoài ra, <strong className="text-white">QCVN 24:2016/BYT</strong> quy định về điều kiện vi khí hậu tại nơi làm việc — bao gồm nhiệt độ, độ ẩm, tốc độ gió và nồng độ các chất độc hại trong không khí. Hệ thống hút khói nhà xưởng phải đảm bảo môi trường lao động an toàn cho công nhân theo tiêu chuẩn này.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[
                  { label: 'QCVN 06', sub: 'An toàn PCCC' },
                  { label: '400°C', sub: 'Quạt chịu nhiệt' },
                  { label: 'EI 120', sub: 'Ống gió chịu lửa' },
                  { label: '120ph', sub: 'Hoạt động liên tục' },
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

      {/* Hood & Equipment Details Section */}
      <section className="py-20 md:py-32 bg-white" aria-label="Máng hood inox và thiết bị hút khói">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-8 tracking-tight">
                  Máng hood inox & Quạt chịu nhiệt<br />
                  <span className="text-zinc-400">— Sản xuất trực tiếp tại xưởng</span>
                </h2>
                <div className="space-y-6 text-zinc-600 leading-relaxed">
                  <p>
                    Máng hút khói (hood) là thành phần quan trọng nhất trong hệ thống hút khói bếp. Máng hood phải có kích thước đủ lớn để bao phủ toàn bộ vùng nấu, lắp đặt ở độ cao phù hợp (thường 1.8–2.2m từ sàn), và tích hợp bộ lọc dầu mỡ (grease filter) để ngăn dầu mỡ xâm nhập vào ống gió — giảm nguy cơ cháy và kéo dài tuổi thọ hệ thống.
                  </p>
                  <p>
                    Cường Thông Gió sử dụng <strong className="text-zinc-800">inox 304 (SUS 304)</strong> dày 1.0–1.5mm làm vật liệu chính cho máng hood. Inox 304 có khả năng chịu nhiệt đến 800°C, chống ăn mòn bởi axit thực phẩm, dầu mỡ và hơi nước — đảm bảo tuổi thọ 10–15 năm trong môi trường bếp khắc nghiệt. Mối hàn TIG (hàn argon) tạo đường hàn kín, mịn, không bám bẩn và dễ vệ sinh.
                  </p>
                  <p>
                    Quạt hút khói chịu nhiệt được chọn theo tiêu chí: lưu lượng (m³/h), cột áp (Pa), nhiệt độ làm việc và mức ồn cho phép. Đối với bếp thương mại, quạt ly tâm chịu nhiệt 200°C là tiêu chuẩn. Đối với hệ thống PCCC, bắt buộc sử dụng quạt chịu nhiệt 400°C hoạt động liên tục 120 phút theo QCVN 06:2022/BXD, được chứng nhận bởi các phòng thí nghiệm uy tín.
                  </p>
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="space-y-6">
                {[
                  {
                    title: 'Máng Hood Inox 304 — Bếp Thương Mại',
                    desc: 'Gia công từ inox 304 dày 1.0–1.5mm, hàn TIG kín mịn. Tích hợp baffle grease filter tháo rời, khung treo thép hộp mạ kẽm chắc chắn. Kích thước theo yêu cầu, nhô ra trước bếp 200–300mm.',
                    tag: 'Phổ biến nhất',
                  },
                  {
                    title: 'Quạt Ly Tâm Chịu Nhiệt 200°C',
                    desc: 'Cánh quạt thép chịu nhiệt, motor cách ly luồng khí nóng. Công suất 0.75–7.5 kW, lưu lượng 2.000–25.000 m³/h. Phù hợp bếp nhà hàng, bếp công nghiệp hoạt động liên tục.',
                    tag: 'Bếp thương mại',
                  },
                  {
                    title: 'Quạt Hút Khói PCCC 400°C/120 phút',
                    desc: 'Đạt chứng nhận chịu nhiệt 400°C liên tục 120 phút. Công suất 5.5–45 kW, lưu lượng 10.000–80.000 m³/h. Bắt buộc cho tầng hầm, hành lang và gian thoát nạn theo QCVN 06.',
                    tag: 'PCCC bắt buộc',
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

      {/* Application Areas Section */}
      <section className="py-20 md:py-32 bg-zinc-50" aria-label="Ứng dụng thực tế hệ thống hút khói">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-14 md:mb-20">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Ứng dụng thực tế tại Đà Nẵng
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
              Hệ thống hút khói của Cường Thông Gió đã được triển khai thành công tại hàng trăm công trình với đa dạng quy mô và lĩnh vực hoạt động.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
            {applicationAreas.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="bg-white rounded-2xl p-6 md:p-8 border border-zinc-100 hover:shadow-lg transition-all duration-300"
              >
                <h3 className="text-lg font-bold text-zinc-900 mb-3">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 md:py-32 bg-white" aria-label="Quy trình thi công hút khói">
        <div className="container-custom">
          <div className="text-center mb-14 md:mb-20 max-w-3xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Quy trình thi công 5 bước
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
              Quy trình chuẩn hoá từ khảo sát đến bàn giao, đảm bảo hệ thống hút khói vận hành hiệu quả ngay từ ngày đầu tiên.
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
                className="flex gap-6 md:gap-8 bg-zinc-50 rounded-2xl p-6 md:p-8 border border-zinc-100 shadow-sm hover:shadow-md transition-shadow"
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
      <section className="py-16 md:py-24 bg-zinc-50 border-y border-zinc-100" aria-label="Bảng giá hệ thống hút khói">
        <div className="container-custom">
          <div className="text-center mb-10 md:mb-14">
            <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight">
              Bảng giá thiết bị hút khói tham khảo
            </h2>
            <p className="text-zinc-500 text-base md:text-lg max-w-2xl mx-auto">
              <strong>Đơn giá tham khảo (VNĐ)</strong> — Giá thực tế phụ thuộc vào quy mô hệ thống, kích thước thiết bị và điều kiện công trình. Liên hệ để nhận báo giá chính xác.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm bg-white max-w-5xl mx-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Hạng mục</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Đơn vị</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Đơn giá (VNĐ)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {pricingData.map((row) => (
                  <tr key={row.item} className="hover:bg-zinc-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-zinc-900">{row.item}</td>
                    <td className="px-6 py-4 text-zinc-600">{row.unit}</td>
                    <td className="px-6 py-4 text-zinc-600">{row.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-center text-xs text-zinc-400 mt-4 max-w-2xl mx-auto">
            * Giá trên chưa bao gồm VAT, chi phí vận chuyển và lắp đặt. Giá thiết bị có thể thay đổi theo thời điểm và nhà cung cấp. Cập nhật tháng 6/2026.
          </p>
        </div>
      </section>

      {/* Benefits / Why Choose Us Section */}
      <section className="py-20 md:py-32 bg-white" aria-label="Ưu điểm dịch vụ hút khói Cường Thông Gió">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold text-zinc-900 mb-12 tracking-tight text-center">
              Ưu điểm khi chọn Cường Thông Gió
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Xưởng sản xuất trực tiếp',
                  desc: 'Hood inox, ống gió, phụ kiện được gia công tại xưởng 150m² của chúng tôi — không qua trung gian. Kiểm soát chất lượng 100% từ nguyên liệu đến thành phẩm, giá thành tốt hơn 15–25% so với đặt hàng ngoài.',
                },
                {
                  title: 'Kỹ sư thiết kế chuyên môn cao',
                  desc: 'Đội ngũ kỹ sư M&E tính toán chính xác lưu lượng hút, tổn thất áp suất, chọn quạt phù hợp. Hệ thống được thiết kế tối ưu — không thừa công suất gây lãng phí điện, không thiếu gây hút yếu.',
                },
                {
                  title: 'Thi công đúng tiến độ',
                  desc: 'Cam kết hoàn thành đúng lịch trình đã thỏa thuận. Đối với nhà hàng đang hoạt động, Cường Thông Gió sắp xếp thi công ngoài giờ kinh doanh hoặc thi công xuyên đêm nếu cần — không làm gián đoạn doanh thu.',
                },
                {
                  title: 'Bảo hành 12 tháng, hỗ trợ trọn đời',
                  desc: 'Bảo hành toàn bộ hệ thống 12 tháng, bao gồm vật tư và nhân công sửa chữa. Sau bảo hành, chúng tôi tiếp tục hỗ trợ kỹ thuật và cung cấp dịch vụ vệ sinh, bảo trì định kỳ với chi phí ưu đãi.',
                },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-zinc-50 rounded-2xl p-8 border border-zinc-100 shadow-sm"
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
      <section className="py-20 md:py-32 bg-zinc-50" aria-label="Câu hỏi thường gặp về hút khói nhà xưởng" id="faq">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14 md:mb-20">
              <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
                Câu hỏi thường gặp về hút khói
              </motion.h2>
              <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-zinc-500 text-base md:text-lg leading-relaxed">
                Giải đáp chi tiết các thắc mắc phổ biến về hệ thống hút khói bếp, nhà xưởng và tầng hầm PCCC.
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
                    aria-controls={`hutkhoi-faq-${idx}`}
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
                    id={`hutkhoi-faq-${idx}`}
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
      <section className="relative w-full py-20 md:py-32 px-4" aria-label="Liên hệ thi công hút khói">
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
                Cần thi công hệ thống hút khói?
              </h2>
              <p className="text-zinc-400 mb-10 md:mb-14 text-base md:text-lg font-normal leading-relaxed max-w-xl mx-auto">
                Gửi thông tin công trình hoặc gọi Hotline — kỹ sư Cường Thông Gió sẽ khảo sát miễn phí, tư vấn giải pháp tối ưu và gửi báo giá chi tiết trong vòng 24h.
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
