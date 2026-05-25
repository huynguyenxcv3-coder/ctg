import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size = 48 }: LogoProps) {
  return (
    <div className={cn("relative flex items-center justify-center overflow-hidden rounded-full", className)} style={{ width: size, height: size }}>
      <img 
        src="/logo.png?v=1" 
        alt="CƯỜNG THÔNG GIÓ Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
