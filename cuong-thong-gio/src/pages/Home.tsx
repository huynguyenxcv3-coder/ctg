import { motion, useScroll, useTransform } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Variants } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '../components/ui/Button'


const stats = [
  { value: '13', label: 'Năm hoạt động' },
  { value: '2,145', label: 'Dự án bàn giao' },
  { value: '500m²', label: 'Diện tích xưởng' },
]

const services = [
  {
    title: 'Sản xuất Quạt Công Nghiệp',
    desc: 'Gia công trực tiếp các dòng quạt ly tâm, hướng trục bằng vật liệu tiêu chuẩn. Hệ thống cánh quạt được cân bằng động kỹ thuật số đảm bảo độ chính xác tuyệt đối.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=2000&auto=format&fit=crop'
  },
  {
    title: 'Giải pháp Xử lý Khí & Bụi',
    desc: 'Thi công hệ thống lọc bụi túi vải, tháp hấp thụ khí thải cho các khu công nghiệp và nhà xưởng, cam kết hiệu quả xử lý đạt chuẩn môi trường.',
    imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=2000&auto=format&fit=crop'
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
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 120])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.5])

  return (
    <div ref={containerRef} className="bg-zinc-50 min-h-screen selection:bg-zinc-200 selection:text-zinc-900 relative font-sans text-zinc-900">
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 md:pt-40 md:pb-28 relative z-10 bg-white border-b border-zinc-200">
        <div className="container-custom text-center">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeUp} className="mb-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-100 border border-zinc-300 px-3 py-1 text-[10px] font-bold text-zinc-700 shadow-sm uppercase tracking-[0.2em]">
                <span className="flex h-2 w-2 rounded-full bg-zinc-900 animate-pulse" />
                Xưởng sản xuất trực tiếp tại Đà Nẵng
              </span>
            </motion.div>
            
            <div className="mb-8">
              <motion.h1 
                variants={fadeUp}
                className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.1] justify-center"
              >
                Hệ thống thông gió chuyên nghiệp cho công trình công nghiệp.
              </motion.h1>
            </div>
            
            <motion.p 
              variants={fadeUp}
              className="text-lg md:text-xl text-zinc-500 mb-12 leading-relaxed max-w-2xl mx-auto font-normal"
            >
              Không chỉ là đơn vị thi công, Cường Thông Gió sở hữu năng lực sản xuất độc lập, kiểm soát hoàn toàn chất lượng thiết bị và tiến độ dự án.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="rounded-full font-bold uppercase tracking-widest text-xs">
                <Link to="/lien-he">Yêu cầu tư vấn kỹ thuật</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full font-bold uppercase tracking-widest text-xs">
                <a href="#xuong-san-xuat">Năng lực sản xuất</a>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Realistic Factory Image Section */}
      <section id="xuong-san-xuat" className="px-4 sm:px-6 relative z-20 -mt-10 md:-mt-16 mb-24 md:mb-32 scroll-mt-24">
        <motion.div 
          style={{ y, opacity }}
          className="max-w-6xl mx-auto rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl aspect-[16/9] relative group border-4 border-white"
        >
          <img 
            src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2000&auto=format&fit=crop" 
            alt="Xưởng sản xuất quạt công nghiệp Cường Thông Gió" 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-8 md:p-12">
             <div className="text-white">
                <div className="flex items-center gap-3 mb-3">
                  <span className="bg-white text-black text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Thực tế</span>
                  <span className="text-sm font-medium opacity-80 uppercase tracking-widest">Dây chuyền sản xuất tại xưởng</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-bold tracking-tighter">Làm chủ công nghệ và kỹ thuật</h3>
             </div>
          </div>
        </motion.div>
      </section>

      {/* Concrete Stats Section */}
      <section className="py-24 bg-white border-y border-zinc-100 relative z-30">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-zinc-100">
            {stats.map((s, i) => (
              <motion.div 
                key={s.label} 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col items-center pt-12 md:pt-0"
              >
                <div className="text-5xl md:text-7xl font-bold text-zinc-900 mb-4 tracking-tighter">{s.value}</div>
                <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em]">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Solutions */}
      <section className="py-24 md:py-32 relative bg-zinc-50">
        <div className="container-custom">
          <div className="mb-16 md:mb-20 text-center md:text-left">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight"
            >
              Năng Lực Cốt Lõi
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-500 text-lg max-w-2xl font-normal leading-relaxed"
            >
              Chúng tôi khẳng định uy tín bằng chất lượng sản phẩm thực tế và quy trình nghiệm thu khắt khe, đảm bảo hiệu quả vận hành tối ưu cho khách hàng.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {services.map((service, i) => (
              <motion.div 
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group bg-white rounded-2xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
              >
                <div className="h-72 overflow-hidden relative">
                  <img 
                    src={service.imageUrl} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 grayscale hover:grayscale-0"
                  />
                </div>
                <div className="p-10 flex-1 flex flex-col">
                  <h3 className="text-2xl font-bold text-zinc-900 mb-4 tracking-tight">{service.title}</h3>
                  <p className="text-zinc-500 mb-8 leading-relaxed font-normal">{service.desc}</p>
                  <div className="mt-auto pt-8 border-t border-zinc-50">
                    <Link to="/san-pham" className="inline-flex items-center text-[11px] font-bold text-zinc-900 hover:text-zinc-500 transition-colors uppercase tracking-[0.2em]">
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

      {/* Human/Team Section */}
      <section className="py-24 bg-zinc-900 text-white overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 tracking-tighter">Đội ngũ kỹ thuật <br/><span className="text-zinc-500">giàu kinh nghiệm.</span></h2>
              <p className="text-zinc-400 text-lg mb-10 leading-relaxed font-normal">
                Sự chính xác trong từng hệ thống được đảm bảo bởi những kỹ sư và thợ lành nghề. Chúng tôi tự hào về đội ngũ nhân sự tận tâm, am hiểu sâu sắc về kỹ thuật cơ khí và thông gió.
              </p>
              <ul className="space-y-6 mb-12">
                {['Kỹ thuật viên chứng chỉ chuyên ngành', 'Kỹ sư thiết kế hệ thống chuyên sâu', 'Giám sát thi công 10+ năm kinh nghiệm'].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-4">
                    <div className="w-5 h-5 rounded-full border border-zinc-700 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    <span className="font-semibold uppercase text-xs tracking-widest">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
               <img src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000&auto=format&fit=crop" alt="Đội ngũ kỹ thuật Cường Thông Gió" className="rounded-2xl shadow-2xl filter grayscale" />
               <div className="absolute -bottom-10 -left-10 bg-white text-zinc-900 p-8 rounded-2xl shadow-2xl border border-zinc-100 max-w-xs">
                  <p className="font-bold text-xl mb-2 tracking-tight">Cam kết An toàn</p>
                  <p className="text-zinc-500 text-sm leading-relaxed">Tuân thủ nghiêm ngặt các quy định về an toàn lao động và bảo hộ tại công trường.</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Reviews */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container-custom">
          <div className="mb-20 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-zinc-900 mb-6"
            >
              Đánh giá từ đối tác
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-500 text-lg max-w-2xl mx-auto font-normal"
            >
              Chúng tôi luôn trân trọng sự tin tưởng và những phản hồi tích cực từ phía chủ đầu tư sau mỗi dự án hoàn thiện.
            </motion.p>
          </div>
            
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
            {projects.map((p, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="bg-zinc-50/50 p-10 rounded-2xl border border-zinc-100 flex flex-col hover:bg-white hover:shadow-xl transition-all duration-500"
              >
                <div className="mb-8 flex-1">
                  <div className="inline-flex items-center rounded-full bg-zinc-100 px-4 py-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-6">
                    {p.location}
                  </div>
                  <p className="text-zinc-900 leading-relaxed font-medium text-lg">"{p.text}"</p>
                </div>
                <div className="flex items-center gap-5 pt-8 border-t border-zinc-100">
                  <div className="w-14 h-14 rounded-full bg-zinc-900 flex items-center justify-center text-white font-bold text-xl">
                    {p.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-base font-bold text-zinc-900 uppercase tracking-wider">{p.author}</div>
                    <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest mt-1">{p.name}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industrial CTA */}
      <section className="py-24 bg-white">
        <div className="container-custom">
           <div className="bg-zinc-900 rounded-[2rem] p-12 md:p-24 text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0,transparent_100%)] pointer-events-none" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-3xl mx-auto relative z-10"
              >
                <h2 className="text-3xl md:text-6xl font-bold mb-8 tracking-tighter text-white uppercase">
                  Tư vấn khảo sát trực tiếp
                </h2>
                <p className="text-zinc-400 mb-12 text-lg font-normal leading-relaxed">Đội ngũ kỹ sư của Cường Thông Gió luôn sẵn sàng hỗ trợ khảo sát và tư vấn phương án thi công tối ưu nhất cho doanh nghiệp của bạn.</p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
                  <Button asChild size="lg" className="w-full sm:w-auto rounded-full font-bold uppercase tracking-widest text-xs h-14 px-12">
                    <Link to="/lien-he">Đặt lịch khảo sát ngay</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="w-full sm:w-auto rounded-full font-bold uppercase tracking-widest text-xs h-14 px-12 bg-transparent text-white border-white hover:bg-white hover:text-black">
                    <a href="tel:0905001224">Hotline: 0905 001 224</a>
                  </Button>
                </div>
              </motion.div>
           </div>
        </div>
      </section>
    </div>
  )
}
