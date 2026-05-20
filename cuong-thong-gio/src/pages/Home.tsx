import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Variants } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '../components/ui/Button'
import SplitText from '../components/ui/SplitText'

const stats = [
  { value: '13', label: 'Năm hoạt động' },
  { value: '2,145', label: 'Dự án bàn giao' },
  { value: '500m²', label: 'Diện tích xưởng' },
]

const services = [
  {
    title: 'Quạt Công Nghiệp',
    desc: 'Gia công trực tiếp các dòng quạt ly tâm, hướng trục, hút mái bằng vật liệu tiêu chuẩn. Cân bằng động kỹ thuật số chính xác tuyệt đối.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Hệ Thống Xử Lý Khí & Bụi',
    desc: 'Thi công hệ thống lọc bụi túi vải, tháp hấp thụ khí thải cho khu công nghiệp, nhà xưởng, cam kết đạt chuẩn môi trường.',
    imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Hệ Thống Thông Gió & Làm Mát',
    desc: 'Thiết kế & thi công hệ thống thông gió tươi, làm mát nhà xưởng bằng tấm cooling pad, máy làm mát công nghiệp hiệu suất cao.',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop'
  },
  {
    title: 'Cơ Khí & Inox Dân Dụng',
    desc: 'Gia công ống gió xoắn, máng hút khói bếp, bồn chứa inox và các thiết bị phụ trợ cơ khí theo yêu cầu kỹ thuật riêng.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800&auto=format&fit=crop'
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

  return (
    <div ref={containerRef} className="bg-white min-h-screen selection:bg-zinc-200 selection:text-zinc-900 relative font-sans text-zinc-900">
      
      {/* Hero Section - Balanced spacing and typography */}
      <section className="pt-32 pb-16 md:pt-48 md:pb-24 relative z-10 bg-white overflow-hidden">
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
      <section id="xuong-san-xuat" className="py-16 md:py-24 relative z-10 scroll-mt-24 bg-zinc-50 border-b border-zinc-100">
        <div className="container-custom">
          <motion.div 
            style={{ opacity }}
            className="w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-zinc-900 shadow-xl aspect-[1.4/1] sm:aspect-[16/9] lg:aspect-[21/9] relative group border-2 md:border-[3px] border-white"
          >
            <motion.img 
              style={{ y: imgY, scale: imgScale }}
              src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1200&auto=format&fit=crop" 
              alt="Xưởng sản xuất quạt công nghiệp Cường Thông Gió" 
              loading="lazy"
              decoding="async"
              className="w-full h-[120%] object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 absolute top-[-10%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex items-end p-8 md:p-16 lg:p-24">
               <div className="text-white max-w-4xl">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-white text-black text-[10px] font-bold px-3 py-1.5 rounded uppercase tracking-wider">Thực tế</span>
                    <span className="text-[10px] md:text-xs font-medium opacity-80 uppercase tracking-widest">Dây chuyền sản xuất tại xưởng</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-tight">Làm chủ công nghệ <br className="hidden md:block"/> và kỹ thuật</h3>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Concrete Stats Section - Refined */}
      <section className="py-12 md:py-20 bg-white border-b border-zinc-100 relative z-10">
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
      <section className="py-20 md:py-32 relative bg-zinc-50 z-10">
        <div className="container-custom">
          <div className="mb-14 md:mb-20 text-center w-full mx-auto px-4 max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight uppercase"
            >
              Giải pháp & Thiết bị
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-500 text-base md:text-xl font-normal leading-relaxed mx-auto"
            >
              Tư vấn thiết kế & Thi công hệ thống thông gió công nghiệp, xử lý khí thải, bụi cho nhà xưởng, tòa nhà, bếp công nghiệp...
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full mx-auto max-w-7xl">
            {services.map((service, i) => (
              <motion.div 
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
                    alt={service.title} 
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
                <div className="p-8 md:p-12 flex-1 flex flex-col">
                  <h3 className="text-xl md:text-2xl font-bold text-zinc-900 mb-4 tracking-tight leading-tight uppercase">{service.title}</h3>
                  <p className="text-zinc-500 text-sm md:text-base mb-8 leading-relaxed font-normal opacity-80">{service.desc}</p>
                  <div className="mt-auto pt-6 border-t border-zinc-100">
                    <Link to="/san-pham" className="inline-flex items-center text-[11px] font-bold text-zinc-400 hover:text-zinc-900 transition-colors uppercase tracking-[0.2em]">
                      Xem chi tiết thiết bị
                      <svg className="w-4 h-4 ml-3 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Human/Team Section - Balanced */}
      <section className="py-20 md:py-32 bg-zinc-900 text-white overflow-hidden relative z-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full mx-auto max-w-7xl">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 tracking-tighter leading-tight">Đội ngũ kỹ thuật <br/><span className="text-zinc-500">giàu kinh nghiệm.</span></h2>
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
                 alt="Đội ngũ kỹ thuật Cường Thông Gió" 
                 loading="lazy"
                 decoding="async"
                 className="rounded-[1.5rem] md:rounded-[2rem] shadow-2xl w-full object-cover h-[350px] md:h-[500px]" 
               />
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Reviews - Balanced Space */}
      <section className="py-20 md:py-32 bg-white relative z-10 block overflow-visible">
        <div className="container-custom">
          <div className="mb-16 md:mb-24 text-center w-full mx-auto px-4 max-w-3xl">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 mb-6"
            >
              Đánh giá từ đối tác
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
              <motion.div 
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
                  <p className="text-zinc-900 leading-relaxed font-medium text-base md:text-lg">"{p.text}"</p>
                </div>
                <div className="flex items-center gap-4 md:gap-5 pt-6 md:pt-8 border-t border-zinc-100">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-zinc-900 flex items-center justify-center text-white font-bold text-lg md:text-xl">
                    {p.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm md:text-base font-bold text-zinc-900 uppercase tracking-wider">{p.author}</div>
                    <div className="text-xs md:text-sm font-bold text-zinc-400 uppercase tracking-widest mt-1">{p.name}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial CTA - Balanced */}
      <section className="relative w-full py-20 md:py-32 z-10 px-4">
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
                  <Button asChild size="lg" className="w-full sm:w-[260px] font-bold uppercase tracking-wider text-[13px] h-14 md:h-16 px-8 rounded-full shadow-lg transition-all duration-300 bg-white text-zinc-900 hover:bg-zinc-100">
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
