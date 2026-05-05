import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Wind, Filter, Search, ChevronRight, CheckCircle, Star, Zap, Shield } from 'lucide-react'
import { cn } from '../lib/utils'

const categories = ['Tất Cả', 'Quạt Công Nghiệp', 'Hút Bụi & Lọc Khí', 'Thông Gió Tòa Nhà', 'Phụ Kiện']

const products = [
  {
    id: 1,
    name: 'Quạt Hướng Trục CTG-A200',
    category: 'Quạt Công Nghiệp',
    desc: 'Quạt hướng trục công suất cao, lưu lượng gió lớn, phù hợp nhà xưởng rộng.',
    specs: ['Công suất: 2.2 kW', 'Lưu lượng: 18.000 m³/h', 'Đường kính: 500mm'],
    badge: 'Bán Chạy',
    badgeColor: 'bg-orange-100 text-orange-700',
    stars: 4.9,
    reviews: 128,
    gradient: 'from-blue-600 to-blue-800',
  },
  {
    id: 2,
    name: 'Quạt Ly Tâm CTG-B500',
    category: 'Quạt Công Nghiệp',
    desc: 'Quạt ly tâm áp suất cao, thích hợp cho hệ thống đường ống dài.',
    specs: ['Công suất: 5.5 kW', 'Áp suất: 800 Pa', 'Tốc độ: 960 rpm'],
    badge: 'Phổ Biến',
    badgeColor: 'bg-blue-100 text-blue-700',
    stars: 4.8,
    reviews: 96,
    gradient: 'from-slate-600 to-slate-800',
  },
  {
    id: 3,
    name: 'Hệ Thống Lọc Bụi CTG-F300',
    category: 'Hút Bụi & Lọc Khí',
    desc: 'Thiết bị lọc bụi túi vải công nghiệp, hiệu suất lọc đạt 99.9%.',
    specs: ['Lưu lượng: 5.000 m³/h', 'Hiệu suất lọc: 99.9%', 'Áp tổn: < 1.500 Pa'],
    badge: 'Mới',
    badgeColor: 'bg-emerald-100 text-emerald-700',
    stars: 4.9,
    reviews: 54,
    gradient: 'from-orange-500 to-red-600',
  },
  {
    id: 4,
    name: 'Buồng Hút Mùi CTG-M150',
    category: 'Hút Bụi & Lọc Khí',
    desc: 'Thiết bị hút mùi và khói hàn, lọc bụi siêu mịn PM2.5.',
    specs: ['Lưu lượng: 3.000 m³/h', 'Lọc PM2.5', 'Cấp độ lọc: H13'],
    badge: 'Cao Cấp',
    badgeColor: 'bg-purple-100 text-purple-700',
    stars: 4.7,
    reviews: 41,
    gradient: 'from-purple-600 to-purple-800',
  },
  {
    id: 5,
    name: 'Hệ Thống AHU CTG-V800',
    category: 'Thông Gió Tòa Nhà',
    desc: 'Cụm xử lý không khí trung tâm cho tòa nhà văn phòng, thương mại.',
    specs: ['Công suất: 11 kW', 'Lưu lượng: 20.000 m³/h', 'Tích hợp lọc F7'],
    badge: 'Doanh Nghiệp',
    badgeColor: 'bg-teal-100 text-teal-700',
    stars: 4.9,
    reviews: 32,
    gradient: 'from-teal-500 to-teal-700',
  },
  {
    id: 6,
    name: 'Quạt Thông Gió Mái CTG-R400',
    category: 'Thông Gió Tòa Nhà',
    desc: 'Quạt thông gió lắp mái, chịu mưa nắng, phù hợp nhà xưởng và kho bãi.',
    specs: ['Công suất: 1.5 kW', 'Lưu lượng: 8.000 m³/h', 'IP54'],
    badge: 'Tiết Kiệm',
    badgeColor: 'bg-lime-100 text-lime-700',
    stars: 4.6,
    reviews: 87,
    gradient: 'from-lime-600 to-green-700',
  },
]

export function Products() {
  const [activeCategory, setActiveCategory] = useState('Tất Cả')
  const [search, setSearch] = useState('')

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'Tất Cả' || p.category === activeCategory
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.desc.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className="pt-20">
      {/* Page Header */}
      <section className="hero-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Wind className="w-4 h-4" />
            Danh Mục Sản Phẩm
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Sản Phẩm & Thiết Bị
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Đa dạng sản phẩm thông gió, hút bụi và lọc khí chất lượng cao cho mọi nhu cầu công nghiệp và dân dụng.
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="sticky top-16 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            {/* Categories */}
            <div className="flex items-center gap-2 flex-wrap">
              <Filter className="w-4 h-4 text-slate-400 shrink-0" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={cn(
                    'px-4 py-1.5 rounded-xl text-sm font-medium transition-all',
                    activeCategory === cat
                      ? 'bg-blue-700 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
            {/* Search */}
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm sản phẩm..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 bg-slate-50"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filtered.length === 0 ? (
            <div className="text-center py-24 text-slate-400">
              <Wind className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p className="text-lg">Không tìm thấy sản phẩm phù hợp.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map(p => (
                <div
                  key={p.id}
                  className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
                >
                  {/* Product Image */}
                  <div className={`h-48 bg-gradient-to-br ${p.gradient} flex items-center justify-center relative`}>
                    <Wind className="w-20 h-20 text-white/20 absolute" strokeWidth={0.8} />
                    <Wind className="w-14 h-14 text-white relative z-10" />
                    <div className={`absolute top-4 left-4 ${p.badgeColor} text-xs font-bold px-3 py-1.5 rounded-full`}>
                      {p.badge}
                    </div>
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-white/20 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full">
                      <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                      {p.stars}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <div className="text-xs text-blue-600 font-medium mb-2">{p.category}</div>
                    <h3 className="font-bold text-slate-800 text-lg mb-2">{p.name}</h3>
                    <p className="text-slate-500 text-sm mb-4 leading-relaxed">{p.desc}</p>

                    {/* Specs */}
                    <div className="space-y-1.5 mb-5">
                      {p.specs.map(s => (
                        <div key={s} className="flex items-center gap-2 text-xs text-slate-500">
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          {s}
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="text-xs text-slate-400">{p.reviews} đánh giá</div>
                      <Link
                        to="/lien-he"
                        className="flex items-center gap-1.5 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                      >
                        Báo Giá
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Shield, title: 'Bảo Hành 5 Năm', desc: 'Bảo hành chính hãng, đổi mới trong 30 ngày nếu có lỗi sản xuất.' },
              { icon: Zap, title: 'Giao Hàng Toàn Quốc', desc: 'Vận chuyển nhanh chóng, đóng gói cẩn thận, giao đúng hẹn.' },
              { icon: Star, title: 'Hỗ Trợ 24/7', desc: 'Đội ngũ kỹ thuật hỗ trợ mọi lúc, giải đáp mọi thắc mắc.' },
            ].map(b => (
              <div key={b.title} className="flex gap-4 p-6 rounded-2xl bg-blue-50 border border-blue-100">
                <div className="w-10 h-10 bg-blue-700 rounded-xl flex items-center justify-center shrink-0">
                  <b.icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">{b.title}</h4>
                  <p className="text-slate-500 text-sm">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
