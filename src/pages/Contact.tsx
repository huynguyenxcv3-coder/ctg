import { useState, useRef, useEffect, useCallback } from 'react';
import { SEO, makeBreadcrumbSchema, LOCAL_BUSINESS_SCHEMA } from '../components/SEO';

// Validate SĐT Việt Nam: bắt đầu bằng 0, 10 chữ số
function isValidVNPhone(phone: string): boolean {
  const cleaned = phone.replace(/[\s.-]/g, '');
  return /^0\d{9}$/.test(cleaned);
}

// Validate email
function isValidEmail(email: string): boolean {
  if (!email) return true; // email không bắt buộc
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ==========================================
// Popup Modal Component
// ==========================================
function PopupModal({ 
  isOpen, 
  onClose, 
  type 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  type: 'success' | 'error';
}) {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClose = useCallback(() => {
    setIsAnimating(false);
    setTimeout(() => onClose(), 300); // wait for exit animation
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      // Trigger animation after mount
      requestAnimationFrame(() => setIsAnimating(true));
      // Auto close after 6s for success
      if (type === 'success') {
        const timer = setTimeout(() => handleClose(), 6000);
        return () => clearTimeout(timer);
      }
    }
    return () => {
      // Reset animation state on cleanup (avoids cascading render)
      setIsAnimating(false);
    };
  }, [isOpen, type, handleClose]);

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] flex items-center justify-center px-4 transition-all duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={handleClose}
    >
      {/* Backdrop */}
      <div className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`} />
      
      {/* Modal */}
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transition-all duration-300 ${
          isAnimating ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-4 opacity-0'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          aria-label="Đóng"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {type === 'success' ? (
          <div className="text-center">
            {/* Success Icon */}
            <div className={`mx-auto w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6 transition-all duration-500 ${
              isAnimating ? 'scale-100' : 'scale-0'
            }`}>
              <svg className={`w-10 h-10 text-green-500 transition-all duration-500 delay-200 ${
                isAnimating ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Gửi thành công!</h3>
            <p className="text-gray-500 leading-relaxed">
              Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.
            </p>
            <button
              onClick={handleClose}
              className="mt-6 px-8 py-3 bg-green-500 text-white rounded-xl font-semibold text-sm uppercase tracking-wider hover:bg-green-600 transition-colors"
            >
              Đã hiểu
            </button>
          </div>
        ) : (
          <div className="text-center">
            {/* Error Icon */}
            <div className={`mx-auto w-20 h-20 rounded-full bg-red-50 flex items-center justify-center mb-6 transition-all duration-500 ${
              isAnimating ? 'scale-100' : 'scale-0'
            }`}>
              <svg className={`w-10 h-10 text-red-500 transition-all duration-500 delay-200 ${
                isAnimating ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4.5c-.77-.833-2.694-.833-3.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Gửi không thành công!</h3>
            <p className="text-gray-500 leading-relaxed mb-5">
              Rất tiếc, đã xảy ra lỗi khi gửi yêu cầu. Vui lòng liên hệ trực tiếp qua:
            </p>
            
            {/* Contact alternatives */}
            <div className="space-y-3 mb-6">
              <a
                href="tel:0905001224"
                className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Gọi điện</p>
                  <p className="text-gray-800 font-bold group-hover:text-blue-600 transition-colors">0905 001 224</p>
                </div>
              </a>
              
              <a
                href="https://zalo.me/0905001224"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-blue-600" viewBox="0 0 48 48">
                    <path d="M15,36v-29.173l-1.211,-0.811c-5.149,2.067 -8.789,7.096 -8.789,12.984v10c0,7.732 6.268,14 14,14h10c4.722,0 8.883,-2.348 11.417,-5.931v-1.069z" fill="currentColor" opacity="0.3"></path>
                    <path d="M29,5h-10c-1.845,0 -3.601,0.366 -5.214,1.014c-3.333,3.236 -5.786,8.514 -5.786,12.986c0,6.771 0.936,10.735 3.712,14.607c0.216,0.301 0.357,0.653 0.376,1.022c0.043,0.835 -0.129,2.365 -1.634,3.742c-0.162,0.148 -0.059,0.419 0.16,0.428c0.942,0.041 2.843,-0.014 4.797,-0.877c0.557,-0.246 1.191,-0.203 1.729,0.083c3.313,1.759 7.193,1.995 10.86,1.995c4.676,0 9.339,-1.04 12.417,-2.916c1.621,-2.285 2.583,-5.07 2.583,-8.084v-10c0,-7.732 -6.268,-14 -14,-14z" fill="currentColor"></path>
                    <path d="M36.75,27c-2.067,0 -3.75,-1.683 -3.75,-3.75c0,-2.067 1.683,-3.75 3.75,-3.75c2.067,0 3.75,1.683 3.75,3.75c0,2.067 -1.683,3.75 -3.75,3.75zM36.75,21c-1.24,0 -2.25,1.01 -2.25,2.25c0,1.24 1.01,2.25 2.25,2.25c1.24,0 2.25,-1.01 2.25,-2.25c0,-1.24 -1.01,-2.25 -2.25,-2.25z" fill="white"></path>
                    <path d="M31.5,27h-1c-0.276,0 -0.5,-0.224 -0.5,-0.5v-8.5h1.5z" fill="white"></path>
                    <path d="M27,19.75v0.519c-0.629,-0.476 -1.403,-0.769 -2.25,-0.769c-2.067,0 -3.75,1.683 -3.75,3.75c0,2.067 1.683,3.75 3.75,3.75c0.847,0 1.621,-0.293 2.25,-0.769v0.269c0,0.276 0.224,0.5 0.5,0.5h1v-7.25zM24.75,25.5c-1.24,0 -2.25,-1.01 -2.25,-2.25c0,-1.24 1.01,-2.25 2.25,-2.25c1.24,0 2.25,1.01 2.25,2.25c0,1.24 -1.01,2.25 -2.25,2.25z" fill="white"></path>
                    <path d="M21.25,18h-8v1.5h5.321l-5.571,6.5h0.026c-0.163,0.211 -0.276,0.463 -0.276,0.75v0.25h7.5c0.276,0 0.5,-0.224 0.5,-0.5v-1h-5.321l5.571,-6.5h-0.026c0.163,-0.211 0.276,-0.463 0.276,-0.75z" fill="white"></path>
                  </svg>
                </div>
                <div className="text-left">
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider">Zalo</p>
                  <p className="text-gray-800 font-bold group-hover:text-blue-600 transition-colors">0905 001 224</p>
                </div>
              </a>
            </div>

            <button
              onClick={handleClose}
              className="px-8 py-3 bg-gray-900 text-white rounded-xl font-semibold text-sm uppercase tracking-wider hover:bg-black transition-colors"
            >
              Đóng
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// Contact Page
// ==========================================
export function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [showPopup, setShowPopup] = useState(false);
  const [popupType, setPopupType] = useState<'success' | 'error'>('success');
  const [validationErrors, setValidationErrors] = useState<{ phone?: string; email?: string }>({});
  const formRef = useRef<HTMLFormElement>(null);

  const breadcrumb = makeBreadcrumbSchema([
    { name: 'Trang chủ', url: 'https://cuongthonggio.com/' },
    { name: 'Liên hệ', url: 'https://cuongthonggio.com/lien-he' }
  ]);

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Liên hệ Cường Thông Gió",
    "description": "Liên hệ Cường Thông Gió để nhận tư vấn, báo giá hệ thống thông gió, quạt công nghiệp tại Đà Nẵng.",
    "url": "https://cuongthonggio.com/lien-he",
    "hasMap": "https://www.google.com/maps/place/?q=place_id:ChIJAQDvmduYQjERvtE7J7awz68"
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const phone = (formData.get('phone') as string) || '';
    const email = (formData.get('email') as string) || '';

    // Validate
    const errors: { phone?: string; email?: string } = {};
    
    if (!isValidVNPhone(phone)) {
      errors.phone = 'Số điện thoại không hợp lệ. Vui lòng nhập SĐT Việt Nam (10 số, bắt đầu bằng 0).';
    }
    
    if (email && !isValidEmail(email)) {
      errors.email = 'Email không hợp lệ.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setStatus('submitting');

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          phone,
          email: email || undefined,
          message: formData.get('message'),
        }),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setStatus('success');
        setPopupType('success');
        setShowPopup(true);
        formRef.current.reset();
      } else {
        setStatus('error');
        setPopupType('error');
        setShowPopup(true);
      }
    } catch (error: unknown) {
      console.error("EmailJS error", error);
      setStatus('error');
      setPopupType('error');
      setShowPopup(true);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setStatus('idle');
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-20 px-6">
      <SEO
        title="Liên Hệ — Báo Giá Quạt Công Nghiệp & Thông Gió"
        description="Liên hệ Cường Thông Gió để nhận tư vấn kỹ thuật và báo giá hệ thống thông gió, quạt công nghiệp. Địa chỉ: 101 Trần Quý Khoách, P. Hòa Khánh, Đà Nẵng. Hotline: 0905 001 224."
        keywords="liên hệ Cường Thông Gió, báo giá quạt công nghiệp, tư vấn thông gió, thông gió Đà Nẵng, hotline quạt công nghiệp"
        structuredData={[breadcrumb, contactSchema, LOCAL_BUSINESS_SCHEMA]}
        dateModified="2026-06-04"
      />

      {/* Popup Modal */}
      <PopupModal isOpen={showPopup} onClose={handleClosePopup} type={popupType} />

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
            Cung cấp thông tin sơ bộ về dự án để nhận báo giá chi tiết và phương án thiết kế từ đội ngũ kỹ sư của chúng tôi.
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

              <address className="space-y-7 not-italic">
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
                      101 Trần Quý Khoách, P. Hòa Khánh, TP. Đà Nẵng
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
                    <p className="text-gray-600 text-sm">
                      <a href="tel:0905001224" className="hover:text-industrial-blue transition-colors">0905 001 224</a>
                    </p>
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
                    <p className="text-gray-600 text-sm">
                      <a href="mailto:phantrongcuong77@gmail.com" className="hover:text-industrial-blue transition-colors">phantrongcuong77@gmail.com</a>
                    </p>
                  </div>
                </div>
              </address>

              {/* Giờ làm việc — Local SEO */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-base">Giờ làm việc</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between"><span>Thứ 2 - Thứ 7</span><span className="font-semibold text-gray-900">08:00 - 17:00</span></div>
                  <div className="flex justify-between"><span>Chủ nhật</span><span className="text-red-500 font-semibold">Nghỉ</span></div>
                </div>
              </div>

              {/* Google Maps — Local SEO */}
              <div className="mt-8 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834!2d108.1594859!3d16.0772668!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314218db99ef0001%3A0xafcfb0b6273bd1be!2zQ8O0bmcgVHkgVG5oaCBN4buZdCBUaMOgbmggVmnDqm4gQ8aw4budbmcgVGjDtG5nIEdpw7M!5e0!3m2!1svi!2svn!4v1"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ Cường Thông Gió — 101 Trần Quý Khoách, P. Hòa Khánh, Đà Nẵng"
                  className="w-full"
                />
              </div>

              {/* Liên kết hữu ích */}
              <div className="mt-8 pt-8 border-t border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4 text-base">Câu hỏi thường gặp</h3>
                <div className="space-y-2">
                  <a href="/kien-thuc/chon-quat-cong-nghiep" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">→ Cách chọn quạt công nghiệp phù hợp</a>
                  <a href="/kien-thuc/chi-phi-thi-cong-thong-gio" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">→ Bảng giá thi công thông gió 2026</a>
                  <a href="/#faq" className="block text-sm text-gray-600 hover:text-gray-900 transition-colors">→ Xem thêm câu hỏi thường gặp</a>
                </div>
              </div>

            </div>

            {/* Right Column - Form Section */}
            <div>
              <form ref={formRef} className="space-y-5" onSubmit={handleSubmit}>
                {/* Full Name */}
                <div>
                  <label htmlFor="contact-name" className="block text-xs uppercase font-bold tracking-wider text-gray-700 mb-3">
                    HỌ VÀ TÊN *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    placeholder="Tên của bạn..."
                    className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent placeholder:text-gray-400"
                    required
                  />
                </div>

                {/* Phone and Email Row */}
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs uppercase font-bold tracking-wider text-gray-700 mb-3">
                      SỐ ĐIỆN THOẠI *
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      placeholder="0905..."
                      className={`w-full px-4 py-3.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent placeholder:text-gray-400 ${
                        validationErrors.phone ? 'border-red-400 ring-1 ring-red-200' : 'border-gray-300'
                      }`}
                      required
                      onChange={() => setValidationErrors(prev => ({ ...prev, phone: undefined }))}
                    />
                    {validationErrors.phone && (
                      <p className="mt-1.5 text-xs text-red-500 font-medium">{validationErrors.phone}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-xs uppercase font-bold tracking-wider text-gray-700 mb-3">
                      EMAIL
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="email@vidu.com"
                      className={`w-full px-4 py-3.5 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent placeholder:text-gray-400 ${
                        validationErrors.email ? 'border-red-400 ring-1 ring-red-200' : 'border-gray-300'
                      }`}
                      onChange={() => setValidationErrors(prev => ({ ...prev, email: undefined }))}
                    />
                    {validationErrors.email && (
                      <p className="mt-1.5 text-xs text-red-500 font-medium">{validationErrors.email}</p>
                    )}
                  </div>
                </div>

                {/* Technical Requirements */}
                <div>
                  <label htmlFor="contact-message" className="block text-xs uppercase font-bold tracking-wider text-gray-700 mb-3">
                    YÊU CẦU KỸ THUẬT *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    name="message"
                    placeholder="Diện tích xưởng, quy mô, loại quạt..."
                    className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent placeholder:text-gray-400 resize-none"
                    required
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`w-full bg-[#1a1a1a] text-white uppercase py-4 rounded-xl transition-all duration-200 font-semibold tracking-widest text-sm mt-2 shadow-lg flex items-center justify-center gap-2 ${
                    status === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-black'
                  }`}
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      ĐANG GỬI...
                    </>
                  ) : 'GỬI YÊU CẦU TƯ VẤN'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
