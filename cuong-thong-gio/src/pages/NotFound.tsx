import { NavLink } from 'react-router-dom';
import { ArrowLeft, Construction } from 'lucide-react';

export function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-industrial-silver visible-grid p-4">
      <div className="text-center max-w-xl bg-white p-16 industrial-shadow border border-industrial-border">
         <div className="w-20 h-20 bg-industrial-black text-white flex items-center justify-center rounded-sm mx-auto mb-8 animate-pulse">
            <Construction className="w-10 h-10" />
         </div>
         <h1 className="text-8xl font-display font-bold text-industrial-black mb-4 tracking-tighter">404</h1>
         <h2 className="text-2xl font-display font-bold mb-6 italic uppercase">KHÔNG TÌM THẤY TRANG</h2>
         <p className="text-gray-500 mb-10 italic">Có vẻ như đường dẫn bạn đang truy cập không tồn tại hoặc đang được chúng tôi nâng cấp hệ thống.</p>
         <NavLink to="/" className="inline-flex items-center gap-2 bg-industrial-black text-white px-8 py-4 rounded-sm font-bold hover:bg-industrial-blue transition-all uppercase tracking-widest text-sm">
           <ArrowLeft className="w-4 h-4" /> Về trang chủ
         </NavLink>
      </div>
    </div>
  );
}
