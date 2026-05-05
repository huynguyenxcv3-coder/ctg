import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Clock, Send } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

export function Contact() {
  return (
    <div className="pt-24 pb-20">
      <section className="bg-slate-50 py-20 mb-20 border-b border-slate-200 section-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">Liên Hệ</h1>
            <p className="text-slate-600 text-lg lg:text-xl">
              Gửi yêu cầu hoặc gọi điện trực tiếp để nhận tư vấn và báo giá miễn phí từ các kỹ sư của chúng tôi.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            <h2 className="text-2xl font-bold text-slate-900 mb-8">Thông Tin Liên Hệ</h2>
            
            {[
              { icon: Phone, title: 'Điện Thoại', content: '0123 456 789', desc: 'Hỗ trợ 24/7' },
              { icon: Mail, title: 'Email', content: 'info@cuongthonggio.vn', desc: 'Phản hồi trong 24h' },
              { icon: MapPin, title: 'Địa Chỉ', content: '123 Đường Số 4, KCN Tân Bình, TP. HCM', desc: 'Văn phòng chính' },
              { icon: Clock, title: 'Giờ Làm Việc', content: 'Thứ 2 - Thứ 7', desc: '08:00 - 17:30' },
            ].map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="border-none bg-slate-50 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex gap-4">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shrink-0 shadow-sm text-blue-600">
                      <item.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.title}</div>
                      <div className="text-slate-900 font-bold mb-1">{item.content}</div>
                      <div className="text-slate-500 text-xs">{item.desc}</div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 lg:p-12 border-slate-100 shadow-xl">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">Gửi Yêu Cầu Cho Chúng Tôi</h3>
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Họ và Tên</label>
                    <input
                      type="text"
                      className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                      placeholder="Nguyễn Văn A"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Số Điện Thoại</label>
                    <input
                      type="tel"
                      className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                      placeholder="0123 456 789"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Email</label>
                    <input
                      type="email"
                      className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Loại Dịch Vụ Cần Tư Vấn</label>
                    <select className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all">
                      <option>Quạt Công Nghiệp</option>
                      <option>Hệ Thống Hút Bụi</option>
                      <option>Thông Gió Tòa Nhà</option>
                      <option>Bảo Trì & Sửa Chữa</option>
                    </select>
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700">Nội Dung Yêu Cầu</label>
                    <textarea
                      rows={5}
                      className="w-full bg-slate-50 border-slate-100 rounded-xl px-4 py-4 text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                      placeholder="Mô tả sơ lược về nhu cầu của bạn..."
                    />
                  </div>
                  <div className="md:col-span-2 pt-4">
                    <Button className="w-full h-14 rounded-xl text-base font-bold shadow-lg shadow-blue-200">
                      Gửi Yêu Cầu Báo Giá
                      <Send className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="mt-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="w-full h-[450px] bg-slate-200 rounded-3xl overflow-hidden shadow-inner relative">
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="text-slate-400 font-bold flex flex-col items-center gap-4">
               <MapPin className="w-12 h-12" />
               Bản đồ đang được tải...
             </div>
          </div>
        </div>
      </section>
    </div>
  )
}
