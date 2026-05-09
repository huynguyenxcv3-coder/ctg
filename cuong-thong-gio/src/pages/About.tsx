import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import SplitText from '../components/ui/SplitText'

export function About() {
  return (
    <div className="bg-white min-h-screen pt-12 selection:bg-zinc-100 selection:text-zinc-900 font-sans relative">
      
      {/* Background Ambient Effect */}
      <div className="absolute top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none z-0">
        <div className="w-full max-w-[1000px] bg-[radial-gradient(ellipse_100%_100%_at_50%_-20%,rgba(244,244,245,1),rgba(255,255,255,0))] h-[600px]" />
      </div>

      {/* Phần giới thiệu */}
      <section className="py-20 md:py-32 border-b border-zinc-100 relative z-10 text-center">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto"
          >
            <div className="mb-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-50 border border-zinc-200/60 px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm backdrop-blur-sm">
                Câu chuyện của chúng tôi
              </span>
            </div>
            <div className="mb-6">
              <SplitText 
                text="Từ xưởng gia công cơ khí đến nhà thầu M&E uy tín."
                className="text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 leading-snug"
                textAlign="center"
                delay={30}
              />
            </div>
            <p className="text-lg md:text-xl text-zinc-500 leading-relaxed font-normal max-w-3xl mx-auto">
              Cường Thông Gió được xây dựng trên nền tảng kinh nghiệm thực chiến và tâm huyết với nghề cơ khí. Chúng tôi hiểu rõ từng chi tiết kỹ thuật của hệ thống thông gió, từ khâu sản xuất tại xưởng đến khi vận hành tại công trường.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hành trình phát triển */}
      <section className="py-20 md:py-32 relative bg-zinc-50/30 text-center">
        <div className="container-custom">
          <div className="flex flex-col items-center gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 text-zinc-500 text-base md:text-lg leading-relaxed font-normal max-w-3xl mx-auto"
            >
              <p>
                Khởi đầu từ một xưởng gia công nhỏ chuyên cung cấp linh kiện cho các đơn vị lớn tại Đà Nẵng, chúng tôi đã không ngừng cải tiến kỹ thuật và quy trình sản xuất. Chính sự tỉ mỉ trong từng mối hàn, sự chính xác trong từng đường cắt CNC đã tạo nên thương hiệu Cường Thông Gió ngày nay.
              </p>
              <p>
                Hiện nay, với xưởng sản xuất quy mô hơn 500m² tại Liên Chiểu cùng hệ thống máy móc tự động hóa, chúng tôi tự tin đáp ứng mọi yêu cầu khắt khe về kỹ thuật và tiến độ. Phương châm của chúng tôi là "Làm thật - Giá trị thật", mọi hệ thống sau khi lắp đặt đều được kiểm tra lưu lượng, cột áp thực tế để đảm bảo hiệu quả tối ưu nhất.
              </p>
              
              <div className="flex justify-center gap-8 pt-8 mt-8 border-t border-zinc-200/60 mx-auto">
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
              className="grid grid-cols-2 gap-4 relative w-full max-w-4xl mx-auto"
            >
              <div className="rounded-[2.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100">
                <img 
                  src="https://images.unsplash.com/photo-1504917595217-d4bf0611a9eb?q=80&w=800&auto=format&fit=crop" 
                  alt="Gia công cơ khí chính xác" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="rounded-[2.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 mt-12">
                <img 
                  src="https://images.unsplash.com/photo-1580983546594-f182062fa9c2?q=80&w=800&auto=format&fit=crop" 
                  alt="Kỹ thuật chuyên sâu" 
                  loading="lazy"
                  decoding="async"
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
                className="bg-white rounded-[2.5rem] p-8 border border-zinc-200/60 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300"
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
      <section className="py-24 md:py-40 bg-white">
        <div className="container-custom flex justify-center">
           <div className="bg-zinc-900 rounded-[4rem] py-24 px-10 md:py-36 md:px-20 text-center relative overflow-hidden mx-auto w-full max-w-6xl flex flex-col items-center shadow-[0_30px_70px_rgba(0,0,0,0.3)]">
              <div className="absolute inset-0 opacity-15 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0,transparent_100%)] pointer-events-none" />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center"
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-10 tracking-tight text-white mx-auto leading-[1.15]">
                  Hợp tác cùng chúng tôi <br className="hidden sm:block" />
                  <span className="text-zinc-500">để kiến tạo giá trị bền vững.</span>
                </h2>
                <Link to="/lien-he" className="mx-auto">
                   <Button variant="outline" className="bg-white text-zinc-900 hover:bg-zinc-100 border-none px-6 sm:px-20 h-12 w-full sm:w-auto sm:min-w-[300px] rounded-full font-bold uppercase tracking-[0.2em] text-[10px] shadow-2xl hover:translate-y-[-1px] transition-all duration-300">
                      Gửi yêu cầu tư vấn kỹ thuật
                   </Button>
                </Link>
              </motion.div>
           </div>
        </div>
      </section>
    </div>
  )
}
