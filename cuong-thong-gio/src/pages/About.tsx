import { motion } from 'framer-motion'
import { Award, Users, Target, Rocket, ShieldCheck } from 'lucide-react'
import { Card } from '../components/ui/Card'

export function About() {
  const values = [
    { icon: Target, title: 'Tầm Nhìn', desc: 'Trở thành doanh nghiệp hàng đầu trong lĩnh vực giải pháp không khí sạch tại Việt Nam.' },
    { icon: Rocket, title: 'Sứ Mệnh', desc: 'Mang lại giải pháp tối ưu giúp cải thiện môi trường làm việc và bảo vệ sức khỏe cộng đồng.' },
    { icon: ShieldCheck, title: 'Giá Trị Cốt Lõi', desc: 'Chất lượng - Uy tín - Tận tâm là kim chỉ nam cho mọi hoạt động của chúng tôi.' },
  ]

  return (
    <div className="pt-24 pb-20">
      <section className="bg-slate-50 py-20 mb-20 border-b border-slate-200 section-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-6">Về Cường Thống Gió</h1>
            <p className="text-slate-600 text-lg lg:text-xl">
              Hơn 15 năm kinh nghiệm trong ngành cơ điện lạnh và giải pháp thông gió công nghiệp.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Câu Chuyện Của Chúng Tôi</h2>
            <div className="space-y-4 text-slate-600 leading-relaxed">
              <p>
                Được thành lập từ những năm 2010, Công ty TNHH MTV Cường Thống Gió bắt đầu với một xưởng cơ khí nhỏ chuyên sửa chữa quạt công nghiệp. Bằng sự nỗ lực không ngừng và cam kết về chất lượng, chúng tôi đã vươn mình trở thành đối tác tin cậy của hàng trăm nhà máy lớn nhỏ tại Việt Nam.
              </p>
              <p>
                Chúng tôi hiểu rằng, một môi trường làm việc thông thoáng không chỉ bảo vệ máy móc mà quan trọng hơn hết là bảo vệ sức khỏe của hàng ngàn công nhân. Đó là động lực để chúng tôi không ngừng cải tiến công nghệ và tối ưu hóa giải pháp.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-8 mt-12">
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Năm Kinh Nghiệm</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-blue-600 mb-2">2000+</div>
                <div className="text-sm font-bold text-slate-400 uppercase tracking-wider">Dự Án Hoàn Thành</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square bg-slate-200 rounded-3xl overflow-hidden shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-slate-900/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                 <Users className="w-32 h-32 text-white/30" />
              </div>
            </div>
            <div className="absolute -bottom-10 -right-10 glass p-8 rounded-2xl shadow-xl border border-white/40 hidden md:block">
              <Award className="w-12 h-12 text-blue-600 mb-4" />
              <div className="font-bold text-slate-900">Chứng nhận ISO</div>
              <div className="text-slate-500 text-sm">9001:2015 Quality Management</div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((v, idx) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
            >
              <Card className="h-full border-none bg-white shadow-lg p-8">
                <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
                  <v.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4">{v.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm">{v.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team CTA */}
      <section className="mt-32 py-24 bg-slate-900 rounded-[3rem] mx-4 sm:mx-8 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 section-grid" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-3xl lg:text-5xl font-bold text-white mb-8">Đội Ngũ Kỹ Sư Giàu Kinh Nghiệm</h2>
          <p className="text-slate-400 text-lg mb-12">Chúng tôi luôn sẵn sàng lắng nghe và đưa ra những tư vấn kỹ thuật chính xác nhất cho doanh nghiệp của bạn.</p>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>
      </section>
    </div>
  )
}
