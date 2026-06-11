import { useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SEO, makeBreadcrumbSchema, makeProductSchema, makeFAQSchema } from '../components/SEO';

type Solution = {
  title: string;
  badge: string;
  desc: string;
  specs: string[];
  isReversed: boolean;
  imageUrl?: string;
  images?: string[];
};

const solutions: Solution[] = [
  {
    title: 'Quạt Ly Tâm Công Nghiệp',
    badge: 'Sản xuất & Lắp đặt',
    desc: 'Quạt ly tâm được chúng tôi trực tiếp gia công với vỏ thép dày, cánh quạt cân bằng động kỹ thuật số. Phù hợp cho hệ thống hút bụi, thông gió áp suất cao, lò hơi và các công trình công nghiệp nặng.',
    specs: [
      'Công suất: 1.5kW - 200kW',
      'Áp suất tĩnh: lên đến 3.000 Pa',
      'Cánh cân bằng động, vận hành êm',
      'Vật liệu: Thép CT3, sơn tĩnh điện'
    ],
    imageUrl: '/quat-ly-tam.png',
    isReversed: false
  },
  {
    title: 'Quạt Hướng Trục Công Nghiệp',
    badge: 'Sản xuất & Lắp đặt',
    desc: 'Chúng tôi trực tiếp gia công và lắp đặt các dòng quạt hướng trục công nghiệp. Sản phẩm sử dụng động cơ dây đồng tiêu chuẩn, cánh quạt được cân bằng động kỹ thuật số đảm bảo vận hành êm ái, bền bỉ và không rung lắc. Phù hợp cho nhà xưởng, hầm, khu công nghiệp.',
    specs: [
      'Công suất: 1.1kW - 200kW',
      'Lưu lượng: lên đến 150.000 m³/h',
      'Áp suất cao, hiệu suất tối ưu',
      'Vật liệu: Thép CT3 hoặc Inox 304'
    ],
    imageUrl: '/quat-huong-truc.png',
    isReversed: true
  },
  {
    title: 'Máy Điều Hoà Cassette',
    badge: 'Cung cấp & Lắp đặt',
    desc: 'Cung cấp và lắp đặt máy điều hoà dạng cassette âm trần cho văn phòng, trung tâm thương mại, nhà hàng và khu công nghiệp. Phân phối từ các hãng uy tín, đảm bảo hiệu suất làm lạnh tối ưu và tiết kiệm điện năng.',
    specs: [
      'Công suất: 1.5HP - 5HP',
      'Gas R32 / R410A tiết kiệm năng lượng',
      'Phân phối gió 4 chiều đồng đều',
      'Inverter - Tiết kiệm điện đến 40%'
    ],
    imageUrl: '/may-dieu-hoa-cassette.png',
    isReversed: false
  },
  {
    title: 'Miệng Gió 4 Hướng',
    badge: 'Phụ kiện & Phân phối',
    desc: 'Cung cấp miệng gió 4 hướng dạng âm trần, phân phối luồng không khí đều theo 4 chiều. Sản phẩm làm từ nhôm sơn tĩnh điện trắng, tương thích với hệ thống điều hoà trung tâm và thông gió dân dụng, thương mại.',
    specs: [
      'Vật liệu: Nhôm sơn tĩnh điện trắng',
      'Kích thước: 300x300 đến 600x600mm',
      'Phân phối gió đồng đều 4 hướng',
      'Lắp đặt trần thạch cao / trần nhôm'
    ],
    imageUrl: '/mieng-gio-4-huong.png',
    isReversed: true
  },
  {
    title: 'VCD Vuông Trục Vít',
    badge: 'Van điều tiết gió',
    desc: 'Van điều tiết lưu lượng VCD (Volume Control Damper) dạng vuông cơ cấu trục vít, dùng để điều chỉnh và cân bằng lưu lượng gió trong hệ thống ống gió. Sản xuất từ tôn mạ kẽm dày, chịu lực tốt, vận hành bền bỉ.',
    specs: [
      'Vật liệu: Tôn mạ kẽm dày 1.0mm',
      'Kích thước: theo yêu cầu thực tế',
      'Cơ cấu điều chỉnh trục vít chắc chắn',
      'Phù hợp ống gió vuông tiêu chuẩn SMACNA'
    ],
    imageUrl: '/vcd-vuong-truc-vit.png',
    isReversed: false
  },
  {
    title: 'Thi Công Hệ Thống Ống Gió Tại Công Trường',
    badge: 'Thi công trực tiếp',
    desc: 'Đội ngũ kỹ thuật Cường Thông Gió trực tiếp lắp đặt hệ thống ống gió tại công trình nhà máy, kho xưởng và toà nhà thương mại. Ống gió được bọc cách nhiệt đúng tiêu chuẩn, đảm bảo hiệu suất và thẩm mỹ công trình.',
    specs: [
      'Ống gió bọc bông thuỷ tinh cách nhiệt',
      'Lắp đặt theo bản vẽ thiết kế ME',
      'Thi công đúng tiến độ, nghiệm thu thực tế',
      'Phù hợp nhà máy, kho lạnh, toà nhà'
    ],
    images: [
      '/he-thong-ong-gio-cong-truong.png',
      '/ong-gio-cong-truong-1.png',
      '/ong-gio-cong-truong-2.png',
      '/ong-gio-cong-truong-3.png',
      '/ong-gio-cong-truong-4.png',
      '/ong-gio-cong-truong-5.png',
      '/ong-gio-cong-truong-6.png',
    ],
    isReversed: true
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
    imageUrl: '/ong-gio-phu-kien.png',
    isReversed: false
  },
];

const standards = [
  { label: 'Pass 100%', sub: 'KIỂM ĐỊNH TẠI XƯỞNG' },
  { label: 'SMACNA', sub: 'TIÊU CHUẨN ỐNG GIÓ' },
  { label: 'IE3 / IE4', sub: 'ĐỘNG CƠ TIẾT KIỆM' },
  { label: '12 Tháng', sub: 'BẢO HÀNH KỸ THUẬT' }
];

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);

  const prev = useCallback(() =>
    setCurrent(c => (c - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() =>
    setCurrent(c => (c + 1) % images.length), [images.length]);

  return (
    <div className="aspect-[4/3] bg-zinc-50 rounded-[2.5rem] overflow-hidden relative group border border-zinc-100 shadow-2xl shadow-zinc-200">
      {images.map((src, i) => (
        <img
          key={src}
          src={src}
          alt={`${title} — hình ảnh thi công ${i + 1}`}
          loading="lazy"
          decoding="async"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        />
      ))}
      <div className="absolute inset-0 bg-black/5" />

      <button
        onClick={prev}
        aria-label="Ảnh trước"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10"
      >
        <ChevronLeft className="w-5 h-5 text-zinc-800" />
      </button>
      <button
        onClick={next}
        aria-label="Ảnh tiếp theo"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white z-10"
      >
        <ChevronRight className="w-5 h-5 text-zinc-800" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Xem ảnh ${i + 1}`}
            className={`w-2 h-2 rounded-full transition-all ${i === current ? 'bg-white w-5' : 'bg-white/50'}`}
          />
        ))}
      </div>
    </div>
  );
}

const productFaqData = [
  {
    question: 'Quạt ly tâm công nghiệp có công suất tối đa bao nhiêu?',
    answer: 'Quạt ly tâm công nghiệp do Cường Thông Gió sản xuất có công suất từ 1.5kW đến 200kW, áp suất tĩnh lên đến 3.000 Pa, phù hợp cho hệ thống hút bụi, thông gió áp suất cao và lò hơi.'
  },
  {
    question: 'Ống gió được sản xuất theo tiêu chuẩn nào?',
    answer: 'Ống gió tại Cường Thông Gió được sản xuất theo tiêu chuẩn quốc tế SMACNA, sử dụng tôn mạ kẽm dày 0.48 - 1.15mm, cắt bằng máy Plasma CNC đảm bảo chính xác và kín khít.'
  },
  {
    question: 'Cường Thông Gió có lắp đặt máy điều hòa cassette không?',
    answer: 'Có. Chúng tôi cung cấp và lắp đặt máy điều hòa dạng cassette âm trần từ các hãng uy tín, công suất từ 1.5HP đến 5HP, sử dụng gas R32/R410A tiết kiệm năng lượng.'
  },
  {
    question: 'VCD vuông trục vít dùng để làm gì?',
    answer: 'VCD (Volume Control Damper) dạng vuông trục vít dùng để điều chỉnh và cân bằng lưu lượng gió trong hệ thống ống gió. Sản phẩm được sản xuất từ tôn mạ kẽm dày 1.0mm, phù hợp ống gió vuông tiêu chuẩn SMACNA.'
  },
];

export function Products() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const breadcrumb = makeBreadcrumbSchema([
    { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
    { name: 'Sản phẩm', url: 'https://cuongthonggio.com/san-pham' }
  ]);

  const productSchemas = solutions.map(s => makeProductSchema({
    name: s.title,
    description: s.desc,
    image: s.imageUrl,
    category: 'Quạt công nghiệp & Thông gió'
  }));

  const productFAQ = makeFAQSchema([
    {
      question: 'Quạt ly tâm công nghiệp có công suất tối đa bao nhiêu?',
      answer: 'Quạt ly tâm công nghiệp do Cường Thông Gió sản xuất có công suất từ 1.5kW đến 200kW, áp suất tĩnh lên đến 3.000 Pa, phù hợp cho hệ thống hút bụi, thông gió áp suất cao và lò hơi.'
    },
    {
      question: 'Ống gió được sản xuất theo tiêu chuẩn nào?',
      answer: 'Ống gió tại Cường Thông Gió được sản xuất theo tiêu chuẩn quốc tế SMACNA, sử dụng tôn mạ kẽm dày 0.48 - 1.15mm, cắt bằng máy Plasma CNC đảm bảo chính xác và kín khít.'
    },
    {
      question: 'Cường Thông Gió có lắp đặt máy điều hòa cassette không?',
      answer: 'Có. Chúng tôi cung cấp và lắp đặt máy điều hòa dạng cassette âm trần từ các hãng uy tín, công suất từ 1.5HP đến 5HP, sử dụng gas R32/R410A tiết kiệm năng lượng.'
    },
    {
      question: 'VCD vuông trục vít dùng để làm gì?',
      answer: 'VCD (Volume Control Damper) dạng vuông trục vít dùng để điều chỉnh và cân bằng lưu lượng gió trong hệ thống ống gió. Sản phẩm được sản xuất từ tôn mạ kẽm dày 1.0mm, phù hợp ống gió vuông tiêu chuẩn SMACNA.'
    },
  ]);

  return (
    <div className="bg-white">
      <SEO
        title="Sản Phẩm Quạt Công Nghiệp & Ống Gió"
        description="Quạt ly tâm, quạt hướng trục, ống gió, VCD, miệng gió — sản xuất trực tiếp tại xưởng Cường Thông Gió Đà Nẵng. Tiêu chuẩn SMACNA, bảo hành 12 tháng."
        keywords="quạt ly tâm, quạt hướng trục, ống gió, VCD, miệng gió, máy điều hòa cassette, quạt công nghiệp Đà Nẵng, gia công ống gió, thi công thông gió, gia công cơ khí Đà Nẵng, quạt ly tâm Đà Nẵng, quạt hướng trục KCN Hòa Khánh, ống gió SMACNA Đà Nẵng, VCD van điều tiết gió Liên Chiểu, lắp đặt điều hòa cassette Đà Nẵng, quạt hút công nghiệp Sơn Trà"
        structuredData={[breadcrumb, ...productSchemas, productFAQ]}
        dateModified="2026-06-04"
      />

      {/* Breadcrumb — SEO Navigation */}
      <nav aria-label="Breadcrumb" className="pt-24 md:pt-28 pb-0 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ol className="flex items-center gap-2 text-xs text-zinc-400 font-medium" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <Link to="/" itemProp="item" className="hover:text-zinc-900 transition-colors">
                <span itemProp="name">Trang chủ</span>
              </Link>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-zinc-300">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-zinc-900 font-bold">Sản phẩm</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </div>
      </nav>

      <section className="pt-8 pb-20 border-b border-zinc-100" aria-label="Danh sách sản phẩm">
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
              Quạt công nghiệp & ống gió nào <br className="hidden md:block" />
              phù hợp cho nhà xưởng của bạn?
            </h1>
            <p className="text-zinc-500 text-lg md:text-xl max-w-3xl leading-relaxed">
              Chúng tôi tự hào sở hữu xưởng gia công quy mô tại Đà Nẵng, giúp chúng tôi chủ động hoàn toàn về tiến độ và cam kết tiêu chuẩn kỹ thuật khắt khe nhất cho mọi dự án.
            </p>
            <p className="text-zinc-700 text-base md:text-lg font-semibold leading-relaxed max-w-3xl mt-4">
              <strong>Chúng tôi cung cấp quạt ly tâm (1.5–200kW), quạt hướng trục (lưu lượng đến 150.000 m³/h), ống gió SMACNA, VCD, miệng gió và máy điều hòa cassette — tất cả sản xuất trực tiếp tại xưởng Đà Nẵng, bảo hành 12 tháng.</strong>
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-6 space-y-32 md:space-y-48">
          {solutions.map((item, idx) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              className={`flex flex-col ${item.isReversed ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12 md:gap-20`}
            >
              <div className="w-full md:w-1/2">
                {item.images ? (
                  <ImageCarousel images={item.images} title={item.title} />
                ) : (
                  <div className="aspect-[4/3] bg-zinc-50 rounded-[2.5rem] overflow-hidden relative group border border-zinc-100 shadow-2xl shadow-zinc-200">
                    <img
                      src={item.imageUrl}
                      alt={`${item.title} — sản xuất & lắp đặt tại Đà Nẵng | Cường Thông Gió`}
                      loading="lazy"
                      decoding="async"
                      width="600"
                      height="450"
                      className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/5" />
                  </div>
                )}
              </div>

              <div className="w-full md:w-1/2">
                <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 text-[10px] font-black uppercase tracking-[0.2em] rounded-full mb-6">
                  {item.badge}
                </span>
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
            </motion.article>
          ))}
        </div>
      </section>

      {/* Bảng so sánh sản phẩm — GEO structured comparison */}
      <section className="py-16 md:py-24 bg-zinc-50 border-y border-zinc-100" aria-label="So sánh sản phẩm quạt công nghiệp">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-4xl font-bold text-zinc-900 mb-4 tracking-tight text-center">
            So sánh thông số quạt công nghiệp Cường Thông Gió
          </h2>
          <p className="text-zinc-500 text-base md:text-lg text-center mb-10 max-w-2xl mx-auto">
            <strong>Bảng so sánh giúp bạn chọn đúng loại quạt phù hợp với nhu cầu thông gió, hút bụi hoặc PCCC cho nhà xưởng.</strong>
          </p>
          <div className="overflow-x-auto rounded-2xl border border-zinc-200 shadow-sm bg-white">
            <table className="w-full text-sm text-left" data-speakable="true">
              <thead>
                <tr className="bg-zinc-900 text-white">
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Thông số</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Quạt Ly Tâm</th>
                  <th className="px-6 py-4 font-bold uppercase tracking-wider text-xs">Quạt Hướng Trục</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-zinc-900">Công suất</td>
                  <td className="px-6 py-4 text-zinc-600">1.5kW – 200kW</td>
                  <td className="px-6 py-4 text-zinc-600">1.1kW – 200kW</td>
                </tr>
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-zinc-900">Lưu lượng gió</td>
                  <td className="px-6 py-4 text-zinc-600">Trung bình – Cao</td>
                  <td className="px-6 py-4 text-zinc-600">Lên đến 150.000 m³/h</td>
                </tr>
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-zinc-900">Áp suất tĩnh</td>
                  <td className="px-6 py-4 text-zinc-600">Lên đến 3.000 Pa (cao)</td>
                  <td className="px-6 py-4 text-zinc-600">Thấp – Trung bình</td>
                </tr>
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-zinc-900">Ứng dụng chính</td>
                  <td className="px-6 py-4 text-zinc-600">Hút bụi, lò hơi, áp suất cao</td>
                  <td className="px-6 py-4 text-zinc-600">Thông gió nhà xưởng, hầm, PCCC</td>
                </tr>
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-zinc-900">Vật liệu</td>
                  <td className="px-6 py-4 text-zinc-600">Thép CT3, sơn tĩnh điện</td>
                  <td className="px-6 py-4 text-zinc-600">Thép CT3 hoặc Inox 304</td>
                </tr>
                <tr className="hover:bg-zinc-50 transition-colors">
                  <td className="px-6 py-4 font-semibold text-zinc-900">Bảo hành</td>
                  <td className="px-6 py-4 text-zinc-600">12 tháng</td>
                  <td className="px-6 py-4 text-zinc-600">12 tháng</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 py-24 md:py-32 relative overflow-hidden" aria-label="Tiêu chuẩn kỹ thuật">
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

      {/* FAQ Section - Product FAQ */}
      <section className="py-20 md:py-32 bg-zinc-50 relative z-10" aria-label="Câu hỏi thường gặp về sản phẩm" id="faq-san-pham">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-14 md:mb-20">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight"
            >
              Câu hỏi thường gặp về dịch vụ của chúng tôi
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-zinc-500 text-base md:text-lg leading-relaxed"
            >
              Giải đáp các thắc mắc phổ biến về sản phẩm quạt công nghiệp, ống gió và phụ kiện.
            </motion.p>
          </div>

          <div className="space-y-4">
            {productFaqData.map((faq, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-2xl border border-zinc-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                  aria-expanded={openFaq === idx}
                  aria-controls={`product-faq-answer-${idx}`}
                >
                  <h3 className="text-base md:text-lg font-bold text-zinc-900 pr-4 leading-snug">{faq.question}</h3>
                  <svg
                    className={`w-5 h-5 text-zinc-400 transition-transform duration-300 shrink-0 ${openFaq === idx ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div
                  id={`product-faq-answer-${idx}`}
                  className={`overflow-hidden transition-all duration-300 ${openFaq === idx ? 'max-h-96 pb-6 md:pb-8' : 'max-h-0'}`}
                  role="region"
                  aria-labelledby={`product-faq-question-${idx}`}
                >
                  <p className="px-6 md:px-8 text-zinc-500 text-sm md:text-base leading-relaxed">{faq.answer}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bài viết liên quan — Internal Linking */}
      <section className="py-16 md:py-24 bg-white border-t border-zinc-100" aria-label="Bài viết liên quan">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-8 tracking-tight text-center">
            Kiến thức liên quan đến sản phẩm
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Link to="/kien-thuc/chon-quat-cong-nghiep" className="group p-6 bg-zinc-50 rounded-2xl border border-zinc-100 hover:bg-white hover:shadow-lg transition-all duration-300">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Bài viết</span>
              <h3 className="text-lg font-bold text-zinc-900 mt-2 mb-2 group-hover:text-zinc-700 transition-colors">Cách chọn quạt công nghiệp phù hợp cho nhà xưởng</h3>
              <p className="text-sm text-zinc-500">Hướng dẫn chọn quạt ly tâm, hướng trục dựa trên diện tích và yêu cầu kỹ thuật →</p>
            </Link>
            <Link to="/kien-thuc/chi-phi-thi-cong-thong-gio" className="group p-6 bg-zinc-50 rounded-2xl border border-zinc-100 hover:bg-white hover:shadow-lg transition-all duration-300">
              <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Bài viết</span>
              <h3 className="text-lg font-bold text-zinc-900 mt-2 mb-2 group-hover:text-zinc-700 transition-colors">Chi phí thi công hệ thống thông gió 2026</h3>
              <p className="text-sm text-zinc-500">Bảng giá tham khảo cho nhà xưởng 500m² – 5.000m² →</p>
            </Link>
          </div>
        </div>
      </section>

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
