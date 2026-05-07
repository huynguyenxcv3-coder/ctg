import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="bg-white border-t border-zinc-200 pt-16 pb-8">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <Link to="/" className="text-sm font-bold tracking-tight text-zinc-900 mb-4 block uppercase">
              Cường Thông Gió<span className="text-zinc-400">.</span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-sm">
              Chuyên tư vấn, thiết kế và thi công hệ thống quạt công nghiệp, ống gió tại Đà Nẵng và khu vực Miền Trung. Chúng tôi cam kết chất lượng sản phẩm trực tiếp từ xưởng với chi phí tối ưu nhất và chế độ bảo hành tận tâm.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-zinc-900 mb-4 uppercase tracking-wider">Dịch vụ</h3>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link to="/san-pham" className="hover:text-zinc-900 transition-colors">Quạt công nghiệp công suất lớn</Link></li>
              <li><Link to="/san-pham" className="hover:text-zinc-900 transition-colors">Gia công ống gió Plasma CNC</Link></li>
              <li><Link to="/san-pham" className="hover:text-zinc-900 transition-colors">Hệ thống lọc bụi nhà xưởng</Link></li>
              <li><Link to="/san-pham" className="hover:text-zinc-900 transition-colors">Thông gió PCCC & Tầng hầm</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-zinc-900 mb-4 uppercase tracking-wider">Thông tin liên hệ</h3>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li className="leading-relaxed">101 Trần Quý Khoách,<br/>P. Hoà Minh, Q. Liên Chiểu,<br/>TP. Đà Nẵng</li>
              <li>Hotline/Zalo: <a href="tel:0905001224" className="text-zinc-900 font-bold hover:underline">0905 001 224</a></li>
              <li>Email: <a href="mailto:phantrongcuong77@gmail.com" className="hover:text-zinc-900 transition-colors">phantrongcuong77@gmail.com</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
          <p>© {new Date().getFullYear()} CƯỜNG THÔNG GIÓ. TẤT CẢ QUYỀN ĐƯỢC BẢO LƯU.</p>
          <div className="flex gap-6">
            <Link to="#" className="hover:text-zinc-900 transition-colors">Uy tín</Link>
            <Link to="#" className="hover:text-zinc-900 transition-colors">Chất lượng</Link>
            <Link to="#" className="hover:text-zinc-900 transition-colors">Trách nhiệm</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
