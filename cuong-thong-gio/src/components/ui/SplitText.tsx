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
  onLetterAnimationComplete?: () => void;
}

const SplitText: React.FC<SplitTextProps> = ({
  text = '',
  className = '',
  delay = 50,
  duration = 0.5,
  ease = 'power3.out',
  from = { opacity: 0, y: 40 },
  to = { opacity: 1, y: 0 },
  threshold = 0.1,
  rootMargin = '-100px',
  textAlign = 'center',
  onLetterAnimationComplete,
}) => {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(containerRef.current!);
        }
      },
      { threshold, rootMargin }
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  useGSAP(() => {
    if (!inView || !containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.split-item');
    
    gsap.fromTo(elements, 
      { ...from },
      {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        onComplete: () => {
          if (onLetterAnimationComplete) onLetterAnimationComplete();
        }
      }
    );
  }, { dependencies: [inView], scope: containerRef });

  const words = text.split(' ');

  return (
    <p
      ref={containerRef}
      className={`split-text ${className}`}
      style={{ textAlign: textAlign as React.CSSProperties['textAlign'], display: 'flex', flexWrap: 'wrap', justifyContent: textAlign === 'center' ? 'center' : 'flex-start' }}
    >
      {words.map((word, wordIndex) => {
        // Use Intl.Segmenter to safely split words containing combining characters and emojis
        const segmenter = new Intl.Segmenter('vi', { granularity: 'grapheme' });
        const characters = Array.from(segmenter.segment(word)).map(s => s.segment);
        
        return (
          <span key={wordIndex} style={{ display: 'inline-block', whiteSpace: 'nowrap', marginRight: '0.3em' }}>
            {characters.map((char, charIndex) => (
              <span key={charIndex} className="split-item" style={{ display: 'inline-block' }}>
                {char}
              </span>
            ))}
          </span>
        );
      })}
    </p>
  );
};

export default SplitText;
