import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Variants } from 'framer-motion'
import { Button } from '../components/ui/Button'
import { SEO, makeBreadcrumbSchema } from '../components/SEO'

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
    transition: { staggerChildren: 0.15 }
  }
}

const tools = [
  {
    title: 'Tính Lưu Lượng Gió',
    description:
      'Tính toán lưu lượng gió cần thiết dựa trên thể tích phòng và loại không gian. Hỗ trợ nhiều loại công trình với hệ số ACH tiêu chuẩn.',
    href: '/cong-cu/tinh-luu-luong-gio',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64" />
      </svg>
    ),
  },
  {
    title: 'Tính Tiết Diện Ống Gió',
    description:
      'Xác định kích thước ống gió tròn hoặc chữ nhật dựa trên lưu lượng và vận tốc gió. Tham chiếu tiêu chuẩn SMACNA.',
    href: '/cong-cu/tinh-tiet-dien-ong-gio',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-2.25-1.313M21 7.5v2.25m0-2.25l-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3l2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75l2.25-1.313M12 21.75V19.5m0 2.25l-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25" />
      </svg>
    ),
  },
  {
    title: 'Tính Công Suất Quạt',
    description:
      'Tính công suất quạt cần thiết dựa trên lưu lượng gió, áp suất tĩnh và hiệu suất. Đề xuất motor phù hợp theo tiêu chuẩn.',
    href: '/cong-cu/tinh-cong-suat-quat',
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
]

const breadcrumb = makeBreadcrumbSchema([
  { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
  { name: 'Công cụ tính toán', url: 'https://cuongthonggio.com/cong-cu' },
])

export function Tools() {
  return (
    <>
      <SEO
        title="Công Cụ Tính Toán HVAC Miễn Phí"
        description="Bộ công cụ tính toán thông gió miễn phí: tính lưu lượng gió, tiết diện ống gió, công suất quạt. Hỗ trợ kỹ sư HVAC và chủ đầu tư thiết kế hệ thống thông gió chính xác."
        keywords="công cụ tính toán HVAC, tính lưu lượng gió, tính tiết diện ống gió, tính công suất quạt, calculator thông gió, HVAC calculator"
        structuredData={breadcrumb}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-zinc-950 pt-32 pb-20 lg:pt-40 lg:pb-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-500/10 via-transparent to-transparent" />
        <div className="relative mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.p
              variants={fadeUp}
              className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400"
            >
              Công cụ miễn phí
            </motion.p>
            <motion.h1
              variants={fadeUp}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
            >
              Công Cụ Tính Toán{' '}
              <span className="text-blue-400">HVAC</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-lg leading-relaxed text-zinc-400"
            >
              Bộ công cụ tính toán thông gió chuyên nghiệp, giúp kỹ sư và chủ đầu tư
              nhanh chóng xác định các thông số thiết kế hệ thống thông gió — hoàn toàn miễn phí.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Tool Cards */}
      <section className="bg-zinc-950 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={stagger}
            className="grid gap-8 md:grid-cols-3"
          >
            {tools.map((tool) => (
              <motion.div key={tool.href} variants={fadeUp}>
                <Link
                  to={tool.href}
                  className="group flex h-full flex-col rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 transition-all duration-300 hover:border-blue-500/40 hover:bg-zinc-900"
                >
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition-colors group-hover:bg-blue-500/20">
                    {tool.icon}
                  </div>
                  <h2 className="mb-3 text-xl font-bold text-white">
                    {tool.title}
                  </h2>
                  <p className="mb-6 flex-1 text-sm leading-relaxed text-zinc-400">
                    {tool.description}
                  </p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 transition-colors group-hover:text-blue-300">
                    Sử dụng ngay
                    <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-zinc-950 pb-20 lg:pb-28">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            variants={fadeUp}
            className="overflow-hidden rounded-2xl border border-zinc-800 bg-gradient-to-br from-zinc-900 to-zinc-900/50 p-10 text-center lg:p-16"
          >
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Cần tư vấn thiết kế hệ thống thông gió chuyên sâu?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-zinc-400">
              Đội ngũ kỹ sư của chúng tôi sẵn sàng hỗ trợ bạn thiết kế, tính toán
              và thi công hệ thống thông gió phù hợp với công trình. Liên hệ ngay để nhận
              tư vấn miễn phí.
            </p>
            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link to="/lien-he">Liên hệ tư vấn</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="tel:0905001224">
                  <svg className="mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                  0905 001 224
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}
