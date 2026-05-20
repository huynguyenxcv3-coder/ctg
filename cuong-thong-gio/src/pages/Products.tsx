import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ChevronRight, Check } from 'lucide-react';

const solutions = [
  {
    title: 'Quạt Công Nghiệp Hiệu Suất Cao',
    badge: 'Sản xuất & Lắp đặt',
    desc: 'Chúng tôi trực tiếp gia công và lắp đặt các dòng quạt ly tâm, hướng trục và quạt thông gió mái. Sản phẩm sử dụng động cơ dây đồng tiêu chuẩn, cánh quạt được cân bằng động kỹ thuật số đảm bảo vận hành êm ái, bền bỉ và không rung lắc.',
    specs: [
      'Công suất: 1.1kW - 200kW',
      'Lưu lượng: lên đến 150.000 m³/h',
      'Áp suất cao, hiệu suất tối ưu',
      'Vật liệu: Thép CT3 hoặc Inox 304'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
    isReversed: false
  },
  {
    title: 'Gia Công Ống Gió & Phụ Kiện',
    badge: 'Cơ khí chính xác',
    desc: 'Sở hữu dây chuyền cắt Plasma CNC hiện đại, chúng tôi sản xuất ống gió vuông, tròn xoắn theo tiêu chuẩn quốc tế (SMACNA). Ngoài ra, chúng tôi cung cấp đầy đủ phụ kiện như van VCD, FD và cửa gió nhôm định hình cao cấp.',
    specs: [
      'Tôn mạ kẽm độ dày 0.48 - 1.15mm',
      'Cửa gió nhôm sơn tĩnh điện',
      'Sản xuất nhanh, chính xác',
      'Kết nối kín khít, giảm tổn thất áp suất'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=1200&auto=format&fit=crop',
    isReversed: true
  },
  {
    title: 'Hệ Thống Xử Lý Bụi & Khí Thải',
    badge: 'Giải pháp môi trường',
    desc: 'Thiết kế và thi công hệ thống lọc bụi túi vải với công nghệ giũ bụi khí nén tự động. Đối với các khu vực phát sinh mùi hóa chất, chúng tôi cung cấp giải pháp tháp hấp thụ sử dụng than hoạt tính chuyên dụng.',
    specs: [
      'Hiệu quả lọc bụi > 99%',
      'Túi lọc chống ẩm, chịu nhiệt',
      'Hệ thống điều khiển PLC thông minh',
      'Đạt quy chuẩn xả thải môi trường'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=1200&auto=format&fit=crop',
    isReversed: false
  }
];

const standards = [
  { label: 'Pass 100%', sub: 'KIỂM ĐỊNH TẠI XƯỞNG' },
  { label: 'SMACNA', sub: 'TIÊU CHUẨN ỐNG GIÓ' },
  { label: 'IE3 / IE4', sub: 'ĐỘNG CƠ TIẾT KIỆM' },
  { label: '12 Tháng', sub: 'BẢO HÀNH KỸ THUẬT' }
];

export function Products() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="pt-40 pb-20 border-b border-zinc-100">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1 bg-zinc-900 text-white text-[10px] font-black uppercase tracking-[0.3em] rounded-full mb-8">
              Sản phẩm & Giải pháp
            </span>
            <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-zinc-900 mb-8 max-w-4xl leading-[1.1]">
              Sản xuất trực tiếp, <br className="hidden md:block" />
              kiểm soát chất lượng tuyệt đối.
            </h1>
            <p className="text-zinc-500 text-lg md:text-xl max-w-3xl leading-relaxed">
              Cường Thông Gió tự hào sở hữu xưởng gia công quy mô tại Đà Nẵng, giúp chúng tôi chủ động hoàn toàn về tiến độ và cam kết tiêu chuẩn kỹ thuật khắt khe nhất cho mọi dự án.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solutions Showcase */}
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 space-y-32 md:space-y-48">
          {solutions.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`flex flex-col ${item.isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20`}
            >
              {/* Image/3D Placeholder */}
              <div className="w-full md:w-1/2">
                <div className="aspect-[4/3] bg-zinc-50 rounded-[2.5rem] overflow-hidden relative group border border-zinc-100 shadow-2xl shadow-zinc-200">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/5" />
                  <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur px-4 py-2 rounded-lg text-[10px] font-bold text-zinc-400 uppercase tracking-widest border border-zinc-200">
                    Mô hình 3D tương tác
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="w-full md:w-1/2">
                <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-8 leading-tight">
                  {item.title}
                </h2>
                <p className="text-zinc-500 text-base md:text-lg mb-10 leading-relaxed font-normal opacity-90">
                  {item.desc}
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8 mb-12 bg-white/50 backdrop-blur rounded-2xl p-6 border border-zinc-100">
                  {item.specs.map((spec) => (
                    <div key={spec} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                      <span className="text-sm font-semibold text-zinc-700">{spec}</span>
                    </div>
                  ))}
                </div>

                <Button asChild size="lg" className="rounded-full px-10 h-16 bg-zinc-900 hover:bg-zinc-800 text-white font-bold uppercase tracking-widest transition-all">
                  <Link to="/lien-he">Yêu cầu sản xuất</Link>
                </Button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Technical Standards Section */}
      <section className="bg-zinc-950 py-24 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.03),transparent)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 md:gap-24">
            <div className="w-full lg:w-1/2">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight leading-[1.1]">
                Tiêu chuẩn kỹ thuật <br />
                <span className="text-zinc-400 font-medium">minh bạch & tin cậy.</span>
              </h2>
              <div className="space-y-8">
                <div>
                  <h4 className="text-white text-lg font-bold mb-3 flex items-center gap-3">
                    <div className="w-2 h-2 bg-industrial-blue rounded-full" />
                    Đo đạc & Nghiệm thu thực tế
                  </h4>
                  <p className="text-zinc-500 leading-relaxed">
                    Chúng tôi sử dụng thiết bị đo chuyên dụng để kiểm tra lưu lượng và áp suất ngay tại công trình trước khi bàn giao.
                  </p>
                </div>
                <div>
                  <h4 className="text-white text-lg font-bold mb-3 flex items-center gap-3">
                    <div className="w-2 h-2 bg-industrial-blue rounded-full" />
                    Vận hành êm ái, bền bỉ
                  </h4>
                  <p className="text-zinc-500 leading-relaxed">
                    Mọi quạt công nghiệp đều được kiểm tra cân bằng động nghiêm ngặt, giúp bảo vệ động cơ và giảm thiểu tiếng ồn.
                  </p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 grid grid-cols-2 gap-4 md:gap-6">
              {standards.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12 text-center flex flex-col justify-center items-center hover:bg-white/10 transition-colors group"
                >
                  <div className="text-2xl md:text-3xl font-black text-white mb-2 group-hover:scale-110 transition-transform">{item.label}</div>
                  <div className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{item.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 mb-10 tracking-tight leading-tight italic">
            Bạn cần tư vấn giải pháp tối ưu cho công trình?
          </h2>
          <Button asChild size="lg" className="rounded-full px-16 h-20 bg-zinc-900 border-none hover:bg-zinc-800 text-white text-lg font-bold uppercase tracking-[0.2em] shadow-2xl shadow-zinc-300">
            <Link to="/lien-he">Nhận báo giá ngay</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
