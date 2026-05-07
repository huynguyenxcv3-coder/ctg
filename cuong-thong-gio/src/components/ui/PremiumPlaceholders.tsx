import { motion } from 'framer-motion'

interface PlaceholderProps {
  className?: string;
  type?: 'fan' | 'duct' | 'filter' | 'building' | 'abstract';
}

export function PremiumGraphic({ className = '', type = 'abstract' }: PlaceholderProps) {
  const FanSVG = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <radialGradient id="fanGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f4f4f5" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="100" height="100" fill="url(#fanGlow)" />
      
      <g transform="translate(50, 50)">
        {/* Outer Ring */}
        <circle r="40" fill="none" stroke="#e4e4e7" strokeWidth="1" />
        <circle r="36" fill="none" stroke="#d4d4d8" strokeWidth="0.5" strokeDasharray="4 6" className="animate-[spin_30s_linear_infinite]" />
        
        {/* Delicate Blades */}
        <motion.g 
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <path 
              key={i}
              d="M0,-4 C5,-15 15,-30 10,-35 C0,-40 -10,-35 -10,-35 C-15,-30 -5,-15 0,-4 Z" 
              fill="none"
              stroke="#a1a1aa"
              strokeWidth="0.5"
              transform={`rotate(${i * 60})`} 
            />
          ))}
        </motion.g>
        
        {/* Hub */}
        <circle r="6" fill="#ffffff" stroke="#a1a1aa" strokeWidth="1" />
        <circle r="2" fill="#d4d4d8" />
      </g>
      
      {/* Subtle Airflow Particles */}
      {[0,1,2].map(i => (
        <motion.circle 
          key={`p-${i}`}
          cx={85 + Math.random() * 5} 
          cy={50} 
          r="1" 
          fill="#d4d4d8"
          initial={{ x: 0, opacity: 0 }}
          animate={{ x: -70, opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 2, delay: i * 0.6, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );

  const DuctSVG = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="ductGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f4f4f5" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="100" height="100" fill="url(#ductGlow)" />
      
      {/* Delicate 3D Duct Mesh */}
      <g transform="translate(15, 35) rotate(-5)">
        <rect x="0" y="0" width="70" height="24" fill="none" stroke="#a1a1aa" strokeWidth="0.75" rx="2" />
        {/* Ribs */}
        {[10, 20, 30, 40, 50, 60].map(x => (
          <line key={x} x1={x} y1="0" x2={x} y2="24" stroke="#e4e4e7" strokeWidth="0.5" />
        ))}
        {/* Elegant Flow Lines */}
        <motion.path 
          d="M 5,12 Q 20,6 35,12 T 65,12" 
          fill="none" 
          stroke="#d4d4d8" 
          strokeWidth="1" 
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [16, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
        />
      </g>
    </svg>
  );

  const FilterSVG = () => (
    <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="dotGrid" width="8" height="8" patternUnits="userSpaceOnUse">
           <circle cx="2" cy="2" r="0.5" fill="#e4e4e7" />
        </pattern>
      </defs>
      <rect width="100" height="100" fill="url(#dotGrid)" />
      
      {/* Filter Cartridge */}
      <motion.g 
        initial={{ y: 1 }}
        animate={{ y: -1 }}
        transition={{ repeat: Infinity, duration: 2.5, repeatType: 'reverse', ease: "easeInOut" }}
      >
        <rect width="60" height="60" x="20" y="20" fill="none" stroke="#a1a1aa" strokeWidth="0.75" rx="4" />
        {/* Inner lines */}
        {[30, 40, 50, 60, 70].map(x => (
          <line key={`f-${x}`} x1={x} y1="20" x2={x} y2="80" stroke="#e4e4e7" strokeWidth="0.5" />
        ))}
        
        {/* Soft Particles being filtered */}
        {[0,1,2].map(i => (
          <motion.circle 
            key={`fp-${i}`}
            cx={50 + (Math.random() - 0.5) * 30} 
            cy={90} 
            r="1" 
            fill="#a1a1aa"
            initial={{ y: 0, opacity: 0 }}
            animate={{ y: -50, opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 3, delay: i * 0.8, ease: "easeOut" }}
          />
        ))}
      </motion.g>
    </svg>
  );

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

  const renderContent = () => {
    switch (type) {
      case 'fan': return <FanSVG />;
      case 'duct': return <DuctSVG />;
      case 'filter': return <FilterSVG />;
      default: return <AbstractSVG />;
    }
  };

  return (
    <div className={`w-full h-full overflow-hidden bg-white ${className}`}>
      {renderContent()}
    </div>
  );
}
