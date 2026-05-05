import { Link } from 'react-router-dom'
import { Wind, Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-700/60">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center">
                <Wind className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="font-bold text-base">Cường Thống Gió</div>
                <div className="text-xs text-slate-400">Công Ty TNHH MTV</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              Đơn vị hàng đầu cung cấp giải pháp thông gió, điều hòa không khí và hệ thống lọc khí chuyên nghiệp cho doanh nghiệp và hộ gia đình.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors text-white text-xs font-bold">
                f
              </a>
              <a href="#" className="w-9 h-9 bg-slate-800 hover:bg-red-600 rounded-lg flex items-center justify-center transition-colors text-white text-xs font-bold">
                yt
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4">Trang</h4>
            <ul className="space-y-2.5">
              {[
                { to: '/', label: 'Trang Chủ' },
                { to: '/san-pham', label: 'Sản Phẩm' },
                { to: '/gioi-thieu', label: 'Giới Thiệu' },
                { to: '/lien-he', label: 'Liên Hệ' },
              ].map(link => (
                <li key={link.to}>
                  <Link to={link.to} className="text-slate-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4">Dịch Vụ</h4>
            <ul className="space-y-2.5">
              {[
                'Quạt Công Nghiệp',
                'Hệ Thống Hút Bụi',
                'Thông Gió Nhà Xưởng',
                'Lọc Không Khí',
                'Bảo Trì & Sửa Chữa',
                'Tư Vấn Thiết Kế',
              ].map(s => (
                <li key={s}>
                  <span className="text-slate-400 text-sm">{s}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider text-slate-300 mb-4">Liên Hệ</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-slate-400 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-blue-400" />
                123 Đường Công Nghiệp, KCN Tân Bình, TP. Hồ Chí Minh
              </li>
              <li>
                <a href="tel:0123456789" className="flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors">
                  <Phone className="w-4 h-4 shrink-0 text-blue-400" />
                  0123 456 789
                </a>
              </li>
              <li>
                <a href="mailto:info@cuongthonggiotgio.vn" className="flex items-center gap-3 text-slate-400 hover:text-white text-sm transition-colors">
                  <Mail className="w-4 h-4 shrink-0 text-blue-400" />
                  info@cuongthonggiotgio.vn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 text-slate-500 text-xs">
          <p>© 2024 Công Ty TNHH MTV Cường Thống Gió. Bảo lưu mọi quyền.</p>
          <p>Thiết kế chuyên nghiệp | MST: 0123456789</p>
        </div>
      </div>
    </footer>
  )
}
