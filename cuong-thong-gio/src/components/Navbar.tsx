import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '../lib/utils'
import { Button } from './ui/Button'

const navLinks = [
  { href: '/', label: 'Trang chủ' },
  { href: '/gioi-thieu', label: 'Về chúng tôi' },
  { href: '/san-pham', label: 'Giải pháp & Thiết bị' },
  { href: '/lien-he', label: 'Liên hệ' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Close menu on navigation
  useEffect(() => {
    setIsOpen(false)
  }, [location.pathname])

  return (
    <header className={cn(
      'sticky top-0 inset-x-0 z-50 transition-all duration-300 border-b',
      scrolled || isOpen ? 'bg-white/95 backdrop-blur-md border-zinc-200 shadow-sm' : 'bg-white/50 backdrop-blur-sm border-zinc-100'
    )}>
      <div className="container-custom h-14 flex items-center justify-between">
        <Link 
          to="/" 
          onClick={() => setIsOpen(false)}
          className="text-lg md:text-xl font-bold tracking-tighter text-zinc-900 z-50 uppercase"
        >
          Cường Thông Gió<span className="text-zinc-400">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <Link
              key={link.href}
              to={link.href}
              className={cn(
                'text-[13px] font-semibold uppercase tracking-wider transition-colors hover:text-zinc-900',
                location.pathname === link.href ? 'text-zinc-900' : 'text-zinc-400'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button asChild variant="default" size="sm" className="px-8 min-w-[180px] h-10 rounded-full text-[12px] uppercase tracking-widest font-bold">
            <Link to="/lien-he">Báo giá ngay</Link>
          </Button>
        </div>

        {/* Mobile toggle */}
        <button 
          className="md:hidden p-2 -mr-2 z-50 text-zinc-900"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-center px-10 md:hidden"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    className={cn(
                      'text-3xl font-bold tracking-tighter transition-colors',
                      location.pathname === link.href ? 'text-zinc-900' : 'text-zinc-300'
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-10 border-t border-zinc-100 mt-4"
              >
                <Button asChild size="lg" className="w-full h-14 rounded-full uppercase tracking-widest font-bold text-xs">
                  <Link to="/lien-he">Liên hệ báo giá</Link>
                </Button>
              </motion.div>
            </div>
            
            <div className="absolute bottom-12 left-10 right-10">
               <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.2em] mb-4">Kết nối</p>
               <a href="tel:0905001224" className="text-lg font-bold text-zinc-900 block mb-1">0905 001 224</a>
               <p className="text-sm text-zinc-500 break-all">phantrongcuong77@gmail.com</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

