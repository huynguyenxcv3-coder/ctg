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
      ,"founder": {
        "@type": "Person",
        "name": "Phan Trọng Cường",
        "jobTitle": "Giám đốc — Kỹ sư Cơ khí Thông gió",
        "knowsAbout": ["Quạt công nghiệp", "Hệ thống HVAC", "Thông gió PCCC", "Xử lý khí thải"],
        "worksFor": {
          "@type": "Organization",
          "name": "Cường Thông Gió"
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-20 px-6">
      <SEO
        title="Giới Thiệu — Nhà Thầu M&E Uy Tín Đà Nẵng"
        description="Công ty TNHH MTV Cường Thông Gió — 13+ năm kinh nghiệm, 2000+ dự án hoàn thành. Chuyên sản xuất quạt công nghiệp, thi công hệ thống thông gió & xử lý khí thải tại Đà Nẵng, Liên Chiểu, Hải Châu, Sơn Trà, Cẩm Lệ và các KCN Miền Trung."
        keywords="giới thiệu Cường Thông Gió, công ty thông gió Đà Nẵng, nhà thầu M&E, quạt công nghiệp, thông gió công nghiệp, thông gió Liên Chiểu, quạt công nghiệp Hải Châu, KCN Hòa Khánh, KCN An Đồn, KCN Hòa Cầm, thông gió Sơn Trà, xử lý khí thải Cẩm Lệ"
        structuredData={[breadcrumb, aboutSchema]}
        dateModified="2026-06-04"
      />

      <div className="max-w-[1200px] mx-auto">
        {/* Breadcrumb — SEO Navigation */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex items-center gap-2 text-xs text-zinc-400 font-medium" itemScope itemType="https://schema.org/BreadcrumbList">
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <a href="/" itemProp="item" className="hover:text-zinc-900 transition-colors">
                <span itemProp="name">Trang chủ</span>
              </a>
              <meta itemProp="position" content="1" />
            </li>
            <li className="text-zinc-300">/</li>
            <li itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
              <span itemProp="name" className="text-zinc-900 font-bold">Giới thiệu</span>
              <meta itemProp="position" content="2" />
            </li>
          </ol>
        </nav>

        {/* Header Section */}
        <div className="text-center mb-16 px-4">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
            VỀ CHÚNG TÔI
          </p>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Cường Thông Gió — tầm nhìn, sứ mệnh <br className="hidden md:block" /> và đội ngũ
          </h1>
          <p className="text-gray-600 text-lg max-w-[800px] mx-auto leading-relaxed">
            <strong>Chúng tôi là đơn vị chuyên sản xuất quạt công nghiệp và thi công hệ thống thông gió chuyên nghiệp tại Đà Nẵng, hoạt động từ năm 2015 với hơn 2,145 dự án hoàn thành.</strong> Công ty TNHH Một Thành Viên Cường Thông Gió (CTGCo., Ltd) tự hào là đối tác tin cậy của các nhà thầu M&E và doanh nghiệp tại khu vực Miền Trung.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-[0_2px_30px_rgba(0,0,0,0.04)] p-12 md:p-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Left Column - Intro & History */}
            <div className="lg:col-span-7">
              <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-400 mb-12">
                LỊCH SỬ & NĂNG LỰC
              </h2>

              <div className="space-y-12">
                <div className="space-y-8">
                  <p className="text-zinc-900 leading-relaxed font-medium text-xl md:text-2xl tracking-tight">
                    Được thành lập từ năm 2015 tại Đà Nẵng, chúng tôi đã không ngừng mở rộng quy mô sản xuất và khẳng định năng lực trong các dự án thông gió công nghiệp quy mô lớn.
                  </p>
                  <p className="text-zinc-500 leading-relaxed text-lg opacity-90">
                    Chúng tôi cung cấp giải pháp tổng thể từ tư vấn thiết kế đến trực tiếp sản xuất và lắp đặt. Với xưởng sản xuất hiện đại, chúng tôi kiểm soát chặt chẽ mọi công đoạn từ gia công cơ khí đến cân bằng động thiết bị, đảm bảo chất lượng cao nhất cho khách hàng.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-12 py-8 border-y border-zinc-100">
                  <div>
                    <div className="text-4xl md:text-5xl font-black text-zinc-900 leading-none mb-3 tracking-tighter">13+</div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Năm trong nghề</div>
                  </div>
                  <div>
                    <div className="text-4xl md:text-5xl font-black text-zinc-900 leading-none mb-3 tracking-tighter">2,145</div>
                    <div className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Công trình đã làm</div>
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
                    Chúng tôi cam kết sử dụng vật tư đúng quy cách và cung cấp đầy đủ chứng chỉ CO/CQ theo yêu cầu của dự án.
                  </p>
                </div>

                {/* Value 2 */}
                <div className="group">
                  <div className="flex items-baseline gap-6 mb-4">
                    <span className="text-sm font-black text-zinc-100 group-hover:text-zinc-900 transition-colors duration-300 italic">02.</span>
                    <h3 className="font-bold text-zinc-900 text-lg uppercase tracking-wider">Trách nhiệm cao nhất</h3>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed pl-12 border-l border-zinc-100 group-hover:border-zinc-900 transition-colors duration-500">
                    Đội ngũ của chúng tôi luôn đồng hành cùng công trình cho đến khi hệ thống vận hành ổn định và khách hàng hoàn toàn hài lòng.
                  </p>
                </div>

                {/* Value 3 */}
                <div className="group">
                  <div className="flex items-baseline gap-6 mb-4">
                    <span className="text-sm font-black text-zinc-100 group-hover:text-zinc-900 transition-colors duration-300 italic">03.</span>
                    <h3 className="font-bold text-zinc-900 text-lg uppercase tracking-wider">Báo giá minh bạch</h3>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed pl-12 border-l border-zinc-100 group-hover:border-zinc-900 transition-colors duration-500">
                    Chúng tôi cung cấp giải pháp tối ưu về chi phí với báo giá chi tiết, không phát sinh chi phí ngoài dự kiến.
                  </p>
                </div>

                {/* Value 4 */}
                <div className="group">
                  <div className="flex items-baseline gap-6 mb-4">
                    <span className="text-sm font-black text-zinc-100 group-hover:text-zinc-900 transition-colors duration-300 italic">04.</span>
                    <h3 className="font-bold text-zinc-900 text-lg uppercase tracking-wider">Đội ngũ tận tâm</h3>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed pl-12 border-l border-zinc-100 group-hover:border-zinc-900 transition-colors duration-500">
                    Đội ngũ kỹ sư và thợ lành nghề của chúng tôi am hiểu sâu sắc về kỹ thuật, luôn sẵn sàng hỗ trợ khách hàng từ khâu khảo sát đến nghiệm thu.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Founder Profile — E-E-A-T */}
        <section className="mt-12 bg-white rounded-2xl shadow-[0_2px_30px_rgba(0,0,0,0.04)] p-12 md:p-16" itemScope itemType="https://schema.org/Person">
          <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-400 mb-12">
            NGƯỜI SÁNG LẬP
          </h2>
          <div className="flex flex-col md:flex-row gap-10 items-start">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-zinc-900 flex items-center justify-center text-white text-3xl md:text-4xl font-bold shrink-0">
              C
            </div>
            <div className="flex-1">
              <h3 className="text-2xl md:text-3xl font-bold text-zinc-900 mb-2 tracking-tight" itemProp="name">Phan Trọng Cường</h3>
              <p className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-6" itemProp="jobTitle">Giám đốc — Kỹ sư Cơ khí Thông gió</p>
              <div className="space-y-4 text-zinc-600 leading-relaxed">
                <p>Với <strong>hơn 13 năm</strong> kinh nghiệm, ông Phan Trọng Cường đã trực tiếp điều hành khảo sát, thiết kế và giám sát thi công hệ thống thông gió cho hàng nghìn dự án công nghiệp trọng điểm.</p>
                <p>Dưới sự dẫn dắt của ông, Cường Thông Gió đã hoàn thành hơn <strong>2.145 công trình</strong> tại Đà Nẵng và các tỉnh Miền Trung, khẳng định vị thế uy tín trên thị trường cơ điện lạnh.</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {['Cơ khí chế tạo', 'Hệ thống HVAC', 'Thông gió PCCC', 'Quạt công nghiệp', 'Xử lý khí thải'].map(skill => (
                  <span key={skill} className="px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-full text-xs font-bold text-zinc-500 uppercase tracking-wider">{skill}</span>
                ))}
              </div>
              <meta itemProp="url" content="https://cuongthonggio.com/gioi-thieu" />
              <meta itemProp="worksFor" content="Cường Thông Gió" />
            </div>
          </div>
        </section>

        {/* Liên kết liên quan — Internal Linking */}
        <section className="mt-12 bg-white rounded-2xl shadow-[0_2px_30px_rgba(0,0,0,0.04)] p-12 md:p-16" aria-label="Khám phá thêm">
          <h2 className="text-[10px] uppercase font-bold tracking-[0.3em] text-zinc-400 mb-8">KHÁM PHÁ THÊM</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <a href="/san-pham" className="group p-6 bg-zinc-50 rounded-2xl border border-zinc-100 hover:bg-white hover:shadow-lg transition-all duration-300">

              <h3 className="text-base font-bold text-zinc-900 mb-2 group-hover:text-zinc-700">Sản phẩm</h3>
              <p className="text-sm text-zinc-500">Xem danh mục quạt công nghiệp, ống gió và phụ kiện →</p>
            </a>
            <a href="/kien-thuc" className="group p-6 bg-zinc-50 rounded-2xl border border-zinc-100 hover:bg-white hover:shadow-lg transition-all duration-300">

              <h3 className="text-base font-bold text-zinc-900 mb-2 group-hover:text-zinc-700">Kiến thức</h3>
              <p className="text-sm text-zinc-500">Hướng dẫn chọn quạt, bảng giá và tiêu chuẩn PCCC →</p>
            </a>
            <a href="/lien-he" className="group p-6 bg-zinc-50 rounded-2xl border border-zinc-100 hover:bg-white hover:shadow-lg transition-all duration-300">

              <h3 className="text-base font-bold text-zinc-900 mb-2 group-hover:text-zinc-700">Liên hệ</h3>
              <p className="text-sm text-zinc-500">Nhận báo giá miễn phí trong 24h →</p>
            </a>
          </div>
        </section>

        {/* CTA Section — Tăng chuyển đổi */}
        <div className="mt-12 bg-zinc-900 rounded-2xl p-12 md:p-16 text-center">
          <h2 className="text-2xl md:text-4xl font-bold text-white mb-6 tracking-tight">
            Cần tư vấn thông gió cho dự án?
          </h2>
          <p className="text-zinc-400 mb-10 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
            Đội ngũ kỹ sư của chúng tôi sẵn sàng khảo sát thực tế và cung cấp phương án thi công tối ưu cùng báo giá miễn phí cho dự án của bạn.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/lien-he" className="bg-white text-zinc-900 px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-zinc-100 transition-colors shadow-lg">
              Nhận báo giá miễn phí
            </a>
            <a href="tel:0905001224" className="border-2 border-zinc-700 text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:border-white transition-colors">
              Gọi ngay: 0905 001 224
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
