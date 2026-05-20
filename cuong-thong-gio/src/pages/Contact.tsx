import { Mail, Phone, MapPin } from 'lucide-react';

export function Contact() {
  return (
    <div className="min-h-screen bg-[#f8f9fa] py-20 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">
            LIÊN HỆ CHÚNG TÔI
          </p>
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Tư vấn giải pháp kỹ thuật chuyên sâu.
          </h1>
          <p className="text-gray-600 text-lg max-w-[600px] mx-auto leading-relaxed">
            Cung cấp thông tin sơ bộ về dự án để nhận báo giá chi tiết và phương án thiết kế từ đội ngũ kỹ sư Cường Thông Gió.
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.08)] p-14 border border-gray-100">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Left Column - Contact Information */}
            <div>
              <h2 className="text-xs uppercase font-bold tracking-wider text-gray-500 mb-10">
                THÔNG TIN LIÊN HỆ
              </h2>

              <div className="space-y-7">
                {/* Location */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center bg-white">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-gray-900 mb-2 text-base">Trụ sở chính</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      101 Trần Quý Khoách, P. Hoà Minh, Q. Liên Chiểu, TP. Đà Nẵng
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center bg-white">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-gray-900 mb-2 text-base">Điện thoại</h3>
                    <p className="text-gray-600 text-sm">0905 001 224</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full border border-gray-200 flex items-center justify-center bg-white">
                    <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-gray-900 mb-2 text-base">Email</h3>
                    <p className="text-gray-600 text-sm">phantrongcuong77@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form Section */}
            <div>
              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                {/* Full Name */}
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-gray-700 mb-3">
                    HỌ VÀ TÊN *
                  </label>
                  <input
                    type="text"
                    placeholder="Tên của bạn..."
                    className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent placeholder:text-gray-400"
                    required
                  />
                </div>

                {/* Phone and Email Row */}
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-gray-700 mb-3">
                      SỐ ĐIỆN THOẠI *
                    </label>
                    <input
                      type="tel"
                      placeholder="0905..."
                      className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent placeholder:text-gray-400"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase font-bold tracking-wider text-gray-700 mb-3">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      placeholder="email@vidu.com"
                      className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent placeholder:text-gray-400"
                    />
                  </div>
                </div>

                {/* Technical Requirements */}
                <div>
                  <label className="block text-xs uppercase font-bold tracking-wider text-gray-700 mb-3">
                    YÊU CẦU KỸ THUẬT *
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Diện tích xưởng, quy mô, loại quạt..."
                    className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent placeholder:text-gray-400 resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-[#1a1a1a] text-white uppercase py-4 rounded-full hover:bg-black transition-all duration-200 font-semibold tracking-widest text-sm mt-2 shadow-lg"
                >
                  GỬI YÊU CẦU TƯ VẤN
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

