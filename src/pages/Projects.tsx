import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Variants } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { SEO, makeBreadcrumbSchema } from '../components/SEO'
import { trackRecord } from './projectsData'

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
    transition: { staggerChildren: 0.06 },
  },
}

const stats = [
  { value: '30+', label: 'Công trình tiêu biểu' },
  { value: '7', label: 'Lĩnh vực thi công' },
  { value: '10+', label: 'Năm kinh nghiệm' },
  { value: '100%', label: 'Nghiệm thu đạt' },
]

export function Projects() {
  const breadcrumb = makeBreadcrumbSchema([
    { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
    { name: 'Dự án', url: 'https://cuongthonggio.com/du-an' },
  ])

  return (
    <div className="bg-white min-h-screen selection:bg-zinc-200 selection:text-zinc-900 relative font-sans text-zinc-900">
      <SEO
        title="Dự Án Thực Tế — Thi Công Thông Gió & Xử Lý Khí Thải"
        description="Hồ sơ năng lực Cường Thông Gió: hơn 30 công trình tiêu biểu về điều hòa không khí, thông gió, hút mùi, xử lý khí thải tại Đà Nẵng, Huế, Quảng Nam và các nhà máy FDI. Hơn 10 năm kinh nghiệm."
        keywords="dự án thông gió, thông gió nhà xưởng Đà Nẵng, hút khói bếp, xử lý khí thải, thông gió PCCC, cooling pad, ống gió, Cường Thông Gió"
        structuredData={[breadcrumb]}
        dateModified="2026-06-16"
      />

      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="pt-24 md:pt-28 pb-0 relative z-10 bg-white">
        <div className="container-custom">
          <ol
            className="flex items-center gap-2 text-xs text-zinc-400 font-medium"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" itemProp="item" className="hover:text-zinc-900 transition-colors">
                <span itemProp="name">Trang chủ</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-zinc-300">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-zinc-900">
                Dự án
              </span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-8 pb-16 md:pt-12 md:pb-20 relative z-10 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div variants={stagger} initial="hidden" animate="visible">
              <motion.p
                variants={fadeUp}
                className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold mb-4"
              >
                Dự án thực tế
              </motion.p>
              <motion.h1
                variants={fadeUp}
                className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-900 leading-[1.1] mb-6"
              >
                Hồ sơ công trình
                <br />
                đã thi công khắp Miền Trung.
              </motion.h1>
              <motion.p
                variants={fadeUp}
                className="text-lg md:text-xl text-zinc-500 leading-relaxed max-w-2xl mx-auto"
              >
                Mỗi dự án là một bài toán kỹ thuật riêng biệt. Chúng tôi tự hào chia sẻ những giải
                pháp đã mang lại kết quả thực tế cho khách hàng.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-y border-zinc-100 bg-zinc-50/50">
        <div className="container-custom">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="grid grid-cols-2 md:grid-cols-4 divide-x divide-zinc-200"
          >
            {stats.map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="py-8 md:py-10 text-center">
                <div className="text-2xl md:text-3xl font-extrabold text-zinc-900 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-zinc-500 mt-1 font-medium">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Hồ sơ kinh nghiệm — track record */}
      <section className="py-16 md:py-24 bg-zinc-50/50 border-t border-zinc-100">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center mb-12 md:mb-16"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-400 font-semibold mb-4">
              Hồ sơ năng lực
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight mb-6">
              Một số công trình tiêu biểu đã thực hiện
            </h2>
            <p className="text-zinc-500 text-lg leading-relaxed">
              Danh mục công trình điều hòa không khí, thông gió, hút mùi và xử lý khí thải mà Cường
              Thông Gió đã thi công cho các chủ đầu tư trong và ngoài nước.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="max-w-7xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {trackRecord.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-zinc-200 overflow-hidden shadow-sm hover:shadow-xl transition-all group flex flex-col"
                >
                  <div className="aspect-[4/3] bg-zinc-100 overflow-hidden relative group-hover:scale-[1.02] transition-transform duration-500">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-300 bg-zinc-100">
                        <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-zinc-700 rounded-full shadow-sm">
                      Dự án {idx + 1}
                    </div>
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <h3 className="text-sm font-bold text-zinc-900 leading-snug mb-3 flex-1 line-clamp-3">
                      {item.name}
                    </h3>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100">
                      <span className="text-[10px] uppercase font-bold tracking-widest text-zinc-400">Quy mô</span>
                      <span className="text-xs font-semibold text-zinc-700 bg-zinc-100 px-2.5 py-1 rounded-md">{item.scale}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xs text-zinc-400 text-center mt-6 max-w-5xl mx-auto"
          >
            Nguồn: Hồ sơ năng lực Công ty TNHH MTV Cường Thông Gió. Danh mục mang tính tiêu biểu, chưa
            bao gồm toàn bộ công trình đã thực hiện.
          </motion.p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-zinc-950 text-white">
        <div className="container-custom">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2
              variants={fadeUp}
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight mb-6 leading-tight"
            >
              Bạn có dự án tương tự?
              <br />
              Liên hệ tư vấn miễn phí.
            </motion.h2>
            <motion.p variants={fadeUp} className="text-zinc-400 text-lg mb-10 leading-relaxed">
              Đội ngũ kỹ sư của chúng tôi sẵn sàng khảo sát thực tế và tư vấn giải pháp phù hợp
              nhất cho công trình của bạn.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <a href="tel:0905001224">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  0905 001 224
                </a>
              </Button>
              <Button variant="outline" size="lg" asChild className="text-zinc-950">
                <Link to="/lien-he">Gửi yêu cầu tư vấn</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
