import { useState, useRef } from 'react';
import { SEO, makeBreadcrumbSchema, LOCAL_BUSINESS_SCHEMA } from '../components/SEO';
import emailjs from '@emailjs/browser';

// ========================================
// CẤU HÌNH EMAILJS - Thay bằng credentials của bạn
// Lấy tại: https://www.emailjs.com/
// ========================================
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";   // Ví dụ: "service_abc123"
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID"; // Ví dụ: "template_xyz789"
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";    // Ví dụ: "AbCdEfGhIjKlMn"

export function Contact() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
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
    "hasMap": "https://maps.google.com/maps?q=101+Tr%E1%BA%A7n+Qu%C3%BD+Kho%C3%A1ch,+Ho%C3%A0+Minh,+Li%C3%AAn+Chi%E1%BB%83u,+%C4%90%C3%A0+N%E1%BA%B5ng"
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMsg('');

    if (!formRef.current) return;

    try {
      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      if (result.status === 200) {
        setStatus('success');
        formRef.current.reset();
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setErrorMsg(`Lỗi: ${result.text}`);
        setStatus('error');
        setTimeout(() => setStatus('idle'), 8000);
      }
    } catch (error: unknown) {
      console.error("EmailJS error", error);
      const errMsg = error instanceof Error 
        ? error.message 
        : (typeof error === 'object' && error !== null && 'text' in error) 
          ? String((error as { text: string }).text) 
          : "Lỗi kết nối mạng";
      setErrorMsg(errMsg);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 8000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] pt-32 pb-20 px-6">
      <SEO
        title="Liên Hệ — Báo Giá Quạt Công Nghiệp & Thông Gió"
        description="Liên hệ Cường Thông Gió để nhận tư vấn kỹ thuật và báo giá hệ thống thông gió, quạt công nghiệp. Địa chỉ: 101 Trần Quý Khoách, Đà Nẵng. Hotline: 0905 001 224."
        keywords="liên hệ Cường Thông Gió, báo giá quạt công nghiệp, tư vấn thông gió, thông gió Đà Nẵng, hotline quạt công nghiệp"
        structuredData={[breadcrumb, contactSchema, LOCAL_BUSINESS_SCHEMA]}
      />

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
                      className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent placeholder:text-gray-400"
                      required
                    />
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
                      className="w-full px-4 py-3.5 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-gray-300 focus:border-transparent placeholder:text-gray-400"
                    />
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

                {/* Status Messages */}
                {status === 'success' && (
                  <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm font-medium border border-green-200" role="alert">
                    Cảm ơn bạn! Yêu cầu của bạn đã được gửi thành công. Chúng tôi sẽ liên hệ lại sớm nhất.
                  </div>
                )}
                {status === 'error' && (
                  <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm font-medium border border-red-200" role="alert">
                    Có lỗi xảy ra khi gửi yêu cầu. {errorMsg && <><br/><span className="text-xs text-red-500">Chi tiết: {errorMsg}</span></>}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className={`w-full bg-[#1a1a1a] text-white uppercase py-4 rounded-full transition-all duration-200 font-semibold tracking-widest text-sm mt-2 shadow-lg ${
                    status === 'submitting' ? 'opacity-70 cursor-not-allowed' : 'hover:bg-black'
                  }`}
                >
                  {status === 'submitting' ? 'ĐANG GỬI...' : 'GỬI YÊU CẦU TƯ VẤN'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
