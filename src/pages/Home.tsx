import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Variants } from 'framer-motion'
import { useRef, useState } from 'react'
import { Button } from '../components/ui/Button'
import {
  SEO,
  LOCAL_BUSINESS_SCHEMA,
  ORGANIZATION_SCHEMA,
  WEBSITE_SCHEMA,
  makeBreadcrumbSchema,
  makeFAQSchema,
  makeServiceSchema,
  makeReviewSchema,
  makeHowToSchema,
} from '../components/SEO'

const stats = [
  { value: '13', label: 'Năm hoạt động' },
  { value: '2,145', label: 'Dự án bàn giao' },
  { value: '150m²', label: 'Diện tích xưởng' },
]

const services = [
  {
    title: 'Quạt Công Nghiệp',
    desc: 'Gia công trực tiếp các dòng quạt ly tâm, hướng trục, hút mái bằng vật liệu tiêu chuẩn. Cân bằng động kỹ thuật số chính xác tuyệt đối.',
    imageUrl: '/quat-ly-tam.png'
  },
  {
    title: 'Hệ Thống Xử Lý Khí & Bụi',
    desc: 'Thi công hệ thống lọc bụi túi vải, tháp hấp thụ khí thải cho khu công nghiệp, nhà xưởng, cam kết đạt chuẩn môi trường.',
    imageUrl: '/ong-gio-cong-truong-1.png'
  },
  {
    title: 'Hệ Thống Thông Gió & Làm Mát',
    desc: 'Thiết kế & thi công hệ thống thông gió tươi, làm mát nhà xưởng bằng tấm cooling pad, máy làm mát công nghiệp hiệu suất cao.',
    imageUrl: '/ong-gio-cong-truong-2.png'
  },
  {
    title: 'Cơ Khí & Inox Dân Dụng',
    desc: 'Gia công ống gió xoắn, máng hút khói bếp, bồn chứa inox và các thiết bị phụ trợ cơ khí theo yêu cầu kỹ thuật riêng.',
    imageUrl: '/ong-gio-phu-kien.png'
  }
]

const projects = [
  {
    name: 'Hệ thống hút bụi xưởng Gỗ Xuất Khẩu',
    text: 'Cường Thông Gió đã giải quyết triệt để tình trạng bụi mịn trong không gian sản xuất. Hệ thống vận hành ổn định, giúp chúng tôi đáp ứng các tiêu chuẩn khắt khe về an toàn lao động.',
    author: 'Anh Tuấn - Giám đốc Sản xuất',
    location: 'Nhà máy Gỗ Tân Phát, KCN Hòa Khánh'
  },
  {
    name: 'Thông gió sự cố tầng hầm Tòa nhà',
    text: 'Đội ngũ kỹ thuật làm việc chuyên nghiệp, bám sát bản vẽ thiết kế. Hệ thống thông gió tươi hoạt động hiệu quả, giúp dự án nghiệm thu PCCC thuận lợi ngay từ lần đầu.',
    author: 'KS. Hoàng Nam',
    location: 'Dự án Chung cư Nam Cẩm Lệ'
  }
]

const faqs = [
  {
    question: 'Cường Thông Gió thi công hệ thống thông gió cho những loại công trình nào?',
    answer: 'Chúng tôi thi công hệ thống thông gió cho nhà xưởng, nhà máy sản xuất, kho lạnh, tầng hầm, tòa nhà thương mại, bếp công nghiệp, bệnh viện và các khu công nghiệp tại Đà Nẵng và Miền Trung.'
  },
  {
    question: 'Quạt công nghiệp do Cường Thông Gió sản xuất có bảo hành không?',
    answer: 'Có. Tất cả quạt công nghiệp do Cường Thông Gió sản xuất đều được bảo hành 12 tháng về kỹ thuật, bao gồm cân bằng động, motor và vỏ quạt. Chúng tôi hỗ trợ bảo trì định kỳ sau bảo hành.'
  },
  {
    question: 'Chi phí thi công hệ thống thông gió khoảng bao nhiêu?',
    answer: 'Chi phí phụ thuộc vào diện tích, loại hình công trình và yêu cầu kỹ thuật cụ thể. Quý khách vui lòng liên hệ Hotline 0905 001 224 hoặc gửi yêu cầu qua trang Liên hệ để nhận báo giá miễn phí trong 24h.'
  },
  {
    question: 'Cường Thông Gió có thi công hệ thống xử lý khí thải, lọc bụi không?',
    answer: 'Có. Chúng tôi chuyên thi công hệ thống lọc bụi túi vải, tháp hấp thụ khí thải, hệ thống hút bụi gỗ, hút bụi mài, đảm bảo đạt tiêu chuẩn QCVN về khí thải công nghiệp.'
  },
  {
    question: 'Thời gian thi công hệ thống thông gió mất bao lâu?',
    answer: 'Tùy quy mô dự án, thời gian thi công dao động từ 7 đến 45 ngày. Đối với dự án nhà xưởng vừa và nhỏ thường hoàn thành trong 2-3 tuần. Chúng tôi cam kết bám sát tiến độ đã thỏa thuận.'
  },
]

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
  }
}

const stagger: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
}

export function Home() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  
  // Refined parallax: scale image and translate inside the clipped container
  const imgY = useTransform(scrollYProgress, [0.1, 0.4], ["0%", "20%"])
  const imgScale = useTransform(scrollYProgress, [0.1, 0.4], [1, 1.1])
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])

  // FAQ toggle state
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const breadcrumb = makeBreadcrumbSchema([
    { name: 'Trang chủ', url: 'https://cuongthonggio.com/' }
  ]);

  const faqSchema = makeFAQSchema(faqs);

  const serviceSchemas = services.map(s => makeServiceSchema({
    name: s.title,
    description: s.desc,
    image: s.imageUrl,
    areaServed: 'Đà Nẵng'
  }));

  const reviewSchemas = makeReviewSchema(projects.map(p => ({
    author: p.author,
    reviewBody: p.text,
    ratingValue: 5
  })));

  const howToSchema = makeHowToSchema({
    name: 'Quy trình thi công hệ thống thông gió tại Đà Nẵng',
    description: 'Quy trình 5 bước thi công hệ thống thông gió chuyên nghiệp của Cường Thông Gió cho nhà xưởng, công trình tại Đà Nẵng.',
    steps: [
      { name: 'Khảo sát & Tư vấn', text: 'Đội ngũ kỹ sư đến tận công trình tại Đà Nẵng để khảo sát thực tế, đo đạc diện tích, đánh giá nhu cầu thông gió.' },
      { name: 'Thiết kế hệ thống', text: 'Lập bản vẽ kỹ thuật chi tiết hệ thống ống gió, vị trí quạt, miệng gió phù hợp với layout nhà xưởng.' },
      { name: 'Sản xuất tại xưởng', text: 'Gia công quạt công nghiệp, ống gió tại xưởng 150m² tại Đà Nẵng, kiểm tra cân bằng động trước khi xuất xưởng.' },
      { name: 'Thi công & Lắp đặt', text: 'Đội ngũ thợ lành nghề lắp đặt hệ thống tại công trình, đảm bảo đúng bản vẽ thiết kế và tiến độ cam kết.' },
      { name: 'Nghiệm thu & Bàn giao', text: 'Đo lưu lượng, áp suất thực tế bằng thiết bị chuyên dụng, bàn giao hệ thống hoạt động ổn định.' },
    ],
  });

  return (
    <div ref={containerRef} className="bg-white min-h-screen selection:bg-zinc-200 selection:text-zinc-900 relative font-sans text-zinc-900">
      <SEO 
        title="Quạt Công Nghiệp & Hệ Thống Thông Gió Đà Nẵng"
        description="Cường Thông Gió — Chuyên sản xuất quạt ly tâm, quạt hướng trục, gia công ống gió, thi công hệ thống thông gió & xử lý khí thải cho nhà xưởng, công trình tại Đà Nẵng, Miền Trung. 13+ năm kinh nghiệm, 2000+ dự án."
        keywords="quạt công nghiệp Đà Nẵng, thông gió nhà xưởng, ống gió, quạt ly tâm, quạt hướng trục, hệ thống thông gió, xử lý khí thải, lọc bụi công nghiệp, Cường Thông Gió, thi công thông gió Đà Nẵng, quạt hút công nghiệp, gia công ống gió, thi công thông gió nhà xưởng Đà Nẵng, quạt hút công nghiệp Liên Chiểu, ống gió KCN Hòa Khánh, hệ thống thông gió KCN Hòa Cầm, xử lý khí thải Sơn Trà, thông gió tầng hầm Đà Nẵng"
        structuredData={[
          LOCAL_BUSINESS_SCHEMA,
          ORGANIZATION_SCHEMA,
          WEBSITE_SCHEMA,
          breadcrumb,
          faqSchema,
          ...serviceSchemas,
          ...reviewSchemas,
          howToSchema,
        ]}
        dateModified="2026-06-04"
      />

      {/* Breadcrumb — SEO Navigation */}
      <nav aria-label="Breadcrumb" className="pt-24 md:pt-28 pb-0 relative z-10 bg-white">
        <div className="container-custom">
          <ol className="flex items-center gap-2 text-xs text-zinc-400 font-medium" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" itemProp="item" className="hover:text-zinc-900 transition-colors">
                <span itemProp="name">Trang chủ</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section - Balanced spacing and typography */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-24 relative z-10 bg-white overflow-hidden">
        <div className="container-custom w-full">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="visible"
              className="flex flex-col items-center w-full"
            >
              <div className="mb-10 md:mb-12 max-w-5xl w-full">
                <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-zinc-900 leading-[1.1] text-center">
                  Hệ thống thông gió chuyên <br className="hidden md:block" /> nghiệp cho công trình công nghiệp.
                </h1>
              </div>
              
              <motion.p 
                variants={fadeUp}
                className="text-lg md:text-xl text-zinc-500 mb-10 md:mb-14 leading-relaxed max-w-2xl font-normal px-4"
              >
                Cường Thông Gió sở hữu năng lực sản xuất độc lập, giúp kiểm soát hoàn toàn chất lượng thiết bị và đảm bảo tiến độ cho mọi dự án.
              </motion.p>
              
              <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto px-6 mb-16">
                <Button asChild size="lg" className="w-full sm:w-auto min-w-[200px] px-8 font-bold text-sm h-14 rounded-full shadow-lg shadow-zinc-100 transition-all duration-300 bg-zinc-950 text-white hover:bg-zinc-800 uppercase tracking-widest whitespace-nowrap">
                  <Link to="/lien-he">
                    Yêu cầu sản xuất
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="w-full sm:w-auto min-w-[200px] px-8 font-bold text-sm h-14 rounded-full border-[2px] border-zinc-200 hover:border-zinc-950 hover:bg-zinc-50 transition-all duration-300 text-zinc-950 uppercase tracking-widest whitespace-nowrap">
                  <Link to="/san-pham">
                    Năng lực sản xuất
                  </Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Realistic Factory Image Section - Balanced Padding */}
      <section id="xuong-san-xuat" className="py-16 md:py-24 relative z-10 scroll-mt-24 bg-zinc-50 border-b border-zinc-100" aria-label="Xưởng sản xuất">
        <div className="container-custom">
          <motion.div 
            style={{ opacity }}
            className="w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-zinc-900 shadow-xl aspect-[1.4/1] sm:aspect-[16/9] lg:aspect-[21/9] relative group border-2 md:border-[3px] border-white"
          >
            <motion.img 
              style={{ y: imgY, scale: imgScale }}
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1200&auto=format&fit=crop" 
              srcSet="
                https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=75&w=480&auto=format&fit=crop 480w,
                https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop 800w,
                https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1200&auto=format&fit=crop 1200w
              "
              sizes="(max-width: 640px) 480px, (max-width: 1024px) 800px, 1200px"
              alt="Xưởng sản xuất quạt công nghiệp Cường Thông Gió tại Đà Nẵng — dây chuyền gia công hiện đại" 
              loading="lazy"
              decoding="async"
              width="1200"
              height="675"
              className="w-full h-[120%] object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 absolute top-[-10%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-8 md:p-16 lg:p-24">
               <div className="text-white max-w-4xl">
                 <div className="flex items-center gap-4 mb-6">
                   <span className="bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider">Thực tế</span>
                   <span className="text-[10px] md:text-xs font-medium opacity-80 uppercase tracking-widest">Dây chuyền sản xuất tại xưởng</span>
                 </div>
                 <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">Làm chủ công nghệ <br className="hidden md:block"/>và kỹ thuật</h2>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Concrete Stats Section - Refined */}
      <section className="py-12 md:py-20 bg-white border-b border-zinc-100 relative z-10" aria-label="Thống kê hoạt động">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 md:gap-12 text-center w-full mx-auto max-w-5xl">
            {stats.map((s, i) => (
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

      {/* Practical Solutions - Balanced Space */}
      <section className="py-20 md:py-32 relative bg-zinc-50 z-10" aria-label="Giải pháp và thiết bị">
        <div className="container-custom">
          <div className="mb-14 md:mb-20 text-center w-full mx-auto px-4 max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-zinc-900 mb-5 tracking-tight uppercase"
            >
              Giải pháp thông gió toàn diện cho mọi công trình
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-500 text-base md:text-lg font-normal leading-relaxed mx-auto mb-0"
            >
              Cường Thông Gió chuyên tư vấn, thiết kế & thi công hệ thống thông gió công nghiệp, xử lý khí thải, lọc bụi cho nhà xưởng, tòa nhà và bếp công nghiệp — với 4 nhóm giải pháp chính: <strong className="text-zinc-700">Quạt công nghiệp</strong> (ly tâm, hướng trục), <strong className="text-zinc-700">Xử lý khí thải & lọc bụi</strong>, <strong className="text-zinc-700">Thông gió & làm mát nhà xưởng</strong>, và <strong className="text-zinc-700">Cơ khí & inox dân dụng</strong>. Tất cả được sản xuất trực tiếp tại xưởng 150m² tại Đà Nẵng.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full mx-auto max-w-7xl">
            {services.map((service, i) => (
              <motion.article 
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white rounded-[1.5rem] overflow-hidden border border-zinc-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col"
              >
                <div className="h-64 md:h-80 overflow-hidden relative">
                  <img 
                    src={service.imageUrl} 
                    alt={`${service.title} — Cường Thông Gió Đà Nẵng`} 
                    loading="lazy"
                    decoding="async"
                    width="600"
                    height="400"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
                <div className="p-8 md:p-12 flex-1 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4 tracking-tight leading-tight uppercase">{service.title}</h3>
                  <p className="text-zinc-500 text-sm md:text-base mb-8 leading-relaxed font-normal opacity-80">{service.desc}</p>
                  <div className="mt-auto pt-6 border-t border-zinc-100">
                    <Link to="/san-pham" className="inline-flex items-center text-xs font-bold text-zinc-900 hover:text-blue-600 transition-colors uppercase tracking-[0.15em] group/link">
                      Xem thiết bị & thông số
                      <svg className="w-4 h-4 ml-2 transform group-hover/link:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Human/Team Section - Balanced */}
      <section className="py-20 md:py-32 bg-zinc-900 text-white overflow-hidden relative z-10" aria-label="Đội ngũ kỹ thuật">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full mx-auto max-w-7xl">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 tracking-tighter leading-tight">Tại sao nên chọn <br/><span className="text-zinc-500">đội ngũ Cường Thông Gió?</span></h2>
              <p className="text-zinc-400 text-base md:text-lg mb-10 leading-relaxed font-normal max-w-xl mx-auto lg:mx-0">
                Sự chính xác trong từng hệ thống được đảm bảo bởi những kỹ sư và thợ lành nghề. Chúng tôi tự hào về đội ngũ nhân sự tận tâm, am hiểu sâu sắc về kỹ thuật cơ khí và thông gió.
              </p>
              <div className="flex justify-center lg:justify-start">
                <ul className="space-y-5 md:space-y-6 mb-12 md:mb-0 text-left">
                  {['Kỹ thuật viên chứng chỉ chuyên ngành', 'Kỹ sư thiết kế hệ thống chuyên sâu', 'Giám sát thi công 10+ năm kinh nghiệm'].map((item, idx) => (
                    <li key={idx} className="flex items-center gap-4">
                      <div className="w-5 h-5 rounded-full border border-zinc-700 flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 rounded-full bg-white" />
                      </div>
                      <span className="font-semibold uppercase text-xs md:text-sm tracking-widest">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="relative max-w-2xl mx-auto lg:max-w-none w-full">
               <img 
                 src="/thi-cong-ong-gio.png" 
                 alt="Đội ngũ kỹ thuật Cường Thông Gió đang thi công hệ thống ống gió tại công trình" 
                 loading="lazy"
                 decoding="async"
                 width="800"
                 height="500"
                 className="rounded-[1.5rem] md:rounded-[2rem] shadow-2xl w-full object-cover h-[350px] md:h-[500px]" 
               />
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Reviews - Balanced Space */}
      <section className="py-20 md:py-32 bg-white relative z-10 block overflow-visible" aria-label="Đánh giá từ đối tác">
        <div className="container-custom">
          <div className="mb-16 md:mb-24 text-center w-full mx-auto px-4 max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-6"
            >
              Khách hàng đánh giá Cường Thông Gió như thế nào?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-500 text-base md:text-lg mx-auto font-normal leading-relaxed"
            >
              Chúng tôi luôn trân trọng sự tin tưởng và những phản hồi tích cực từ phía chủ đầu tư sau mỗi dự án hoàn thiện.
            </motion.p>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full mx-auto max-w-6xl">
            {projects.map((p, i) => (
              <motion.article 
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-zinc-50/50 p-8 md:p-12 rounded-[1.5rem] md:rounded-[2.5rem] border border-zinc-100 flex flex-col hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <div className="mb-8 md:mb-10 flex-1">
                  <div className="inline-flex items-center rounded-full bg-zinc-100 px-4 py-2 text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">
                    {p.location}
                  </div>
                  {/* Star rating for SEO */}
                  <div className="flex items-center gap-1 mb-4" aria-label="Đánh giá 5 sao">
                    {[1,2,3,4,5].map(star => (
                      <svg key={star} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote>
                    <p className="text-zinc-900 leading-relaxed font-medium text-base md:text-lg">"{p.text}"</p>
                  </blockquote>
                </div>
                <div className="flex items-center gap-4 md:gap-5 pt-6 md:pt-8 border-t border-zinc-100">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-zinc-900 flex items-center justify-center text-white font-bold text-lg md:text-xl">
                    {p.author.charAt(0)}
                  </div>
                  <div>
                    <cite className="text-sm md:text-base font-bold text-zinc-900 uppercase tracking-wider not-italic">{p.author}</cite>
                    <div className="text-xs md:text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1">{p.name}</div>
                    <time className="text-[10px] text-zinc-300 font-medium mt-1 block" dateTime="2026-06-01">Tháng 6, 2026</time>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section - SEO Rich Snippet */}
      <section className="py-20 md:py-32 bg-zinc-50 relative z-10" aria-label="Câu hỏi thường gặp" id="faq">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-14 md:mb-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight"
              >
                Câu hỏi thường gặp về dịch vụ thông gió Đà Nẵng
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-zinc-500 text-base md:text-lg leading-relaxed"
              >
                Giải đáp các thắc mắc phổ biến về dịch vụ và sản phẩm của Cường Thông Gió.
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
                    aria-controls={`faq-answer-${idx}`}
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
                    id={`faq-answer-${idx}`}
                    className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-96 pb-6 md:pb-8' : 'max-h-0'}`}
                    role="region"
                    aria-labelledby={`faq-question-${idx}`}
                  >
                    <p className="px-6 md:px-8 text-zinc-500 text-sm md:text-base leading-relaxed">{faq.answer}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industrial CTA - Balanced */}
      <section className="relative w-full py-20 md:py-32 z-10 px-4" aria-label="Liên hệ tư vấn">
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
                  Sẵn sàng đồng hành <br /> cùng dự án của bạn.
                </h2>
                <p className="text-zinc-400 mb-10 md:mb-14 text-base md:text-lg font-normal leading-relaxed max-w-xl mx-auto">
                  Đội ngũ kỹ sư của Cường Thông Gió luôn sẵn sàng hỗ trợ khảo sát và tư vấn phương án thi công tối ưu nhất cho doanh nghiệp của bạn.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4 md:gap-6 mx-auto w-full sm:w-auto">
                  <Button asChild size="lg" className="w-full sm:w-auto font-bold uppercase tracking-wider text-[13px] h-14 md:h-16 px-10 rounded-full shadow-lg transition-all duration-300 bg-white text-zinc-900 hover:bg-zinc-100 whitespace-nowrap">
                    <Link to="/lien-he" className="flex items-center justify-center w-full h-full">Gửi yêu cầu tư vấn kỹ thuật</Link>
                  </Button>
                </div>
              </motion.div>
           </div>
        </div>
      </section>
    </div>
  )
}
