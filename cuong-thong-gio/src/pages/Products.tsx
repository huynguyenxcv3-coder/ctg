import { motion } from 'framer-motion'
import { Wind, Factory, Building2, Zap, Shield, CheckCircle2, ArrowRight } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Link } from 'react-router-dom'

const productCategories = [
  {
    title: 'Quạt Công Nghiệp',
    icon: Wind,
    description: 'Dòng sản phẩm quạt hướng trục, ly tâm công suất lớn, độ bền cao.',
    items: ['Quạt ly tâm cao áp', 'Quạt hướng trục trực tiếp', 'Quạt hút mái nhà xưởng', 'Quạt thông gió gắn tường'],
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Hệ Thống Hút Bụi',
    icon: Factory,
    description: 'Giải pháp xử lý bụi và khí thải công nghiệp hiệu quả.',
    items: ['Hệ thống lọc bụi túi vải', 'Máy hút bụi di động', 'Cyclone lắng bụi', 'Buồng phun sơn'],
    color: 'bg-orange-50 text-orange-600',
  },
  {
    title: 'Thông Gió Tòa Nhà',
    icon: Building2,
    description: 'Hệ thống cấp gió tươi và hút khí thải cho các tòa nhà cao tầng.',
    items: ['Cấp gió tươi căn hộ', 'Hút khói hành lang', 'Tăng áp cầu thang', 'Hệ thống HVAC'],
    color: 'bg-emerald-50 text-emerald-600',
  },
]

export function Products() {
  return (
    <div className="pt-24 pb-20">
      <section className="bg-slate-50 py-20 mb-20 border-b border-slate-200 section-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">Sản Phẩm & Giải Pháp</h1>
            <p className="text-slate-600 text-lg lg:text-xl leading-relaxed">
              Chúng tôi cung cấp đa dạng các thiết bị thông gió và xử lý môi trường đạt chuẩn quốc tế, đáp ứng mọi quy mô nhà xưởng.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-16">
          {productCategories.map((category, idx) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              <div className="flex-1">
                <div className={`w-16 h-16 ${category.color} rounded-2xl flex items-center justify-center mb-6 shadow-sm`}>
                  <category.icon className="w-8 h-8" />
                </div>
                <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">{category.title}</h2>
                <p className="text-slate-600 text-lg mb-8">{category.description}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                  {category.items.map((item) => (
                    <div key={item} className="flex items-center gap-3 p-4 bg-white rounded-xl border border-slate-100 shadow-sm">
                      <CheckCircle2 className="w-5 h-5 text-blue-600 shrink-0" />
                      <span className="text-sm font-semibold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>

                <Button asChild size="lg" className="rounded-xl font-bold">
                  <Link to="/lien-he" className="flex items-center gap-2">
                    Nhận tư vấn kỹ thuật
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>

              <div className="flex-1 w-full aspect-video bg-slate-200 rounded-3xl overflow-hidden shadow-2xl relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <category.icon className="w-32 h-32 text-white/30" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Banner */}
      <section className="mt-32 py-24 bg-blue-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 section-grid" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center text-white mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Cam Kết Chất Lượng</h2>
            <p className="text-blue-100 text-lg max-w-2xl mx-auto">Tất cả sản phẩm đều được kiểm tra vận hành nghiêm ngặt trước khi xuất xưởng.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: Shield, title: 'Bảo Hành 5 Năm', desc: 'Chế độ bảo hành dài hạn nhất thị trường cho các dòng quạt công nghiệp.' },
              { icon: Zap, title: 'Tiết Kiệm Năng Lượng', desc: 'Sử dụng động cơ đạt chuẩn IE2, IE3 giúp tối ưu hóa chi phí vận hành.' },
              { icon: Building2, title: 'Đạt Chuẩn ISO', desc: 'Quy trình sản xuất và quản lý chất lượng đạt tiêu chuẩn ISO 9001:2015.' },
            ].map((item) => (
              <div key={item.title} className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl text-white">
                <item.icon className="w-10 h-10 mb-6 text-blue-200" />
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-blue-100/80 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
