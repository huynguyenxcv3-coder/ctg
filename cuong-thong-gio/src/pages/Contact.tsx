import { useState } from 'react'
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, Wind } from 'lucide-react'

const contactInfo = [
  {
    icon: Phone,
    label: 'Điện Thoại',
    value: '0123 456 789',
    sub: 'Hotline hỗ trợ 24/7',
    href: 'tel:0123456789',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@cuongthonggiotgio.vn',
    sub: 'Phản hồi trong 24 giờ',
    href: 'mailto:info@cuongthonggiotgio.vn',
  },
  {
    icon: MapPin,
    label: 'Địa Chỉ',
    value: '123 Đường Công Nghiệp, KCN Tân Bình',
    sub: 'TP. Hồ Chí Minh',
    href: '#',
  },
  {
    icon: Clock,
    label: 'Giờ Làm Việc',
    value: 'Thứ 2 - Thứ 7: 7:30 - 17:30',
    sub: 'CN: 8:00 - 12:00',
    href: '#',
  },
]

export function Contact() {
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1500)
  }

  return (
    <div className="pt-20">
      {/* Header */}
      <section className="hero-bg py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white text-sm font-medium px-4 py-2 rounded-full mb-6">
            <Wind className="w-4 h-4" />
            Liên Hệ
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-5">
            Chúng Tôi Sẵn Lòng Hỗ Trợ
          </h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Hãy để lại thông tin, chúng tôi sẽ liên hệ tư vấn và báo giá miễn phí trong thời gian sớm nhất.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-14 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {contactInfo.map(info => (
              <a
                key={info.label}
                href={info.href}
                className="group p-6 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-blue-700 hover:border-blue-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="w-11 h-11 bg-blue-100 group-hover:bg-blue-600 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <info.icon className="w-5 h-5 text-blue-700 group-hover:text-white transition-colors" />
                </div>
                <div className="text-xs font-semibold text-blue-600 group-hover:text-blue-200 uppercase tracking-wider mb-1 transition-colors">
                  {info.label}
                </div>
                <div className="font-bold text-slate-800 group-hover:text-white text-sm mb-0.5 transition-colors">
                  {info.value}
                </div>
                <div className="text-slate-400 group-hover:text-blue-200 text-xs transition-colors">
                  {info.sub}
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Map */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Gửi Yêu Cầu Báo Giá</h2>
                <p className="text-slate-400 text-sm mb-8">Điền thông tin bên dưới, chúng tôi sẽ liên hệ trong vòng 2 giờ.</p>

                {submitted ? (
                  <div className="py-16 text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle className="w-9 h-9 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Gửi Thành Công!</h3>
                    <p className="text-slate-500 text-sm">
                      Chúng tôi đã nhận được yêu cầu của bạn và sẽ liên hệ lại sớm nhất.
                    </p>
                    <button
                      onClick={() => { setSubmitted(false); setForm({ name: '', phone: '', email: '', service: '', message: '' }) }}
                      className="mt-6 text-blue-600 text-sm font-medium hover:underline"
                    >
                      Gửi yêu cầu khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Họ và Tên *</label>
                        <input
                          type="text"
                          required
                          value={form.name}
                          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                          placeholder="Nguyễn Văn A"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Số Điện Thoại *</label>
                        <input
                          type="tel"
                          required
                          value={form.phone}
                          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                          placeholder="0912 345 678"
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        placeholder="email@company.vn"
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Dịch Vụ Quan Tâm</label>
                      <select
                        value={form.service}
                        onChange={e => setForm(f => ({ ...f, service: e.target.value }))}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors bg-white"
                      >
                        <option value="">-- Chọn dịch vụ --</option>
                        <option>Quạt Công Nghiệp</option>
                        <option>Hệ Thống Hút Bụi</option>
                        <option>Thông Gió Tòa Nhà</option>
                        <option>Lọc Không Khí</option>
                        <option>Bảo Trì & Sửa Chữa</option>
                        <option>Tư Vấn Thiết Kế Hệ Thống</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">Nội Dung Yêu Cầu</label>
                      <textarea
                        rows={4}
                        value={form.message}
                        onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                        placeholder="Mô tả nhu cầu của bạn, diện tích nhà xưởng, số lượng thiết bị cần lắp đặt..."
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 bg-blue-700 hover:bg-blue-800 disabled:opacity-70 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-blue-200"
                    >
                      {loading ? (
                        <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      {loading ? 'Đang Gửi...' : 'Gửi Yêu Cầu Ngay'}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Sidebar info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-blue-700 rounded-3xl p-7 text-white">
                <h3 className="text-xl font-bold mb-3">Tư Vấn Trực Tiếp</h3>
                <p className="text-blue-100 text-sm leading-relaxed mb-6">
                  Gọi ngay để được tư vấn miễn phí từ các kỹ sư chuyên nghiệp của chúng tôi.
                </p>
                <a
                  href="tel:0123456789"
                  className="flex items-center gap-3 bg-white/15 hover:bg-white/25 rounded-2xl px-5 py-4 transition-colors"
                >
                  <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-lg">0123 456 789</div>
                    <div className="text-blue-200 text-xs">Hotline — Miễn phí 24/7</div>
                  </div>
                </a>
              </div>

              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-7">
                <h3 className="text-xl font-bold text-slate-800 mb-5">Cam Kết Của Chúng Tôi</h3>
                <div className="space-y-4">
                  {[
                    'Phản hồi trong vòng 2 giờ làm việc',
                    'Tư vấn và báo giá hoàn toàn miễn phí',
                    'Khảo sát thực tế tận nơi nếu cần',
                    'Không ràng buộc, không phí phát sinh',
                    'Bảo mật tuyệt đối thông tin khách hàng',
                  ].map(item => (
                    <div key={item} className="flex items-start gap-3 text-sm text-slate-600">
                      <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-100 rounded-3xl overflow-hidden h-48 flex items-center justify-center text-slate-300">
                <div className="text-center">
                  <MapPin className="w-10 h-10 mx-auto mb-2 text-blue-300" />
                  <div className="text-sm text-slate-400">KCN Tân Bình, TP.HCM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
