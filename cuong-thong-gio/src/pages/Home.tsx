import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Wind, Shield, Award, Users, ChevronRight, ArrowRight,
  Star, Wrench, Factory, Building2, Zap
} from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const stats = [
  { value: '15+', label: 'Năm Kinh Nghiệm' },
  { value: '2.000+', label: 'Dự Án Hoàn Thành' },
  { value: '500+', label: 'Khách Hàng Tin Tưởng' },
  { value: '98%', label: 'Tỷ Lệ Hài Lòng' },
]

const features = [
  {
    icon: Shield,
    title: 'Chất Lượng Đảm Bảo',
    desc: 'Tất cả sản phẩm được kiểm định chất lượng nghiêm ngặt, đạt chuẩn ISO và các tiêu chuẩn quốc tế.',
  },
  {
    icon: Zap,
    title: 'Tiết Kiệm Năng Lượng',
    desc: 'Các giải pháp thông gió hiện đại giúp tiết kiệm điện năng lên đến 40% so với hệ thống truyền thống.',
  },
  {
    icon: Wrench,
    title: 'Lắp Đặt Chuyên Nghiệp',
    desc: 'Đội ngũ kỹ thuật viên giàu kinh nghiệm, lắp đặt nhanh chóng và đúng tiến độ yêu cầu.',
  },
  {
    icon: Award,
    title: 'Bảo Hành Dài Hạn',
    desc: 'Chế độ bảo hành lên đến 5 năm cùng dịch vụ hậu mãi và bảo trì định kỳ tận tâm.',
  },
]

const products = [
  {
    icon: Wind,
    name: 'Quạt Công Nghiệp',
    desc: 'Quạt hướng trục, ly tâm công suất lớn cho nhà máy, xưởng sản xuất.',
    tag: 'Phổ biến',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    icon: Factory,
    name: 'Hệ Thống Hút Bụi',
    desc: 'Thiết bị lọc và hút bụi công nghiệp, đảm bảo môi trường làm việc sạch sẽ.',
    tag: 'Mới',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Building2,
    name: 'Thông Gió Tòa Nhà',
    desc: 'Giải pháp thông gió toàn diện cho văn phòng, tòa nhà thương mại.',
    tag: 'Cao cấp',
    color: 'bg-emerald-50 text-emerald-600',
  },
]

const testimonials = [
  {
    name: 'Nguyễn Văn Minh',
    role: 'Giám đốc Nhà Máy Dệt May ABC',
    text: 'Sau khi lắp hệ thống thông gió của Cường Thống Gió, nhiệt độ nhà xưởng giảm rõ rệt, công nhân làm việc hiệu quả hơn nhiều.',
    stars: 5,
  },
  {
    name: 'Trần Thị Lan',
    role: 'Chủ Doanh Nghiệp TL Group',
    text: 'Dịch vụ chuyên nghiệp, đúng tiến độ. Đội ngũ kỹ thuật tư vấn nhiệt tình và am hiểu sản phẩm. Rất hài lòng!',
    stars: 5,
  },
  {
    name: 'Lê Quốc Bảo',
    role: 'Trưởng Phòng Kỹ Thuật - KCN Tân Bình',
    text: 'Thiết bị chất lượng cao, tiết kiệm điện đáng kể. Đã hợp tác 5 năm và luôn tin tưởng Cường Thống Gió.',
    stars: 5,
  },
]

export function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-20 bg-white">
        {/* Background elements */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-50/50 skew-x-12 translate-x-1/4" />
          <div className="absolute inset-0 section-grid opacity-40" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
                Giải Pháp Kỹ Thuật Hàng Đầu
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 text-balance">
                Giải Pháp <span className="text-blue-600">Thông Gió</span> Toàn Diện Cho Công Nghiệp
              </motion.h1>

              <motion.p variants={fadeInUp} className="text-lg lg:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
                Nâng cao năng suất lao động và bảo vệ sức khỏe công nhân với hệ thống thông gió, hút bụi đạt chuẩn quốc tế.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4 mb-12">
                <Button asChild size="lg" className="rounded-xl px-8 h-14 text-base font-bold shadow-lg shadow-blue-200">
                  <Link to="/san-pham">Khám Phá Sản Phẩm</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-xl px-8 h-14 text-base font-bold bg-white/50 backdrop-blur-sm">
                  <Link to="/lien-he">Yêu Cầu Báo Giá</Link>
                </Button>
              </motion.div>

              <motion.div variants={fadeInUp} className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-10 border-t border-slate-100">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-2xl font-bold text-slate-900">{s.value}</div>
                    <div className="text-xs text-slate-500 font-medium uppercase tracking-tight">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border border-white/20">
                <div className="aspect-[4/5] bg-slate-200 relative">
                  {/* Decorative mesh/pattern or actual image placeholder */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/40 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Wind className="w-40 h-40 text-white/20 animate-pulse" />
                  </div>
                </div>
                {/* Floating Info Box */}
                <div className="absolute bottom-8 left-8 right-8 glass p-6 rounded-2xl shadow-xl border border-white/40">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                      <Zap className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="text-slate-900 font-bold">Tiết kiệm 40%</div>
                      <div className="text-slate-500 text-sm">Điện năng tiêu thụ hàng tháng</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Background Glow */}
              <div className="absolute -top-10 -right-10 w-64 h-64 bg-blue-400/20 rounded-full blur-[100px]" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-400/10 rounded-full blur-[100px]" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-6">Tại Sao Chọn Cường Thống Gió?</h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">Chúng tôi không chỉ cung cấp thiết bị, chúng tôi mang đến giải pháp kỹ thuật tối ưu và dịch vụ hậu mãi tận tâm.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-none shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                      <f.icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{f.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-2xl">
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mb-4">Sản Phẩm Nổi Bật</h2>
              <p className="text-slate-500 text-lg">Khám phá các dòng sản phẩm chất lượng cao, đáp ứng mọi nhu cầu thông gió công nghiệp.</p>
            </div>
            <Button asChild variant="outline" className="rounded-lg group">
              <Link to="/san-pham" className="flex items-center gap-2">
                Xem tất cả sản phẩm
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500">
                  <div className={`h-64 ${p.color} flex items-center justify-center relative overflow-hidden`}>
                    <p.icon className="w-24 h-24 opacity-20 absolute -right-4 -bottom-4 rotate-12" />
                    <p.icon className="w-20 h-20 relative z-10" />
                    <div className="absolute top-4 left-4 glass px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-slate-900 border-white/20">
                      {p.tag}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-slate-900 mb-3">{p.name}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed mb-8">{p.desc}</p>
                    <Link
                      to="/san-pham"
                      className="inline-flex items-center gap-2 text-blue-600 font-bold text-sm hover:gap-3 transition-all"
                    >
                      Tìm hiểu thêm
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 relative overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1)_0%,transparent_70%)]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Users className="w-16 h-16 text-blue-500 mx-auto mb-8" />
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-8">Bạn Cần Tư Vấn Kỹ Thuật?</h2>
            <p className="text-slate-400 text-lg lg:text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Đội ngũ kỹ sư của chúng tôi sẵn sàng khảo sát và tư vấn giải pháp tối ưu nhất cho nhà xưởng của bạn hoàn toàn miễn phí.
            </p>
            <div className="flex flex-wrap justify-center gap-6">
              <Button asChild size="lg" className="rounded-xl h-16 px-10 text-lg font-bold">
                <Link to="/lien-he">Liên Hệ Ngay</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl h-16 px-10 text-lg font-bold text-white border-slate-700 hover:bg-slate-800">
                <a href="tel:0123456789">Gọi 0123 456 789</a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900">Khách Hàng Nói Gì</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="h-full border-slate-100 hover:border-blue-100 transition-colors">
                  <CardHeader>
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.stars }).map((_, j) => (
                        <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                      ))}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                  </CardHeader>
                  <CardContent className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-bold">
                      {t.name[0]}
                    </div>
                    <div>
                      <div className="font-bold text-slate-900 text-sm">{t.name}</div>
                      <div className="text-slate-500 text-xs">{t.role}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
