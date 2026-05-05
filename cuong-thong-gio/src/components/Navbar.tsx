import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Wind, Phone } from 'lucide-react'
import { cn } from '../lib/utils'
import { Button } from './ui/Button'

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

  return (
    <header className={cn(
      'fixed top-4 inset-x-0 z-50 transition-all duration-500 flex justify-center px-4',
    )}>
      <div className={cn(
        'w-full max-w-7xl px-6 py-3 transition-all duration-500 rounded-2xl',
        scrolled
          ? 'glass shadow-lg border border-slate-200/50 scale-[0.98]'
          : 'bg-transparent border-transparent'
      )}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-md shadow-blue-200/50 group-hover:scale-105 transition-transform">
              <Wind className="w-5 h-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className={cn(
                'font-bold text-lg leading-tight transition-colors',
                scrolled ? 'text-slate-900' : 'text-slate-900 md:text-white'
              )}>Cường Thống Gió</div>
              <div className={cn(
                'text-[10px] font-semibold uppercase tracking-wider transition-colors',
                scrolled ? 'text-blue-600' : 'text-blue-600 md:text-blue-100/70'
              )}>Engineering Solutions</div>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-all duration-200',
                  location.pathname === link.href
                    ? scrolled
                      ? 'text-blue-600 bg-blue-50/50'
                      : 'text-white bg-white/20'
                    : scrolled
                      ? 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:0123456789"
              className={cn(
                'flex items-center gap-2 text-sm font-semibold transition-colors',
                scrolled ? 'text-slate-600 hover:text-blue-600' : 'text-white/80 hover:text-white'
              )}
            >
              <Phone className="w-4 h-4" />
              0123 456 789
            </a>
            <Button asChild size="sm" className="rounded-lg px-6 font-bold shadow-blue-500/20">
              <Link to="/lien-he">Báo Giá</Link>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              'md:hidden p-2 rounded-lg transition-colors',
              scrolled ? 'text-slate-900 hover:bg-slate-100' : 'text-slate-900 md:text-white hover:bg-white/10'
            )}
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="absolute top-20 inset-x-4 md:hidden glass border border-slate-200 shadow-2xl rounded-2xl overflow-hidden p-2 anim-fade-up">
          <nav className="flex flex-col gap-1">
            {navLinks.map(link => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'block px-5 py-4 rounded-xl text-base font-semibold transition-colors',
                  location.pathname === link.href
                    ? 'bg-blue-600 text-white'
                    : 'text-slate-700 hover:bg-blue-50 hover:text-blue-600'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 pt-2 border-t border-slate-100 flex flex-col gap-2">
              <a href="tel:0123456789" className="flex items-center gap-3 px-5 py-4 text-base font-semibold text-slate-700">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-blue-600" />
                </div>
                0123 456 789
              </a>
              <Button asChild onClick={() => setOpen(false)} className="mx-2 mb-2 py-6 rounded-xl text-base font-bold">
                <Link to="/lien-he">Yêu Cầu Báo Giá</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
