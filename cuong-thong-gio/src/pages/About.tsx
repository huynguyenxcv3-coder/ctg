import { SEO, makeBreadcrumbSchema } from '../components/SEO';

export function About() {
  const breadcrumb = makeBreadcrumbSchema([
    { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
    { name: 'Giới thiệu', url: 'https://cuongthonggio.com/gioi-thieu' }
  ]);

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Giới thiệu Cường Thông Gió",
    "description": "Công ty TNHH MTV Cường Thông Gió — 13+ năm kinh nghiệm sản xuất quạt công nghiệp, thi công hệ thống thông gió tại Đà Nẵng.",
    "url": "https://cuongthonggio.com/gioi-thieu",
    "mainEntity": {
      "@type": "Organization",
      "name": "Cường Thông Gió",
      "foundingDate": "2015",
      "foundingLocation": "Đà Nẵng, Việt Nam",
      "numberOfEmployees": { "@type": "QuantitativeValue", "minValue": 20 },
      "areaServed": [
        { "@type": "City", "name": "Đà Nẵng" },
        { "@type": "AdministrativeArea", "name": "Liên Chiểu, Đà Nẵng" },
        { "@type": "AdministrativeArea", "name": "Hải Châu, Đà Nẵng" },
        { "@type": "AdministrativeArea", "name": "Thanh Khê, Đà Nẵng" },
        { "@type": "AdministrativeArea", "name": "Sơn Trà, Đà Nẵng" },
        { "@type": "AdministrativeArea", "name": "Ngũ Hành Sơn, Đà Nẵng" },
        { "@type": "AdministrativeArea", "name": "Cẩm Lệ, Đà Nẵng" },
        { "@type": "AdministrativeArea", "name": "Hòa Vang, Đà Nẵng" },
        { "@type": "AdministrativeArea", "name": "KCN Hòa Khánh" },
        { "@type": "AdministrativeArea", "name": "KCN An Đồn" },
        { "@type": "AdministrativeArea", "name": "KCN Hòa Cầm" },
        { "@type": "AdministrativeArea", "name": "KCN Điện Nam - Điện Ngọc" },
        { "@type": "AdministrativeArea", "name": "KCN Thọ Quang" },
        { "@type": "State", "name": "Miền Trung, Việt Nam" }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-20 px-6">
      <SEO
        title="Giới Thiệu — Nhà Thầu M&E Uy Tín Đà Nẵng"
        description="Công ty TNHH MTV Cường Thông Gió — 13+ năm kinh nghiệm, 2000+ dự án hoàn thành. Chuyên sản xuất quạt công nghiệp, thi công hệ thống thông gió & xử lý khí thải tại Đà Nẵng, Liên Chiểu, Hải Châu, Sơn Trà, Cẩm Lệ và các KCN Miền Trung."
        keywords="giới thiệu Cường Thông Gió, công ty thông gió Đà Nẵng, nhà thầu M&E, quạt công nghiệp, thông gió công nghiệp, thông gió Liên Chiểu, quạt công nghiệp Hải Châu, KCN Hòa Khánh, KCN An Đồn, KCN Hòa Cầm, thông gió Sơn Trà, xử lý khí thải Cẩm Lệ"
        structuredData={[breadcrumb, aboutSchema]}
      />

      <div className="max-w-[1200px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 px-4">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
            VỀ CHÚNG TÔI
          </p>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Từ xưởng gia công cơ khí <br className="hidden md:block" /> đến nhà thầu M&E uy tín.
          </h1>
          <p className="text-gray-600 text-lg max-w-[600px] mx-auto leading-relaxed">
            Công ty TNHH Một Thành Viên Cường Thông Gió (CTGCo., Ltd) là doanh nghiệp hoạt động chuyên sâu trong lĩnh vực cơ điện lạnh, điều hòa không khí và thông gió.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-[0_2px_30px_rgba(0,0,0,0.04)] p-12 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column - Intro & History */}
            <div className="lg:col-span-7">
              <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-400 mb-12">
                SỨ MỆNH & PHÁT TRIỂN
              </h2>

              <div className="space-y-12">
                <div className="space-y-8">
                  <p className="text-zinc-900 leading-relaxed font-medium text-xl md:text-2xl tracking-tight">
                    Được thành lập từ năm 2015 tại Đà Nẵng, Cường Thông Gió đã khẳng định vị thế là đơn vị tiên phong trong lĩnh vực sản xuất & thi công hệ thống thông gió công nghiệp.
                  </p>
                  <p className="text-zinc-500 leading-relaxed text-lg opacity-90">
                    Chúng tôi không chỉ cung cấp thiết bị, mà còn mang đến giải pháp kỹ thuật tối ưu. Với xưởng sản xuất trực tiếp và đội ngũ kỹ thuật lành nghề, mỗi sản phẩm rời xưởng đều mang theo cam kết về chất lượng và độ bền vượt thời gian.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-12 py-8 border-y border-zinc-100">
                  <div>
                    <div className="text-4xl md:text-5xl font-black text-zinc-900 leading-none mb-3 tracking-tighter">13+</div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Năm kinh nghiệm</div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-black text-zinc-900 leading-none mb-3 tracking-tighter">2,145</div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Dự án hoàn thành</div>
                  </div>
                </div>

                <div className="relative">
                  <div className="aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl shadow-zinc-200 border border-zinc-100">
                    <img 
                      src="/thi-cong-ong-gio.png" 
                      alt="Đội ngũ kỹ thuật Cường Thông Gió thi công hệ thống ống gió tại công trình" 
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Values */}
            <div className="lg:col-span-5">
              <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-400 mb-12">
                GIÁ TRỊ CỐT LÕI
              </h2>

              <div className="space-y-12">
                {/* Value 1 */}
                <div className="group">
                  <div className="flex items-baseline gap-6 mb-4">
                    <span className="text-sm font-black text-zinc-100 group-hover:text-zinc-900 transition-colors duration-300 italic">01.</span>
                    <h3 className="font-bold text-zinc-900 text-lg uppercase tracking-wider">Vật tư đúng tiêu chuẩn</h3>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed pl-12 border-l border-zinc-100 group-hover:border-zinc-900 transition-colors duration-500">
                    Cam kết sử dụng đúng chủng loại vật tư, độ dày tôn và công suất động cơ như đã thỏa thuận. Minh bạch hoàn toàn về nguồn gốc và chất lượng (CO/CQ).
                  </p>
                </div>

                {/* Value 2 */}
                <div className="group">
                  <div className="flex items-baseline gap-6 mb-4">
                    <span className="text-sm font-black text-zinc-100 group-hover:text-zinc-900 transition-colors duration-300 italic">02.</span>
                    <h3 className="font-bold text-zinc-900 text-lg uppercase tracking-wider">Trách nhiệm cao nhất</h3>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed pl-12 border-l border-zinc-100 group-hover:border-zinc-900 transition-colors duration-500">
                    Luôn bám sát công trình, xử lý triệt để các vấn đề kỹ thuật phát sinh. Hệ thống chỉ được bàn giao khi vận hành êm ái và đạt chuẩn yêu cầu của khách hàng.
                  </p>
                </div>

                {/* Value 3 */}
                <div className="group">
                  <div className="flex items-baseline gap-6 mb-4">
                    <span className="text-sm font-black text-zinc-100 group-hover:text-zinc-900 transition-colors duration-300 italic">03.</span>
                    <h3 className="font-bold text-zinc-900 text-lg uppercase tracking-wider">Báo giá minh bạch</h3>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed pl-12 border-l border-zinc-100 group-hover:border-zinc-900 transition-colors duration-500">
                    Quy trình báo giá rõ ràng, không phát sinh chi phí ngoài kế hoạch. Chúng tôi tư vấn giải pháp tối ưu nhất dựa trên nhu cầu thực tế của từng dự án.
                  </p>
                </div>

                {/* Value 4 */}
                <div className="group">
                  <div className="flex items-baseline gap-6 mb-4">
                    <span className="text-sm font-black text-zinc-100 group-hover:text-zinc-900 transition-colors duration-300 italic">04.</span>
                    <h3 className="font-bold text-zinc-900 text-lg uppercase tracking-wider">Đội ngũ tận tâm</h3>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed pl-12 border-l border-zinc-100 group-hover:border-zinc-900 transition-colors duration-500">
                    Đội ngũ kỹ sư và thợ cơ khí tay nghề cao, am hiểu sâu sắc về kỹ thuật thông gió, luôn sẵn sàng đồng hành cùng khách hàng trong mọi giai đoạn.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
