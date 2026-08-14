/**
 * Motion Design System — Centralized animation configuration
 * All animations use only transform and opacity for compositor-layer performance (Req 12.5)
 */

export const springConfig = {
  gentle: { type: 'spring', stiffness: 120, damping: 14 },
  snappy: { type: 'spring', stiffness: 300, damping: 20 },
  bouncy: { type: 'spring', stiffness: 400, damping: 10 },
} as const;

export const variants = {
  fadeUp: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  },
  staggerContainer: {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: springConfig.gentle },
  },
  slideInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: springConfig.gentle },
  },
  slideInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: springConfig.gentle },
  },
  pageEnter: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  },
} as const;

export const hoverEffects = {
  lift: { scale: 1.03, y: -4, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' },
  tilt3D: { rotateX: -5, rotateY: 5, z: 20 },
  magnetic: { scale: 1.05 },
} as const;
