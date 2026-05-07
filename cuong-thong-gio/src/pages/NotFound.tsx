import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { PremiumGraphic } from '../components/ui/PremiumPlaceholders'


export function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <PremiumGraphic type="abstract" className="w-full h-full" />
      </div>
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-[12rem] font-black text-zinc-100 leading-none select-none">404</h1>
        </motion.div>
        
        <motion.h2 
          className="text-2xl md:text-3xl font-bold text-zinc-900 mb-6 max-w-xl mx-auto"
        >
          Đường ống dẫn đến trang này đã bị ngắt kết nối.
        </motion.h2>
        
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-zinc-500 mb-10 max-w-md mx-auto"
        >
          Có vẻ như bạn đã đi lạc vào khu vực đang bảo trì hoặc địa chỉ này không tồn tại.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button asChild size="lg">
            <Link to="/">Quay lại Trang chủ</Link>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
