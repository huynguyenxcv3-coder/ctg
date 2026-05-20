import { motion } from 'framer-motion'

interface PlaceholderProps {
  className?: string;
  type?: 'abstract';
}

const AbstractSVG = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
    {/* Elegant Grid */}
    <g stroke="#f4f4f5" strokeWidth="0.5">
      {[20, 40, 60, 80].map(l => (
        <line key={`v-${l}`} x1={l} y1="0" x2={l} y2="100" />
      ))}
      {[20, 40, 60, 80].map(l => (
        <line key={`h-${l}`} x1="0" y1={l} x2="100" y2={l} />
      ))}
    </g>
    
    <motion.path 
      d="M 20,80 C 40,40 60,40 80,20" 
      fill="none" 
      stroke="#d4d4d8" 
      strokeWidth="1"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
    />
    <circle cx="80" cy="20" r="2" fill="#ffffff" stroke="#a1a1aa" strokeWidth="0.5" className="animate-pulse" />
    <circle cx="20" cy="80" r="2" fill="#ffffff" stroke="#a1a1aa" strokeWidth="0.5" className="animate-pulse" />
  </svg>
);

export function PremiumGraphic({ className = '' }: PlaceholderProps) {
  return (
    <div className={`w-full h-full overflow-hidden bg-white ${className}`}>
      <AbstractSVG />
    </div>
  );
}
