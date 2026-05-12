import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, CheckCircle2 } from 'lucide-react'
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
  
  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  })

  const validatePhone = (phone: string) => {
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/
    return phoneRegex.test(phone)
  }

  const validateEmail = (email: string) => {
    if (!email) return true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({ ...prev, [id]: value }))
    
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [id]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors = {
      name: '',
      phone: '',
      email: '',
      message: ''
    }
    let isValid = true

    if (!formData.name.trim()) {
      newErrors.name = 'Vui lòng nhập họ và tên'
      isValid = false
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Vui lòng nhập số điện thoại'
      isValid = false
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ'
      isValid = false
    }

    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Email không hợp lệ'
      isValid = false
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Vui lòng nhập yêu cầu kỹ thuật'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
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
    <div className="bg-white min-h-screen pt-24 pb-20 font-sans text-zinc-900 relative selection:bg-zinc-200 selection:text-zinc-900">
      
      {/* Refined Ambient Background */}
      <div className="absolute top-0 inset-x-0 h-[600px] flex justify-center overflow-hidden pointer-events-none z-0">
        <div className="w-full max-w-[1200px] bg-[radial-gradient(ellipse_100%_100%_at_50%_-20%,rgba(244,244,245,1),rgba(255,255,255,0))] h-[600px]" />
      </div>

      <div className="container-custom relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24 pt-8 md:pt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl mx-auto"
          >
            <div className="mb-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full bg-white border border-zinc-200/80 px-4 py-1.5 text-[10px] md:text-xs font-bold text-zinc-500 shadow-sm uppercase tracking-[0.2em]">
                Liên hệ chúng tôi
              </span>
            </div>
            <div className="mb-6 px-2 md:px-4">
              <SplitText 
                text="Tư vấn giải pháp kỹ thuật chuyên sâu."
                className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-900"
                textAlign="center"
                delay={30}
              />
            </div>
            <p className="text-base md:text-lg lg:text-xl text-zinc-500 leading-relaxed font-normal mx-auto max-w-2xl px-4 md:px-6">
              Cung cấp thông tin sơ bộ về dự án để nhận báo giá chi tiết và phương án thiết kế từ đội ngũ kỹ sư Cường Thông Gió.
            </p>
          </motion.div>
        </div>

        {/* Main Content Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-6xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] shadow-[0_20px_80px_-20px_rgba(0,0,0,0.08)] border border-zinc-100 p-8 md:p-16 lg:p-20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left Column - Contact Information */}
            <div className="flex flex-col justify-center">
              <h2 className="text-[11px] md:text-xs font-bold text-zinc-400 mb-10 tracking-[0.2em] uppercase">
                THÔNG TIN LIÊN HỆ
              </h2>

              <div className="space-y-10">
                {/* Location */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full border border-zinc-200 flex items-center justify-center bg-zinc-50/50 text-zinc-900 shadow-sm transition-transform hover:scale-105">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-zinc-900 mb-2 text-base md:text-lg">Trụ sở chính</h3>
                    <p className="text-zinc-500 leading-relaxed text-sm md:text-base">
                      101 Trần Quý Khoách, P. Hoà Minh, <br />
                      Q. Liên Chiểu, TP. Đà Nẵng
                    </p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full border border-zinc-200 flex items-center justify-center bg-zinc-50/50 text-zinc-900 shadow-sm transition-transform hover:scale-105">
                    <Phone className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-zinc-900 mb-2 text-base md:text-lg">Điện thoại</h3>
                    <a href="tel:0905001224" className="text-zinc-600 hover:text-zinc-900 font-medium transition-colors text-sm md:text-base inline-block">
                      0905 001 224
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full border border-zinc-200 flex items-center justify-center bg-zinc-50/50 text-zinc-900 shadow-sm transition-transform hover:scale-105">
                    <Mail className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                  </div>
                  <div className="pt-1">
                    <h3 className="font-bold text-zinc-900 mb-2 text-base md:text-lg">Email</h3>
                    <a href="mailto:phantrongcuong77@gmail.com" className="text-zinc-600 hover:text-zinc-900 font-medium transition-colors text-sm md:text-base break-all inline-block">
                      phantrongcuong77@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Form Section */}
            <div className="lg:border-l border-zinc-100 lg:pl-24">
              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="h-full flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mb-8 shadow-xl text-white">
                      <CheckCircle2 className="w-10 h-10" strokeWidth={2} />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold mb-4 text-zinc-900 tracking-tight">Yêu cầu đã được gửi</h3>
                    <p className="text-zinc-500 mb-10 max-w-sm text-sm md:text-base leading-relaxed">Chúng tôi đã tiếp nhận thông tin và sẽ phản hồi trong thời gian sớm nhất.</p>
                    <Button 
                      variant="outline" 
                      className="rounded-full px-10 py-6 border-zinc-200 hover:border-zinc-900 hover:bg-zinc-50 font-bold uppercase tracking-[0.2em] text-[11px] transition-all" 
                      onClick={() => setIsSubmitted(false)}
                    >
                      Gửi thêm yêu cầu
                    </Button>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    onSubmit={handleSubmit}
                    noValidate
                    className="space-y-6 md:space-y-8"
                  >
                    {/* Full Name */}
                    <div className="space-y-3">
                      <label htmlFor="name" className="block text-[10px] md:text-[11px] uppercase font-bold text-zinc-900 tracking-[0.2em]">
                        HỌ VÀ TÊN <span className="text-zinc-400">*</span>
                      </label>
                      <div className="relative">
                        <input
                          id="name"
                          type="text"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Tên của bạn..."
                          className={cn(
                            "w-full px-6 h-14 bg-zinc-50/50 border rounded-2xl focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400 text-zinc-900 text-sm md:text-base",
                            errors.name ? "border-red-500" : "border-zinc-200"
                          )}
                        />
                        {errors.name && <p className="absolute -bottom-6 left-0 text-red-500 text-[11px] font-medium">{errors.name}</p>}
                      </div>
                    </div>

                    {/* Phone and Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 pt-2">
                      <div className="space-y-3">
                        <label htmlFor="phone" className="block text-[10px] md:text-[11px] uppercase font-bold text-zinc-900 tracking-[0.2em]">
                          SỐ ĐIỆN THOẠI <span className="text-zinc-400">*</span>
                        </label>
                        <div className="relative">
                          <input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="0905..."
                            className={cn(
                              "w-full px-6 h-14 bg-zinc-50/50 border rounded-2xl focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400 text-zinc-900 text-sm md:text-base",
                              errors.phone ? "border-red-500" : "border-zinc-200"
                            )}
                          />
                          {errors.phone && <p className="absolute -bottom-6 left-0 text-red-500 text-[11px] font-medium">{errors.phone}</p>}
                        </div>
                      </div>
                      <div className="space-y-3">
                        <label htmlFor="email" className="block text-[10px] md:text-[11px] uppercase font-bold text-zinc-900 tracking-[0.2em]">
                          EMAIL
                        </label>
                        <div className="relative">
                          <input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="email@vidu.com"
                            className={cn(
                              "w-full px-6 h-14 bg-zinc-50/50 border rounded-2xl focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400 text-zinc-900 text-sm md:text-base",
                              errors.email ? "border-red-500" : "border-zinc-200"
                            )}
                          />
                          {errors.email && <p className="absolute -bottom-6 left-0 text-red-500 text-[11px] font-medium">{errors.email}</p>}
                        </div>
                      </div>
                    </div>

                    {/* Technical Requirements */}
                    <div className="space-y-3 pt-2">
                      <label htmlFor="message" className="block text-[10px] md:text-[11px] uppercase font-bold text-zinc-900 tracking-[0.2em]">
                        YÊU CẦU KỸ THUẬT <span className="text-zinc-400">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          placeholder="Diện tích xưởng, quy mô, loại quạt..."
                          className={cn(
                            "w-full px-6 py-5 bg-zinc-50/50 border rounded-2xl focus:outline-none focus:ring-1 focus:ring-zinc-900 focus:bg-white transition-all placeholder:text-zinc-400 text-zinc-900 text-sm md:text-base resize-none",
                            errors.message ? "border-red-500" : "border-zinc-200"
                          )}
                        />
                        {errors.message && <p className="absolute -bottom-6 left-0 text-red-500 text-[11px] font-medium">{errors.message}</p>}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-6">
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-zinc-900 text-white uppercase h-16 rounded-full hover:bg-black transition-all font-bold tracking-[0.2em] text-[11px] md:text-xs shadow-lg hover:shadow-xl hover:translate-y-[-2px] active:translate-y-[0px] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                      >
                        {isSubmitting ? 'ĐANG GỬI...' : 'GỬI YÊU CẦU TƯ VẤN'}
                      </Button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}