import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Wind, Phone } from 'lucide-react'
import { cn } from '../lib/utils'

const navLinks = [
  { href: '/', label: 'Trang Chủ' },
  { href: '/san-pham', label: 'Sản Phẩm' },
  { href: '/gioi-thieu', label: 'Giới Thiệu' },
  { href: '/lien-he', label: 'Liên Hệ' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <header className={cn(
      'fixed top-0 inset-x-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_24px_rgba(15,76,129,0.1)] border-b border-blue-50'
        : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-700 to-blue-900 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-200 transition-shadow">
              <Wind className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className={cn(
                'font-bold text-base leading-tight transition-colors',
                scrolled ? 'text-blue-900' : 'text-white'
              )}>Cường Thống Gió</div>
              <div className={cn(
                'text-xs font-medium transition-colors',
                scrolled ? 'text-blue-400' : 'text-blue-200'
              )}>Công Ty TNHH MTV</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  location.pathname === link.href
                    ? scrolled
                      ? 'bg-blue-700 text-white'
                      : 'bg-white/20 text-white'
                    : scrolled
                      ? 'text-slate-600 hover:text-blue-700 hover:bg-blue-50'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:0123456789"
              className={cn(
                'flex items-center gap-2 text-sm font-medium transition-colors',
                scrolled ? 'text-slate-600 hover:text-blue-700' : 'text-white/80 hover:text-white'
              )}
            >
              <Phone className="w-4 h-4" />
              0123 456 789
            </a>
            <Link
              to="/lien-he"
              className="bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-all duration-200 shadow-lg shadow-orange-200 hover:shadow-orange-300"
            >
              Báo Giá
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors',
              scrolled ? 'text-slate-700 hover:bg-slate-100' : 'text-white hover:bg-white/10'
            )}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 shadow-xl">
          <nav className="px-4 py-4 space-y-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'block px-4 py-3 rounded-xl text-sm font-medium transition-colors',
                  location.pathname === link.href
                    ? 'bg-blue-700 text-white'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
              <a href="tel:0123456789" className="flex items-center gap-2 px-4 py-3 text-sm font-medium text-slate-600">
                <Phone className="w-4 h-4" /> 0123 456 789
              </a>
              <Link to="/lien-he" className="bg-orange-500 text-white text-center py-3 rounded-xl font-semibold text-sm">
                Yêu Cầu Báo Giá
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
