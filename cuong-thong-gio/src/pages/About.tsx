import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function About() {
  return (
    <div className="bg-white min-h-screen pt-14 selection:bg-zinc-100 selection:text-zinc-900 font-sans">
      
      {/* Background Ambient Effect */}
      <div className="absolute top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none z-0">
        <div className="w-full max-w-[1000px] bg-[radial-gradient(ellipse_100%_100%_at_50%_-20%,rgba(244,244,245,1),rgba(255,255,255,0))] h-[600px]" />
      </div>

      {/* Phần giới thiệu */}
      <section className="py-20 md:py-32 border-b border-zinc-100 relative z-10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="mb-6 flex">
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-50 border border-zinc-200/60 px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm backdrop-blur-sm">
                Câu chuyện của chúng tôi
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 mb-6 leading-tight">
              Từ xưởng gia công cơ khí <br className="hidden md:block" />
              <span className="text-zinc-400">đến nhà thầu M&E uy tín.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 leading-relaxed font-normal max-w-3xl">
              Cường Thông Gió được xây dựng trên nền tảng kinh nghiệm thực chiến và tâm huyết với nghề cơ khí. Chúng tôi hiểu rõ từng chi tiết kỹ thuật của hệ thống thông gió, từ khâu sản xuất tại xưởng đến khi vận hành tại công trường.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hành trình phát triển */}
      <section className="py-20 md:py-32 relative bg-zinc-50/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 text-zinc-500 text-base md:text-lg leading-relaxed font-normal"
            >
              <p>
                Khởi đầu từ một xưởng gia công nhỏ chuyên cung cấp linh kiện cho các đơn vị lớn tại Đà Nẵng, chúng tôi đã không ngừng cải tiến kỹ thuật và quy trình sản xuất. Chính sự tỉ mỉ trong từng mối hàn, sự chính xác trong từng đường cắt CNC đã tạo nên thương hiệu Cường Thông Gió ngày nay.
              </p>
              <p>
                Hiện nay, với xưởng sản xuất quy mô hơn 500m² tại Liên Chiểu cùng hệ thống máy móc tự động hóa, chúng tôi tự tin đáp ứng mọi yêu cầu khắt khe về kỹ thuật và tiến độ. Phương châm của chúng tôi là "Làm thật - Giá trị thật", mọi hệ thống sau khi lắp đặt đều được kiểm tra lưu lượng, cột áp thực tế để đảm bảo hiệu quả tối ưu nhất.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-8 mt-8 border-t border-zinc-200/60">
                <div>
                  <div className="text-3xl md:text-4xl font-semibold text-zinc-900 mb-2 tracking-tight">13+</div>
                  <div className="text-sm font-medium text-zinc-500">Năm kinh nghiệm</div>
                </div>
                <div>
                  <div className="text-3xl md:text-4xl font-semibold text-zinc-900 mb-2 tracking-tight">2,145</div>
                  <div className="text-sm font-medium text-zinc-500">Dự án hoàn thành</div>
                </div>
              </div>
            </motion.div>
            
            {/* Hình ảnh thực tế */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-2 gap-4 relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100">
                <img 
                  src="https://images.unsplash.com/photo-1504917595217-d4bf0611a9eb?q=80&w=1000&auto=format&fit=crop" 
                  alt="Gia công cơ khí chính xác" 
                  className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 mt-12">
                <img 
                  src="https://images.unsplash.com/photo-1580983546594-f182062fa9c2?q=80&w=1000&auto=format&fit=crop" 
                  alt="Kỹ thuật chuyên sâu" 
                  className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/90 backdrop-blur-md text-zinc-900 font-semibold text-sm px-6 py-3 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-zinc-900 animate-pulse" />
                Cam kết chất lượng
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nguyên tắc làm nghề */}
      <section className="py-24 md:py-32 bg-white border-t border-zinc-100">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16 md:mb-20">
             <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 mb-4 tracking-tight">Giá Trị Cốt Lõi</h2>
             <p className="text-zinc-500 text-lg font-normal">Những nguyên tắc chúng tôi luôn tuân thủ trong mọi dự án.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: 'Vật tư đúng tiêu chuẩn',
                desc: 'Chúng tôi cam kết sử dụng đúng chủng loại vật tư, độ dày tôn và công suất động cơ như đã thỏa thuận. Minh bạch hoàn toàn về nguồn gốc và chất lượng (CO/CQ).'
              },
              {
                title: 'Trách nhiệm cao nhất',
                desc: 'Luôn bám sát công trình, xử lý triệt để các vấn đề kỹ thuật phát sinh. Hệ thống chỉ được bàn giao khi vận hành êm ái và đạt chuẩn yêu cầu của khách hàng.'
              },
              {
                title: 'Báo giá minh bạch',
                desc: 'Quy trình báo giá rõ ràng, không phát sinh chi phí ngoài kế hoạch. Chúng tôi tư vấn giải pháp tối ưu nhất dựa trên nhu cầu thực tế của từng dự án.'
              }
            ].map((camKet, viTri) => (
               <motion.div 
                key={camKet.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: viTri * 0.1 }}
                className="bg-white rounded-2xl p-8 border border-zinc-200/60 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-full bg-zinc-100 mb-6 flex items-center justify-center text-zinc-900 font-semibold text-sm ring-1 ring-zinc-200/50">
                  0{viTri + 1}
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 mb-3 tracking-tight">{camKet.title}</h3>
                <p className="text-sm text-zinc-500 leading-relaxed font-normal">{camKet.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA cuối trang */}
      <section className="py-24 md:py-32 bg-zinc-900 text-white relative overflow-hidden rounded-t-[3rem] border-t border-zinc-800">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0,transparent_100%)] pointer-events-none" />
        <div className="container-custom text-center relative z-10">
           <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-8 tracking-tight">
              Hợp tác cùng chúng tôi <br className="hidden sm:block" />
              <span className="text-zinc-400">để kiến tạo giá trị bền vững.</span>
            </h2>
            <Link to="/lien-he">
               <Button variant="outline" className="bg-white text-zinc-900 hover:bg-zinc-100 border-none px-10 h-12 rounded-full font-bold uppercase tracking-widest text-xs">
                  Gửi yêu cầu tư vấn
               </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
