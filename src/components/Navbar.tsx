import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/src/lib/utils';
import { Logo } from './Logo';

const navItems = [
  { name: 'TRANG CHỦ', path: '/' },
  { name: 'VỀ CHÚNG TÔI', path: '/gioi-thieu' },
  { name: 'GIẢI PHÁP & THIẾT BỊ', path: '/san-pham' },
  { name: 'DỰ ÁN', path: '/du-an' },
  { name: 'CHIA SẺ KỸ THUẬT', path: '/kien-thuc' },
  { name: 'LIÊN HỆ', path: '/lien-he' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b',
        scrolled 
          ? 'bg-white/95 backdrop-blur-md py-4 border-gray-100 shadow-sm' 
          : 'bg-white py-6 border-transparent'
      )}
    >
      <nav aria-label="Điều hướng chính" className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 flex items-center">
        {/* Logo Section */}
        <NavLink to="/" className="flex items-center gap-3 group whitespace-nowrap" aria-label="Cường Thông Gió — Trang chủ">
          <Logo size={44} />
          <div className="flex flex-col">
            <span className="font-bold text-xl tracking-tighter text-industrial-black">
              CƯỜNG THÔNG GIÓ.
            </span>
          </div>
        </NavLink>

        {/* Desktop Nav - Centered */}
        <div className="hidden lg:flex flex-1 items-center justify-center gap-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  'text-[13px] font-bold transition-colors tracking-wide uppercase',
                  isActive ? 'text-industrial-black' : 'text-gray-500 hover:text-industrial-black'
                )
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Right Action Button */}
        <div className="hidden lg:block">
          <NavLink
            to="/lien-he"
            className="bg-[#18181b] text-white px-8 py-3.5 rounded-full hover:bg-industrial-blue transition-all text-[12px] font-bold uppercase tracking-[0.1em] shadow-lg shadow-zinc-200"
          >
            BÁO GIÁ NGAY
          </NavLink>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden ml-auto p-2 text-industrial-black"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Đóng menu' : 'Mở menu'}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="lg:hidden bg-white border-b border-gray-100 overflow-hidden shadow-2xl"
            role="navigation"
            aria-label="Menu di động"
          >
            <div className="px-5 py-10 flex flex-col gap-5">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      'text-lg font-bold tracking-tight py-4 px-2 border-b border-gray-50 uppercase transition-colors',
                      isActive ? 'text-industrial-blue bg-gray-50/50' : 'text-zinc-900 active:bg-gray-50'
                    )
                  }
                >
                  {item.name}
                </NavLink>
              ))}
              <NavLink
                to="/lien-he"
                className="bg-zinc-900 text-white p-5 rounded-2xl text-center font-bold uppercase tracking-[0.15em] mt-4 shadow-xl shadow-zinc-200 active:scale-[0.98] transition-all"
              >
                BÁO GIÁ NGAY
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
