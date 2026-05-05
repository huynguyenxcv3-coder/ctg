import { Link } from 'react-router-dom'
import {
  Wind, Shield, Award, Users, ChevronRight, ArrowRight,
  CheckCircle, Star, Wrench, Factory, Building2, Zap
} from 'lucide-react'

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
    color: 'from-blue-500 to-blue-700',
  },
  {
    icon: Factory,
    name: 'Hệ Thống Hút Bụi',
    desc: 'Thiết bị lọc và hút bụi công nghiệp, đảm bảo môi trường làm việc sạch sẽ.',
    tag: 'Mới',
    color: 'from-orange-500 to-red-600',
  },
  {
    icon: Building2,
    name: 'Thông Gió Tòa Nhà',
    desc: 'Giải pháp thông gió toàn diện cho văn phòng, tòa nhà thương mại, trung tâm mua sắm.',
    tag: 'Cao cấp',
    color: 'from-emerald-500 to-teal-600',
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
    <div>
      {/* Hero */}
      <section className="hero-bg min-h-screen flex items-center relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
          {/* Grid lines */}
          <div className="absolute inset-0" style={{backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '60px 60px'}} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-200 text-sm font-medium px-4 py-2 rounded-full mb-8 anim-fade border border-blue-400/20">
              <Wind className="w-4 h-4" />
              Công ty TNHH MTV Cường Thống Gió
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 anim-fade-up d100">
              Giải Pháp{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-orange-400">
                Thông Gió
              </span>{' '}
              Chuyên Nghiệp
            </h1>

            <p className="text-lg sm:text-xl text-blue-100/80 leading-relaxed mb-10 max-w-2xl anim-fade-up d200">
              Chúng tôi cung cấp giải pháp thông gió, hút bụi và điều hòa không khí công nghiệp toàn diện — hiệu quả, tiết kiệm năng lượng và bền vững.
            </p>

            <div className="flex flex-wrap gap-4 mb-16 anim-fade-up d300">
              <Link
                to="/san-pham"
                className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-4 rounded-2xl transition-all duration-200 shadow-xl shadow-orange-900/30 hover:shadow-orange-900/50 hover:-translate-y-0.5"
              >
                Xem Sản Phẩm
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/lien-he"
                className="flex items-center gap-2 border border-white/30 hover:border-white/60 text-white font-semibold px-7 py-4 rounded-2xl transition-all duration-200 hover:bg-white/10"
              >
                Yêu Cầu Báo Giá
                <ChevronRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Quick checks */}
            <div className="flex flex-wrap gap-x-8 gap-y-3 anim-fade-up d400">
              {['Bảo hành 5 năm', 'Lắp đặt miễn phí', 'Hỗ trợ 24/7', 'Tư vấn trực tiếp'].map(item => (
                <div key={item} className="flex items-center gap-2 text-blue-200 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative wind icon */}
        <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block anim-float opacity-10">
          <Wind className="w-96 h-96 text-blue-300" strokeWidth={0.5} />
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <div key={s.label} className={`text-center p-8 rounded-2xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-blue-100 anim-scale d${(i+1)*100}`}>
                <div className="text-4xl font-bold text-blue-700 mb-2">{s.value}</div>
                <div className="text-slate-500 text-sm font-medium">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 section-pattern bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <Shield className="w-4 h-4" />
              Tại Sao Chọn Chúng Tôi
            </div>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Cam Kết Chất Lượng Hàng Đầu
            </h2>
            <p className="text-slate-500 max-w-xl mx-auto text-lg">
              Chúng tôi không chỉ bán sản phẩm — chúng tôi cung cấp giải pháp hoàn chỉnh từ tư vấn đến lắp đặt và bảo trì.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`bg-white p-7 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 anim-fade-up d${(i+1)*100}`}
              >
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5">
                  <f.icon className="w-6 h-6 text-blue-700" />
                </div>
                <h3 className="font-bold text-slate-800 mb-3">{f.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Preview */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-semibold px-4 py-2 rounded-full mb-5">
                <Wind className="w-4 h-4" />
                Sản Phẩm Nổi Bật
              </div>
              <h2 className="text-4xl font-bold text-slate-900">
                Danh Mục Sản Phẩm
              </h2>
            </div>
            <Link
              to="/san-pham"
              className="flex items-center gap-2 text-blue-700 font-semibold hover:text-blue-900 transition-colors group"
            >
              Xem tất cả
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {products.map((p, i) => (
              <div
                key={p.name}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer hover:-translate-y-2 transition-all duration-300 shadow-sm hover:shadow-xl anim-fade-up d${(i+1)*100}`}
              >
                <div className={`h-52 bg-gradient-to-br ${p.color} flex items-center justify-center relative`}>
                  <p.icon className="w-20 h-20 text-white/30 absolute" strokeWidth={0.8} />
                  <p.icon className="w-16 h-16 text-white relative z-10" />
                  <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                    {p.tag}
                  </div>
                </div>
                <div className="p-6 bg-white border-x border-b border-slate-100">
                  <h3 className="font-bold text-slate-800 text-lg mb-2">{p.name}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">{p.desc}</p>
                  <Link
                    to="/san-pham"
                    className="inline-flex items-center gap-1.5 text-blue-700 font-semibold text-sm group-hover:gap-2.5 transition-all"
                  >
                    Xem Chi Tiết
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-20 bg-gradient-to-r from-blue-800 to-blue-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl" />
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <Users className="w-12 h-12 text-blue-300 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-5">
            Bạn Cần Tư Vấn Miễn Phí?
          </h2>
          <p className="text-blue-200 text-lg mb-10 max-w-2xl mx-auto">
            Đội ngũ chuyên gia của chúng tôi sẵn sàng hỗ trợ bạn lựa chọn giải pháp thông gió phù hợp nhất với nhu cầu và ngân sách.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/lien-he"
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-8 py-4 rounded-2xl transition-all shadow-lg shadow-orange-900/30 hover:-translate-y-0.5"
            >
              Liên Hệ Ngay
            </Link>
            <a
              href="tel:0123456789"
              className="border border-white/40 hover:border-white text-white font-bold px-8 py-4 rounded-2xl transition-all hover:bg-white/10"
            >
              Gọi 0123 456 789
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 text-sm font-semibold px-4 py-2 rounded-full mb-5">
              <Star className="w-4 h-4" />
              Đánh Giá Khách Hàng
            </div>
            <h2 className="text-4xl font-bold text-slate-900">
              Khách Hàng Nói Gì Về Chúng Tôi
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {testimonials.map((t, i) => (
              <div
                key={t.name}
                className={`bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all duration-300 anim-fade-up d${(i+1)*100}`}
              >
                <div className="flex gap-1 mb-5">
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <Star key={j} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div>
                  <div className="font-bold text-slate-800">{t.name}</div>
                  <div className="text-slate-400 text-xs mt-0.5">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
