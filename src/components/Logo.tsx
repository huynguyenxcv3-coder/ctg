import { cn } from '@/src/lib/utils';

interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className, size }: LogoProps) {
  return (
    <div 
      className={cn("relative flex items-center justify-center overflow-hidden rounded-full shrink-0", className)} 
      style={size ? { width: size, height: size } : undefined}
    >
      <img 
        src="/logo.png?v=1" 
        alt="CƯỜNG THÔNG GIÓ Logo"
        className="w-full h-full object-contain"
      />
    </div>
  );
}
