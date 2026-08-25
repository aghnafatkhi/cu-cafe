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
    duration: 0.5,
    delay,
    ease: [0.25, 0.1, 0.25, 1] as const,
  };

  if (animateOnMount) {
    return (
      <motion.section
        id={id}
        initial={{ opacity: 0, y: 10 }}
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
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={transitionConfig}
      className={className}
      {...props}
    >
      {children}
    </motion.section>
  );
}
