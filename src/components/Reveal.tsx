import { ReactNode } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2 | 3 | 4 | 5;
  as?: 'div' | 'section' | 'article' | 'li' | 'span';
}

export function Reveal({ children, className = '', delay, as = 'div' }: RevealProps) {
  const { ref, isVisible } = useScrollReveal();
  const delayClass = delay ? `reveal-delay-${delay}` : '';
  const Tag = as as any;

  return (
    <Tag
      ref={ref as any}
      className={`reveal ${delayClass} ${isVisible ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  );
}
