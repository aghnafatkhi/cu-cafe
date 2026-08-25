'use client';

import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';

interface SectionTransitionProps extends HTMLMotionProps<'section'> {
  children: React.ReactNode;
  delay?: number;
  /**
   * If true, animates immediately on mount (e.g. for Hero / top-of-page sections).
   * If false (default), animates when scrolled into the viewport.
   */
  animateOnMount?: boolean;
}

export default function SectionTransition({
  children,
  className = '',
  id,
  delay = 0,
  animateOnMount = false,
  ...props
}: SectionTransitionProps) {
  const transitionConfig = {
    duration: 0.45,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
  };

  if (animateOnMount) {
    return (
      <motion.section
        id={id}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transitionConfig}
        className={className}
        {...props}
      >
        {children}
      </motion.section>
    );
  }

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={transitionConfig}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}
