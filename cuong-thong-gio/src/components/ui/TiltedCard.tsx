import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: string;
  containerWidth?: string;
  imageHeight?: string;
  imageWidth?: string;
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileAlert?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}

const springConfig = {
  damping: 30,
  stiffness: 100,
  mass: 2,
};

export default function TiltedCard({
  imageSrc,
  altText = "Tilted card image",
  captionText = "",
  containerHeight = "300px",
  containerWidth = "100%",
  imageHeight = "300px",
  imageWidth = "100%",
  scaleOnHover = 1.1,
  rotateAmplitude = 15,
  showMobileAlert = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}: TiltedCardProps) {
  const ref = useRef<HTMLElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, springConfig);
  const mouseYSpring = useSpring(y, springConfig);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    [rotateAmplitude, -rotateAmplitude]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    [-rotateAmplitude, rotateAmplitude]
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <figure
      ref={ref}
      className="relative w-full h-full [perspective:800px] flex flex-col items-center justify-center"
      style={{
        height: containerHeight,
        width: containerWidth,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileAlert && (
        <div className="absolute top-4 text-xs sm:hidden bg-white/10 backdrop-blur-md px-2 py-1 rounded-full text-white z-10">
          Touch to tilt
        </div>
      )}

      <motion.div
        className="relative [transform-style:preserve-3d]"
        style={{
          width: imageWidth,
          height: imageHeight,
          rotateX,
          rotateY,
          scale: isHovered ? scaleOnHover : 1,
        }}
        transition={springConfig}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-slate-100 rounded-[15px] overflow-hidden">
             {imageSrc ? (
                 <img
                    src={imageSrc}
                    alt={altText}
                    className="w-full h-full object-cover will-change-transform [transform:translateZ(0)]"
                  />
             ) : (
                 <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-blue-700/20 flex items-center justify-center">
                     <div className="text-blue-500/30 font-bold uppercase tracking-widest text-xs">No Image</div>
                 </div>
             )}
        </div>

        {displayOverlayContent && overlayContent && (
          <div className="absolute top-0 left-0 w-full h-full z-[2] [transform:translateZ(30px)] pointer-events-none">
            {overlayContent}
          </div>
        )}
      </motion.div>

      {showTooltip && captionText && (
        <motion.figcaption
          className="mt-4 text-slate-900 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-lg text-xs font-bold z-[3] [transform:translateZ(20px)] border border-slate-200"
        >
          {captionText}
        </motion.figcaption>
      )}
    </figure>
  );
}
