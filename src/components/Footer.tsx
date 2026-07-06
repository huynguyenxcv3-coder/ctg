import { NavLink } from 'react-router-dom';
import { Logo } from './Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white text-industrial-black py-20 border-t border-gray-100" role="contentinfo" itemScope itemType="https://schema.org/LocalBusiness">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Brand section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <Logo size={48} />
              <span className="font-black text-2xl tracking-tighter uppercase text-zinc-900">CƯỜNG THÔNG GIÓ.</span>
            </div>
            <p className="text-zinc-500 text-[15px] leading-relaxed font-medium">
              Chuyên tư vấn, thiết kế và thi công hệ thống quạt công nghiệp, ống gió tại Đà Nẵng và khu vực Miền Trung. Chúng tôi cam kết chất lượng sản phẩm trực tiếp từ xưởng với chi phí tối ưu nhất và chế độ bảo hành tận tâm.
            </p>
          </div>

          {/* DỊCH VỤ */}
          <div>
            <h3 className="font-bold text-lg uppercase tracking-wider text-zinc-900 mb-4">DỊCH VỤ</h3>
            <ul className="space-y-2.5 text-[15px]">
              <li><NavLink to="/san-pham" className="text-zinc-500 font-medium hover:text-industrial-blue transition-colors">Quạt công nghiệp công suất lớn</NavLink></li>
              <li><NavLink to="/san-pham" className="text-zinc-500 font-medium hover:text-industrial-blue transition-colors">Gia công ống gió Plasma CNC</NavLink></li>
              <li><NavLink to="/san-pham" className="text-zinc-500 font-medium hover:text-industrial-blue transition-colors">Hệ thống lọc bụi nhà xưởng</NavLink></li>
              <li><NavLink to="/san-pham" className="text-zinc-500 font-medium hover:text-industrial-blue transition-colors">Thông gió PCCC & Tầng hầm</NavLink></li>
              <li><NavLink to="/san-pham" className="text-zinc-500 font-medium hover:text-industrial-blue transition-colors">Máy điều hoà cassette</NavLink></li>
            </ul>
          </div>

          {/* THÔNG TIN LIÊN HỆ */}
          <div>
            <h3 className="font-bold text-lg uppercase tracking-wider text-zinc-900 mb-4">THÔNG TIN LIÊN HỆ</h3>
            <div className="text-zinc-500 text-[15px] font-medium leading-relaxed">
              101 Trần Quý Khoách, P. Hòa Khánh, TP. Đà Nẵng
            </div>
            <div className="mt-3">
              <div className="font-bold text-zinc-800">
                Hotline/Zalo: <a href="tel:0905001224" className="text-zinc-900 hover:text-industrial-blue transition-colors">0905 001 224</a>
              </div>
              <div className="mt-1 text-zinc-500 font-medium">
                Email: <a href="mailto:phantrongcuong77@gmail.com" className="text-zinc-600 hover:text-industrial-blue transition-colors">phantrongcuong77@gmail.com</a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick links - clean bottom row */}
        <div className="mt-10 pt-6 border-t border-zinc-100">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] font-medium text-zinc-500">
            <li><NavLink to="/" className="hover:text-zinc-900 transition-colors">Trang chủ</NavLink></li>
            <li><NavLink to="/gioi-thieu" className="hover:text-zinc-900 transition-colors">Giới thiệu</NavLink></li>
            <li><NavLink to="/du-an" className="hover:text-zinc-900 transition-colors">Dự án</NavLink></li>
            <li><NavLink to="/san-pham" className="hover:text-zinc-900 transition-colors">Sản phẩm</NavLink></li>
            <li><NavLink to="/kien-thuc" className="hover:text-zinc-900 transition-colors">Kiến thức</NavLink></li>
            <li><NavLink to="/lien-he" className="hover:text-zinc-900 transition-colors">Liên hệ</NavLink></li>
          </ul>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-wrap items-center gap-5">
            <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">
              © {currentYear} CƯỜNG THÔNG GIÓ. TẤT CẢ QUYỀN ĐƯỢC BẢO LƯU.
            </p>
            <a href="//www.dmca.com/Protection/Status.aspx?ID=2b5c0b87-c2bc-4147-9498-defdcb5bc5e6&refurl=https://cuongthonggio.com/" title="DMCA.com Protection Status" className="dmca-badge shrink-0" target="_blank" rel="noopener noreferrer">
              <img src="https://images.dmca.com/Badges/dmca-badge-w100-5x1-06.png?ID=2b5c0b87-c2bc-4147-9498-defdcb5bc5e6" alt="DMCA.com Protection Status" className="h-6 w-auto object-contain" />
            </a>
          </div>
          <div className="flex items-center gap-6 shrink-0">
            <span className="text-xs font-bold text-zinc-400 uppercase tracking-widest hidden sm:inline">T2-T7: 08:00–17:00</span>
            <div className="flex gap-3">
              <a href="tel:0905001224" aria-label="Gọi Cường Thông Gió" className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-industrial-blue hover:text-white transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </a>
              <a href="https://zalo.me/0905001224" target="_blank" rel="noopener noreferrer" aria-label="Zalo Cường Thông Gió" className="group w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-[#0068ff] hover:text-white transition-all">
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path d="M15,36v-29.173l-1.211,-0.811c-5.149,2.067 -8.789,7.096 -8.789,12.984v10c0,7.732 6.268,14 14,14h10c4.722,0 8.883,-2.348 11.417,-5.931v-1.069z" fill="currentColor" opacity="0.3"></path>
                  <path d="M29,5h-10c-1.845,0 -3.601,0.366 -5.214,1.014c-3.333,3.236 -5.786,8.514 -5.786,12.986c0,6.771 0.936,10.735 3.712,14.607c0.216,0.301 0.357,0.653 0.376,1.022c0.043,0.835 -0.129,2.365 -1.634,3.742c-0.162,0.148 -0.059,0.419 0.16,0.428c0.942,0.041 2.843,-0.014 4.797,-0.877c0.557,-0.246 1.191,-0.203 1.729,0.083c3.313,1.759 7.193,1.995 10.86,1.995c4.676,0 9.339,-1.04 12.417,-2.916c1.621,-2.285 2.583,-5.07 2.583,-8.084v-10c0,-7.732 -6.268,-14 -14,-14z" fill="currentColor"></path>
                  <path className="fill-white group-hover:fill-[#0068ff] transition-colors" d="M36.75,27c-2.067,0 -3.75,-1.683 -3.75,-3.75c0,-2.067 1.683,-3.75 3.75,-3.75c2.067,0 3.75,1.683 3.75,3.75c0,2.067 -1.683,3.75 -3.75,3.75zM36.75,21c-1.24,0 -2.25,1.01 -2.25,2.25c0,1.24 1.01,2.25 2.25,2.25c1.24,0 2.25,-1.01 2.25,-2.25c0,-1.24 -1.01,-2.25 -2.25,-2.25z"></path>
                  <path className="fill-white group-hover:fill-[#0068ff] transition-colors" d="M31.5,27h-1c-0.276,0 -0.5,-0.224 -0.5,-0.5v-8.5h1.5z"></path>
                  <path className="fill-white group-hover:fill-[#0068ff] transition-colors" d="M27,19.75v0.519c-0.629,-0.476 -1.403,-0.769 -2.25,-0.769c-2.067,0 -3.75,1.683 -3.75,3.75c0,2.067 1.683,3.75 3.75,3.75c0.847,0 1.621,-0.293 2.25,-0.769v0.269c0,0.276 0.224,0.5 0.5,0.5h1v-7.25zM24.75,25.5c-1.24,0 -2.25,-1.01 -2.25,-2.25c0,-1.24 1.01,-2.25 2.25,-2.25c1.24,0 2.25,1.01 2.25,2.25c0,1.24 -1.01,2.25 -2.25,2.25z"></path>
                  <path className="fill-white group-hover:fill-[#0068ff] transition-colors" d="M21.25,18h-8v1.5h5.321l-5.571,6.5h0.026c-0.163,0.211 -0.276,0.463 -0.276,0.75v0.25h7.5c0.276,0 0.5,-0.224 0.5,-0.5v-1h-5.321l5.571,-6.5h-0.026c0.163,-0.211 0.276,-0.463 0.276,-0.75z"></path>
                </svg>
              </a>
              <a href="mailto:phantrongcuong77@gmail.com" aria-label="Email Cường Thông Gió" className="w-9 h-9 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 hover:bg-industrial-blue hover:text-white transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
