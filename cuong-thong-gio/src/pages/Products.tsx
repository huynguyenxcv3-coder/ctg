import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { DuctModel3D } from '../components/ui/DuctModel3D'
import SplitText from '../components/ui/SplitText'

interface SanPham {
  title: string;
  description: string;
  imageUrl: string;
  specs: string[];
  modelType?: 'box-fan' | 'centrifugal' | 'filter';
}

const danhSachSanpham: SanPham[] = [
  {
    title: 'Quạt Công Nghiệp Hiệu Suất Cao',
    description: 'Chúng tôi trực tiếp gia công và lắp đặt các dòng quạt ly tâm, hướng trục và quạt thông gió mái. Sản phẩm sử dụng động cơ dây đồng tiêu chuẩn, cánh quạt được cân bằng động kỹ thuật số đảm bảo vận hành êm ái, bền bỉ và không rung lắc.',
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=800&auto=format&fit=crop',
    specs: ['Công suất: 1.1kW - 200kW', 'Lưu lượng: lên đến 150.000 m³/h', 'Áp suất cao, hiệu suất tối ưu', 'Vật liệu: Thép CT3 hoặc Inox 304'],
    modelType: 'centrifugal'
  },
  {
    title: 'Gia Công Ống Gió & Phụ Kiện',
    description: 'Sở hữu dây chuyền cắt Plasma CNC hiện đại, chúng tôi sản xuất ống gió vuông, tròn xoắn theo tiêu chuẩn quốc tế (SMACNA). Ngoài ra, chúng tôi cung cấp đầy đủ phụ kiện như van VCD, FD và cửa gió nhôm định hình cao cấp.',
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop',
    specs: ['Tôn mạ kẽm độ dày 0.48 - 1.15mm', 'Cửa gió nhôm sơn tĩnh điện', 'Sản xuất nhanh, chính xác', 'Kết nối kín khít, giảm tổn thất áp suất'],
    modelType: 'box-fan'
  },
  {
    title: 'Hệ Thống Xử Lý Bụi & Khí Thải',
    description: 'Thiết kế và thi công hệ thống lọc bụi túi vải với công nghệ giũ bụi khí nén tự động. Đối với các khu vực phát sinh mùi hóa chất, chúng tôi cung cấp giải pháp tháp hấp thụ sử dụng than hoạt tính chuyên dụng.',
    imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=800&auto=format&fit=crop',
    specs: ['Hiệu quả lọc bụi > 99%', 'Túi lọc chống ẩm, chịu nhiệt', 'Hệ thống điều khiển PLC thông minh', 'Đạt quy chuẩn xả thải môi trường'],
    modelType: 'filter'
  },
]

export function Products() {
  return (
    <div className="bg-zinc-50 min-h-screen pt-32 selection:bg-zinc-900 selection:text-white relative font-sans text-zinc-900">
      
      {/* Giới thiệu năng lực - Increased padding to clear Navbar */}
      <section className="py-24 md:py-32 relative z-10 border-b border-zinc-200 bg-white">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="mb-6 flex">
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-900 px-3 py-1 text-xs font-bold text-white uppercase tracking-widest">
                Sản phẩm & Giải pháp
              </span>
            </div>
            <div className="mb-6">
              <SplitText 
                text="Sản xuất trực tiếp, kiểm soát chất lượng tuyệt đối."
                className="text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900"
                textAlign="left"
                delay={30}
              />
            </div>
            <p className="text-zinc-600 text-lg md:text-xl leading-relaxed font-normal">
              Cường Thông Gió tự hào sở hữu xưởng gia công quy mô tại Đà Nẵng, giúp chúng tôi chủ động hoàn toàn về tiến độ và cam kết tiêu chuẩn kỹ thuật khắt khe nhất cho mọi dự án.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Danh sách sản phẩm - Using higher z-index and mt-10 for overlap protection */}
      <section className="py-24 md:py-32 relative z-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-24 md:gap-32">
            {danhSachSanpham.map((hangMuc, soThuTu) => (
              <motion.div
                key={hangMuc.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-center mt-10"
              >
                {/* Product 3D Model / Image */}
                <div className={`h-[350px] lg:h-[450px] w-full rounded-[2.5rem] overflow-hidden bg-white border border-zinc-200 shadow-xl relative group ${soThuTu % 2 === 1 ? 'lg:order-2' : ''}`}>
                   {hangMuc.modelType ? (
                     <div className="w-full h-full relative">
                        <DuctModel3D type={hangMuc.modelType} />
                        <div className="absolute bottom-4 right-4 bg-zinc-900/5 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-widest pointer-events-none">
                          Mô hình 3D tương tác
                        </div>
                     </div>
                   ) : (
                     <>
                       <img
                         src={hangMuc.imageUrl}
                         alt={hangMuc.title}
                         loading="lazy"
                         decoding="async"
                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                       />
                       <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                     </>
                   )}
                </div>

                {/* Nội dung mô tả */}
                <div className="space-y-8 lg:py-6">
                  <div>
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-zinc-900 mb-4 tracking-tight">{hangMuc.title}</h2>
                    <p className="text-zinc-600 text-lg leading-relaxed font-normal">{hangMuc.description}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 p-6 rounded-[1.5rem] bg-white border border-zinc-200 shadow-sm">
                    {hangMuc.specs.map((chiTiet) => (
                      <div key={chiTiet} className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 bg-zinc-900 shrink-0 rounded-full" />
                        <span className="text-sm font-semibold text-zinc-700">{chiTiet}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <Link to="/lien-he">
                      <Button size="lg" className="rounded-full uppercase tracking-[0.2em] font-bold text-[10px] px-12 h-14 shadow-lg hover:shadow-zinc-200 transition-all">
                        Yêu cầu sản xuất
                      </Button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cam kết chất lượng */}
      <section className="py-24 md:py-32 border-t border-zinc-200 bg-zinc-900 text-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-20 items-center">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-8">
                  Tiêu chuẩn kỹ thuật <br className="hidden sm:block" /> minh bạch & tin cậy.
                </h2>
                <div className="space-y-8">
                  <div className="relative pl-6 border-l-2 border-zinc-700">
                    <h3 className="text-xl font-bold mb-2">Đo đạc & Nghiệm thu thực tế</h3>
                    <p className="text-base text-zinc-400 leading-relaxed">Chúng tôi sử dụng thiết bị đo chuyên dụng để kiểm tra lưu lượng và áp suất ngay tại công trình trước khi bàn giao.</p>
                  </div>
                  <div className="relative pl-6 border-l-2 border-zinc-700">
                    <h3 className="text-xl font-bold mb-2">Vận hành êm ái, bền bỉ</h3>
                    <p className="text-base text-zinc-400 leading-relaxed">Mọi quạt công nghiệp đều được kiểm tra cân bằng động nghiêm ngặt, giúp bảo vệ động cơ và giảm thiểu tiếng ồn.</p>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="hidden md:block">
               <motion.div 
                 initial={{ opacity: 0, scale: 0.98 }}
                 whileInView={{ opacity: 1, scale: 1 }}
                 viewport={{ once: true }}
                 transition={{ duration: 0.5 }}
                 className="rounded-[2.5rem] border border-zinc-700 bg-zinc-800/50 p-8 shadow-2xl backdrop-blur-sm"
               >
                 <div className="grid grid-cols-2 gap-4">
                    <div className="h-32 rounded-[1.5rem] bg-zinc-900/50 flex flex-col items-center justify-center border border-zinc-700/50">
                       <span className="text-white font-black text-xl mb-1">Pass 100%</span>
                       <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Kiểm định tại xưởng</span>
                    </div>
                    <div className="h-32 rounded-[1.5rem] bg-zinc-900/50 flex flex-col items-center justify-center border border-zinc-700/50">
                       <span className="text-white font-black text-xl mb-1">SMACNA</span>
                       <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Tiêu chuẩn ống gió</span>
                    </div>
                    <div className="h-32 rounded-[1.5rem] bg-zinc-900/50 flex flex-col items-center justify-center border border-zinc-700/50">
                       <span className="text-white font-black text-xl mb-1">IE3 / IE4</span>
                       <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Động cơ tiết kiệm</span>
                    </div>
                    <div className="h-32 rounded-[1.5rem] bg-zinc-900/50 flex flex-col items-center justify-center border border-zinc-700/50">
                       <span className="text-white font-black text-xl mb-1">12 Tháng</span>
                       <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider">Bảo hành kỹ thuật</span>
                    </div>
                 </div>
               </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
