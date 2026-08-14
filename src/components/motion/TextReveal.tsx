'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface TextRevealProps {
  /** Text to animate character-by-character */
  text: string;
  className?: string;
  /** Delay between each character in seconds. Default 0.03 */
  charDelay?: number;
}

/**
 * Splits text into individual characters and animates each with staggered
 * opacity and slight y-translate when the element enters the viewport.
 * Only animates opacity and transform for compositor performance.
 *
 * Validates: Requirements 12.1, 12.4, 12.5
 */
export function TextReveal({
  text,
  className,
  charDelay = 0.03,
}: TextRevealProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  if (prefersReducedMotion) {
    return <span className={className}>{text}</span>;
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: charDelay,
      },
    },
  };

  const charVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.span
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      aria-label={text}
    >
      {text.split('').map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          variants={charVariants}
          style={{ display: 'inline-block' }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  );
}
