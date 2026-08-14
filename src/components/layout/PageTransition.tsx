interface PageTransitionProps {
  children: React.ReactNode;
}

/**
 * PageTransition — simplified wrapper that renders children immediately.
 * The AnimatePresence page transition was causing slow navigation
 * (old page had to fully exit before new page entered).
 * Individual sections still animate via ScrollReveal.
 */
export default function PageTransition({ children }: PageTransitionProps) {
  return <>{children}</>;
}
