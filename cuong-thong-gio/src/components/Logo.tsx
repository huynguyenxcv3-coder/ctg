import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 48 }: LogoProps) {
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden rounded-full", className)} style={{ width: size, height: size }}>
      <img 
        src="https://raw.githubusercontent.com/huynguyenxcv3-coder/ctg/main/public/logo.png" 
        alt="CƯỜNG THÔNG GIÓ Logo"
        className="w-full h-full object-contain"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
