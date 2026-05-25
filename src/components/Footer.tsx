import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-industrial-black py-20 border-t border-gray-100" role="contentinfo" itemScope itemType="https://schema.org/LocalBusiness">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          {/* Brand & Slogan */}
          <div className="space-y-8 lg:col-span-1">
            <div className="flex items-center gap-4">
              <Logo size={56} />
              <span className="font-bold text-2xl tracking-tighter uppercase" itemProp="name">CƯỜNG THÔNG GIÓ.</span>
            </div>
            <p className="text-gray-500 text-[15px] leading-relaxed font-medium" itemProp="description">
              Chuyên tư vấn, thiết kế và thi công hệ thống quạt công nghiệp, ống gió tại Đà Nẵng và khu vực Miền Trung. Chúng tôi cam kết chất lượng sản phẩm trực tiếp từ xưởng với chi phí tối ưu nhất và chế độ bảo hành tận tâm.
            </p>
            <meta itemProp="url" content="https://cuongthonggio.com" />
            <meta itemProp="image" content="https://cuongthonggio.com/logo.png" />
          </div>

          {/* Services Navigation */}
          <nav aria-label="Dịch vụ chính" className="space-y-8">
            <h3 className="font-bold text-lg uppercase tracking-wider">DỊCH VỤ</h3>
            <ul className="space-y-3">
              <li><NavLink to="/san-pham" className="text-gray-500 text-[15px] font-medium hover:text-industrial-blue transition-colors">Quạt công nghiệp công suất lớn</NavLink></li>
              <li><NavLink to="/san-pham" className="text-gray-500 text-[15px] font-medium hover:text-industrial-blue transition-colors">Gia công ống gió Plasma CNC</NavLink></li>
              <li><NavLink to="/san-pham" className="text-gray-500 text-[15px] font-medium hover:text-industrial-blue transition-colors">Hệ thống lọc bụi nhà xưởng</NavLink></li>
              <li><NavLink to="/san-pham" className="text-gray-500 text-[15px] font-medium hover:text-industrial-blue transition-colors">Thông gió PCCC & Tầng hầm</NavLink></li>
              <li><NavLink to="/san-pham" className="text-gray-500 text-[15px] font-medium hover:text-industrial-blue transition-colors">Máy điều hoà cassette</NavLink></li>
            </ul>
          </nav>

          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="font-bold text-lg uppercase tracking-wider">THÔNG TIN LIÊN HỆ</h3>
            <address className="not-italic" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <ul className="space-y-4">
                <li className="text-gray-500 text-[15px] font-medium leading-relaxed">
                  <span itemProp="streetAddress">101 Trần Quý Khoách,<br />P. Hoà Minh, Q. Liên Chiểu</span>,<br />
                  <span itemProp="addressLocality">TP. Đà Nẵng</span>
                  <meta itemProp="addressRegion" content="Đà Nẵng" />
                  <meta itemProp="postalCode" content="550000" />
                  <meta itemProp="addressCountry" content="VN" />
                </li>
                <li className="text-[15px] font-bold">
                  Hotline/Zalo: <a href="tel:0905001224" className="hover:text-industrial-blue transition-colors" aria-label="Gọi hotline 0905 001 224" itemProp="telephone">0905 001 224</a>
                </li>
                <li className="text-[15px] font-medium text-gray-500 whitespace-nowrap">
                  Email: <a href="mailto:phantrongcuong77@gmail.com" className="hover:text-industrial-blue transition-colors" aria-label="Gửi email đến Cường Thông Gió" itemProp="email">phantrongcuong77@gmail.com</a>
                </li>
              </ul>
            </address>

            {/* Quick Navigation Links */}
            <nav aria-label="Điều hướng nhanh">
              <ul className="flex flex-nowrap gap-x-3 gap-y-2 text-[12px] font-bold uppercase tracking-wider text-gray-400 whitespace-nowrap">
                <li><NavLink to="/" className="hover:text-industrial-black transition-colors">Trang chủ</NavLink></li>
                <li><NavLink to="/gioi-thieu" className="hover:text-industrial-black transition-colors">Giới thiệu</NavLink></li>
                <li><NavLink to="/san-pham" className="hover:text-industrial-black transition-colors">Sản phẩm</NavLink></li>
                <li><NavLink to="/lien-he" className="hover:text-industrial-black transition-colors">Liên hệ</NavLink></li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-24 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            © {currentYear} CƯỜNG THÔNG GIÓ. TẤT CẢ QUYỀN ĐƯỢC BẢO LƯU.
          </p>
          <div className="flex gap-8 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
            <span>UY TÍN</span>
            <span>CHẤT LƯỢNG</span>
            <span>TRÁCH NHIỆM</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
