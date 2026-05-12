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
      <section className="py-20 md:py-32 border-b border-zinc-100 relative z-10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-5xl mx-auto"
          >
            <div className="mb-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-50 border border-zinc-200/60 px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm backdrop-blur-sm">
                Câu chuyện của chúng tôi
              </span>
            </div>
            <div className="mb-6 text-center">
              <SplitText 
                text="Từ xưởng gia công cơ khí đến nhà thầu M&E uy tín."
                className="text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 leading-snug"
                textAlign="center"
                delay={30}
              />
            </div>
            <p className="text-lg md:text-xl text-zinc-500 leading-relaxed font-normal text-justify">
              Công ty TNHH Một Thành Viên Cường Thông Gió (CTGCo., Ltd) là doanh nghiệp hoạt động chuyên sâu trong lĩnh vực cơ điện lạnh, điều hòa không khí và thông gió, được thành lập ngày 06/7/2015 tại Đà Nẵng.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hành trình phát triển */}
      <section className="py-20 md:py-32 relative bg-zinc-50/30">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto flex flex-col gap-16 lg:gap-24">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-8 text-zinc-500 text-base md:text-lg leading-relaxed font-normal text-left"
            >
              <p>
                Với định hướng phát triển bền vững, công ty tập trung vào sản xuất, cung cấp và lắp đặt hệ thống thông gió, ống gió, thiết bị điều hòa không khí, cùng các giải pháp kỹ thuật cho công trình dân dụng và công nghiệp.
              </p>
              <p>
                Trong hồ sơ năng lực, doanh nghiệp thể hiện kinh nghiệm triển khai nhiều hạng mục quy mô lớn cho bệnh viện, nhà máy, khách sạn, trung tâm dữ liệu và các công trình đặc thù, qua đó khẳng định năng lực thi công, chất lượng dịch vụ và khả năng đáp ứng đa dạng yêu cầu kỹ thuật của khách hàng. Cường Thông Gió hướng tới việc mang đến những giải pháp tối ưu, hiệu quả và đáng tin cậy cho từng dự án.
              </p>
              
              <div className="flex justify-center gap-12 pt-8 mt-8 border-t border-zinc-200/60 text-center">
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
              className="grid grid-cols-2 gap-4 relative w-full"
            >
              <div className="rounded-[2.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100">
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop" 
                  alt="Sản xuất ống gió CTG" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <div className="rounded-[2.5rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-zinc-100 mt-12">
                <img 
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop" 
                  alt="Kỹ thuật chuyên sâu CTG" 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-64 object-cover grayscale hover:grayscale-0 transition-all duration-500"
                />
              </div>
              
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nguyên tắc làm nghề */}
      <section className="py-24 md:py-32 bg-white border-t border-zinc-100">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
             <h2 className="text-3xl md:text-4xl font-semibold text-zinc-900 mb-4 tracking-tight">Giá Trị Cốt Lõi</h2>
             <p className="text-zinc-500 text-lg font-normal">Những nguyên tắc chúng tôi luôn tuân thủ trong mọi dự án.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
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
                className="bg-white rounded-2xl p-10 border border-zinc-200/60 shadow-sm hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300"
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
        </div>
      </section>

      {/* CTA cuối trang */}
      <section className="pt-20 pb-96 md:pt-32 md:pb-[40rem] bg-white">
        <div className="container-custom">
           <div className="bg-zinc-900 rounded-3xl p-12 md:p-20 text-center shadow-2xl max-w-5xl mx-auto w-full">
             <h2 className="text-3xl md:text-5xl font-bold mb-10 text-white tracking-tight leading-tight">
               Sẵn sàng đồng hành <br className="hidden sm:block" />
               <span className="text-zinc-400">cùng dự án của bạn.</span>
             </h2>
             <Link to="/lien-he" className="inline-block">
                <Button className="bg-white text-zinc-900 hover:bg-zinc-100 rounded-full px-8 py-6 font-bold uppercase tracking-widest text-xs transition-colors">
                   Gửi yêu cầu tư vấn kỹ thuật
                </Button>
             </Link>
           </div>
        </div>
      </section>
    </div>
  )
}
