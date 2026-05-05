import { Link } from 'react-router-dom'
import { Wind, Mail, Phone, MapPin, Globe, Play, Send } from 'lucide-react'
import { Button } from './ui/Button'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Wind className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white tracking-tight">Cường Thống Gió</span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Giải pháp thông gió và xử lý bụi công nghiệp hàng đầu Việt Nam. Chúng tôi cam kết mang lại môi trường làm việc sạch và an toàn.
            </p>
            <div className="flex items-center gap-3">
              {[Globe, Play, Send].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6">Khám Phá</h3>
            <ul className="space-y-4 text-sm">
              {[
                { label: 'Trang Chủ', href: '/' },
                { label: 'Sản Phẩm', href: '/san-pham' },
                { label: 'Giới Thiệu', href: '/gioi-thieu' },
                { label: 'Liên Hệ', href: '/lien-he' },
              ].map(link => (
                <li key={link.label}>
                  <Link to={link.href} className="hover:text-blue-400 transition-colors flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-blue-600" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-bold mb-6">Liên Hệ</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                <span>123 Đường Số 4, KCN Tân Bình, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <span>0123 456 789</span>
              </li>
              <li className="flex gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <span>info@cuongthonggio.vn</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-6">Nhận Bản Tin</h3>
            <p className="text-sm text-slate-400 mb-4">Đăng ký để nhận thông tin mới nhất về sản phẩm và ưu đãi.</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Email của bạn"
                className="bg-slate-800 border-none rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-blue-600 outline-none"
              />
              <Button className="w-full font-bold">Đăng Ký</Button>
            </div>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© 2024 Cường Thống Gió. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Chính sách bảo mật</a>
            <a href="#" className="hover:text-white transition-colors">Điều khoản sử dụng</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
