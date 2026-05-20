import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-industrial-black py-20 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 lg:gap-24">
          {/* Brand & Slogan */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <Logo size={56} />
              <span className="font-bold text-2xl tracking-tighter uppercase">CƯỜNG THÔNG GIÓ.</span>
            </div>
            <p className="text-gray-500 text-[15px] leading-relaxed font-medium">
              Chuyên tư vấn, thiết kế và thi công hệ thống quạt công nghiệp, ống gió tại Đà Nẵng và khu vực Miền Trung. Chúng tôi cam kết chất lượng sản phẩm trực tiếp từ xưởng với chi phí tối ưu nhất và chế độ bảo hành tận tâm.
            </p>
          </div>

          {/* Services */}
          <div className="space-y-8">
            <h3 className="font-bold text-lg uppercase tracking-wider">DỊCH VỤ</h3>
            <ul className="space-y-3">
              <li className="text-gray-500 text-[15px] font-medium">Quạt công nghiệp công suất lớn</li>
              <li className="text-gray-500 text-[15px] font-medium">Gia công ống gió Plasma CNC</li>
              <li className="text-gray-500 text-[15px] font-medium">Hệ thống lọc bụi nhà xưởng</li>
              <li className="text-gray-500 text-[15px] font-medium">Thông gió PCCC & Tầng hầm</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <h3 className="font-bold text-lg uppercase tracking-wider">THÔNG TIN LIÊN HỆ</h3>
            <ul className="space-y-4">
              <li className="text-gray-500 text-[15px] font-medium leading-relaxed">
                101 Trần Quý Khoách,<br />
                P. Hoà Minh, Q. Liên Chiểu,<br />
                TP. Đà Nẵng
              </li>
              <li className="text-[15px] font-bold">
                Hotline/Zalo: <a href="tel:0905001224" className="hover:text-industrial-blue transition-colors">0905 001 224</a>
              </li>
              <li className="text-[15px] font-medium text-gray-500">
                Email: <a href="mailto:phantrongcuong77@gmail.com" className="hover:text-industrial-blue transition-colors">phantrongcuong77@gmail.com</a>
              </li>
            </ul>
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
