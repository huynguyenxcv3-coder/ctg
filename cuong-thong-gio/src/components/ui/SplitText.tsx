import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

interface SplitTextProps {
  text?: string;
  className?: string;
  delay?: number;
  duration?: number;
  ease?: string;
  from?: gsap.TweenVars;
  to?: gsap.TweenVars;
  threshold?: number;
  rootMargin?: string;
  textAlign?: 'left' | 'center' | 'right' | string;
  onAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text = '',
  className = '',
  delay = 50,
  duration = 0.5,
  ease = 'power3.out',
  from = { opacity: 0, y: 20 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '0px',
  textAlign = 'center',
  onAnimationComplete,
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const currentContainer = containerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          if (currentContainer) observer.unobserve(currentContainer);
        }
      },
      { threshold, rootMargin }
    );

    if (currentContainer) observer.observe(currentContainer);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useGSAP(() => {
    if (!inView || !containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.split-word');
    
    gsap.fromTo(elements, 
      { ...from },
      {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        onComplete: () => {
          if (onAnimationComplete) onAnimationComplete();
        }
      }
    );
  }, { dependencies: [inView], scope: containerRef });

  const words = text.split(' ');

  return (
    <p
      ref={containerRef}
      className={`split-text ${className}`}
      style={{ 
        textAlign: textAlign as React.CSSProperties['textAlign'], 
        display: 'flex', 
        flexWrap: 'wrap', 
        justifyContent: textAlign === 'center' ? 'center' : (textAlign === 'right' ? 'flex-end' : 'flex-start'), 
        width: '100%' 
      }}
    >
      {words.map((word, wordIndex) => (
        <span 
          key={wordIndex} 
          className="split-word"
          style={{ 
            display: 'inline-block', 
            whiteSpace: 'nowrap', 
            marginRight: wordIndex === words.length - 1 ? '0' : '0.25em',
            willChange: 'transform, opacity',
            opacity: inView ? undefined : 0
          }}
        >
          {word}
        </span>
      ))}
    </p>
  );
};

export default SplitText;
