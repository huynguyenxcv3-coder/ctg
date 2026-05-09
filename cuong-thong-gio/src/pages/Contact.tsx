import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/Button'
import SplitText from '../components/ui/SplitText'
import { cn } from '../lib/utils'

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })
  const [phoneError, setPhoneError] = useState('')

  const validatePhone = (phone: string) => {
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
    return phoneRegex.test(phone)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
    
    if (id === 'phone') {
      if (value && !validatePhone(value)) {
        setPhoneError('Số điện thoại không hợp lệ')
      } else {
        setPhoneError('')
      }
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validatePhone(formData.phone)) {
      setPhoneError('Vui lòng nhập số điện thoại hợp lệ')
      return
    }

    setIsSubmitting(true)
    
    try {
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSubmitted(true)
      setFormData({ name: '', phone: '', email: '', message: '' })
    } catch (error) {
      console.error("Submission error", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white min-h-screen pt-12 font-sans text-zinc-900 relative">
      
      {/* Refined Ambient Background */}
      <div className="absolute top-0 inset-x-0 h-[500px] flex justify-center overflow-hidden pointer-events-none z-0">
        <div className="w-full max-w-[1000px] bg-[radial-gradient(ellipse_100%_100%_at_50%_-20%,rgba(244,244,245,1),rgba(255,255,255,0))] h-[500px]" />
      </div>

      <section className="py-20 md:py-32 border-b border-zinc-100 relative z-10 text-center">
        <div className="container-custom px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-50 border border-zinc-200/60 px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm backdrop-blur-sm uppercase tracking-widest">
                Liên hệ chúng tôi
              </span>
            </div>
            <div className="mb-6 px-2 md:px-4">
              <SplitText 
                text="Tư vấn giải pháp kỹ thuật chuyên sâu."
                className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900"
                textAlign="center"
                delay={30}
              />
            </div>
            <p className="text-base md:text-lg lg:text-xl text-zinc-500 leading-relaxed font-normal mx-auto max-w-2xl px-4 md:px-6">
              Cung cấp thông tin sơ bộ về dự án để nhận báo giá chi tiết và phương án thiết kế từ đội ngũ kỹ sư Cường Thông Gió.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-32 relative bg-white">
        <div className="container-custom px-4 md:px-6">
          {/* Super Container - Symmetrical Split 50/50 */}
          <div className="max-w-6xl mx-auto bg-white rounded-3xl md:rounded-[4rem] border border-zinc-100 shadow-[0_40px_100px_rgba(0,0,0,0.04)] overflow-hidden grid grid-cols-1 lg:grid-cols-2">
            
            {/* Left Column - Contact Info (bg-zinc-50) */}
            <div className="bg-zinc-50/80 px-6 py-12 md:p-20 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-zinc-100">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <h3 className="text-[10px] md:text-xs font-bold text-zinc-400 mb-8 md:mb-10 tracking-[0.1em] md:tracking-[0.2em] uppercase text-left">Thông tin liên hệ</h3>
                <div className="space-y-10 md:space-y-12 text-left">
                  <div className="flex items-start gap-5 md:gap-6">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                       <svg className="w-5 h-5 md:w-6 md:h-6 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                       </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 mb-1 md:mb-2 text-base md:text-lg">Trụ sở chính</h4>
                      <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                        101 Trần Quý Khoách, P. Hoà Minh, <br />
                        Q. Liên Chiểu, TP. Đà Nẵng
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 md:gap-6">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                       <svg className="w-5 h-5 md:w-6 md:h-6 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                       </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 mb-1 md:mb-2 text-base md:text-lg">Điện thoại</h4>
                      <a href="tel:0905001224" className="text-sm text-zinc-600 hover:text-zinc-900 font-semibold transition-colors">
                        0905 001 224
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-5 md:gap-6">
                    <div className="w-11 h-11 md:w-12 md:h-12 rounded-2xl bg-white border border-zinc-200 flex items-center justify-center flex-shrink-0 shadow-sm">
                       <svg className="w-5 h-5 md:w-6 md:h-6 text-zinc-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                       </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-900 mb-1 md:mb-2 text-base md:text-lg">Email</h4>
                      <a href="mailto:phantrongcuong77@gmail.com" className="text-sm text-zinc-600 hover:text-zinc-900 font-semibold transition-colors break-all">
                        phantrongcuong77@gmail.com
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right Column - Form (bg-white) */}
            <div className="bg-white px-6 py-12 md:p-20">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="h-full flex flex-col items-center justify-center text-center py-10 md:py-20"
                  >
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 shadow-xl text-white">
                      <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4 tracking-tight">Yêu cầu đã được gửi</h3>
                    <p className="text-zinc-500 text-sm md:text-lg max-w-sm">Chúng tôi đã tiếp nhận thông tin và sẽ phản hồi trong thời gian sớm nhất.</p>
                    <Button variant="outline" className="mt-8 md:mt-10 rounded-full px-8 md:px-12 min-h-[3rem] h-auto py-3 font-bold uppercase tracking-tight md:tracking-widest text-[10px] md:text-[11px]" onClick={() => setIsSubmitted(false)}>
                      Gửi yêu cầu khác
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit} 
                    className="space-y-6 md:space-y-8 text-left"
                  >
                    <div className="space-y-2 md:space-y-3">
                      <label htmlFor="name" className="text-[10px] md:text-[11px] font-bold text-zinc-900 uppercase tracking-tight md:tracking-[0.2em]">
                        Họ và tên <span className="text-zinc-400">*</span>
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="h-12 md:h-14 w-full rounded-xl md:rounded-2xl border border-zinc-200 bg-zinc-50/30 px-5 md:px-8 text-sm md:text-base shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white"
                        placeholder="Tên của bạn..."
                      />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-6">
                      <div className="space-y-2 md:space-y-3">
                        <label htmlFor="phone" className="text-[10px] md:text-[11px] font-bold text-zinc-900 uppercase tracking-tight md:tracking-[0.2em]">
                          Số điện thoại <span className="text-zinc-400">*</span>
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className={cn(
                            "h-12 md:h-14 w-full rounded-xl md:rounded-2xl border bg-zinc-50/30 px-5 md:px-8 text-sm md:text-base shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white",
                            phoneError ? "border-red-500" : "border-zinc-200"
                          )}
                          placeholder="0905..."
                        />
                        {phoneError && <p className="text-red-500 text-[9px] md:text-[10px] font-bold uppercase mt-1">{phoneError}</p>}
                      </div>

                      <div className="space-y-2 md:space-y-3">
                        <label htmlFor="email" className="text-[10px] md:text-[11px] font-bold text-zinc-900 uppercase tracking-tight md:tracking-[0.2em]">
                          Email
                        </label>
                        <input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="h-12 md:h-14 w-full rounded-xl md:rounded-2xl border border-zinc-200 bg-zinc-50/30 px-5 md:px-8 text-sm md:text-base shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white"
                          placeholder="email@vidu.com"
                        />
                      </div>
                      </div>

                      <div className="space-y-2 md:space-y-3">
                      <label htmlFor="message" className="text-[10px] md:text-[11px] font-bold text-zinc-900 uppercase tracking-tight md:tracking-[0.2em]">
                        Yêu cầu kỹ thuật <span className="text-zinc-400">*</span>
                      </label>
                      <textarea
                        id="message"
                        required
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full min-h-[140px] md:min-h-[160px] rounded-xl md:rounded-3xl border border-zinc-200 bg-zinc-50/30 px-5 md:px-8 py-4 md:py-6 text-sm md:text-base shadow-sm transition-all focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white resize-none"
                        placeholder="Diện tích xưởng, quy mô, loại quạt..."
                      />
                      </div>
                    <div className="pt-2 md:pt-4">
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full rounded-full min-h-[3.5rem] h-auto py-3 text-[10px] md:text-[11px] font-bold uppercase tracking-tight md:tracking-[0.25em] shadow-xl hover:translate-y-[-1px] transition-all duration-300 leading-tight"
                      >
                        {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu tư vấn'}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
