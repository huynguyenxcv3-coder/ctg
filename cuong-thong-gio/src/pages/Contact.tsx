import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '../components/ui/Button'

export function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Proper async simulation
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setIsSubmitted(true)
    } catch (error) {
      console.error("Submission error", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white min-h-screen pt-14 font-sans text-zinc-900">
      
      {/* Refined Ambient Background */}
      <div className="absolute top-0 inset-x-0 h-[500px] flex justify-center overflow-hidden pointer-events-none z-0">
        <div className="w-full max-w-[1000px] bg-[radial-gradient(ellipse_100%_100%_at_50%_-20%,rgba(244,244,245,1),rgba(255,255,255,0))] h-[500px]" />
      </div>

      <section className="py-20 md:py-32 border-b border-zinc-100 relative z-10">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <div className="mb-6 flex">
              <span className="inline-flex items-center gap-2 rounded-full bg-zinc-50 border border-zinc-200/60 px-3 py-1 text-xs font-medium text-zinc-600 shadow-sm backdrop-blur-sm uppercase tracking-widest">
                Liên hệ chúng tôi
              </span>
            </div>
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-900 mb-6">
              Tư vấn giải pháp <br className="hidden md:block" />
              <span className="text-zinc-400">kỹ thuật chuyên sâu.</span>
            </h1>
            <p className="text-lg md:text-xl text-zinc-500 leading-relaxed font-normal">
              Cung cấp thông tin sơ bộ về dự án để nhận báo giá chi tiết và phương án thiết kế từ đội ngũ kỹ sư Cường Thông Gió.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 md:py-32 relative bg-zinc-50/30">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 lg:gap-24">
            
            {/* Contact Info */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-1 space-y-10"
            >
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 mb-3 tracking-tight uppercase">Trụ sở chính</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  101 Trần Quý Khoách, <br />
                  Phường Hoà Minh, Quận Liên Chiểu, <br />
                  TP. Đà Nẵng
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-semibold text-zinc-900 mb-3 tracking-tight uppercase">Liên hệ trực tiếp</h3>
                <a href="tel:0905001224" className="text-sm text-zinc-600 hover:text-zinc-900 font-medium transition-colors">
                  0905 001 224
                </a>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-zinc-900 mb-3 tracking-tight uppercase">Email hỗ trợ</h3>
                <a href="mailto:phantrongcuong77@gmail.com" className="text-sm text-zinc-600 hover:text-zinc-900 transition-colors break-all">
                  phantrongcuong77@gmail.com
                </a>
              </div>
            </motion.div>

            {/* shadcn-style Elegant Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-2"
            >
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-zinc-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden">
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div 
                      key="success"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="py-20 text-center"
                    >
                      <div className="w-16 h-16 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
                        <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold mb-2">Yêu cầu đã được gửi</h3>
                      <p className="text-zinc-500">Chúng tôi đã tiếp nhận thông tin và sẽ phản hồi trong thời gian sớm nhất.</p>
                      <Button variant="outline" className="mt-8" onClick={() => setIsSubmitted(false)}>
                        Gửi yêu cầu khác
                      </Button>
                    </motion.div>
                  ) : (
                    <motion.form 
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleSubmit} 
                      className="space-y-8"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-3">
                          <label htmlFor="name" className="text-sm font-medium text-zinc-900">
                            Họ và tên <span className="text-zinc-400">*</span>
                          </label>
                          <input
                            id="name"
                            type="text"
                            required
                            className="flex h-11 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Tên của bạn..."
                          />
                        </div>
                        <div className="space-y-3">
                          <label htmlFor="phone" className="text-sm font-medium text-zinc-900">
                            Số điện thoại <span className="text-zinc-400">*</span>
                          </label>
                          <input
                            id="phone"
                            type="tel"
                            required
                            className="flex h-11 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="0905..."
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <label htmlFor="email" className="text-sm font-medium text-zinc-900">
                          Email liên hệ
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="flex h-11 w-full rounded-md border border-zinc-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="email@vidu.com"
                        />
                      </div>

                      <div className="space-y-3">
                        <label htmlFor="message" className="text-sm font-medium text-zinc-900">
                          Mô tả dự án / Yêu cầu kỹ thuật <span className="text-zinc-400">*</span>
                        </label>
                        <textarea
                          id="message"
                          required
                          className="flex min-h-[140px] w-full rounded-md border border-zinc-200 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-zinc-900 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                          placeholder="Diện tích xưởng, quy mô, loại quạt cần tư vấn..."
                        />
                      </div>

                      <div className="pt-4">
                        <Button 
                          type="submit" 
                          disabled={isSubmitting}
                          className="w-full sm:w-auto min-w-[160px]"
                        >
                          {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu'}
                        </Button>
                      </div>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
